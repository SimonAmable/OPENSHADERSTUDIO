"use client";

import { ChangeEvent, ComponentType, CSSProperties, DragEvent, MouseEvent, PointerEvent, ReactNode, RefObject, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ColorPanels, Dithering, DotGrid, DotOrbit, GodRays, GrainGradient, MeshGradient, Metaballs, NeuroNoise, PerlinNoise, PulsingBorder, SimplexNoise, SmokeRing, Spiral, StaticMeshGradient, StaticRadialGradient, Swirl, Voronoi, Warp, Waves } from "@paper-design/shaders-react";
import {
  BookOpen, Check, ChevronDown, CircleHelp, Code2, Copy, CopyPlus, Download, Droplets, Eye, EyeOff,
  Gauge, ImageDown, Layers3, MousePointer2, Palette, Pause, Play, Redo2, RefreshCcw,
  Minus, Pipette, Plus, Save, Scissors, Search, Settings2, Share2, Sparkles, SplitSquareHorizontal, Trash2, Undo2, Video, WandSparkles, X,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { landingPageShaderSystemSkill } from "./landing-page-shader-system-skill";

import type { AnimationClip, CameraGeometry, CameraMode, CameraTool2D, CameraTool3D, ClipClipboard, ClipMenuState, CursorEffect, EditorMode, ExportTab, MockupAspect, MockupBorderStyle, MockupChrome, MockupExportMode, MockupSettings, OutputAspect, Recipe, SavedPalette, Tab, ThemeOption, VideoExportSettings, VisualSection } from "./shader-studio/types";
import { useStudioStore } from "./shader-studio/store";
import { cameraDeltaFromPadDrag, cameraFromNavigatorCenter, emptyCameraGeometry, getCameraFrame, getNavigatorCenter, getPanoramaCameraFrame } from "./shader-studio/geometry";
import { mockupBorderStyles, mockupChromeStyles, outputFrames, videoFormats } from "./shader-studio/constants";
import { loopExportDuration, loopExportFrameCount, loopFrameIndexes, shaderOutputSize, exportPreviewAspect } from "./shader-studio/export-utils";
import { Slider } from "./shader-studio/slider";
export { StaticStylePreview } from "./shader-studio/canvas";

const MIN_CLIP_DURATION = .6;
const MIN_TRAVEL = .12;
/** Budget reserved so inbound travel cannot starve the return-to-base phase (~0.5s minimum on typical clips). */
const EXIT_RESERVE = .5;
const SHARED_SHADER_PARAM = "shader";
const SHARE_VERSION = 1;
const isApplePlatform = typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);
const modKey = isApplePlatform ? "⌘" : "Ctrl";

import { SAVED_PALETTES_KEY, SAVED_RECIPES_KEY, RESUME_RECIPE_KEY, SavedRecipePreview, ShaderCanvas, ShaderThumbnail, StaticStylePreview, appPresets, buildThemeOptions, capitalizeWords, companyThemeKey, companyThemes, defaultRecipe, formatPaperPropsForExport, fragmentShader, hexToRgb, isPaperStyle, mockupPresets, palettes, paperProps, paperShaderNames, paperSpeed, presetGroups, presetSettings, queryPaperShaderMount, queryShaderCanvas, recordCanvasAnimation, savedThemeKey, styleNames, tabs } from "./shader-studio/canvas";

type SharedRecipe = Omit<Recipe, "id" | "glsl"> & { v: typeof SHARE_VERSION };

function encodeSharedRecipe(recipe: Recipe) {
  const { id: _id, glsl: _glsl, ...settings } = recipe;
  const bytes = new TextEncoder().encode(JSON.stringify({ v: SHARE_VERSION, ...settings } satisfies SharedRecipe));
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function decodeSharedRecipe(value: string): Recipe | null {
  try {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = Uint8Array.from(binary, (character) => character.charCodeAt(0));
    const shared = JSON.parse(new TextDecoder().decode(bytes)) as Partial<SharedRecipe>;
    const validCursorEffects: CursorEffect[] = ["push", "repel", "swirl", "ripple", "spotlight"];
    if (
      shared.v !== SHARE_VERSION
      || typeof shared.name !== "string"
      || typeof shared.style !== "number"
      || !Number.isInteger(shared.style)
      || !(shared.style in presetSettings)
      || !Array.isArray(shared.palette)
      || shared.palette.length < 2
      || shared.palette.length > 8
      || !shared.palette.every((color) => typeof color === "string")
      || !validCursorEffects.includes(shared.cursorEffect as CursorEffect)
    ) return null;
    const { v: _version, ...settings } = shared;
    return { ...defaultRecipe, ...settings, id: crypto.randomUUID(), glsl: fragmentShader } as Recipe;
  } catch {
    return null;
  }
}

function SourceSurface({ title, helper, source, onChange, status, footer }: { title: string; helper: string; source: string; onChange?: (source: string) => void; status?: ReactNode; footer?: ReactNode }) {
  return <div className="code-surface"><div className="source-heading"><div><h2>{title}</h2><p className="helper">{helper}</p></div><Code2 /></div><textarea value={source} onChange={(event) => onChange?.(event.target.value)} readOnly={!onChange} spellCheck={false} aria-label={`${title} source editor`} />{status}{footer && <div className="source-actions">{footer}</div>}</div>;
}


function ExportShaderPreview({ recipe, aspect }: { recipe: Recipe; aspect: VideoExportSettings["aspect"] }) {
  return <div className="export-preview" style={{ "--export-preview-aspect": exportPreviewAspect(aspect) } as CSSProperties}><ShaderCanvas recipe={recipe} frozen onError={() => undefined} /></div>;
}

function ExportAspectSelect({ value, onChange }: { value: VideoExportSettings["aspect"]; onChange: (aspect: VideoExportSettings["aspect"]) => void }) {
  return <label>Aspect<select value={value} onChange={(event) => onChange(event.target.value as VideoExportSettings["aspect"])}><option value="16:9">16:9</option><option value="1:1">1:1</option><option value="9:16">9:16</option></select></label>;
}

function ExportResolutionSelect({ value, onChange }: { value: VideoExportSettings["height"]; onChange: (height: VideoExportSettings["height"]) => void }) {
  return <label>Resolution<select value={value} onChange={(event) => onChange(Number(event.target.value) as VideoExportSettings["height"])}><option value={480}>480p</option><option value={720}>720p</option><option value={1080}>1080p</option><option value={1440}>1440p</option></select></label>;
}

function ImageExportPanel({ recipe, settings, onSettingsChange, onExport, description }: { recipe: Recipe; settings: VideoExportSettings; onSettingsChange: (update: Partial<VideoExportSettings>) => void; onExport: () => void; description: string }) {
  const size = shaderOutputSize(settings.aspect, settings.height);
  return <div className="export-image video-export"><ExportShaderPreview recipe={recipe} aspect={settings.aspect} /><div className="video-controls"><ExportAspectSelect value={settings.aspect} onChange={(aspect) => onSettingsChange({ aspect })} /><ExportResolutionSelect value={settings.height} onChange={(height) => onSettingsChange({ height })} /><p className="video-note">{size.width} × {size.height} px · {description}</p><button type="button" className="button primary wide" onClick={onExport}><ImageDown /> Download PNG</button></div></div>;
}

function VideoLoopToggle({ settings, onSettingsChange }: { settings: VideoExportSettings; onSettingsChange: (update: Partial<VideoExportSettings>) => void }) {
  return <div className="loop-row"><div><b>Ping-pong loop</b><span>{settings.loop ? `Forward + reverse · ${loopExportDuration(settings).toFixed(1)} s` : "Export one forward pass"}</span></div><button type="button" className={`switch ${settings.loop ? "on" : ""}`} onClick={() => onSettingsChange({ loop: !settings.loop })} aria-pressed={settings.loop} aria-label="Export as a reverse loop"><i /></button></div>;
}

function FullVideoExportPanel({ recipe, settings, onSettingsChange, onExport, videoProgress }: { recipe: Recipe; settings: VideoExportSettings; onSettingsChange: (update: Partial<VideoExportSettings>) => void; onExport: () => void; videoProgress: number | null }) {
  const size = shaderOutputSize(settings.aspect, settings.height);
  return <div className="video-export"><ExportShaderPreview recipe={recipe} aspect={settings.aspect} /><div className="video-controls"><ExportAspectSelect value={settings.aspect} onChange={(aspect) => onSettingsChange({ aspect })} /><label>Format<select value={settings.mimeType} onChange={(event) => onSettingsChange({ mimeType: event.target.value })}>{videoFormats.map((format) => <option key={format.value} value={format.value} disabled={typeof MediaRecorder !== "undefined" && !MediaRecorder.isTypeSupported(format.value)}>{format.label}{typeof MediaRecorder !== "undefined" && !MediaRecorder.isTypeSupported(format.value) ? " — unavailable" : ""}</option>)}</select></label><ExportResolutionSelect value={settings.height} onChange={(height) => onSettingsChange({ height })} /><label>Frame rate<select value={settings.fps} onChange={(event) => onSettingsChange({ fps: Number(event.target.value) as VideoExportSettings["fps"] })}><option value={24}>24 fps</option><option value={30}>30 fps</option><option value={60}>60 fps</option></select></label><label className="video-duration">Duration<select value={settings.duration} onChange={(event) => onSettingsChange({ duration: Number(event.target.value) as VideoExportSettings["duration"] })}><option value={2}>2 s</option><option value={3}>3 s</option><option value={5}>5 s</option><option value={8}>8 s</option></select></label><VideoLoopToggle settings={settings} onSettingsChange={onSettingsChange} /><p className="video-note">{size.width} × {size.height} px · {loopExportFrameCount(settings)} exact frames. Cursor interactions are excluded from exports.</p><button type="button" className="button primary wide" onClick={onExport} disabled={videoProgress !== null}><Video /> {videoProgress === null ? "Export video" : `Rendering ${Math.round(videoProgress * 100)}%`}</button></div></div>;
}

function CompactVideoExportPanel({ recipe, settings, onSettingsChange, onExport, videoProgress }: { recipe: Recipe; settings: VideoExportSettings; onSettingsChange: (update: Partial<VideoExportSettings>) => void; onExport: () => void; videoProgress: number | null }) {
  return <div className="video-export"><ExportShaderPreview recipe={recipe} aspect={settings.aspect} /><div className="video-controls"><ExportAspectSelect value={settings.aspect} onChange={(aspect) => onSettingsChange({ aspect })} /><ExportResolutionSelect value={settings.height} onChange={(height) => onSettingsChange({ height })} /><label className="video-duration">Duration<select value={settings.duration} onChange={(event) => onSettingsChange({ duration: Number(event.target.value) as VideoExportSettings["duration"] })}><option value={2}>2 s</option><option value={3}>3 s</option><option value={5}>5 s</option><option value={8}>8 s</option></select></label><VideoLoopToggle settings={settings} onSettingsChange={onSettingsChange} /><button type="button" className="button primary wide" onClick={onExport} disabled={videoProgress !== null}><Video /> {videoProgress === null ? "Export video" : `Rendering ${Math.round(videoProgress * 100)}%`}</button></div></div>;
}

function hexToHsv(hex: string) { const [r, g, b] = hexToRgb(hex); const max = Math.max(r, g, b); const min = Math.min(r, g, b); const delta = max - min; const hue = delta === 0 ? 0 : max === r ? 60 * (((g - b) / delta) % 6) : max === g ? 60 * ((b - r) / delta + 2) : 60 * ((r - g) / delta + 4); return { h: (hue + 360) % 360, s: max === 0 ? 0 : delta / max, v: max }; }
function hsvToHex(h: number, s: number, v: number) { const c = v * s; const x = c * (1 - Math.abs((h / 60) % 2 - 1)); const m = v - c; const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x]; return `#${[r, g, b].map((value) => Math.round((value + m) * 255).toString(16).padStart(2, "0")).join("")}`; }

