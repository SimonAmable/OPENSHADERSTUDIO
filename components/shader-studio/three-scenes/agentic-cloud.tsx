"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  ShaderMaterial,
} from "three";
import type { Recipe } from "../types";
import {
  SceneEnvironment,
  SceneLightingRig,
  useSceneLighting,
  useSceneRenderedMarker,
} from "../three-scene-shared";
import {
  createPointCloudAttributes,
  pointCloudFragment,
  pointCloudVertex,
  scenePalette,
  scenePaletteColors,
} from "./scene-shaders";
import { CinematicPostFX } from "./scene-post-fx";

function AgenticPointCloud({
  recipe,
  frozen,
  count,
}: {
  recipe: Recipe;
  frozen: boolean;
  count: number;
}) {
  const materialRef = useRef<ShaderMaterial>(null);
  const palette = scenePalette(recipe);
  const colors = scenePaletteColors(palette);

  const geometry = useMemo(() => {
    const geo = new BufferGeometry();
    const attrs = createPointCloudAttributes(count, 2.6 + recipe.zoom * 0.8);
    geo.setAttribute("position", new BufferAttribute(attrs.positions, 3));
    geo.setAttribute("normal", new BufferAttribute(attrs.normals, 3));
    geo.setAttribute("aSeed", new BufferAttribute(attrs.seeds, 1));
    geo.setAttribute("aWeight", new BufferAttribute(attrs.weights, 1));
    return geo;
  }, [count, recipe.zoom, recipe.seed]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uFlow: { value: recipe.warp },
    uDrift: { value: recipe.drift },
    uSize: { value: 1.8 + recipe.intensity * 2.2 },
    uIntensity: { value: recipe.intensity },
    uColorA: { value: colors.a },
    uColorB: { value: colors.b },
    uColorC: { value: colors.c },
  }), [colors.a, colors.b, colors.c, recipe.intensity, recipe.warp, recipe.drift]);

  useFrame((state) => {
    if (!materialRef.current) return;
    if (!frozen && recipe.animate) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * recipe.speed;
    }
    materialRef.current.uniforms.uFlow.value = recipe.warp;
    materialRef.current.uniforms.uDrift.value = recipe.drift;
    materialRef.current.uniforms.uSize.value = 1.8 + recipe.intensity * 2.2;
    materialRef.current.uniforms.uIntensity.value = recipe.intensity;
  });

  return (
    <points geometry={geometry}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={pointCloudVertex}
        fragmentShader={pointCloudFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
      />
    </points>
  );
}

export function AgenticCloudScene({
  recipe,
  frozen,
  lightAz,
  lightEl,
  transparentBackground,
}: {
  recipe: Recipe;
  frozen: boolean;
  lightAz: number;
  lightEl: number;
  transparentBackground?: boolean;
}) {
  const lightRef = useRef(null);
  const palette = scenePalette(recipe);
  const bgColor = palette.bg;
  const pointCount = Math.floor(4200 + recipe.zoom * 3800 + recipe.intensity * 2200);
  const theme = {
    bg: bgColor,
    floor: bgColor,
    wall: bgColor,
    pedestal: bgColor,
    ambient: 0.06,
    hemiSky: palette.a,
    hemiGround: palette.bg,
    envPreset: "night" as const,
    lightTint: palette.c,
    showRoom: false,
  };

  useSceneRenderedMarker();
  useSceneLighting({
    recipe,
    frozen,
    lightAz,
    lightEl,
    pivotY: 0,
    scale: 1,
    theme,
    lightRef,
    spinGroup: false,
  });

  return (
    <>
      {!transparentBackground && <color attach="background" args={[bgColor]} />}
      <fog attach="fog" args={[bgColor, 4, 14]} />
      <SceneLightingRig theme={theme} recipe={recipe} lightRef={lightRef} castShadow={false} />
      <AgenticPointCloud recipe={recipe} frozen={frozen} count={pointCount} />
      <mesh position={[0, 0.15, 0]}>
        <icosahedronGeometry args={[0.42 + recipe.contrast * 0.12, 1]} />
        <meshStandardMaterial
          color={palette.b}
          emissive={new Color(palette.a)}
          emissiveIntensity={0.45 + recipe.intensity * 0.55}
          metalness={0.92}
          roughness={0.08}
        />
      </mesh>
      <SceneEnvironment envPreset="night" />
      <CinematicPostFX recipe={recipe} preset="agentic-cloud" />
    </>
  );
}
