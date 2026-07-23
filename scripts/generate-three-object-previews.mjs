import { mkdir } from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import { chromium } from "playwright";

const port = 3221;
const origin = `http://127.0.0.1:${port}`;
const objects = [
  "sphere",
  "torus",
  "icosahedron",
  "box",
  "torus-knot",
  "capsule",
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

await mkdir("public/three-object-previews", { recursive: true });
const devArgs = ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", String(port)];
const workerEnv = { ...process.env, NEXT_DIST_DIR: ".next-three-object-previews" };
const server = process.platform === "win32"
  ? spawn("cmd.exe", ["/d", "/s", "/c", `npm ${devArgs.join(" ")}`], { stdio: "inherit", windowsHide: true, env: workerEnv })
  : spawn("npm", devArgs, { stdio: "inherit", env: workerEnv });

try {
  await waitForServer();
  const browser = await chromium.launch();
  let nextObject = 0;
  const renderWorker = async () => {
    const page = await browser.newPage({ viewport: { width: 640, height: 400 }, deviceScaleFactor: 1 });
    while (nextObject < objects.length) {
      const object = objects[nextObject++];
      await page.goto(`${origin}/scene-object-preview/${object}`, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => {
        document.querySelector("#scene-object-preview")?.removeAttribute("data-preview-ready");
        document.querySelector("#scene-object-preview canvas")?.removeAttribute("data-preview-ready");
      });
      await page.locator("#scene-object-preview[data-preview-ready], #scene-object-preview canvas[data-preview-ready]").first().waitFor({ state: "attached", timeout: 120_000 });
      await page.waitForTimeout(240);
      await page.locator("#scene-object-preview").screenshot({ path: `public/three-object-previews/${object}.png` });
      console.log(`Rendered 3D object ${nextObject}/${objects.length}: ${object}`);
    }
    await page.close();
  };
  await Promise.all(Array.from({ length: 2 }, renderWorker));
  await browser.close();
} finally {
  if (process.platform === "win32") spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
  else server.kill();
}
