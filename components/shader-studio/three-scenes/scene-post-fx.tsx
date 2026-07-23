"use client";

import {
  Bloom,
  ChromaticAberration,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import type { Recipe } from "../types";
import type { ThreeScenePresetId } from "../types";

export function ScenePostFX({
  recipe,
  bloom = true,
  vignette = true,
}: {
  recipe: Recipe;
  bloom?: boolean;
  vignette?: boolean;
}) {
  const bloomIntensity = 0.65 + recipe.intensity * 1.4;
  const threshold = Math.max(0.08, 0.35 - recipe.contrast * 0.2);

  return (
    <EffectComposer multisampling={4}>
      {bloom ? (
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={threshold}
          luminanceSmoothing={0.35}
          mipmapBlur
        />
      ) : <></>}
      {vignette ? <Vignette eskil={false} offset={0.12} darkness={0.45 + recipe.grain * 2} /> : <></>}
    </EffectComposer>
  );
}

const presetFx: Record<ThreeScenePresetId, { bloom: number; chroma: number; noise: number; vignette: number }> = {
  "agentic-cloud": { bloom: 1.35, chroma: 0.0012, noise: 0.025, vignette: 0.62 },
  "volumetric-glow": { bloom: 1.6, chroma: 0.0008, noise: 0.018, vignette: 0.55 },
  "caustic-stage": { bloom: 1.1, chroma: 0.0015, noise: 0.02, vignette: 0.48 },
  "catalog-grid": { bloom: 0.95, chroma: 0.0006, noise: 0.03, vignette: 0.58 },
  "pulse-sidekick": { bloom: 1.45, chroma: 0.002, noise: 0.022, vignette: 0.5 },
  "morph-sdf": { bloom: 1.2, chroma: 0.0018, noise: 0.028, vignette: 0.54 },
};

export function CinematicPostFX({
  recipe,
  preset,
}: {
  recipe: Recipe;
  preset?: ThreeScenePresetId;
}) {
  const presetId = preset ?? recipe.threeScenePreset;
  const fx = presetFx[presetId] ?? presetFx["agentic-cloud"];
  const bloomIntensity = fx.bloom * (0.55 + recipe.intensity * 0.75);
  const threshold = Math.max(0.04, 0.28 - recipe.contrast * 0.18);

  return (
    <EffectComposer multisampling={4}>
      <Bloom
        intensity={bloomIntensity}
        luminanceThreshold={threshold}
        luminanceSmoothing={0.42}
        mipmapBlur
      />
      <ChromaticAberration
        offset={[fx.chroma * (1 + recipe.warp), fx.chroma * (1 + recipe.warp)]}
        blendFunction={BlendFunction.NORMAL}
        radialModulation={false}
        modulationOffset={0}
      />
      <Noise opacity={fx.noise + recipe.grain * 0.8} blendFunction={BlendFunction.OVERLAY} />
      <Vignette eskil={false} offset={0.1} darkness={fx.vignette + recipe.grain * 1.2} />
    </EffectComposer>
  );
}
