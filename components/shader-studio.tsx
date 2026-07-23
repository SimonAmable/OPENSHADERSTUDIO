"use client";

import { ChangeEvent, ComponentType, CSSProperties, DragEvent, MouseEvent, PointerEvent, ReactNode, RefObject, useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, Reorder, useDragControls } from "framer-motion";
import { ColorPanels, Dithering, DotGrid, DotOrbit, GodRays, GrainGradient, MeshGradient, Metaballs, NeuroNoise, PerlinNoise, PulsingBorder, SimplexNoise, SmokeRing, Spiral, StaticMeshGradient, StaticRadialGradient, Swirl, Voronoi, Warp, Waves } from "@paper-design/shaders-react";
import {
  BookOpen, Check, ChevronDown, CircleHelp, Code2, Copy, CopyPlus, Dices, Download, Droplets, Eye, EyeOff,
  Gauge, ImageDown, Info, Layers3, MousePointer2, Palette, Pause, Play, Redo2, RefreshCcw,
  GripVertical, Minus, Pipette, Plus, Save, Scissors, Search, Settings2, Share2, Sparkles, SplitSquareHorizontal, Trash2, Undo2, Video, WandSparkles, X,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { landingPageShaderSystemSkill } from "./landing-page-shader-system-skill";
import { motionDemoSkill } from "./motion-demo-skill";

import type { AnimationClip, AsciiStyleId, CameraGeometry, CameraMode, CameraTool2D, CameraTool3D, ClipAnchor, ClipClipboard, ClipMenuState, CursorEffect, EditorMode, ExitStyle, ExportTab, MediaFilterId, MediaSource, MockupAspect, MockupBorderStyle, MockupChrome, MockupExportMode, MockupPanelSection, MockupSettings, OutputAspect, Recipe, SavedPalette, Tab, ThemeOption, ThreeMaterialId, ThreeObjectId, ThreeSceneMode, ThreeScenePresetId, TypeBlock, VideoExportSettings, VisualKind, VisualSection } from "./shader-studio/types";
import { MAX_TYPE_BLOCKS, TypeCanvasLayer, TypePanel, createTypeBlock, resolveTypeZOrder, typePresets } from "./shader-studio/type-layer";
import { drawTypeBlocksToCanvas, partitionTypeBlocksForExport } from "./shader-studio/type-export";
import { useStudioStore } from "./shader-studio/store";
import { cameraDeltaFromPadDrag, cameraFromNavigatorCenter, emptyCameraGeometry, getCameraFrame, getCameraNavigatorSnapPoints, getNavigatorCenter, getPanoramaCameraFrame, resolveNavigatorHoverCenter, type CameraNavigatorHoverSnap } from "./shader-studio/geometry";
import { mockupBorderStyles, mockupChromeStyles, mockupChromeThemes, outputFrames, videoFormats } from "./shader-studio/constants";
import { loopExportDuration, loopExportFrameCount, loopFrameIndexes, shaderOutputSize, exportPreviewAspect } from "./shader-studio/export-utils";
import { renderExportShaderCanvas, createThreeExportSurface, drawThreeExportFrame } from "./shader-studio/export-render";
import { inspireRecipe, recolourRecipe, remixRecipe, restyleRecipe, varyRecipe } from "./shader-studio/randomize";
import { VariationsExportPanel } from "./shader-studio/variations-export";
import { PalettePanel, PalettePreview } from "./shader-studio/palette-panel";
import { Slider } from "./shader-studio/slider";
import { mediaFilterGroups, mediaFilterNames, mediaPaperProps, isPaperMediaFilter } from "./shader-studio/media-catalog";
import { getMediaSurfaceSummary } from "./shader-studio/media-surface-controls";
import { MediaSurfacePanel } from "./shader-studio/media-surface-panel";
import { createMediaPaperExportSurface, createVfxMediaExportSurface, renderMediaFrameToCanvas, resolveMediaImageForExport } from "./shader-studio/media-export";
import { defaultMediaSource, resolveMediaSource, samplesForKind } from "./shader-studio/samples";
import { asciiStyleGroups, asciiStyleNames } from "./shader-studio/ascii-catalog";
import { AsciiSurfacePanel } from "./shader-studio/ascii-surface-panel";
import { AsciiMotionPanel, asciiMotionSummary } from "./shader-studio/ascii-motion-panel";
import { renderAsciiFrameToCanvas } from "./shader-studio/ascii-export";
import { getAsciiSurfaceSummary } from "./shader-studio/ascii-surface-controls";
import {
  DEFAULT_THREE_MATERIAL,
  DEFAULT_THREE_OBJECT,
  threeMaterialGroups,
  threeMaterialNames,
  threeObjectNames,
  threeSceneLabel,
} from "./shader-studio/three-catalog";
import { threeScenePresetGroups, threeScenePresetNames } from "./shader-studio/three-scene-catalog";
import { getSceneSurfaceSummary, sceneModeLabel } from "./shader-studio/three-scene-surface";
import { resolveThreeObjects } from "./shader-studio/three-scene-objects";
import {
  applyObjectMaterial,
  applyObjectModelUpload,
  applyObjectShape,
  clearObjectModelUpload,
  ThreeObjectPanel,
} from "./shader-studio/three-object-panel";
import { ThreeSurfacePanel } from "./shader-studio/three-surface-panel";
import { renderThreeFrameToCanvas } from "./shader-studio/three-canvas";
import {
  buildSceneGlslExport,
  buildScenePrompt,
  buildSceneReactExport,
} from "./shader-studio/three-materials/scene-export";
import { isThreeShaderMaterial } from "./shader-studio/three-materials";
import { normalizeRecipe } from "./shader-studio/normalize-recipe";
import { extractMagicColors, makeMagicPalettes, makeMagicVisuals, type MagicPalette, type MagicVisual } from "./shader-studio/magic-background";
import { clearMagicThumbnailCache, useMagicThumbnails } from "./shader-studio/magic-thumbnails";
import { SafariBrowserBar, drawSafariBrowserChrome, BROWSER_CHROME_BASE_HEIGHT } from "./shader-studio/browser-chrome";
import { AboutModalBackdrop } from "./shader-studio/about/about-modal";
export { MediaThumbnail, SceneObjectThumbnail, ScenePresetThumbnail, StaticAsciiPreview, StaticMediaPreview, StaticSceneMaterialPreview, StaticSceneObjectPreview, StaticStylePreview } from "./shader-studio/canvas";
export { resolveMediaPreviewFilter } from "./shader-studio/media-catalog";
export { resolveAsciiPreviewStyle } from "./shader-studio/preview-recipes";
export { resolveThreePreviewMaterial, resolveThreePreviewObject } from "./shader-studio/three-catalog";

const MIN_CLIP_DURATION = .6;
const MIN_TRAVEL = .12;
/** Budget reserved so inbound travel cannot starve the return-to-base phase (~0.5s minimum on typical clips). */
const EXIT_RESERVE = .5;
const SHARED_SHADER_PARAM = "shader";
const SHARE_VERSION = 2;
const ABOUT_SEEN_KEY = "shader-studio-about-seen";
const isApplePlatform = typeof navigator !== "undefined" && /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent);

function mockupDropShadow(shadow: number) {
  if (shadow <= 0) return "none";
  return `0 ${18 + shadow / 3}px ${35 + shadow}px rgba(0,0,0,${.2 + shadow / 160})`;
}

function applyMockupCanvasShadow(context: CanvasRenderingContext2D, shadow: number) {
  if (shadow <= 0) {
    context.shadowColor = "transparent";
    context.shadowBlur = 0;
    context.shadowOffsetY = 0;
    return;
  }
  context.shadowColor = `rgba(0,0,0,${.2 + shadow / 160})`;
  context.shadowBlur = 16 + shadow;
  context.shadowOffsetY = 8 + shadow / 3;
}
const modKey = isApplePlatform ? "⌘" : "Ctrl";

import { SAVED_PALETTES_KEY, SAVED_RECIPES_KEY, RESUME_RECIPE_KEY, AsciiThumbnail, MediaThumbnail, SavedRecipePreview, SceneObjectThumbnail, ScenePresetThumbnail, SceneThumbnail, ShaderCanvas, ShaderThumbnail, StaticStylePreview, appPresets, buildThemeOptions, capitalizeWords, companyThemeKey, companyThemes, createPaperExportSurface, defaultRecipe, drawPaperShaderToCanvas, exportExtensionForMime, exportVideoBitrate, formatPaperPropsForExport, fragmentShader, hexToRgb, isPaperStyle, isStagePreviewBroken, mockupPresets, palettes, paperProps, paperShaderNames, presetGroups, presetSettings, queryShaderCanvas, queryVisualCanvas, recordCanvasAnimation, savedThemeKey, styleNames, tabs } from "./shader-studio/canvas";

type SharedRecipe = Omit<Recipe, "id" | "glsl"> & { v: number };

const aboutRecipe: Recipe = normalizeRecipe({
  id: "about-plasma",
  name: "Plasma",
  kind: "shader",
  style: 9,
  palette: ["#060914", "#273DFF", "#00DDFF", "#FFDE00", "#FF0000", "#000000"],
  intensity: .8,
  zoom: 1.12,
  warp: .97,
  contrast: .63,
  speed: 2.04,
  drift: .65,
  blur: 0,
  animate: true,
  reverse: false,
  grain: .0612,
  rotate: 132 * Math.PI / 180,
  offsetX: -.42,
  offsetY: .49,
  seed: 1,
  smoothBlend: false,
  cursorEnabled: true,
  cursorEffect: "spotlight",
  cursorStrength: .46,
  cursorRadius: .21,
  glsl: fragmentShader,
}, fragmentShader);

const aboutInfoRecipe: Recipe = { ...aboutRecipe, id: "about-info-plasma", cursorEnabled: false };

function encodeSharedRecipe(recipe: Recipe) {
  const { id: _id, glsl: _glsl, mediaSource, threeModelUpload: _upload, ...settings } = recipe;
  // Prefer sample ids over large upload payloads in share links.
  const shareSource = mediaSource?.type === "sample" ? mediaSource : mediaSource?.type === "upload" ? null : mediaSource;
  const bytes = new TextEncoder().encode(JSON.stringify({ v: SHARE_VERSION, ...settings, mediaSource: shareSource, threeModelUpload: null } satisfies SharedRecipe));
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
      (shared.v !== SHARE_VERSION && shared.v !== 1)
      || typeof shared.name !== "string"
      || typeof shared.style !== "number"
      || !Number.isInteger(shared.style)
      || !Array.isArray(shared.palette)
      || shared.palette.length < 2
      || shared.palette.length > 8
      || !shared.palette.every((color) => typeof color === "string")
      || !validCursorEffects.includes(shared.cursorEffect as CursorEffect)
    ) return null;
    if (shared.kind === "ascii" || shared.kind === "media" || shared.kind === "3d") {
      const { v: _version, ...settings } = shared;
      return normalizeRecipe({ ...settings, glsl: fragmentShader }, fragmentShader);
    }
    if (shared.kind !== "shader" && !(shared.style in presetSettings)) return null;
    const { v: _version, ...settings } = shared;
    return normalizeRecipe({ ...settings, glsl: fragmentShader }, fragmentShader);
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

function exportTabLabel(tab: ExportTab) {
  switch (tab) {
    case "image": return "Image";
    case "video": return "Animation";
    case "variations": return "Variations";
    case "mockup": return "Mockup";
    case "prompt": return "Prompt";
    case "react": return "React code";
    case "glsl": return "GLSL";
    default: {
      const _exhaustive: never = tab;
      return _exhaustive;
    }
  }
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
  return <div className="video-export"><ExportShaderPreview recipe={recipe} aspect={settings.aspect} /><div className="video-controls"><ExportAspectSelect value={settings.aspect} onChange={(aspect) => onSettingsChange({ aspect })} /><label>Format<select value={settings.mimeType} onChange={(event) => onSettingsChange({ mimeType: event.target.value })}>{videoFormats.map((format) => <option key={format.value} value={format.value}>{format.label}</option>)}</select></label><ExportResolutionSelect value={settings.height} onChange={(height) => onSettingsChange({ height })} /><label>Frame rate<select value={settings.fps} onChange={(event) => onSettingsChange({ fps: Number(event.target.value) as VideoExportSettings["fps"] })}><option value={24}>24 fps</option><option value={30}>30 fps</option><option value={60}>60 fps</option></select></label><label className="video-duration">Duration<select value={settings.duration} onChange={(event) => onSettingsChange({ duration: Number(event.target.value) as VideoExportSettings["duration"] })}><option value={2}>2 s</option><option value={3}>3 s</option><option value={5}>5 s</option><option value={8}>8 s</option></select></label><VideoLoopToggle settings={settings} onSettingsChange={onSettingsChange} /><p className="video-note">{size.width} × {size.height} px · {loopExportFrameCount(settings)} exact frames · WebCodecs when available. Cursor interactions are excluded from exports.</p><button type="button" className="button primary wide" onClick={onExport} disabled={videoProgress !== null}><Video /> {videoProgress === null ? "Export video" : `Rendering ${Math.round(videoProgress * 100)}%`}</button></div></div>;
}

