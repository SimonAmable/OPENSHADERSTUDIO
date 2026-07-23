"use client";

import type { Recipe, ThreeScenePresetId } from "../types";
import { AgenticCloudScene } from "./agentic-cloud";
import { CausticStageScene } from "./caustic-stage";
import { CatalogGridScene } from "./catalog-grid";
import { MorphSdfScene } from "./morph-sdf";
import { ObjectScene } from "./object-scene";
import { PulseSidekickScene } from "./pulse-sidekick";
import { VolumetricGlowScene } from "./volumetric-glow";

export type SceneContentProps = {
  recipe: Recipe;
  frozen: boolean;
  lightAz: number;
  lightEl: number;
  transparentBackground?: boolean;
};

function PresetScene({ preset, ...props }: SceneContentProps & { preset: ThreeScenePresetId }) {
  switch (preset) {
    case "agentic-cloud":
      return <AgenticCloudScene {...props} />;
    case "volumetric-glow":
      return <VolumetricGlowScene {...props} />;
    case "caustic-stage":
      return <CausticStageScene {...props} />;
    case "catalog-grid":
      return <CatalogGridScene {...props} />;
    case "pulse-sidekick":
      return <PulseSidekickScene {...props} />;
    case "morph-sdf":
      return <MorphSdfScene {...props} />;
    default: {
      const _exhaustive: never = preset;
      return _exhaustive;
    }
  }
}

export function SceneRouter(props: SceneContentProps) {
  if (props.recipe.threeSceneMode === "preset") {
    return <PresetScene preset={props.recipe.threeScenePreset} {...props} />;
  }
  return <ObjectScene {...props} />;
}
