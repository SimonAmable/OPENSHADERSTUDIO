"use client";

import { MarchingCube, MarchingCubes } from "@react-three/drei";
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

export function MorphSdfScene({
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
  const blobA = useRef<Group>(null);
  const blobB = useRef<Group>(null);
  const lightRef = useRef(null);
  const palette = scenePalette(recipe);
  const bgColor = palette.bg;
  const theme = {
    bg: bgColor,
    floor: bgColor,
    wall: bgColor,
    pedestal: bgColor,
    ambient: 0.08,
    hemiSky: palette.b,
    hemiGround: palette.bg,
    envPreset: "night" as const,
    lightTint: palette.c,
    showRoom: false,
  };
  const resolution = useMemo(() => 40 + Math.floor(recipe.contrast * 10), [recipe.contrast]);
  const strength = 0.55 + recipe.warp * 0.45;
  const subtract = 10 + recipe.intensity * 6;
  const colorA = useMemo(() => new Color(palette.a), [palette.a]);
  const colorB = useMemo(() => new Color(palette.b), [palette.b]);
  const colorC = useMemo(() => new Color(palette.c), [palette.c]);

  useSceneRenderedMarker();
  useSceneLighting({
    recipe,
    frozen,
    lightAz,
    lightEl,
    pivotY: 0.15,
    scale: 1,
    theme,
    lightRef,
    groupRef,
    spinGroup: true,
  });

  useFrame((state) => {
    if (!blobA.current || !blobB.current) return;
    const t = state.clock.elapsedTime * recipe.speed;
    if (!frozen && recipe.animate) {
      blobA.current.position.set(
        Math.sin(t * 0.55) * 0.35,
        0.08 + Math.sin(t * 0.8) * 0.12,
        Math.cos(t * 0.45) * 0.2,
      );
      blobB.current.position.set(
        -0.35 + Math.cos(t * 0.42) * 0.25,
        -0.05 + Math.cos(t * 0.65) * 0.15,
        0.2 + Math.sin(t * 0.5) * 0.18,
      );
    }
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(t * 0.25) * recipe.drift * 0.2;
    }
  });

  return (
    <>
      {!transparentBackground && <color attach="background" args={[bgColor]} />}
      <fog attach="fog" args={[bgColor, 4, 16]} />
      <SceneLightingRig theme={theme} recipe={recipe} lightRef={lightRef} castShadow={false} />
      <group ref={groupRef} position={[0, 0.15, 0]} scale={0.85 + recipe.zoom * 0.35}>
        <MarchingCubes resolution={resolution} maxPolyCount={18000} enableUvs={false}>
          <meshPhysicalMaterial
            attach="material"
            color={colorA}
            emissive={colorC}
            emissiveIntensity={0.12 + recipe.intensity * 0.22}
            metalness={0.65}
            roughness={0.12 + recipe.grain * 0.5}
            clearcoat={0.85}
            clearcoatRoughness={0.1}
            iridescence={0.5 + recipe.warp * 0.35}
            iridescenceIOR={1.25}
          />
          <group ref={blobA}>
            <MarchingCube color={colorB} strength={strength} subtract={subtract} />
          </group>
          <group ref={blobB}>
            <MarchingCube color={colorC} strength={strength * 0.9} subtract={subtract} />
          </group>
          <MarchingCube position={[0.3, -0.15, -0.25]} color={colorA} strength={strength * 0.75} subtract={subtract} />
        </MarchingCubes>
      </group>
      <SceneEnvironment envPreset="night" />
      <CinematicPostFX recipe={recipe} preset="morph-sdf" />
    </>
  );
}
