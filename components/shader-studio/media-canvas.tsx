import {
  FlutedGlass,
  GemSmoke,
  HalftoneCmyk,
  HalftoneDots,
  Heatmap,
  ImageDithering,
  LiquidMetal,
  PaperTexture,
  Water,
} from "@paper-design/shaders-react";
import {
  BloomEffect,
  ChromaticEffect,
  FluidEffect,
  GlitchEffect,
  PixelateEffect,
  RgbShiftEffect,
  ScanlineEffect,
} from "@vfx-js/effects";
import { VFX } from "@vfx-js/core";
import { VFXContext, VFXImg, VFXVideo } from "@vfx-js/react";
import { useEffect, useMemo, useState, type CSSProperties, type ComponentType, type ReactNode } from "react";
import { isPaperMediaFilter, isVfxMediaFilter, mediaPaperProps } from "./media-catalog";
import { resolveMediaSource } from "./samples";
import type { MediaFilterId, Recipe } from "./types";

type PaperMediaComponent = ComponentType<Record<string, unknown>>;

const paperMediaComponents: Partial<Record<MediaFilterId, PaperMediaComponent>> = {
  "paper-water": Water as unknown as PaperMediaComponent,
  "paper-fluted-glass": FlutedGlass as unknown as PaperMediaComponent,
  "paper-texture": PaperTexture as unknown as PaperMediaComponent,
  "paper-image-dithering": ImageDithering as unknown as PaperMediaComponent,
  "paper-halftone-dots": HalftoneDots as unknown as PaperMediaComponent,
  "paper-halftone-cmyk": HalftoneCmyk as unknown as PaperMediaComponent,
  "paper-liquid-metal": LiquidMetal as unknown as PaperMediaComponent,
  "paper-heatmap": Heatmap as unknown as PaperMediaComponent,
  "paper-gem-smoke": GemSmoke as unknown as PaperMediaComponent,
};

function buildVfxEffect(recipe: Recipe) {
  const intensity = recipe.intensity;
  const warp = recipe.warp;
  const speed = (recipe.reverse ? -1 : 1) * (0.4 + recipe.speed * 1.2);
  switch (recipe.mediaFilter) {
    case "vfx-glitch":
      return new GlitchEffect({ intensity: 0.2 + intensity * 1.4, speed });
    case "vfx-chromatic":
      return new ChromaticEffect({ intensity: 0.15 + intensity * 1.2 + warp * 0.5, radius: 0.15 + warp * 0.5, power: 1 + recipe.contrast });
    case "vfx-rgb-shift":
      return new RgbShiftEffect({ amount: 2 + intensity * 18 + warp * 10, speed });
    case "vfx-scanline":
      return new ScanlineEffect({ spacing: Math.max(2, 10 - intensity * 7 - warp * 4) });
    case "vfx-pixelate":
      return new PixelateEffect({ size: Math.max(2, 4 + intensity * 28 + warp * 16) });
    case "vfx-bloom":
      return new BloomEffect({
        threshold: Math.max(0.05, 0.55 - intensity * 0.35),
        intensity: 2 + intensity * 14,
        scatter: 0.25 + recipe.drift * 0.6,
        softness: recipe.smoothBlend ? 0.7 : 0.25,
        dither: recipe.grain * 4,
        pad: 40 + intensity * 80,
        edgeFade: 0.08,
      });
    case "vfx-fluid":
      return new FluidEffect({
        splatForce: 2000 + intensity * 6000,
        curlStrength: 8 + warp * 24,
        velocityDissipation: 0.96 - recipe.drift * 0.08,
        densityDissipation: 0.95 - recipe.grain,
      });
    default:
      return new GlitchEffect({ intensity: 0.5, speed: 1 });
  }
}

function PaperMediaCanvas({ recipe, frozen, imageUrl }: { recipe: Recipe; frozen: boolean; imageUrl: string }) {
  const Component = paperMediaComponents[recipe.mediaFilter];
  if (!Component) return null;
  const props = mediaPaperProps(recipe, frozen, imageUrl);
  const style: CSSProperties = {
    width: "100%",
    height: "100%",
    filter: [
      recipe.contrast !== 0.5 ? `contrast(${0.7 + recipe.contrast * 0.8})` : null,
      recipe.blur ? `blur(${recipe.blur}px)` : null,
    ].filter(Boolean).join(" ") || undefined,
    opacity: 0.55 + recipe.intensity * 0.45,
    transform: recipe.blur ? "scale(1.025)" : undefined,
  };
  return (
    <div className="paper-shader-host media-paper-host" data-media-paper="" style={{ width: "100%", height: "100%", touchAction: "none" }}>
      <Component className="paper-shader-canvas media-paper-canvas" width="100%" height="100%" {...props} style={style} />
    </div>
  );
}

let studioVfxCanvas: HTMLCanvasElement | null = null;

function tagStudioVfxCanvas(instance: VFX | null) {
  if (studioVfxCanvas) {
    studioVfxCanvas.removeAttribute("data-media-vfx-canvas");
    studioVfxCanvas = null;
  }
  if (!instance) return;
  for (const canvas of document.body.querySelectorAll("canvas")) {
    const style = canvas.style;
    if ((style.position === "fixed" || style.position === "absolute") && style.pointerEvents === "none") {
      canvas.setAttribute("data-media-vfx-canvas", "");
      studioVfxCanvas = canvas;
      return;
    }
  }
}

