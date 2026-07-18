import type { PointerEvent } from "react";
import type { CameraFrame, CameraGeometry, MockupSettings } from "./types";

export const emptyCameraGeometry: CameraGeometry = { viewportWidth: 0, viewportHeight: 0, stageWidth: 0, stageHeight: 0, padWidth: 0, padHeight: 0 };

export function getCameraFrame(camera: Pick<MockupSettings, "scale" | "cameraX" | "cameraY">, geometry: CameraGeometry): CameraFrame {
  const { viewportWidth, viewportHeight, stageWidth, stageHeight, padWidth, padHeight } = geometry;
  if (!viewportWidth || !viewportHeight || !stageWidth || !stageHeight) return { renderScale: camera.scale, panLimitX: 0, panLimitY: 0, cropWidth: 0, cropHeight: 0, cropCenterX: 0, cropCenterY: 0, previewScale: 1 };
  const coverScale = Math.max(viewportWidth / stageWidth, viewportHeight / stageHeight);
  const renderScale = camera.scale * coverScale;
  const panLimitX = (stageWidth * renderScale + viewportWidth) / 2;
  const panLimitY = (stageHeight * renderScale + viewportHeight) / 2;
  const previewScale = padWidth && padHeight ? Math.min(padWidth / viewportWidth, padHeight / viewportHeight) : 1;
  const cropWidth = Math.min(padWidth, viewportWidth / renderScale * previewScale);
  const cropHeight = Math.min(padHeight, viewportHeight / renderScale * previewScale);
  const unclampedCenterX = padWidth / 2 + camera.cameraX / 50 * panLimitX * previewScale;
  const unclampedCenterY = padHeight / 2 + camera.cameraY / 50 * panLimitY * previewScale;
  return { renderScale, panLimitX, panLimitY, cropWidth, cropHeight, cropCenterX: Math.max(cropWidth / 2, Math.min(padWidth - cropWidth / 2, unclampedCenterX)), cropCenterY: Math.max(cropHeight / 2, Math.min(padHeight - cropHeight / 2, unclampedCenterY)), previewScale };
}

export type CameraNavigatorSnapPoint = { id: "current" | "center"; x: number; y: number };

export const CAMERA_NAVIGATOR_SNAP_THRESHOLD_PX = 10;
export const CAMERA_NAVIGATOR_ALIGN_THRESHOLD_PX = 4;

function clampNavigatorCenter(center: { x: number; y: number }, frame: CameraFrame, padWidth: number, padHeight: number) {
  return {
    x: Math.max(frame.cropWidth / 2, Math.min(padWidth - frame.cropWidth / 2, center.x)),
    y: Math.max(frame.cropHeight / 2, Math.min(padHeight - frame.cropHeight / 2, center.y)),
  };
}

export function getCameraNavigatorSnapPoints(frame: CameraFrame, padWidth: number, padHeight: number): CameraNavigatorSnapPoint[] {
  const current = clampNavigatorCenter({ x: frame.cropCenterX, y: frame.cropCenterY }, frame, padWidth, padHeight);
  const center = clampNavigatorCenter({ x: padWidth / 2, y: padHeight / 2 }, frame, padWidth, padHeight);
  const snaps: CameraNavigatorSnapPoint[] = [{ id: "current", ...current }];
  if (Math.hypot(current.x - center.x, current.y - center.y) > 1) snaps.push({ id: "center", ...center });
  return snaps;
}

export function snapNavigatorCenter(center: { x: number; y: number }, snaps: CameraNavigatorSnapPoint[], thresholdPx: number) {
  let nearest: CameraNavigatorSnapPoint | null = null;
  let nearestDist = thresholdPx;
  for (const snap of snaps) {
    const dist = Math.hypot(center.x - snap.x, center.y - snap.y);
    if (dist <= nearestDist) {
      nearestDist = dist;
      nearest = snap;
    }
  }
  if (!nearest) return { center, snapId: null as "current" | "center" | null };
  return { center: { x: nearest.x, y: nearest.y }, snapId: nearest.id };
}

export type CameraNavigatorAxisSnap = "current" | "pad";

export type CameraNavigatorHoverSnap = {
  active: boolean;
  point: "current" | "center" | null;
  axisX: CameraNavigatorAxisSnap | null;
  axisY: CameraNavigatorAxisSnap | null;
};

