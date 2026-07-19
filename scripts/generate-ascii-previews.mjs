import { mkdir } from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import { chromium } from "playwright";

const port = 3219;
const origin = `http://127.0.0.1:${port}`;
const styles = [
  "characters",
  "braille",
  "mixed",
  "hex-dump",
  "matrix",
  "dots",
  "cross",
  "diamond",
  "rings",
  "hearts",
  "stars",
  "hexagons",
  "triangles",
  "bubbles",
  "lines",
  "diagonal",
  "hatching",
  "contour",
  "dither",
  "pixel-art",
  "mosaic",
  "bricks",
  "voxel",
  "half-blocks",
  "disco",
];

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

await mkdir("public/ascii-previews", { recursive: true });
const devArgs = ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", String(port)];
const workerEnv = { ...process.env, NEXT_DIST_DIR: ".next-ascii-previews" };
const server = process.platform === "win32"
  ? spawn("cmd.exe", ["/d", "/s", "/c", `npm ${devArgs.join(" ")}`], { stdio: "inherit", windowsHide: true, env: workerEnv })
  : spawn("npm", devArgs, { stdio: "inherit", env: workerEnv });

try {
  await waitForServer();
  const browser = await chromium.launch();
  let nextStyle = 0;
  const renderWorker = async () => {
    const page = await browser.newPage({ viewport: { width: 640, height: 400 }, deviceScaleFactor: 1 });
    while (nextStyle < styles.length) {
      const style = styles[nextStyle++];
      await page.goto(`${origin}/ascii-preview/${style}`, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => {
        document.querySelector("#ascii-preview")?.removeAttribute("data-preview-ready");
        document.querySelector("#ascii-preview canvas")?.removeAttribute("data-preview-ready");
      });
      await page.locator("#ascii-preview[data-preview-ready], #ascii-preview canvas[data-preview-ready]").first().waitFor({ state: "attached", timeout: 90_000 });
      await page.waitForTimeout(180);
      await page.locator("#ascii-preview").screenshot({ path: `public/ascii-previews/${style}.png` });
      console.log(`Rendered ASCII style ${nextStyle}/${styles.length}: ${style}`);
    }
    await page.close();
  };
  await Promise.all(Array.from({ length: 4 }, renderWorker));
  await browser.close();
} finally {
  if (process.platform === "win32") spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
  else server.kill();
}
