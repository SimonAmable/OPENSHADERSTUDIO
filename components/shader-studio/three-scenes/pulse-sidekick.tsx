"use client";

import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { Color, Group } from "three";
import type { Recipe } from "../types";
import {
  SceneEnvironment,
  SceneLightingRig,
  useSceneLighting,
  useSceneRenderedMarker,
} from "../three-scene-shared";
import { scenePalette } from "./scene-shaders";
import { CinematicPostFX } from "./scene-post-fx";

export function PulseSidekickScene({
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
  const ringsRef = useRef<Group>(null);
  const lightRef = useRef(null);
  const palette = scenePalette(recipe);
  const bgColor = palette.bg;
  const pulseColor = useMemo(() => palette.a, [palette.a]);
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
    pivotY: 0.2,
    scale: 1,
    theme,
    lightRef,
    groupRef,
    spinGroup: false,
  });

  useFrame((state) => {
    if (!ringsRef.current || frozen || !recipe.animate) return;
    const t = state.clock.elapsedTime * (0.6 + recipe.speed * 0.8);
    ringsRef.current.rotation.x = Math.sin(t * 0.35) * 0.25;
    ringsRef.current.rotation.z = t * 0.22;
    ringsRef.current.children.forEach((ring, index) => {
      const pulse = 1 + Math.sin(t * 1.6 + index) * (0.04 + recipe.drift * 0.08);
      ring.scale.setScalar(pulse);
    });
  });

  return (
    <>
      {!transparentBackground && <color attach="background" args={[bgColor]} />}
      <fog attach="fog" args={[bgColor, 3, 14]} />
      <SceneLightingRig theme={theme} recipe={recipe} lightRef={lightRef} castShadow={false} />
      <group ref={groupRef}>
        <group ref={ringsRef}>
          {[1.35, 1.75, 2.15].map((radius, index) => (
            <mesh key={radius} rotation={[Math.PI / 2, 0, index * 0.4]}>
              <torusGeometry args={[radius * (0.55 + recipe.zoom * 0.15), 0.012, 16, 120]} />
              <meshBasicMaterial color={palette.c} transparent opacity={0.22 - index * 0.05} />
            </mesh>
          ))}
        </group>
        <Float
          speed={frozen || !recipe.animate ? 0 : 1.1 + recipe.speed * 0.6}
          rotationIntensity={0.2 + recipe.warp * 0.25}
          floatIntensity={0.25 + recipe.intensity * 0.35}
        >
          <mesh scale={0.72 + recipe.zoom * 0.2}>
            <icosahedronGeometry args={[0.72, 4]} />
            <MeshDistortMaterial
              color={pulseColor}
              emissive={new Color(palette.c)}
              emissiveIntensity={0.25 + recipe.intensity * 0.45}
              roughness={0.15}
              metalness={0.35}
              distort={0.28 + recipe.warp * 0.35}
              speed={frozen || !recipe.animate ? 0 : 1.5 + recipe.speed}
            />
          </mesh>
        </Float>
      </group>
      <pointLight position={[0, 1.5, 1]} intensity={2 + recipe.intensity * 3} color={palette.c} distance={10} />
      <SceneEnvironment envPreset="night" />
      <CinematicPostFX recipe={recipe} preset="pulse-sidekick" />
    </>
  );
}
