import {
  asciiCellSize,
  asciiCoverage,
  getAsciiStyle,
  resolveAsciiAnimationStyle,
  resolveAsciiCharset,
  type AsciiStyleId,
} from "./ascii-catalog";
import type { CursorEffect, Recipe } from "./types";

export type AsciiPointer = {
  x: number;
  y: number;
  active: boolean;
};

const SHAPE_CHARS: Record<string, string> = {
  dots: " ·∘○●",
  cross: " ·+×✚",
  diamond: " ·◇◆♦",
  rings: " ·◯◎●",
  hearts: " ·♡♥❤",
  stars: " ·✦★☆",
  hexagons: " ░▒▓█",
  triangles: " ·△▲▼",
  bubbles: " ·○◉●",
};

function luminance(r: number, g: number, b: number) {
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

function contrastValue(value: number, contrast: number) {
  const factor = 0.5 + contrast * 1.5;
  return Math.min(1, Math.max(0, (value - 0.5) * factor + 0.5));
}

function pickChar(charset: string, value: number) {
  const index = Math.min(charset.length - 1, Math.max(0, Math.floor(value * (charset.length - 1))));
  return charset[index] ?? " ";
}

function shapeCharset(styleId: AsciiStyleId) {
  return SHAPE_CHARS[styleId] ?? " ·○●";
}

function matrixColor(recipe: Recipe, value: number) {
  const accent = recipe.palette[1] ?? "#00ff66";
  const dim = recipe.palette[0] ?? "#001a0a";
  const t = 0.25 + value * 0.75;
  return mixHex(dim, accent, t);
}

function paletteColor(recipe: Recipe, value: number) {
  const stops = recipe.palette.length ? recipe.palette : ["#060914", "#ffffff"];
  const scaled = value * (stops.length - 1);
  const index = Math.min(stops.length - 2, Math.max(0, Math.floor(scaled)));
  const local = scaled - index;
  return mixHex(stops[index], stops[index + 1] ?? stops[index], local);
}

function mixHex(a: string, b: string, t: number) {
  const [ar, ag, ab] = hexToRgb(a);
  const [br, bg, bb] = hexToRgb(b);
  const mix = (from: number, to: number) => Math.round(from + (to - from) * t);
  return `rgb(${mix(ar, br)}, ${mix(ag, bg)}, ${mix(ab, bb)})`;
}

function hexToRgb(hex: string) {
  const normalized = hex.replace("#", "");
  const value = normalized.length === 3
    ? normalized.split("").map((part) => part + part).join("")
    : normalized.padEnd(6, "0").slice(0, 6);
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ];
}

function hashNoise(x: number, y: number, seed: number) {
  const n = Math.sin(x * 12.9898 + y * 78.233 + seed * 0.017) * 43758.5453;
  return n - Math.floor(n);
}

function motionClock(recipe: Recipe, timeSec: number) {
  if (!recipe.animate) return 0;
  const dir = recipe.reverse ? -1 : 1;
  return timeSec * dir * (0.35 + recipe.speed * 1.15);
}

function motionStrength(recipe: Recipe) {
  return Math.min(1, Math.max(0, recipe.warp));
}

function discoHue(time: number, x: number, y: number, speed: number) {
  return ((time * speed * 120 + x * 40 + y * 70) % 360 + 360) % 360;
}

function hslColor(h: number, s: number, l: number) {
  return `hsl(${h} ${s}% ${l}%)`;
}

function bayerThreshold(x: number, y: number) {
  const matrix = [
    [0, 8, 2, 10],
    [12, 4, 14, 6],
    [3, 11, 1, 9],
    [15, 7, 13, 5],
  ];
  return matrix[y % 4][x % 4] / 16;
}

