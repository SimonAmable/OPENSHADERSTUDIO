import type { AsciiBlendMode, AsciiCharsetId, AsciiStyleId, AsciiAnimationStyle, Recipe } from "./types";

export type { AsciiBlendMode, AsciiCharsetId, AsciiStyleId, AsciiAnimationStyle };

export type AsciiRenderMode =
  | "luminance"
  | "braille"
  | "edge"
  | "dither"
  | "blocks"
  | "shapes"
  | "disco";

export type AsciiStyleDef = {
  id: AsciiStyleId;
  label: string;
  group: "Classic" | "Shapes" | "Structure" | "Blocks" | "Effects";
  renderMode: AsciiRenderMode;
  defaultCharset: AsciiCharsetId;
  colorMode: "source" | "matrix" | "palette" | "disco";
};

export const asciiCharsets: Record<AsciiCharsetId, string> = {
  standard: " .'`^\",:;!i1tlI|/\\()[]{}?-_~+crxoO0v#",
  binary: " 01",
  blocks: " ░▒▓█",
  minimal: " .:-=+*#%@",
  detailed: " .'`^\",:;!i1tlI|/\\()[]{}?-_~+crxoO0v#MW&8%B@$",
  "braille-set": " ⠀⠁⠃⠇⡀⡇⣀⣧⣿",
  shapes: " ·•○●◆◇♦♥★✦▲△▼▽",
};

export const asciiStyles: AsciiStyleDef[] = [
  { id: "characters", label: "Characters", group: "Classic", renderMode: "luminance", defaultCharset: "standard", colorMode: "source" },
  { id: "braille", label: "Braille", group: "Classic", renderMode: "braille", defaultCharset: "braille-set", colorMode: "source" },
  { id: "mixed", label: "Mixed", group: "Classic", renderMode: "luminance", defaultCharset: "detailed", colorMode: "source" },
  { id: "hex-dump", label: "Hex dump", group: "Classic", renderMode: "luminance", defaultCharset: "binary", colorMode: "matrix" },
  { id: "matrix", label: "Matrix", group: "Classic", renderMode: "luminance", defaultCharset: "binary", colorMode: "matrix" },
  { id: "dots", label: "Dots", group: "Shapes", renderMode: "shapes", defaultCharset: "shapes", colorMode: "source" },
  { id: "cross", label: "Cross", group: "Shapes", renderMode: "shapes", defaultCharset: "shapes", colorMode: "palette" },
  { id: "diamond", label: "Diamond", group: "Shapes", renderMode: "shapes", defaultCharset: "shapes", colorMode: "palette" },
  { id: "rings", label: "Rings", group: "Shapes", renderMode: "shapes", defaultCharset: "shapes", colorMode: "source" },
  { id: "hearts", label: "Hearts", group: "Shapes", renderMode: "shapes", defaultCharset: "shapes", colorMode: "palette" },
  { id: "stars", label: "Stars", group: "Shapes", renderMode: "shapes", defaultCharset: "shapes", colorMode: "palette" },
  { id: "hexagons", label: "Hexagons", group: "Shapes", renderMode: "shapes", defaultCharset: "blocks", colorMode: "source" },
  { id: "triangles", label: "Triangles", group: "Shapes", renderMode: "shapes", defaultCharset: "shapes", colorMode: "source" },
  { id: "bubbles", label: "Bubbles", group: "Shapes", renderMode: "shapes", defaultCharset: "shapes", colorMode: "source" },
  { id: "lines", label: "Lines", group: "Structure", renderMode: "edge", defaultCharset: "minimal", colorMode: "palette" },
  { id: "diagonal", label: "Diagonal", group: "Structure", renderMode: "edge", defaultCharset: "minimal", colorMode: "palette" },
  { id: "hatching", label: "Hatching", group: "Structure", renderMode: "edge", defaultCharset: "minimal", colorMode: "palette" },
  { id: "contour", label: "Contour", group: "Structure", renderMode: "edge", defaultCharset: "minimal", colorMode: "source" },
  { id: "dither", label: "Dither", group: "Effects", renderMode: "dither", defaultCharset: "blocks", colorMode: "source" },
  { id: "pixel-art", label: "Pixel art", group: "Blocks", renderMode: "blocks", defaultCharset: "blocks", colorMode: "source" },
  { id: "mosaic", label: "Mosaic", group: "Blocks", renderMode: "blocks", defaultCharset: "blocks", colorMode: "palette" },
  { id: "bricks", label: "Bricks", group: "Blocks", renderMode: "blocks", defaultCharset: "blocks", colorMode: "source" },
  { id: "voxel", label: "Voxel", group: "Blocks", renderMode: "blocks", defaultCharset: "blocks", colorMode: "source" },
  { id: "half-blocks", label: "Half blocks", group: "Blocks", renderMode: "blocks", defaultCharset: "blocks", colorMode: "source" },
  { id: "disco", label: "Disco", group: "Effects", renderMode: "disco", defaultCharset: "detailed", colorMode: "disco" },
];

export const asciiStyleIds = asciiStyles.map((style) => style.id);