function CompactVideoExportPanel({ recipe, settings, onSettingsChange, onExport, videoProgress }: { recipe: Recipe; settings: VideoExportSettings; onSettingsChange: (update: Partial<VideoExportSettings>) => void; onExport: () => void; videoProgress: number | null }) {
  return <div className="video-export"><ExportShaderPreview recipe={recipe} aspect={settings.aspect} /><div className="video-controls"><ExportAspectSelect value={settings.aspect} onChange={(aspect) => onSettingsChange({ aspect })} /><ExportResolutionSelect value={settings.height} onChange={(height) => onSettingsChange({ height })} /><label className="video-duration">Duration<select value={settings.duration} onChange={(event) => onSettingsChange({ duration: Number(event.target.value) as VideoExportSettings["duration"] })}><option value={2}>2 s</option><option value={3}>3 s</option><option value={5}>5 s</option><option value={8}>8 s</option></select></label><VideoLoopToggle settings={settings} onSettingsChange={onSettingsChange} /><button type="button" className="button primary wide" onClick={onExport} disabled={videoProgress !== null}><Video /> {videoProgress === null ? "Export video" : `Rendering ${Math.round(videoProgress * 100)}%`}</button></div></div>;
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
  onSelectMediaFilter,
  onSelectAsciiStyle,
  onSelectThreeMaterial,
  onSelectThreeObject,
  onSelectKind,
  onPickSample,
  onUploadMedia,
  onUploadModel,
  onClearModelUpload,
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
  onSelectMediaFilter: (id: MediaFilterId, label: string) => void;
  onSelectAsciiStyle: (id: AsciiStyleId, label: string) => void;
  onSelectThreeMaterial: (id: ThreeMaterialId, label: string) => void;
  onSelectThreeObject: (id: ThreeObjectId) => void;
  onSelectKind: (kind: VisualKind) => void;
  onPickSample: (sampleId: string) => void;
  onUploadMedia: (file: File) => void;
  onUploadModel: (file: File) => void;
  onClearModelUpload: () => void;
}) {
  const [openSection, setOpenSection] = useState<VisualSection | null>("style");
  const itemRefs = useRef<Partial<Record<VisualSection, HTMLDivElement | null>>>({});
  const scrollRefs = useRef<Partial<Record<VisualSection, HTMLDivElement | null>>>({});
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);
  const isAscii = recipe.kind === "ascii";
  const isMedia = recipe.kind === "media";
  const isScene = recipe.kind === "3d";
  const hasSource = isMedia || isAscii || isScene;
  const samples = samplesForKind(isAscii ? "ascii" : "media");
  const resolvedSource = resolveMediaSource(recipe.mediaSource);

  useEffect(() => {
    if (!hasSource && openSection === "source") setOpenSection("style");
  }, [hasSource, openSection]);

  const openSectionAt = (id: VisualSection) => {
    if (id === openSection) {
      setOpenSection(null);
      return;
    }
    setOpenSection(id);
    requestAnimationFrame(() => {
      const scroller = scrollRefs.current[id];
      if (scroller) scroller.scrollTop = 0;
      itemRefs.current[id]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    });
  };

  const sourceLabel = (() => {
    if (isScene) {
      if (recipe.threeSceneMode === "preset") {
        return threeScenePresetNames[recipe.threeScenePreset] ?? "Scene preset";
      }
      const objects = resolveThreeObjects(recipe);
      if (objects.length > 1) return `${objects.length} objects`;
      if (recipe.threeModelUpload) return "Uploaded GLB";
      return threeObjectNames[recipe.threeObject] ?? "Object";
    }
    if (!resolvedSource || !recipe.mediaSource) return "No media";
    const source = recipe.mediaSource;
    if (source.type === "sample") {
      return samples.find((sample) => sample.id === source.sampleId)?.label
        ?? (resolvedSource.mediaType === "video" ? "Video sample" : "Image sample");
    }
    return resolvedSource.mediaType === "video" ? "Uploaded video" : "Uploaded image";
  })();
  const surfaceSummary = isAscii
    ? getAsciiSurfaceSummary(recipe.asciiStyle, recipe)
    : isMedia
    ? getMediaSurfaceSummary(recipe.mediaFilter, recipe)
    : isScene
    ? getSceneSurfaceSummary(recipe)
    : `Intensity ${Math.round(recipe.intensity * 100)}% · Grain ${Math.round(recipe.grain / .12 * 100)}%`;
  const motionSummary = isAscii
    ? asciiMotionSummary(recipe)
    : recipe.animate ? `On · ${recipe.speed.toFixed(1)}× speed` : "Static";
  const cursorSummary = recipe.cursorEnabled
    ? (isScene ? "Light follow" : recipe.cursorEffect)
    : "Off";

  const sections: { id: VisualSection; label: string; icon: ComponentType<{ size?: number; strokeWidth?: number }>; summary: string; preview?: ReactNode }[] = [
    ...(hasSource ? [{
      id: "source" as const,
      label: "Source",
      icon: ImageDown,
      summary: sourceLabel,
      preview: isScene ? (
        <span className="style-chip scene-source-chip" data-object={recipe.threeObject}>
          {recipe.threeSceneMode === "preset"
            ? <ScenePresetThumbnail preset={recipe.threeScenePreset} swatch={threeScenePresetGroups.flatMap((g) => g.items).find((item) => item.id === recipe.threeScenePreset)?.swatch ?? "#10131f"} />
            : <SceneThumbnail material={recipe.threeMaterial} />}
        </span>
      ) : resolvedSource ? (
        <span className="style-chip media-source-chip">
          {resolvedSource.mediaType === "video"
            ? <video src={resolvedSource.url} muted playsInline preload="metadata" />
            : <img src={resolvedSource.url} alt="" />}
        </span>
      ) : undefined,
    }] : []),
    {
      id: "style",
      label: "Style",
      icon: WandSparkles,
      summary: activeLabel,
      preview: isAscii
        ? <span className="style-chip"><AsciiThumbnail style={recipe.asciiStyle} /></span>
        : isMedia
        ? <span className="style-chip"><MediaThumbnail filter={recipe.mediaFilter} /></span>
        : isScene
        ? <span className="style-chip">{recipe.threeSceneMode === "preset"
          ? <ScenePresetThumbnail preset={recipe.threeScenePreset} swatch={threeScenePresetGroups.flatMap((g) => g.items).find((item) => item.id === recipe.threeScenePreset)?.swatch ?? "#10131f"} />
          : <SceneThumbnail material={recipe.threeMaterial} />}</span>
        : <span className="style-chip"><ShaderThumbnail style={recipe.style} /></span>,
    },
    { id: "surface", label: "Surface", icon: Layers3, summary: surfaceSummary },
    { id: "palette", label: "Palette", icon: Palette, summary: `${recipe.palette.length} stops · ${recipe.smoothBlend ? "Smooth blend" : "Linear blend"}`, preview: <>{recipe.palette.slice(0, 4).map((color) => <i key={color} className="palette-chip" style={{ background: color }} />)}</> },
    { id: "motion", label: "Motion", icon: Gauge, summary: motionSummary },
    { id: "cursor", label: "Cursor", icon: MousePointer2, summary: cursorSummary },
  ];

  const renderSectionContent = (section: VisualSection) => {
    switch (section) {
      case "source":
        if (isScene && recipe.threeSceneMode === "objects") {
          return (
            <ThreeObjectPanel
              recipe={recipe}
              onChange={onChange}
              onUploadModel={onUploadModel}
              onSelectObjectShape={onSelectThreeObject}
            />
          );
        }
        if (isScene) {
          return (
            <div className="panel-content">
              <p className="helper">Scene presets are composed R3F environments. Tune palette, motion, and surface controls to customize the look.</p>
            </div>
          );
        }
        return (
          <div className="panel-content">
            <p className="helper">{isAscii ? "Choose the image or video your ASCII style converts." : "Choose the image or video the Media transforms run on."}</p>
            <input ref={mediaInputRef} className="visually-hidden" type="file" accept="image/*,video/*" onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) onUploadMedia(file);
              event.target.value = "";
            }} />
            <div className="media-source-row">
              <button type="button" className="media-source-preview" onClick={() => mediaInputRef.current?.click()}>
                {resolvedSource?.mediaType === "video" ? (
                  <video src={resolvedSource.url} muted playsInline preload="metadata" />
                ) : resolvedSource ? (
                  <img src={resolvedSource.url} alt="" />
                ) : (
                  <span><ImageDown /><small>Upload</small></span>
                )}
              </button>
              <button type="button" className="button wide ghost" onClick={() => mediaInputRef.current?.click()}>
                {resolvedSource ? "Replace media" : "Upload media"}
              </button>
            </div>
            <div className="section-label">Samples</div>
            <div className="sample-strip">
              {samples.map((sample) => {
                const selected = recipe.mediaSource?.type === "sample" && recipe.mediaSource.sampleId === sample.id;
                return (
                  <button key={sample.id} type="button" className={`sample-card ${selected ? "selected" : ""}`} onClick={() => onPickSample(sample.id)} title={sample.label}>
                    {sample.type === "video" ? <video src={sample.path} muted playsInline preload="metadata" /> : <img src={sample.path} alt="" />}
                    <span>{sample.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      case "style":
        return (
          <div className="panel-content">
            {isAscii ? (
              <>
                <p className="helper">Pick an ASCII style preset. Cell size, coverage, charset, and blend map to Surface controls.</p>
                {asciiStyleGroups.map((group) => (
                  <section className="preset-group" key={group.title}>
                    <h3>{group.title}</h3>
                    <div className="preset-grid">
                      {group.items.map((style) => (
                        <button
                          key={style.id}
                          type="button"
                          onClick={() => onSelectAsciiStyle(style.id, style.label)}
                          className={`preset-card media-filter-card ${recipe.asciiStyle === style.id ? "selected" : ""}`}
                        >
                          <AsciiThumbnail style={style.id} />
                          <span className="media-filter-badge">A</span>
                          <span>{style.label}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
              </>
            ) : isMedia ? (
              <>
                <p className="helper">Pick a Paper or Digital transform. Shared knobs still drive the look.</p>
                {mediaFilterGroups.map((group) => (
                  <section className="preset-group" key={group.title}>
                    <h3>{group.title}</h3>
                    <div className="preset-grid">
                      {group.items.map((filter) => (
                        <button key={filter.id} type="button" onClick={() => onSelectMediaFilter(filter.id, filter.label)} className={`preset-card media-filter-card ${recipe.mediaFilter === filter.id ? "selected" : ""}`}>
                          <MediaThumbnail filter={filter.id} />
                          <span className="media-filter-badge">{filter.engine === "paper" ? "P" : "V"}</span>
                          <span>{filter.label}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
              </>
            ) : isScene ? (
              <>
                <p className="helper">Choose composed scene presets or switch to Compose to build multi-object arrangements.</p>
                <div className="scene-mode-toggle" role="tablist" aria-label="3D scene mode">
                  {(["preset", "objects"] as ThreeSceneMode[]).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      role="tab"
                      aria-selected={recipe.threeSceneMode === mode}
                      className={recipe.threeSceneMode === mode ? "selected" : ""}
                      onClick={() => onChange({
                        threeSceneMode: mode,
                        name: mode === "preset"
                          ? threeScenePresetNames[recipe.threeScenePreset] ?? "Scene preset"
                          : threeSceneLabel({ ...recipe, threeSceneMode: mode }),
                      })}
                    >
                      {sceneModeLabel(mode)}
                    </button>
                  ))}
                </div>
                {recipe.threeSceneMode === "preset" ? (
                  threeScenePresetGroups.map((group) => (
                    <section className="preset-group" key={group.title}>
                      <h3>{group.title}</h3>
                      <div className="preset-grid">
                        {group.items.map((preset) => (
                          <button
                            key={preset.id}
                            type="button"
                            onClick={() => onChange({
                              kind: "3d",
                              threeSceneMode: "preset",
                              threeScenePreset: preset.id,
                              name: preset.label,
                            })}
                            className={`preset-card media-filter-card ${recipe.threeScenePreset === preset.id ? "selected" : ""}`}
                          >
                            <ScenePresetThumbnail preset={preset.id} swatch={preset.swatch} />
                            <span className="media-filter-badge">FX</span>
                            <span>{preset.label}</span>
                          </button>
                        ))}
                      </div>
                    </section>
                  ))
                ) : (
                  <>
                    <p className="helper">Materials apply to the selected object. Add more objects in Source.</p>
                    {threeMaterialGroups.map((group) => (
                      <section className="preset-group" key={group.title}>
                        <h3>{group.title}</h3>
                        <div className="preset-grid">
                          {group.items.map((material) => {
                            const active = resolveThreeObjects(recipe).find((item) => item.id === recipe.threeActiveObjectId) ?? resolveThreeObjects(recipe)[0];
                            const selected = active?.material === material.id;
                            return (
                              <button
                                key={material.id}
                                type="button"
                                onClick={() => onSelectThreeMaterial(material.id, material.label)}
                                className={`preset-card media-filter-card ${selected ? "selected" : ""}`}
                              >
                                <SceneThumbnail material={material.id} />
                                <span className="media-filter-badge">S</span>
                                <span>{material.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </section>
                    ))}
                  </>
                )}
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        );
      case "palette":
        return <PalettePanel recipe={recipe} embedded selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} onChange={onChange} onApplyTheme={onApplyTheme} onRandomize={onRandomize} savedPalettes={savedPalettes} paletteName={paletteName} setPaletteName={setPaletteName} onSavePalette={onSavePalette} onDeletePalette={onDeletePalette} />;
      case "surface":
        return isAscii ? (
          <AsciiSurfacePanel recipe={recipe} onChange={onChange} />
        ) : isMedia ? (
          <MediaSurfacePanel recipe={recipe} onChange={onChange} />
        ) : isScene ? (
          <ThreeSurfacePanel recipe={recipe} onChange={onChange} />
        ) : (
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
        return isAscii
          ? <AsciiMotionPanel recipe={recipe} onChange={onChange} />
          : (
          <div className="panel-content">
            <div className="switch-row"><span>Animate</span><button type="button" className={`switch ${recipe.animate ? "on" : ""}`} onClick={() => onChange({ animate: !recipe.animate })} aria-pressed={recipe.animate}><i /></button></div>
            <Slider label="Speed" value={recipe.speed} min={0} max={3} unit="×" onChange={(speed) => onChange({ speed })} />
            <Slider label="Drift" value={recipe.drift} onChange={(drift) => onChange({ drift })} />
            <div className="switch-row"><span>Reverse</span><button type="button" className={`switch ${recipe.reverse ? "on" : ""}`} onClick={() => onChange({ reverse: !recipe.reverse })} aria-pressed={recipe.reverse}><i /></button></div>
            <p className="helper">{isScene ? "Speed spins the object; drift adds a gentle tilt. Freeze pauses motion." : isMedia ? "Speed drives filter motion; Freeze pauses digital effects and video." : "Drift controls how far the whole field wanders."}</p>
          </div>
        );
      case "cursor":
        return (
          <div className="panel-content">
            {isScene ? (
              <p className="helper">Pointer nudges the key light around the object — simplest way to relight the scene.</p>
            ) : isAscii ? (
              <p className="helper">Cursor boosts brightness near the pointer — great for spotlight and ripple on ASCII grids.</p>
            ) : isMedia ? (
              <p className="helper">Cursor maps through offset on Paper filters; Fluid and some Digital effects also react to pointer.</p>
            ) : isPaperStyle(recipe.style) ? (
              <p className="helper">Paper Design shaders respond through offset and rotation — mapped to each component&apos;s transform props.</p>
            ) : null}
            <div className="switch-row"><span>{isScene ? "Light follows cursor" : "React to cursor"}</span><button type="button" className={`switch ${recipe.cursorEnabled ? "on" : ""}`} onClick={() => onChange({ cursorEnabled: !recipe.cursorEnabled })} aria-pressed={recipe.cursorEnabled}><i /></button></div>
            {!isScene && (
              <>
                <div className="section-label">Effect</div>
                <div className="effect-grid">{(["push", "repel", "swirl", "ripple", "spotlight"] as CursorEffect[]).map((effect) => (
                  <button key={effect} type="button" className={recipe.cursorEffect === effect ? "selected" : ""} onClick={() => onChange({ cursorEffect: effect })}>{effect}</button>
                ))}</div>
              </>
            )}
            <Slider label="Strength" value={recipe.cursorStrength} onChange={(cursorStrength) => onChange({ cursorStrength })} />
            {!isScene && <Slider label="Radius" value={recipe.cursorRadius} min={.15} max={1} onChange={(cursorRadius) => onChange({ cursorRadius })} />}
            <p className="helper">{isScene ? "Drag on the canvas to orbit; move the pointer to aim the light." : recipe.cursorEffect === "swirl" ? "Twists the pattern around the pointer." : "Moves the shader field with the pointer."}</p>
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
        <p className="helper">Edit style, colour, surface, motion, and interaction live.</p>
        <div className="visual-kind-tabs" role="tablist" aria-label="Visual type">
          <button type="button" role="tab" aria-selected={recipe.kind === "shader"} className={recipe.kind === "shader" ? "active" : ""} onClick={() => onSelectKind("shader")}>Shader</button>
          <button type="button" role="tab" aria-selected={isMedia} className={isMedia ? "active" : ""} onClick={() => onSelectKind("media")}>Media</button>
          <button type="button" role="tab" aria-selected={isAscii} className={isAscii ? "active" : ""} onClick={() => onSelectKind("ascii")}>ASCII</button>
          <button type="button" role="tab" aria-selected={isScene} className={isScene ? "active" : ""} onClick={() => onSelectKind("3d")}>Scene</button>
        </div>
      </div>

      <div className="visuals-accordion scroll-fade scroll-fade-y scroll-fade-6 no-scrollbar" role="tablist" aria-label="Visual sections">
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

const magicVisualGroups: { kind: MagicVisual["kind"]; label: string }[] = [
  { kind: "shader", label: "Shaders" },
  { kind: "media", label: "Media filters" },
  { kind: "ascii", label: "ASCII" },
  { kind: "3d", label: "Scenes" },
];

function MagicPaletteSelect({ palettes, selectedId, onChange }: { palettes: MagicPalette[]; selectedId: string; onChange: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = palettes.find((palette) => palette.id === selectedId) ?? palettes[0];

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

  if (!selected) return null;

  return (
    <div className={`magic-palette-select${open ? " open" : ""}`} ref={rootRef}>
      <button type="button" className="magic-palette-trigger" aria-expanded={open} aria-haspopup="listbox" onClick={() => setOpen((current) => !current)}>
        <PalettePreview colors={selected.colors} />
        <span className="magic-palette-trigger-copy">
          <b>{selected.name}</b>
          <small>{selected.description}</small>
        </span>
        <ChevronDown />
      </button>
      {open && (
        <div className="magic-palette-menu" role="listbox" aria-label="Colour directions">
          {palettes.map((palette) => (
            <button
              key={palette.id}
              type="button"
              role="option"
              aria-selected={palette.id === selected.id}
              className={palette.id === selected.id ? "selected" : ""}
              onClick={() => {
                onChange(palette.id);
                setOpen(false);
              }}
            >
              <PalettePreview colors={palette.colors} />
              <span>
                <b>{palette.name}</b>
                <small>{palette.description}</small>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function MagicBackgroundPopover({ palettes, selectedPalette, visuals, magicRun, magicSession, onSelectPalette, onRegenerate, onApply, onClose }: { palettes: MagicPalette[]; selectedPalette: MagicPalette; visuals: ReturnType<typeof makeMagicVisuals>; magicRun: number; magicSession: number; onSelectPalette: (id: string) => void; onRegenerate: () => void; onApply: (recipe: Recipe, label: string) => void; onClose: () => void }) {
  const { thumbnails, loading } = useMagicThumbnails(visuals, selectedPalette, magicRun, magicSession, true);

  if (!palettes.length) return null;
  return (
    <div className="magic-popover" role="dialog" aria-label="Magic backgrounds">
      <div className="magic-popover-head">
        <div>
          <span className="magic-kicker"><Sparkles /> Magic backgrounds</span>
          <p>Colours intelligently matched to your media.</p>
        </div>
        <button type="button" className="magic-close" onClick={onClose} aria-label="Close magic backgrounds"><X /></button>
      </div>
      <div className="magic-toolbar">
        <MagicPaletteSelect palettes={palettes} selectedId={selectedPalette.id} onChange={onSelectPalette} />
        <button type="button" className="magic-shuffle" onClick={onRegenerate}><RefreshCcw /> Shuffle</button>
      </div>
      <div className={`magic-previews${loading ? " is-loading" : ""}`}>
        {magicVisualGroups.map((group) => {
          const items = visuals.filter((visual) => visual.kind === group.kind);
          if (!items.length) return null;
          return (
            <section key={group.kind} className="magic-preview-section" aria-label={group.label}>
              <h3><i className={`magic-kind ${group.kind}`} />{group.label}</h3>
              <div className="magic-preview-grid">
                {items.map((visual) => (
                  <button key={visual.id} type="button" className="magic-preview-card" onClick={() => onApply(visual.recipe, visual.label)} disabled={!thumbnails[visual.id]}>
                    <span className={`magic-preview-art${thumbnails[visual.id] ? "" : " is-pending"}`}>
                      {thumbnails[visual.id] ? <img src={thumbnails[visual.id]} alt="" /> : null}
                    </span>
                    <span className="magic-preview-label">{visual.label}</span>
                  </button>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export function ShaderStudio() {
  const [recipe, setRecipe] = useState<Recipe>(defaultRecipe);
  const [tab, setTab] = useState<Tab>("visuals");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [mockupPanel, setMockupPanel] = useState<MockupPanelSection>("media");
  const [typeBlocks, setTypeBlocks] = useState<TypeBlock[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const [previewKey, setPreviewKey] = useState(0);
  const [previewHealthBroken, setPreviewHealthBroken] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewBroken = Boolean(error) || previewHealthBroken;
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
  const [videoSettings, setVideoSettings] = useState<VideoExportSettings>({ aspect: "16:9", height: 1080, fps: 30, duration: 3, loop: false, mimeType: "video/mp4;codecs=avc1.42E01E" });
  const [videoProgress, setVideoProgress] = useState<number | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>(companyThemeKey(companyThemes[0].name));
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>([]);
  const [paletteName, setPaletteName] = useState("");
  const [magicOpen, setMagicOpen] = useState(false);
  const [magicPalettes, setMagicPalettes] = useState<MagicPalette[]>([]);
  const [selectedMagicPaletteId, setSelectedMagicPaletteId] = useState("");
  const [magicRun, setMagicRun] = useState(0);
  const [magicSession, setMagicSession] = useState(0);
  const magicActionRef = useRef<HTMLDivElement>(null);
  const [mockup, setMockup] = useState<MockupSettings>({ media: null, mediaType: null, chrome: "none", chromeTheme: "light", chromeScale: 1, borderStyle: "glass", borderWidth: 2, fillOpacity: 1, backdropBlur: 8, radius: 20, shadow: 40, scale: .45, x: 0, y: 0, cameraX: 0, cameraY: 0, tiltX: 0, tiltY: 0, rotate: 0, flipX: false, flipY: false, visible: true });
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
  const [navigatorHover, setNavigatorHover] = useState<{ center: { x: number; y: number }; snap: CameraNavigatorHoverSnap } | null>(null);
  const [skillOpen, setSkillOpen] = useState(false);
  const [skillTab, setSkillTab] = useState<"landing" | "motion">("landing");
  const activeSkill = skillTab === "landing" ? landingPageShaderSystemSkill : motionDemoSkill;
  const [aboutOpen, setAboutOpen] = useState(false);
  const [infoShaderTick, setInfoShaderTick] = useState(0);
  const [alignmentGridVisible, setAlignmentGridVisible] = useState(false);
  const playheadRef = useRef(0);
  const baseDuration = 8;
  const mediaInput = useRef<HTMLInputElement>(null);
  const saved = useStudioStore((state) => state.saved);
  const saveRecipe = useStudioStore((state) => state.save);
  const hasRestoredRecipe = useRef(false);
  const hasRestoredPalettes = useRef(false);
  const runtimePreviewToastShown = useRef(false);

  const isRuntimePreviewError = (message: string) => message.includes("context") || message.includes("WebGL is unavailable");
  const handlePreviewError = useCallback((message: string | null) => {
    if (!message) {
      setError(null);
      runtimePreviewToastShown.current = false;
      return;
    }
    if (isRuntimePreviewError(message)) {
      setError(null);
      setPreviewHealthBroken(true);
      if (!runtimePreviewToastShown.current) {
        runtimePreviewToastShown.current = true;
        toast.error(message);
      }
      return;
    }
    setError(message);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--mockup-preview-media", mockup.mediaType === "image" && mockup.media ? `url("${mockup.media}")` : "none");
    return () => { root.style.removeProperty("--mockup-preview-media"); };
  }, [mockup.media, mockup.mediaType, mockup.rotate, mockup.scale, mockup.tiltX, mockup.tiltY]);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (localStorage.getItem(ABOUT_SEEN_KEY) !== "1") setAboutOpen(true);
  }, []);
  const closeAbout = () => {
    setAboutOpen(false);
    localStorage.setItem(ABOUT_SEEN_KEY, "1");
    setInfoShaderTick((tick) => tick + 1);
  };
  useEffect(() => {
    if (!aboutOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") closeAbout(); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [aboutOpen]);
  useEffect(() => {
    if (!drawerOpen || !isMobile) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setDrawerOpen(false); };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [drawerOpen, isMobile]);
  useEffect(() => {
    if (!isMobile) setDrawerOpen(false);
  }, [isMobile]);
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
  }, [exportTab, mockup.media, mockup.visible, mockupExportOpen, recipe.kind]);
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
      if (Array.isArray(parsed)) localRecipes = parsed.map((item) => normalizeRecipe(item, fragmentShader));
    } catch {}
    localRecipes.forEach(saveRecipe);

    const sharedRecipe = decodeSharedRecipe(new URLSearchParams(window.location.search).get(SHARED_SHADER_PARAM) ?? "");
    if (sharedRecipe) {
      setRecipe(sharedRecipe);
      toast("Shared look loaded");
    } else try {
      const resumeRecipe = JSON.parse(localStorage.getItem(RESUME_RECIPE_KEY) ?? "null");
      if (resumeRecipe?.id && resumeRecipe?.name && typeof resumeRecipe.style === "number") setRecipe(normalizeRecipe(resumeRecipe, fragmentShader));
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
    setRecipe((current) => ({ ...current, kind: "shader", name, style, glsl: fragmentShader }));
  };
  const selectMediaFilter = (id: MediaFilterId, label: string) => {
    change({ kind: "media", mediaFilter: id, name: label, mediaSource: recipe.mediaSource ?? defaultMediaSource("media") });
  };
  const selectAsciiStyle = (id: AsciiStyleId, label: string) => {
    change({ kind: "ascii", asciiStyle: id, name: label, mediaSource: recipe.mediaSource ?? defaultMediaSource("ascii") });
  };
  const selectThreeMaterial = (id: ThreeMaterialId, _label: string) => {
    change({
      kind: "3d",
      threeSceneMode: "objects",
      ...applyObjectMaterial(recipe, id),
      name: threeSceneLabel({ ...recipe, threeSceneMode: "objects", threeMaterial: id }),
    });
  };
  const selectThreeObject = (id: ThreeObjectId) => {
    change({
      kind: "3d",
      threeSceneMode: "objects",
      ...applyObjectShape(recipe, id),
      name: threeSceneLabel({ ...recipe, threeSceneMode: "objects", threeObject: id, threeModelUpload: null }),
    });
  };
  const selectVisualKind = (kind: VisualKind) => {
    if (kind === recipe.kind) return;
    if (kind === "ascii") {
      change({
        kind: "ascii",
        name: asciiStyleNames[recipe.asciiStyle] ?? "ASCII look",
        mediaSource: recipe.mediaSource ?? defaultMediaSource("ascii"),
      });
      return;
    }
    if (kind === "media") {
      change({
        kind: "media",
        name: mediaFilterNames[recipe.mediaFilter] ?? "Media look",
        mediaSource: recipe.mediaSource ?? defaultMediaSource("media"),
      });
      return;
    }
    if (kind === "3d") {
      const objects = resolveThreeObjects(recipe);
      change({
        kind: "3d",
        threeSceneMode: recipe.threeSceneMode ?? "objects",
        threeScenePreset: recipe.threeScenePreset ?? "agentic-cloud",
        threeObjects: objects,
        threeActiveObjectId: recipe.threeActiveObjectId ?? objects[0]?.id ?? null,
        threeObject: recipe.threeObject || DEFAULT_THREE_OBJECT,
        threeMaterial: recipe.threeMaterial || DEFAULT_THREE_MATERIAL,
        threeEnvironment: recipe.threeEnvironment || "nocturne",
        threePedestal: recipe.threeEnvironment === "open" ? false : (recipe.threePedestal ?? true),
        threeOpenBackground: recipe.threeOpenBackground ?? "solid",
        name: threeSceneLabel(recipe),
      });
      return;
    }
    change({ kind: "shader", name: styleNames[recipe.style] ?? recipe.name });
  };
  const pickSample = (sampleId: string) => {
    change({ mediaSource: { type: "sample", sampleId }, kind: recipe.kind === "ascii" ? "ascii" : "media" });
  };
  const uploadVisualMedia = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";
      if (!dataUrl) return;
      const mime = file.type.startsWith("video/") ? "video" as const : "image" as const;
      const kind: VisualKind = recipe.kind === "shader" || recipe.kind === "3d" ? "media" : recipe.kind;
      change({ kind, mediaSource: { type: "upload", dataUrl, mime } });
      toast(mime === "video" ? "Video added" : "Image added");
    };
    reader.readAsDataURL(file);
  };
  const uploadSceneModel = (file: File) => {
    const lower = file.name.toLowerCase();
    if (!lower.endsWith(".glb") && !lower.endsWith(".gltf") && !file.type.includes("gltf")) {
      toast.error("Upload a .glb or .gltf file");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      toast.error("Model is too large (max 12MB)");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : "";
      if (!dataUrl) return;
      change({
        kind: "3d",
        threeSceneMode: "objects",
        ...applyObjectModelUpload(recipe, dataUrl),
        name: `${threeMaterialNames[recipe.threeMaterial] ?? "Material"} · Upload`,
      });
      toast("Model added");
    };
    reader.readAsDataURL(file);
  };
  const clearSceneModelUpload = () => {
    change({
      threeSceneMode: "objects",
      ...clearObjectModelUpload(recipe),
      name: threeSceneLabel({ ...recipe, threeModelUpload: null }),
    });
    toast("Using preset object");
  };
  const resetCharacter = () => { const settings = presetSettings[recipe.style] ?? defaultRecipe; change({ intensity: settings.intensity ?? defaultRecipe.intensity, zoom: settings.zoom ?? defaultRecipe.zoom, warp: settings.warp ?? defaultRecipe.warp, contrast: settings.contrast ?? defaultRecipe.contrast, seed: defaultRecipe.seed }); };
  const recolour = () => change(recolourRecipe(recipe));
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
    change(remixRecipe(recipe));
    toast(recipe.kind === "ascii" ? "ASCII remixed — new surface" : recipe.kind === "media" ? "Media remixed — new surface" : recipe.kind === "3d" ? "Scene remixed — new surface" : "Shader remixed — new surface");
  };
  const restyle = () => {
    change(restyleRecipe(recipe));
    toast(recipe.kind === "ascii" ? "ASCII restyled" : recipe.kind === "media" ? "Media restyled" : recipe.kind === "3d" ? "Scene restyled" : "Style changed — palette kept");
  };
  const inspire = () => {
    change(inspireRecipe(recipe));
    toast(recipe.kind === "ascii" ? "New ASCII look" : recipe.kind === "media" ? "New media look" : recipe.kind === "3d" ? "New scene look" : "New shader look");
  };
  const vary = () => {
    const next = varyRecipe(recipe);
    change(next);
    toast(next.kind === "ascii" ? "Varied → ASCII" : next.kind === "media" ? "Varied → Media" : next.kind === "3d" ? "Varied → Scene" : "Varied → Shader");
  };
  const resetPreview = useCallback(() => {
    setError(null);
    setPreviewHealthBroken(false);
    runtimePreviewToastShown.current = false;
    setFrozen(false);
    setPreviewKey((key) => key + 1);
    toast("Preview reset");
  }, []);
  const previewSuspended = frozen || exportOpen || mockupExportOpen || aboutOpen;
  useEffect(() => {
    setPreviewHealthBroken(false);
  }, [previewKey]);
  useEffect(() => {
    if (previewSuspended) return;
    let misses = 0;
    const check = () => {
      if (isStagePreviewBroken(recipe)) misses += 1;
      else misses = 0;
      setPreviewHealthBroken(misses >= 2);
    };
    const grace = window.setTimeout(check, 900);
    const interval = window.setInterval(check, 1500);
    return () => {
      window.clearTimeout(grace);
      window.clearInterval(interval);
    };
  }, [recipe, previewKey, previewSuspended]);
  const selectedMagicPalette = magicPalettes.find((palette) => palette.id === selectedMagicPaletteId) ?? magicPalettes[0] ?? null;
  const magicSource = useMemo<MediaSource | null>(() => mockup.media ? { type: "upload", dataUrl: mockup.media, mime: mockup.mediaType === "video" ? "video" : "image" } : recipe.mediaSource, [mockup.media, mockup.mediaType, recipe.mediaSource]);
  const magicVisuals = useMemo(() => magicOpen && selectedMagicPalette ? makeMagicVisuals(recipe, selectedMagicPalette, magicSource, magicRun) : [], [magicOpen, recipe, selectedMagicPalette, magicSource, magicRun]);
  const openMagic = async () => {
    if (!mockup.media) { toast("Upload mockup media before generating Magic backgrounds"); return; }
    try {
      const extracted = await extractMagicColors(mockup.media, recipe.palette);
      const nextPalettes = makeMagicPalettes(extracted);
      clearMagicThumbnailCache();
      setMagicSession((value) => value + 1);
      setMagicPalettes(nextPalettes);
      setSelectedMagicPaletteId(nextPalettes[0]?.id ?? "");
      setMagicRun((value) => value + 1);
      setMagicOpen(true);
    } catch { toast.error("Could not read colours from this media"); }
  };
  const applyMagicVisual = (next: Recipe, label: string) => { change(next); setMagicOpen(false); toast(`${label} magic background applied`); };
  useEffect(() => {
    if (!magicOpen) return;
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!magicActionRef.current?.contains(event.target as Node)) setMagicOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMagicOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [magicOpen]);
  const exportText = (content: string, filename: string, type: string) => { const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([content], { type })); link.download = filename; link.click(); URL.revokeObjectURL(link.href); };
  const sceneShaderMaterial = recipe.kind === "3d" && isThreeShaderMaterial(recipe.threeMaterial);
  const exportReactHelper = recipe.kind === "3d"
    ? "A React Three Fiber scene starter with your object, material, environment, and lighting recipe."
    : isPaperStyle(recipe.style)
    ? "A Paper Design component configured with your current palette, motion, and surface settings."
    : "A self-contained recipe and fragment shader ready to paste into a client component.";
  const exportGlslHelper = recipe.kind === "3d"
    ? (sceneShaderMaterial
      ? "Vertex and fragment GLSL for the active mesh shader material."
      : "Three.js material parameters mapped from your recipe sliders.")
    : isPaperStyle(recipe.style)
    ? "Paper Design shaders ship with internal GLSL. Use React export for production code."
    : "The exact fragment shader currently driving the preview.";
  const reactCode = recipe.kind === "ascii"
    ? `// ASCII looks render image/video to a canvas character grid.\n// Style: ${recipe.asciiStyle}\n// Source: ${recipe.mediaSource?.type === "sample" ? recipe.mediaSource.sampleId : "upload"}\n\n${JSON.stringify({ asciiStyle: recipe.asciiStyle, asciiBlendMode: recipe.asciiBlendMode, asciiCharset: recipe.asciiCharset, asciiAnimationStyle: recipe.asciiAnimationStyle, animate: recipe.animate, speed: recipe.speed, warp: recipe.warp, palette: recipe.palette, intensity: recipe.intensity, zoom: recipe.zoom, contrast: recipe.contrast, reverse: recipe.reverse, smoothBlend: recipe.smoothBlend }, null, 2)}\n`
    : recipe.kind === "media"
    ? `// Media looks use Paper image filters or VFX-JS effects.\n// Filter: ${recipe.mediaFilter}\n// Source: ${recipe.mediaSource?.type === "sample" ? recipe.mediaSource.sampleId : "upload"}\n\n${JSON.stringify({ mediaFilter: recipe.mediaFilter, palette: recipe.palette, intensity: recipe.intensity, zoom: recipe.zoom, warp: recipe.warp, contrast: recipe.contrast, speed: recipe.speed }, null, 2)}\n`
    : recipe.kind === "3d"
    ? buildSceneReactExport(recipe)
    : isPaperStyle(recipe.style)
    ? `"use client";\n\nimport { ${paperShaderNames[recipe.style]} } from "@paper-design/shaders-react";\n\nexport function ${paperShaderNames[recipe.style]}Background() {\n  return (\n    <${paperShaderNames[recipe.style]}\n      width="100%"\n      height="100%"\n${formatPaperPropsForExport(recipe)}\n    />\n  );\n}\n`
    : `"use client";\n\n// Generated by Shader Studio\nexport const fragmentShader = ${JSON.stringify(recipe.glsl)};\n\nexport const shaderRecipe = ${JSON.stringify({ ...recipe, glsl: undefined }, null, 2)};\n`;
  const glslExportSource = recipe.kind === "ascii"
    ? `// ASCII transforms do not export custom GLSL.\n// Use the React / prompt export, or copy the mapped settings below.\n\n${JSON.stringify({ asciiStyle: recipe.asciiStyle, asciiBlendMode: recipe.asciiBlendMode, asciiCharset: recipe.asciiCharset, asciiAnimationStyle: recipe.asciiAnimationStyle, animate: recipe.animate, speed: recipe.speed, warp: recipe.warp, coverage: recipe.intensity, cellSize: recipe.zoom }, null, 2)}`
    : recipe.kind === "media"
    ? `// Media transforms do not export custom GLSL.\n// Use the React / prompt export, or copy the mapped settings below.\n\n${JSON.stringify({ mediaFilter: recipe.mediaFilter, props: isPaperMediaFilter(recipe.mediaFilter) ? mediaPaperProps(recipe, false, resolveMediaSource(recipe.mediaSource)?.url ?? "") : { engine: "vfx" } }, null, 2)}`
    : recipe.kind === "3d"
    ? buildSceneGlslExport(recipe)
    : isPaperStyle(recipe.style)
    ? `// ${paperShaderNames[recipe.style]} uses Paper Design's built-in GLSL.\n// Export the React component instead, or copy the mapped props below.\n\n${JSON.stringify(paperProps(recipe, false), null, 2)}`
    : recipe.glsl;
  const buildPrompt = () => {
    if (recipe.kind === "ascii") {
      const style = asciiStyleNames[recipe.asciiStyle] ?? recipe.name;
      const cursor = recipe.cursorEnabled ? `${recipe.cursorEffect} (strength ${Math.round(recipe.cursorStrength * 100)}/100, radius ${Math.round(recipe.cursorRadius * 100)}/100)` : "off";
      return `Add a live ASCII media transform to my app.
Style: "${style}" (${recipe.asciiStyle}).
Source: ${recipe.mediaSource?.type === "sample" ? recipe.mediaSource.sampleId : "uploaded media"}.
Colours (background → accent): ${recipe.palette.map((color) => color.toUpperCase()).join(", ")}.
Cell size: ${Math.round(6 + recipe.zoom * 10)}px · Coverage: ${Math.round((0.45 + recipe.intensity * 0.55) * 100)}%.
Charset: ${recipe.asciiCharset} · Blend: ${recipe.asciiBlendMode} · Invert: ${recipe.reverse ? "on" : "off"}.
Motion: ${recipe.animate ? "on" : "off"} · ${recipe.asciiAnimationStyle} · speed ${Math.round(recipe.speed / 3 * 100)}% · strength ${Math.round(recipe.warp * 100)}%.
Cursor: ${cursor}.
Implementation notes:
Render image or video to a canvas using a monospace grid. Map luminance to charset "${recipe.asciiCharset}" with ${recipe.smoothBlend ? "sampled source colours" : "palette stops"}.
Use these settings:
${JSON.stringify({ asciiStyle: recipe.asciiStyle, asciiBlendMode: recipe.asciiBlendMode, asciiCharset: recipe.asciiCharset, asciiAnimationStyle: recipe.asciiAnimationStyle, animate: recipe.animate, speed: recipe.speed, warp: recipe.warp, intensity: recipe.intensity, zoom: recipe.zoom, contrast: recipe.contrast, reverse: recipe.reverse, smoothBlend: recipe.smoothBlend, palette: recipe.palette }, null, 2)}`;
    }
    if (recipe.kind === "3d") {
      return buildScenePrompt(recipe);
    }
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
  const exportPng = async () => {
    const { width, height } = shaderOutputSize(videoSettings.aspect, videoSettings.height);
    try {
      const canvas = await renderExportShaderCanvas(recipe, width, height);
      const link = document.createElement("a");
      link.download = `${recipe.name.toLowerCase().replaceAll(" ", "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast("PNG exported");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not export PNG");
    }
  };
  const mockupOutputSize = (height: number = videoSettings.height) => shaderOutputSize(videoSettings.aspect, height as VideoExportSettings["height"]);
  const loadExportImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = () => reject(new Error("Could not load mockup media")); image.src = src; });
  const drawMockupComposition = (canvas: HTMLCanvasElement, mediaImage: CanvasImageSource | null = null, shaderCanvas?: HTMLCanvasElement | null) => {
    const context = canvas.getContext("2d");
    const shader = shaderCanvas ?? queryVisualCanvas(recipe);
    if (!context || !shader) throw new Error("Live shader preview is unavailable");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(shader, 0, 0, canvas.width, canvas.height);
    const typeLayers = partitionTypeBlocksForExport(typeBlocks);
    const viewportWidth = cameraGeometry.viewportWidth || canvas.width;
    drawTypeBlocksToCanvas(context, typeLayers.below, canvas.width, canvas.height, viewportWidth);
    if (!mockup.visible) {
      drawTypeBlocksToCanvas(context, typeLayers.above, canvas.width, canvas.height, viewportWidth);
      return;
    }
    const stageWidthRatio = cameraGeometry.viewportWidth ? cameraGeometry.stageWidth / cameraGeometry.viewportWidth : .58;
    const stageHeightRatio = cameraGeometry.viewportHeight ? cameraGeometry.stageHeight / cameraGeometry.viewportHeight : .52;
    const exportGeometry: CameraGeometry = { viewportWidth: canvas.width, viewportHeight: canvas.height, stageWidth: canvas.width * stageWidthRatio, stageHeight: canvas.height * stageHeightRatio, padWidth: 0, padHeight: 0 };
    const frame = getCameraFrame(mockup, exportGeometry);
    const width = exportGeometry.stageWidth; const height = exportGeometry.stageHeight;
    const borderWidth = mockup.borderStyle === "none" ? 0 : mockup.borderWidth;
    const framePad = mockup.borderStyle === "inset" ? borderWidth : 0;
    const chromeScale = mockup.chrome === "browser" ? mockup.chromeScale : 1;
    const bar = mockup.chrome === "browser" ? Math.max(BROWSER_CHROME_BASE_HEIGHT, height * .058) * chromeScale : 0;
    const mediaWidth = width - framePad * 2; const mediaHeight = height - bar - framePad * 2;
    const x = canvas.width / 2 + width * mockup.x / 100 - mockup.cameraX / 50 * frame.panLimitX;
    const y = canvas.height / 2 + height * mockup.y / 100 - mockup.cameraY / 50 * frame.panLimitY;
    context.save(); context.translate(x, y); context.scale(frame.renderScale, frame.renderScale); context.rotate(mockup.rotate * Math.PI / 180); context.scale(1 - Math.abs(mockup.tiltY) / 60, 1 - Math.abs(mockup.tiltX) / 80);
    applyMockupCanvasShadow(context, mockup.shadow);
    const radius = Math.min(mockup.radius, Math.min(width, height) / 4);
    const innerRadius = Math.max(0, radius - framePad);
    const fillStrength = mockup.fillOpacity;
    const fillStyle = mockup.borderStyle === "glass" ? `rgba(255,255,255,${.22 * fillStrength})` : mockup.borderStyle === "none" ? "transparent" : mockup.borderStyle === "inset" ? `rgba(255,255,255,${.14 * fillStrength})` : `rgba(17,18,22,${fillStrength})`;
    context.fillStyle = fillStyle;
    if (mockup.borderStyle !== "none") { context.beginPath(); context.roundRect(-width / 2, -height / 2, width, height, radius); context.fill(); }
    if (mockup.borderStyle === "border") { context.strokeStyle = "rgba(255,255,255,.92)"; context.lineWidth = borderWidth; context.beginPath(); context.roundRect(-width / 2, -height / 2, width, height, radius); context.stroke(); }
    if (mockup.borderStyle === "glass") { context.strokeStyle = "rgba(255,255,255,.62)"; context.lineWidth = borderWidth; context.beginPath(); context.roundRect(-width / 2, -height / 2, width, height, radius); context.stroke(); }
    if (mockup.borderStyle === "inset") { context.strokeStyle = "rgba(0,0,0,.45)"; context.lineWidth = borderWidth; const inset = borderWidth / 2; context.beginPath(); context.roundRect(-width / 2 + inset, -height / 2 + inset, width - borderWidth, height - borderWidth, innerRadius); context.stroke(); }
    context.shadowColor = "transparent"; context.save(); context.beginPath(); context.roundRect(-mediaWidth / 2, -height / 2 + bar + framePad, mediaWidth, mediaHeight, innerRadius); context.clip();
    if (mediaImage) context.drawImage(mediaImage, -mediaWidth / 2, -height / 2 + bar + framePad, mediaWidth, mediaHeight);
    else { context.fillStyle = "#171a2c"; context.fillRect(-mediaWidth / 2, -height / 2 + bar + framePad, mediaWidth, mediaHeight); context.fillStyle = "#f5f6ff"; context.font = `600 ${Math.max(18, mediaWidth / 11)}px sans-serif`; context.textAlign = "center"; context.fillText(mockup.mediaType === "video" ? "Video mockup" : "Your product", 0, 12); }
    context.restore();
    if (mockup.chrome === "browser") {
      drawSafariBrowserChrome(context, { x: -width / 2, y: -height / 2, width, height: bar, radius }, mockup.chromeTheme);
    }
    context.restore();
    drawTypeBlocksToCanvas(context, typeLayers.above, canvas.width, canvas.height, viewportWidth);
  };
  const exportMockupImage = async () => {
    try {
      await document.fonts.ready;
      const { width, height } = mockupOutputSize(mockupImageHeight);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const mediaImage = mockup.media && mockup.mediaType === "image" ? await loadExportImage(mockup.media) : null;
      const shader = await renderExportShaderCanvas(recipe, width, height);
      drawMockupComposition(canvas, mediaImage, shader);
      const link = document.createElement("a");
      link.download = `${recipe.name.toLowerCase().replaceAll(" ", "-")}-mockup.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast("Mockup image exported");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not export mockup image");
    }
  };
  const exportMockupVideo = async () => {
    let paperSurface: Awaited<ReturnType<typeof createPaperExportSurface>> | null = null;
    let threeSurface: Awaited<ReturnType<typeof createThreeExportSurface>> | null = null;
    let animatedSurface: Awaited<ReturnType<typeof createThreeExportSurface>> | null = null;
    try {
      await document.fonts.ready;
      const { width, height } = mockupOutputSize();
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const mediaImage = mockup.media && mockup.mediaType === "image" ? await loadExportImage(mockup.media) : null;
      const frameIndexes = Array.from({ length: videoSettings.duration * videoSettings.fps }, (_, index) => index);
      const bitrate = exportVideoBitrate(width, height, videoSettings.fps);
      setVideoProgress(0);

      const shaderLayer = document.createElement("canvas");
      shaderLayer.width = width;
      shaderLayer.height = height;

      if (recipe.kind === "3d") {
        threeSurface = await createThreeExportSurface(recipe, width, height, false);
      } else if (recipe.kind !== "ascii" && recipe.kind !== "media" && isPaperStyle(recipe.style)) {
        paperSurface = await createPaperExportSurface(recipe, width, height);
      } else {
        animatedSurface = await createThreeExportSurface(recipe, width, height, false);
      }

      const { blob, mimeType: outputMime } = await recordCanvasAnimation({
        canvas,
        frameIndexes,
        fps: videoSettings.fps,
        mimeType: videoSettings.mimeType,
        bitrate,
        onProgress: setVideoProgress,
        renderFrame: async (timeSec) => {
          const context = shaderLayer.getContext("2d");
          if (!context) throw new Error("Could not create export canvas");
          context.clearRect(0, 0, width, height);

          if (paperSurface) {
            paperSurface.mount.setFrame(recipe.seed + timeSec * 1000);
            drawPaperShaderToCanvas(context, paperSurface.canvas, recipe, width, height);
          } else if (threeSurface) {
            drawThreeExportFrame(context, threeSurface, recipe, width, height);
          } else if (animatedSurface) {
            context.drawImage(animatedSurface.canvas, 0, 0, width, height);
          }

          drawMockupComposition(canvas, mediaImage, shaderLayer);
        },
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${recipe.name.toLowerCase().replaceAll(" ", "-")}-mockup.${exportExtensionForMime(outputMime)}`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      toast("Mockup video exported");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not export mockup video");
    } finally {
      paperSurface?.dispose();
      threeSurface?.dispose();
      animatedSurface?.dispose();
      setVideoProgress(null);
    }
  };
  const updateVideoSettings = (update: Partial<VideoExportSettings>) => {
    if (update.aspect) setOutputAspect(update.aspect);
    setVideoSettings((current) => ({ ...current, ...update }));
  };
  const setOutputFrame = (aspect: OutputAspect) => {
    setOutputAspect(aspect);
    updateVideoSettings({ aspect: aspect === "4:5" ? "16:9" : aspect });
  };
  const exportVideo = async () => {
    const { width, height } = shaderOutputSize(videoSettings.aspect, videoSettings.height);
    const forwardFrames = videoSettings.duration * videoSettings.fps;
    const frameIndexes = loopFrameIndexes(forwardFrames, videoSettings.loop);
    const bitrate = exportVideoBitrate(width, height, videoSettings.fps);
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    let paperSurface: Awaited<ReturnType<typeof createPaperExportSurface>> | null = null;
    let vfxSurface: Awaited<ReturnType<typeof createVfxMediaExportSurface>> | null = null;
    let threeSurface: Awaited<ReturnType<typeof createThreeExportSurface>> | null = null;

    try {
      setVideoProgress(0);
      let result: { blob: Blob; mimeType: string };

      if (recipe.kind === "ascii") {
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not create export canvas");
        result = await recordCanvasAnimation({
          canvas,
          frameIndexes,
          fps: videoSettings.fps,
          mimeType: videoSettings.mimeType,
          bitrate,
          onProgress: (progress) => setVideoProgress(progress),
          renderFrame: async (timeSec) => {
            await renderAsciiFrameToCanvas(context, recipe, width, height, timeSec);
          },
        });
      } else if (recipe.kind === "media") {
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not create export canvas");
        if (isPaperMediaFilter(recipe.mediaFilter)) {
          const image = await resolveMediaImageForExport(recipe);
          paperSurface = await createMediaPaperExportSurface(recipe, width, height, image);
        } else {
          vfxSurface = await createVfxMediaExportSurface(recipe, width, height);
        }
        result = await recordCanvasAnimation({
          canvas,
          frameIndexes,
          fps: videoSettings.fps,
          mimeType: videoSettings.mimeType,
          bitrate,
          onProgress: (progress) => setVideoProgress(progress),
          renderFrame: async (timeSec) => {
            await renderMediaFrameToCanvas(context, recipe, width, height, timeSec, paperSurface, vfxSurface);
          },
        });
      } else if (recipe.kind === "3d") {
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not create export canvas");
        threeSurface = await createThreeExportSurface(recipe, width, height, false);
        result = await recordCanvasAnimation({
          canvas,
          frameIndexes,
          fps: videoSettings.fps,
          mimeType: videoSettings.mimeType,
          bitrate,
          onProgress: (progress) => setVideoProgress(progress),
          renderFrame: async () => {
            await renderThreeFrameToCanvas(context, recipe, width, height, threeSurface);
          },
        });
      } else if (isPaperStyle(recipe.style)) {
        paperSurface = await createPaperExportSurface(recipe, width, height);
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Could not create export canvas");
        result = await recordCanvasAnimation({
          canvas,
          frameIndexes,
          fps: videoSettings.fps,
          mimeType: videoSettings.mimeType,
          bitrate,
          onProgress: (progress) => setVideoProgress(progress),
          renderFrame: (timeSec) => {
            paperSurface!.mount.setFrame(recipe.seed + timeSec * 1000);
            context.clearRect(0, 0, width, height);
            drawPaperShaderToCanvas(context, paperSurface!.canvas, recipe, width, height);
          },
        });
      } else {
        const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true, antialias: false, powerPreference: "high-performance" });
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
        result = await recordCanvasAnimation({
          canvas,
          frameIndexes,
          fps: videoSettings.fps,
          mimeType: videoSettings.mimeType,
          bitrate,
          onProgress: (progress) => setVideoProgress(progress),
          renderFrame: (timeSec) => { renderFrame(timeSec); },
        });
      }

      const link = document.createElement("a");
      link.href = URL.createObjectURL(result.blob);
      link.download = `${recipe.name.toLowerCase().replaceAll(" ", "-")}${videoSettings.loop ? "-loop" : ""}.${exportExtensionForMime(result.mimeType)}`;
      link.click();
      window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      toast("Video exported");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not export video");
    } finally {
      paperSurface?.dispose();
      vfxSurface?.dispose();
      threeSurface?.dispose();
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
  const activeLabel = useMemo(
    () => (recipe.kind === "ascii"
      ? (asciiStyleNames[recipe.asciiStyle] ?? recipe.name)
      : recipe.kind === "media"
      ? (mediaFilterNames[recipe.mediaFilter] ?? recipe.name)
      : recipe.kind === "3d"
      ? threeSceneLabel(recipe)
      : (styleNames[recipe.style] ?? recipe.name)),
    [recipe.kind, recipe.asciiStyle, recipe.mediaFilter, recipe.threeSceneMode, recipe.threeScenePreset, recipe.threeObjects, recipe.threeMaterial, recipe.threeObject, recipe.threeModelUpload, recipe.style, recipe.name],
  );
  const availablePresets = useMemo(() => [...appPresets, ...saved.filter((item) => !appPresets.some((preset) => preset.id === item.id))], [saved]);
  const filteredSaved = useMemo(() => {
    const query = presetSearch.trim().toLowerCase();
    if (!query) return availablePresets;
    return availablePresets.filter((item) => `${item.name} ${styleNames[item.style] ?? "Custom look"}`.toLowerCase().includes(query));
  }, [availablePresets, presetSearch]);
  const updateMockup = (update: Partial<MockupSettings>) => setMockup((current) => ({ ...current, ...update }));
  const updateTypeBlock = (id: string, update: Partial<TypeBlock>) => {
    setTypeBlocks((blocks) => blocks.map((block) => block.id === id ? { ...block, ...update } : block));
  };
  const selectTypeBlock = (id: string | null) => {
    setSelectedTypeId(id);
    if (id) {
      setMockupPanel("type");
      if (tab !== "mockup") setTab("mockup");
    }
  };
  const addTypeBlock = () => {
    if (typeBlocks.length >= MAX_TYPE_BLOCKS) {
      toast(`Limit ${MAX_TYPE_BLOCKS} text blocks`);
      return;
    }
    const block = createTypeBlock({
      ...typePresets[0].partial,
      x: 50 + (typeBlocks.length % 2 === 0 ? 0 : 4),
      y: 40 + typeBlocks.length * 8,
    });
    setTypeBlocks((blocks) => [...blocks, block]);
    setSelectedTypeId(block.id);
    setMockupPanel("type");
    toast("Headline added");
  };
  const applyTypePreset = (presetId: string) => {
    const preset = typePresets.find((item) => item.id === presetId);
    if (!preset) return;
    if (selectedTypeId) {
      updateTypeBlock(selectedTypeId, { ...preset.partial });
      toast(`${preset.label} applied`);
      return;
    }
    if (typeBlocks.length >= MAX_TYPE_BLOCKS) {
      toast(`Limit ${MAX_TYPE_BLOCKS} text blocks`);
      return;
    }
    const block = createTypeBlock(preset.partial);
    setTypeBlocks((blocks) => [...blocks, block]);
    setSelectedTypeId(block.id);
    toast(`${preset.label} added`);
  };
  const duplicateTypeBlock = (id: string) => {
    if (typeBlocks.length >= MAX_TYPE_BLOCKS) {
      toast(`Limit ${MAX_TYPE_BLOCKS} text blocks`);
      return;
    }
    const source = typeBlocks.find((block) => block.id === id);
    if (!source) return;
    const block = createTypeBlock({
      ...source,
      x: Math.min(92, source.x + 3),
      y: Math.min(92, source.y + 4),
    });
    setTypeBlocks((blocks) => [...blocks, block]);
    setSelectedTypeId(block.id);
  };
  const removeTypeBlock = (id: string) => {
    setTypeBlocks((blocks) => blocks.filter((block) => block.id !== id));
    setSelectedTypeId((current) => current === id ? null : current);
  };
  const typeLayerInteractive = tab === "mockup" && mockupPanel === "type" && editorMode === "mockup";
  useEffect(() => {
    if (!typeLayerInteractive) setSelectedTypeId(null);
  }, [typeLayerInteractive]);
  useEffect(() => {
    if (!typeLayerInteractive || !selectedTypeId) return;
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key !== "Delete" && event.key !== "Backspace") return;
      event.preventDefault();
      removeTypeBlock(selectedTypeId);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [typeLayerInteractive, selectedTypeId]);
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
    targetX: mockup.x, targetY: mockup.y, targetTiltX: focusPreset.settings.tiltX, targetTiltY: focusPreset.settings.tiltY, targetRotate: focusPreset.settings.rotate, cameraX: focusPreset.settings.cameraX, cameraY: focusPreset.settings.cameraY, startAt: "base", endAt: "base", exitStyle: "camera", hidden: false,
  });
  const clampClipStart = (start: number, duration: number) => Math.round(Math.max(0, Math.min(baseDuration - duration, start)) * 10) / 10;
  const openAnimation = () => {
    if (!basePresetId && !mockup.media) { toast("Upload media, then choose a mockup preset before animating"); return; }
    if (!basePresetId) setBasePresetId("hero");
    setAnimationClips((clips) => {
      if (clips.length) { setActiveClipId((id) => id ?? clips[0].id); return clips; }
      const first = createAnimationClip(0);
      setActiveClipId(first.id); return [first];
    });
    setEditorMode("animation"); setMotionPreview("base"); setDrawerOpen(false);
  };
  const addAnimationClip = () => {
    const duration = Math.min(animationDuration, baseDuration);
    const start = clampClipStart(playheadRef.current, duration);
    const clip = createAnimationClip(start, duration);
    setAnimationClips((clips) => [...clips, clip]); setActiveClipId(clip.id); setEditorMode("animation");
  };
  const duplicateClip = (source: AnimationClip) => {
    const duplicate = { ...source, id: crypto.randomUUID(), start: source.start, hidden: false };
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
    const duration = Math.min(source.duration, baseDuration);
    const pasted = { ...source, id: crypto.randomUUID(), start: clampClipStart(playheadRef.current, duration), duration, hidden: false };
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
      endAt: "target",
    };
    const right: AnimationClip = {
      ...clip,
      id: crypto.randomUUID(),
      start: splitAt,
      duration: rightDuration,
      transition: Math.min(clip.transition, Math.max(MIN_TRAVEL, rightDuration - EXIT_RESERVE)),
      hold: Math.min(clip.hold, rightDuration * .3),
      startAt: "target",
      endAt: clip.endAt,
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
  const selectAnimationClip = (clip: AnimationClip) => { setActiveClipId(clip.id); setFocusPresetId(clip.presetId); setFocusZoom(clip.zoom); setFocusTilt(clip.tilt); setAnimationDuration(clip.duration); setAnimationTransition(clip.transition); setAnimationEasing(clip.easing); setAnimationHold(clip.hold); setSpringSpeed(clip.springSpeed); setEditorMode("animation"); setMotionPreview("focus"); seekToClipTarget(clip); };
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
        if (gesture.kind === "resize") {
          const duration = Math.round(Math.max(MIN_CLIP_DURATION, Math.min(baseDuration - item.start, gesture.duration + delta)) * 10) / 10;
          return { ...item, duration, transition: Math.min(item.transition, Math.max(MIN_TRAVEL, duration - EXIT_RESERVE)), hold: Math.min(item.hold, duration * .3) };
        }
        const start = clampClipStart(gesture.start + delta, item.duration);
        return { ...item, start };
      }));
    };
    const end = () => { clipGesture.current = null; window.removeEventListener("pointermove", move); window.removeEventListener("pointerup", end); };
    window.addEventListener("pointermove", move); window.addEventListener("pointerup", end);
  };
  const activeClip = animationClips.find((clip) => clip.id === activeClipId);
  const duplicateActiveClip = () => { if (activeClip) duplicateClip(activeClip); };
  const orderedClips = [...animationClips].sort((a, b) => a.start - b.start);
  const activeTargetPreset = activeClip ? (mockupPresets.find((preset) => preset.id === activeClip.presetId) ?? focusPreset) : focusPreset;
  const activeTargetScale = activeTargetPreset.settings.scale * (activeClip?.zoom ?? focusZoom);
  const nextClip = activeClip ? orderedClips.find((clip) => clip.start > activeClip.start) : undefined;
  const previousClip = activeClip ? [...orderedClips].reverse().find((clip) => clip.start < activeClip.start) : undefined;
  const activeClipMaxDuration = activeClip ? Math.max(MIN_CLIP_DURATION, baseDuration - activeClip.start) : baseDuration;
  const nextFor = (clip: AnimationClip) => orderedClips[orderedClips.findIndex((item) => item.id === clip.id) + 1];
  const clipsAbut = (left: AnimationClip, right: AnimationClip) => Math.abs(left.start + left.duration - right.start) < .11;
  const handoffToNext = (clip: AnimationClip) => {
    const next = nextFor(clip);
    return Boolean(clip.endAt === "target" && next && next.startAt === "target" && clipsAbut(clip, next));
  };
  const hasExitTravel = (clip: AnimationClip) => clip.endAt === "base" || handoffToNext(clip);
  const inboundTravel = (clip: AnimationClip) => {
    if (clip.startAt === "target") return 0;
    const hold = Math.min(clip.hold, clip.duration * .3);
    const reserve = hasExitTravel(clip) ? EXIT_RESERVE : 0;
    return Math.min(clip.transition, Math.max(MIN_TRAVEL, clip.duration - hold - reserve));
  };
  const seekToClipTarget = (clip: AnimationClip) => {
    const hold = Math.min(clip.hold, clip.duration * .3);
    const travel = inboundTravel(clip);
    setIsTimelinePlaying(false);
    setTimelinePlayhead(clip.start + travel + Math.min(hold / 2, .06));
    setMotionPreview("focus");
  };
  const setClipAnchor = (edge: "startAt" | "endAt", anchor: ClipAnchor) => {
    if (!activeClip) return;
    const ordered = [...animationClips].sort((a, b) => a.start - b.start);
    const index = ordered.findIndex((item) => item.id === activeClip.id);
    const current = ordered[index];
    if (!current) return;
    const previous = ordered[index - 1];
    const next = ordered[index + 1];
    const nextById = new Map(animationClips.map((clip) => [clip.id, clip]));
    let updated: AnimationClip = { ...current, [edge]: anchor };
    if (edge === "startAt" && anchor === "target" && previous) {
      updated = { ...updated, start: Math.round((previous.start + previous.duration) * 10) / 10, startAt: "target" };
      nextById.set(previous.id, { ...previous, endAt: "target" });
    } else if (edge === "endAt" && anchor === "target" && next) {
      updated = { ...updated, endAt: "target" };
      nextById.set(next.id, { ...next, start: Math.round((updated.start + updated.duration) * 10) / 10, startAt: "target" });
    }
    nextById.set(updated.id, updated);
    setAnimationClips(animationClips.map((clip) => nextById.get(clip.id) ?? clip));
    seekToClipTarget(updated);
    const label = anchor === "base" ? "Base" : "Target";
    toast(edge === "startAt" ? `Starts at ${label}` : `Ends at ${label}`);
  };
  const previewClip = (() => {
    const covering = animationClips.filter((clip) => !clip.hidden && playhead >= clip.start && playhead <= clip.start + clip.duration);
    if (!covering.length) return undefined;
    return covering.find((clip) => clip.id === activeClipId) ?? covering[covering.length - 1];
  })();
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
    const handoff = handoffToNext(clip);
    const exitState = handoff && next ? targetState(next) : mockup;
    const exitTravel = hasExitTravel(clip);
    const travel = inboundTravel(clip);

    if (clip.startAt === "target") {
      if (!exitTravel) return target;
      const exitDuration = Math.max(.01, clip.duration - hold);
      if (localTime <= hold) return target;
      return interpolateMockup(target, exitState, motionProgress((localTime - hold) / exitDuration, clip));
    }

    if (!exitTravel) {
      if (localTime <= travel) return interpolateMockup(mockup, target, motionProgress(localTime / travel, clip));
      return target;
    }

    const exitDuration = Math.max(.01, clip.duration - travel - hold);
    if (localTime <= travel) return interpolateMockup(mockup, target, motionProgress(localTime / travel, clip));
    if (localTime <= travel + hold) return target;
    return interpolateMockup(target, exitState, motionProgress((localTime - travel - hold) / exitDuration, clip));
  };
  const transitionPhaseProgress = (clip: AnimationClip): number | null => {
    const localTime = playhead - clip.start;
    const hold = Math.min(clip.hold, clip.duration * .3);
    const travel = inboundTravel(clip);
    const exitTravel = hasExitTravel(clip);

    if (clip.startAt === "base" && travel > 0 && localTime <= travel) {
      return Math.max(0, Math.min(1, localTime / travel));
    }
    if (!exitTravel) return null;
    if (clip.startAt === "target") {
      if (localTime <= hold) return null;
      return Math.max(0, Math.min(1, (localTime - hold) / Math.max(.01, clip.duration - hold)));
    }
    if (localTime <= travel + hold) return null;
    return Math.max(0, Math.min(1, (localTime - travel - hold) / Math.max(.01, clip.duration - travel - hold)));
  };
  const stageExitFx = (clip: AnimationClip | undefined): { opacity: number; filter: string } => {
    if (!clip) return { opacity: 1, filter: "none" };
    const style = clip.exitStyle;
    if (style === "camera") return { opacity: 1, filter: "none" };
    const phase = transitionPhaseProgress(clip);
    if (phase === null) return { opacity: 1, filter: "none" };
    const bell = Math.sin(Math.PI * phase);
    switch (style) {
      case "crossfade":
        return { opacity: 1 - bell * .9, filter: "none" };
      case "blur":
        return { opacity: 1 - bell * .1, filter: `blur(${(bell * 18).toFixed(2)}px)` };
      default: {
        const _exhaustive: never = style;
        void _exhaustive;
        return { opacity: 1, filter: "none" };
      }
    }
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
  const exitFx = editorMode === "animation" && previewClip && !typeLayerInteractive ? stageExitFx(previewClip) : { opacity: 1, filter: "none" };
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
      const raw = getNavigatorCenter(event, frame, box);
      const snaps = getCameraNavigatorSnapPoints(frame, box.width, box.height);
      const { center } = resolveNavigatorHoverCenter(raw, frame, box.width, box.height, snaps);
      const jumped = cameraFromNavigatorCenter(center.x, center.y, box, mockup, frame, cameraGeometry);
      startCameraX = jumped.cameraX;
      startCameraY = jumped.cameraY;
      updateMockup({ cameraX: startCameraX, cameraY: startCameraY });
      setBasePresetId("custom");
    }
    cameraPadDrag.current = { pointerId: event.pointerId, startClientX: event.clientX, startClientY: event.clientY, startCameraX, startCameraY };
    setNavigatorHover(null);
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
      const frame = getPanoramaCameraFrame(mockup, cameraGeometry);
      const box = event.currentTarget.getBoundingClientRect();
      const raw = getNavigatorCenter(event, frame, box);
      const snaps = getCameraNavigatorSnapPoints(frame, box.width, box.height);
      setNavigatorHover(resolveNavigatorHoverCenter(raw, frame, box.width, box.height, snaps));
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
    setNavigatorHover(null);
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

  const selectTab = (id: Tab) => {
    if (isMobile) {
      if (tab === id && drawerOpen) {
        setDrawerOpen(false);
        return;
      }
      setTab(id);
      setDrawerOpen(true);
      return;
    }
    setTab(id);
  };
  const openExport = () => {
    setExportTab(tab === "mockup" || editorMode === "animation" ? "mockup" : "image");
    setMockupExportOpen(true);
  };
  const renderCameraInspector = () => (
    <RightCameraInspector
      recipe={recipe}
      mockup={mockup}
      geometry={cameraGeometry}
      mode={cameraMode}
      tool2D={cameraTool2D}
      tool3D={cameraTool3D}
      hoverCenter={navigatorHover?.center ?? null}
      hoverSnap={navigatorHover?.snap ?? null}
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
      onPadPointerLeave={() => { if (!cameraPadDrag.current) setNavigatorHover(null); }}
      cameraPadRef={cameraPadRef}
    />
  );

  return <main className={`studio-shell ${editorMode === "animation" ? "animation-mode" : ""}${isMobile && drawerOpen ? " drawer-open" : ""}`} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
    <header className="topbar"><div className="brand"><span className="brand-mark">S</span><span>SHADER STUDIO</span><Button variant="ghost" size="icon" className={`brand-info${infoShaderTick > 0 ? " is-revealing" : ""}`} onClick={() => setAboutOpen(true)} aria-label="About Shader Studio" aria-haspopup="dialog" aria-expanded={aboutOpen}>{infoShaderTick > 0 && <motion.span key={infoShaderTick} className="brand-info-shader" initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 1, 0] }} transition={{ duration: 3, times: [0, 0.18, 0.72, 1], ease: "easeInOut" }} onAnimationComplete={() => setInfoShaderTick(0)} aria-hidden="true"><ShaderCanvas recipe={aboutInfoRecipe} frozen={false} onError={() => undefined} /></motion.span>}<Info strokeWidth={2.2} /></Button></div><div className="top-actions"><button className="icon-button" onClick={undo} disabled={!history.length} aria-label="Undo"><Undo2 /></button><button className="icon-button" onClick={redo} disabled={!future.length} aria-label="Redo"><Redo2 /></button><button className="button ghost" onClick={shareCurrentRecipe}><Share2 />{shareCopied ? "Copied" : "Share"}</button><button className="button ghost export-action" onClick={openExport}><ImageDown /> Export</button><button className="button primary copy-prompt-action" onClick={() => copyText(buildPrompt(), "Build prompt copied")}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy prompt"}</button><button className="button primary" onClick={openSave}><Save /> Save preset</button></div></header>
    <section className={`workspace${tab === "mockup" ? " is-mockup-tab" : ""}${magicOpen ? " is-magic-open" : ""}`}>
      <nav className="icon-rail" aria-label="Shader controls"><div className={`rail-tabs ${editorMode === "animation" ? "mode-disabled" : ""}`}>{tabs.map(({ id, label, icon: Icon }) => <button key={id} disabled={editorMode === "animation"} className={`rail-tab ${tab === id ? "active" : ""}`} onClick={() => selectTab(id)} aria-label={label}><Icon size={19} strokeWidth={1.8} /><span>{label}</span></button>)}</div><button type="button" className="rail-tab rail-skill" onClick={() => setSkillOpen(true)} aria-label="Open agent skills"><BookOpen size={19} strokeWidth={1.8} /><span>Skill</span></button></nav>
      {isMobile && drawerOpen && <button type="button" className="drawer-backdrop" aria-label="Close panel" onClick={() => setDrawerOpen(false)} />}
      <aside className={`inspector ${tab === "mockup" && editorMode === "animation" ? "mode-disabled" : ""}${isMobile && drawerOpen ? " is-open" : ""}`}><div className="drawer-chrome"><span>{tab === "presets" ? "Presets" : tab === "visuals" ? "Visuals" : "Mockup"}</span><button type="button" className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close panel"><X /></button></div><div className={`inspector-scroll ${tab === "visuals" ? "inspector-scroll-visuals" : "scroll-fade scroll-fade-y scroll-fade-6 no-scrollbar"}`}>
        {tab === "visuals" && <VisualsPanel recipe={recipe} activeLabel={activeLabel} selectedTheme={selectedTheme} setSelectedTheme={setSelectedTheme} onChange={change} onApplyTheme={applyTheme} onRandomize={randomizePalette} savedPalettes={savedPalettes} paletteName={paletteName} setPaletteName={setPaletteName} onSavePalette={saveCurrentPalette} onDeletePalette={deleteSavedPalette} onSelectPreset={selectPreset} onSelectMediaFilter={selectMediaFilter} onSelectAsciiStyle={selectAsciiStyle} onSelectThreeMaterial={selectThreeMaterial} onSelectThreeObject={selectThreeObject} onSelectKind={selectVisualKind} onPickSample={pickSample} onUploadMedia={uploadVisualMedia} onUploadModel={uploadSceneModel} onClearModelUpload={clearSceneModelUpload} />}
        {tab === "presets" && <div className="panel-content presets-panel-content"><h2>Presets</h2><p className="helper">App defaults and your saved shader looks, ready to remix.</p>{availablePresets.length ? <><label className="preset-search"><Search /><input value={presetSearch} onChange={(event) => setPresetSearch(event.target.value)} placeholder="Search presets" aria-label="Search presets" />{presetSearch && <button type="button" onClick={() => setPresetSearch("")} aria-label="Clear preset search"><X /></button>}</label><div className="preset-library"><AnimatePresence initial={false} mode="popLayout">{filteredSaved.map((item, index) => <motion.button layout key={item.id} onClick={() => setRecipe(item)} aria-label={`Open preset ${item.name}`} initial={{ opacity: 0, y: 12, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: .985 }} transition={{ duration: .22, delay: Math.min(index * .025, .14), ease: [0.22, 1, 0.36, 1] }}><SavedRecipePreview recipe={item} /><span><b>{item.name}</b><em>{styleNames[item.style] ?? "Custom look"}</em></span></motion.button>)}</AnimatePresence>{!filteredSaved.length && <motion.p className="preset-search-empty" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>No presets match &quot;{presetSearch}&quot;.</motion.p>}</div></> : <div className="presets-empty"><div className="presets-empty-icon"><WandSparkles /></div><h3>No presets yet</h3><p>Build a look in Visuals, then save it here for your next project.</p><button className="button primary" onClick={() => selectTab("visuals")}><WandSparkles /> Tune visuals</button></div>}</div>}
        {tab === "mockup" && <div className="mockup-panel-tabs" role="tablist" aria-label="Mockup sections"><button type="button" role="tab" aria-selected={mockupPanel === "media"} className={mockupPanel === "media" ? "active" : ""} onClick={() => setMockupPanel("media")}>Media</button><button type="button" role="tab" aria-selected={mockupPanel === "type"} className={mockupPanel === "type" ? "active" : ""} onClick={() => setMockupPanel("type")}>Type</button><button type="button" role="tab" aria-selected={mockupPanel === "view"} className={mockupPanel === "view" ? "active" : ""} onClick={() => setMockupPanel("view")}>View</button></div>}
        {tab === "mockup" && (mockupPanel === "view" || (!isMobile && mockupPanel === "media")) && <div className="editor-mode-switch" role="group" aria-label="Mockup editor mode"><button className={editorMode === "mockup" ? "active" : ""} onClick={() => setEditorMode("mockup")}>Mockup</button><button className={editorMode === "animation" ? "active" : ""} onClick={openAnimation} disabled={!basePresetId && !mockup.media} title={!basePresetId && !mockup.media ? "Upload media or choose a mockup preset first" : undefined}>Animation <Badge variant="secondary">Beta</Badge></button></div>}
        {tab === "mockup" && (mockupPanel === "view" || (!isMobile && mockupPanel === "media")) && <section className="output-frame-control"><div><span className="section-label">Output frame</span><p>Canvas, camera, animation, and export</p></div><div className="output-frame-grid">{outputFrames.map((frame) => <button key={frame.aspect} className={outputAspect === frame.aspect ? "selected" : ""} onClick={() => setOutputFrame(frame.aspect)} aria-pressed={outputAspect === frame.aspect}><i className={`output-frame-shape ratio-${frame.aspect.replace(":", "-")}`} /><span>{frame.aspect}</span><small>{frame.label}</small></button>)}</div></section>}
        {tab === "mockup" && mockupPanel === "type" && (
          <TypePanel
            blocks={typeBlocks}
            selectedId={selectedTypeId}
            onSelect={selectTypeBlock}
            onAdd={addTypeBlock}
            onPreset={applyTypePreset}
            onUpdate={updateTypeBlock}
            onDuplicate={duplicateTypeBlock}
            onRemove={removeTypeBlock}
          />
        )}
        {tab === "mockup" && mockupPanel === "media" && <div className="panel-content mockup-panel"><input ref={mediaInput} className="visually-hidden" type="file" accept="image/*,video/*" onChange={loadMockupMedia} /><h2>Mockup</h2><p className="helper">Place your product on the live shader scene.</p><button className="mockup-upload" onClick={() => mediaInput.current?.click()}>{mockup.media && mockup.mediaType === "image" ? <img src={mockup.media} alt="Selected mockup media" /> : mockup.media ? <video src={mockup.media} muted playsInline preload="metadata" /> : <span className="mockup-upload-placeholder"><ImageDown /><b>Screenshot</b><small>Drop media or click to choose</small></span>}</button><button className="button wide ghost replace-media" onClick={() => mediaInput.current?.click()}>{mockup.media ? "Replace media" : "Choose media"}</button><div className="mockup-aspect-inline"><div className="section-label">Aspect ratio</div><div className="aspect-ratio-grid">{(["auto", "16 / 9", "4 / 3", "1 / 1", "9 / 16"] as MockupAspect[]).map((aspect) => <button key={aspect} onClick={() => setMockupAspect(aspect)} className={mockupAspect === aspect ? "selected" : ""}><i className={`aspect-symbol ${aspect === "auto" ? "auto" : `ratio-${aspect.replaceAll(" ", "").replace("/", "-")}`}`} /><span>{aspect === "auto" ? "Auto" : aspect}</span></button>)}</div></div><div className="section-label">Style</div><div className="mockup-style-grid mockup-chrome-style-grid">{mockupChromeStyles.map((chrome) => <button key={chrome} type="button" onClick={() => updateMockup({ chrome })} className={mockup.chrome === chrome ? "selected" : ""}><i className={`chrome-sample ${chrome}`} aria-hidden="true" /><span>{chrome === "none" ? "None" : "Browser"}</span></button>)}</div>{mockup.chrome === "browser" && <><div className="section-label">Browser theme</div><div className="mockup-segment mockup-chrome-theme-segment">{mockupChromeThemes.map((theme) => <button key={theme} type="button" onClick={() => updateMockup({ chromeTheme: theme })} className={mockup.chromeTheme === theme ? "selected" : ""}>{theme === "light" ? "Light" : theme === "dark" ? "Dark" : "Glass"}</button>)}</div><Slider label="Browser UI" value={mockup.chromeScale} min={0.5} max={2} step={0.01} unit="×" onChange={(chromeScale) => updateMockup({ chromeScale })} /></>}<div className="section-label">Border style</div><div className="mockup-style-grid mockup-border-style-grid">{mockupBorderStyles.map((borderStyle) => <button key={borderStyle} type="button" onClick={() => updateMockup({ borderStyle })} className={mockup.borderStyle === borderStyle ? "selected" : ""}><i className={`frame-sample ${borderStyle}`} /><span>{borderStyle === "none" ? "Clean" : borderStyle}</span></button>)}</div><Slider label="Border width" value={mockup.borderWidth} min={0} max={12} step={1} unit="px" onChange={(borderWidth) => updateMockup({ borderWidth })} />{mockup.borderStyle !== "none" && <Slider label="Fill opacity" value={mockup.fillOpacity} min={0} max={1} step={.01} unit="%" onChange={(fillOpacity) => updateMockup({ fillOpacity })} />}{mockup.borderStyle === "glass" && <Slider label="Backdrop blur" value={mockup.backdropBlur} min={0} max={24} step={1} unit="px" onChange={(backdropBlur) => updateMockup({ backdropBlur })} />}<p className="helper mockup-frame-helper">Transparent PNGs show the frame fill and blur through empty pixels. Use Clean, or set Fill to 0% and Blur to 0px, for a cutout.</p><div className="section-label">Border rounding</div><div className="mockup-segment mockup-radius-segment"><button type="button" onClick={() => updateMockup({ radius: 0 })} className={mockup.radius === 0 ? "selected" : ""}>Sharp</button><button type="button" onClick={() => updateMockup({ radius: 20 })} className={mockup.radius === 20 ? "selected" : ""}>Curved</button><button type="button" onClick={() => updateMockup({ radius: 42 })} className={mockup.radius === 42 ? "selected" : ""}>Round</button></div><Slider label="Radius" value={mockup.radius} min={0} max={48} step={1} unit="px" onChange={(radius) => updateMockup({ radius })} /><div className="section-label">Shadow</div><div className="mockup-segment mockup-shadow-segment"><button type="button" onClick={() => updateMockup({ shadow: 0 })} className={mockup.shadow === 0 ? "selected" : ""}>None</button><button type="button" onClick={() => updateMockup({ shadow: 40 })} className={mockup.shadow === 40 ? "selected" : ""}>Spread</button><button type="button" onClick={() => updateMockup({ shadow: 80 })} className={mockup.shadow === 80 ? "selected" : ""}>Hug</button></div><Slider label="Opacity" value={mockup.shadow / 100} min={0} max={1} step={.01} unit="%" onChange={(shadow) => updateMockup({ shadow: shadow * 100 })} /><div className="section-label">Visibility</div><button className="mockup-visibility" onClick={() => updateMockup({ visible: !mockup.visible })}><Eye /> {mockup.visible ? "Hide mockup" : "Show mockup"}</button><div className="mockup-details"><span>Details</span><div><b>Device</b><em>{mockup.mediaType === "video" ? "Video" : mockup.media ? "Screenshot" : "Demo card"}</em></div><div><b>Screen pixels</b><em>Adapts to media</em></div></div></div>}
        {tab === "mockup" && mockupPanel === "view" && !isMobile && <div className="panel-content type-view-hint"><p className="helper">Camera, tilt, and layout presets stay in the right inspector. Type lives on the field under Media → Type.</p></div>}
        {tab === "mockup" && isMobile && mockupPanel === "view" && editorMode !== "animation" && renderCameraInspector()}
      </div><div className="local-recipes"><div className="section-label">Local recipes</div>{saved.length ? saved.slice(0, 3).map((item) => <button key={item.id} onClick={() => setRecipe(item)}>{item.name}<ChevronDown /></button>) : <span>Saved looks appear here.</span>}</div></aside>
{tab === "mockup" && <><div ref={mockupViewportRef} className="mockup-viewport">{editorMode === "animation" && activeClip && <div className="stage-target-badge"><i /> TARGET · {activeClip.label} · {activeClip.easing}</div>}<div className={`alignment-grid ${alignmentGridVisible ? "visible" : ""}`} aria-hidden="true" /><TypeCanvasLayer blocks={typeBlocks.filter((block) => resolveTypeZOrder(block) === "below")} selectedId={selectedTypeId} interactive={typeLayerInteractive} layer="below" onSelect={selectTypeBlock} onChange={updateTypeBlock} /><div ref={mockupStageRef} className={`mockup-stage chrome-${mockup.chrome} border-${mockup.borderStyle}${typeLayerInteractive ? " is-type-editing" : ""}`} style={{ transform: stageTransform(stageMockup), borderRadius: mockup.radius, ["--mockup-radius"]: `${mockup.radius}px`, ["--mockup-border-width"]: `${mockup.borderWidth}px`, ["--mockup-fill-opacity"]: mockup.fillOpacity, ["--mockup-backdrop-blur"]: `${stageMockup.backdropBlur}px`, ["--browser-chrome-scale"]: stageMockup.chromeScale, boxShadow: mockupDropShadow(stageMockup.shadow), opacity: exitFx.opacity, filter: exitFx.filter, visibility: mockup.visible ? "visible" : "hidden" } as CSSProperties}><SafariBrowserBar hidden={mockup.chrome !== "browser"} theme={stageMockup.chromeTheme} />{mockup.media && mockup.mediaType === "video" ? <video src={mockup.media} autoPlay muted loop playsInline /> : mockup.media ? <img src={mockup.media} alt="Mockup preview" /> : <button type="button" className="mockup-demo" onClick={() => mediaInput.current?.click()} aria-label="Upload images or videos" />}</div><TypeCanvasLayer blocks={typeBlocks.filter((block) => resolveTypeZOrder(block) === "above")} selectedId={selectedTypeId} interactive={typeLayerInteractive} layer="above" onSelect={selectTypeBlock} onChange={updateTypeBlock} /></div>{!isMobile && renderCameraInspector()}</>}
        {tab === "mockup" && editorMode === "animation" && <>
         <aside className="motion-inspector">
          <div className="motion-header"><div><span className="eyebrow">SELECTED ANIMATION</span><h2>{activeClip?.label ?? "Animation"}</h2><p>Choose its destination, then fine-tune it.</p></div><div className="motion-header-actions"><button className="duplicate-animation" onClick={duplicateActiveClip} title="Duplicate animation" aria-label="Duplicate animation"><Copy /></button><button onClick={selectBaseMedia}>Edit base</button></div></div>
          <Slider label="Length" value={activeClip?.duration ?? animationDuration} min={MIN_CLIP_DURATION} max={activeClipMaxDuration} step={.1} unit="s" onChange={(duration) => { if (!activeClip) return; const nextDuration = Math.round(Math.max(MIN_CLIP_DURATION, Math.min(activeClipMaxDuration, duration)) * 10) / 10; const updated = { ...activeClip, duration: nextDuration, transition: Math.min(activeClip.transition, Math.max(MIN_TRAVEL, nextDuration - EXIT_RESERVE)), hold: Math.min(activeClip.hold, nextDuration * .3) }; setAnimationDuration(nextDuration); setAnimationTransition(updated.transition); setAnimationHold(updated.hold); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} />
          <Slider label="Transition" value={activeClip?.transition ?? animationTransition} min={MIN_TRAVEL} max={activeClip?.duration ?? baseDuration} step={.1} unit="s" onChange={(transition) => { if (!activeClip) return; const updated = { ...activeClip, transition: Math.min(transition, Math.max(MIN_TRAVEL, activeClip.duration - EXIT_RESERVE)) }; setAnimationTransition(updated.transition); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} trailing={<button type="button" className={`curve-toggle ${activeClip?.easing ?? animationEasing}`} aria-label={`Switch to ${activeClip?.easing === "spring" ? "ease" : "spring"} curve`} title={activeClip?.easing === "spring" ? "Spring curve — click for ease" : "Ease curve — click for spring"} onClick={(event) => { event.preventDefault(); if (!activeClip) return; const easing = activeClip.easing === "spring" ? "ease" as const : "spring" as const; const updated = { ...activeClip, easing }; setAnimationEasing(easing); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); toast(`${easing === "spring" ? "Spring" : "Ease"} motion applied`); }}><i aria-hidden="true" /></button>} />
          <div className="motion-exit-control">
            <span>Start</span>
            <div role="group" aria-label="Start anchor">
              <button type="button" className={(activeClip?.startAt ?? "base") === "base" ? "active" : ""} onClick={() => setClipAnchor("startAt", "base")}>Base</button>
              <button type="button" className={(activeClip?.startAt ?? "base") === "target" ? "active" : ""} onClick={() => setClipAnchor("startAt", "target")}>Target</button>
            </div>
            <span>End</span>
            <div role="group" aria-label="End anchor">
              <button type="button" className={(activeClip?.endAt ?? "base") === "base" ? "active" : ""} onClick={() => setClipAnchor("endAt", "base")}>Base</button>
              <button type="button" className={(activeClip?.endAt ?? "base") === "target" ? "active" : ""} onClick={() => setClipAnchor("endAt", "target")}>Target</button>
            </div>
            <span>Transition style</span>
            <div className="motion-exit-style" role="group" aria-label="Transition style">
              {([
                { id: "camera" as const, label: "Camera" },
                { id: "crossfade" as const, label: "Crossfade" },
                { id: "blur" as const, label: "Blur morph" },
              ]).map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={(activeClip?.exitStyle ?? "camera") === option.id ? "active" : ""}
                  onClick={() => {
                    if (!activeClip) return;
                    const exitStyle: ExitStyle = option.id;
                    setAnimationClips((clips) => clips.map((clip) => clip.id === activeClip.id ? { ...clip, exitStyle } : clip));
                    toast(exitStyle === "camera" ? "Camera transition" : exitStyle === "crossfade" ? "Crossfade style" : "Blur morph style");
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <small>
              {activeClip?.exitStyle === "crossfade"
                ? "Crossfade plays on moves to or from base, and on target handoffs."
                : activeClip?.exitStyle === "blur"
                  ? "Blur morph plays on moves to or from base, and on target handoffs."
                  : activeClip?.startAt === "target" && activeClip?.endAt === "target"
                    ? previousClip && nextClip
                      ? `Holds focus; links ${previousClip.label} → ${nextClip.label} when clips abut.`
                      : "Holds on target for the whole clip."
                    : activeClip?.endAt === "target" && nextClip
                      ? `Ends on target and can flow into ${nextClip.label}.`
                      : activeClip?.startAt === "target"
                        ? "Starts already on target."
                        : "Travels from base to target, then back to base."}
            </small>
          </div>
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
<div className="composer-lanes"><div className="composer-lane-label">Animations</div><div ref={animationTrackRef} className="composer-track animation-lane" onPointerDown={seekTimeline}>{animationClips.map((clip) => <button key={clip.id} type="button" className={`composer-clip ${activeClipId === clip.id ? "active" : ""} ${clip.hidden ? "is-hidden" : ""}`} style={{ left: `${clip.start / baseDuration * 100}%`, width: `${clip.duration / baseDuration * 100}%` }} onClick={() => selectAnimationClip(clip)} onContextMenu={(event) => openClipMenu(event, clip)} onPointerDown={(event) => beginClipGesture(event, clip, "move")}><span className="clip-handle clip-handle-left" data-drag="move" /><span>{clip.label}{clip.hidden ? " · Hidden" : ""}</span><small>{clip.duration.toFixed(1)}s</small><span className="clip-handle clip-handle-right" data-drag="resize" onPointerDown={(event) => beginClipGesture(event, clip, "resize")} /></button>)}{orderedClips.map((clip, index) => { const next = orderedClips[index + 1]; return handoffToNext(clip) && next ? <i key={`${clip.id}-link`} className="clip-link" style={{ left: `${(clip.start + clip.duration) / baseDuration * 100}%`, width: "14px" }} /> : null; })}<button className="composer-plus" onClick={addAnimationClip}>+</button><i className="timeline-playhead" style={{ left: `${playhead / baseDuration * 100}%` }} /></div><div className="composer-lane-label media-label">Base media</div><div className="composer-track media-lane" onPointerDown={seekTimeline}><button type="button" aria-pressed={activeClipId === null} className="base-media-clip" onPointerDown={(event) => { event.stopPropagation(); selectBaseMedia(); }} onClick={selectBaseMedia}><i />Mockup <b>{mockup.media ? "Screenshot" : "Demo media"} · {baseDuration.toFixed(1)}s</b><span>Edit mockup</span></button><i className="timeline-playhead" style={{ left: `${playhead / baseDuration * 100}%` }} /></div></div>
          </motion.section>}
        </AnimatePresence>
      </>}
      <section className={`canvas-area${tab === "mockup" ? " is-mockup" : ""}${magicOpen ? " is-magic-open" : ""}`}>
        <div className="canvas-frame">
          <ShaderCanvas key={`stage-${previewKey}`} recipe={recipe} frozen={previewSuspended} onError={handlePreviewError} onChange={change} />
          {tab !== "mockup" && (
            <TypeCanvasLayer
              blocks={typeBlocks}
              selectedId={selectedTypeId}
              interactive={false}
              onSelect={selectTypeBlock}
              onChange={updateTypeBlock}
            />
          )}
          {error && (
            <div className="canvas-error">
              <CircleHelp />
              <span>Shader error — open Code to repair it, or reset the preview.</span>
              <button type="button" className="canvas-error-reset" onClick={resetPreview}><RefreshCcw /> Reset preview</button>
            </div>
          )}
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
            <TooltipProvider delayDuration={200}>
              <div className="canvas-dock">
                {tab === "mockup" && (
                  <div className="magic-action-wrap" ref={magicActionRef}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button type="button" className={magicOpen ? "is-active" : ""} onClick={openMagic} aria-expanded={magicOpen}><Sparkles /> Magic</button>
                      </TooltipTrigger>
                      <TooltipContent side="top">Generate palette-matched backgrounds from mockup media</TooltipContent>
                    </Tooltip>
                    {magicOpen && selectedMagicPalette && <MagicBackgroundPopover palettes={magicPalettes} selectedPalette={selectedMagicPalette} visuals={magicVisuals} magicRun={magicRun} magicSession={magicSession} onSelectPalette={setSelectedMagicPaletteId} onRegenerate={() => setMagicRun((value) => value + 1)} onApply={applyMagicVisual} onClose={() => setMagicOpen(false)} />}
                  </div>
                )}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" onClick={vary}><Dices /> Vary</button>
                  </TooltipTrigger>
                  <TooltipContent side="top">New everything — may switch Shader or Media</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" onClick={inspire}><CircleHelp /> Inspire</button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Brand-new look in the current mode</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" onClick={recolour}><Droplets /> Recolour</button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Keep the style and settings; choose new colours</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" onClick={remix}><WandSparkles /> Remix</button>
                  </TooltipTrigger>
                  <TooltipContent side="top">New surface; keep style, colours, motion, and cursor</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" onClick={restyle}><WandSparkles /> Restyle</button>
                  </TooltipTrigger>
                  <TooltipContent side="top">Choose a new style while keeping the palette</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" onClick={() => setFrozen((value) => !value)} aria-pressed={frozen}>{frozen ? <Play /> : <Pause />}{frozen ? "Play" : "Freeze"}</button>
                  </TooltipTrigger>
                  <TooltipContent side="top">{frozen ? "Resume the live preview" : "Freeze the live preview"}</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="button" className={`icon-only shader-highlight-button${previewBroken ? " is-revealing" : ""}`} onClick={resetPreview} aria-label="Restart preview">
                      {previewBroken && (
                        <span className="shader-highlight-button-shader" aria-hidden="true">
                          <ShaderCanvas recipe={aboutInfoRecipe} frozen={false} onError={() => undefined} />
                        </span>
                      )}
                      <RefreshCcw />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top">{previewBroken ? "Preview broke — tap to restart" : "Fix a broken preview"}</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </motion.div>
        </AnimatePresence>
      </section>
    </section>
    <nav className="mobile-dock" aria-label="Shader controls">
      <div className={`mobile-dock-tabs ${editorMode === "animation" ? "mode-disabled" : ""}`}>
        {tabs.map(({ id, label, icon: Icon }) => (
          <button key={id} type="button" disabled={editorMode === "animation"} className={`mobile-dock-tab ${tab === id ? "active" : ""}${tab === id && drawerOpen ? " is-open" : ""}`} onClick={() => selectTab(id)} aria-label={label} aria-pressed={tab === id && drawerOpen}>
            <Icon size={20} strokeWidth={1.8} />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <button type="button" className="mobile-dock-tab mobile-dock-skill" onClick={() => setSkillOpen(true)} aria-label="Open agent skills">
        <BookOpen size={20} strokeWidth={1.8} />
        <span>Skill</span>
      </button>
    </nav>
    <AnimatePresence>
      {aboutOpen && (
        <AboutModalBackdrop recipe={aboutRecipe} onClose={closeAbout} onBackdropClose={closeAbout} />
      )}
    </AnimatePresence>
    {saveOpen && <div className="modal-backdrop" role="presentation"><div className="save-modal" role="dialog" aria-modal="true" aria-labelledby="save-title"><button className="close" onClick={() => setSaveOpen(false)} aria-label="Close"><X /></button><h2 id="save-title">Save recipe</h2><p>Keep this shader configuration in this browser for later remixing.</p><input autoFocus value={saveName} onChange={(event) => setSaveName(event.target.value)} onKeyDown={(event) => event.key === "Enter" && save()} /><button className="button primary wide" onClick={save}><Save /> Save locally</button></div></div>}
    {skillOpen && <div className="modal-backdrop" role="presentation"><div className="export-modal skill-modal" role="dialog" aria-modal="true" aria-labelledby="skill-title" onKeyDown={(event) => event.key === "Escape" && setSkillOpen(false)}><button className="close" onClick={() => setSkillOpen(false)} aria-label="Close"><X /></button><div className="export-modal-header"><div className="export-header"><div><h2 id="skill-title">Agent skill</h2><p>Copy a skill definition for your AI agent.</p></div></div><div className="skill-tab-toggle" role="tablist" aria-label="Skill type"><button type="button" id="skill-tab-landing" role="tab" aria-selected={skillTab === "landing"} className={skillTab === "landing" ? "active" : ""} onClick={() => { setSkillTab("landing"); setCopied(false); }}>Landing shaders</button><button type="button" id="skill-tab-motion" role="tab" aria-selected={skillTab === "motion"} className={skillTab === "motion" ? "active" : ""} onClick={() => { setSkillTab("motion"); setCopied(false); }}>Motion demo</button></div></div><div className="export-modal-body"><div className="code-surface skill-surface"><textarea value={activeSkill} readOnly spellCheck={false} aria-label={skillTab === "landing" ? "Landing page shader system skill" : "Motion demo skill"} /><div className="source-actions skill-cta-wrap"><button type="button" className="button primary wide skill-cta" onClick={() => copyText(activeSkill, "Skill copied")} aria-live="polite"><span className="skill-cta-label">{copied ? "Copied" : "Copy skill"}</span></button></div></div></div></div></div>}
    {exportOpen && <div className="modal-backdrop" role="presentation"><div className={`export-modal${exportTab === "variations" ? " variations-export-modal" : ""}`} role="dialog" aria-modal="true" aria-labelledby="export-title"><button className="close" onClick={() => setExportOpen(false)} aria-label="Close"><X /></button><div className="export-modal-header"><div className="export-header"><div><h2 id="export-title">Export shader</h2><p>Take the current look into your project in the format you need.</p></div></div><div className="export-tabs" role="tablist">{(["image", "video", "variations", "prompt", "react", "glsl"] as ExportTab[]).map((item) => <button key={item} className={exportTab === item ? "active" : ""} onClick={() => setExportTab(item)} role="tab" aria-selected={exportTab === item}>{exportTabLabel(item)}</button>)}</div></div><div className="export-modal-body">{exportTab === "image" && <ImageExportPanel recipe={recipe} settings={videoSettings} onSettingsChange={updateVideoSettings} onExport={exportPng} description="Cursor interactions are excluded from exports." />}{exportTab === "video" && <FullVideoExportPanel recipe={recipe} settings={videoSettings} onSettingsChange={updateVideoSettings} onExport={exportVideo} videoProgress={videoProgress} />}{exportTab === "variations" && <VariationsExportPanel recipe={recipe} settings={videoSettings} onSettingsChange={updateVideoSettings} onApplyToCanvas={(next) => change(next)} />}{exportTab === "prompt" && <SourceSurface title="Build prompt" helper="A complete implementation prompt generated from the active shader configuration." source={buildPrompt()} footer={<><button className="button primary wide" onClick={() => copyText(buildPrompt(), "Build prompt copied")}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy prompt"}</button><button className="button wide ghost" onClick={() => exportText(buildPrompt(), "shader-studio-prompt.txt", "text/plain")}><Download /> Download .txt</button></>} />}{exportTab === "react" && <SourceSurface title="React component" helper={exportReactHelper} source={reactCode} footer={<><button className="button primary wide" onClick={() => copyText(reactCode, "React component copied")}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy React code"}</button><button className="button wide ghost" onClick={() => exportText(reactCode, "shader-studio-shader.ts", "text/plain")}><Download /> Download .ts</button></>} />}{exportTab === "glsl" && <SourceSurface title="Fragment GLSL" helper={exportGlslHelper} source={glslExportSource} footer={<><button className="button primary wide" onClick={() => copyText(glslExportSource, isPaperStyle(recipe.style) ? "Paper props copied" : "GLSL copied")}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : isPaperStyle(recipe.style) ? "Copy props" : "Copy GLSL"}</button><button className="button wide ghost" onClick={() => exportText(glslExportSource, isPaperStyle(recipe.style) ? "shader-studio-paper-props.json" : "shader-studio-shader.glsl", isPaperStyle(recipe.style) ? "application/json" : "text/plain")}><Download /> Download {isPaperStyle(recipe.style) ? ".json" : ".glsl"}</button></>} />}</div></div></div>}
    {mockupExportOpen && <div className="modal-backdrop" role="presentation"><div className={`export-modal mockup-export-modal${exportTab === "variations" ? " variations-export-modal" : ""}`} role="dialog" aria-modal="true" aria-labelledby="mockup-export-title"><button className="close" onClick={() => setMockupExportOpen(false)} aria-label="Close"><X /></button><div className="export-modal-header"><div className="export-header"><div><h2 id="mockup-export-title">Export shader</h2><p>Choose a shader-only or composed mockup output.</p></div></div><div className="export-tabs" role="tablist"><button className={exportTab === "image" ? "active" : ""} onClick={() => setExportTab("image")}>Image</button><button className={exportTab === "video" ? "active" : ""} onClick={() => setExportTab("video")}>Animation</button><button className={exportTab === "variations" ? "active" : ""} onClick={() => setExportTab("variations")}>Variations</button><button className={exportTab === "mockup" ? "active" : ""} onClick={() => setExportTab("mockup")} disabled={!mockup.visible}>Mockup</button><button onClick={() => { setMockupExportOpen(false); setExportTab("prompt"); setExportOpen(true); }}>Prompt</button><button onClick={() => { setMockupExportOpen(false); setExportTab("react"); setExportOpen(true); }}>React code</button><button onClick={() => { setMockupExportOpen(false); setExportTab("glsl"); setExportOpen(true); }}>GLSL</button></div></div><div className="export-modal-body">{exportTab === "image" && <ImageExportPanel recipe={recipe} settings={videoSettings} onSettingsChange={updateVideoSettings} onExport={exportPng} description="Captures the shader only." />}{exportTab === "video" && <CompactVideoExportPanel recipe={recipe} settings={videoSettings} onSettingsChange={updateVideoSettings} onExport={exportVideo} videoProgress={videoProgress} />}{exportTab === "variations" && <VariationsExportPanel recipe={recipe} settings={videoSettings} onSettingsChange={updateVideoSettings} onApplyToCanvas={(next) => change(next)} />}{exportTab === "mockup" && <><div className="export-mode-toggle" role="tablist"><button className={mockupExportMode === "image" ? "active" : ""} onClick={() => setMockupExportMode("image")}>Image</button><button className={mockupExportMode === "video" ? "active" : ""} onClick={() => setMockupExportMode("video")}>Video</button></div><div className="mockup-export-controls mockup-export-controls-solo"><h3>{mockupExportMode === "image" ? "Mockup PNG" : "Animated mockup video"}</h3><p>Exports the live mockup with shader, media, and type layers.</p><label>Aspect<select value={videoSettings.aspect} onChange={(event) => updateVideoSettings({ aspect: event.target.value as VideoExportSettings["aspect"] })}><option value="16:9">16:9</option><option value="1:1">1:1</option><option value="9:16">9:16</option></select></label>{mockupExportMode === "image" ? <><label>Resolution<select value={mockupImageHeight} onChange={(event) => setMockupImageHeight(Number(event.target.value) as 720 | 1080 | 1440)}><option value={720}>720p</option><option value={1080}>1080p</option><option value={1440}>1440p</option></select></label><button className="button primary wide" onClick={exportMockupImage}><ImageDown /> Download mockup PNG</button></> : <><label>Resolution<select value={videoSettings.height} onChange={(event) => updateVideoSettings({ height: Number(event.target.value) as VideoExportSettings["height"] })}><option value={480}>480p</option><option value={720}>720p</option><option value={1080}>1080p</option></select></label><label>Duration<select value={videoSettings.duration} onChange={(event) => updateVideoSettings({ duration: Number(event.target.value) as VideoExportSettings["duration"] })}><option value={2}>2 s</option><option value={3}>3 s</option><option value={5}>5 s</option></select></label><button className="button primary wide" onClick={exportMockupVideo} disabled={videoProgress !== null}><Video /> Export mockup video</button></>}</div></>}</div></div></div>}

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
