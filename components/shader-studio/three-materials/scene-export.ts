import {
  threeEnvironmentNames,
  threeMaterialNames,
  threeObjectNames,
} from "../three-catalog";
import type { Recipe } from "../types";
import {
  getSceneShaderGlslExport,
  getThreeShaderMaterial,
  isThreeShaderMaterial,
} from "./index";
import { MESH_SURFACE_VERT } from "./noise-glsl";

export function buildSceneRecipeJson(recipe: Recipe) {
  return {
    kind: "3d",
    threeObject: recipe.threeObject,
    threeMaterial: recipe.threeMaterial,
    threeEnvironment: recipe.threeEnvironment,
    threePedestal: recipe.threePedestal,
    threeOpenBackground: recipe.threeOpenBackground,
    backgroundStyle: recipe.threeOpenBackground === "shader" ? recipe.style : null,
    hasUpload: Boolean(recipe.threeModelUpload),
    palette: recipe.palette,
    intensity: recipe.intensity,
    zoom: recipe.zoom,
    warp: recipe.warp,
    contrast: recipe.contrast,
    grain: recipe.grain,
    speed: recipe.speed,
    rotate: recipe.rotate,
    offsetX: recipe.offsetX,
    offsetY: recipe.offsetY,
    seed: recipe.seed,
    drift: recipe.drift,
    animate: recipe.animate,
    reverse: recipe.reverse,
    blur: recipe.blur,
  };
}

export function buildScenePrompt(recipe: Recipe) {
  const objectLabel = recipe.threeModelUpload
    ? "uploaded GLB"
    : (threeObjectNames[recipe.threeObject] ?? recipe.threeObject);
  const materialLabel = threeMaterialNames[recipe.threeMaterial] ?? recipe.threeMaterial;
  const envLabel = threeEnvironmentNames[recipe.threeEnvironment] ?? recipe.threeEnvironment;
  const shaderNote = isThreeShaderMaterial(recipe.threeMaterial)
    ? `Use a Three.js ShaderMaterial with the exported GLSL for "${materialLabel}". Animate uTime in useFrame when animate is on.`
    : `Use Three.js built-in materials (${recipe.threeMaterial}) with palette-driven color/roughness/metalness.`;

  return `Add a centered interactive Three.js / React Three Fiber scene to my app.

Object: ${objectLabel}.
Material: ${materialLabel}.
Environment: ${envLabel}${recipe.threePedestal && recipe.threeEnvironment !== "open" ? " with pedestal" : ""}.
Open background: ${recipe.threeOpenBackground === "shader" ? `animated shader (${recipe.style})` : `solid colour ${recipe.palette[0] ?? "#060914"}`}.
Palette: ${recipe.palette.map((color) => color.toUpperCase()).join(", ")}.

Lighting: draggable directional light — azimuth ${recipe.offsetX.toFixed(2)}, height ${recipe.offsetY.toFixed(2)}, strength ${Math.round(recipe.intensity * 100)}%.
Object scale ${recipe.zoom.toFixed(2)}× · spin ${recipe.rotate.toFixed(2)} rad · animate ${recipe.animate ? "on" : "off"} @ ${recipe.speed.toFixed(1)}×.

Dependencies: three, @react-three/fiber, @react-three/drei (Environment, OrbitControls).

Implementation:
- OrbitControls for camera (no pan).
- Room environments render floor + walls; "Open" is a flat void with HDRI reflections only (no floor plane or contact shadows).
- Scale from the object bottom so it stays on the pedestal/floor when zoom changes.
${shaderNote}

Recipe:
${JSON.stringify(buildSceneRecipeJson(recipe), null, 2)}`;
}

