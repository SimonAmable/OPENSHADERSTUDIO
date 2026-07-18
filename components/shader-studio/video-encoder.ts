import {
  BufferTarget,
  CanvasSource,
  Mp4OutputFormat,
  Output,
  QUALITY_VERY_HIGH,
  WebMOutputFormat,
  canEncodeVideo,
  getFirstEncodableVideoCodec,
  type VideoCodec,
} from "mediabunny";

export type RecordCanvasAnimationOptions = {
  canvas: HTMLCanvasElement;
  frameIndexes: number[];
  fps: number;
  mimeType: string;
  bitrate: number;
  onProgress: (progress: number) => void;
  renderFrame: (timeSec: number) => void | Promise<void>;
};

/** Target bitrate for shader/motion content (busy gradients need more than talking-head heuristics). */
export function exportVideoBitrate(width: number, height: number, fps: number) {
  const pixels = width * height;
  const base = pixels >= 2560 * 1440 ? 28_000_000
    : pixels >= 1920 * 1080 ? 18_000_000
    : pixels >= 1280 * 720 ? 10_000_000
    : 5_000_000;
  return Math.round(base * (fps / 30));
}

export function exportExtensionForMime(mimeType: string) {
  return mimeType.includes("mp4") || mimeType.includes("avc") ? "mp4" : "webm";
}

function waitForPaint() {
  return new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => resolve());
    });
  });
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => window.setTimeout(resolve, ms));
}

type EncoderPlan = {
  codec: VideoCodec;
  mimeType: string;
  extension: "mp4" | "webm";
  format: Mp4OutputFormat | WebMOutputFormat;
};

async function resolveEncoderPlan(preferredMime: string, width: number, height: number, bitrate: number): Promise<EncoderPlan | null> {
  const wantsMp4 = preferredMime.includes("mp4") || preferredMime.includes("avc");
  const wantsVp8 = preferredMime.includes("vp8");
  const wantsVp9 = preferredMime.includes("vp9") || (!wantsMp4 && !wantsVp8);

  const tryCodec = async (codec: VideoCodec, mimeType: string, extension: "mp4" | "webm", format: Mp4OutputFormat | WebMOutputFormat) => {
    if (await canEncodeVideo(codec, { width, height, bitrate })) {
      return { codec, mimeType, extension, format } satisfies EncoderPlan;
    }
    return null;
  };

  if (wantsMp4) {
    const mp4 = await tryCodec("avc", "video/mp4", "mp4", new Mp4OutputFormat());
    if (mp4) return mp4;
  }
  if (wantsVp9) {
    const vp9 = await tryCodec("vp9", "video/webm;codecs=vp9", "webm", new WebMOutputFormat());
    if (vp9) return vp9;
  }
  if (wantsVp8 || wantsVp9 || wantsMp4) {
    const vp8 = await tryCodec("vp8", "video/webm;codecs=vp8", "webm", new WebMOutputFormat());
    if (vp8) return vp8;
  }

  const fallbackCodec = await getFirstEncodableVideoCodec(["avc", "vp9", "vp8"], { width, height, bitrate });
  if (!fallbackCodec) return null;
  if (fallbackCodec === "avc") return { codec: "avc", mimeType: "video/mp4", extension: "mp4", format: new Mp4OutputFormat() };
  if (fallbackCodec === "vp9") return { codec: "vp9", mimeType: "video/webm;codecs=vp9", extension: "webm", format: new WebMOutputFormat() };
  return { codec: "vp8", mimeType: "video/webm;codecs=vp8", extension: "webm", format: new WebMOutputFormat() };
}

