"use client";

import { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ImageDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { captureThumbnailBlob } from "./capture";
import { downloadSingleJob, downloadThumbnailJobs } from "./batch-export";
import {
  buildThumbnailJobs,
  buildSingleThumbnailJob,
  thumbnailZipName,
  type ThumbnailJob,
} from "./types";
import type { InputMode, ThumbnailKind } from "./types";
import { defaultMediaSource, resolveMediaSource, samplesForKind } from "../shader-studio/samples";
import type { MediaSource, Recipe, SavedPalette } from "../shader-studio/types";
import { defaultRecipe, palettes, SAVED_PALETTES_KEY, savedThemeKey } from "../shader-studio/canvas";
import { defaultThemeKey, PalettePanel, resolveThemePalette } from "../shader-studio/palette-panel";

type PreviewCardProps = {
  job: ThumbnailJob;
  generateToken: number;
  onGenerate: () => void;
  onReroll: () => void;
  inputMode: InputMode;
};

function PreviewCard({ job, generateToken, onGenerate, onReroll, inputMode }: PreviewCardProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [busy, setBusy] = useState(false);
  const previewRef = useRef<string | null>(null);
  const lastTokenRef = useRef(0);

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    };
  }, []);

  useEffect(() => {
    if (generateToken === 0 || generateToken === lastTokenRef.current) return;
    let cancelled = false;
    setStatus("loading");
    setPreviewUrl(null);

    const render = async () => {
      try {
        const blob = await captureThumbnailBlob(job.recipe);
        if (cancelled) return;
        if (previewRef.current) URL.revokeObjectURL(previewRef.current);
        const url = URL.createObjectURL(blob);
        previewRef.current = url;
        setPreviewUrl(url);
        setStatus("ready");
        lastTokenRef.current = generateToken;
      } catch (error) {
        console.error(`Thumbnail capture failed for ${job.id}`, error);
        if (!cancelled) setStatus("error");
      }
    };

    void render();
    return () => { cancelled = true; };
  }, [job.recipe, generateToken, job.id]);

  useEffect(() => {
    if (generateToken === 0) {
      if (previewRef.current) {
        URL.revokeObjectURL(previewRef.current);
        previewRef.current = null;
      }
      setPreviewUrl(null);
      setStatus("idle");
      lastTokenRef.current = 0;
    }
  }, [generateToken]);

  const handleDownload = async () => {
    setBusy(true);
    try {
      await downloadSingleJob(job);
    } finally {
      setBusy(false);
    }
  };

  return (
    <article className="thumbnail-card">
      <div className="thumbnail-card-preview">
        {status === "idle" && <div className="thumbnail-card-idle">Click Generate</div>}
        {status === "loading" && <div className="thumbnail-card-skeleton" aria-hidden="true" />}
        {status === "error" && <div className="thumbnail-card-error">Could not render</div>}
        {previewUrl && status === "ready" && (
          <img className="thumbnail-card-image" src={previewUrl} alt="" />
        )}
      </div>
      <div className="thumbnail-card-meta">
        <strong>{job.label}</strong>
        <span>{job.inputLabel}</span>
      </div>
      <div className="thumbnail-card-actions">
        <Button size="sm" variant="secondary" onClick={onGenerate} disabled={status === "loading"}>
          Generate
        </Button>
        <Button size="sm" variant="outline" onClick={handleDownload} disabled={busy || status !== "ready"}>
          Download
        </Button>
        {inputMode === "random" && (
          <Button size="sm" variant="ghost" onClick={onReroll}>
            Re-roll
          </Button>
        )}
      </div>
    </article>
  );
}

const KIND_TABS: { id: ThumbnailKind; label: string }[] = [
  { id: "shader", label: "Shader" },
  { id: "media", label: "Media" },
  { id: "ascii", label: "ASCII" },
];