export function resolveNavigatorHoverCenter(raw: { x: number; y: number }, frame: CameraFrame, padWidth: number, padHeight: number, snaps: CameraNavigatorSnapPoint[]) {
  const clamped = clampNavigatorCenter(raw, frame, padWidth, padHeight);
  const pointSnap = snapNavigatorCenter(clamped, snaps, CAMERA_NAVIGATOR_SNAP_THRESHOLD_PX);
  if (pointSnap.snapId) {
    const axisKind: CameraNavigatorAxisSnap = pointSnap.snapId === "center" ? "pad" : "current";
    return {
      center: pointSnap.center,
      snap: { active: true, point: pointSnap.snapId, axisX: axisKind, axisY: axisKind } satisfies CameraNavigatorHoverSnap,
    };
  }

  let x = clamped.x;
  let y = clamped.y;
  let axisX: CameraNavigatorAxisSnap | null = null;
  let axisY: CameraNavigatorAxisSnap | null = null;
  const xCandidates = [
    { target: frame.cropCenterX, kind: "current" as const, dist: Math.abs(x - frame.cropCenterX) },
    { target: padWidth / 2, kind: "pad" as const, dist: Math.abs(x - padWidth / 2) },
  ].filter((candidate) => candidate.dist <= CAMERA_NAVIGATOR_ALIGN_THRESHOLD_PX).sort((a, b) => a.dist - b.dist);
  const yCandidates = [
    { target: frame.cropCenterY, kind: "current" as const, dist: Math.abs(y - frame.cropCenterY) },
    { target: padHeight / 2, kind: "pad" as const, dist: Math.abs(y - padHeight / 2) },
  ].filter((candidate) => candidate.dist <= CAMERA_NAVIGATOR_ALIGN_THRESHOLD_PX).sort((a, b) => a.dist - b.dist);

  if (xCandidates[0]) {
    x = xCandidates[0].target;
    axisX = xCandidates[0].kind;
  }
  if (yCandidates[0]) {
    y = yCandidates[0].target;
    axisY = yCandidates[0].kind;
  }

  return {
    center: clampNavigatorCenter({ x, y }, frame, padWidth, padHeight),
    snap: { active: axisX !== null || axisY !== null, point: null, axisX, axisY } satisfies CameraNavigatorHoverSnap,
  };
}

export type CameraNavigatorGuideLine = { axis: "x" | "y"; position: number; kind: "align" | "intersect" | "smart"; spanStart: number; spanEnd: number };

function navigatorBoxEdges(centerX: number, centerY: number, width: number, height: number) {
  const halfW = width / 2;
  const halfH = height / 2;
  return { left: centerX - halfW, right: centerX + halfW, top: centerY - halfH, bottom: centerY + halfH, cx: centerX, cy: centerY };
}

function pushAlignGuide(lines: CameraNavigatorGuideLine[], seen: Set<string>, axis: "x" | "y", a: number, b: number, spanStart: number, spanEnd: number) {
  if (Math.abs(a - b) > CAMERA_NAVIGATOR_ALIGN_THRESHOLD_PX) return;
  const position = (a + b) / 2;
  const key = `${axis}:${Math.round(position * 10)}:align`;
  if (seen.has(key)) return;
  seen.add(key);
  lines.push({ axis, position, kind: "align", spanStart, spanEnd });
}

export function getCameraNavigatorGuides(currentCenter: { x: number; y: number }, hoverCenter: { x: number; y: number }, cropWidth: number, cropHeight: number, padWidth: number, padHeight: number, snap?: CameraNavigatorHoverSnap | null) {
  const lines: CameraNavigatorGuideLine[] = [];
  const seen = new Set<string>();
  const current = navigatorBoxEdges(currentCenter.x, currentCenter.y, cropWidth, cropHeight);
  const hover = navigatorBoxEdges(hoverCenter.x, hoverCenter.y, cropWidth, cropHeight);

  if (snap?.axisX) {
    const key = `x:${Math.round(hoverCenter.x * 10)}:smart`;
    if (!seen.has(key)) {
      seen.add(key);
      lines.push({ axis: "x", position: hoverCenter.x, kind: "smart", spanStart: 0, spanEnd: padHeight });
    }
  }
  if (snap?.axisY) {
    const key = `y:${Math.round(hoverCenter.y * 10)}:smart`;
    if (!seen.has(key)) {
      seen.add(key);
      lines.push({ axis: "y", position: hoverCenter.y, kind: "smart", spanStart: 0, spanEnd: padWidth });
    }
  }

  const spanYStart = Math.min(current.top, hover.top);
  const spanYEnd = Math.max(current.bottom, hover.bottom);
  const spanXStart = Math.min(current.left, hover.left);
  const spanXEnd = Math.max(current.right, hover.right);

  pushAlignGuide(lines, seen, "x", current.left, hover.left, spanYStart, spanYEnd);
  pushAlignGuide(lines, seen, "x", current.right, hover.right, spanYStart, spanYEnd);
  pushAlignGuide(lines, seen, "x", current.cx, hover.cx, spanYStart, spanYEnd);
  pushAlignGuide(lines, seen, "y", current.top, hover.top, spanXStart, spanXEnd);
  pushAlignGuide(lines, seen, "y", current.bottom, hover.bottom, spanXStart, spanXEnd);
  pushAlignGuide(lines, seen, "y", current.cy, hover.cy, spanXStart, spanXEnd);

  const intersectLeft = Math.max(current.left, hover.left);
  const intersectRight = Math.min(current.right, hover.right);
  const intersectTop = Math.max(current.top, hover.top);
  const intersectBottom = Math.min(current.bottom, hover.bottom);
  if (intersectLeft < intersectRight - .5 && intersectTop < intersectBottom - .5) {
    const pushIntersect = (axis: "x" | "y", position: number, spanStart: number, spanEnd: number) => {
      const key = `${axis}:${Math.round(position * 10)}:intersect`;
      if (seen.has(key)) return;
      seen.add(key);
      lines.push({ axis, position, kind: "intersect", spanStart, spanEnd });
    };
    pushIntersect("x", intersectLeft, intersectTop, intersectBottom);
    pushIntersect("x", intersectRight, intersectTop, intersectBottom);
    pushIntersect("y", intersectTop, intersectLeft, intersectRight);
    pushIntersect("y", intersectBottom, intersectLeft, intersectRight);
  }

  return lines;
}