export const asciiStyleGroups = [
  { title: "Classic", items: asciiStyles.filter((style) => style.group === "Classic") },
  { title: "Shapes", items: asciiStyles.filter((style) => style.group === "Shapes") },
  { title: "Structure", items: asciiStyles.filter((style) => style.group === "Structure") },
  { title: "Blocks", items: asciiStyles.filter((style) => style.group === "Blocks") },
  { title: "Effects", items: asciiStyles.filter((style) => style.group === "Effects") },
] as const;

export const asciiStyleNames: Record<AsciiStyleId, string> = Object.fromEntries(
  asciiStyles.map((style) => [style.id, style.label]),
) as Record<AsciiStyleId, string>;

export const asciiBlendModes: AsciiBlendMode[] = [
  "normal",
  "multiply",
  "screen",
  "overlay",
  "difference",
  "lighten",
  "darken",
];

export const asciiCharsetOptions: { id: AsciiCharsetId; label: string }[] = [
  { id: "standard", label: "Standard" },
  { id: "binary", label: "Binary" },
  { id: "blocks", label: "Blocks" },
  { id: "minimal", label: "Minimal" },
  { id: "detailed", label: "Detailed" },
  { id: "braille-set", label: "Braille" },
  { id: "shapes", label: "Shapes" },
];

export const DEFAULT_ASCII_STYLE: AsciiStyleId = "characters";
export const DEFAULT_ASCII_BLEND: AsciiBlendMode = "normal";
export const DEFAULT_ASCII_CHARSET: AsciiCharsetId = "standard";

export const asciiAnimationStyles: AsciiAnimationStyle[] = [
  "mixed",
  "shimmer",
  "scanlines",
  "film-grain",
  "glitch",
  "film-dust",
  "matrix-rain",
];

export const asciiAnimationStyleLabels: Record<AsciiAnimationStyle, string> = {
  mixed: "Mixed",
  shimmer: "Shimmer",
  scanlines: "Scan lines",
  "film-grain": "Film grain",
  glitch: "Glitch",
  "film-dust": "Film dust",
  "matrix-rain": "Matrix rain",
};

export const DEFAULT_ASCII_ANIMATION: AsciiAnimationStyle = "mixed";

export function isAsciiAnimationStyle(value: unknown): value is AsciiAnimationStyle {
  return typeof value === "string" && asciiAnimationStyles.includes(value as AsciiAnimationStyle);
}

export function randomAsciiAnimationStyle() {
  return asciiAnimationStyles[Math.floor(Math.random() * asciiAnimationStyles.length)];
}

export function resolveAsciiAnimationStyle(recipe: Recipe): AsciiAnimationStyle {
  if (recipe.asciiStyle === "matrix" || recipe.asciiStyle === "hex-dump") {
    return recipe.asciiAnimationStyle === "mixed" ? "matrix-rain" : recipe.asciiAnimationStyle;
  }
  return recipe.asciiAnimationStyle;
}

export function isAsciiStyleId(value: unknown): value is AsciiStyleId {
  return typeof value === "string" && asciiStyleIds.includes(value as AsciiStyleId);
}

export function isAsciiBlendMode(value: unknown): value is AsciiBlendMode {
  return typeof value === "string" && asciiBlendModes.includes(value as AsciiBlendMode);
}

export function isAsciiCharsetId(value: unknown): value is AsciiCharsetId {
  return typeof value === "string" && value in asciiCharsets;
}

export function getAsciiStyle(id: AsciiStyleId) {
  return asciiStyles.find((style) => style.id === id) ?? asciiStyles[0];
}

export function pickOtherAsciiStyle(current: AsciiStyleId) {
  const choices = asciiStyleIds.filter((id) => id !== current);
  return choices[Math.floor(Math.random() * choices.length)] ?? current;
}

export function randomAsciiStyle() {
  return asciiStyleIds[Math.floor(Math.random() * asciiStyleIds.length)];
}

export function resolveAsciiCharset(recipe: Recipe) {
  return asciiCharsets[recipe.asciiCharset] ?? asciiCharsets[getAsciiStyle(recipe.asciiStyle).defaultCharset];
}

/** Fixed sample per style for preview thumbnails. */
export const asciiPreviewSampleIds: Record<AsciiStyleId, string> = {
  characters: "portrait-a",
  braille: "portrait-b",
  mixed: "generated-1",
  "hex-dump": "portrait-a",
  matrix: "portrait-a",
  dots: "caustics",
  cross: "generated-2",
  diamond: "aurora",
  rings: "portrait-b",
  hearts: "portrait-a",
  stars: "aurora",
  hexagons: "caustics",
  triangles: "generated-1",
  bubbles: "portrait-b",
  lines: "portrait-a",
  diagonal: "generated-2",
  hatching: "caustics",
  contour: "portrait-b",
  dither: "portrait-a",
  "pixel-art": "generated-1",
  mosaic: "aurora",
  bricks: "portrait-b",
  voxel: "generated-2",
  "half-blocks": "portrait-a",
  disco: "caustics",
};

export function asciiPreviewSampleId(styleId: AsciiStyleId) {
  return asciiPreviewSampleIds[styleId] ?? "portrait-a";
}

export function asciiCellSize(recipe: Recipe) {
  return Math.round(6 + recipe.zoom * 10);
}

export function asciiCoverage(recipe: Recipe) {
  return 0.45 + recipe.intensity * 0.55;
}
