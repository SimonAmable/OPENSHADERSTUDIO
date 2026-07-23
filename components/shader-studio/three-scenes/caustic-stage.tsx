"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, DoubleSide, ShaderMaterial } from "three";
import type { Recipe } from "../types";
import {
  Pedestal,
  PresetMesh,
  SceneEnvironment,
  SceneLightingRig,
  SceneMaterial,
  useSceneLighting,
  useSceneRenderedMarker,
} from "../three-scene-shared";
import { causticFloorFragment, scenePalette, scenePaletteColors } from "./scene-shaders";
import { CinematicPostFX } from "./scene-post-fx";

export function CausticStageScene({
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
  const floorMatRef = useRef<ShaderMaterial>(null);
  const palette = scenePalette(recipe);
  const colors = scenePaletteColors(palette);
  const bgColor = palette.bg;
  const theme = {
    bg: bgColor,
    floor: bgColor,
    wall: "#0a0a0e",
    pedestal: "#111116",
    ambient: 0.1,
    hemiSky: palette.b,
    hemiGround: palette.bg,
    envPreset: "night" as const,
    lightTint: palette.c,
    showRoom: true,
  };

  const floorUniforms = useMemo(() => ({
    uTime: { value: 0 },
    uScale: { value: 3.2 + recipe.zoom * 1.4 },
    uWarp: { value: recipe.warp },
    uColorA: { value: colors.bg },
    uColorB: { value: colors.a },
    uColorC: { value: colors.c },
  }), [colors.a, colors.b, colors.bg, colors.c, recipe.warp, recipe.zoom]);

  useSceneRenderedMarker();
  useSceneLighting({
    recipe,
    frozen,
    lightAz,
    lightEl,
    pivotY: 0.1,
    scale: recipe.zoom,
    theme,
    lightRef,
    spinGroup: false,
  });

  useFrame((state) => {
    if (!floorMatRef.current || frozen || !recipe.animate) return;
    floorMatRef.current.uniforms.uTime.value = state.clock.elapsedTime * recipe.speed;
    floorMatRef.current.uniforms.uWarp.value = recipe.warp;
    floorMatRef.current.uniforms.uScale.value = 3.2 + recipe.zoom * 1.4;
  });

  return (
    <>
      {!transparentBackground && <color attach="background" args={[bgColor]} />}
      <fog attach="fog" args={[bgColor, 5, 18]} />
      <SceneLightingRig theme={theme} recipe={recipe} lightRef={lightRef} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <shaderMaterial
          ref={floorMatRef}
          vertexShader={`
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `}
          fragmentShader={causticFloorFragment}
          uniforms={floorUniforms}
          side={DoubleSide}
        />
      </mesh>
      <mesh position={[0, 3.2, -4.6]} receiveShadow>
        <planeGeometry args={[18, 8]} />
        <meshStandardMaterial color={theme.wall} roughness={0.98} metalness={0} />
      </mesh>
      <Pedestal color={theme.pedestal} />
      <Float
        speed={frozen || !recipe.animate ? 0 : 0.8 + recipe.speed * 0.5}
        rotationIntensity={0.12 + recipe.drift * 0.2}
        floatIntensity={0.18 + recipe.intensity * 0.25}
      >
        <group position={[0, 0.12, 0]} rotation={[0, recipe.rotate, 0]} scale={0.75 + recipe.zoom * 0.25}>
          <PresetMesh objectId="torus-knot" castShadow receiveShadow>
            <SceneMaterial recipe={recipe} materialId="chrome" frozen={frozen} />
          </PresetMesh>
        </group>
      </Float>
      <pointLight position={[0, 3.5, 1.2]} intensity={1.2 + recipe.intensity * 2} color={palette.c} distance={8} />
      <SceneEnvironment envPreset="night" />
      <CinematicPostFX recipe={recipe} preset="caustic-stage" />
    </>
  );
}
