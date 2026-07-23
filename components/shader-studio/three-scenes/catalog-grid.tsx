"use client";

import { Edges } from "@react-three/drei";
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

const GRID_LAYOUT = [
  { position: [0, 0.4, 0] as [number, number, number], scale: [1.1, 1.4, 0.08] as [number, number, number], colorIndex: 1 },
  { position: [-1.35, 0.05, 0.45] as [number, number, number], scale: [0.75, 0.95, 0.06] as [number, number, number], colorIndex: 2 },
  { position: [1.25, 0.1, -0.35] as [number, number, number], scale: [0.7, 0.88, 0.06] as [number, number, number], colorIndex: 0 },
  { position: [0.15, -0.25, -1.05] as [number, number, number], scale: [0.82, 1.05, 0.06] as [number, number, number], colorIndex: 3 },
  { position: [-0.55, 0.55, -0.75] as [number, number, number], scale: [0.62, 0.78, 0.05] as [number, number, number], colorIndex: 2 },
  { position: [0.85, 0.45, 0.85] as [number, number, number], scale: [0.58, 0.72, 0.05] as [number, number, number], colorIndex: 1 },
];

export function CatalogGridScene({
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
  const colors = useMemo(() => recipe.palette.slice(0, 4), [recipe.palette]);
  const theme = {
    bg: bgColor,
    floor: bgColor,
    wall: bgColor,
    pedestal: bgColor,
    ambient: 0.08,
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
    groupRef,
    spinGroup: false,
  });

  useFrame((state) => {
    if (!groupRef.current || frozen || !recipe.animate) return;
    const t = state.clock.elapsedTime * (0.25 + recipe.speed * 0.35);
    groupRef.current.rotation.y = recipe.rotate + t * 0.15;
    groupRef.current.children.forEach((child, index) => {
      child.position.y = GRID_LAYOUT[index]?.position[1] ?? 0;
      child.position.y += Math.sin(t + index * 0.8) * (0.04 + recipe.drift * 0.12);
    });
  });

  return (
    <>
      {!transparentBackground && <color attach="background" args={[bgColor]} />}
      <fog attach="fog" args={[bgColor, 4, 15]} />
      <SceneLightingRig theme={theme} recipe={recipe} lightRef={lightRef} castShadow={false} />
      <group ref={groupRef} scale={0.8 + recipe.zoom * 0.22}>
        {GRID_LAYOUT.map((item, index) => {
          const color = colors[item.colorIndex % colors.length] ?? palette.a;
          return (
            <mesh key={index} position={item.position} scale={item.scale} castShadow>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial
                color={new Color(color)}
                emissive={new Color(color)}
                emissiveIntensity={0.06 + recipe.intensity * 0.14}
                metalness={0.55}
                roughness={0.25}
                transparent
                opacity={0.88}
              />
              <Edges color={palette.c} threshold={15} />
            </mesh>
          );
        })}
      </group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.55, 0]}>
        <planeGeometry args={[12, 12]} />
        <meshStandardMaterial color={palette.bg} roughness={0.95} metalness={0.05} />
      </mesh>
      <SceneEnvironment envPreset="night" />
      <CinematicPostFX recipe={recipe} preset="catalog-grid" />
    </>
  );
}