function StudioVfxProvider({
  children,
  autoplay,
  pixelRatio,
}: {
  children: ReactNode;
  autoplay: boolean;
  pixelRatio: number;
}) {
  const [vfx, setVfx] = useState<VFX | null>(null);

  useEffect(() => {
    const instance = VFX.init({ autoplay, pixelRatio, scrollPadding: false });
    if (!instance) return;
    setVfx(instance);
    requestAnimationFrame(() => tagStudioVfxCanvas(instance));

    return () => {
      tagStudioVfxCanvas(null);
      instance.destroy();
      setVfx(null);
    };
  }, [autoplay, pixelRatio]);

  return <VFXContext.Provider value={vfx}>{children}</VFXContext.Provider>;
}

function syncVfxEffectParams(effect: ReturnType<typeof buildVfxEffect>, recipe: Recipe) {
  const next = buildVfxEffect(recipe);
  Object.assign(effect.params, next.params);
}

function VfxMediaCanvas({ recipe, frozen, url, mediaType }: { recipe: Recipe; frozen: boolean; url: string; mediaType: "image" | "video" }) {
  const effect = useMemo(() => buildVfxEffect(recipe), [recipe.mediaFilter, recipe.intensity, recipe.warp, recipe.speed, recipe.reverse, recipe.contrast, recipe.drift, recipe.smoothBlend, recipe.grain]);

  useEffect(() => {
    syncVfxEffectParams(effect, recipe);
  }, [effect, recipe]);

  const mediaStyle: CSSProperties = {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  };

  const hostStyle: CSSProperties = {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    filter: recipe.blur ? `blur(${recipe.blur}px)` : undefined,
  };

  const pixelRatio = Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2);

  return (
    <div className="media-vfx-host" data-media-vfx="" style={hostStyle}>
      <StudioVfxProvider key={recipe.mediaFilter} autoplay={!frozen} pixelRatio={pixelRatio}>
        {mediaType === "video" ? (
          <VFXVideo key={url} src={url} autoPlay={!frozen} muted loop playsInline effect={effect} style={mediaStyle} />
        ) : (
          <VFXImg key={url} src={url} alt="" draggable={false} crossOrigin="anonymous" effect={effect} style={mediaStyle} />
        )}
      </StudioVfxProvider>
    </div>
  );
}

export function MediaCanvas({ recipe, frozen }: { recipe: Recipe; frozen: boolean }) {
  const resolved = resolveMediaSource(recipe.mediaSource);
  const [imageForPaper, setImageForPaper] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!resolved) {
      setImageForPaper(null);
      return;
    }
    if (resolved.mediaType === "image" || !isPaperMediaFilter(recipe.mediaFilter)) {
      setImageForPaper(resolved.url);
      return;
    }
    // Paper filters expect an image — capture a still from video sources.
    const video = document.createElement("video");
    video.src = resolved.url;
    video.muted = true;
    video.playsInline = true;
    video.crossOrigin = "anonymous";
    const capture = () => {
      if (cancelled) return;
      try {
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(2, video.videoWidth || 1280);
        canvas.height = Math.max(2, video.videoHeight || 720);
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setImageForPaper(canvas.toDataURL("image/jpeg", 0.92));
      } catch {
        setImageForPaper(null);
      }
    };
    video.addEventListener("loadeddata", capture, { once: true });
    video.load();
    return () => {
      cancelled = true;
      video.removeEventListener("loadeddata", capture);
    };
  }, [resolved?.url, resolved?.mediaType, recipe.mediaFilter]);

  if (!resolved) {
    return (
      <div className="media-empty" role="status">
        <b>Add media</b>
        <span>Pick a sample or upload an image / video</span>
      </div>
    );
  }

  if (isVfxMediaFilter(recipe.mediaFilter)) {
    return <VfxMediaCanvas recipe={recipe} frozen={frozen} url={resolved.url} mediaType={resolved.mediaType} />;
  }

  if (!imageForPaper) {
    return <div className="media-empty" role="status"><span>Loading media…</span></div>;
  }

  return <PaperMediaCanvas recipe={recipe} frozen={frozen} imageUrl={imageForPaper} />;
}

export function queryMediaCanvas(root: ParentNode = document): HTMLCanvasElement | null {
  return (
    root.querySelector<HTMLCanvasElement>("[data-media-paper] canvas")
    ?? root.querySelector<HTMLCanvasElement>("[data-media-vfx-canvas]")
    ?? document.querySelector<HTMLCanvasElement>("[data-media-vfx-canvas]")
    ?? studioVfxCanvas
    ?? root.querySelector<HTMLCanvasElement>(".canvas-area [data-media-paper] canvas")
  );
}

export async function waitForMediaCanvas(attempts = 90) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const canvas = queryMediaCanvas();
    if (canvas && canvas.width > 0 && canvas.height > 0) {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      return canvas;
    }
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }
  throw new Error("Live media preview is unavailable");
}