async function recordWithWebCodecs({
  canvas,
  frameIndexes,
  fps,
  mimeType,
  bitrate,
  onProgress,
  renderFrame,
}: RecordCanvasAnimationOptions): Promise<{ blob: Blob; mimeType: string } | null> {
  if (typeof VideoEncoder === "undefined" || typeof VideoFrame === "undefined") return null;

  const plan = await resolveEncoderPlan(mimeType, canvas.width, canvas.height, bitrate);
  if (!plan) return null;

  const target = new BufferTarget();
  const output = new Output({ format: plan.format, target });
  const encodingBitrate = bitrate > 0 ? bitrate : QUALITY_VERY_HIGH;
  const source = new CanvasSource(canvas, {
    codec: plan.codec,
    bitrate: encodingBitrate,
    bitrateMode: "constant",
    latencyMode: "quality",
    keyFrameInterval: 1,
  });

  try {
    output.addVideoTrack(source);
    await output.start();
  } catch {
    return null;
  }

  const frameDuration = 1 / fps;
  try {
    for (let index = 0; index < frameIndexes.length; index += 1) {
      await renderFrame(frameIndexes[index] / fps);
      await waitForPaint();
      await source.add(index * frameDuration, frameDuration, { keyFrame: index % Math.max(1, fps) === 0 });
      onProgress((index + 1) / frameIndexes.length);
    }
    source.close();
    await output.finalize();
  } catch {
    try { source.close(); } catch { /* ignore */ }
    try { await output.cancel(); } catch { /* ignore */ }
    return null;
  }

  if (!target.buffer || target.buffer.byteLength < 64) return null;
  return { blob: new Blob([target.buffer], { type: plan.mimeType }), mimeType: plan.mimeType };
}

async function recordWithMediaRecorder({
  canvas,
  frameIndexes,
  fps,
  mimeType,
  bitrate,
  onProgress,
  renderFrame,
}: RecordCanvasAnimationOptions): Promise<{ blob: Blob; mimeType: string }> {
  if (!("MediaRecorder" in window)) throw new Error("Video export is not supported in this browser");

  const supported = [
    mimeType,
    "video/webm;codecs=vp9",
    "video/webm;codecs=vp8",
    "video/webm",
    "video/mp4;codecs=avc1.42E01E",
    "video/mp4",
  ].find((type) => type && MediaRecorder.isTypeSupported(type));
  if (!supported) throw new Error("No compatible video format is available in this browser");

  const stream = canvas.captureStream(0);
  const track = stream.getVideoTracks()[0] as MediaStreamTrack & { requestFrame?: () => void };
  const chunks: BlobPart[] = [];
  const recorder = new MediaRecorder(stream, {
    mimeType: supported,
    videoBitsPerSecond: bitrate,
    bitsPerSecond: bitrate,
  });

  const finished = new Promise<Blob>((resolve, reject) => {
    recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); };
    recorder.onerror = () => reject(new Error("Video encoding failed"));
    recorder.onstop = () => resolve(new Blob(chunks, { type: supported }));
  });

  const frameDurationMs = 1000 / fps;
  recorder.start(Math.max(100, Math.round(frameDurationMs * 4)));

  await renderFrame(frameIndexes[0] / fps);
  await waitForPaint();
  track.requestFrame?.();

  const timelineStart = performance.now();
  for (let index = 0; index < frameIndexes.length; index += 1) {
    if (index > 0) {
      await renderFrame(frameIndexes[index] / fps);
      await waitForPaint();
      track.requestFrame?.();
    }
    onProgress((index + 1) / frameIndexes.length);
    const targetTime = timelineStart + (index + 1) * frameDurationMs;
    const waitMs = targetTime - performance.now();
    if (waitMs > 1) await sleep(waitMs);
  }

  await waitForPaint();
  await sleep(frameDurationMs);
  if (recorder.state === "recording") recorder.requestData();
  recorder.stop();
  const blob = await finished;
  stream.getTracks().forEach((item) => item.stop());
  if (blob.size < 64) throw new Error("Video encoding produced an empty file");
  return { blob, mimeType: supported };
}

/**
 * Frame-accurate canvas → video export.
 * Prefers WebCodecs (via mediabunny) so exports are not wall-clock realtime and keep stable timestamps.
 * Falls back to MediaRecorder + captureStream(0)/requestFrame when WebCodecs is unavailable.
 */
export async function recordCanvasAnimation(options: RecordCanvasAnimationOptions): Promise<{ blob: Blob; mimeType: string }> {
  if (options.canvas.width % 2 || options.canvas.height % 2) {
    throw new Error("Export canvas must have even width and height");
  }
  if (options.frameIndexes.length === 0) {
    throw new Error("Nothing to export");
  }

  const webCodecs = await recordWithWebCodecs(options);
  if (webCodecs) return webCodecs;
  return recordWithMediaRecorder(options);
}
