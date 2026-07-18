import type { RefObject } from "react";

export type Tab = "presets" | "visuals" | "mockup";
export type MockupPanelSection = "media" | "type" | "view";
export type TypeMode = "solid" | "invert" | "knockout";
export type TypeFont = "display" | "sans" | "mono";
export type TypeAlign = "left" | "center" | "right";
export type TypeZOrder = "above" | "below";
export type TypeBlock = {
  id: string;
  text: string;
  mode: TypeMode;
  font: TypeFont;
  align: TypeAlign;
  zOrder: TypeZOrder;
  x: number;
  y: number;
  width: number;
  fontSize: number;
  letterSpacing: number;
  lineHeight: number;
  color: string;
  plate: "black" | "white";
};
export type VisualKind = "shader" | "media" | "ascii";

export type AsciiStyleId =
  | "characters"
  | "braille"
  | "mixed"
  | "hex-dump"
  | "matrix"
  | "dots"
  | "cross"
  | "diamond"
  | "rings"
  | "hearts"
  | "stars"
  | "hexagons"
  | "triangles"
  | "bubbles"
  | "lines"
  | "diagonal"
  | "hatching"
  | "contour"
  | "dither"
  | "pixel-art"
  | "mosaic"
  | "bricks"
  | "voxel"
  | "half-blocks"
  | "disco";

export type AsciiBlendMode =
  | "normal"
  | "multiply"
  | "screen"
  | "overlay"
  | "difference"
  | "lighten"
  | "darken";

export type AsciiCharsetId =
  | "standard"
  | "binary"
  | "blocks"
  | "minimal"
  | "detailed"
  | "braille-set"
  | "shapes";

export type AsciiAnimationStyle =
  | "mixed"
  | "shimmer"
  | "scanlines"
  | "film-grain"
  | "glitch"
  | "film-dust"
  | "matrix-rain";
export type VisualSection = "source" | "style" | "palette" | "surface" | "motion" | "cursor";
export type CursorEffect = "push" | "repel" | "swirl" | "ripple" | "spotlight";
export type ExportTab = "image" | "video" | "variations" | "mockup" | "prompt" | "react" | "glsl";
export type MockupExportMode = "image" | "video";
export type MockupChrome = "browser" | "none";
export type MockupBorderStyle = "glass" | "border" | "inset" | "none";
export type CameraMode = "zoom" | "tilt";
export type CameraTool2D = "camera" | "rotation";
export type CameraTool3D = "camera" | "tilt" | "roll";
export type MockupAspect = "auto" | "16 / 9" | "4 / 3" | "1 / 1" | "9 / 16";
export type EditorMode = "mockup" | "animation";
export type OutputAspect = "16:9" | "1:1" | "4:5" | "9:16";
export type ExitStyle = "camera" | "crossfade" | "blur";
export type ClipAnchor = "base" | "target";
export type AnimationClip = { id: string; label: string; presetId: string; start: number; duration: number; transition: number; easing: "ease" | "spring"; zoom: number; tilt: number; hold: number; springSpeed: number; targetX: number; targetY: number; targetTiltX: number; targetTiltY: number; targetRotate: number; cameraX: number; cameraY: number; startAt: ClipAnchor; endAt: ClipAnchor; exitStyle: ExitStyle; hidden: boolean };
export type ClipClipboard = { clip: AnimationClip; mode: "copy" | "cut" };
export type ClipMenuState = { clipId: string; x: number; y: number };
export type VideoExportSettings = { aspect: "16:9" | "1:1" | "9:16"; height: 480 | 720 | 1080 | 1440; fps: 24 | 30 | 60; duration: 2 | 3 | 5 | 8; loop: boolean; mimeType: string };
export type MockupSettings = { media: string | null; mediaType: "image" | "video" | null; chrome: MockupChrome; borderStyle: MockupBorderStyle; radius: number; shadow: number; scale: number; x: number; y: number; cameraX: number; cameraY: number; tiltX: number; tiltY: number; rotate: number; flipX?: boolean; flipY?: boolean; visible: boolean };
export type CameraGeometry = { viewportWidth: number; viewportHeight: number; stageWidth: number; stageHeight: number; padWidth: number; padHeight: number };
export type CameraFrame = { renderScale: number; panLimitX: number; panLimitY: number; cropWidth: number; cropHeight: number; cropCenterX: number; cropCenterY: number; previewScale: number };

export type MediaEngine = "paper" | "vfx";
export type MediaFilterId =
  | "paper-water"
  | "paper-fluted-glass"
  | "paper-texture"
  | "paper-image-dithering"
  | "paper-halftone-dots"
  | "paper-halftone-cmyk"
  | "paper-liquid-metal"
  | "paper-heatmap"
  | "paper-gem-smoke"
  | "vfx-glitch"
  | "vfx-chromatic"
  | "vfx-rgb-shift"
  | "vfx-scanline"
  | "vfx-pixelate"
  | "vfx-bloom"
  | "vfx-fluid";

export type MediaSource =
  | { type: "sample"; sampleId: string }
  | { type: "upload"; dataUrl: string; mime: "image" | "video" };

export type SampleAsset = {
  id: string;
  path: string;
  type: "image" | "video";
  tags: string[];
  for: Array<"media" | "ascii">;
  label: string;
  thumb?: string;
};

export type Recipe = {
  id: string;
  name: string;
  kind: VisualKind;
  style: number;
  mediaFilter: MediaFilterId;
  asciiStyle: AsciiStyleId;
  asciiBlendMode: AsciiBlendMode;
  asciiCharset: AsciiCharsetId;
  asciiAnimationStyle: AsciiAnimationStyle;
  mediaSource: MediaSource | null;
  palette: string[];
  intensity: number;
  zoom: number;
  warp: number;
  contrast: number;
  speed: number;
  drift: number;
  blur: number;
  animate: boolean;
  reverse: boolean;
  grain: number;
  rotate: number;
  offsetX: number;
  offsetY: number;
  seed: number;
  smoothBlend: boolean;
  cursorEnabled: boolean;
  cursorEffect: CursorEffect;
  cursorStrength: number;
  cursorRadius: number;
  glsl: string;
};
export type SavedPalette = { id: string; name: string; colors: string[] };
export type ThemeOption = { key: string; name: string; colors: string[]; deletable?: boolean };
export type CameraPadRef = RefObject<HTMLDivElement | null>;
