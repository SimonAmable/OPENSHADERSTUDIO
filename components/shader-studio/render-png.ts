import type { Recipe } from "./types";
import { hexToRgb, isPaperStyle } from "./canvas";

export function slugifyRecipeName(name: string) {
  return name.toLowerCase().replaceAll(" ", "-").replace(/[^a-z0-9-_]/g, "") || "shader";
}

export function canvasToPngBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("Could not encode PNG"));
    }, "image/png");
  });
}

export function scaleCanvasToPngBlob(source: HTMLCanvasElement, width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Could not create export canvas");
  context.drawImage(source, 0, 0, width, height);
  return canvasToPngBlob(canvas);
}

export function renderNativeRecipeToCanvas(recipe: Recipe, width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
  if (!gl) throw new Error("WebGL is unavailable in this browser");
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed");
    return shader;
  };
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
  return canvas;
}

export async function renderRecipeToPngBlob(recipe: Recipe, width: number, height: number, paperSource?: HTMLCanvasElement | null) {
  if (isPaperStyle(recipe.style)) {
    if (!paperSource) throw new Error("Shader preview is unavailable");
    return scaleCanvasToPngBlob(paperSource, width, height);
  }
  return canvasToPngBlob(renderNativeRecipeToCanvas(recipe, width, height));
}
