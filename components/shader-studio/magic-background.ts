import { asciiStyleNames } from "./ascii-catalog";
import { mediaFilterNames } from "./media-catalog";
import { threeMaterialNames, threeObjectNames } from "./three-catalog";
import { fragmentShader, styleNames } from "./canvas";
import type { AsciiStyleId, MediaFilterId, Recipe, ThreeMaterialId, ThreeObjectId } from "./types";

export type MagicPalette = { id: string; name: string; description: string; colors: string[] };
export type MagicVisual = { id: string; kind: "shader" | "media" | "ascii" | "3d"; label: string; recipe: Recipe };

type Rgb = { r: number; g: number; b: number };
type Hsl = { h: number; s: number; l: number };

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const hex = ({ r, g, b }: Rgb) => `#${[r, g, b].map((value) => Math.round(value).toString(16).padStart(2, "0")).join("")}`;
const rgbFromHex = (value: string): Rgb => {
  const clean = value.replace("#", "");
  return { r: parseInt(clean.slice(0, 2), 16) || 0, g: parseInt(clean.slice(2, 4), 16) || 0, b: parseInt(clean.slice(4, 6), 16) || 0 };
};
function rgbToHsl({ r, g, b }: Rgb): Hsl {
  const red = r / 255; const green = g / 255; const blue = b / 255;
  const max = Math.max(red, green, blue); const min = Math.min(red, green, blue); const delta = max - min;
  let h = 0;
  if (delta) h = max === red ? ((green - blue) / delta + (green < blue ? 6 : 0)) * 60 : max === green ? ((blue - red) / delta + 2) * 60 : ((red - green) / delta + 4) * 60;
  const l = (max + min) / 2;
  return { h, s: delta ? delta / (1 - Math.abs(2 * l - 1)) : 0, l };
}
function hslToHex({ h, s, l }: Hsl) {
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const x = chroma * (1 - Math.abs((h / 60) % 2 - 1));
  const m = l - chroma / 2;
  const [r, g, b] = h < 60 ? [chroma, x, 0] : h < 120 ? [x, chroma, 0] : h < 180 ? [0, chroma, x] : h < 240 ? [0, x, chroma] : h < 300 ? [x, 0, chroma] : [chroma, 0, x];
  return hex({ r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 });
}
const tone = (color: string, lightness: number, hueShift = 0, saturation = 1) => {
  const hsl = rgbToHsl(rgbFromHex(color));
  return hslToHex({ h: (hsl.h + hueShift + 360) % 360, s: clamp(Math.max(.28, hsl.s) * saturation), l: clamp(lightness) });
};

const isNeutralColor = (color: string) => {
  const hsl = rgbToHsl(rgbFromHex(color));
  return hsl.s < .12 || hsl.l < .07 || hsl.l > .94;
};

/** Picks the extracted colour with the strongest chroma, skipping near-monotone pixels. */
function prominentChromaticColor(extracted: string[]) {
  let best = extracted[0] ?? "#375bff";
  let bestScore = -1;
  for (const color of extracted) {
    const hsl = rgbToHsl(rgbFromHex(color));
    if (isNeutralColor(color)) continue;
    const score = hsl.s * (1 - Math.abs(hsl.l - .5) * .35);
    if (score > bestScore) { bestScore = score; best = color; }
  }
  if (bestScore >= 0) return best;
  return extracted.reduce((pick, color) => {
    const hsl = rgbToHsl(rgbFromHex(color));
    const pickHsl = rgbToHsl(rgbFromHex(pick));
    return hsl.s > pickHsl.s ? color : pick;
  }, extracted[0] ?? "#375bff");
}

function chromaticHslRange(anchor: string) {
  const hsl = rgbToHsl(rgbFromHex(anchor));
  const saturation = clamp(Math.max(.34, hsl.s));
  return [.1, .28, .5, .72, .9].map((lightness) => hslToHex({ h: hsl.h, s: saturation, l: lightness }));
}