function sampleSource(
  source: CanvasImageSource,
  width: number,
  height: number,
  recipe: Recipe,
  timeSec = 0,
) {
  const scratch = document.createElement("canvas");
  scratch.width = width;
  scratch.height = height;
  const ctx = scratch.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Could not sample media");

  const animStyle = resolveAsciiAnimationStyle(recipe);
  const t = motionClock(recipe, timeSec);
  const strength = motionStrength(recipe);
  let extraOffsetX = 0;
  let extraOffsetY = 0;
  let extraRotate = 0;

  if (recipe.animate) {
    if (animStyle === "mixed" || animStyle === "shimmer") {
      extraOffsetX = Math.sin(t * 1.8 + recipe.seed) * strength * 0.12;
      extraOffsetY = Math.cos(t * 1.4 + recipe.seed * 0.2) * strength * 0.1;
      extraRotate = Math.sin(t * 0.9) * strength * 0.04;
    }
    if (animStyle === "matrix-rain") {
      extraOffsetY = (t * (0.35 + strength * 0.8)) % 1;
    }
    if (animStyle === "glitch" && Math.sin(t * 6) > 0.65) {
      extraOffsetX = (hashNoise(t, recipe.seed, 0) - 0.5) * strength * 0.35;
    }
  }

  ctx.save();
  ctx.fillStyle = recipe.palette[0] ?? "#000000";
  ctx.fillRect(0, 0, width, height);
  ctx.translate(
    width / 2 + (recipe.offsetX + extraOffsetX) * width * 0.25,
    height / 2 + (recipe.offsetY + extraOffsetY) * height * 0.25,
  );
  ctx.rotate(recipe.rotate + extraRotate);
  const scale = 1 / Math.max(0.5, recipe.zoom);
  ctx.scale(scale, scale);
  ctx.drawImage(source, -width / 2, -height / 2, width, height);
  ctx.restore();

  return ctx.getImageData(0, 0, width, height);
}

function cursorBoost(
  recipe: Recipe,
  pointer: AsciiPointer | undefined,
  cellX: number,
  cellY: number,
  cellW: number,
  cellH: number,
) {
  if (!recipe.cursorEnabled || !pointer?.active) return 0;
  const cx = pointer.x * cellW;
  const cy = pointer.y * cellH;
  const dx = cellX - cx;
  const dy = cellY - cy;
  const distance = Math.hypot(dx, dy);
  const radius = Math.max(cellW, cellH) * (0.08 + recipe.cursorRadius * 0.35);
  if (distance > radius) return 0;
  const falloff = 1 - distance / radius;
  const strength = recipe.cursorStrength * falloff;
  switch (recipe.cursorEffect) {
    case "repel":
      return -strength * 0.35;
    case "swirl":
      return strength * 0.2 * Math.sin(distance * 0.08);
    case "ripple":
      return strength * 0.25 * Math.sin(distance * 0.12 - performance.now() * 0.01);
    case "spotlight":
      return strength * 0.55;
    case "push":
      return strength * 0.35;
    default: {
      const _exhaustive: never = recipe.cursorEffect;
      return _exhaustive;
    }
  }
}

function edgeValue(data: ImageData, x: number, y: number, width: number, height: number) {
  const sample = (sx: number, sy: number) => {
    const px = Math.min(width - 1, Math.max(0, sx));
    const py = Math.min(height - 1, Math.max(0, sy));
    const index = (py * width + px) * 4;
    return luminance(data.data[index], data.data[index + 1], data.data[index + 2]);
  };
  const gx = -sample(x - 1, y - 1) - 2 * sample(x - 1, y) - sample(x - 1, y + 1)
    + sample(x + 1, y - 1) + 2 * sample(x + 1, y) + sample(x + 1, y + 1);
  const gy = -sample(x - 1, y - 1) - 2 * sample(x, y - 1) - sample(x + 1, y - 1)
    + sample(x - 1, y + 1) + 2 * sample(x, y + 1) + sample(x + 1, y + 1);
  return Math.min(1, Math.hypot(gx, gy) * 2.5);
}

