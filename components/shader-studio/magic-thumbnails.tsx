"use client";

import { useEffect, useRef, useState } from "react";
import { renderExportShaderCanvas } from "./export-render";
import { canvasToPngBlob } from "./render-png";
import type { MagicPalette, MagicVisual } from "./magic-background";

const THUMB_WIDTH = 160;
const THUMB_HEIGHT = 120;

const thumbCache = new Map<string, string>();

function thumbKey(session: number, palette: MagicPalette, run: number, visualId: string) {
  return `${session}:${palette.id}:${run}:${palette.colors.join("-")}:${visualId}`;
}

export function clearMagicThumbnailCache() {
  thumbCache.forEach((url) => URL.revokeObjectURL(url));
  thumbCache.clear();
}

export function useMagicThumbnails(
  visuals: MagicVisual[],
  palette: MagicPalette | null,
  run: number,
  session: number,
  enabled: boolean,
) {
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const generationRef = useRef(0);
  const visualsRef = useRef(visuals);
  visualsRef.current = visuals;

  const paletteId = palette?.id ?? "";
  const paletteColors = palette?.colors.join("-") ?? "";
  const visualIds = visuals.map((visual) => visual.id).join(",");

  useEffect(() => {
    const currentVisuals = visualsRef.current;
    if (!enabled || !palette || !currentVisuals.length) {
      setThumbnails({});
      setLoading(false);
      return;
    }

    const generation = generationRef.current + 1;
    generationRef.current = generation;

    const cached: Record<string, string> = {};
    let missing = false;
    for (const visual of currentVisuals) {
      const key = thumbKey(session, palette, run, visual.id);
      const url = thumbCache.get(key);
      if (url) cached[visual.id] = url;
      else missing = true;
    }
    setThumbnails(cached);

    if (!missing) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    (async () => {
      for (const visual of currentVisuals) {
        if (cancelled || generationRef.current !== generation) return;

        const key = thumbKey(session, palette, run, visual.id);
        const existing = thumbCache.get(key);
        if (existing) {
          setThumbnails((current) => (current[visual.id] === existing ? current : { ...current, [visual.id]: existing }));
          continue;
        }

        try {
          const canvas = await renderExportShaderCanvas(visual.recipe, THUMB_WIDTH, THUMB_HEIGHT);
          const blob = await canvasToPngBlob(canvas);
          const url = URL.createObjectURL(blob);
          thumbCache.set(key, url);
          if (!cancelled && generationRef.current === generation) {
            setThumbnails((current) => ({ ...current, [visual.id]: url }));
          }
        } catch {
          // Skip failed thumbnails — card still shows label.
        }
      }
      if (!cancelled && generationRef.current === generation) setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [enabled, palette, paletteId, paletteColors, run, session, visualIds]);

  return { thumbnails, loading };
}