function fallbackColors(fallback: string[]) {
  const usable = fallback.filter((color) => /^#[0-9a-f]{6}$/i.test(color));
  return usable.length ? usable.slice(0, 4) : ["#172036", "#375bff", "#9f7aff", "#f7d7ff"];
}

/** Samples a small client-side canvas. UI neutrals are deliberately de-prioritised. */
export async function extractMagicColors(src: string | null, fallback: string[]) {
  if (!src || !src.startsWith("data:")) return fallbackColors(fallback);
  const image = new Image();
  const video = document.createElement("video");
  const isVideo = src.startsWith("data:video/");
  if (isVideo) {
    video.muted = true; video.playsInline = true; video.preload = "auto"; video.src = src;
    await new Promise<void>((resolve, reject) => { video.onloadeddata = () => resolve(); video.onerror = () => reject(new Error("Video frame unavailable")); });
  } else {
    image.src = src;
    await image.decode();
  }
  const size = 96; const canvas = document.createElement("canvas"); canvas.width = size; canvas.height = size;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return fallbackColors(fallback);
  context.drawImage(isVideo ? video : image, 0, 0, size, size);
  const data = context.getImageData(0, 0, size, size).data;
  const bins = new Map<string, { r: number; g: number; b: number; count: number; weight: number }>();
  for (let index = 0; index < data.length; index += 16) {
    const r = data[index]; const g = data[index + 1]; const b = data[index + 2]; const hsl = rgbToHsl({ r, g, b });
    const key = `${Math.round(r / 32)}-${Math.round(g / 32)}-${Math.round(b / 32)}`;
    const neutral = hsl.s < .12 || hsl.l < .07 || hsl.l > .94;
    const entry = bins.get(key) ?? { r: 0, g: 0, b: 0, count: 0, weight: 0 };
    entry.r += r; entry.g += g; entry.b += b; entry.count += 1; entry.weight += neutral ? .16 : .45 + hsl.s;
    bins.set(key, entry);
  }
  const colors = [...bins.values()].sort((a, b) => b.weight - a.weight).slice(0, 4).map((entry) => hex({ r: entry.r / entry.count, g: entry.g / entry.count, b: entry.b / entry.count }));
  return colors.length >= 2 ? colors : fallbackColors(fallback);
}

export function makeMagicPalettes(extracted: string[]): MagicPalette[] {
  const [primary, secondary = extracted[0], third = extracted[1] ?? extracted[0]] = extracted;
  const primaryHsl = rgbToHsl(rgbFromHex(primary));
  const chromatic = prominentChromaticColor(extracted);
  return [
    { id: "source", name: "True to source", description: "The media's strongest colours", colors: [tone(primary, .12), primary, secondary, third, tone(primary, .82)] },
    { id: "tonal", name: "Tonal", description: "One colour, light to dark", colors: [.09, .25, .48, .7, .9].map((lightness) => tone(primary, lightness)) },
    { id: "primary", name: "Primary", description: "HSL range from the most colourful pixel", colors: chromaticHslRange(chromatic) },
    { id: "analogous", name: "Analogous", description: "A calm, harmonious range", colors: [-34, -14, 0, 18, 38].map((shift, index) => tone(primary, .18 + index * .16, shift, .9)) },
    { id: "complement", name: "Complementary", description: "Source colour with a bright counterpoint", colors: [tone(primary, .1), tone(primary, .32), primary, tone(primary, .58, 180, .85), tone(primary, .84, 180, .65)] },
    { id: "neutral", name: "Neutral + accent", description: "Quiet neutrals around the brand accent", colors: ["#10131a", "#273040", tone(primary, .36), primary, tone(primary, .86, primaryHsl.s < .2 ? 24 : 0, .55)] },
  ];
}

const random = (seed: number) => {
  let value = seed >>> 0;
  return () => { value = (value * 1664525 + 1013904223) >>> 0; return value / 4294967296; };
};

export function makeMagicVisuals(base: Recipe, palette: MagicPalette, source: Recipe["mediaSource"], run: number): MagicVisual[] {
  const pick = random(palette.id.length * 1021 + run * 7919);
  const make = (index: number, update: Partial<Recipe>): Recipe => ({ ...base, ...update, id: crypto.randomUUID(), palette: [...palette.colors], mediaSource: source, cursorEnabled: false, seed: Math.floor(pick() * 100000), animate: false, glsl: fragmentShader });
  const shaderStyles = [7, 5, 8, 4];
  const mediaFilters: MediaFilterId[] = ["paper-water", "vfx-bloom"];
  const asciiStyles: AsciiStyleId[] = ["mosaic", "lines"];
  const sceneLooks: Array<{ object: ThreeObjectId; material: ThreeMaterialId }> = [
    { object: "torus-knot", material: "liquid-chrome" },
    { object: "icosahedron", material: "aurora" },
  ];
  return [
    ...shaderStyles.map((style, index) => ({ id: `shader-${style}`, kind: "shader" as const, label: styleNames[style] ?? "Shader", recipe: make(index, { kind: "shader", style, name: styleNames[style] ?? "Magic shader", intensity: .45 + pick() * .45, warp: .25 + pick() * .6, zoom: .8 + pick() * .7, contrast: .35 + pick() * .45 }) })),
    ...mediaFilters.map((mediaFilter, index) => ({ id: `media-${mediaFilter}`, kind: "media" as const, label: mediaFilterNames[mediaFilter], recipe: make(index + 4, { kind: "media", mediaFilter, name: mediaFilterNames[mediaFilter], intensity: .42 + pick() * .42, warp: .25 + pick() * .6, zoom: .8 + pick() * .7, contrast: .35 + pick() * .45 }) })),
    ...asciiStyles.map((asciiStyle, index) => ({ id: `ascii-${asciiStyle}`, kind: "ascii" as const, label: asciiStyleNames[asciiStyle], recipe: make(index + 6, { kind: "ascii", asciiStyle, name: asciiStyleNames[asciiStyle], asciiBlendMode: "screen", intensity: .35 + pick() * .4, zoom: .8 + pick() * .65, contrast: .35 + pick() * .45 }) })),
    ...sceneLooks.map(({ object, material }, index) => ({
      id: `3d-${material}-${object}`,
      kind: "3d" as const,
      label: `${threeMaterialNames[material]} · ${threeObjectNames[object]}`,
      recipe: make(index + 8, {
        kind: "3d",
        threeObject: object,
        threeMaterial: material,
        threeModelUpload: null,
        threeEnvironment: "nocturne",
        threePedestal: true,
        name: `${threeMaterialNames[material]} · ${threeObjectNames[object]}`,
        intensity: .5 + pick() * .4,
        warp: .25 + pick() * .55,
        zoom: .85 + pick() * .5,
        contrast: .4 + pick() * .4,
        offsetX: -0.4 + pick() * 0.8,
        offsetY: 0.1 + pick() * 0.4,
      }),
    })),
  ];
}