export function buildSceneReactExport(recipe: Recipe) {
  const settings = JSON.stringify(buildSceneRecipeJson(recipe), null, 2);
  const shader = getThreeShaderMaterial(recipe.threeMaterial);

  if (shader) {
    return `"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Color, ShaderMaterial } from "three";

const VERTEX_SHADER = ${JSON.stringify(MESH_SURFACE_VERT)};

const FRAGMENT_SHADER = ${JSON.stringify(shader.frag)};

const recipe = ${settings};

function SceneMaterial() {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uWarp: { value: recipe.warp },
          uContrast: { value: recipe.contrast },
          uGrain: { value: recipe.grain },
          uSeed: { value: recipe.seed },
          uSpeed: { value: recipe.speed },
          uIntensity: { value: recipe.intensity },
          uColorA: { value: new Color(recipe.palette[1] ?? "#273dff") },
          uColorB: { value: new Color(recipe.palette[2] ?? "#00ddff") },
          uColorC: { value: new Color(recipe.palette[3] ?? "#e8fbff") },
        },
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
      }),
    [],
  );

  useFrame((_, delta) => {
    if (!recipe.animate) return;
    material.uniforms.uTime.value += delta * (0.35 + recipe.speed * 1.1);
  });

  return <primitive object={material} attach="material" />;
}

export function ScenePreview() {
  return (
    <Canvas camera={{ position: [0, 1.15, 4.1], fov: 38 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[2.5, 3.2, 2.2]} intensity={1.6} />
      <mesh>
        <torusKnotGeometry args={[0.62, 0.22, 180, 24]} />
        <SceneMaterial />
      </mesh>
      <Environment preset="studio" />
      <OrbitControls enablePan={false} target={[0, 1, 0]} />
    </Canvas>
  );
}
`;
  }

  return `"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";

const recipe = ${settings};

export function ScenePreview() {
  return (
    <Canvas shadows camera={{ position: [0, 1.15, 4.1], fov: 38 }}>
      <ambientLight intensity={0.4} />
      <directionalLight castShadow position={[2.5, 3.2, 2.2]} intensity={1.6} />
      <mesh castShadow receiveShadow>
        <torusKnotGeometry args={[0.62, 0.22, 180, 24]} />
        <meshStandardMaterial
          color={recipe.palette[0] ?? "#060914"}
          metalness={recipe.threeMaterial === "chrome" ? 1 : 0.15}
          roughness={recipe.threeMaterial === "matte" ? 0.55 : 0.08}
          envMapIntensity={1.2}
        />
      </mesh>
      <Environment preset="studio" />
      <OrbitControls enablePan={false} target={[0, 1, 0]} />
    </Canvas>
  );
}
`;
}

export function buildSceneGlslExport(recipe: Recipe) {
  if (isThreeShaderMaterial(recipe.threeMaterial)) {
    return getSceneShaderGlslExport(recipe.threeMaterial);
  }

  const params: Record<string, unknown> = {
    threeMaterial: recipe.threeMaterial,
    palette: recipe.palette,
    intensity: recipe.intensity,
    warp: recipe.warp,
    contrast: recipe.contrast,
    grain: recipe.grain,
  };

  if (recipe.threeMaterial === "chrome") {
    params.type = "MeshStandardMaterial";
    params.metalness = 1;
    params.roughness = `0.12 - contrast * 0.08 + warp * 0.06`;
    params.envMapIntensity = `1.35 + intensity * 0.55`;
  } else if (recipe.threeMaterial === "glass") {
    params.type = "MeshPhysicalMaterial";
    params.transmission = 0.88;
    params.thickness = `0.4 + contrast * 1.6`;
    params.ior = `1.2 + warp * 0.45`;
  } else if (recipe.threeMaterial === "iridescent") {
    params.type = "MeshPhysicalMaterial";
    params.iridescence = `0.75 + warp * 0.25`;
    params.metalness = 0.7;
  }

  return `// ${threeMaterialNames[recipe.threeMaterial] ?? recipe.threeMaterial} uses Three.js built-in materials (no custom GLSL).
// Map recipe sliders to material properties, or switch to a Shader material from the Scene catalog.

${JSON.stringify(params, null, 2)}`;
}
