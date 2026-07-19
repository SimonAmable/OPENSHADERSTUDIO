import { chromium } from "playwright";

const origin = "http://127.0.0.1:3000";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await page.goto(origin, { waitUntil: "networkidle" });

const result = await page.evaluate(async () => {
  const errors = [];
  const logs = [];

  // Wait for app to hydrate
  await new Promise((r) => setTimeout(r, 2000));

  for (const style of [14, 18]) {
    try {
      const mod = await import("/_next/static/chunks/components_shader-studio_canvas_tsx.js").catch(() => null);
      logs.push(`style ${style}: dynamic import ${mod ? "ok" : "failed"}`);
    } catch (e) {
      logs.push(`style ${style}: import error ${e}`);
    }
  }

  // Inline test mimicking createPaperExportSurface
  const testStyle = async (style) => {
    const host = document.createElement("div");
    host.setAttribute("data-paper-export", "");
    host.style.cssText = "position:fixed;left:-10000px;top:0;width:1920px;height:1080px;overflow:hidden;pointer-events:none;opacity:0;z-index:-1;";
    document.body.appendChild(host);

    const width = 1920;
    const height = 1080;

    // Find React root and trigger export surface via custom event - fallback: mount GrainGradient directly
    const { createElement: h } = await import("react");
    const { createRoot } = await import("react-dom/client");
    const { GrainGradient, MeshGradient } = await import("@paper-design/shaders-react");

    const Component = style === 18 ? GrainGradient : MeshGradient;
    const props = {
      width,
      height,
      minPixelRatio: 1,
      maxPixelCount: width * height,
      style: { width, height },
      className: "paper-shader-canvas",
      colors: ["#4b2a9d", "#db62c4", "#ffd7a0"],
      colorBack: "#120b2d",
      scale: 1.06,
      speed: 0,
      frame: 1,
      intensity: 0.2,
      noise: 0.075,
      softness: 0.5,
    };

    const root = createRoot(host);
    root.render(
      h("div", { className: "paper-shader-host", style: { width, height } },
        h(Component, props),
      ),
    );

    let mount = null;
    let canvas = null;
    let lastError = null;

    for (let attempt = 0; attempt < 120; attempt += 1) {
      const local = host.querySelector("[data-paper-shader]");
      mount = local?.paperShaderMount ?? null;
      canvas = mount?.canvasElement ?? host.querySelector("canvas");
      if (mount && canvas) {
        if (canvas.width >= width * 0.95 && canvas.height >= height * 0.95) {
          return { style, ok: true, w: canvas.width, h: canvas.height, attempts: attempt + 1 };
        }
      }
      await new Promise((r) => requestAnimationFrame(() => r()));
    }

    root.unmount();
    host.remove();
    return {
      style,
      ok: false,
      mount: !!mount,
      canvas: !!canvas,
      w: canvas?.width ?? 0,
      h: canvas?.height ?? 0,
      parentW: host.querySelector("[data-paper-shader]")?.clientWidth,
      parentH: host.querySelector("[data-paper-shader]")?.clientHeight,
    };
  };

  return {
    mesh: await testStyle(14),
    grain: await testStyle(18),
    logs,
    webgl2: !!document.createElement("canvas").getContext("webgl2"),
  };
});

console.log(JSON.stringify(result, null, 2));
await browser.close();
