import type { MediaSource, SampleAsset, VisualKind } from "./types";

export const sampleAssets: SampleAsset[] = [
  {
    id: "aurora",
    path: "/samples/aurora.png",
    type: "image",
    tags: ["abstract", "texture"],
    for: ["media", "ascii"],
    label: "Aurora",
  },
  {
    id: "caustics",
    path: "/samples/caustics.png",
    type: "image",
    tags: ["texture", "abstract"],
    for: ["media", "ascii"],
    label: "Caustics",
  },
  {
    id: "portrait-a",
    path: "/samples/556397c6096c0af0913bbc28bdb3de60.jpg",
    type: "image",
    tags: ["portrait"],
    for: ["media", "ascii"],
    label: "Portrait A",
  },
  {
    id: "portrait-b",
    path: "/samples/5e849d31302c296faeaee27449900509.jpg",
    type: "image",
    tags: ["portrait"],
    for: ["media", "ascii"],
    label: "Portrait B",
  },
  {
    id: "generated-1",
    path: "/samples/Generated%20image%201.png",
    type: "image",
    tags: ["abstract", "product"],
    for: ["media", "ascii"],
    label: "Generated 1",
  },
  {
    id: "generated-2",
    path: "/samples/generated-image-1783984312949.png",
    type: "image",
    tags: ["abstract", "texture"],
    for: ["media", "ascii"],
    label: "Generated 2",
  },
  {
    id: "thermal-loop",
    path: "/shaders/thermal-loop.webm",
    type: "video",
    tags: ["loop", "abstract"],
    for: ["media", "ascii"],
    label: "Thermal loop",
  },
];

export function samplesForKind(kind: Extract<VisualKind, "media"> | "ascii" = "media") {
  return sampleAssets.filter((asset) => asset.for.includes(kind));
}

export function getSampleById(id: string) {
  return sampleAssets.find((asset) => asset.id === id) ?? null;
}

export function defaultSampleId(kind: Extract<VisualKind, "media"> | "ascii" = "media") {
  return samplesForKind(kind)[0]?.id ?? sampleAssets[0]?.id ?? "aurora";
}

export function defaultMediaSource(kind: Extract<VisualKind, "media"> | "ascii" = "media"): MediaSource {
  return { type: "sample", sampleId: defaultSampleId(kind) };
}

export function resolveMediaSource(source: MediaSource | null): { url: string; mediaType: "image" | "video"; sampleId?: string } | null {
  if (!source) return null;
  if (source.type === "upload") {
    return { url: source.dataUrl, mediaType: source.mime };
  }
  const sample = getSampleById(source.sampleId);
  if (!sample) return null;
  return { url: sample.path, mediaType: sample.type, sampleId: sample.id };
}

export function pickRandomSample(kind: Extract<VisualKind, "media"> | "ascii" = "media", exceptId?: string) {
  const pool = samplesForKind(kind).filter((asset) => asset.id !== exceptId);
  const list = pool.length ? pool : samplesForKind(kind);
  if (!list.length) return defaultMediaSource(kind);
  return { type: "sample" as const, sampleId: list[Math.floor(Math.random() * list.length)].id };
}
