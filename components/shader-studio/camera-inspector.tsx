"use client";

import { type MouseEvent, type PointerEvent, type RefObject, useEffect, useMemo, useRef, useState } from "react";
import { Slider } from "./slider";
import { ShaderCanvas, mockupPresets } from "./canvas";
import { getCameraFrame, getPanoramaCameraFrame } from "./geometry";
import type { CameraGeometry, CameraMode, CameraTool2D, CameraTool3D, MockupSettings, Recipe } from "./types";

/** Static first-frame preview — never autoplays (main stage owns playback). */
function PausedMockupVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    video.pause();
    const showFirstFrame = () => {
      if (video.readyState >= 1 && video.currentTime === 0) {
        try { video.currentTime = 0.001; } catch { /* ignore seek errors on some codecs */ }
      }
    };
    video.addEventListener("loadedmetadata", showFirstFrame);
    showFirstFrame();
    return () => video.removeEventListener("loadedmetadata", showFirstFrame);
  }, [src]);
  return <video ref={ref} src={src} muted playsInline preload="metadata" />;
}

function MockupPreviewMedia({ mockup }: { mockup: MockupSettings }) {
  if (mockup.media && mockup.mediaType === "video") return <PausedMockupVideo src={mockup.media} />;
  if (mockup.media) return <img src={mockup.media} alt="Current mockup media" />;
  return <div className="camera-preview-demo"><span>THE NEXT RELEASE</span><b>Make the work<br />feel inevitable.</b></div>;
}

export function CameraPadScene({ recipe, mockup, geometry, camera }: { recipe: Recipe; mockup: MockupSettings; geometry: CameraGeometry; camera: Pick<MockupSettings, "scale" | "cameraX" | "cameraY" | "x" | "y" | "rotate"> }) {
  const frame = getCameraFrame(camera, geometry);
  const panX = -camera.cameraX / 50 * frame.panLimitX * frame.previewScale;
  const panY = -camera.cameraY / 50 * frame.panLimitY * frame.previewScale;
  const offsetX = camera.x / 100 * geometry.viewportWidth * frame.previewScale;
  const offsetY = camera.y / 100 * geometry.viewportHeight * frame.previewScale;
  return <>
    <ShaderCanvas recipe={recipe} frozen onError={() => undefined} />
    <div className="camera-preview-media" style={{ width: geometry.stageWidth * frame.previewScale, height: geometry.stageHeight * frame.previewScale, transform: `translate(-50%, -50%) translate(${offsetX + panX}px, ${offsetY + panY}px) scale(${frame.renderScale}) rotate(${camera.rotate}deg)` }}>
      <MockupPreviewMedia mockup={mockup} />
    </div>
  </>;
}

function CameraNavigatorScene({ recipe, mockup, geometry, hoverCenter }: { recipe: Recipe; mockup: MockupSettings; geometry: CameraGeometry; hoverCenter: { x: number; y: number } | null }) {
  const frame = getPanoramaCameraFrame(mockup, geometry);
  const panoramaScale = geometry.stageWidth && geometry.stageHeight ? Math.min(geometry.padWidth * .78 / geometry.stageWidth, geometry.padHeight * .78 / geometry.stageHeight) : 1;
  return <>
    <ShaderCanvas recipe={recipe} frozen onError={() => undefined} />
    <div className="camera-preview-media camera-panorama-media" style={{ width: geometry.stageWidth * panoramaScale, height: geometry.stageHeight * panoramaScale, transform: `translate(-50%, -50%) rotate(${mockup.rotate}deg)` }}>
      <MockupPreviewMedia mockup={mockup} />
    </div>
    <div className="camera-focus-window camera-current-window" style={{ width: frame.cropWidth, height: frame.cropHeight, left: frame.cropCenterX, top: frame.cropCenterY }}><i className="camera-handle" aria-hidden="true" /></div>
    {hoverCenter && <div className="camera-focus-window camera-hover-window" style={{ width: frame.cropWidth, height: frame.cropHeight, left: hoverCenter.x, top: hoverCenter.y }}><i className="camera-handle" aria-hidden="true" /></div>}
  </>;
}

