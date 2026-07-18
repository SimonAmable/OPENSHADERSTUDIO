import { mkdir, writeFile } from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import { chromium } from "playwright";

const port = 3218;
const origin = `http://127.0.0.1:${port}`;
const filters = [
  "paper-water",
  "paper-fluted-glass",
  "paper-texture",
  "paper-image-dithering",
  "paper-halftone-dots",
  "paper-halftone-cmyk",
  "paper-liquid-metal",
  "paper-heatmap",
  "paper-gem-smoke",
  "vfx-glitch",
  "vfx-chromatic",
  "vfx-rgb-shift",
  "vfx-scanline",
  "vfx-pixelate",
  "vfx-bloom",
  "vfx-fluid",
];

const vfxFilters = new Set([
  "vfx-glitch",
  "vfx-chromatic",
  "vfx-rgb-shift",
  "vfx-scanline",
  "vfx-pixelate",
  "vfx-bloom",
  "vfx-fluid",
]);

function liveFilter(filter) {
  return vfxFilters.has(filter);
}

function waitForServer(timeout = 60_000) {
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const poll = async () => {
      try {
        const response = await fetch(origin);
        if (response.ok) return resolve();
      } catch {}
      if (Date.now() - started > timeout) return reject(new Error("Timed out waiting for the Next.js preview server."));
      setTimeout(poll, 250);
    };
    poll();
  });
}

await mkdir("public/media-previews", { recursive: true });
const devArgs = ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", String(port)];
const workerEnv = { ...process.env, NEXT_DIST_DIR: ".next-media-previews" };
const server = process.platform === "win32"
  ? spawn("cmd.exe", ["/d", "/s", "/c", `npm ${devArgs.join(" ")}`], { stdio: "inherit", windowsHide: true, env: workerEnv })
  : spawn("npm", devArgs, { stdio: "inherit", env: workerEnv });

try {
  await waitForServer();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 640, height: 400 }, deviceScaleFactor: 1 });
  for (let index = 0; index < filters.length; index += 1) {
    const filter = filters[index];
    if (filter === "vfx-pixelate") {
      await page.goto(`${origin}/`, { waitUntil: "domcontentloaded" });
      const dataUrl = await page.evaluate(async () => {
        const image = await new Promise((resolve, reject) => {
          const element = document.createElement("img");
          element.onload = () => resolve(element);
          element.onerror = () => reject(new Error("Could not load pixelate sample"));
          element.src = "/samples/556397c6096c0af0913bbc28bdb3de60.jpg";
        });
        const width = 640;
        const height = 400;
        const block = 18;
        const smallWidth = Math.max(2, Math.ceil(width / block));
        const smallHeight = Math.max(2, Math.ceil(height / block));
        const scratch = document.createElement("canvas");
        scratch.width = smallWidth;
        scratch.height = smallHeight;
        const scratchCtx = scratch.getContext("2d");
        const output = document.createElement("canvas");
        output.width = width;
        output.height = height;
        const outputCtx = output.getContext("2d");
        if (!scratchCtx || !outputCtx) throw new Error("Could not create pixelate preview");
        const scale = Math.max(smallWidth / image.width, smallHeight / image.height);
        const drawWidth = image.width * scale;
        const drawHeight = image.height * scale;
        scratchCtx.drawImage(image, (smallWidth - drawWidth) / 2, (smallHeight - drawHeight) / 2, drawWidth, drawHeight);
        outputCtx.imageSmoothingEnabled = false;
        outputCtx.drawImage(scratch, 0, 0, smallWidth, smallHeight, 0, 0, width, height);
        return output.toDataURL("image/png");
      });
      const buffer = Buffer.from(dataUrl.split(",")[1], "base64");
      await writeFile(`public/media-previews/${filter}.png`, buffer);
    } else {
      await page.goto(`${origin}/media-preview/${filter}`, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => {
        document.querySelector("#media-preview")?.removeAttribute("data-preview-ready");
        document.querySelector("#media-preview canvas")?.removeAttribute("data-preview-ready");
      });
      await page.locator("#media-preview[data-preview-ready], #media-preview canvas[data-preview-ready]").first().waitFor({ state: "attached", timeout: 90_000 });
      await page.waitForTimeout(liveFilter(filter) ? 400 : 120);
      await page.locator("#media-preview").screenshot({ path: `public/media-previews/${filter}.png` });
    }
    console.log(`Rendered media filter ${index + 1}/${filters.length}: ${filter}`);
  }
  await page.close();
  await browser.close();
} finally {
  if (process.platform === "win32") spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
  else server.kill();
}
