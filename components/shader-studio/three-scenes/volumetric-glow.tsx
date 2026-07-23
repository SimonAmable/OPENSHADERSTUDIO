"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { AdditiveBlending, Color, DoubleSide, Group, ShaderMaterial } from "three";
import type { Recipe } from "../types";
import {
  SceneEnvironment,
  SceneLightingRig,
  useSceneLighting,
  useSceneRenderedMarker,
} from "../three-scene-shared";
import { scenePalette, scenePaletteColors, volumetricGlowFragment } from "./scene-shaders";
import { CinematicPostFX } from "./scene-post-fx";

function GlowPlane({
  recipe,
  frozen,
  scale,
  position,
  rotation,
  opacity,
}: {
  recipe: Recipe;
  frozen: boolean;
  scale: [number, number];
  position: [number, number, number];
  rotation: [number, number, number];
  opacity: number;
}) {
  const materialRef = useRef<ShaderMaterial>(null);
  const palette = scenePalette(recipe);
  const colors = scenePaletteColors(palette);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uIntensity: { value: opacity * (0.5 + recipe.intensity * 0.8) },
    uColorA: { value: colors.a },
    uColorB: { value: colors.b },
    uColorC: { value: colors.c },
  }), [colors.a, colors.b, colors.c, opacity, recipe.intensity]);

  useFrame((state) => {
    if (!materialRef.current || frozen || !recipe.animate) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime * recipe.speed;
    materialRef.current.uniforms.uIntensity.value = opacity * (0.5 + recipe.intensity * 0.8);
  });

  return (
    <mesh position={position} rotation={rotation} scale={[scale[0], scale[1], 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={volumetricGlowFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={AdditiveBlending}
        side={DoubleSide}
      />
    </mesh>
  );
}

export function VolumetricGlowScene({
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
  const groupRef = useRef<Group>(null);
  const lightRef = useRef(null);
  const palette = scenePalette(recipe);
  const bgColor = palette.bg;
  const theme = {
    bg: bgColor,
    floor: bgColor,
    wall: bgColor,
    pedestal: bgColor,
    ambient: 0.04,
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
    pivotY: 0.2,
    scale: 1,
    theme,
    lightRef,
    groupRef,
    spinGroup: false,
  });

  useFrame((state) => {
    if (!groupRef.current || frozen || !recipe.animate) return;
    groupRef.current.rotation.y = recipe.rotate + state.clock.elapsedTime * 0.06 * recipe.speed;
  });

  const scale = 2.4 + recipe.zoom * 1.2;

  return (
    <>
      {!transparentBackground && <color attach="background" args={[bgColor]} />}
      <fog attach="fog" args={[bgColor, 3, 16]} />
      <SceneLightingRig theme={theme} recipe={recipe} lightRef={lightRef} castShadow={false} />
      <group ref={groupRef}>
        <GlowPlane recipe={recipe} frozen={frozen} scale={[scale * 1.4, scale * 1.8]} position={[0, 0.3, -1.2]} rotation={[0, 0, 0]} opacity={0.55} />
        <GlowPlane recipe={recipe} frozen={frozen} scale={[scale, scale * 1.3]} position={[0.8, 0.1, 0]} rotation={[0, -0.8, 0.15]} opacity={0.35} />
        <GlowPlane recipe={recipe} frozen={frozen} scale={[scale * 0.9, scale]} position={[-0.9, -0.05, 0.2]} rotation={[0, 0.75, -0.12]} opacity={0.3} />
        <GlowPlane recipe={recipe} frozen={frozen} scale={[scale * 0.7, scale * 0.85]} position={[0, -0.35, 0.8]} rotation={[0.2, 0, 0]} opacity={0.22} />
        <mesh position={[0, 0.15, 0]}>
          <torusKnotGeometry args={[0.5, 0.14, 180, 24]} />
          <meshStandardMaterial
            color={palette.b}
            emissive={new Color(palette.a)}
            emissiveIntensity={0.35 + recipe.intensity * 0.5}
            metalness={1}
            roughness={0.1}
          />
        </mesh>
      </group>
      <SceneEnvironment envPreset="night" />
      <CinematicPostFX recipe={recipe} preset="volumetric-glow" />
    </>
  );
}
