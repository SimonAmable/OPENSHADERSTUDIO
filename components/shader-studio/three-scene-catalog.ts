import type { ThreeScenePresetId } from "./types";

export type ThreeScenePresetDef = {
  id: ThreeScenePresetId;
  label: string;
  group: "Atmosphere" | "Abstract" | "Organic";
  description: string;
  swatch: string;
};

export const threeScenePresets: ThreeScenePresetDef[] = [
  {
    id: "agentic-cloud",
    label: "Agentic cloud",
    group: "Atmosphere",
    description: "Dense flowing point cloud with chrome core — Editions-style agentic hero.",
    swatch: "radial-gradient(circle at 50% 40%,#4a5cff 0%,#12082a 42%,#050508 100%)",
  },
  {
    id: "volumetric-glow",
    label: "Volumetric glow",
    group: "Abstract",
    description: "Stacked additive light planes with cinematic bloom and chromatic aberration.",
    swatch: "radial-gradient(circle at 50% 50%,#8ef0ff 0%,#2a3dff 28%,#0a0a12 72%)",
  },
  {
    id: "caustic-stage",
    label: "Caustic stage",
    group: "Organic",
    description: "Shader caustic floor, pedestal, and refractive hero object on a dark stage.",
    swatch: "radial-gradient(circle at 42% 36%,#d8f7ff 0%,#4cc6ff 24%,#1a2a66 68%,#070910 100%)",
  },
  {
    id: "catalog-grid",
    label: "Catalog grid",
    group: "Atmosphere",
    description: "Floating wireframe product cards in a dark launch-page grid.",
    swatch: "radial-gradient(circle at 30% 20%,#6f8dff 0%,#1a1f44 38%,#05060d 100%)",
  },
  {
    id: "pulse-sidekick",
    label: "Pulse sidekick",
    group: "Organic",
    description: "Pulsing purple orb with orbital rings — AI sidekick energy.",
    swatch: "linear-gradient(145deg,#10131f 0%,#3a4dff 45%,#8ef0ff 100%)",
  },
  {
    id: "morph-sdf",
    label: "Morph SDF",
    group: "Abstract",
    description: "Metaball morphing blobs with iridescent chrome and marching-cubes surface.",
    swatch: "linear-gradient(160deg,#0d1020 20%,#6b4dff 55%,#d8c4ff 100%)",
  },
];

const LEGACY_PRESET_MAP: Record<string, ThreeScenePresetId> = {
  "particle-nebula": "agentic-cloud",
  "portal-room": "volumetric-glow",
  "glass-blob": "caustic-stage",
  starfield: "catalog-grid",
  "floating-orbs": "pulse-sidekick",
  "crystal-cascade": "morph-sdf",
};

export const threeScenePresetIds = threeScenePresets.map((item) => item.id);
export const DEFAULT_THREE_SCENE_PRESET: ThreeScenePresetId = "agentic-cloud";
export const DEFAULT_THREE_SCENE_MODE = "objects" as const;

export const threeScenePresetGroups = [
  { title: "Atmosphere", items: threeScenePresets.filter((item) => item.group === "Atmosphere") },
  { title: "Abstract", items: threeScenePresets.filter((item) => item.group === "Abstract") },
  { title: "Organic", items: threeScenePresets.filter((item) => item.group === "Organic") },
] as const;

export const threeScenePresetNames: Record<ThreeScenePresetId, string> = Object.fromEntries(
  threeScenePresets.map((item) => [item.id, item.label]),
) as Record<ThreeScenePresetId, string>;

export function isThreeScenePresetId(value: unknown): value is ThreeScenePresetId {
  return typeof value === "string" && threeScenePresetIds.includes(value as ThreeScenePresetId);
}

export function migrateThreeScenePreset(value: unknown): ThreeScenePresetId | null {
  if (isThreeScenePresetId(value)) return value;
  if (typeof value === "string" && value in LEGACY_PRESET_MAP) {
    return LEGACY_PRESET_MAP[value];
  }
  return null;
}

export function getThreeScenePreset(id: ThreeScenePresetId) {
  return threeScenePresets.find((item) => item.id === id) ?? threeScenePresets[0];
}

export function pickOtherThreeScenePreset(current: ThreeScenePresetId) {
  const choices = threeScenePresetIds.filter((id) => id !== current);
  return choices[Math.floor(Math.random() * choices.length)] ?? current;
}

export function randomThreeScenePreset(): ThreeScenePresetId {
  return threeScenePresetIds[Math.floor(Math.random() * threeScenePresetIds.length)] ?? DEFAULT_THREE_SCENE_PRESET;
}
