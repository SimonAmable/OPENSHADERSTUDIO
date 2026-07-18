"use client";

import { CSSProperties, MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import { Check, CircleHelp, Droplets, ImageDown, Layers3, LoaderCircle, RefreshCcw, RotateCcw, WandSparkles } from "lucide-react";
import JSZip from "jszip";
import { toast } from "sonner";
import type { Recipe, VideoExportSettings } from "./types";
import { ShaderCanvas, isPaperStyle } from "./canvas";
import { exportPreviewAspect, shaderOutputSize } from "./export-utils";
import { VARIATION_MODE_META, VariationMode, generateVariationRecipes } from "./randomize";
import { canvasToPngBlob, renderNativeRecipeToCanvas, scaleCanvasToPngBlob, slugifyRecipeName } from "./render-png";

const ALL_MODES: VariationMode[] = ["vary", "inspire", "recolour", "remix", "restyle"];
const COUNT_OPTIONS = [4, 6, 8, 12] as const;
const PREVIEW_HEIGHT = 240;

type VariationItem = {
  id: string;
  index: number;
  mode: VariationMode;
  recipe: Recipe;
  previewUrl: string | null;
  selected: boolean;
};

type VariationBase =
  | { kind: "canvas" }
  | { kind: "variation"; id: string; recipe: Recipe; previewUrl: string; mode: VariationMode };

type CaptureRequest = {
  key: string;
  recipe: Recipe;
  width: number;
  height: number;
  resolve: (canvas: HTMLCanvasElement) => void;
  reject: (error: Error) => void;
};

const modeIcon = {
  vary: RefreshCcw,
  inspire: CircleHelp,
  recolour: Droplets,
  remix: WandSparkles,
  restyle: WandSparkles,
} as const;

function ExportAspectSelect({ value, onChange }: { value: VideoExportSettings["aspect"]; onChange: (aspect: VideoExportSettings["aspect"]) => void }) {
  return <label>Aspect<select value={value} onChange={(event) => onChange(event.target.value as VideoExportSettings["aspect"])}><option value="16:9">16:9</option><option value="1:1">1:1</option><option value="9:16">9:16</option></select></label>;
}

function ExportResolutionSelect({ value, onChange }: { value: VideoExportSettings["height"]; onChange: (height: VideoExportSettings["height"]) => void }) {
  return <label>Resolution<select value={value} onChange={(event) => onChange(Number(event.target.value) as VideoExportSettings["height"])}><option value={480}>480p</option><option value={720}>720p</option><option value={1080}>1080p</option><option value={1440}>1440p</option></select></label>;
}

function VariationCaptureHost({ request }: { request: CaptureRequest | null }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef(request);
  requestRef.current = request;

  useEffect(() => {
    if (!request) return;
    let cancelled = false;
    let attempts = 0;
    const settle = () => {
      if (cancelled || requestRef.current?.key !== request.key) return;
      const canvas = rootRef.current?.querySelector("canvas");
      if (canvas && canvas.width > 0 && canvas.height > 0) {
        requestAnimationFrame(() => {
          if (cancelled || requestRef.current?.key !== request.key) return;
          const ready = rootRef.current?.querySelector("canvas");
          if (ready && ready.width > 0) request.resolve(ready);
          else request.reject(new Error("Shader preview is unavailable"));
        });
        return;
      }
      attempts += 1;
      if (attempts > 90) {
        request.reject(new Error("Timed out waiting for shader preview"));
        return;
      }
      requestAnimationFrame(settle);
    };
    const frame = requestAnimationFrame(settle);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
    };
  }, [request]);

  if (!request) return null;
  return (
    <div
      ref={rootRef}
      className="variations-capture"
      aria-hidden
      style={{
        position: "fixed",
        left: -10000,
        top: 0,
        width: request.width,
        height: request.height,
        pointerEvents: "none",
        opacity: 0,
        overflow: "hidden",
      }}
    >
      <ShaderCanvas key={request.key} recipe={request.recipe} frozen onError={() => undefined} />
    </div>
  );
}

