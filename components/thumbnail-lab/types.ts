import type { AsciiStyleId, MediaFilterId, Recipe, VisualKind } from "../shader-studio/types";
import type { MediaSource } from "../shader-studio/types";
import {
  buildAsciiPreviewRecipe,
  buildMediaPreviewRecipe,
  buildShaderPreviewRecipe,
  InputMode,
  PreviewPresetOptions,
  previewSampleLabel,
  shaderStyleIds,
} from "../shader-studio/preview-recipes";
import { asciiStyleIds } from "../shader-studio/ascii-catalog";
import { mediaFilterIds } from "../shader-studio/media-catalog";
import { styleNames } from "../shader-studio/canvas";

export type { InputMode, PreviewPresetOptions };

export type ThumbnailKind = VisualKind;

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
};

function shaderFilename(style: number) {
  return `${style}.png`;
}

function mediaFilename(filter: MediaFilterId) {
  return `${filter}.png`;
}

function asciiFilename(style: AsciiStyleId) {
  return `${style}.png`;
}

function paletteInputLabel(preset?: PreviewPresetOptions) {
  if (!preset?.palette?.length) return "style palette";
  return `palette · ${preset.palette.length} stops`;
}

function buildInputLabel(kind: ThumbnailKind, mode: InputMode, recipe: Recipe, preset?: PreviewPresetOptions) {
  if (mode === "random") {
    return kind === "shader" ? `random · seed ${recipe.seed}` : previewSampleLabel(recipe.mediaSource);
  }
  const paletteLabel = paletteInputLabel(preset);
  if (kind === "shader") return paletteLabel;
  const sourceLabel = previewSampleLabel(recipe.mediaSource);
  return `${sourceLabel} · ${paletteLabel}`;
}

export function buildThumbnailJobs(
  kind: ThumbnailKind,
  mode: InputMode,
  options: ThumbnailBuildOptions = {},
): ThumbnailJob[] {
  const { seed, preset } = options;

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

export function buildSingleThumbnailJob(
  kind: ThumbnailKind,
  jobId: string,
  mode: InputMode,
  options: ThumbnailBuildOptions = {},
): ThumbnailJob | null {
  return buildThumbnailJobs(kind, mode, options).find((job) => job.id === jobId) ?? null;
}

export function thumbnailZipName(kind: ThumbnailKind, mode: InputMode) {
  const stamp = new Date().toISOString().replace(/[:.]/g, "-");
  return `${kind}-previews-${mode}-${stamp}.zip`;
}