function edgeChar(styleId: AsciiStyleId, gx: number, gy: number, value: number, charset: string) {
  if (styleId === "hatching") {
    return value > 0.45 ? (Math.abs(gx) > Math.abs(gy) ? "+" : "x") : " ";
  }
  if (styleId === "diagonal") {
    return value > 0.35 ? (gx + gy > 0 ? "/" : "\\") : " ";
  }
  if (styleId === "lines") {
    if (value < 0.25) return " ";
    if (Math.abs(gx) > Math.abs(gy) * 1.2) return "-";
    if (Math.abs(gy) > Math.abs(gx) * 1.2) return "|";
    return "+";
  }
  return pickChar(charset, value);
}

function brailleChar(data: ImageData, px: number, py: number, width: number) {
  let bits = 0;
  const offsets = [
    [0, 0, 0x01], [1, 0, 0x08],
    [0, 1, 0x02], [1, 1, 0x10],
    [0, 2, 0x04], [1, 2, 0x20],
    [0, 3, 0x40], [1, 3, 0x80],
  ];
  for (const [ox, oy, mask] of offsets) {
    const sx = Math.min(width - 1, px * 2 + ox);
    const sy = Math.min(data.height - 1, py * 2 + oy);
    const index = (sy * width + sx) * 4;
    const lum = luminance(data.data[index], data.data[index + 1], data.data[index + 2]);
    if (lum > 0.45) bits |= mask;
  }
  return String.fromCodePoint(0x2800 + bits);
}

function applyAsciiAnimation(
  recipe: Recipe,
  timeSec: number,
  col: number,
  row: number,
  rows: number,
  cols: number,
  value: number,
) {
  if (!recipe.animate) return value;
  const animStyle = resolveAsciiAnimationStyle(recipe);
  const t = motionClock(recipe, timeSec);
  const strength = motionStrength(recipe);
  let next = value;

  if (animStyle === "shimmer" || animStyle === "mixed") {
    next += Math.sin(t * 5 + col * 0.35 + row * 0.22) * strength * 0.18;
  }
  if (animStyle === "film-grain" || animStyle === "mixed") {
    next += (hashNoise(col + t * 20, row + t * 17, recipe.seed) - 0.5) * strength * 0.22;
  }
  if (animStyle === "scanlines") {
    const band = (row + Math.floor(t * 24)) % 4;
    if (band === 0) next *= 0.25;
    else if (band === 1) next *= 0.55;
  }
  if (animStyle === "film-dust") {
    const dust = hashNoise(col * 3.1 + Math.floor(t * 2), row * 2.7, recipe.seed);
    if (dust > 0.985 - strength * 0.01) next = Math.min(1, next + 0.55);
  }
  if (animStyle === "matrix-rain") {
    const trail = (row / Math.max(1, rows) + t * 0.35) % 1;
    if (trail < 0.08) next = Math.min(1, next + (0.08 - trail) * strength * 4);
  }
  if (animStyle === "glitch") {
    const burst = Math.floor(t * 3.5 + recipe.seed);
    if (hashNoise(burst, row, recipe.seed) > 0.72) {
      next += (hashNoise(col, burst + row, recipe.seed) - 0.5) * strength * 0.35;
    }
  }

  return Math.min(1, Math.max(0, next));
}

function glitchSampleCol(recipe: Recipe, timeSec: number, col: number, row: number, cols: number) {
  if (!recipe.animate || resolveAsciiAnimationStyle(recipe) !== "glitch") return col;
  const t = motionClock(recipe, timeSec);
  const strength = motionStrength(recipe);
  const burst = Math.floor(t * 3.5 + recipe.seed);
  if (hashNoise(burst, row, recipe.seed) <= 0.72) return col;
  const shift = Math.floor((hashNoise(row, burst, recipe.seed) - 0.5) * strength * 8);
  return Math.min(cols - 1, Math.max(0, col + shift));
}