export function getNavigatorCenter(event: PointerEvent<HTMLDivElement>, frame: CameraFrame, box: DOMRect) {
  return { x: Math.max(frame.cropWidth / 2, Math.min(box.width - frame.cropWidth / 2, event.clientX - box.left)), y: Math.max(frame.cropHeight / 2, Math.min(box.height - frame.cropHeight / 2, event.clientY - box.top)) };
}

export function cameraFromNavigatorCenter(centerX: number, centerY: number, box: DOMRect, camera: Pick<MockupSettings, "x" | "y">, frame: CameraFrame, geometry: CameraGeometry) {
  const boundedX = centerX - box.width / 2;
  const boundedY = centerY - box.height / 2;
  return { cameraX: frame.panLimitX ? Math.round(Math.max(-50, Math.min(50, (boundedX / frame.previewScale * frame.renderScale + camera.x / 100 * geometry.viewportWidth) / frame.panLimitX * 50))) : 0, cameraY: frame.panLimitY ? Math.round(Math.max(-50, Math.min(50, (boundedY / frame.previewScale * frame.renderScale + camera.y / 100 * geometry.viewportHeight) / frame.panLimitY * 50))) : 0 };
}

export function cameraDeltaFromPadDrag(dx: number, dy: number, frame: CameraFrame) { return { cameraX: frame.panLimitX ? dx * frame.renderScale / (frame.previewScale * frame.panLimitX) * 50 : 0, cameraY: frame.panLimitY ? dy * frame.renderScale / (frame.previewScale * frame.panLimitY) * 50 : 0 }; }

export function getPanoramaCameraFrame(camera: Pick<MockupSettings, "scale" | "x" | "y" | "cameraX" | "cameraY">, geometry: CameraGeometry): CameraFrame {
  const frame = getCameraFrame(camera, geometry);
  const { viewportWidth, viewportHeight, stageWidth, stageHeight, padWidth, padHeight } = geometry;
  if (!viewportWidth || !viewportHeight || !stageWidth || !stageHeight) return frame;
  const panoramaScale = Math.min(padWidth * .78 / stageWidth, padHeight * .78 / stageHeight);
  const cropWidth = Math.min(padWidth, viewportWidth / frame.renderScale * panoramaScale);
  const cropHeight = Math.min(padHeight, viewportHeight / frame.renderScale * panoramaScale);
  const sceneCenterX = (-camera.x / 100 * viewportWidth + camera.cameraX / 50 * frame.panLimitX) / frame.renderScale;
  const sceneCenterY = (-camera.y / 100 * viewportHeight + camera.cameraY / 50 * frame.panLimitY) / frame.renderScale;
  return { ...frame, cropWidth, cropHeight, cropCenterX: Math.max(cropWidth / 2, Math.min(padWidth - cropWidth / 2, padWidth / 2 + sceneCenterX * panoramaScale)), cropCenterY: Math.max(cropHeight / 2, Math.min(padHeight - cropHeight / 2, padHeight / 2 + sceneCenterY * panoramaScale)), previewScale: panoramaScale };
}
