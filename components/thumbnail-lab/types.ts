import type { Recipe, VisualKind } from "../shader-studio/types";
import type { MediaSource } from "../shader-studio/types";
import {
  buildAsciiPreviewRecipe,
  buildMediaPreviewRecipe,
  buildShaderPreviewRecipe,
  buildThreeMaterialPreviewRecipe,
  buildThreeObjectPreviewRecipe,
  InputMode,
  PreviewPresetOptions,
  previewSampleLabel,
  shaderStyleIds,
} from "../shader-studio/preview-recipes";
import { asciiStyleIds } from "../shader-studio/ascii-catalog";
import { mediaFilterIds } from "../shader-studio/media-catalog";
import { threeMaterialIds, threeObjectIds } from "../shader-studio/three-catalog";
import { styleNames } from "../shader-studio/canvas";

export type { InputMode, PreviewPresetOptions };

export type ThumbnailKind = VisualKind;
export type ScenePreviewTarget = "material" | "object";

export type ThumbnailJob = {
  id: string;
  kind: ThumbnailKind;
  label: string;
  filename: string;
  recipe: Recipe;
  inputLabel: string;
};

export type ThumbnailBuildOptions = {
  seed?: number;
  preset?: PreviewPresetOptions;
  sceneTarget?: ScenePreviewTarget;
};

function shaderFilename(style: number) {
  return `${style}.png`;
}

function mediaFilename(filter: string) {
  return `${filter}.png`;
}

function asciiFilename(style: string) {
  return `${style}.png`;
}

function sceneMaterialFilename(material: string) {
  return `${material}.png`;
}

function sceneObjectFilename(object: string) {
  return `${object}.png`;
}

function paletteInputLabel(preset?: PreviewPresetOptions) {
  if (!preset?.palette?.length) return "style palette";
  return `palette · ${preset.palette.length} stops`;
}

function buildInputLabel(kind: ThumbnailKind, mode: InputMode, recipe: Recipe, preset?: PreviewPresetOptions) {
  if (mode === "random") {
    if (kind === "shader" || kind === "3d") return `random · seed ${recipe.seed}`;
    return previewSampleLabel(recipe.mediaSource);
  }
  const paletteLabel = paletteInputLabel(preset);
  if (kind === "shader" || kind === "3d") return paletteLabel;
  const sourceLabel = previewSampleLabel(recipe.mediaSource);
  return `${sourceLabel} · ${paletteLabel}`;
}

export function buildThumbnailJobs(
  kind: ThumbnailKind,
  mode: InputMode,
  options: ThumbnailBuildOptions = {},
): ThumbnailJob[] {
  const { seed, preset, sceneTarget = "material" } = options;

  if (kind === "shader") {
    return shaderStyleIds.map((style) => {
      const recipe = buildShaderPreviewRecipe(style, mode, seed, preset);
      return {
        id: `shader-${style}`,
        kind,
        label: styleNames[style] ?? `Style ${style}`,
        filename: shaderFilename(style),
        recipe,
        inputLabel: buildInputLabel(kind, mode, recipe, preset),
      };
    });
  }

  if (kind === "media") {
    return mediaFilterIds.map((filter) => {
      const recipe = buildMediaPreviewRecipe(filter, mode, seed, preset);
      return {
        id: `media-${filter}`,
        kind,
        label: recipe.name,
        filename: mediaFilename(filter),
        recipe,
        inputLabel: buildInputLabel(kind, mode, recipe, preset),
      };
    });
  }

  if (kind === "ascii") {
    return asciiStyleIds.map((style) => {
      const recipe = buildAsciiPreviewRecipe(style, mode, seed, preset);
      return {
        id: `ascii-${style}`,
        kind,
        label: recipe.name,
        filename: asciiFilename(style),
        recipe,
        inputLabel: buildInputLabel(kind, mode, recipe, preset),
      };
    });
  }

  if (kind === "3d") {
    if (sceneTarget === "object") {
      return threeObjectIds.map((object) => {
        const recipe = buildThreeObjectPreviewRecipe(object, mode, seed, preset);
        return {
          id: `scene-object-${object}`,
          kind,
          label: recipe.name,
          filename: sceneObjectFilename(object),
          recipe,
          inputLabel: buildInputLabel(kind, mode, recipe, preset),
        };
      });
    }
    return threeMaterialIds.map((material) => {
      const recipe = buildThreeMaterialPreviewRecipe(material, mode, seed, preset);
      return {
        id: `scene-material-${material}`,
        kind,
        label: recipe.name,
        filename: sceneMaterialFilename(material),
        recipe,
        inputLabel: buildInputLabel(kind, mode, recipe, preset),
      };
    });
  }

  const _exhaustive: never = kind;
  throw new Error(`Unhandled thumbnail kind: ${_exhaustive}`);
}

export function buildSingleThumbnailJob(
  kind: ThumbnailKind,
  jobId: string,
  mode: InputMode,
  options: ThumbnailBuildOptions = {},
): ThumbnailJob | null {
  return buildThumbnailJobs(kind, mode, options).find((job) => job.id === jobId) ?? null;
}

export function thumbnailZipName(kind: ThumbnailKind, mode: InputMode, sceneTarget: ScenePreviewTarget = "material") {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  if (kind === "3d") {
    return `scene-${sceneTarget}-previews-${mode}-${stamp}.zip`;
  }
  return `${kind}-previews-${mode}-${stamp}.zip`;
}
