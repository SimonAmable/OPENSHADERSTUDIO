/**
 * Preview fixture utility.
 *
 * The studio previews are live WebGL canvases, so this manifest is the single
 * source of truth for visual-regression captures. Run this before a browser
 * capture job to guarantee every preset is covered:
 *
 *   node scripts/generate-shader-previews.mjs
 *
 * A browser runner can load /?previewStyle=<id>, wait two animation frames,
 * then write each canvas as a PNG. Keeping the render in the app avoids the
 * inaccurate CSS mock thumbnails this utility replaces.
 */
import { mkdir, writeFile } from "node:fs/promises";

const presets = ["silk", "smoke", "waves", "flow-field", "aurora", "orb", "caustics", "mesh-drift", "metaballs", "plasma", "warp-stripes", "rings", "halftone"];
const output = { viewport: { width: 640, height: 400, deviceScaleFactor: 2 }, settleFrames: 2, presets: presets.map((slug, style) => ({ style, slug, url: `/?previewStyle=${style}` })) };

await mkdir("tmp/shader-previews", { recursive: true });
await writeFile("tmp/shader-previews/manifest.json", JSON.stringify(output, null, 2));
console.log(`Prepared ${presets.length} live-WebGL preview capture fixtures in tmp/shader-previews/manifest.json`);
