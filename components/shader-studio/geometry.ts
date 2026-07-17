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