export function VariationsExportPanel({
  recipe,
  settings,
  onSettingsChange,
  onApplyToCanvas,
}: {
  recipe: Recipe;
  settings: VideoExportSettings;
  onSettingsChange: (update: Partial<VideoExportSettings>) => void;
  onApplyToCanvas: (next: Recipe) => void;
}) {
  const [modes, setModes] = useState<VariationMode[]>(["remix"]);
  const [count, setCount] = useState<(typeof COUNT_OPTIONS)[number]>(6);
  const [items, setItems] = useState<VariationItem[]>([]);
  const [base, setBase] = useState<VariationBase>({ kind: "canvas" });
  const [busy, setBusy] = useState<"idle" | "generating" | "exporting">("idle");
  const [progress, setProgress] = useState(0);
  const [captureRequest, setCaptureRequest] = useState<CaptureRequest | null>(null);
  const previewUrlsRef = useRef<string[]>([]);

  const size = shaderOutputSize(settings.aspect, settings.height);
  const previewSize = shaderOutputSize(settings.aspect, PREVIEW_HEIGHT);
  const selectedCount = items.filter((item) => item.selected).length;
  const allSelected = items.length > 0 && selectedCount === items.length;
  const baseRecipe = base.kind === "variation" ? base.recipe : recipe;
  const usingVariationBase = base.kind === "variation";

  useEffect(() => () => {
    previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    previewUrlsRef.current = [];
  }, []);

  const captureMounted = useCallback((nextRecipe: Recipe, width: number, height: number) => new Promise<HTMLCanvasElement>((resolve, reject) => {
    const key = `${nextRecipe.id}-${width}x${height}-${Math.random().toString(36).slice(2, 8)}`;
    setCaptureRequest({
      key,
      recipe: nextRecipe,
      width,
      height,
      resolve: (canvas) => {
        setCaptureRequest((current) => current?.key === key ? null : current);
        resolve(canvas);
      },
      reject: (error) => {
        setCaptureRequest((current) => current?.key === key ? null : current);
        reject(error);
      },
    });
  }), []);

  const renderVariationBlob = useCallback(async (variation: Recipe, width: number, height: number) => {
    if (isPaperStyle(variation.style)) {
      const source = await captureMounted(variation, width, height);
      return scaleCanvasToPngBlob(source, width, height);
    }
    return canvasToPngBlob(renderNativeRecipeToCanvas(variation, width, height));
  }, [captureMounted]);

  const toggleMode = (mode: VariationMode) => {
    setModes((current) => {
      if (current.includes(mode)) {
        if (current.length === 1) return current;
        return current.filter((item) => item !== mode);
      }
      return ALL_MODES.filter((item) => current.includes(item) || item === mode);
    });
  };

  const setVariationAsBase = (item: VariationItem, event: MouseEvent) => {
    event.stopPropagation();
    if (!item.previewUrl || busy !== "idle") return;
    setBase({
      kind: "variation",
      id: item.id,
      recipe: item.recipe,
      previewUrl: item.previewUrl,
      mode: item.mode,
    });
    toast("Next batch will remix from this variation");
  };

  const resetBaseToCanvas = () => {
    setBase({ kind: "canvas" });
    toast("Base reset to the live canvas");
  };

  const applyBaseToCanvas = () => {
    if (base.kind !== "variation" || busy !== "idle") return;
    onApplyToCanvas(base.recipe);
    setBase({ kind: "canvas" });
    toast("Variation applied to canvas");
  };

  const generate = async () => {
    if (!modes.length) {
      toast.error("Select at least one variation mode");
      return;
    }
    setBusy("generating");
    setProgress(0);
    const keepUrl = base.kind === "variation" ? base.previewUrl : null;
    previewUrlsRef.current.forEach((url) => {
      if (url !== keepUrl) URL.revokeObjectURL(url);
    });
    previewUrlsRef.current = keepUrl ? [keepUrl] : [];
    const generated = generateVariationRecipes(baseRecipe, modes, count).map(({ mode, recipe: next }, index) => ({
      id: next.id,
      index,
      mode,
      recipe: next,
      previewUrl: null as string | null,
      selected: true,
    }));
    setItems(generated);

    try {
      const nextItems: VariationItem[] = [];
      for (let index = 0; index < generated.length; index += 1) {
        const item = generated[index];
        const blob = await renderVariationBlob(item.recipe, previewSize.width, previewSize.height);
        const previewUrl = URL.createObjectURL(blob);
        previewUrlsRef.current.push(previewUrl);
        nextItems.push({ ...item, previewUrl });
        setItems([...nextItems, ...generated.slice(index + 1)]);
        setProgress((index + 1) / generated.length);
      }
      setItems(nextItems);
      toast(`${nextItems.length} variations ready`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not generate variations");
      setItems([]);
    } finally {
      setBusy("idle");
      setProgress(0);
      setCaptureRequest(null);
    }
  };

  const toggleItem = (id: string) => {
    setItems((current) => current.map((item) => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const setAllSelected = (selected: boolean) => {
    setItems((current) => current.map((item) => ({ ...item, selected })));
  };

  const downloadSelected = async () => {
    const selected = items.filter((item) => item.selected && item.previewUrl);
    if (!selected.length) {
      toast.error("Select at least one variation");
      return;
    }
    setBusy("exporting");
    setProgress(0);
    try {
      const zip = new JSZip();
      const baseName = slugifyRecipeName(baseRecipe.name);
      for (let index = 0; index < selected.length; index += 1) {
        const item = selected[index];
        const blob = await renderVariationBlob(item.recipe, size.width, size.height);
        const modeLabel = VARIATION_MODE_META[item.mode].label.toLowerCase();
        zip.file(`${baseName}-${String(index + 1).padStart(2, "0")}-${modeLabel}.png`, blob);
        setProgress((index + 1) / selected.length);
      }
      const archive = await zip.generateAsync({ type: "blob" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(archive);
      link.download = `${baseName}-variations.zip`;
      link.click();
      URL.revokeObjectURL(link.href);
      toast(`Downloaded ${selected.length} PNG${selected.length === 1 ? "" : "s"}`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not export variations");
    } finally {
      setBusy("idle");
      setProgress(0);
      setCaptureRequest(null);
    }
  };

  const generateLabel = busy === "generating"
    ? `Generating ${Math.round(progress * 100)}%`
    : "Generate from base";

  return (
    <div className="variations-export">
      <VariationCaptureHost request={captureRequest} />
      <div className="variations-toolbar video-controls">
        <ExportAspectSelect value={settings.aspect} onChange={(aspect) => onSettingsChange({ aspect })} />
        <ExportResolutionSelect value={settings.height} onChange={(height) => onSettingsChange({ height })} />
        <label>Count
          <select value={count} onChange={(event) => setCount(Number(event.target.value) as (typeof COUNT_OPTIONS)[number])} disabled={busy !== "idle"}>
            {COUNT_OPTIONS.map((value) => <option key={value} value={value}>{value} images</option>)}
          </select>
        </label>
        <p className="video-note variations-note">{size.width} × {size.height} px · Modes cycle in order · Click a tile to select for download.</p>
        <div className="variation-modes" role="group" aria-label="Variation modes">
          {ALL_MODES.map((mode) => {
            const Icon = modeIcon[mode];
            const active = modes.includes(mode);
            return (
              <button
                key={mode}
                type="button"
                className={`variation-mode ${active ? "active" : ""}`}
                aria-pressed={active}
                title={VARIATION_MODE_META[mode].hint}
                onClick={() => toggleMode(mode)}
                disabled={busy !== "idle"}
              >
                <Icon />
                <span>{VARIATION_MODE_META[mode].label}</span>
              </button>
            );
          })}
        </div>
        <div className={`variations-base-strip ${usingVariationBase ? "from-variation" : "from-canvas"}`}>
          <div className="variations-base-thumb" aria-hidden>
            {base.kind === "variation" ? <img src={base.previewUrl} alt="" /> : <Layers3 />}
          </div>
          <div className="variations-base-copy">
            <span className="variations-base-eyebrow">Base</span>
            <b>{usingVariationBase ? `From variation · ${VARIATION_MODE_META[base.mode].label}` : "From canvas"}</b>
            <span>{usingVariationBase ? "Generate will branch from this look" : "Generate will branch from the live shader"}</span>
          </div>
          {usingVariationBase && (
            <div className="variations-base-actions">
              <button type="button" className="button ghost variations-base-apply" onClick={applyBaseToCanvas} disabled={busy !== "idle"}>
                Apply to canvas
              </button>
              <button type="button" className="button ghost variations-base-reset" onClick={resetBaseToCanvas} disabled={busy !== "idle"}>
                <RotateCcw /> Reset to canvas
              </button>
            </div>
          )}
        </div>
        <div className="variations-actions">
          <button type="button" className="button primary wide" onClick={generate} disabled={busy !== "idle"}>
            {busy === "generating" ? <LoaderCircle className="spin" /> : <RefreshCcw />}
            {generateLabel}
          </button>
        </div>
      </div>

      <div className="variations-stage">
        {items.length === 0 && busy === "idle" && (
          <div className="variations-empty">
            <Layers3 />
            <div>
              <b>Generate a variation grid</b>
              <p>Then use any tile as the next base without changing the live canvas.</p>
            </div>
          </div>
        )}
        {busy === "generating" && !items.some((item) => item.previewUrl) && (
          <div className="variations-empty">
            <LoaderCircle className="spin" />
            <div>
              <b>Rendering previews</b>
              <p>{Math.round(progress * 100)}% complete</p>
            </div>
          </div>
        )}
        {items.some((item) => item.previewUrl) && (
          <>
            <div className="variations-grid-bar">
              <span>{selectedCount} of {items.length} selected for download</span>
              <div className="variations-grid-bar-actions">
                <button type="button" className="text-button" onClick={() => setAllSelected(true)} disabled={busy !== "idle" || allSelected}>Select all</button>
                <button type="button" className="text-button" onClick={() => setAllSelected(false)} disabled={busy !== "idle" || selectedCount === 0}>Clear</button>
              </div>
            </div>
            <div className="variations-grid" style={{ "--variations-aspect": exportPreviewAspect(settings.aspect) } as CSSProperties}>
              {items.map((item) => {
                const Icon = modeIcon[item.mode];
                const isBase = base.kind === "variation" && base.id === item.id;
                return (
                  <div
                    key={item.id}
                    className={`variation-tile ${item.selected ? "selected" : ""} ${isBase ? "is-base" : ""} ${item.previewUrl ? "" : "loading"}`}
                  >
                    <button
                      type="button"
                      className="variation-tile-select"
                      onClick={() => item.previewUrl && busy === "idle" && toggleItem(item.id)}
                      disabled={!item.previewUrl || busy !== "idle"}
                      aria-pressed={item.selected}
                      aria-label={`${item.selected ? "Deselect" : "Select"} ${VARIATION_MODE_META[item.mode].label} variation`}
                    >
                      <div className="variation-tile-media">
                        {item.previewUrl ? <img src={item.previewUrl} alt="" /> : <LoaderCircle className="spin" />}
                      </div>
                    </button>
                    <span className="variation-tile-check" aria-hidden>{item.selected ? <Check /> : null}</span>
                    {isBase && <span className="variation-tile-base-badge">Base</span>}
                    <span className="variation-tile-label"><Icon />{VARIATION_MODE_META[item.mode].label}</span>
                    {item.previewUrl && (
                      <button
                        type="button"
                        className="variation-tile-base-btn"
                        onClick={(event) => setVariationAsBase(item, event)}
                        disabled={busy !== "idle" || isBase}
                      >
                        {isBase ? "Current base" : "Use as base"}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            <button type="button" className="button primary wide variations-download" onClick={downloadSelected} disabled={busy !== "idle" || selectedCount === 0}>
              {busy === "exporting" ? <LoaderCircle className="spin" /> : <ImageDown />}
              {busy === "exporting" ? `Exporting ${Math.round(progress * 100)}%` : `Download ${selectedCount} PNG${selectedCount === 1 ? "" : "s"}`}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