function ShadcnColorPicker({ color, onChange }: { color: string; onChange: (color: string) => void }) {
  const [open, setOpen] = useState(false);
  const [hexInput, setHexInput] = useState(color.toUpperCase());
  const rootRef = useRef<HTMLDivElement>(null);
  const hsv = hexToHsv(color);
  const inputId = useId();
  const update = (next: Partial<typeof hsv>) => onChange(hsvToHex(next.h ?? hsv.h, next.s ?? hsv.s, next.v ?? hsv.v));

  useEffect(() => setHexInput(color.toUpperCase()), [color]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const pick = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    update({
      s: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
      v: 1 - Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)),
    });
  };

  const startPick = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pick(event);
  };

  const sampleScreenColour = async () => {
    const EyeDropper = (window as typeof window & { EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper;
    if (!EyeDropper) return;
    try { onChange((await new EyeDropper().open()).sRGBHex); } catch { /* cancelled */ }
  };

  const canSampleScreen = typeof window !== "undefined" && "EyeDropper" in window;
  const closePicker = () => setOpen(false);

  return (
    <div className="shadcn-colour-picker" ref={rootRef}>
      <button
        type="button"
        className={`colour-picker-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-label={`Edit ${color}`}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <i style={{ background: color }} />
        <span>{color.toUpperCase()}</span>
        <ChevronDown />
      </button>
      {open && (
        <div
          className="colour-picker-popover"
          role="dialog"
          aria-label="Colour picker"
          onKeyDown={(event) => event.key === "Escape" && closePicker()}
        >
          <button type="button" className="colour-picker-close" onClick={closePicker} aria-label="Close colour picker">
            <X />
          </button>
          <div
            className="colour-sv"
            style={{ backgroundColor: `hsl(${hsv.h} 100% 50%)` }}
            onPointerDown={startPick}
            onPointerMove={(event) => event.buttons === 1 && pick(event)}
          >
            <i style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, background: color }} />
          </div>
          <input
            id={inputId}
            className="colour-hue"
            aria-label="Hue"
            type="range"
            min="0"
            max="360"
            value={Math.round(hsv.h)}
            onChange={(event) => update({ h: Number(event.target.value) })}
          />
          <div className="colour-picker-footer">
            <label className="colour-hex" htmlFor={`${inputId}-hex`}>
              <span style={{ background: color }} aria-hidden="true" />
              <input
                id={`${inputId}-hex`}
                value={hexInput}
                onChange={(event) => {
                  const next = event.target.value.toUpperCase();
                  setHexInput(next);
                  if (/^#[0-9A-F]{6}$/.test(next)) onChange(next);
                }}
                onBlur={() => setHexInput(color.toUpperCase())}
                aria-label="Hex colour"
                spellCheck={false}
              />
            </label>
            <button
              type="button"
              className="colour-eyedropper"
              onClick={sampleScreenColour}
              disabled={!canSampleScreen}
              title={canSampleScreen ? "Pick a colour from the screen" : "Screen colour picking is not available in this browser"}
              aria-label="Pick a colour from the screen"
            >
              <Pipette />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PalettePreview({ colors, className = "" }: { colors: string[]; className?: string }) {
  return (
    <span className={`palette-preview ${className}`.trim()} aria-hidden="true">
      {colors.map((color, index) => <i key={`${color}-${index}`} style={{ background: color }} />)}
    </span>
  );
}

function ThemePaletteSelect({ value, options, onChange, onDelete }: { value: string; options: ThemeOption[]; onChange: (key: string) => void; onDelete: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.key === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={`theme-palette-select ${open ? "open" : ""}`} ref={rootRef}>
      <button
        type="button"
        className="theme-palette-trigger"
        aria-label="From a theme"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
      >
        {selected && <PalettePreview colors={selected.colors} />}
        <span>{selected?.name ?? "Select theme"}</span>
        <ChevronDown />
      </button>
      {open && (
        <div className="theme-palette-menu" role="listbox" aria-label="Theme palettes">
          {options.map((option) => (
            <div className={`theme-palette-option ${option.key === selected?.key ? "selected" : ""}`} key={option.key}>
              <button
                type="button"
                role="option"
                aria-selected={option.key === selected?.key}
                onClick={() => {
                  onChange(option.key);
                  setOpen(false);
                }}
              >
                <PalettePreview colors={option.colors} />
                <span>{option.name}</span>
              </button>
              {option.deletable && (
                <button
                  type="button"
                  className="theme-palette-delete"
                  aria-label={`Delete ${option.name}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    const id = option.key.replace(/^saved:/, "");
                    onDelete(id);
                  }}
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PalettePanel({ recipe, embedded = false, selectedTheme, setSelectedTheme, onChange, onApplyTheme, onRandomize, savedPalettes, paletteName, setPaletteName, onSavePalette, onDeletePalette }: { recipe: Recipe; embedded?: boolean; selectedTheme: string; setSelectedTheme: (key: string) => void; onChange: (update: Partial<Recipe>) => void; onApplyTheme: (key: string) => void; onRandomize: () => void; savedPalettes: SavedPalette[]; paletteName: string; setPaletteName: (name: string) => void; onSavePalette: () => void; onDeletePalette: (id: string) => void }) {
  const applyPalette = (palette: string[]) => onChange({ palette: [...palette] });
  const themeOptions = useMemo(() => buildThemeOptions(savedPalettes), [savedPalettes]);
  const unnamedPalettes = useMemo(() => savedPalettes.filter((item) => !item.name.trim()), [savedPalettes]);

  return (
    <div className="panel-content palette-panel">
      <div className="palette-panel-heading">
        <div>{!embedded && <><h2>Colours</h2><p className="helper">Build a gradient with up to eight colour stops.</p></>}</div>
        <span>{recipe.palette.length}/8</span>
      </div>
      <div className="stops">
        {recipe.palette.map((color, index) => (
          <div className="color-stop" key={`palette-stop-${index}`}>
            <ShadcnColorPicker
              color={color}
              onChange={(nextColor) => {
                const palette = [...recipe.palette];
                palette[index] = nextColor;
                onChange({ palette });
              }}
            />
            <b>{index === 0 ? "BASE" : `STOP ${index}`}</b>
            <span>{index === recipe.palette.length - 1 ? "Highlight" : "Gradient"}</span>
            <button
              className="remove-colour"
              type="button"
              disabled={recipe.palette.length <= 2}
              aria-label={`Remove stop ${index}`}
              onClick={() => onChange({ palette: recipe.palette.filter((_, itemIndex) => itemIndex !== index) })}
            >
              <Minus />
            </button>
          </div>
        ))}
      </div>
      <button
        className="add-colour"
        disabled={recipe.palette.length >= 8}
        onClick={() => applyPalette([...recipe.palette, recipe.palette.at(-1) || "#ffffff"])}
      >
        <Plus /> {recipe.palette.length >= 8 ? "Maximum of 8 colours" : "Add colour stop"}
      </button>
      <div className="save-palette-row">
        <input
          value={paletteName}
          maxLength={36}
          onChange={(event) => setPaletteName(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && onSavePalette()}
          placeholder="Name (optional)"
          aria-label="Palette name"
        />
        <button className="button primary" type="button" onClick={onSavePalette}>
          <Save /> Save
        </button>
      </div>
      <div className="switch-row">
        <span>Smooth blend (OKLab)</span>
        <button className={`switch ${recipe.smoothBlend ? "on" : ""}`} onClick={() => onChange({ smoothBlend: !recipe.smoothBlend })} aria-pressed={recipe.smoothBlend}><i /></button>
      </div>
      <div className="section-label">From a theme</div>
      <div className="theme-picker">
        <ThemePaletteSelect value={selectedTheme} options={themeOptions} onChange={setSelectedTheme} onDelete={onDeletePalette} />
        <button className="button primary" type="button" onClick={() => onApplyTheme(selectedTheme)}>
          <Palette /> Apply theme
        </button>
      </div>
      <button className="button wide ghost palette-randomize" type="button" onClick={onRandomize}>
        <Sparkles /> Randomize palette
      </button>
      <div className="section-label palette-label">Curated palettes</div>
      <div className="palette-grid">
        {unnamedPalettes.map((item) => (
          <div className="palette-swatch-wrap" key={item.id}>
            <button
              type="button"
              onClick={() => applyPalette(item.colors)}
              className={`palette-swatch ${recipe.palette.join() === item.colors.join() ? "selected" : ""}`}
              aria-label="Apply saved palette"
            >
              {item.colors.map((color, index) => <i key={`${item.id}-${color}-${index}`} style={{ background: color }} />)}
            </button>
            <button type="button" className="palette-swatch-delete" aria-label="Delete saved palette" onClick={() => onDeletePalette(item.id)}>
              <X />
            </button>
          </div>
        ))}
        {palettes.map((palette, index) => (
          <button
            key={index}
            type="button"
            onClick={() => applyPalette(palette)}
            className={`palette-swatch ${recipe.palette.join() === palette.join() ? "selected" : ""}`}
          >
            {palette.map((color) => <i key={color} style={{ background: color }} />)}
          </button>
        ))}
      </div>
    </div>
  );
}

function VisualsSectionHeader({ label, summary, icon: Icon, preview, active, onSelect }: { label: string; summary: string; icon: ComponentType<{ size?: number; strokeWidth?: number }>; preview?: ReactNode; active?: boolean; onSelect: () => void }) {
  return (
    <button type="button" className={`bg-accordion-trigger ${active ? "active" : ""}`} onClick={onSelect} aria-expanded={active ?? false}>
      <span className="bg-accordion-icon"><Icon size={15} strokeWidth={1.8} /></span>
      <span className="bg-accordion-copy"><strong>{label}</strong><span className="bg-accordion-summary">{summary}</span></span>
      {preview && <span className="bg-accordion-preview">{preview}</span>}
      <ChevronDown className="bg-accordion-chevron" aria-hidden="true" />
    </button>
  );
}

function VisualsPanel({
  recipe,
  activeLabel,
  selectedTheme,
  setSelectedTheme,
  onChange,
  onApplyTheme,
  onRandomize,
  savedPalettes,
  paletteName,
  setPaletteName,
  onSavePalette,
  onDeletePalette,
  onSelectPreset,
}: {
  recipe: Recipe;
  activeLabel: string;
  selectedTheme: string;
  setSelectedTheme: (key: string) => void;
  onChange: (update: Partial<Recipe>) => void;
  onApplyTheme: (key: string) => void;
  onRandomize: () => void;
  savedPalettes: SavedPalette[];
  paletteName: string;
  setPaletteName: (name: string) => void;
  onSavePalette: () => void;
  onDeletePalette: (id: string) => void;
  onSelectPreset: (name: string, style: number) => void;
}) {
  const [openSection, setOpenSection] = useState<VisualSection>("style");
  const itemRefs = useRef<Partial<Record<VisualSection, HTMLDivElement | null>>>({});
  const scrollRefs = useRef<Partial<Record<VisualSection, HTMLDivElement | null>>>({});

  const openSectionAt = (id: VisualSection) => {
    if (id === openSection) {
      const scroller = scrollRefs.current[id];
      if (scroller) scroller.scrollTop = 0;
      return;
    }
    setOpenSection(id);
    requestAnimationFrame(() => {
      const scroller = scrollRefs.current[id];
      if (scroller) scroller.scrollTop = 0;
    });
  };

  const surfaceSummary = `Intensity ${Math.round(recipe.intensity * 100)}% · Grain ${Math.round(recipe.grain / .12 * 100)}%`;
  const motionSummary = recipe.animate ? `On · ${recipe.speed.toFixed(1)}× speed` : "Static";
  const cursorSummary = recipe.cursorEnabled ? recipe.cursorEffect : "Off";

  const sections: { id: VisualSection; label: string; icon: ComponentType<{ size?: number; strokeWidth?: number }>; summary: string; preview?: ReactNode }[] = [
    { id: "style", label: "Style", icon: WandSparkles, summary: activeLabel, preview: <span className="style-chip"><ShaderThumbnail style={recipe.style} /></span> },
    { id: "surface", label: "Surface", icon: Layers3, summary: surfaceSummary },
    { id: "palette", label: "Palette", icon: Palette, summary: `${recipe.palette.length} stops · ${recipe.smoothBlend ? "Smooth blend" : "Linear blend"}`, preview: <>{recipe.palette.slice(0, 4).map((color) => <i key={color} className="palette-chip" style={{ background: color }} />)}</> },
    { id: "motion", label: "Motion", icon: Gauge, summary: motionSummary },
    { id: "cursor", label: "Cursor", icon: MousePointer2, summary: cursorSummary },
  ];

  const renderSectionContent = (section: VisualSection) => {
    switch (section) {
      case "style":
        return (
          <div className="panel-content">
            <p className="helper">Choose the shader engine. Palette and tuning settings stay with your look.</p>
            {presetGroups.map((group) => (
              <section className="preset-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="preset-grid">{group.items.map(([name, style]) => (
                  <button key={name} type="button" onClick={() => onSelectPreset(name, style)} className={`preset-card ${recipe.style === style ? "selected" : ""}`}>
                    <ShaderThumbnail style={style} />
                    <span>{name}</span>
                  </button>
                ))}</div>
              </section>
            ))}
          </div>
        );
      case "palette":
        return <PalettePanel recipe={recipe} embedded selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} onChange={onChange} onApplyTheme={onApplyTheme} onRandomize={onRandomize} savedPalettes={savedPalettes} paletteName={paletteName} setPaletteName={setPaletteName} onSavePalette={onSavePalette} onDeletePalette={onDeletePalette} />;
      case "surface":
        return (
          <div className="panel-content">
            <p className="helper">Depth, texture, framing, and focus across the shader field.</p>
            <Slider label="Intensity" value={recipe.intensity} onChange={(intensity) => onChange({ intensity })} />
            <Slider label="Zoom" value={recipe.zoom} min={.5} max={2} unit="×" onChange={(zoom) => onChange({ zoom })} />
            <Slider label="Warp" value={recipe.warp} onChange={(warp) => onChange({ warp })} />
            <Slider label="Contrast" value={recipe.contrast} onChange={(contrast) => onChange({ contrast })} />
            <Slider label="Grain" value={recipe.grain} max={.12} onChange={(grain) => onChange({ grain })} />
            <Slider label="Blur" value={recipe.blur ?? 0} max={20} step={.25} unit="px" onChange={(blur) => onChange({ blur })} />
            <section className="control-section">
              <h3>Frame</h3>
              <Slider label="Rotate" value={recipe.rotate} min={-3.14} max={3.14} step={.01} unit=" rad" onChange={(rotate) => onChange({ rotate })} />
              <Slider label="Offset X" value={recipe.offsetX} min={-1} max={1} onChange={(offsetX) => onChange({ offsetX })} />
              <Slider label="Offset Y" value={recipe.offsetY} min={-1} max={1} onChange={(offsetY) => onChange({ offsetY })} />
            </section>
            <section className="control-section">
              <h3>Character</h3>
              <div className="button-pair">
                <button className="button ghost" type="button" onClick={() => onChange({ seed: Math.floor(Math.random() * 100000) })}><WandSparkles /> Reseed</button>
                <button className="button ghost" type="button" onClick={() => onChange({ intensity: defaultRecipe.intensity, zoom: defaultRecipe.zoom, warp: defaultRecipe.warp, contrast: defaultRecipe.contrast, seed: defaultRecipe.seed })}><RefreshCcw /> Reset</button>
              </div>
            </section>
          </div>
        );
      case "motion":
        return (
          <div className="panel-content">
            <div className="switch-row"><span>Animate</span><button type="button" className={`switch ${recipe.animate ? "on" : ""}`} onClick={() => onChange({ animate: !recipe.animate })} aria-pressed={recipe.animate}><i /></button></div>
            <Slider label="Speed" value={recipe.speed} min={0} max={3} unit="×" onChange={(speed) => onChange({ speed })} />
            <Slider label="Drift" value={recipe.drift} onChange={(drift) => onChange({ drift })} />
            <div className="switch-row"><span>Reverse</span><button type="button" className={`switch ${recipe.reverse ? "on" : ""}`} onClick={() => onChange({ reverse: !recipe.reverse })} aria-pressed={recipe.reverse}><i /></button></div>
            <p className="helper">Drift controls how far the whole field wanders.</p>
          </div>
        );
      case "cursor":
        return (
          <div className="panel-content">
            {isPaperStyle(recipe.style) && <p className="helper">Paper Design shaders respond through offset and rotation — mapped to each component&apos;s transform props.</p>}
            <div className="switch-row"><span>React to cursor</span><button type="button" className={`switch ${recipe.cursorEnabled ? "on" : ""}`} onClick={() => onChange({ cursorEnabled: !recipe.cursorEnabled })} aria-pressed={recipe.cursorEnabled}><i /></button></div>
            <div className="section-label">Effect</div>
            <div className="effect-grid">{(["push", "repel", "swirl", "ripple", "spotlight"] as CursorEffect[]).map((effect) => (
              <button key={effect} type="button" className={recipe.cursorEffect === effect ? "selected" : ""} onClick={() => onChange({ cursorEffect: effect })}>{effect}</button>
            ))}</div>
            <Slider label="Strength" value={recipe.cursorStrength} onChange={(cursorStrength) => onChange({ cursorStrength })} />
            <Slider label="Radius" value={recipe.cursorRadius} min={.15} max={1} onChange={(cursorRadius) => onChange({ cursorRadius })} />
            <p className="helper">{recipe.cursorEffect === "swirl" ? "Twists the pattern around the pointer." : "Moves the shader field with the pointer."}</p>
            <button type="button" className="button wide ghost" onClick={() => onChange({ cursorStrength: defaultRecipe.cursorStrength, cursorRadius: defaultRecipe.cursorRadius })}><RefreshCcw /> Reset cursor</button>
          </div>
        );
      default: {
        const unhandled: never = section;
        return unhandled;
      }
    }
  };

  return (
    <div className="visuals-panel">
      <div className="panel-content visuals-intro">
        <h2>Visuals</h2>
        <p className="helper">Edit Shader Style, colour, surface, motion, and interaction live.</p>
      </div>

      <div className="visuals-accordion" role="tablist" aria-label="Visual sections">
        {sections.map((section) => {
          const isOpen = section.id === openSection;
          return (
            <div
              key={section.id}
              ref={(node) => { itemRefs.current[section.id] = node; }}
              className={`bg-accordion ${isOpen ? "open" : "collapsed"}`}
            >
              <VisualsSectionHeader
                label={section.label}
                summary={section.summary}
                icon={section.icon}
                preview={section.preview}
                active={isOpen}
                onSelect={() => openSectionAt(section.id)}
              />
              <div className="visuals-accordion-body">
                <div
                  ref={(node) => { scrollRefs.current[section.id] = node; }}
                  className="visuals-accordion-scroll scroll-fade scroll-fade-y scroll-fade-6 no-scrollbar"
                >
                  {isOpen && (
                    <motion.div
                      key={section.id}
                      className="visuals-accordion-content"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {renderSectionContent(section.id)}
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


import { CameraPadScene, CameraPresetPreview, RightCameraInspector } from "./shader-studio/camera-inspector";
export function ShaderStudio() {
  const [recipe, setRecipe] = useState<Recipe>(defaultRecipe);
  const [tab, setTab] = useState<Tab>("visuals");
  const [frozen, setFrozen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [history, setHistory] = useState<Recipe[]>([]);
  const [future, setFuture] = useState<Recipe[]>([]);
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveName, setSaveName] = useState(defaultRecipe.name);
  const [presetSearch, setPresetSearch] = useState("");
  const [exportOpen, setExportOpen] = useState(false);
  const [mockupExportOpen, setMockupExportOpen] = useState(false);
  const [exportTab, setExportTab] = useState<ExportTab>("image");
  const [mockupExportMode, setMockupExportMode] = useState<MockupExportMode>("image");
  const [mockupImageHeight, setMockupImageHeight] = useState<720 | 1080 | 1440 | 2160>(1080);
  const [videoSettings, setVideoSettings] = useState<VideoExportSettings>({ aspect: "16:9", height: 720, fps: 30, duration: 3, loop: false, mimeType: "video/webm;codecs=vp9" });
  const [videoProgress, setVideoProgress] = useState<number | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>(companyThemeKey(companyThemes[0].name));
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>([]);
  const [paletteName, setPaletteName] = useState("");
  const [mockup, setMockup] = useState<MockupSettings>({ media: null, mediaType: null, chrome: "none", borderStyle: "glass", radius: 20, shadow: 40, scale: .45, x: 0, y: 0, cameraX: 0, cameraY: 0, tiltX: 0, tiltY: 0, rotate: 0, flipX: false, flipY: false, visible: true });
  const [cameraMode, setCameraMode] = useState<CameraMode>("zoom");
  const [cameraTool2D, setCameraTool2D] = useState<CameraTool2D>("camera");
  const [cameraTool3D, setCameraTool3D] = useState<CameraTool3D>("camera");
  const [mockupAspect, setMockupAspect] = useState<MockupAspect>("auto");
  const [outputAspect, setOutputAspect] = useState<OutputAspect>("16:9");
  const [editorMode, setEditorMode] = useState<EditorMode>("mockup");
  const [basePresetId, setBasePresetId] = useState<string | null>("custom");
  const [focusPresetId, setFocusPresetId] = useState("float");
  const [animationDuration, setAnimationDuration] = useState(3.8);
  const [animationTransition, setAnimationTransition] = useState(1.5);
  const [animationEasing, setAnimationEasing] = useState<AnimationClip["easing"]>("spring");
  const [animationHold, setAnimationHold] = useState(.8);
  const [springSpeed, setSpringSpeed] = useState(1.6);
  const [focusZoom, setFocusZoom] = useState(1);
  const [focusTilt, setFocusTilt] = useState(0);
  const [precisionOpen, setPrecisionOpen] = useState(false);
  const [motionPreview, setMotionPreview] = useState<"base" | "focus">("base");
  const [animationClips, setAnimationClips] = useState<AnimationClip[]>([]);
  const [activeClipId, setActiveClipId] = useState<string | null>(null);
  const [clipClipboard, setClipClipboard] = useState<ClipClipboard | null>(null);
  const [clipMenu, setClipMenu] = useState<ClipMenuState | null>(null);
  const [playhead, setPlayhead] = useState(0);
  const [isTimelinePlaying, setIsTimelinePlaying] = useState(false);
  const clipGesture = useRef<{ id: string; kind: "move" | "resize"; x: number; start: number; duration: number } | null>(null);
  const animationTrackRef = useRef<HTMLDivElement>(null);
  const mockupViewportRef = useRef<HTMLDivElement>(null);
  const mockupStageRef = useRef<HTMLDivElement>(null);
  const cameraPadRef = useRef<HTMLDivElement>(null);
  const cameraPadDrag = useRef<{ pointerId: number; startClientX: number; startClientY: number; startCameraX: number; startCameraY: number } | null>(null);
  const [cameraGeometry, setCameraGeometry] = useState<CameraGeometry>(emptyCameraGeometry);
  const [navigatorHoverCenter, setNavigatorHoverCenter] = useState<{ x: number; y: number } | null>(null);
  const [skillOpen, setSkillOpen] = useState(false);
  const [alignmentGridVisible, setAlignmentGridVisible] = useState(false);
  const playheadRef = useRef(0);
  const baseDuration = 8;
  const mediaInput = useRef<HTMLInputElement>(null);
  const saved = useStudioStore((state) => state.saved);
  const saveRecipe = useStudioStore((state) => state.save);
  const hasRestoredRecipe = useRef(false);
  const hasRestoredPalettes = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--mockup-preview-media", mockup.mediaType === "image" && mockup.media ? `url("${mockup.media}")` : "none");
    return () => { root.style.removeProperty("--mockup-preview-media"); };
  }, [mockup.media, mockup.mediaType, mockup.rotate, mockup.scale, mockup.tiltX, mockup.tiltY]);
  useEffect(() => { const stage = document.querySelector<HTMLElement>(".mockup-stage"); if (stage) stage.style.aspectRatio = mockupAspect === "auto" ? "" : mockupAspect; }, [mockupAspect]);
  useEffect(() => {
    if (tab !== "mockup") return;
    const viewport = document.querySelector<HTMLElement>(".mockup-viewport");
    if (!viewport) return;
    const syncCameraAspect = () => {
      if (viewport.clientWidth && viewport.clientHeight) document.documentElement.style.setProperty("--camera-view-aspect", `${viewport.clientWidth / viewport.clientHeight}`);
    };
    syncCameraAspect();
    const observer = new ResizeObserver(syncCameraAspect);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [tab, editorMode]);
  useEffect(() => {
    const [width, height] = outputAspect.split(":").map(Number);
    const root = document.documentElement;
    const update = () => {
      const availableHeight = Math.max(280, window.innerHeight - (editorMode === "animation" ? 248 : 82));
      root.style.setProperty("--output-aspect", `${width} / ${height}`);
      root.style.setProperty("--output-artboard-max-width", `${Math.round(availableHeight * width / height)}px`);
    };
    update();
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("resize", update); root.style.removeProperty("--output-aspect"); root.style.removeProperty("--output-artboard-max-width"); };
  }, [editorMode, outputAspect]);
  useEffect(() => {
    if (!cameraGeometry.viewportWidth || !cameraGeometry.viewportHeight || !cameraGeometry.stageWidth || !cameraGeometry.stageHeight) return;
    const frame = getCameraFrame(mockup, cameraGeometry);
    const root = document.documentElement;
    const panX = -mockup.cameraX / 50 * frame.panLimitX / cameraGeometry.viewportWidth * 100;
    const panY = -mockup.cameraY / 50 * frame.panLimitY / cameraGeometry.viewportHeight * 100;
    root.style.setProperty("--export-stage-width", `${cameraGeometry.stageWidth / cameraGeometry.viewportWidth * 100}%`);
    root.style.setProperty("--export-stage-aspect", `${cameraGeometry.stageWidth / cameraGeometry.stageHeight}`);
    root.style.setProperty("--export-layout-x", `${mockup.x}%`);
    root.style.setProperty("--export-layout-y", `${mockup.y}%`);
    root.style.setProperty("--export-pan-x", `${panX}%`);
    root.style.setProperty("--export-pan-y", `${panY}%`);
    root.style.setProperty("--export-camera-scale", String(frame.renderScale));
    root.style.setProperty("--export-camera-rotate", `${mockup.rotate}deg`);
    return () => ["--export-stage-width", "--export-stage-aspect", "--export-layout-x", "--export-layout-y", "--export-pan-x", "--export-pan-y", "--export-camera-scale", "--export-camera-rotate"].forEach((name) => root.style.removeProperty(name));
  }, [cameraGeometry, mockup]);
  useEffect(() => {
    if (tab !== "mockup") return;
    const viewport = mockupViewportRef.current;
    const stage = mockupStageRef.current;
    const pad = cameraPadRef.current;
    if (!viewport || !stage || !pad) return;
    const update = () => setCameraGeometry({
      viewportWidth: viewport.clientWidth,
      viewportHeight: viewport.clientHeight,
      stageWidth: stage.offsetWidth,
      stageHeight: stage.offsetHeight,
      padWidth: pad.clientWidth,
      padHeight: pad.clientHeight,
    });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(viewport); observer.observe(stage); observer.observe(pad);
    return () => observer.disconnect();
  }, [tab, editorMode, mockup.media, mockup.chrome, mockup.borderStyle, mockupAspect]);
  useEffect(() => {
    const setGrid = (visible: boolean) => setAlignmentGridVisible(visible);
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Shift") setGrid(true); };
    const onKeyUp = (event: KeyboardEvent) => { if (event.key === "Shift") setGrid(false); };
    const clearGrid = () => setGrid(false);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", clearGrid);
    return () => { window.removeEventListener("keydown", onKeyDown); window.removeEventListener("keyup", onKeyUp); window.removeEventListener("blur", clearGrid); };
  }, []);
  useEffect(() => {
    if (!exportOpen || editorMode !== "animation") return;
    setExportOpen(false);
    setExportTab("mockup");
    setMockupExportOpen(true);
  }, [exportOpen, editorMode]);
  useEffect(() => {
    const hasMockupExport = mockup.visible && Boolean(mockup.media);
    if (mockupExportOpen && exportTab === "mockup" && !hasMockupExport) setExportTab("image");
    document.querySelectorAll<HTMLButtonElement>(".export-tabs button").forEach((button) => {
      if (button.textContent === "Mockup") button.disabled = !hasMockupExport;
    });
  }, [exportTab, mockup.media, mockup.visible, mockupExportOpen]);
  useEffect(() => {
    if (!isTimelinePlaying) return;
    const startedAt = performance.now() - playheadRef.current * 1000;
    let frame = 0;
    const tick = (now: number) => {
      const next = Math.min(baseDuration, (now - startedAt) / 1000);
      playheadRef.current = next;
      setPlayhead(next);
      if (next >= baseDuration) { setIsTimelinePlaying(false); return; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isTimelinePlaying]);
  useEffect(() => {
    let localRecipes: Recipe[] = [];
    try {
      const parsed = JSON.parse(localStorage.getItem(SAVED_RECIPES_KEY) ?? "[]");
      if (Array.isArray(parsed)) localRecipes = parsed.filter((item): item is Recipe => Boolean(item?.id && item?.name && typeof item.style === "number"));
    } catch {}
    localRecipes.forEach(saveRecipe);

    const sharedRecipe = decodeSharedRecipe(new URLSearchParams(window.location.search).get(SHARED_SHADER_PARAM) ?? "");
    if (sharedRecipe) {
      setRecipe(sharedRecipe);
      toast("Shared shader loaded");
    } else try {
      const resumeRecipe = JSON.parse(localStorage.getItem(RESUME_RECIPE_KEY) ?? "null");
      if (resumeRecipe?.id && resumeRecipe?.name && typeof resumeRecipe.style === "number") setRecipe(resumeRecipe as Recipe);
      else setRecipe(appPresets[0] ?? localRecipes[0] ?? defaultRecipe);
    } catch {
      setRecipe(appPresets[0] ?? localRecipes[0] ?? defaultRecipe);
    }
    hasRestoredRecipe.current = true;
  }, [saveRecipe]);
  useEffect(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem(SAVED_PALETTES_KEY) ?? "[]");
      if (Array.isArray(parsed)) {
        setSavedPalettes(parsed.filter((item): item is SavedPalette => Boolean(
          item?.id
          && typeof item?.name === "string"
          && Array.isArray(item.colors)
          && item.colors.length > 0
          && item.colors.length <= 8,
        )));
      }
    } catch {}
    hasRestoredPalettes.current = true;
  }, []);
  useEffect(() => { localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(saved)); }, [saved]);
  useEffect(() => { if (hasRestoredPalettes.current) localStorage.setItem(SAVED_PALETTES_KEY, JSON.stringify(savedPalettes)); }, [savedPalettes]);
  useEffect(() => {
    if (hasRestoredRecipe.current) localStorage.setItem(RESUME_RECIPE_KEY, JSON.stringify(recipe));
  }, [recipe]);
  const change = useCallback((update: Partial<Recipe>) => { setHistory((items) => [...items, recipe].slice(-50)); setFuture([]); setRecipe((current) => ({ ...current, ...update })); }, [recipe]);
  const undo = () => { const previous = history.at(-1); if (!previous) return; setFuture((items) => [recipe, ...items]); setHistory((items) => items.slice(0, -1)); setRecipe(previous); };
  const redo = () => { const next = future[0]; if (!next) return; setHistory((items) => [...items, recipe]); setFuture((items) => items.slice(1)); setRecipe(next); };
  const reset = () => { setHistory((items) => [...items, recipe]); setRecipe(defaultRecipe); setFuture([]); };
  const selectPreset = (name: string, style: number) => {
    setHistory((items) => [...items, recipe].slice(-50));
    setFuture([]);
    // Style selection swaps the visual engine only. Your palette, surface,
    // motion, frame, and interaction choices remain part of the same look.
    setRecipe((current) => ({ ...current, name, style, glsl: fragmentShader }));
  };
  const resetCharacter = () => { const settings = presetSettings[recipe.style] ?? defaultRecipe; change({ intensity: settings.intensity ?? defaultRecipe.intensity, zoom: settings.zoom ?? defaultRecipe.zoom, warp: settings.warp ?? defaultRecipe.warp, contrast: settings.contrast ?? defaultRecipe.contrast, seed: defaultRecipe.seed }); };
  const recolour = () => change({ palette: palettes[Math.floor(Math.random() * palettes.length)] });
  const randomizePalette = () => { const palette = palettes[Math.floor(Math.random() * palettes.length)]; change({ palette }); toast("Palette randomized"); };
  const saveCurrentPalette = () => {
    const name = paletteName.trim();
    const id = crypto.randomUUID();
    setSavedPalettes((items) => [{ id, name, colors: [...recipe.palette] }, ...items].slice(0, 24));
    setPaletteName("");
    if (name) {
      setSelectedTheme(savedThemeKey(id));
      toast(`${name} added to themes`);
    } else {
      toast("Palette saved to curated");
    }
  };
  const deleteSavedPalette = (id: string) => {
    setSavedPalettes((items) => items.filter((item) => item.id !== id));
    setSelectedTheme((current) => (current === savedThemeKey(id) ? companyThemeKey(companyThemes[0].name) : current));
    toast("Saved palette removed");
  };
  const applyTheme = (key: string) => {
    const option = buildThemeOptions(savedPalettes).find((item) => item.key === key)
      ?? buildThemeOptions([]).find((item) => item.key === key)
      ?? buildThemeOptions([])[0];
    if (!option) return;
    setSelectedTheme(option.key);
    change({ palette: [...option.colors] });
    toast(`${option.name} theme applied`);
  };
  const remix = () => {
    const effects: CursorEffect[] = ["push", "repel", "swirl", "ripple", "spotlight"];
    change({
      intensity: .35 + Math.random() * .6, zoom: .65 + Math.random() * 1.15, warp: Math.random(), contrast: .2 + Math.random() * .75,
      speed: Math.random() * 2.4, drift: Math.random(), animate: Math.random() > .12, reverse: Math.random() > .5, grain: Math.random() * .1,
      rotate: -Math.PI + Math.random() * Math.PI * 2, offsetX: -0.5 + Math.random(), offsetY: -0.5 + Math.random(), seed: Math.floor(Math.random() * 100000),
      smoothBlend: Math.random() > .5, cursorEnabled: Math.random() > .35, cursorEffect: effects[Math.floor(Math.random() * effects.length)], cursorStrength: .2 + Math.random() * .75, cursorRadius: .2 + Math.random() * .7,
    });
    toast("Shader remixed — style and colours kept");
  };
  const restyle = () => {
    const choices = Object.keys(presetSettings).map(Number).filter((style) => style !== recipe.style);
    const style = choices[Math.floor(Math.random() * choices.length)];
    const name = styleNames[style] ?? "Restyled shader";
    const settings = presetSettings[style] ?? defaultRecipe;
    change({ ...settings, name, style, palette: recipe.palette, glsl: fragmentShader });
    toast("Style changed — palette kept");
  };
  const inspire = () => {
    const effects: CursorEffect[] = ["push", "repel", "swirl", "ripple", "spotlight"];
    change({
      name: "Inspired shader", style: Math.floor(Math.random() * 34), palette: palettes[Math.floor(Math.random() * palettes.length)],
      intensity: .35 + Math.random() * .6, zoom: .65 + Math.random() * 1.15, warp: Math.random(), contrast: .2 + Math.random() * .75,
      speed: Math.random() * 2.4, drift: Math.random(), animate: Math.random() > .12, reverse: Math.random() > .5, grain: Math.random() * .1,
      rotate: -Math.PI + Math.random() * Math.PI * 2, offsetX: -0.5 + Math.random(), offsetY: -0.5 + Math.random(), seed: Math.floor(Math.random() * 100000),
      smoothBlend: Math.random() > .5, cursorEnabled: Math.random() > .35, cursorEffect: effects[Math.floor(Math.random() * effects.length)], cursorStrength: .2 + Math.random() * .75, cursorRadius: .2 + Math.random() * .7,
      glsl: fragmentShader,
    });
  };
  const exportText = (content: string, filename: string, type: string) => { const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([content], { type })); link.download = filename; link.click(); URL.revokeObjectURL(link.href); };
  const reactCode = isPaperStyle(recipe.style)
    ? `"use client";\n\nimport { ${paperShaderNames[recipe.style]} } from "@paper-design/shaders-react";\n\nexport function ${paperShaderNames[recipe.style]}Background() {\n  return (\n    <${paperShaderNames[recipe.style]}\n      width="100%"\n      height="100%"\n${formatPaperPropsForExport(recipe)}\n    />\n  );\n}\n`
    : `"use client";\n\n// Generated by Shader Studio\nexport const fragmentShader = ${JSON.stringify(recipe.glsl)};\n\nexport const shaderRecipe = ${JSON.stringify({ ...recipe, glsl: undefined }, null, 2)};\n`;
  const glslExportSource = isPaperStyle(recipe.style)
    ? `// ${paperShaderNames[recipe.style]} uses Paper Design's built-in GLSL.\n// Export the React component instead, or copy the mapped props below.\n\n${JSON.stringify(paperProps(recipe, false), null, 2)}`
    : recipe.glsl;
  const buildPrompt = () => {
    const style = styleNames[recipe.style] ?? recipe.name;
    const cursor = recipe.cursorEnabled ? `${recipe.cursorEffect} (strength ${Math.round(recipe.cursorStrength * 100)}/100, radius ${Math.round(recipe.cursorRadius * 100)}/100)` : "off";
    const feel = `animate ${recipe.animate ? "on" : "off"}, speed ${Math.round(recipe.speed / 3 * 100)}/100, drift ${Math.round(recipe.drift * 100)}/100, zoom ${Math.round(recipe.zoom / 2 * 100)}/100, intensity ${Math.round(recipe.intensity * 100)}/100, warp ${Math.round(recipe.warp * 100)}/100, contrast ${Math.round(recipe.contrast * 100)}/100, rotation ${Math.round(recipe.rotate * 180 / Math.PI)}°, offset (${Math.round(recipe.offsetX * 100)}/100, ${Math.round(recipe.offsetY * 100)}/100), grain ${Math.round(recipe.grain / .12 * 100)}/100, smooth blend ${recipe.smoothBlend ? "on" : "off"}`;
    if (isPaperStyle(recipe.style)) {
      const component = paperShaderNames[recipe.style];
      return `Add a Paper Design shader background to my app.
Style: "${style}" (${component} from @paper-design/shaders-react).
Colours (low → high): ${recipe.palette.map((color) => color.toUpperCase()).join(", ")}.
Feel: ${feel}.
Cursor: ${cursor} (mapped through offset/rotation on the Paper component).
Implementation notes:
Install @paper-design/shaders-react and render ${component} fullscreen behind page content.
Use these exact props:
${JSON.stringify(paperProps(recipe, false), null, 2)}
Keep width and height at 100%, preserve the seed/frame value for deterministic output, and respect reverse by passing a negative speed when needed.`;
    }
    return `Add an animated WebGL shader background to my app.
Style: "${style}".
Colours (low → high): ${recipe.palette.map((color) => color.toUpperCase()).join(", ")}.
Feel: ${feel}.
Cursor: ${cursor}.
Implementation notes:
Render a fullscreen triangle in a plain WebGL1 context with no rendering library. Cap devicePixelRatio at 2, use requestAnimationFrame only while visible, and mount the canvas absolutely behind the page content.
Use this exact fragment shader:
${recipe.glsl}
Feed the shader its u_resolution, u_time, u_pointer, u_velocity, u_colors, style, palette, surface, movement, frame, and cursor uniforms from the selected recipe.`;
  };
  const copyText = async (source: string, label = "Copied to clipboard") => {
    try { await navigator.clipboard.writeText(source); setCopied(true); toast(label); window.setTimeout(() => setCopied(false), 1500); }
    catch { toast.error("Couldn't copy — please try again"); }
  };
  const shareCurrentRecipe = async () => {
    const url = new URL(window.location.href);
    url.hash = "";
    url.searchParams.set(SHARED_SHADER_PARAM, encodeSharedRecipe(recipe));
    try {
      await navigator.clipboard.writeText(url.toString());
      setShareCopied(true);
      toast("Editable shader link copied");
      window.setTimeout(() => setShareCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy the share link â€” please try again");
    }
  };
  const exportPng = () => {
    const { width, height } = shaderOutputSize(videoSettings.aspect, videoSettings.height);
    const download = (canvas: HTMLCanvasElement) => {
      const link = document.createElement("a");
      link.download = `${recipe.name.toLowerCase().replaceAll(" ", "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast("PNG exported");
    };
    try {
      if (isPaperStyle(recipe.style)) {
        const sourceCanvas = queryShaderCanvas(recipe.style);
        if (!sourceCanvas) throw new Error("Shader preview is unavailable");
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not create export canvas");
        context.drawImage(sourceCanvas, 0, 0, width, height);
        download(canvas);
        return;
      }
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
      if (!gl) throw new Error("WebGL is unavailable in this browser");
      const compile = (type: number, source: string) => { const shader = gl.createShader(type)!; gl.shaderSource(shader, source); gl.compileShader(shader); if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed"); return shader; };
      const vertex = compile(gl.VERTEX_SHADER, "attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}");
      const fragment = compile(gl.FRAGMENT_SHADER, recipe.glsl);
      const program = gl.createProgram()!;
      gl.attachShader(program, vertex);
      gl.attachShader(program, fragment);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "Shader link failed");
      const position = gl.createBuffer()!;
      gl.bindBuffer(gl.ARRAY_BUFFER, position);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      gl.viewport(0, 0, width, height);
      gl.useProgram(program);
      gl.enableVertexAttribArray(gl.getAttribLocation(program, "position"));
      gl.vertexAttribPointer(gl.getAttribLocation(program, "position"), 2, gl.FLOAT, false, 0, 0);
      const set1 = (name: string, value: number) => gl.uniform1f(gl.getUniformLocation(program, name), value);
      gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), width, height);
      set1("u_time", 0);
      gl.uniform2f(gl.getUniformLocation(program, "u_pointer"), .5, .5);
      gl.uniform2f(gl.getUniformLocation(program, "u_velocity"), 0, 0);
      const colors = [...recipe.palette];
       while (colors.length < 8) colors.push(colors.at(-1) || "#000000");
       gl.uniform3fv(gl.getUniformLocation(program, "u_colors"), colors.slice(0, 8).map(hexToRgb).flat());
      set1("u_style", recipe.style);
      set1("u_intensity", recipe.intensity);
      set1("u_zoom", recipe.zoom);
      set1("u_warp", recipe.warp);
      set1("u_contrast", recipe.contrast);
      set1("u_speed", recipe.speed);
      set1("u_drift", recipe.drift);
      set1("u_animate", recipe.animate ? 1 : 0);
      set1("u_reverse", recipe.reverse ? 1 : 0);
      set1("u_rotate", recipe.rotate);
      set1("u_seed", recipe.seed);
      set1("u_smooth_blend", recipe.smoothBlend ? 1 : 0);
      set1("u_grain", recipe.grain);
      gl.uniform2f(gl.getUniformLocation(program, "u_offset"), recipe.offsetX, recipe.offsetY);
      set1("u_cursor_on", 0);
      set1("u_cursor_effect", 0);
      set1("u_cursor_strength", 0);
      set1("u_cursor_radius", 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      gl.finish();
      download(canvas);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not export PNG");
    }
  };
  const exportAspect = () => outputAspect.split(":").map(Number) as [number, number];
  const mockupOutputSize = (height: number = videoSettings.height) => { const [ratioWidth, ratioHeight] = exportAspect(); return { width: Math.round(height * ratioWidth / ratioHeight / 2) * 2, height }; };
  const loadExportImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = () => reject(new Error("Could not load mockup media")); image.src = src; });
  const drawMockupComposition = async (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext("2d"); const shader = queryShaderCanvas(recipe.style);
    if (!context || !shader) throw new Error("Live shader preview is unavailable");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(shader, 0, 0, canvas.width, canvas.height);
    if (!mockup.visible) return;
    const stageWidthRatio = cameraGeometry.viewportWidth ? cameraGeometry.stageWidth / cameraGeometry.viewportWidth : .58;
    const stageHeightRatio = cameraGeometry.viewportHeight ? cameraGeometry.stageHeight / cameraGeometry.viewportHeight : .52;
    const exportGeometry: CameraGeometry = { viewportWidth: canvas.width, viewportHeight: canvas.height, stageWidth: canvas.width * stageWidthRatio, stageHeight: canvas.height * stageHeightRatio, padWidth: 0, padHeight: 0 };
    const frame = getCameraFrame(mockup, exportGeometry);
    const width = exportGeometry.stageWidth; const height = exportGeometry.stageHeight;
    const framePad = mockup.borderStyle === "inset" ? 10 : 0;
    const bar = mockup.chrome === "browser" ? Math.max(40, height * .058) : 0;
    const mediaWidth = width - framePad * 2; const mediaHeight = height - bar - framePad * 2;
    const x = canvas.width / 2 + width * mockup.x / 100 - mockup.cameraX / 50 * frame.panLimitX;
    const y = canvas.height / 2 + height * mockup.y / 100 - mockup.cameraY / 50 * frame.panLimitY;
    context.save(); context.translate(x, y); context.scale(frame.renderScale, frame.renderScale); context.rotate(mockup.rotate * Math.PI / 180); context.scale(1 - Math.abs(mockup.tiltY) / 60, 1 - Math.abs(mockup.tiltX) / 80);
    context.shadowColor = `rgba(0,0,0,${.2 + mockup.shadow / 160})`; context.shadowBlur = 16 + mockup.shadow; context.shadowOffsetY = 8 + mockup.shadow / 3;
    const radius = Math.min(mockup.radius, Math.min(width, height) / 4);
    const fillStyle = mockup.borderStyle === "glass" ? "rgba(255,255,255,.22)" : mockup.borderStyle === "none" ? "transparent" : mockup.borderStyle === "inset" ? "rgba(255,255,255,.14)" : "#111216";
    context.fillStyle = fillStyle;
    if (mockup.borderStyle !== "none") { context.beginPath(); context.roundRect(-width / 2, -height / 2, width, height, radius); context.fill(); }
    if (mockup.borderStyle === "border") { context.strokeStyle = "rgba(255,255,255,.92)"; context.lineWidth = 2; context.beginPath(); context.roundRect(-width / 2, -height / 2, width, height, radius); context.stroke(); }
    if (mockup.borderStyle === "glass") { context.strokeStyle = "rgba(255,255,255,.62)"; context.lineWidth = 1; context.beginPath(); context.roundRect(-width / 2, -height / 2, width, height, radius); context.stroke(); }
    if (mockup.borderStyle === "inset") { context.strokeStyle = "rgba(0,0,0,.45)"; context.lineWidth = 3; context.beginPath(); context.roundRect(-width / 2 + 1.5, -height / 2 + 1.5, width - 3, height - 3, radius); context.stroke(); }
    context.shadowColor = "transparent"; context.save(); context.beginPath(); context.roundRect(-mediaWidth / 2, -height / 2 + bar + framePad, mediaWidth, mediaHeight, radius); context.clip();
    if (mockup.media && mockup.mediaType === "image") { const image = await loadExportImage(mockup.media); context.drawImage(image, -mediaWidth / 2, -height / 2 + bar + framePad, mediaWidth, mediaHeight); }
    else { context.fillStyle = "#171a2c"; context.fillRect(-mediaWidth / 2, -height / 2 + bar + framePad, mediaWidth, mediaHeight); context.fillStyle = "#f5f6ff"; context.font = `600 ${Math.max(18, mediaWidth / 11)}px sans-serif`; context.textAlign = "center"; context.fillText(mockup.mediaType === "video" ? "Video mockup" : "Your product", 0, 12); }
    context.restore();
    if (mockup.chrome === "browser") {
      const barTop = -height / 2;
      const barLeft = -width / 2;
      context.fillStyle = "#f5f5f7";
      context.beginPath(); context.roundRect(barLeft, barTop, width, bar, [radius, radius, 0, 0]); context.fill();
      context.strokeStyle = "#d2d2d7"; context.lineWidth = 1;
      context.beginPath(); context.moveTo(barLeft, barTop + bar - .5); context.lineTo(barLeft + width, barTop + bar - .5); context.stroke();
      const lights = [
        { color: "#ff5f57", x: barLeft + 14 },
        { color: "#febc2e", x: barLeft + 32 },
        { color: "#28c840", x: barLeft + 50 },
      ];
      lights.forEach(({ color, x }) => {
        context.fillStyle = color;
        context.beginPath(); context.arc(x, barTop + bar / 2, 5.5, 0, Math.PI * 2); context.fill();
        context.strokeStyle = "rgba(0,0,0,.12)"; context.lineWidth = .75;
        context.beginPath(); context.arc(x, barTop + bar / 2, 5.5, 0, Math.PI * 2); context.stroke();
      });
      const addressWidth = Math.min(width * .42, 260);
      const addressHeight = Math.max(18, bar * .52);
      const addressX = -addressWidth / 2;
      const addressY = barTop + (bar - addressHeight) / 2;
      context.fillStyle = "#e8e8ed";
      context.beginPath(); context.roundRect(addressX, addressY, addressWidth, addressHeight, addressHeight / 2); context.fill();
      context.fillStyle = "#636366"; context.font = `500 ${Math.max(10, bar * .32)}px -apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif`; context.textAlign = "center"; context.textBaseline = "middle";
      context.fillText("your-product.com", 0, barTop + bar / 2);
    }
    context.restore();
  };
  const exportMockupImage = async () => { try { const { width, height } = mockupOutputSize(mockupImageHeight); const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height; await drawMockupComposition(canvas); const link = document.createElement("a"); link.download = `${recipe.name.toLowerCase().replaceAll(" ", "-")}-mockup.png`; link.href = canvas.toDataURL("image/png"); link.click(); toast("Mockup image exported"); } catch (error) { toast.error(error instanceof Error ? error.message : "Could not export mockup image"); } };
  const exportMockupVideo = async () => { if (!("MediaRecorder" in window)) { toast.error("Video export is not supported in this browser"); return; } const mimeType = videoFormats.find((item) => item.value === videoSettings.mimeType && MediaRecorder.isTypeSupported(item.value))?.value ?? videoFormats.find((item) => MediaRecorder.isTypeSupported(item.value))?.value; if (!mimeType) { toast.error("No compatible video format is available in this browser"); return; } try { const { width, height } = mockupOutputSize(); const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height; const stream = canvas.captureStream(videoSettings.fps); const chunks: BlobPart[] = []; const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: height >= 1080 ? 12_000_000 : 6_000_000 }); const finished = new Promise<Blob>((resolve, reject) => { recorder.ondataavailable = (event) => event.data.size && chunks.push(event.data); recorder.onerror = () => reject(new Error("Video encoding failed")); recorder.onstop = () => resolve(new Blob(chunks, { type: mimeType })); }); recorder.start(); setVideoProgress(0); const frames = videoSettings.duration * videoSettings.fps; for (let frame = 0; frame < frames; frame += 1) { await drawMockupComposition(canvas); setVideoProgress((frame + 1) / frames); await new Promise<void>((resolve) => window.setTimeout(resolve, 1000 / videoSettings.fps)); } recorder.stop(); const blob = await finished; stream.getTracks().forEach((track) => track.stop()); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `${recipe.name.toLowerCase().replaceAll(" ", "-")}-mockup.${mimeType.includes("mp4") ? "mp4" : "webm"}`; link.click(); window.setTimeout(() => URL.revokeObjectURL(link.href), 1000); toast("Mockup video exported"); } catch (error) { toast.error(error instanceof Error ? error.message : "Could not export mockup video"); } finally { setVideoProgress(null); } };
  const updateVideoSettings = (update: Partial<VideoExportSettings>) => setVideoSettings((current) => ({ ...current, ...update }));
  const setOutputFrame = (aspect: OutputAspect) => {
    setOutputAspect(aspect);
    updateVideoSettings({ aspect: aspect === "4:5" ? "16:9" : aspect });
  };
  const exportVideo = async () => {
    if (!("MediaRecorder" in window)) { toast.error("Video export is not supported in this browser"); return; }
    const format = videoFormats.find((item) => item.value === videoSettings.mimeType);
    const mimeType = format && MediaRecorder.isTypeSupported(format.value) ? format.value : videoFormats.find((item) => MediaRecorder.isTypeSupported(item.value))?.value;
    if (!mimeType) { toast.error("No compatible video format is available in this browser"); return; }
    const { width, height } = shaderOutputSize(videoSettings.aspect, videoSettings.height);
    const forwardFrames = videoSettings.duration * videoSettings.fps;
    const frameIndexes = loopFrameIndexes(forwardFrames, videoSettings.loop);
    const bitrate = height >= 1080 ? 12_000_000 : height >= 720 ? 6_000_000 : 3_000_000;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    try {
      setVideoProgress(0);
      let blob: Blob;

      if (isPaperStyle(recipe.style)) {
        const mount = queryPaperShaderMount();
        if (!mount) throw new Error("Shader preview is unavailable");
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not create export canvas");
        const previewSpeed = paperSpeed(recipe, false);
        mount.setSpeed(0);
        try {
          blob = await recordCanvasAnimation({
            canvas,
            frameIndexes,
            fps: videoSettings.fps,
            mimeType,
            bitrate,
            onProgress: (progress) => setVideoProgress(progress),
            renderFrame: (timeSec) => {
              mount.setFrame(recipe.seed + timeSec * 1000);
              context.drawImage(mount.canvasElement, 0, 0, width, height);
            },
          });
        } finally {
          mount.setSpeed(previewSpeed);
        }
      } else {
        const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
        if (!gl) throw new Error("WebGL is unavailable in this browser");
        const compile = (type: number, source: string) => { const shader = gl.createShader(type)!; gl.shaderSource(shader, source); gl.compileShader(shader); if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed"); return shader; };
        const vertex = compile(gl.VERTEX_SHADER, "attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}");
        const fragment = compile(gl.FRAGMENT_SHADER, recipe.glsl);
        const program = gl.createProgram()!;
        gl.attachShader(program, vertex);
        gl.attachShader(program, fragment);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "Shader link failed");
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()!);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        const renderFrame = (time: number) => {
          gl.viewport(0, 0, width, height);
          gl.useProgram(program);
          gl.enableVertexAttribArray(gl.getAttribLocation(program, "position"));
          gl.vertexAttribPointer(gl.getAttribLocation(program, "position"), 2, gl.FLOAT, false, 0, 0);
          const set1 = (name: string, value: number) => gl.uniform1f(gl.getUniformLocation(program, name), value);
          gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), width, height);
          set1("u_time", time);
          gl.uniform2f(gl.getUniformLocation(program, "u_pointer"), .5, .5);
          gl.uniform2f(gl.getUniformLocation(program, "u_velocity"), 0, 0);
          const colors = [...recipe.palette];
          while (colors.length < 8) colors.push(colors.at(-1) || "#000000");
          gl.uniform3fv(gl.getUniformLocation(program, "u_colors"), colors.slice(0, 8).map(hexToRgb).flat());
          set1("u_style", recipe.style);
          set1("u_intensity", recipe.intensity);
          set1("u_zoom", recipe.zoom);
          set1("u_warp", recipe.warp);
          set1("u_contrast", recipe.contrast);
          set1("u_speed", recipe.speed);
          set1("u_drift", recipe.drift);
          set1("u_animate", recipe.animate ? 1 : 0);
          set1("u_reverse", recipe.reverse ? 1 : 0);
          set1("u_rotate", recipe.rotate);
          set1("u_seed", recipe.seed);
          set1("u_smooth_blend", recipe.smoothBlend ? 1 : 0);
          set1("u_grain", recipe.grain);
          gl.uniform2f(gl.getUniformLocation(program, "u_offset"), recipe.offsetX, recipe.offsetY);
          set1("u_cursor_on", 0);
          set1("u_cursor_effect", 0);
          set1("u_cursor_strength", 0);
          set1("u_cursor_radius", 0);
          gl.drawArrays(gl.TRIANGLES, 0, 3);
          gl.finish();
        };
        blob = await recordCanvasAnimation({
          canvas,
          frameIndexes,
          fps: videoSettings.fps,
          mimeType,
          bitrate,
          onProgress: (progress) => setVideoProgress(progress),
          renderFrame: (timeSec) => { renderFrame(timeSec); },
        });
      }

      const extension = mimeType.includes("mp4") ? "mp4" : "webm";
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${recipe.name.toLowerCase().replaceAll(" ", "-")}${videoSettings.loop ? "-loop" : ""}.${extension}`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      toast("Video exported");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not export video");
    } finally {
      setVideoProgress(null);
    }
  };
  const openSave = () => {
    const styleName = styleNames[recipe.style] ?? recipe.name;
    const matchingTheme = buildThemeOptions(savedPalettes).find((theme) => theme.colors.join() === recipe.palette.join());
    const namedPalette = matchingTheme?.name.trim();
    setSaveName(capitalizeWords(namedPalette ? `${namedPalette} ${styleName}` : styleName));
    setSaveOpen(true);
  };
  const save = () => { const item = { ...recipe, id: crypto.randomUUID(), name: saveName.trim() || "Untitled recipe" }; saveRecipe(item); setSaveOpen(false); };
  const activeLabel = useMemo(() => styleNames[recipe.style] ?? recipe.name, [recipe.style, recipe.name]);
  const availablePresets = useMemo(() => [...appPresets, ...saved.filter((item) => !appPresets.some((preset) => preset.id === item.id))], [saved]);
  const filteredSaved = useMemo(() => {
    const query = presetSearch.trim().toLowerCase();
    if (!query) return availablePresets;
    return availablePresets.filter((item) => `${item.name} ${styleNames[item.style] ?? "Custom look"}`.toLowerCase().includes(query));
  }, [availablePresets, presetSearch]);
  const updateMockup = (update: Partial<MockupSettings>) => setMockup((current) => ({ ...current, ...update }));
  const loadFile = (file: File) => { if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) { toast.error("Choose an image or video"); return; } const reader = new FileReader(); reader.onload = () => { const centered = mockupPresets[0]; updateMockup({ media: String(reader.result), mediaType: file.type.startsWith("video/") ? "video" : "image", ...centered.settings }); setBasePresetId(centered.id); toast("Centered mockup preset applied"); }; reader.readAsDataURL(file); };
  const loadMockupMedia = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) loadFile(file); };
  const handleDrop = (event: DragEvent<HTMLElement>) => { event.preventDefault(); const file = event.dataTransfer.files?.[0]; if (file) loadFile(file); };
  const setCameraDimension = (mode: CameraMode) => {
    setCameraMode(mode);
    if (mode === "zoom") setCameraTool2D("camera");
    else setCameraTool3D("camera");
  };
  const useMockupPreset = (preset: typeof mockupPresets[number]) => {
    const settings = cameraMode === "zoom" ? { ...preset.settings, tiltX: 0, tiltY: 0 } : preset.settings;
    updateMockup(settings); setBasePresetId(preset.id); toast(`${preset.label} applied`);
  };
  const focusPreset = mockupPresets.find((preset) => preset.id === focusPresetId) ?? mockupPresets[0];
  const setTimelinePlayhead = (next: number) => {
    const snapped = Math.round(Math.max(0, Math.min(baseDuration, next)) * 10) / 10;
    playheadRef.current = snapped;
    setPlayhead(snapped);
  };
  const playMotionPreview = () => {
    if (isTimelinePlaying) { setIsTimelinePlaying(false); return; }
    if (playheadRef.current >= baseDuration) setTimelinePlayhead(0);
    setIsTimelinePlaying(true);
  };
  const createAnimationClip = (start: number, duration = Math.min(animationDuration, baseDuration)): AnimationClip => ({
    id: crypto.randomUUID(), label: cameraMode === "tilt" ? "Tilt" : "Zoom", presetId: focusPresetId, start, duration,
    transition: Math.min(animationTransition, Math.max(MIN_TRAVEL, duration - EXIT_RESERVE)), easing: animationEasing, zoom: focusZoom, tilt: focusTilt, hold: Math.min(animationHold, duration * .3), springSpeed,
    targetX: mockup.x, targetY: mockup.y, targetTiltX: focusPreset.settings.tiltX, targetTiltY: focusPreset.settings.tiltY, targetRotate: focusPreset.settings.rotate, cameraX: focusPreset.settings.cameraX, cameraY: focusPreset.settings.cameraY, exit: "base", hidden: false,
  });
  const findClipGap = (duration: number, excludeId?: string, preferredStart = 0) => {
    const others = animationClips.filter((clip) => clip.id !== excludeId).sort((a, b) => a.start - b.start);
    const gaps: { from: number; to: number }[] = [];
    let cursor = 0;
    for (const existing of others) {
      if (existing.start > cursor) gaps.push({ from: cursor, to: existing.start });
      cursor = Math.max(cursor, existing.start + existing.duration);
    }
    if (cursor < baseDuration) gaps.push({ from: cursor, to: baseDuration });
    const fit = gaps.filter((gap) => gap.to - gap.from >= duration);
    if (!fit.length) return -1;
    return Math.round(fit.reduce((best, gap) => {
      const candidate = Math.max(gap.from, Math.min(gap.to - duration, preferredStart));
      return Math.abs(candidate - preferredStart) < Math.abs(best - preferredStart) ? candidate : best;
    }, fit[0].from) * 10) / 10;
  };
  const openAnimation = () => {
    if (!basePresetId && !mockup.media) { toast("Upload media, then choose a mockup preset before animating"); return; }
    if (!basePresetId) setBasePresetId("hero");
    setAnimationClips((clips) => {
      if (clips.length) { setActiveClipId((id) => id ?? clips[0].id); return clips; }
      const first = createAnimationClip(0);
      setActiveClipId(first.id); return [first];
    });
    setEditorMode("animation"); setMotionPreview("base");
  };
  const addAnimationClip = () => {
    const duration = Math.min(animationDuration, baseDuration);
    const start = findClipGap(duration);
    if (start < 0) { toast("No room in the base duration for another animation"); return; }
    const clip = createAnimationClip(Math.round(start * 10) / 10, duration);
    setAnimationClips((clips) => [...clips, clip]); setActiveClipId(clip.id); setEditorMode("animation");
  };
  const duplicateClip = (source: AnimationClip) => {
    const start = findClipGap(source.duration, source.id);
    if (start < 0) { toast("No room in the base duration to duplicate this animation"); return; }
    const duplicate = { ...source, id: crypto.randomUUID(), start: Math.round(start * 10) / 10, exit: "base" as const, hidden: false };
    setAnimationClips((clips) => [...clips, duplicate]); setActiveClipId(duplicate.id); toast("Animation duplicated");
  };
  const copyClip = (clip: AnimationClip) => { setClipClipboard({ clip: { ...clip }, mode: "copy" }); toast("Animation copied"); };
  const cutClip = (clip: AnimationClip) => {
    setClipClipboard({ clip: { ...clip }, mode: "cut" });
    setAnimationClips((clips) => clips.filter((item) => item.id !== clip.id));
    if (activeClipId === clip.id) setActiveClipId(null);
    toast("Animation cut");
  };
  const pasteClip = () => {
    if (!clipClipboard) return;
    const source = clipClipboard.clip;
    const start = findClipGap(source.duration, undefined, playheadRef.current);
    if (start < 0) { toast("No room in the base duration to paste this animation"); return; }
    const pasted = { ...source, id: crypto.randomUUID(), start: Math.round(start * 10) / 10, exit: "base" as const, hidden: false };
    setAnimationClips((clips) => [...clips, pasted]);
    setActiveClipId(pasted.id);
    if (clipClipboard.mode === "cut") setClipClipboard(null);
    toast("Animation pasted");
  };
  const toggleClipHidden = (clip: AnimationClip) => {
    const hidden = !clip.hidden;
    setAnimationClips((clips) => clips.map((item) => item.id === clip.id ? { ...item, hidden } : item));
    toast(hidden ? "Animation hidden" : "Animation shown");
  };
  const deleteClip = (clip: AnimationClip) => {
    setAnimationClips((clips) => clips.filter((item) => item.id !== clip.id));
    if (activeClipId === clip.id) setActiveClipId(null);
    if (clipClipboard?.clip.id === clip.id) setClipClipboard(null);
    toast("Animation deleted");
  };
  const smartSplitClip = (clip: AnimationClip) => {
    const splitAt = Math.round(playheadRef.current * 10) / 10;
    const leftDuration = Math.round((splitAt - clip.start) * 10) / 10;
    const rightDuration = Math.round((clip.start + clip.duration - splitAt) * 10) / 10;
    if (splitAt <= clip.start + .05 || splitAt >= clip.start + clip.duration - .05) {
      toast("Move the playhead inside the clip to smart split");
      return;
    }
    if (leftDuration < MIN_CLIP_DURATION || rightDuration < MIN_CLIP_DURATION) {
      toast(`Each half needs at least ${MIN_CLIP_DURATION.toFixed(1)}s`);
      return;
    }
    const left: AnimationClip = {
      ...clip,
      duration: leftDuration,
      transition: Math.min(clip.transition, Math.max(MIN_TRAVEL, leftDuration - EXIT_RESERVE)),
      hold: Math.min(clip.hold, leftDuration * .3),
      exit: "next",
    };
    const right: AnimationClip = {
      ...clip,
      id: crypto.randomUUID(),
      start: splitAt,
      duration: rightDuration,
      transition: Math.min(clip.transition, Math.max(MIN_TRAVEL, rightDuration - EXIT_RESERVE)),
      hold: Math.min(clip.hold, rightDuration * .3),
      exit: clip.exit,
    };
    setAnimationClips((clips) => [...clips.filter((item) => item.id !== clip.id), left, right]);
    setActiveClipId(right.id);
    toast("Animation split at playhead");
  };
  const closeClipMenu = () => setClipMenu(null);
  const openClipMenu = (event: MouseEvent, clip: AnimationClip) => {
    event.preventDefault();
    event.stopPropagation();
    selectAnimationClip(clip);
    const menuWidth = 220;
    const menuHeight = 280;
    setClipMenu({
      clipId: clip.id,
      x: Math.min(event.clientX, window.innerWidth - menuWidth - 8),
      y: Math.min(event.clientY, window.innerHeight - menuHeight - 8),
    });
  };
  const runClipMenuAction = (action: () => void) => { action(); closeClipMenu(); };
  const selectBaseMedia = () => { setIsTimelinePlaying(false); setActiveClipId(null); setEditorMode("mockup"); setMotionPreview("base"); closeClipMenu(); };
  const selectAnimationClip = (clip: AnimationClip) => { setActiveClipId(clip.id); setFocusPresetId(clip.presetId); setFocusZoom(clip.zoom); setFocusTilt(clip.tilt); setAnimationTransition(clip.transition); setAnimationEasing(clip.easing); setAnimationHold(clip.hold); setSpringSpeed(clip.springSpeed); setEditorMode("animation"); setMotionPreview("focus"); seekToClipTarget(clip); };
  const seekTimeline = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setTimelinePlayhead((event.clientX - bounds.left) / bounds.width * baseDuration);
  };
  const beginClipGesture = (event: PointerEvent<HTMLElement>, clip: AnimationClip, kind: "move" | "resize") => {
    if (event.button !== 0) return;
    event.preventDefault(); event.stopPropagation();
    closeClipMenu();
    selectAnimationClip(clip);
    clipGesture.current = { id: clip.id, kind, x: event.clientX, start: clip.start, duration: clip.duration };
    const move = (next: globalThis.PointerEvent) => {
      const gesture = clipGesture.current; if (!gesture) return;
      const trackWidth = animationTrackRef.current?.getBoundingClientRect().width ?? 1;
      const delta = (next.clientX - gesture.x) / trackWidth * baseDuration;
      setAnimationClips((clips) => clips.map((item) => {
        if (item.id !== gesture.id) return item;
        const others = clips.filter((other) => other.id !== item.id).sort((a, b) => a.start - b.start);
        if (gesture.kind === "resize") {
          const nextClip = others.find((other) => other.start >= item.start);
          const maxEnd = nextClip ? nextClip.start : baseDuration;
          const duration = Math.round(Math.max(MIN_CLIP_DURATION, Math.min(maxEnd - item.start, gesture.duration + delta)) * 10) / 10;
          return { ...item, duration, transition: Math.min(item.transition, Math.max(MIN_TRAVEL, duration - EXIT_RESERVE)), hold: Math.min(item.hold, duration * .3) };
        }
        const desired = Math.max(0, Math.min(baseDuration - item.duration, gesture.start + delta));
        const gaps = [{ from: 0, to: others[0]?.start ?? baseDuration }, ...others.map((other, index) => ({ from: other.start + other.duration, to: others[index + 1]?.start ?? baseDuration }))]
          .filter((gap) => gap.to - gap.from >= item.duration);
        const start = gaps.reduce((best, gap) => {
          const candidate = Math.max(gap.from, Math.min(gap.to - item.duration, desired));
          return Math.abs(candidate - desired) < Math.abs(best - desired) ? candidate : best;
        }, gaps.length ? gaps[0].from : item.start);
        return { ...item, start: Math.round(start * 10) / 10 };
      }));
    };
    const end = () => { clipGesture.current = null; setAnimationClips((clips) => { const ordered = [...clips].sort((a, b) => a.start - b.start); return clips.map((clip) => { const next = ordered[ordered.findIndex((item) => item.id === clip.id) + 1]; return clip.exit === "next" && (!next || Math.abs(clip.start + clip.duration - next.start) >= .11) ? { ...clip, exit: "base" } : clip; }); }); window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", end); };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", end);
  };
  const activeClip = animationClips.find((clip) => clip.id === activeClipId);
  const duplicateActiveClip = () => { if (activeClip) duplicateClip(activeClip); };
  const orderedClips = [...animationClips].sort((a, b) => a.start - b.start);
  const activeTargetPreset = activeClip ? (mockupPresets.find((preset) => preset.id === activeClip.presetId) ?? focusPreset) : focusPreset;
  const activeTargetScale = activeTargetPreset.settings.scale * (activeClip?.zoom ?? focusZoom);
  const nextClip = activeClip ? orderedClips.find((clip) => clip.start > activeClip.start) : undefined;
  const activeClipMaxDuration = activeClip ? Math.max(.6, (nextClip?.start ?? baseDuration) - activeClip.start) : baseDuration;
  const previousFor = (clip: AnimationClip) => orderedClips[orderedClips.findIndex((item) => item.id === clip.id) - 1];
  const nextFor = (clip: AnimationClip) => orderedClips[orderedClips.findIndex((item) => item.id === clip.id) + 1];
  const isLinkedFromPrevious = (clip: AnimationClip) => {
    const previous = previousFor(clip);
    return Boolean(previous && previous.exit === "next" && Math.abs(previous.start + previous.duration - clip.start) < .11);
  };
  const seekToClipTarget = (clip: AnimationClip) => {
    const hold = Math.min(clip.hold, clip.duration * .3);
    const travel = isLinkedFromPrevious(clip) ? 0 : Math.min(clip.transition, Math.max(MIN_TRAVEL, clip.duration - hold - EXIT_RESERVE));
    setIsTimelinePlaying(false);
    setTimelinePlayhead(clip.start + travel + Math.min(hold / 2, .06));
    setMotionPreview("focus");
  };
  const previewClip = animationClips.find((clip) => !clip.hidden && playhead >= clip.start && playhead <= clip.start + clip.duration);
  const springProgress = (progress: number, speed: number) => {
    if (progress <= 0) return 0;
    if (progress >= 1) return 1;
    const frequency = 10 + speed * 7;
    const damping = .72;
    const dampedFrequency = frequency * Math.sqrt(1 - damping * damping);
    const value = 1 - Math.exp(-damping * frequency * progress) * (Math.cos(dampedFrequency * progress) + damping / Math.sqrt(1 - damping * damping) * Math.sin(dampedFrequency * progress));
    return Math.max(-.06, Math.min(1.08, value));
  };
  const motionProgress = (progress: number, clip: AnimationClip, speedMultiplier = 1) => {
    if (clip.easing === "spring") return springProgress(progress, clip.springSpeed * speedMultiplier);
    const clamped = Math.max(0, Math.min(1, progress));
    return clamped < .5 ? 4 * clamped * clamped * clamped : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
  };
  const interpolateMockup = (from: MockupSettings, to: MockupSettings, progress: number): MockupSettings => ({
    ...from,
    scale: from.scale + (to.scale - from.scale) * progress,
    x: from.x + (to.x - from.x) * progress,
    y: from.y + (to.y - from.y) * progress,
    cameraX: from.cameraX + (to.cameraX - from.cameraX) * progress,
    cameraY: from.cameraY + (to.cameraY - from.cameraY) * progress,
    tiltX: from.tiltX + (to.tiltX - from.tiltX) * progress,
    tiltY: from.tiltY + (to.tiltY - from.tiltY) * progress,
    rotate: from.rotate + (to.rotate - from.rotate) * progress,
  });
  const targetState = (clip: AnimationClip): MockupSettings => {
    const preset = mockupPresets.find((item) => item.id === clip.presetId) ?? focusPreset;
    return { ...mockup, scale: preset.settings.scale * clip.zoom, x: clip.targetX, y: clip.targetY, cameraX: clip.cameraX, cameraY: clip.cameraY, tiltX: clip.targetTiltX + clip.tilt, tiltY: clip.targetTiltY, rotate: clip.targetRotate };
  };
  const animationState = (clip: AnimationClip): MockupSettings => {
    const target = targetState(clip);
    const localTime = playhead - clip.start;
    const hold = Math.min(clip.hold, clip.duration * .3);
    const next = nextFor(clip);
    const exitState = clip.exit === "next" && next && Math.abs(clip.start + clip.duration - next.start) < .11 ? targetState(next) : mockup;
    if (isLinkedFromPrevious(clip)) {
      const exitDuration = Math.max(.01, clip.duration - hold);
      if (localTime <= hold) return target;
      return interpolateMockup(target, exitState, motionProgress((localTime - hold) / exitDuration, clip));
    }
    const travel = Math.min(clip.transition, Math.max(MIN_TRAVEL, clip.duration - hold - EXIT_RESERVE));
    const exitDuration = Math.max(.01, clip.duration - travel - hold);
    const progress = localTime <= travel ? motionProgress(localTime / travel, clip)
      : localTime <= travel + hold ? 1
        : motionProgress((localTime - travel - hold) / exitDuration, clip);
    return localTime <= travel + hold ? interpolateMockup(mockup, target, progress) : interpolateMockup(target, exitState, progress);
  };
  const stageTransform = (state: MockupSettings) => {
    const frame = getCameraFrame(state, cameraGeometry);
    const panX = -state.cameraX / 50 * frame.panLimitX;
    const panY = -state.cameraY / 50 * frame.panLimitY;
    const placement = `translate(-50%, -50%) translate(${state.x}% , ${state.y}%) translate(${panX}px, ${panY}px) scale(${frame.renderScale}) scale(${state.flipX ? -1 : 1}, ${state.flipY ? -1 : 1})`;
    return state.tiltX || state.tiltY
      ? `${placement} perspective(1200px) rotateX(${state.tiltX}deg) rotateY(${state.tiltY}deg) rotateZ(${state.rotate}deg)`
      : `${placement} rotate(${state.rotate}deg)`;
  };
  const stageMockup = editorMode === "animation" && previewClip ? animationState(previewClip) : mockup;
  const menuClip = clipMenu ? animationClips.find((clip) => clip.id === clipMenu.clipId) : undefined;
  const canSmartSplit = Boolean(menuClip && playhead > menuClip.start + .05 && playhead < menuClip.start + menuClip.duration - .05
    && playhead - menuClip.start >= MIN_CLIP_DURATION
    && menuClip.start + menuClip.duration - playhead >= MIN_CLIP_DURATION);

  useEffect(() => {
    if (!clipMenu) return;
    const dismiss = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest(".clip-context-menu")) return;
      closeClipMenu();
    };
    const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") closeClipMenu(); };
    window.addEventListener("pointerdown", dismiss, true);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("pointerdown", dismiss, true); window.removeEventListener("keydown", onKey); };
  }, [clipMenu]);

  useEffect(() => {
    if (editorMode !== "animation") return;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      const mod = event.metaKey || event.ctrlKey;
      const clip = animationClips.find((item) => item.id === activeClipId) ?? null;
      if (mod && event.key.toLowerCase() === "d") { event.preventDefault(); if (clip) duplicateClip(clip); return; }
      if (mod && event.key.toLowerCase() === "c") { event.preventDefault(); if (clip) copyClip(clip); return; }
      if (mod && event.key.toLowerCase() === "x") { event.preventDefault(); if (clip) cutClip(clip); return; }
      if (mod && event.key.toLowerCase() === "v") { event.preventDefault(); pasteClip(); return; }
      if (mod && event.shiftKey && event.key.toLowerCase() === "h") { event.preventDefault(); if (clip) toggleClipHidden(clip); return; }
      if (!mod && event.key.toLowerCase() === "s" && clip) { event.preventDefault(); smartSplitClip(clip); return; }
      if (!mod && (event.key === "Delete" || event.key === "Backspace") && clip) { event.preventDefault(); deleteClip(clip); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editorMode, animationClips, activeClipId, clipClipboard]);

  const moveTiltCamera = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const normalizedX = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
    const normalizedY = Math.min(1, Math.max(0, (event.clientY - box.top) / box.height));
    updateMockup({ tiltY: Math.round((normalizedX - .5) * 90), tiltX: Math.round((.5 - normalizedY) * 90) });
    setBasePresetId("custom");
  };
  const isTiltPadActive = cameraMode === "tilt" && cameraTool3D === "tilt";
  const isCameraPadActive = (cameraMode === "zoom" && cameraTool2D === "camera") || (cameraMode === "tilt" && cameraTool3D === "camera");
  const beginCameraPadPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (isTiltPadActive) {
      moveTiltCamera(event);
      return;
    }
    if (!isCameraPadActive) return;
    if (event.button !== 0) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest(".camera-center-reset")) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const frame = getPanoramaCameraFrame(mockup, cameraGeometry);
    const box = event.currentTarget.getBoundingClientRect();
    const localX = event.clientX - box.left;
    const localY = event.clientY - box.top;
    const onCrop = Math.abs(localX - frame.cropCenterX) <= frame.cropWidth / 2 && Math.abs(localY - frame.cropCenterY) <= frame.cropHeight / 2;
    let startCameraX = mockup.cameraX;
    let startCameraY = mockup.cameraY;
    if (!onCrop) {
      const center = getNavigatorCenter(event, frame, box);
      const jumped = cameraFromNavigatorCenter(center.x, center.y, box, mockup, frame, cameraGeometry);
      startCameraX = jumped.cameraX;
      startCameraY = jumped.cameraY;
      updateMockup({ cameraX: startCameraX, cameraY: startCameraY });
      setBasePresetId("custom");
    }
    cameraPadDrag.current = { pointerId: event.pointerId, startClientX: event.clientX, startClientY: event.clientY, startCameraX, startCameraY };
    setNavigatorHoverCenter(null);
    setAlignmentGridVisible(true);
  };
  const moveCameraPadPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (isTiltPadActive) {
      if (event.buttons === 1) moveTiltCamera(event);
      return;
    }
    if (!isCameraPadActive) return;
    const drag = cameraPadDrag.current;
    if (!drag || drag.pointerId !== event.pointerId) {
      setNavigatorHoverCenter(getNavigatorCenter(event, getPanoramaCameraFrame(mockup, cameraGeometry), event.currentTarget.getBoundingClientRect()));
      return;
    }
    const frame = getPanoramaCameraFrame(mockup, cameraGeometry);
    const delta = cameraDeltaFromPadDrag(event.clientX - drag.startClientX, event.clientY - drag.startClientY, frame);
    updateMockup({
      cameraX: Math.round(Math.max(-50, Math.min(50, drag.startCameraX + delta.cameraX))),
      cameraY: Math.round(Math.max(-50, Math.min(50, drag.startCameraY + delta.cameraY))),
    });
    setBasePresetId("custom");
  };
  const endCameraPadPointer = (event: PointerEvent<HTMLDivElement>) => {
    if (cameraPadDrag.current?.pointerId === event.pointerId) cameraPadDrag.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    setAlignmentGridVisible(false);
  };
  const resetCameraToCenter = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    updateMockup({ cameraX: 0, cameraY: 0 });
    setBasePresetId("custom");
    setNavigatorHoverCenter(null);
    toast("Camera centered");
  };
  const moveAnimationCamera = (event: PointerEvent<HTMLDivElement>) => {
    if (!activeClip) return;
    const frame = getCameraFrame({ scale: activeTargetScale, cameraX: activeClip.cameraX, cameraY: activeClip.cameraY }, cameraGeometry);
    const box = event.currentTarget.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
    const py = Math.min(1, Math.max(0, (event.clientY - box.top) / box.height));
    const useTilt = cameraMode === "tilt" && cameraTool3D === "tilt";
    const updated = useTilt
      ? { ...activeClip, targetTiltY: Math.round((px - .5) * 90), targetTiltX: Math.round((.5 - py) * 90) }
      : { ...activeClip, cameraX: frame.panLimitX ? Math.round(Math.max(-50, Math.min(50, (event.clientX - box.left - box.width / 2) / (frame.previewScale * frame.panLimitX) * 50))) : 0, cameraY: frame.panLimitY ? Math.round(Math.max(-50, Math.min(50, (event.clientY - box.top - box.height / 2) / (frame.previewScale * frame.panLimitY) * 50))) : 0 };
    setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip));
    seekToClipTarget(updated);
  };

  return <main className={`studio-shell ${editorMode === "animation" ? "animation-mode" : ""}`} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
    <header className="topbar"><div className="brand"><span className="brand-mark">S</span><span>SHADER STUDIO</span></div><div className="top-actions"><button className="icon-button" onClick={undo} disabled={!history.length} aria-label="Undo"><Undo2 /></button><button className="icon-button" onClick={redo} disabled={!future.length} aria-label="Redo"><Redo2 /></button><button className="button ghost" onClick={shareCurrentRecipe}><Share2 />{shareCopied ? "Copied" : "Share"}</button><button className="button ghost" onClick={() => { setExportTab(tab === "mockup" || editorMode === "animation" ? "mockup" : "image"); setMockupExportOpen(true); }}><ImageDown /> Export</button><button className="button primary" onClick={() => copyText(buildPrompt(), "Build prompt copied")}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy prompt"}</button><button className="button primary" onClick={openSave}><Save /> Save preset</button></div></header>
    <section className="workspace">
      <nav className="icon-rail" aria-label="Shader controls"><div className={`rail-tabs ${editorMode === "animation" ? "mode-disabled" : ""}`}>{tabs.map(({ id, label, icon: Icon }) => <button key={id} disabled={editorMode === "animation"} className={`rail-tab ${tab === id ? "active" : ""}`} onClick={() => setTab(id)} aria-label={label}><Icon size={19} strokeWidth={1.8} /><span>{label}</span></button>)}</div><button type="button" className="rail-tab rail-skill" onClick={() => setSkillOpen(true)} aria-label="Open landing page shader skill"><BookOpen size={19} strokeWidth={1.8} /><span>Skill</span></button></nav>
      <aside className={`inspector ${tab === "mockup" && editorMode === "animation" ? "mode-disabled" : ""}`}><div className={`inspector-scroll ${tab === "visuals" ? "inspector-scroll-visuals" : "scroll-fade scroll-fade-y scroll-fade-6 no-scrollbar"}`}>
        {tab === "visuals" && <VisualsPanel recipe={recipe} activeLabel={activeLabel} selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} onChange={change} onApplyTheme={applyTheme} onRandomize={randomizePalette} savedPalettes={savedPalettes} paletteName={paletteName} setPaletteName={setPaletteName} onSavePalette={saveCurrentPalette} onDeletePalette={deleteSavedPalette} onSelectPreset={selectPreset} />}
        {tab === "presets" && <div className="panel-content presets-panel-content"><h2>Presets</h2><p className="helper">App defaults and your saved shader looks, ready to remix.</p>{availablePresets.length ? <><label className="preset-search"><Search /><input value={presetSearch} onChange={(event) => setPresetSearch(event.target.value)} placeholder="Search presets" aria-label="Search presets" />{presetSearch && <button type="button" onClick={() => setPresetSearch("")} aria-label="Clear preset search"><X /></button>}</label><div className="preset-library"><AnimatePresence initial={false} mode="popLayout">{filteredSaved.map((item, index) => <motion.button layout key={item.id} onClick={() => setRecipe(item)} aria-label={`Open preset ${item.name}`} initial={{ opacity: 0, y: 12, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: .985 }} transition={{ duration: .22, delay: Math.min(index * .025, .14), ease: [0.22, 1, 0.36, 1] }}><SavedRecipePreview recipe={item} /><span><b>{item.name}</b><em>{styleNames[item.style] ?? "Custom look"}</em></span></motion.button>)}</AnimatePresence>{!filteredSaved.length && <motion.p className="preset-search-empty" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>No presets match "{presetSearch}".</motion.p>}</div></> : <div className="presets-empty"><div className="presets-empty-icon"><WandSparkles /></div><h3>No presets yet</h3><p>Build a look in Visuals, then save it here for your next project.</p><button className="button primary" onClick={() => setTab("visuals")}><WandSparkles /> Tune visuals</button></div>}</div>}
        {tab === "mockup" && <div className="editor-mode-switch" role="group" aria-label="Mockup editor mode"><button className={editorMode === "mockup" ? "active" : ""} onClick={() => setEditorMode("mockup")}>Mockup</button><button className={editorMode === "animation" ? "active" : ""} onClick={openAnimation} disabled={!basePresetId && !mockup.media} title={!basePresetId && !mockup.media ? "Upload media or choose a mockup preset first" : undefined}>Animation <Badge variant="secondary">Beta</Badge></button></div>}
        {tab === "mockup" && <section className="output-frame-control"><div><span className="section-label">Output frame</span><p>Canvas, camera, animation, and export</p></div><div className="output-frame-grid">{outputFrames.map((frame) => <button key={frame.aspect} className={outputAspect === frame.aspect ? "selected" : ""} onClick={() => setOutputFrame(frame.aspect)} aria-pressed={outputAspect === frame.aspect}><i className={`output-frame-shape ratio-${frame.aspect.replace(":", "-")}`} /><span>{frame.aspect}</span><small>{frame.label}</small></button>)}</div></section>}
        {tab === "mockup" && <div className="panel-content mockup-panel"><input ref={mediaInput} className="visually-hidden" type="file" accept="image/*,video/*" onChange={loadMockupMedia} /><h2>Mockup</h2><p className="helper">Place your product on the live shader scene.</p><button className="mockup-upload" onClick={() => mediaInput.current?.click()}>{mockup.media && mockup.mediaType === "image" ? <img src={mockup.media} alt="Selected mockup media" /> : mockup.media ? <video src={mockup.media} muted playsInline /> : <span className="mockup-upload-placeholder"><ImageDown /><b>Screenshot</b><small>Drop media or click to choose</small></span>}</button><button className="button wide ghost replace-media" onClick={() => mediaInput.current?.click()}>{mockup.media ? "Replace media" : "Choose media"}</button><div className="mockup-aspect-inline"><div className="section-label">Aspect ratio</div><div className="aspect-ratio-grid">{(["auto", "16 / 9", "4 / 3", "1 / 1", "9 / 16"] as MockupAspect[]).map((aspect) => <button key={aspect} onClick={() => setMockupAspect(aspect)} className={mockupAspect === aspect ? "selected" : ""}><i className={`aspect-symbol ${aspect === "auto" ? "auto" : `ratio-${aspect.replaceAll(" ", "").replace("/", "-")}`}`} /><span>{aspect === "auto" ? "Auto" : aspect}</span></button>)}</div></div><div className="section-label">Style</div><div className="mockup-style-grid mockup-chrome-style-grid">{mockupChromeStyles.map((chrome) => <button key={chrome} type="button" onClick={() => updateMockup({ chrome })} className={mockup.chrome === chrome ? "selected" : ""}><i className={`chrome-sample ${chrome}`} aria-hidden="true" /><span>{chrome === "none" ? "None" : "Browser"}</span></button>)}</div><div className="section-label">Border style</div><div className="mockup-style-grid mockup-border-style-grid">{mockupBorderStyles.map((borderStyle) => <button key={borderStyle} type="button" onClick={() => updateMockup({ borderStyle })} className={mockup.borderStyle === borderStyle ? "selected" : ""}><i className={`frame-sample ${borderStyle}`} /><span>{borderStyle === "none" ? "Clean" : borderStyle}</span></button>)}</div><div className="section-label">Border rounding</div><div className="mockup-segment mockup-radius-segment"><button type="button" onClick={() => updateMockup({ radius: 0 })} className={mockup.radius === 0 ? "selected" : ""}>Sharp</button><button type="button" onClick={() => updateMockup({ radius: 20 })} className={mockup.radius === 20 ? "selected" : ""}>Curved</button><button type="button" onClick={() => updateMockup({ radius: 42 })} className={mockup.radius === 42 ? "selected" : ""}>Round</button></div><Slider label="Radius" value={mockup.radius} min={0} max={48} step={1} onChange={(radius) => updateMockup({ radius })} /><div className="section-label">Shadow</div><div className="mockup-segment mockup-shadow-segment"><button type="button" onClick={() => updateMockup({ shadow: 0 })} className={mockup.shadow === 0 ? "selected" : ""}>None</button><button type="button" onClick={() => updateMockup({ shadow: 40 })} className={mockup.shadow === 40 ? "selected" : ""}>Spread</button><button type="button" onClick={() => updateMockup({ shadow: 80 })} className={mockup.shadow === 80 ? "selected" : ""}>Hug</button></div><Slider label="Opacity" value={mockup.shadow / 100} min={0} max={1} step={.01} unit="%" onChange={(shadow) => updateMockup({ shadow: shadow * 100 })} /><div className="section-label">Visibility</div><button className="mockup-visibility" onClick={() => updateMockup({ visible: !mockup.visible })}><Eye /> {mockup.visible ? "Hide mockup" : "Show mockup"}</button><div className="mockup-details"><span>Details</span><div><b>Device</b><em>{mockup.mediaType === "video" ? "Video" : mockup.media ? "Screenshot" : "Demo card"}</em></div><div><b>Screen pixels</b><em>Adapts to media</em></div></div></div>}
      </div><div className="local-recipes"><div className="section-label">Local recipes</div>{saved.length ? saved.slice(0, 3).map((item) => <button key={item.id} onClick={() => setRecipe(item)}>{item.name}<ChevronDown /></button>) : <span>Saved looks appear here.</span>}</div></aside>
{tab === "mockup" && <><div ref={mockupViewportRef} className="mockup-viewport">{editorMode === "animation" && activeClip && <div className="stage-target-badge"><i /> TARGET · {activeClip.label} · {activeClip.easing}</div>}<div className={`alignment-grid ${alignmentGridVisible ? "visible" : ""}`} aria-hidden="true" /><div ref={mockupStageRef} className={`mockup-stage chrome-${mockup.chrome} border-${mockup.borderStyle}`} style={{ transform: stageTransform(stageMockup), borderRadius: mockup.radius, ["--mockup-radius"]: `${mockup.radius}px`, boxShadow: `0 ${18 + mockup.shadow / 3}px ${35 + mockup.shadow}px rgba(0,0,0,${.2 + mockup.shadow / 160})`, visibility: mockup.visible ? "visible" : "hidden" } as CSSProperties}><div className="browser-bar" aria-hidden={mockup.chrome !== "browser"}><div className="browser-traffic"><i className="close" /><i className="minimize" /><i className="zoom" /></div><div className="browser-address"><span>your-product.com</span></div></div>{mockup.media && mockup.mediaType === "video" ? <video src={mockup.media} autoPlay muted loop playsInline /> : mockup.media ? <img src={mockup.media} alt="Mockup preview" /> : <button type="button" className="mockup-demo" onClick={() => mediaInput.current?.click()} aria-label="Upload images or videos" />}</div></div><RightCameraInspector
            recipe={recipe}
            mockup={mockup}
            geometry={cameraGeometry}
            mode={cameraMode}
            tool2D={cameraTool2D}
            tool3D={cameraTool3D}
            hoverCenter={navigatorHoverCenter}
            basePresetId={basePresetId}
            onModeChange={setCameraDimension}
            onTool2DChange={setCameraTool2D}
            onTool3DChange={setCameraTool3D}
            onChange={(update) => { updateMockup(update); setBasePresetId("custom"); }}
            onPreset={useMockupPreset}
            onResetCamera={resetCameraToCenter}
            onPadPointerDown={beginCameraPadPointer}
            onPadPointerMove={moveCameraPadPointer}
            onPadPointerUp={endCameraPadPointer}
            onPadPointerCancel={endCameraPadPointer}
            onPadPointerLeave={() => { if (!cameraPadDrag.current) setNavigatorHoverCenter(null); }}
            cameraPadRef={cameraPadRef}
          /></>}
        {tab === "mockup" && editorMode === "animation" && <>
         <aside className="motion-inspector">
          <div className="motion-header"><div><span className="eyebrow">SELECTED ANIMATION</span><h2>{activeClip?.label ?? "Animation"}</h2><p>Choose its destination, then fine-tune it.</p></div><div className="motion-header-actions"><button className="duplicate-animation" onClick={duplicateActiveClip} title="Duplicate animation" aria-label="Duplicate animation"><Copy /></button><button onClick={selectBaseMedia}>Edit base</button></div></div>
          <Slider label="Transition" value={activeClip?.transition ?? animationTransition} min={MIN_TRAVEL} max={activeClip?.duration ?? baseDuration} step={.1} unit="s" onChange={(transition) => { if (!activeClip) return; const updated = { ...activeClip, transition: Math.min(transition, Math.max(MIN_TRAVEL, activeClip.duration - EXIT_RESERVE)) }; setAnimationTransition(updated.transition); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} trailing={<button type="button" className={`curve-toggle ${activeClip?.easing ?? animationEasing}`} aria-label={`Switch to ${activeClip?.easing === "spring" ? "ease" : "spring"} curve`} title={activeClip?.easing === "spring" ? "Spring curve — click for ease" : "Ease curve — click for spring"} onClick={(event) => { event.preventDefault(); if (!activeClip) return; const easing = activeClip.easing === "spring" ? "ease" as const : "spring" as const; const updated = { ...activeClip, easing }; setAnimationEasing(easing); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); toast(`${easing === "spring" ? "Spring" : "Ease"} motion applied`); }}><i aria-hidden="true" /></button>} />
          <div className="motion-exit-control"><span>After this animation</span><div><button className={activeClip?.exit === "base" ? "active" : ""} onClick={() => activeClip && setAnimationClips((clips) => clips.map((clip) => clip.id === activeClip.id ? { ...clip, exit: "base" } : clip))}>Return to base</button><button disabled={!activeClip || !nextClip} className={activeClip?.exit === "next" ? "active" : ""} onClick={() => { if (!activeClip || !nextClip) return; const nextStart = activeClip.start + activeClip.duration; setAnimationClips((clips) => clips.map((clip) => clip.id === activeClip.id ? { ...clip, exit: "next" } : clip.id === nextClip.id ? { ...clip, start: nextStart } : clip)); toast(`Flows into ${nextClip.label}`); }}>Continue to next</button></div>{nextClip ? <small>Flows into {nextClip.label} instead of returning to base.</small> : <small>Add another animation to create a continuation.</small>}</div>
          <div className="camera-tabs" role="tablist" aria-label="Animation transform space"><button type="button" role="tab" aria-selected={cameraMode === "zoom"} className={cameraMode === "zoom" ? "active" : ""} onClick={() => setCameraDimension("zoom")}>2D</button><button type="button" role="tab" aria-selected={cameraMode === "tilt"} className={cameraMode === "tilt" ? "active" : ""} onClick={() => setCameraDimension("tilt")}>3D</button><button type="button" className="precision-toggle" onClick={() => setPrecisionOpen((value) => !value)}>{precisionOpen ? "Simple" : "Precision"}</button></div>
          {cameraMode === "zoom" ? (
            <div className="camera-subtabs" role="tablist" aria-label="2D animation tools">
              <button type="button" role="tab" aria-selected={cameraTool2D === "camera"} className={cameraTool2D === "camera" ? "active" : ""} onClick={() => setCameraTool2D("camera")}>Camera</button>
              <button type="button" role="tab" aria-selected={cameraTool2D === "rotation"} className={cameraTool2D === "rotation" ? "active" : ""} onClick={() => setCameraTool2D("rotation")}>Rotation</button>
            </div>
          ) : (
            <div className="camera-subtabs" role="tablist" aria-label="3D animation tools">
              <button type="button" role="tab" aria-selected={cameraTool3D === "camera"} className={cameraTool3D === "camera" ? "active" : ""} onClick={() => setCameraTool3D("camera")}>Camera</button>
              <button type="button" role="tab" aria-selected={cameraTool3D === "tilt"} className={cameraTool3D === "tilt" ? "active" : ""} onClick={() => setCameraTool3D("tilt")}>Tilt</button>
              <button type="button" role="tab" aria-selected={cameraTool3D === "roll"} className={cameraTool3D === "roll" ? "active" : ""} onClick={() => setCameraTool3D("roll")}>Roll</button>
            </div>
          )}
          {((cameraMode === "zoom" && cameraTool2D === "camera") || (cameraMode === "tilt" && (cameraTool3D === "camera" || cameraTool3D === "tilt"))) && (
<div ref={cameraPadRef} className={`camera-pad animation-camera-pad ${cameraMode === "tilt" && cameraTool3D === "tilt" ? "tilt-preview" : "zoom-preview"}`} onPointerDown={moveAnimationCamera} onPointerMove={(event) => event.buttons === 1 && moveAnimationCamera(event)} role="application" aria-label="Animation destination camera pad">{(cameraMode === "zoom" || cameraTool3D === "camera") && <CameraPadScene recipe={recipe} mockup={mockup} geometry={cameraGeometry} camera={{ ...mockup, scale: activeTargetScale, x: activeClip?.targetX ?? mockup.x, y: activeClip?.targetY ?? mockup.y, rotate: activeClip?.targetRotate ?? mockup.rotate, cameraX: activeClip?.cameraX ?? 0, cameraY: activeClip?.cameraY ?? 0 }} />}{cameraMode === "tilt" && cameraTool3D === "tilt" && <div className="camera-pad-card" style={{ transform: `translate(-50%, -50%) perspective(280px) rotateX(${(activeClip?.targetTiltX ?? 0) + focusTilt}deg) rotateY(${activeClip?.targetTiltY ?? 0}deg) rotateZ(${activeClip?.targetRotate ?? 0}deg) scale(${.65 + activeTargetScale * .18})` }} />}<span className="camera-cross horizontal" /><span className="camera-cross vertical" /><i className="camera-handle" style={{ left: `${(cameraMode === "zoom" || cameraTool3D === "camera") ? getCameraFrame({ scale: activeTargetScale, cameraX: activeClip?.cameraX ?? 0, cameraY: activeClip?.cameraY ?? 0 }, cameraGeometry).cropCenterX : 50 + Math.max(-45, Math.min(45, activeClip?.targetTiltY ?? 0)) * 1.1}${(cameraMode === "zoom" || cameraTool3D === "camera") ? "px" : "%"}`, top: `${(cameraMode === "zoom" || cameraTool3D === "camera") ? getCameraFrame({ scale: activeTargetScale, cameraX: activeClip?.cameraX ?? 0, cameraY: activeClip?.cameraY ?? 0 }, cameraGeometry).cropCenterY : 50 - Math.max(-45, Math.min(45, (activeClip?.targetTiltX ?? 0) + focusTilt)) * 1.1}${(cameraMode === "zoom" || cameraTool3D === "camera") ? "px" : "%"}` }} /><span className="tilt-preview-label">Tilt preview</span></div>
          )}
          {cameraMode === "zoom" && cameraTool2D === "camera" && <Slider label="Zoom" value={focusZoom} min={.45} max={4} step={.01} unit="×" onChange={(value) => { if (!activeClip) return; const updated = { ...activeClip, zoom: value }; setFocusZoom(value); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} />}
          {cameraMode === "zoom" && cameraTool2D === "rotation" && <Slider label="Rotation" value={activeClip?.targetRotate ?? 0} min={-180} max={180} step={1} unit="°" onChange={(value) => { if (!activeClip) return; const updated = { ...activeClip, targetRotate: value }; setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} />}
          {cameraMode === "tilt" && cameraTool3D === "camera" && <Slider label="Zoom" value={focusZoom} min={.45} max={4} step={.01} unit="×" onChange={(value) => { if (!activeClip) return; const updated = { ...activeClip, zoom: value }; setFocusZoom(value); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} />}
          {cameraMode === "tilt" && cameraTool3D === "tilt" && <><Slider label="Tilt X" value={(activeClip?.targetTiltX ?? 0) + focusTilt} min={-45} max={45} step={1} unit="°" onChange={(value) => { if (!activeClip) return; const updated = { ...activeClip, targetTiltX: value, tilt: 0 }; setFocusTilt(0); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} /><Slider label="Tilt Y" value={activeClip?.targetTiltY ?? 0} min={-45} max={45} step={1} unit="°" onChange={(value) => { if (!activeClip) return; const updated = { ...activeClip, targetTiltY: value }; setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} /></>}
          {cameraMode === "tilt" && cameraTool3D === "roll" && <Slider label="Roll" value={activeClip?.targetRotate ?? 0} min={-180} max={180} step={1} unit="°" onChange={(value) => { if (!activeClip) return; const updated = { ...activeClip, targetRotate: value }; setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} />}
<AnimatePresence>{precisionOpen && <motion.div className="precision-controls" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><Slider label="Hold" value={animationHold} min={0} max={Math.min(3, (activeClip?.duration ?? animationDuration) * .3)} step={.1} unit="s" onChange={(hold) => { if (!activeClip) return; const updated = { ...activeClip, hold }; setAnimationHold(hold); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} />{activeClip?.easing === "spring" && <Slider label="Spring speed" value={springSpeed} min={.3} max={2} step={.1} unit="×" onChange={(speed) => { if (!activeClip) return; const updated = { ...activeClip, springSpeed: speed }; setSpringSpeed(speed); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} />}</motion.div>}</AnimatePresence>
<div className="section-label camera-label">Destination preset</div><div className="layout-presets">{mockupPresets.map((preset) => <button key={preset.id} onClick={() => { if (!activeClip) return; const updated = { ...activeClip, presetId: preset.id, label: cameraMode === "tilt" ? "Tilt" : "Zoom", targetX: activeClip.targetX, targetY: activeClip.targetY, targetTiltX: preset.settings.tiltX, targetTiltY: preset.settings.tiltY, targetRotate: preset.settings.rotate, cameraX: preset.settings.cameraX, cameraY: preset.settings.cameraY }; setFocusPresetId(preset.id); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} className={`layout-preset ${preset.id} ${focusPresetId === preset.id ? "selected" : ""}`}><CameraPresetPreview recipe={recipe} mockup={mockup} geometry={cameraGeometry} preset={preset} /><em>{preset.id === basePresetId ? "Same as base" : preset.label}</em></button>)}</div>
        </aside>
        <AnimatePresence>
          {editorMode === "animation" && <motion.section className="timeline-composer" initial={{ y: 36, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 36, opacity: 0 }} transition={{ type: "spring", stiffness: 280, damping: 28 }}>
            <div className="composer-toolbar"><button className="timeline-back" onClick={selectBaseMedia}>Edit mockup</button><button className="composer-add" onClick={addAnimationClip}>+ Add animation</button><button className="timeline-play" onClick={playMotionPreview} aria-label={isTimelinePlaying ? "Pause timeline" : "Play timeline"}>{isTimelinePlaying ? <Pause /> : <Play />}</button><span className="timeline-time">{Math.floor(playhead / 60)}:{(playhead % 60).toFixed(1).padStart(4, "0")} / {baseDuration.toFixed(1)}s</span><button className="timeline-export" onClick={() => { setExportTab("video"); setExportOpen(true); }}><Video /> Export 1080p</button></div>
            <div className="composer-ruler" onPointerDown={seekTimeline}>{Array.from({ length: baseDuration + 1 }, (_, index) => <span key={index} style={{ left: `${index / baseDuration * 100}%` }}>{index === 0 ? "0:00" : `0:0${index}`}</span>)}</div>
<div className="composer-lanes"><div className="composer-lane-label">Animations</div><div ref={animationTrackRef} className="composer-track animation-lane" onPointerDown={seekTimeline}>{animationClips.map((clip) => <button key={clip.id} type="button" className={`composer-clip ${activeClipId === clip.id ? "active" : ""} ${clip.hidden ? "is-hidden" : ""}`} style={{ left: `${clip.start / baseDuration * 100}%`, width: `${clip.duration / baseDuration * 100}%` }} onClick={() => selectAnimationClip(clip)} onContextMenu={(event) => openClipMenu(event, clip)} onPointerDown={(event) => beginClipGesture(event, clip, "move")}><span className="clip-handle clip-handle-left" data-drag="move" /><span>{clip.label}{clip.hidden ? " · Hidden" : ""}</span><small>{clip.duration.toFixed(1)}s</small><span className="clip-handle clip-handle-right" data-drag="resize" onPointerDown={(event) => beginClipGesture(event, clip, "resize")} /></button>)}{orderedClips.map((clip, index) => { const next = orderedClips[index + 1]; return clip.exit === "next" && next && Math.abs(clip.start + clip.duration - next.start) < .11 ? <i key={`${clip.id}-link`} className="clip-link" style={{ left: `${(clip.start + clip.duration) / baseDuration * 100}%`, width: "14px" }} /> : null; })}<button className="composer-plus" onClick={addAnimationClip}>+</button><i className="timeline-playhead" style={{ left: `${playhead / baseDuration * 100}%` }} /></div><div className="composer-lane-label media-label">Base media</div><div className="composer-track media-lane" onPointerDown={seekTimeline}><button type="button" aria-pressed={activeClipId === null} className="base-media-clip" onPointerDown={(event) => { event.stopPropagation(); selectBaseMedia(); }} onClick={selectBaseMedia}><i />Mockup <b>{mockup.media ? "Screenshot" : "Demo media"} · {baseDuration.toFixed(1)}s</b><span>Edit mockup</span></button><i className="timeline-playhead" style={{ left: `${playhead / baseDuration * 100}%` }} /></div></div>
          </motion.section>}
        </AnimatePresence>
      </>}
      <section className={`canvas-area${tab === "mockup" ? " is-mockup" : ""}`}>
        <div className="canvas-frame">
          <ShaderCanvas recipe={recipe} frozen={frozen || exportOpen || mockupExportOpen} onError={setError} />
          {error && <div className="canvas-error"><CircleHelp /> Shader error — open Code to repair it.</div>}
        </div>
        <AnimatePresence initial={false}>
          <motion.div
            key={tab === "mockup" ? "chrome-below" : "chrome-overlay"}
            className={`canvas-chrome${tab === "mockup" ? " is-below" : ""}`}
            initial={{ opacity: 0, y: tab === "mockup" ? 8 : 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={`canvas-meta ${frozen ? "is-frozen" : "is-live"}`}><span className={frozen ? "frozen-dot" : "live-dot"} aria-hidden="true" />{frozen ? "FROZEN" : "LIVE"} <b>{activeLabel}</b></div>
            <div className="canvas-dock">
              <button data-tooltip="Create a completely new shader recipe" onClick={inspire}><CircleHelp /> Inspire</button>
              <button data-tooltip="Keep the style and settings; choose new colours" onClick={recolour}><Droplets /> Recolour</button>
              <button data-tooltip="Keep the style and colours; replace only the settings" onClick={remix}><WandSparkles /> Remix</button>
              <button data-tooltip="Choose a new shader style while keeping the palette" onClick={restyle}><WandSparkles /> Restyle</button>
              <button data-tooltip={frozen ? "Resume the live preview" : "Freeze the live preview"} onClick={() => setFrozen((value) => !value)} aria-pressed={frozen}>{frozen ? <Play /> : <Pause />}{frozen ? "Play" : "Freeze"}</button>
            </div>
          </motion.div>
        </AnimatePresence>
      </section>
    </section>
    {saveOpen && <div className="modal-backdrop" role="presentation"><div className="save-modal" role="dialog" aria-modal="true" aria-labelledby="save-title"><button className="close" onClick={() => setSaveOpen(false)} aria-label="Close"><X /></button><h2 id="save-title">Save recipe</h2><p>Keep this shader configuration in this browser for later remixing.</p><input autoFocus value={saveName} onChange={(event) => setSaveName(event.target.value)} onKeyDown={(event) => event.key === "Enter" && save()} /><button className="button primary wide" onClick={save}><Save /> Save locally</button></div></div>}
    {skillOpen && <div className="modal-backdrop" role="presentation"><div className="export-modal skill-modal" role="dialog" aria-modal="true" aria-labelledby="skill-title" onKeyDown={(event) => event.key === "Escape" && setSkillOpen(false)}><button className="close" onClick={() => setSkillOpen(false)} aria-label="Close"><X /></button><div className="export-modal-header"><div className="export-header"><div><span className="eyebrow">DOWNLOADABLE SKILL</span><h2 id="skill-title">Landing Page Shader System</h2><p>Copy this skill into Codex to guide a cohesive hero-to-footer shader system.</p></div><BookOpen /></div></div><div className="export-modal-body"><SourceSurface title="SKILL.md" helper="It asks for a palette or reference shader, proposes the full visual system, then waits for confirmation before creating recipes." source={landingPageShaderSystemSkill} footer={<button className="button primary wide" onClick={() => copyText(landingPageShaderSystemSkill, "Skill copied")}><Copy /> Copy skill</button>} /></div></div></div>}
    {exportOpen && <div className="modal-backdrop" role="presentation"><div className="export-modal" role="dialog" aria-modal="true" aria-labelledby="export-title"><button className="close" onClick={() => setExportOpen(false)} aria-label="Close"><X /></button><div className="export-modal-header"><div className="export-header"><div><span className="eyebrow">READY TO SHIP</span><h2 id="export-title">Export shader</h2><p>Take the current look into your project in the format you need.</p></div><ImageDown /></div><div className="export-tabs" role="tablist">{(["image", "video", "prompt", "react", "glsl"] as ExportTab[]).map((item) => <button key={item} className={exportTab === item ? "active" : ""} onClick={() => setExportTab(item)} role="tab" aria-selected={exportTab === item}>{item === "image" ? "Image" : item === "video" ? "Animation" : item === "prompt" ? "Prompt" : item === "react" ? "React code" : "GLSL"}</button>)}</div></div><div className="export-modal-body">{exportTab === "image" && <ImageExportPanel recipe={recipe} settings={videoSettings} onSettingsChange={updateVideoSettings} onExport={exportPng} description="Cursor interactions are excluded from exports." />}{exportTab === "video" && <FullVideoExportPanel recipe={recipe} settings={videoSettings} onSettingsChange={updateVideoSettings} onExport={exportVideo} videoProgress={videoProgress} />}{exportTab === "prompt" && <SourceSurface title="Build prompt" helper="A complete implementation prompt generated from the active shader configuration." source={buildPrompt()} footer={<><button className="button primary wide" onClick={() => copyText(buildPrompt(), "Build prompt copied")}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy prompt"}</button><button className="button wide ghost" onClick={() => exportText(buildPrompt(), "shader-studio-prompt.txt", "text/plain")}><Download /> Download .txt</button></>} />}{exportTab === "react" && <SourceSurface title="React component" helper={isPaperStyle(recipe.style) ? "A Paper Design component configured with your current palette, motion, and surface settings." : "A self-contained recipe and fragment shader ready to paste into a client component."} source={reactCode} footer={<><button className="button primary wide" onClick={() => copyText(reactCode, "React component copied")}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy React code"}</button><button className="button wide ghost" onClick={() => exportText(reactCode, "shader-studio-shader.ts", "text/plain")}><Download /> Download .ts</button></>} />}{exportTab === "glsl" && <SourceSurface title="Fragment GLSL" helper={isPaperStyle(recipe.style) ? "Paper Design shaders ship with internal GLSL. Use React export for production code." : "The exact fragment shader currently driving the preview."} source={glslExportSource} footer={<><button className="button primary wide" onClick={() => copyText(glslExportSource, isPaperStyle(recipe.style) ? "Paper props copied" : "GLSL copied")}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : isPaperStyle(recipe.style) ? "Copy props" : "Copy GLSL"}</button><button className="button wide ghost" onClick={() => exportText(glslExportSource, isPaperStyle(recipe.style) ? "shader-studio-paper-props.json" : "shader-studio-shader.glsl", isPaperStyle(recipe.style) ? "application/json" : "text/plain")}><Download /> Download {isPaperStyle(recipe.style) ? ".json" : ".glsl"}</button></>} />}</div></div></div>}
    {mockupExportOpen && <div className="modal-backdrop" role="presentation"><div className="export-modal mockup-export-modal" role="dialog" aria-modal="true" aria-labelledby="mockup-export-title"><button className="close" onClick={() => setMockupExportOpen(false)} aria-label="Close"><X /></button><div className="export-modal-header"><div className="export-header"><div><span className="eyebrow">READY TO SHIP</span><h2 id="mockup-export-title">Export shader</h2><p>Choose a shader-only or composed mockup output.</p></div><ImageDown /></div><div className="export-tabs" role="tablist"><button className={exportTab === "image" ? "active" : ""} onClick={() => setExportTab("image")}>Image</button><button className={exportTab === "video" ? "active" : ""} onClick={() => setExportTab("video")}>Animation</button><button className={exportTab === "mockup" ? "active" : ""} onClick={() => setExportTab("mockup")} disabled={!mockup.visible}>Mockup</button><button onClick={() => { setMockupExportOpen(false); setExportTab("prompt"); setExportOpen(true); }}>Prompt</button><button onClick={() => { setMockupExportOpen(false); setExportTab("react"); setExportOpen(true); }}>React code</button><button onClick={() => { setMockupExportOpen(false); setExportTab("glsl"); setExportOpen(true); }}>GLSL</button></div></div><div className="export-modal-body">{exportTab === "image" && <ImageExportPanel recipe={recipe} settings={videoSettings} onSettingsChange={updateVideoSettings} onExport={exportPng} description="Captures the shader only." />}{exportTab === "video" && <CompactVideoExportPanel recipe={recipe} settings={videoSettings} onSettingsChange={updateVideoSettings} onExport={exportVideo} videoProgress={videoProgress} />}{exportTab === "mockup" && <><div className="export-mode-toggle" role="tablist"><button className={mockupExportMode === "image" ? "active" : ""} onClick={() => setMockupExportMode("image")}>Image</button><button className={mockupExportMode === "video" ? "active" : ""} onClick={() => setMockupExportMode("video")}>Video</button></div><div className="mockup-export"><div className="export-preview mockup-export-preview" style={{ "--export-preview-aspect": exportPreviewAspect(videoSettings.aspect) } as CSSProperties}><ShaderCanvas recipe={recipe} frozen={false} onError={() => undefined} /><div className={`mockup-export-card chrome-${mockup.chrome} border-${mockup.borderStyle}`} style={{ borderRadius: mockup.radius, ["--mockup-radius"]: `${mockup.radius}px`, transform: `translate(${mockup.x / 2}%, ${mockup.y / 2}%) rotate(${mockup.rotate}deg) scale(${Math.max(.5, mockup.scale)})` } as CSSProperties}>{mockup.media && mockup.mediaType === "image" ? <img src={mockup.media} alt="Mockup export preview" /> : <div className="mockup-demo"><h1>Your product</h1></div>}</div></div><div className="mockup-export-controls"><h3>{mockupExportMode === "image" ? "Mockup PNG" : "Animated mockup video"}</h3><label>Aspect<select value={videoSettings.aspect} onChange={(event) => updateVideoSettings({ aspect: event.target.value as VideoExportSettings["aspect"] })}><option value="16:9">16:9</option><option value="1:1">1:1</option><option value="9:16">9:16</option></select></label>{mockupExportMode === "image" ? <><label>Resolution<select value={mockupImageHeight} onChange={(event) => setMockupImageHeight(Number(event.target.value) as 720 | 1080 | 1440)}><option value={720}>720p</option><option value={1080}>1080p</option><option value={1440}>1440p</option></select></label><button className="button primary wide" onClick={exportMockupImage}><ImageDown /> Download mockup PNG</button></> : <><label>Resolution<select value={videoSettings.height} onChange={(event) => updateVideoSettings({ height: Number(event.target.value) as VideoExportSettings["height"] })}><option value={480}>480p</option><option value={720}>720p</option><option value={1080}>1080p</option></select></label><label>Duration<select value={videoSettings.duration} onChange={(event) => updateVideoSettings({ duration: Number(event.target.value) as VideoExportSettings["duration"] })}><option value={2}>2 s</option><option value={3}>3 s</option><option value={5}>5 s</option></select></label><button className="button primary wide" onClick={exportMockupVideo} disabled={videoProgress !== null}><Video /> Export mockup video</button></>}</div></div></>}</div></div></div>}

    {clipMenu && menuClip && <div className="clip-context-menu" style={{ left: clipMenu.x, top: clipMenu.y }} role="menu" onContextMenu={(event) => event.preventDefault()}>
      <button type="button" role="menuitem" onClick={() => runClipMenuAction(() => duplicateClip(menuClip))}><CopyPlus /><span>Duplicate</span><kbd>{modKey}D</kbd></button>
      <button type="button" role="menuitem" onClick={() => runClipMenuAction(() => copyClip(menuClip))}><Copy /><span>Copy</span><kbd>{modKey}C</kbd></button>
      <button type="button" role="menuitem" onClick={() => runClipMenuAction(() => cutClip(menuClip))}><Scissors /><span>Cut</span><kbd>{modKey}X</kbd></button>
      <button type="button" role="menuitem" onClick={() => runClipMenuAction(() => toggleClipHidden(menuClip))}>{menuClip.hidden ? <Eye /> : <EyeOff />}<span>{menuClip.hidden ? "Show" : "Hide"}</span><kbd>{modKey}⇧H</kbd></button>
      <div className="clip-context-separator" />
      <button type="button" role="menuitem" disabled={!canSmartSplit} onClick={() => runClipMenuAction(() => smartSplitClip(menuClip))}><SplitSquareHorizontal /><span>Smart Split</span><kbd>S</kbd></button>
      <div className="clip-context-separator" />
      <button type="button" role="menuitem" className="danger" onClick={() => runClipMenuAction(() => deleteClip(menuClip))}><Trash2 /><span>Delete</span><kbd>⌫</kbd></button>
    </div>}
  </main>;
}