function drawAsciiOverlays(
  target: CanvasRenderingContext2D,
  recipe: Recipe,
  width: number,
  height: number,
  timeSec: number,
) {
  if (!recipe.animate) return;
  const animStyle = resolveAsciiAnimationStyle(recipe);
  const t = motionClock(recipe, timeSec);
  const strength = motionStrength(recipe);

  if (animStyle === "scanlines") {
    target.save();
    target.globalAlpha = 0.12 + strength * 0.22;
    target.fillStyle = "#000000";
    const gap = 3;
    for (let y = (t * 40) % gap; y < height; y += gap) {
      target.fillRect(0, y, width, 1);
    }
    target.restore();
  }

  if (animStyle === "film-grain") {
    target.save();
    target.globalCompositeOperation = "overlay";
    const specks = Math.floor(width * height * 0.0008 * (0.35 + strength));
    for (let i = 0; i < specks; i += 1) {
      const x = hashNoise(i + t * 31, recipe.seed, 1) * width;
      const y = hashNoise(i + t * 17, recipe.seed, 2) * height;
      const alpha = hashNoise(i, t, recipe.seed) * 0.35 * strength;
      target.fillStyle = `rgba(255,255,255,${alpha})`;
      target.fillRect(x, y, 1, 1);
    }
    target.restore();
  }

  if (animStyle === "film-dust") {
    target.save();
    const particles = Math.floor(12 + strength * 28);
    for (let i = 0; i < particles; i += 1) {
      const phase = hashNoise(i, recipe.seed, 3);
      const x = hashNoise(i + 1, recipe.seed, 4) * width;
      const y = ((hashNoise(i + 2, recipe.seed, 5) + t * (0.02 + phase * 0.05)) % 1) * height;
      const size = 1 + hashNoise(i, t, recipe.seed) * 2;
      target.fillStyle = `rgba(255,255,255,${0.08 + phase * 0.2})`;
      target.fillRect(x, y, size, size);
    }
    target.restore();
  }
}

