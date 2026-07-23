import type { ThreeScenePresetId } from "./types";
import type { ThreeSurfaceProfile } from "./three-surface-controls";

const lightControls = [
  { field: "offsetX" as const, label: "Light azimuth", min: -1, max: 1 },
  { field: "offsetY" as const, label: "Light height", min: -1, max: 1 },
  { field: "intensity" as const, label: "Light strength" },
];

const motionControls = [
  { field: "speed" as const, label: "Motion speed", max: 2.4, unit: "×" },
  { field: "drift" as const, label: "Drift" },
  { field: "warp" as const, label: "Distortion" },
  { field: "zoom" as const, label: "Scale", min: 0.5, max: 2, unit: "×" },
  { field: "rotate" as const, label: "Rotation", min: -3.14, max: 3.14, step: 0.01, unit: " rad" },
];

const postControls = [
  { field: "blur" as const, label: "Blur", max: 20, step: 0.25, unit: "px" },
  { field: "grain" as const, label: "Grain", max: 0.12 },
];

const threePresetSurfaceProfiles: Record<ThreeScenePresetId, ThreeSurfaceProfile> = {
  "agentic-cloud": {
    helper: "Flowing point cloud with chrome core. Intensity drives bloom; warp spreads the cloud.",
    effect: [
      { field: "intensity", label: "Bloom" },
      { field: "warp", label: "Cloud spread" },
      { field: "contrast", label: "Saturation" },
    ],
    light: lightControls,
    frame: motionControls,
    post: postControls,
    showReseed: true,
  },
  "volumetric-glow": {
    helper: "Stacked glow planes. Warp softens edges; zoom scales the light volume.",
    effect: [
      { field: "warp", label: "Glow softness" },
      { field: "zoom", label: "Volume scale", min: 0.5, max: 2, unit: "×" },
      { field: "intensity", label: "Interior glow" },
    ],
    light: lightControls,
    frame: [
      { field: "rotate", label: "Tilt", min: -3.14, max: 3.14, step: 0.01, unit: " rad" },
      { field: "speed", label: "Pulse speed", max: 2.4, unit: "×" },
    ],
    post: postControls,
  },
  "caustic-stage": {
    helper: "Caustic floor and refractive hero. Contrast thickens caustics; warp shifts chroma.",
    effect: [
      { field: "contrast", label: "Caustic strength" },
      { field: "warp", label: "Chromatic shift" },
      { field: "grain", label: "Floor grain", max: 0.12 },
    ],
    light: lightControls,
    frame: motionControls,
    post: postControls,
  },
  "catalog-grid": {
    helper: "Wireframe product cards floating in space. Zoom controls grid density.",
    effect: [
      { field: "zoom", label: "Grid density", min: 0.5, max: 2, unit: "×" },
      { field: "intensity", label: "Card glow" },
      { field: "contrast", label: "Line sharpness" },
    ],
    light: lightControls,
    frame: motionControls,
    post: postControls,
  },
  "pulse-sidekick": {
    helper: "Pulsing AI orb with orbital rings. Intensity drives bloom and pulse amplitude.",
    effect: [
      { field: "intensity", label: "Pulse glow" },
      { field: "contrast", label: "Specular" },
      { field: "warp", label: "Ring wobble" },
    ],
    light: lightControls,
    frame: motionControls,
    post: postControls,
  },
  "morph-sdf": {
    helper: "Metaball morphing blobs. Warp shifts iridescence; contrast sharpens the surface.",
    effect: [
      { field: "warp", label: "Iridescence" },
      { field: "contrast", label: "Surface detail" },
      { field: "intensity", label: "Emissive glow" },
    ],
    light: lightControls,
    frame: motionControls,
    post: postControls,
    showReseed: true,
  },
};

export function getThreePresetSurfaceProfile(id: ThreeScenePresetId): ThreeSurfaceProfile {
  return threePresetSurfaceProfiles[id] ?? threePresetSurfaceProfiles["agentic-cloud"];
}
