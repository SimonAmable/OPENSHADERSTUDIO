import { resolveTypeZOrder, typeFontStacks } from "./type-layer";
import type { TypeAlign, TypeBlock } from "./types";

function measureLineWidth(
  context: CanvasRenderingContext2D,
  line: string,
  letterSpacingPx: number,
) {
  if (!line) return 0;
  const chars = [...line];
  return chars.reduce(
    (width, char, index) =>
      width + context.measureText(char).width + (index < chars.length - 1 ? letterSpacingPx : 0),
    0,
  );
}

function wrapParagraph(
  context: CanvasRenderingContext2D,
  paragraph: string,
  maxWidth: number,
  letterSpacingPx: number,
) {
  const words = paragraph.split(/\s+/).filter(Boolean);
  if (!words.length) return [""];

  const lines: string[] = [];
  let current = "";

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (measureLineWidth(context, candidate, letterSpacingPx) > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function wrapText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  letterSpacingPx: number,
) {
  return text.split("\n").flatMap((paragraph) => wrapParagraph(context, paragraph, maxWidth, letterSpacingPx));
}

function drawLine(
  context: CanvasRenderingContext2D,
  line: string,
  x: number,
  y: number,
  boxWidth: number,
  align: TypeAlign,
  letterSpacingPx: number,
) {
  const lineWidth = measureLineWidth(context, line, letterSpacingPx);
  let cursorX = x;

  if (align === "center") cursorX = x - lineWidth / 2;
  else if (align === "left") cursorX = x - boxWidth / 2;
  else cursorX = x + boxWidth / 2 - lineWidth;

  for (const char of line) {
    context.fillText(char, cursorX, y);
    cursorX += context.measureText(char).width + letterSpacingPx;
  }
}

function drawTypeBlock(
  context: CanvasRenderingContext2D,
  block: TypeBlock,
  canvasWidth: number,
  canvasHeight: number,
  scale: number,
) {
  const fontSize = block.fontSize * scale;
  const letterSpacingPx = block.letterSpacing * fontSize;
  const lineHeightPx = block.lineHeight * fontSize;
  const fontFamily = typeFontStacks[block.font].replaceAll('"', "");
  const centerX = (canvasWidth * block.x) / 100;
  const centerY = (canvasHeight * block.y) / 100;
  const boxWidth = (canvasWidth * block.width) / 100;

  context.save();
  context.font = `750 ${fontSize}px ${fontFamily}`;
  context.textBaseline = "middle";

  const lines = wrapText(context, block.text, boxWidth, letterSpacingPx);
  const totalHeight = Math.max(lineHeightPx, lines.length * lineHeightPx);

  context.translate(centerX, centerY);

  if (block.mode === "knockout") {
    const padX = 0.35 * fontSize;
    const padY = 0.28 * fontSize;
    context.fillStyle = block.plate === "white" ? "#f4f6fb" : "#050506";
    context.fillRect(
      -boxWidth / 2 - padX,
      -totalHeight / 2 - padY,
      boxWidth + padX * 2,
      totalHeight + padY * 2,
    );
  }

  const drawLines = (fillStyle: string, composite: GlobalCompositeOperation) => {
    context.globalCompositeOperation = composite;
    context.fillStyle = fillStyle;
    lines.forEach((line, index) => {
      const y = (index - (lines.length - 1) / 2) * lineHeightPx;
      drawLine(context, line, 0, y, boxWidth, block.align, letterSpacingPx);
    });
  };

  switch (block.mode) {
    case "solid":
      context.shadowColor = "rgba(0,0,0,0.38)";
      context.shadowBlur = 18 * scale;
      drawLines(block.color, "source-over");
      break;
    case "invert":
      drawLines("#ffffff", "difference");
      break;
    case "knockout":
      drawLines(block.plate === "white" ? "#000000" : "#ffffff", "destination-out");
      break;
    default: {
      const exhaustive: never = block.mode;
      return exhaustive;
    }
  }

  context.restore();
}

export function drawTypeBlocksToCanvas(
  context: CanvasRenderingContext2D,
  blocks: TypeBlock[],
  canvasWidth: number,
  canvasHeight: number,
  viewportWidth: number,
) {
  if (!blocks.length) return;
  const scale = viewportWidth > 0 ? canvasWidth / viewportWidth : 1;
  context.save();
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  for (const block of blocks) {
    drawTypeBlock(context, block, canvasWidth, canvasHeight, scale);
  }
  context.restore();
}

export function partitionTypeBlocksForExport(blocks: TypeBlock[]) {
  const below: TypeBlock[] = [];
  const above: TypeBlock[] = [];
  for (const block of blocks) {
    if (resolveTypeZOrder(block) === "above") above.push(block);
    else below.push(block);
  }
  return { below, above };
}