export function ThumbnailLab() {
  const [kind, setKind] = useState<ThumbnailKind>("shader");
  const [inputMode, setInputMode] = useState<InputMode>("preset");
  const [seed, setSeed] = useState("");
  const [presetPalette, setPresetPalette] = useState<string[]>(() => [...defaultRecipe.palette]);
  const [presetSmoothBlend, setPresetSmoothBlend] = useState(defaultRecipe.smoothBlend);
  const [selectedTheme, setSelectedTheme] = useState(defaultThemeKey);
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>([]);
  const [paletteName, setPaletteName] = useState("");
  const [presetMediaSource, setPresetMediaSource] = useState<MediaSource>(() => defaultMediaSource("media"));
  const [generateAllToken, setGenerateAllToken] = useState(0);
  const [cardTokens, setCardTokens] = useState<Record<string, number>>({});
  const [jobOverrides, setJobOverrides] = useState<Record<string, ThumbnailJob>>({});
  const [zipBusy, setZipBusy] = useState(false);
  const mediaInputRef = useRef<HTMLInputElement>(null);

  const parsedSeed = seed.trim() ? Number(seed) : undefined;
  const seedValue = Number.isFinite(parsedSeed) ? parsedSeed : undefined;

  const buildOptions = useMemo(() => ({
    seed: seedValue,
    preset: inputMode === "preset"
      ? {
          mediaSource: kind === "shader" ? null : presetMediaSource,
          palette: presetPalette,
          smoothBlend: presetSmoothBlend,
        }
      : undefined,
  }), [seedValue, inputMode, presetMediaSource, presetPalette, presetSmoothBlend, kind]);

  const paletteRecipe = useMemo<Recipe>(() => ({
    ...defaultRecipe,
    kind,
    palette: presetPalette,
    smoothBlend: presetSmoothBlend,
    glsl: defaultRecipe.glsl,
  }), [kind, presetPalette, presetSmoothBlend]);

  const jobs = useMemo(() => {
    const base = buildThumbnailJobs(kind, inputMode, buildOptions);
    return base.map((job) => jobOverrides[job.id] ?? job);
  }, [kind, inputMode, buildOptions, jobOverrides]);

  const samples = samplesForKind(kind === "ascii" ? "ascii" : "media");
  const resolvedPresetMedia = resolveMediaSource(presetMediaSource);

  const resetGeneration = useCallback(() => {
    setGenerateAllToken(0);
    setCardTokens({});
  }, []);

  useEffect(() => {
    resetGeneration();
    setJobOverrides({});
  }, [kind, inputMode, seedValue, presetMediaSource, presetPalette, presetSmoothBlend, resetGeneration]);

  useEffect(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem(SAVED_PALETTES_KEY) ?? "[]");
      if (Array.isArray(parsed)) setSavedPalettes(parsed);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(SAVED_PALETTES_KEY, JSON.stringify(savedPalettes));
  }, [savedPalettes]);

  useEffect(() => {
    if (kind === "ascii" && presetMediaSource.type === "sample") {
      const valid = samplesForKind("ascii").some((sample) => sample.id === presetMediaSource.sampleId);
      if (!valid) setPresetMediaSource(defaultMediaSource("ascii"));
    }
  }, [kind, presetMediaSource]);

  const getCardToken = useCallback((jobId: string) => cardTokens[jobId] ?? generateAllToken, [cardTokens, generateAllToken]);

  const generateAll = () => {
    setJobOverrides({});
    setCardTokens({});
    setGenerateAllToken((value) => value + 1);
  };

  const generateCard = (jobId: string) => {
    setCardTokens((current) => ({
      ...current,
      [jobId]: (current[jobId] ?? generateAllToken) + 1,
    }));
  };

  const rerollCard = useCallback((jobId: string) => {
    const next = buildSingleThumbnailJob(kind, jobId, "random", { seed: Date.now() });
    if (!next) return;
    setJobOverrides((current) => ({ ...current, [jobId]: next }));
    setCardTokens((current) => ({
      ...current,
      [jobId]: (current[jobId] ?? generateAllToken) + 1,
    }));
  }, [kind, generateAllToken]);

  const handlePaletteChange = (update: Partial<Recipe>) => {
    if (update.palette) setPresetPalette([...update.palette]);
    if (typeof update.smoothBlend === "boolean") setPresetSmoothBlend(update.smoothBlend);
  };

  const applyTheme = (key: string) => {
    const option = resolveThemePalette(key, savedPalettes);
    if (!option) return;
    setSelectedTheme(option.key);
    setPresetPalette([...option.colors]);
  };

  const randomizePalette = () => {
    setPresetPalette([...palettes[Math.floor(Math.random() * palettes.length)]]);
  };

  const saveCurrentPalette = () => {
    const trimmed = paletteName.trim();
    const colors = [...presetPalette];
    setSavedPalettes((items) => {
      const existing = items.find((item) => item.colors.join() === colors.join());
      if (existing) {
        if (!trimmed) return items;
        return items.map((item) => item.id === existing.id ? { ...item, name: trimmed } : item);
      }
      return [...items, { id: crypto.randomUUID(), name: trimmed, colors }];
    });
    setPaletteName("");
  };

  const deleteSavedPalette = (id: string) => {
    setSavedPalettes((items) => items.filter((item) => item.id !== id));
    setSelectedTheme((current) => (current === savedThemeKey(id) ? defaultThemeKey() : current));
  };

  const pickSample = (sampleId: string) => {
    setPresetMediaSource({ type: "sample", sampleId });
  };

  const uploadMedia = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = String(reader.result ?? "");
      if (!dataUrl) return;
      const mime = file.type.startsWith("video/") ? "video" as const : "image" as const;
      setPresetMediaSource({ type: "upload", dataUrl, mime });
    };
    reader.readAsDataURL(file);
  };

  const handleUploadChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) uploadMedia(file);
    event.target.value = "";
  };

  const downloadZip = async () => {
    setZipBusy(true);
    try {
      await downloadThumbnailJobs(jobs, thumbnailZipName(kind, inputMode));
    } finally {
      setZipBusy(false);
    }
  };

  return (
    <div className="thumbnail-lab">
      <header className="thumbnail-lab-header">
        <div>
          <p className="thumbnail-lab-eyebrow">Internal tool</p>
          <h1>Thumbnail Lab</h1>
          <p className="thumbnail-lab-lead">
            Generate shader, media, and ASCII thumbnail samples with preset or random source input.
          </p>
        </div>
        <a className="thumbnail-lab-back" href="/">← Shader Studio</a>
      </header>

      <section className="thumbnail-lab-controls">
        <div className="thumbnail-lab-tabs" role="tablist" aria-label="Visual kind">
          {KIND_TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={kind === tab.id}
              className={kind === tab.id ? "active" : ""}
              onClick={() => setKind(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="thumbnail-lab-row">
          <fieldset className="thumbnail-lab-toggle">
            <legend>Input</legend>
            <label>
              <input
                type="radio"
                name="input-mode"
                checked={inputMode === "preset"}
                onChange={() => setInputMode("preset")}
              />
              Preset
            </label>
            <label>
              <input
                type="radio"
                name="input-mode"
                checked={inputMode === "random"}
                onChange={() => setInputMode("random")}
              />
              Random
            </label>
          </fieldset>

          {inputMode === "random" && (
            <label className="thumbnail-lab-seed">
              Seed
              <input
                type="number"
                value={seed}
                placeholder="optional"
                onChange={(event) => setSeed(event.target.value)}
              />
            </label>
          )}

          <div className="thumbnail-lab-actions">
            <Button onClick={generateAll}>Generate all</Button>
            <Button variant="secondary" onClick={downloadZip} disabled={zipBusy}>
              {zipBusy ? "Building ZIP…" : "Download ZIP"}
            </Button>
          </div>
        </div>

        {inputMode === "preset" && (
          <div className="thumbnail-lab-preset-block thumbnail-lab-palette-block">
            <div className="thumbnail-lab-preset-heading">
              <span className="section-label">Palette</span>
              <span className="thumbnail-lab-preset-summary">{presetPalette.length} colour stops</span>
            </div>
            <PalettePanel
              embedded
              recipe={paletteRecipe}
              selectedTheme={selectedTheme}
              setSelectedTheme={setSelectedTheme}
              onChange={handlePaletteChange}
              onApplyTheme={applyTheme}
              onRandomize={randomizePalette}
              savedPalettes={savedPalettes}
              paletteName={paletteName}
              setPaletteName={setPaletteName}
              onSavePalette={saveCurrentPalette}
              onDeletePalette={deleteSavedPalette}
            />
          </div>
        )}

        {inputMode === "preset" && (kind === "media" || kind === "ascii") && (
          <div className="thumbnail-lab-preset-block">
            <div className="thumbnail-lab-preset-heading">
              <span className="section-label">Preset media</span>
              <span className="thumbnail-lab-preset-summary">
                {presetMediaSource.type === "sample"
                  ? samples.find((sample) => sample.id === presetMediaSource.sampleId)?.label ?? "Sample"
                  : resolvedPresetMedia?.mediaType === "video" ? "Uploaded video" : "Uploaded image"}
              </span>
            </div>
            <input
              ref={mediaInputRef}
              className="visually-hidden"
              type="file"
              accept="image/*,video/*"
              onChange={handleUploadChange}
            />
            <div className="media-source-row">
              <button type="button" className="media-source-preview" onClick={() => mediaInputRef.current?.click()}>
                {resolvedPresetMedia?.mediaType === "video" ? (
                  <video src={resolvedPresetMedia.url} muted playsInline preload="metadata" />
                ) : resolvedPresetMedia ? (
                  <img src={resolvedPresetMedia.url} alt="" />
                ) : (
                  <span><ImageDown /><small>Upload</small></span>
                )}
              </button>
              <button type="button" className="button wide ghost" onClick={() => mediaInputRef.current?.click()}>
                {resolvedPresetMedia ? "Replace upload" : "Upload media"}
              </button>
            </div>
            <div className="section-label">Samples</div>
            <div className="sample-strip thumbnail-lab-sample-strip">
              {samples.map((sample) => {
                const selected = presetMediaSource.type === "sample" && presetMediaSource.sampleId === sample.id;
                return (
                  <button
                    key={sample.id}
                    type="button"
                    className={`sample-card ${selected ? "selected" : ""}`}
                    onClick={() => pickSample(sample.id)}
                    title={sample.label}
                  >
                    {sample.type === "video"
                      ? <video src={sample.path} muted playsInline preload="metadata" />
                      : <img src={sample.path} alt="" />}
                    <span>{sample.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <p className="thumbnail-lab-hint">
          {inputMode === "preset"
            ? kind === "shader"
              ? "Preset applies your palette across every shader style."
              : "Preset uses the same media source and palette for every thumbnail in this tab."
            : "Random remixes shader surfaces or picks a random sample for media and ASCII."}
          {" "}Thumbnails render only after you click Generate. Checked-in assets:{" "}
          <code>npm run previews</code>, <code>npm run media-previews</code>, <code>npm run ascii-previews</code>.
        </p>
      </section>

      <section className="thumbnail-lab-grid" aria-live="polite">
        {jobs.map((job) => (
          <PreviewCard
            key={job.id}
            job={job}
            generateToken={getCardToken(job.id)}
            onGenerate={() => generateCard(job.id)}
            onReroll={() => rerollCard(job.id)}
            inputMode={inputMode}
          />
        ))}
      </section>
    </div>
  );
}