export function renderAsciiFrame(
  target: CanvasRenderingContext2D,
  source: CanvasImageSource,
  recipe: Recipe,
  width: number,
  height: number,
  timeSec = 0,
  pointer?: AsciiPointer,
) {
  const style = getAsciiStyle(recipe.asciiStyle);
  const charset = style.renderMode === "shapes"
    ? shapeCharset(recipe.asciiStyle)
    : resolveAsciiCharset(recipe);
  const cellSize = asciiCellSize(recipe);
  const coverage = asciiCoverage(recipe);
  const cols = Math.max(8, Math.floor(width / cellSize));
  const rows = Math.max(8, Math.floor(height / (cellSize * 1.15)));
  const sampleW = cols;
  const sampleH = rows;
  const image = sampleSource(source, sampleW, sampleH, recipe, timeSec);
  const bg = recipe.palette[0] ?? "#000000";
  const bgOpacity = 0.35 + recipe.drift * 0.65;
  const animStyle = resolveAsciiAnimationStyle(recipe);
  const motionT = motionClock(recipe, timeSec);
  const motionActive = recipe.animate;

  target.save();
  target.globalCompositeOperation = recipe.asciiBlendMode === "normal" ? "source-over" : recipe.asciiBlendMode;
  target.fillStyle = bg;
  target.globalAlpha = bgOpacity;
  target.fillRect(0, 0, width, height);
  target.globalAlpha = 1;

  target.font = `${cellSize}px "JetBrains Mono", "SF Mono", "Consolas", monospace`;
  target.textBaseline = "top";
  target.textAlign = "left";

  const ditherStrength = recipe.grain * 12;
  const contrast = recipe.contrast;
  const invert = recipe.reverse;
  const colorFromSource = recipe.smoothBlend || style.colorMode === "source";
  const discoSpeed = motionActive ? (0.2 + recipe.speed * 1.4) : 0;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const sampleCol = glitchSampleCol(recipe, timeSec, col, row, cols);
      const px = Math.min(sampleW - 1, Math.floor((sampleCol / cols) * sampleW));
      const py = Math.min(sampleH - 1, Math.floor((row / rows) * sampleH));
      const index = (py * sampleW + px) * 4;
      const r = image.data[index];
      const g = image.data[index + 1];
      const b = image.data[index + 2];
      let value = luminance(r, g, b);
      value = contrastValue(value, contrast);
      if (ditherStrength > 0 && style.renderMode === "dither") {
        value += (bayerThreshold(col, row) - 0.5) * ditherStrength;
      }
      value = applyAsciiAnimation(recipe, timeSec, col, row, rows, cols, value);
      value += cursorBoost(recipe, pointer, col * cellSize, row * cellSize * 1.15, width, height);
      value = invert ? 1 - value : value;
      value = Math.min(1, Math.max(0, value));
      if (value < 1 - coverage) continue;

      let char = " ";
      if (style.renderMode === "braille") {
        char = brailleChar(image, px, py, sampleW);
      } else if (style.renderMode === "edge") {
        const edge = edgeValue(image, px, py, sampleW, sampleH);
        const gx = edgeValue(image, px + 1, py, sampleW, sampleH) - edgeValue(image, px - 1, py, sampleW, sampleH);
        const gy = edgeValue(image, px, py + 1, sampleW, sampleH) - edgeValue(image, px, py - 1, sampleW, sampleH);
        char = edgeChar(recipe.asciiStyle, gx, gy, edge, charset);
      } else if (style.renderMode === "blocks" || style.renderMode === "dither") {
        const blockSet = recipe.asciiStyle === "half-blocks" ? " ▄▀█" : " ░▒▓█";
        char = pickChar(blockSet, value);
      } else if (style.renderMode === "shapes") {
        char = pickChar(shapeCharset(recipe.asciiStyle), value);
      } else {
        char = pickChar(charset, value);
      }

      if (char === " ") continue;

      if (style.colorMode === "disco" || recipe.asciiStyle === "disco") {
        const hue = discoHue(timeSec, col, row, discoSpeed);
        target.fillStyle = hslColor(hue, 85, 35 + value * 45);
      } else if (style.colorMode === "matrix" || recipe.asciiStyle === "matrix" || recipe.asciiStyle === "hex-dump") {
        const matrixPulse = animStyle === "matrix-rain" && motionActive
          ? 0.85 + Math.sin(motionT * 6 + row * 0.35) * 0.15
          : 1;
        target.fillStyle = matrixColor(recipe, Math.min(1, value * matrixPulse));
      } else if (colorFromSource) {
        target.fillStyle = `rgba(${r}, ${g}, ${b}, ${0.55 + value * 0.45})`;
      } else {
        target.fillStyle = paletteColor(recipe, value);
      }

      target.fillText(char, col * cellSize, row * cellSize * 1.15);
    }
  }

  drawAsciiOverlays(target, recipe, width, height, timeSec);

  if (recipe.blur > 0) {
    target.restore();
    const blurred = document.createElement("canvas");
    blurred.width = width;
    blurred.height = height;
    const blurCtx = blurred.getContext("2d");
    if (blurCtx) {
      blurCtx.filter = `blur(${recipe.blur}px)`;
      blurCtx.drawImage(target.canvas, 0, 0);
      target.clearRect(0, 0, width, height);
      target.drawImage(blurred, 0, 0);
    }
    return;
  }

  target.restore();
}

export async function loadAsciiSource(url: string, mediaType: "image" | "video") {
  if (mediaType === "image") {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error("Could not load image"));
      image.src = url;
    });
  }
  return new Promise<HTMLVideoElement>((resolve, reject) => {
    const video = document.createElement("video");
    video.crossOrigin = "anonymous";
    video.muted = true;
    video.playsInline = true;
    video.loop = true;
    video.onloadeddata = () => resolve(video);
    video.onerror = () => reject(new Error("Could not load video"));
    video.src = url;
    video.load();
  });
}

export function cursorEffectLabel(effect: CursorEffect) {
  return effect;
}
