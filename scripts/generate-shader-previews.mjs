import { mkdir } from "node:fs/promises";
import { spawn, spawnSync } from "node:child_process";
import { chromium } from "playwright";

const port = 3217;
const origin = `http://127.0.0.1:${port}`;
const styles = Array.from({ length: 34 }, (_, style) => style);

function waitForServer(timeout = 45_000) {
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

await mkdir("public/style-previews", { recursive: true });
const devArgs = ["run", "dev", "--", "--hostname", "127.0.0.1", "--port", String(port)];
const workerEnv = { ...process.env, NEXT_DIST_DIR: ".next-style-previews" };
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
      await page.goto(`${origin}/style-preview/${style}`, { waitUntil: "domcontentloaded" });
      await page.locator("#style-preview canvas").waitFor({ state: "attached" });
      // Give each WebGL canvas one paint after its shader has compiled.
      await page.waitForTimeout(180);
      await page.locator("#style-preview").screenshot({ path: `public/style-previews/${style}.png` });
      console.log(`Rendered style ${style + 1}/${styles.length}`);
    }
    await page.close();
  };
  await Promise.all(Array.from({ length: 4 }, renderWorker));
  await browser.close();
} finally {
  // Windows' command shell does not propagate `kill()` to Next's child
  // process. Terminate only this worker's process tree, never the user's app.
  if (process.platform === "win32") spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore", windowsHide: true });
  else server.kill();
}
