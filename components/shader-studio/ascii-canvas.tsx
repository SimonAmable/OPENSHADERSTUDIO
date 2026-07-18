"use client";

import { useEffect, useRef, useState } from "react";
import { renderAsciiFrame, loadAsciiSource, type AsciiPointer } from "./ascii-engine";
import { resolveMediaSource } from "./samples";
import type { Recipe } from "./types";

export function AsciiCanvas({ recipe, frozen }: { recipe: Recipe; frozen: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const pointerRef = useRef<AsciiPointer>({ x: 0.5, y: 0.5, active: false });
  const sourceRef = useRef<CanvasImageSource | null>(null);
  const [ready, setReady] = useState(false);
  const resolved = resolveMediaSource(recipe.mediaSource);

  useEffect(() => {
    let cancelled = false;
    let source: HTMLImageElement | HTMLVideoElement | null = null;
    setReady(false);
    sourceRef.current = null;

    if (!resolved) return;

    loadAsciiSource(resolved.url, resolved.mediaType)
      .then((loaded) => {
        if (cancelled) return;
        source = loaded;
        sourceRef.current = loaded;
        if (loaded instanceof HTMLVideoElement) {
          if (!frozen) void loaded.play().catch(() => undefined);
          else loaded.pause();
        }
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) setReady(false);
      });

    return () => {
      cancelled = true;
      if (source instanceof HTMLVideoElement) {
        source.pause();
        source.removeAttribute("src");
        source.load();
      }
      sourceRef.current = null;
    };
  }, [resolved?.url, resolved?.mediaType, frozen]);

  useEffect(() => {
    const source = sourceRef.current;
    if (!(source instanceof HTMLVideoElement)) return;
    if (frozen || !recipe.animate) {
      source.pause();
      return;
    }
    source.playbackRate = Math.max(0.1, recipe.speed);
    void source.play().catch(() => undefined);
  }, [recipe.animate, recipe.speed, frozen, ready]);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas || !ready || !sourceRef.current) return;

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(2, Math.floor(rect.width * dpr));
      canvas.height = Math.max(2, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);

    let frameId = 0;
    const start = performance.now();

    const draw = (now: number) => {
      const source = sourceRef.current;
      const ctx = canvas.getContext("2d");
      if (!source || !ctx) return;

      if (source instanceof HTMLVideoElement) {
        if (!frozen && source.paused) void source.play().catch(() => undefined);
        if (frozen) source.pause();
      }

      const timeSec = recipe.animate && !frozen ? (now - start) / 1000 : 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      renderAsciiFrame(ctx, source, recipe, canvas.width, canvas.height, timeSec, pointerRef.current);
      frameId = requestAnimationFrame(draw);
    };

    frameId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
    };
  }, [recipe, ready, frozen]);

  const onPointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: (event.clientX - rect.left) / rect.width,
      y: (event.clientY - rect.top) / rect.height,
      active: recipe.cursorEnabled,
    };
  };

  const onPointerLeave = () => {
    pointerRef.current = { ...pointerRef.current, active: false };
  };

  if (!resolved) {
    return (
      <div className="media-empty" role="status">
        <b>Add media</b>
        <span>Pick a sample or upload an image / video for ASCII</span>
      </div>
    );
  }

  if (!ready) {
    return <div className="media-empty" role="status"><span>Loading media…</span></div>;
  }

  return (
    <div ref={hostRef} className="ascii-canvas-host" data-ascii-canvas="" style={{ width: "100%", height: "100%" }}>
      <canvas
        ref={canvasRef}
        className="shader-canvas ascii-canvas"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        aria-label="Live ASCII preview"
      />
    </div>
  );
}

export function queryAsciiCanvas(root: ParentNode = document): HTMLCanvasElement | null {
  return root.querySelector<HTMLCanvasElement>("[data-ascii-canvas] canvas")
    ?? document.querySelector<HTMLCanvasElement>("[data-ascii-canvas] canvas");
}

export async function waitForAsciiCanvas(attempts = 90) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const canvas = queryAsciiCanvas();
    if (canvas && canvas.width > 0 && canvas.height > 0) {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      return canvas;
    }
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }
  throw new Error("Live ASCII preview is unavailable");
}
