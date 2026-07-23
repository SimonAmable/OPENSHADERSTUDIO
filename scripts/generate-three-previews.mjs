import { mkdir } from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import { chromium } from "playwright";

const port = 3220;
const origin = `http://127.0.0.1:${port}`;
const materials = [
  "chrome",
  "matte",
  "glass",
  "toon",
  "iridescent",
  "liquid-chrome",
  "flow-field",
  "plasma",
  "caustics",
  "aurora",
  "smoke",
  "swirl",
  "silk",
  "neuro-noise",
  "waves",
];

function waitForServer(timeout = 90_000) {
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

await mkdir("public/three-previews", { recursive: true });
const devArgs = ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", String(port)];
const workerEnv = { ...process.env, NEXT_DIST_DIR: ".next-three-previews" };
const server = process.platform === "win32"
  ? spawn("cmd.exe", ["/d", "/s", "/c", `npm ${devArgs.join(" ")}`], { stdio: "inherit", windowsHide: true, env: workerEnv })
  : spawn("npm", devArgs, { stdio: "inherit", env: workerEnv });

try {
  await waitForServer();
  const browser = await chromium.launch();
  let nextMaterial = 0;
  const renderWorker = async () => {
    const page = await browser.newPage({ viewport: { width: 640, height: 400 }, deviceScaleFactor: 1 });
    while (nextMaterial < materials.length) {
      const material = materials[nextMaterial++];
      await page.goto(`${origin}/scene-preview/${material}`, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => {
        document.querySelector("#scene-preview")?.removeAttribute("data-preview-ready");
        document.querySelector("#scene-preview canvas")?.removeAttribute("data-preview-ready");
      });
      await page.locator("#scene-preview[data-preview-ready], #scene-preview canvas[data-preview-ready]").first().waitFor({ state: "attached", timeout: 120_000 });
      await page.waitForTimeout(240);
      await page.locator("#scene-preview").screenshot({ path: `public/three-previews/${material}.png` });
      console.log(`Rendered 3D material ${nextMaterial}/${materials.length}: ${material}`);
    }
    await page.close();
  };
  await Promise.all(Array.from({ length: 2 }, renderWorker));
  await browser.close();
} finally {
  if (process.platform === "win32") spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
  else server.kill();
}
