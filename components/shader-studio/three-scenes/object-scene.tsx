"use client";

import { Suspense, useRef } from "react";
import type { DirectionalLight } from "three";
import { Group } from "three";
import type { Recipe, ThreeSceneObject } from "../types";
import { resolveThreeObjects } from "../three-scene-objects";
import {
  clampObjectScale,
  Pedestal,
  PresetMesh,
  roomTheme,
  RoomShell,
  ScaledSubjectContent,
  sceneBackgroundColor,
  scenePlacement,
  SceneEnvironment,
  SceneLightingRig,
  SceneMaterial,
  UploadedModel,
  useSceneLighting,
  useSceneRenderedMarker,
} from "../three-scene-shared";
import { ScenePostFX } from "./scene-post-fx";

function SceneObjectMesh({
  item,
  recipe,
  frozen,
  globalScale,
}: {
  item: ThreeSceneObject;
  recipe: Recipe;
  frozen: boolean;
  globalScale: number;
}) {
  const contentKey = `${item.id}:${item.object}:${item.modelUpload ?? ""}`;
  const localScale = item.scale * globalScale;

  return (
    <group position={item.position} rotation={item.rotation}>
      <ScaledSubjectContent scale={localScale} contentKey={contentKey}>
        {item.modelUpload ? (
          <Suspense fallback={null}>
            <UploadedModel url={item.modelUpload} />
          </Suspense>
        ) : (
          <PresetMesh objectId={item.object} castShadow receiveShadow>
            <SceneMaterial recipe={recipe} materialId={item.material} frozen={frozen} />
          </PresetMesh>
        )}
      </ScaledSubjectContent>
    </group>
  );
}

export function ObjectScene({
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
  const lightRef = useRef<DirectionalLight>(null);
  const objects = resolveThreeObjects(recipe);
  const scale = clampObjectScale(recipe.zoom);
  const theme = roomTheme(recipe.threeEnvironment);
  const { showRoom, usePedestal, pivotY } = scenePlacement(recipe);
  const bgColor = sceneBackgroundColor(recipe, theme);
  const subjectKey = objects.map((item) => `${item.id}:${item.object}:${item.material}`).join("|");

  useSceneRenderedMarker();
  useSceneLighting({
    recipe,
    frozen,
    lightAz,
    lightEl,
    pivotY,
    scale,
    theme,
    lightRef,
    groupRef,
    spinGroup: objects.length === 1,
  });

  return (
    <>
      {!transparentBackground && <color attach="background" args={[bgColor]} />}
      <SceneLightingRig theme={theme} recipe={recipe} lightRef={lightRef} />
      {showRoom && <RoomShell theme={theme} />}
      {usePedestal && <Pedestal color={theme.pedestal} />}
      <group ref={groupRef} position={[0, pivotY, 0]} key={subjectKey}>
        {objects.map((item) => (
          <SceneObjectMesh
            key={item.id}
            item={item}
            recipe={recipe}
            frozen={frozen}
            globalScale={scale}
          />
        ))}
      </group>
      <SceneEnvironment envPreset={theme.envPreset} />
      {objects.length > 1 && <ScenePostFX recipe={recipe} vignette={false} />}
    </>
  );
}