export function CameraPresetPreview({ recipe, mockup, geometry, preset }: { recipe: Recipe; mockup: MockupSettings; geometry: CameraGeometry; preset: (typeof mockupPresets)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const [padSize, setPadSize] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => setPadSize({ width: element.clientWidth, height: element.clientHeight });
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const thumbGeometry = useMemo(() => ({ ...geometry, padWidth: padSize.width, padHeight: padSize.height }), [geometry, padSize.width, padSize.height]);
  const camera = useMemo(() => ({ ...mockup, ...preset.settings }), [mockup, preset.settings]);
  return <div ref={ref} className="layout-preset-preview camera-pad zoom-preview" aria-hidden="true">{geometry.viewportWidth && padSize.width ? <CameraPadScene recipe={recipe} mockup={mockup} geometry={thumbGeometry} camera={camera} /> : null}</div>;
}

export function RightCameraInspector({
  recipe, mockup, geometry, mode, tool2D, tool3D, hoverCenter, basePresetId,
  onModeChange, onTool2DChange, onTool3DChange, onChange, onPreset, onResetCamera,
  onPadPointerDown, onPadPointerMove, onPadPointerUp, onPadPointerCancel, onPadPointerLeave, cameraPadRef,
}: {
  recipe: Recipe;
  mockup: MockupSettings;
  geometry: CameraGeometry;
  mode: CameraMode;
  tool2D: CameraTool2D;
  tool3D: CameraTool3D;
  hoverCenter: { x: number; y: number } | null;
  basePresetId: string | null;
  onModeChange: (mode: CameraMode) => void;
  onTool2DChange: (tool: CameraTool2D) => void;
  onTool3DChange: (tool: CameraTool3D) => void;
  onChange: (update: Partial<MockupSettings>) => void;
  onPreset: (preset: (typeof mockupPresets)[number]) => void;
  onResetCamera: (event: MouseEvent<HTMLButtonElement>) => void;
  onPadPointerDown: (event: PointerEvent<HTMLDivElement>) => void;
  onPadPointerMove: (event: PointerEvent<HTMLDivElement>) => void;
  onPadPointerUp: (event: PointerEvent<HTMLDivElement>) => void;
  onPadPointerCancel: (event: PointerEvent<HTMLDivElement>) => void;
  onPadPointerLeave: () => void;
  cameraPadRef: RefObject<HTMLDivElement | null>;
}) {
  const presets = mode === "zoom"
    ? mockupPresets.filter((preset) => !["tilt", "drama", "overhead"].includes(preset.id))
    : mockupPresets;
  const showCameraPad = mode === "zoom" ? tool2D === "camera" : tool3D === "camera" || tool3D === "tilt";
  const padIsTilt = mode === "tilt" && tool3D === "tilt";
  const padIsCamera = (mode === "zoom" && tool2D === "camera") || (mode === "tilt" && tool3D === "camera");

  return <aside className="camera-inspector right-camera-inspector">
    <div className="camera-tabs" role="tablist" aria-label="Transform space">
      <button type="button" role="tab" aria-selected={mode === "zoom"} className={mode === "zoom" ? "active" : ""} onClick={() => onModeChange("zoom")}>2D</button>
      <button type="button" role="tab" aria-selected={mode === "tilt"} className={mode === "tilt" ? "active" : ""} onClick={() => onModeChange("tilt")}>3D</button>
    </div>

    {mode === "zoom" ? (
      <div className="camera-subtabs" role="tablist" aria-label="2D tools">
        <button type="button" role="tab" aria-selected={tool2D === "camera"} className={tool2D === "camera" ? "active" : ""} onClick={() => onTool2DChange("camera")}>Camera</button>
        <button type="button" role="tab" aria-selected={tool2D === "rotation"} className={tool2D === "rotation" ? "active" : ""} onClick={() => onTool2DChange("rotation")}>Rotation</button>
      </div>
    ) : (
      <div className="camera-subtabs" role="tablist" aria-label="3D tools">
        <button type="button" role="tab" aria-selected={tool3D === "camera"} className={tool3D === "camera" ? "active" : ""} onClick={() => onTool3DChange("camera")}>Camera</button>
        <button type="button" role="tab" aria-selected={tool3D === "tilt"} className={tool3D === "tilt" ? "active" : ""} onClick={() => onTool3DChange("tilt")}>Tilt</button>
        <button type="button" role="tab" aria-selected={tool3D === "roll"} className={tool3D === "roll" ? "active" : ""} onClick={() => onTool3DChange("roll")}>Roll</button>
      </div>
    )}

    {showCameraPad && <div
      ref={cameraPadRef}
      className={`camera-pad ${padIsTilt ? "tilt-preview" : "zoom-preview"}`}
      onPointerDown={onPadPointerDown}
      onPointerMove={onPadPointerMove}
      onPointerUp={onPadPointerUp}
      onPointerCancel={onPadPointerCancel}
      onPointerLeave={onPadPointerLeave}
      role="application"
      aria-label={padIsTilt ? "Drag to tilt the mockup" : "Drag to move the visible camera view"}
    >
      {padIsCamera && <CameraNavigatorScene recipe={recipe} mockup={mockup} geometry={geometry} hoverCenter={hoverCenter} />}
      {padIsTilt && <div className="camera-pad-card" style={{ transform: `translate(-50%, -50%) perspective(280px) rotateX(${mockup.tiltX}deg) rotateY(${mockup.tiltY}deg) rotateZ(${mockup.rotate}deg) scale(${.65 + mockup.scale * .18})` }} />}
      <span className="camera-cross horizontal" /><span className="camera-cross vertical" />
      {padIsTilt && <i className="camera-handle tilt-handle" style={{ left: `${50 + Math.max(-45, Math.min(45, mockup.tiltY)) * 1.1}%`, top: `${50 - Math.max(-45, Math.min(45, mockup.tiltX)) * 1.1}%` }} />}
      {padIsCamera && <button type="button" className="camera-center-reset" aria-label="Reset camera to center" title="Reset to center" onPointerDown={(event) => event.stopPropagation()} onClick={onResetCamera} />}
      {padIsTilt && <span className="tilt-preview-label">Tilt preview</span>}
    </div>}

    {mode === "zoom" && tool2D === "camera" && <>
      <Slider label="Zoom" value={mockup.scale} min={.45} max={4} step={.01} unit="×" onChange={(scale) => onChange({ scale })} />
    </>}

    {mode === "zoom" && tool2D === "rotation" && <>
      <div className="right-camera-preview camera-pad rotation-preview" aria-hidden="true">
        <div className="camera-pad-card" style={{ transform: `translate(-50%, -50%) rotate(${mockup.rotate}deg) scale(${.72 + mockup.scale * .12}) scale(${mockup.flipX ? -1 : 1}, ${mockup.flipY ? -1 : 1})` }} />
      </div>
      <Slider label="Rotation" value={mockup.rotate} min={-180} max={180} step={1} unit="°" onChange={(rotate) => onChange({ rotate })} />
      <div className="flip-actions">
        <button type="button" className={mockup.flipX ? "active" : ""} onClick={() => onChange({ flipX: !mockup.flipX })}>Flip horizontal</button>
        <button type="button" className={mockup.flipY ? "active" : ""} onClick={() => onChange({ flipY: !mockup.flipY })}>Flip vertical</button>
      </div>
    </>}

    {mode === "tilt" && tool3D === "camera" && <>
      <Slider label="Zoom" value={mockup.scale} min={.45} max={4} step={.01} unit="×" onChange={(scale) => onChange({ scale })} />
    </>}

    {mode === "tilt" && tool3D === "tilt" && <>
      <Slider label="Tilt X" value={mockup.tiltX} min={-45} max={45} step={1} unit="°" onChange={(tiltX) => onChange({ tiltX })} />
      <Slider label="Tilt Y" value={mockup.tiltY} min={-45} max={45} step={1} unit="°" onChange={(tiltY) => onChange({ tiltY })} />
    </>}

    {mode === "tilt" && tool3D === "roll" && <>
      <div className="right-camera-preview camera-pad tilt-preview" aria-hidden="true">
        <div className="camera-pad-card" style={{ transform: `translate(-50%, -50%) perspective(280px) rotateX(${mockup.tiltX}deg) rotateY(${mockup.tiltY}deg) rotateZ(${mockup.rotate}deg) scale(${.65 + mockup.scale * .18})` }} />
        <span className="tilt-preview-label">Roll preview</span>
      </div>
      <Slider label="Roll" value={mockup.rotate} min={-180} max={180} step={1} unit="°" onChange={(rotate) => onChange({ rotate })} />
    </>}

    <div className="section-label camera-label">{mode === "zoom" ? "2D layout presets" : "3D scene presets"}</div>
    <div className="layout-presets">{presets.map((preset) => <button key={preset.id} type="button" onClick={() => onPreset(preset)} className={`layout-preset ${preset.id} ${basePresetId === preset.id ? "selected" : ""}`} aria-pressed={basePresetId === preset.id}><CameraPresetPreview recipe={recipe} mockup={mockup} geometry={geometry} preset={preset} />{preset.id === "custom" && <b>Custom layout</b>}<em>{preset.id === "custom" ? "" : preset.label}</em></button>)}</div>
  </aside>;
}
