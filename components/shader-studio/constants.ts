import type { MockupBorderStyle, MockupChrome, OutputAspect } from "./types";

export const videoFormats = [
  { value: "video/webm;codecs=vp9", label: "WebM (VP9)" },
  { value: "video/webm;codecs=vp8", label: "WebM (VP8)" },
  { value: "video/mp4;codecs=avc1.42E01E", label: "MP4 (H.264)" },
] as const;

export const outputFrames: { aspect: OutputAspect; label: string; detail: string }[] = [
  { aspect: "16:9", label: "Widescreen", detail: "1920 × 1080" },
  { aspect: "1:1", label: "Square", detail: "1080 × 1080" },
  { aspect: "4:5", label: "Portrait feed", detail: "1080 × 1350" },
  { aspect: "9:16", label: "Vertical", detail: "1080 × 1920" },
];

export const mockupBorderStyles: MockupBorderStyle[] = ["glass", "border", "inset", "none"];
export const mockupChromeStyles: MockupChrome[] = ["browser", "none"];
