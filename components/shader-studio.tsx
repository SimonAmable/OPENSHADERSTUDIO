"use client";

import { ChangeEvent, DragEvent, PointerEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { create } from "zustand";
import {
  BookOpen, Check, ChevronDown, CircleHelp, Code2, Copy, Download, Droplets, Eye,
  Gauge, ImageDown, Layers3, MousePointer2, Palette, Pause, Play, Redo2, RefreshCcw,
  Minus, Save, Search, Settings2, Sparkles, Undo2, Video, WandSparkles, X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Tab = "presets" | "style" | "palette" | "surface" | "motion" | "cursor" | "mockup";
type CursorEffect = "push" | "repel" | "swirl" | "ripple" | "spotlight";
type ExportTab = "image" | "video" | "mockup" | "prompt" | "react" | "glsl";
type MockupExportMode = "image" | "video";
type MockupFrame = "browser" | "glass" | "border" | "inset" | "none";
type CameraMode = "zoom" | "tilt";
type MockupAspect = "auto" | "16 / 9" | "4 / 3" | "1 / 1" | "9 / 16";
type EditorMode = "mockup" | "animation";
type AnimationClip = { id: string; label: string; presetId: string; start: number; duration: number; transition: number; easing: "ease" | "spring"; zoom: number; tilt: number; hold: number; springSpeed: number; targetX: number; targetY: number; targetTiltX: number; targetTiltY: number; targetRotate: number; cameraX: number; cameraY: number; exit: "base" | "next" };
type VideoExportSettings = { aspect: "16:9" | "1:1" | "9:16"; height: 480 | 720 | 1080; fps: 24 | 30 | 60; duration: 2 | 3 | 5 | 8; loop: boolean; mimeType: string };

const videoFormats = [
  { value: "video/webm;codecs=vp9", label: "WebM (VP9)" },
  { value: "video/webm;codecs=vp8", label: "WebM (VP8)" },
  { value: "video/mp4;codecs=avc1.42E01E", label: "MP4 (H.264)" },
];

type MockupSettings = {
  media: string | null;
  mediaType: "image" | "video" | null;
  frame: MockupFrame;
  radius: number;
  shadow: number;
  scale: number;
  x: number;
  y: number;
  cameraX: number;
  cameraY: number;
  tiltX: number;
  tiltY: number;
  rotate: number;
  visible: boolean;
};

type Recipe = {
  id: string;
  name: string;
  style: number;
  palette: string[];
  intensity: number;
  zoom: number;
  warp: number;
  contrast: number;
  speed: number;
  drift: number;
  blur: number;
  animate: boolean;
  reverse: boolean;
  grain: number;
  rotate: number;
  offsetX: number;
  offsetY: number;
  seed: number;
  smoothBlend: boolean;
  cursorEnabled: boolean;
  cursorEffect: CursorEffect;
  cursorStrength: number;
  cursorRadius: number;
  glsl: string;
};

type StudioStore = { saved: Recipe[]; save: (recipe: Recipe) => void; remove: (id: string) => void };
const useStudioStore = create<StudioStore>((set) => ({
  saved: [],
  save: (recipe) => set((state) => ({ saved: [recipe, ...state.saved.filter((item) => item.id !== recipe.id)].slice(0, 8) })),
  remove: (id) => set((state) => ({ saved: state.saved.filter((item) => item.id !== id) })),
}));

const fragmentShader = `precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;
uniform vec2 u_velocity;
uniform vec3 u_colors[5];
uniform float u_style, u_intensity, u_zoom, u_warp, u_contrast, u_speed, u_grain, u_drift, u_animate, u_reverse, u_rotate, u_seed, u_smooth_blend;
uniform vec2 u_offset;
uniform float u_cursor_on, u_cursor_effect, u_cursor_strength, u_cursor_radius;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
float noise(vec2 p) { vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y); }
float fbm(vec2 p) { float v=0., a=.55; for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+4.1;a*=.5;}return v; }
// Exact Aurora reference noise: intentionally separate from the Studio-wide noise.
float auroraHash(vec2 p){p=fract(p*vec2(234.34,435.345));p+=dot(p,p+34.23);return fract(p.x*p.y);}
float auroraNoise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(auroraHash(i),auroraHash(i+vec2(1.,0.)),u.x),mix(auroraHash(i+vec2(0.,1.)),auroraHash(i+vec2(1.,1.)),u.x),u.y);}
float auroraFbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*auroraNoise(p);p=p*2.03+vec2(17.,9.2);a*=.5;}return v;}
vec3 gradient(float t){ t=clamp(t,0.,.999); float x=t*4.; int i=int(floor(x)); float f=fract(x); if(u_smooth_blend>.5)f=f*f*(3.-2.*f); if(i==0)return mix(u_colors[0],u_colors[1],f); if(i==1)return mix(u_colors[1],u_colors[2],f); if(i==2)return mix(u_colors[2],u_colors[3],f); return mix(u_colors[3],u_colors[4],f); }
void main(){
  vec2 uv=(gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;
  vec2 p=uv*u_zoom + u_offset;
  float time=u_time*u_speed*.16*u_animate*(u_reverse>.5?-1.:1.);
  p += vec2(sin(time*.7),cos(time*.53))*u_drift*.55 + u_seed*.001;
  p = mat2(cos(u_rotate),-sin(u_rotate),sin(u_rotate),cos(u_rotate))*p;
  p += vec2(sin(p.y*3.+time),cos(p.x*3.-time))*u_warp*.16;
  float d=length(uv-u_pointer);
  vec2 pBeforeCursor=p;
  if(u_cursor_on>.5){
    float influence=smoothstep(u_cursor_radius,0.,d)*u_cursor_strength;
    vec2 dir=normalize(uv-u_pointer+0.0001);
    if(u_cursor_effect<.5) p += u_velocity*influence*1.8;
    else if(u_cursor_effect<1.5) p += dir*influence*.65;
    else if(u_cursor_effect<2.5){ float a=influence*4.; p=mat2(cos(a),-sin(a),sin(a),cos(a))*p; }
    else if(u_cursor_effect<3.5) p += dir*sin(d*32.-time*8.)*influence*.14;
  }
  float v;
  if(u_style<.5){ // Silk: broad, glossy, marbled ribbons.
    vec2 s=p*2.4; s.y+=fbm(s*.8+vec2(time*.16,0.))*2.1; s.x+=sin(s.y*1.8)*.45;
    v=.5+.5*sin(s.y*2.5+fbm(s*1.7)*5.);
  }
  else if(u_style<1.5){ // Smoke: layered cloudy density.
    float a=fbm(p*1.45+vec2(time*.11,-time*.06)); float b=fbm(p*3.1-vec2(time*.07,time*.12));
    v=smoothstep(.22,.83,a*.72+b*.42);
  }
  else if(u_style<2.5){ // Waves: soft water horizon bands.
    vec2 w=p*2.0; w.y+=fbm(w*1.4+time*.08)*.85; v=.5+.5*sin(w.y*4.2+sin(w.x*1.5+time)*.75);
    v=mix(v,fbm(w*2.+time*.1),.18);
  }
  else if(u_style<3.5){ // Flow field: turbulent liquid plumes.
    vec2 f=p*2.; f+=vec2(fbm(f+time*.09),fbm(f.yx-time*.08))*1.25; v=fbm(f*2.25);
  }
  else if(u_style<4.5){ // Aurora: direct reference animation/noise/transform port.
    float auroraTime=u_time*1.41*(u_speed/2.07)*u_animate*(u_reverse>.5?-1.:1.);
    vec2 a=uv*u_zoom;
    a=mat2(cos(u_rotate),-sin(u_rotate),sin(u_rotate),cos(u_rotate))*a;
    a+=u_offset;
    a+=u_drift*vec2(sin(auroraTime*.31),cos(auroraTime*.23));
    a+=u_warp*(vec2(auroraFbm(a*3.2+u_seed),auroraFbm(a*3.2+vec2(5.2,1.3)+u_seed))-.5);
    a+=p-pBeforeCursor; // Keep the existing pointer modes in the reference field's space.
    float curtain=auroraFbm(vec2(a.x*2.+auroraTime*.15,a.y*.6-auroraTime*.05)+u_seed);
    float band=auroraFbm(vec2(a.x*3.5-auroraTime*.1,curtain*(2.+u_intensity*3.)));
    v=smoothstep(.15,.85,band)*(1.-abs(a.y)*.7);
  }
  else if(u_style<5.5){ // Orb: a warm radial bloom with halo.
    vec2 o=p-vec2(sin(time*.7)*.12,cos(time*.6)*.08); float r=length(o);
    v=1.-smoothstep(.08,.47,r); v+=.16*exp(-r*5.)*sin(r*28.-time*2.);
  }
  else if(u_style<6.5){ // Caustics: refracted, cellular water light.
    vec2 c=p*5.; c+=vec2(sin(c.y+time*.55),sin(c.x-time*.42))*.42;
    v=pow(abs(sin(c.x+sin(c.y))*sin(c.y+sin(c.x))),.28);
  }
  else if(u_style<7.5){ // Mesh drift: muted soft-focus blobs.
    vec2 m=p*1.25+vec2(time*.06,-time*.04); v=smoothstep(.22,.78,fbm(m*.85)); v=mix(v,fbm(m*2.),.24);
  }
  else if(u_style<8.5){ // Metaballs: three distinct fluid cells.
    vec2 b=p*1.35; float d1=length(b-vec2(sin(time)*.28,cos(time*.7)*.2));
    float d2=length(b-vec2(-.3+cos(time*.6)*.16,.19)); float d3=length(b-vec2(.18,sin(time*.8)*.3));
    v=smoothstep(.34,.62,1./(1.5+d1*5.)+1./(1.5+d2*5.)+1./(1.5+d3*5.));
  }
  else if(u_style<9.5){ // Plasma: creamy psychedelic contours.
    v=.5+.25*sin(p.x*4.+time)+.25*sin(p.y*5.-time*.7)+.2*sin((p.x+p.y)*4.+time*.4);
  }
  else if(u_style<10.5){ // Warp stripes: tightly bent graphic bands.
    vec2 z=p*3.; z.x+=sin(z.y*1.65+time*.35)*1.2+fbm(z*.8)*.75; v=.5+.5*sin(z.x*5.8);
  }
  else if(u_style<11.5){ // Rings: concentric, slightly imperfect ripples.
    float r=length(p+vec2(sin(time*.2)*.03,cos(time*.2)*.03)); v=.5+.5*sin(r*20.+fbm(p*4.)*1.4-time*.8);
  }
  else if(u_style<12.5){ // Halftone: regular print dots, softly displaced.
    vec2 h=p*9.; vec2 cell=fract(h)-.5; float tone=.28+.58*fbm(floor(h)*.35); v=1.-step(tone*.42,length(cell));
  }
  else { // Aurora: the original soft curtain implementation.
    vec2 a=p; a.x+=fbm(vec2(a.y*1.4,time*.09))*1.1; float curtain=sin(a.x*5.+fbm(a*2.+time*.12)*4.);
    v=smoothstep(-.3,.85,curtain)*(.56+.44*fbm(a*3.-time*.08));
  }
  if(u_style>3.5 && u_style<4.5){ // Aurora reference post-processing: no shared character remap.
    vec3 auroraColor=gradient(clamp(v,0.,1.));
    auroraColor=(auroraColor-.5)*1.2+.5;
    float vd=length(gl_FragCoord.xy/u_resolution.xy-.5)*1.41421356;
    auroraColor*=1.-.07*smoothstep(.35,1.,vd);
    auroraColor+=(hash(gl_FragCoord.xy+u_seed)-.5)*u_grain;
    gl_FragColor=vec4(clamp(auroraColor,0.,1.),1.);
    return;
  }
  if(u_cursor_on>.5 && u_cursor_effect>3.5) v+=smoothstep(u_cursor_radius,0.,d)*u_cursor_strength*.75;
  v=mix(.5,v,u_intensity); v=pow(max(v,0.001), 1.3-u_contrast*.65);
  vec3 color=gradient(v);
  color += (hash(gl_FragCoord.xy)-.5)*u_grain;
  gl_FragColor=vec4(color,1.);
}`;

const defaultRecipe: Recipe = {
  id: "silk-01", name: "Silk", style: 0, palette: ["#060914", "#273dff", "#00ddff", "#e8fbff"],
  intensity: .76, zoom: 1.02, warp: .2, contrast: .56, speed: 1, drift: .5, blur: 0, animate: true, reverse: false, grain: .045, rotate: 0, offsetX: 0, offsetY: 0, seed: 1, smoothBlend: false,
  cursorEnabled: true, cursorEffect: "spotlight", cursorStrength: .5, cursorRadius: .5, glsl: fragmentShader,
};

const presetGroups = [
  { title: "Flow", items: [["Silk", 0], ["Smoke", 1], ["Flow field", 3], ["Waves", 2]] },
  { title: "Light", items: [["Aurora", 13], ["Shimmer", 4], ["Orb", 5], ["Caustics", 6]] },
  { title: "Blobs", items: [["Mesh drift", 7], ["Metaballs", 8]] },
  { title: "Pattern", items: [["Plasma", 9], ["Warp stripes", 10], ["Rings", 11], ["Halftone", 12]] },
] as const;
const styleNames: Record<number, string> = {
  0: "Silk", 1: "Smoke", 2: "Waves", 3: "Flow field", 4: "Shimmer", 5: "Orb", 6: "Caustics",
  7: "Mesh drift", 8: "Metaballs", 9: "Plasma", 10: "Warp stripes", 11: "Rings", 12: "Halftone", 13: "Aurora",
};

const palettes = [
  ["#060914", "#273dff", "#00ddff", "#e8fbff"], ["#180524", "#7f42ef", "#e95db2", "#ffd4f3"],
  ["#051c1a", "#078b70", "#72e87b", "#f2ffc5"], ["#260c06", "#cf432d", "#fc9f2c", "#ffebbd"],
  ["#08080e", "#4b235e", "#cc51af", "#ffd1ed"], ["#061923", "#137194", "#4cc6e7", "#e6fbff"],
  ["#17120d", "#865633", "#d69a62", "#fff0db"], ["#120b1d", "#5b2a93", "#a94fe0", "#edc3ff"],
  ["#09151a", "#146b82", "#4bbad7", "#e6faff"], ["#1a0a0d", "#9d254c", "#fa729c", "#ffe0e8"],
  ["#101014", "#565b66", "#adb1b8", "#f5f6f7"], ["#080b14", "#253d91", "#637eea", "#dbe4ff"],
  ["#120806", "#8a3619", "#f47132", "#ffce9b"], ["#07150b", "#2f783a", "#a9e84a", "#f2ffd0"],
  ["#060610", "#1b2b82", "#5140af", "#a87bc9"], ["#0c1115", "#2c5f88", "#64b7da", "#f0fbff"],
];

const presetSettings: Record<number, Partial<Recipe>> = {
  0: { palette: ["#090b22", "#3135bc", "#b28bff", "#ffe0f0"], intensity: .72, zoom: 1.18, warp: .42, contrast: .56, speed: .72, drift: .18, grain: .025 },
  1: { palette: ["#09071e", "#2d1c65", "#6b46ae", "#dfc9ff"], intensity: .68, zoom: .92, warp: .66, contrast: .42, speed: .48, drift: .3, grain: .035 },
  2: { palette: ["#061526", "#0d5c8f", "#56cde8", "#e8fbff"], intensity: .66, zoom: 1.15, warp: .28, contrast: .52, speed: 1.2, drift: .24, grain: .018 },
  3: { palette: ["#210d07", "#a6361e", "#ef8d2e", "#ffe4aa"], intensity: .8, zoom: 1.1, warp: .75, contrast: .7, speed: 1.45, drift: .45, grain: .04 },
  4: { palette: ["#0b1026", "#3d46e8", "#b18cff", "#ffd6e7"], intensity: .7, zoom: 1.4, warp: .17, contrast: .67, speed: 2.07, drift: .14, grain: .09, rotate: .28, offsetX: .05, offsetY: -.02, seed: 9947, cursorEnabled: true, cursorEffect: "swirl", cursorStrength: .65, cursorRadius: .46 },
  5: { palette: ["#070708", "#64330b", "#ff9a00", "#fff5cf"], intensity: .85, zoom: 1.18, warp: .08, contrast: .66, speed: .7, drift: .1, grain: .02 },
  6: { palette: ["#03262e", "#087e87", "#32d8d3", "#f5ffd0"], intensity: .84, zoom: 1.25, warp: .48, contrast: .76, speed: 1.18, drift: .2, grain: .025 },
  7: { palette: ["#130f0c", "#584432", "#b49a78", "#f4eadb"], intensity: .64, zoom: .86, warp: .2, contrast: .38, speed: .42, drift: .24, grain: .06 },
  8: { palette: ["#030508", "#065ed1", "#1edbff", "#f4ffff"], intensity: .9, zoom: 1.12, warp: .1, contrast: .78, speed: 1.12, drift: .25, grain: .015 },
  9: { palette: ["#2d061b", "#e52e73", "#ff9a7d", "#fff1c5"], intensity: .78, zoom: 1.06, warp: .4, contrast: .6, speed: 1.35, drift: .18, grain: .02 },
  10: { palette: ["#0b2707", "#3e8a16", "#b9ff5e", "#f3ffce"], intensity: .86, zoom: 1.06, warp: .62, contrast: .8, speed: 1.3, drift: .16, grain: .03 },
  11: { palette: ["#19052e", "#5e159e", "#bc52ff", "#f0c7ff"], intensity: .82, zoom: 1.04, warp: .16, contrast: .78, speed: .92, drift: .06, grain: .018 },
  12: { palette: ["#090909", "#424242", "#b8b8b8", "#f5f5f5"], intensity: .84, zoom: 1.12, warp: .05, contrast: .9, speed: .22, drift: .04, grain: .015 },
  13: { palette: ["#211044", "#883ab7", "#df61ba", "#ffd2ee"], intensity: .74, zoom: 1.08, warp: .36, contrast: .58, speed: 1.08, drift: .18, grain: .025 },
};

const companyThemes = [
  { name: "Modern Minimal", palette: ["#111214", "#626875", "#c9cdd3", "#f7f8fa"] },
  { name: "Vercel", palette: ["#050505", "#383838", "#a7a7a7", "#f5f5f5"] },
  { name: "Claude Amber", palette: ["#24150b", "#b55e2f", "#e7975c", "#fff0db"] },
  { name: "Claude", palette: ["#201611", "#7c4d38", "#c98f6a", "#f8e8d5"] },
  { name: "Zen Linen", palette: ["#191611", "#847a68", "#cfc3ab", "#fff9ee"] },
  { name: "Supabase", palette: ["#07120d", "#3c9f66", "#8ee9ae", "#e5ffeb"] },
  { name: "Lime Frost", palette: ["#11170b", "#6da933", "#c8f65e", "#f7ffd9"] },
  { name: "Cappuccino", palette: ["#1b0e09", "#7c472c", "#bd8157", "#f7dac0"] },
] as const;

const tabs = [
  { id: "presets" as const, label: "Presets", icon: BookOpen }, { id: "style" as const, label: "Style", icon: WandSparkles }, { id: "palette" as const, label: "Palette", icon: Palette },
  { id: "surface" as const, label: "Surface", icon: Layers3 }, { id: "motion" as const, label: "Motion", icon: Gauge },
  { id: "cursor" as const, label: "Cursor", icon: MousePointer2 }, { id: "mockup" as const, label: "Mockup", icon: ImageDown }, { id: "export" as const, label: "Export", icon: Download },
];

const mockupPresets: { id: string; label: string; settings: Omit<MockupSettings, "media" | "mediaType" | "frame" | "radius" | "shadow" | "visible" | "cameraX" | "cameraY"> }[] = [
  { id: "hero", label: "Centered", settings: { scale: .82, x: 0, y: 0, tiltX: 0, tiltY: 0, rotate: 0 } },
  { id: "float", label: "Soft float", settings: { scale: .82, x: 0, y: -2, tiltX: 4, tiltY: -9, rotate: -3 } },
  { id: "left", label: "Left stage", settings: { scale: .73, x: -22, y: 5, tiltX: 0, tiltY: 8, rotate: 1 } },
  { id: "right", label: "Right stage", settings: { scale: .73, x: 22, y: 5, tiltX: 0, tiltY: -8, rotate: -1 } },
  { id: "tilt", label: "Tilted close", settings: { scale: 1.08, x: 12, y: 8, tiltX: 8, tiltY: -11, rotate: -5 } },
  { id: "drama", label: "Dramatic tilt", settings: { scale: 1.16, x: -14, y: 11, tiltX: 15, tiltY: 18, rotate: 8 } },
  { id: "overhead", label: "Overhead", settings: { scale: .78, x: 2, y: -18, tiltX: 18, tiltY: 0, rotate: 0 } },
  { id: "corner", label: "Corner crop", settings: { scale: 1.24, x: 30, y: -15, tiltX: -9, tiltY: -16, rotate: -7 } },
  { id: "postcard", label: "Postcard", settings: { scale: .68, x: 0, y: 12, tiltX: -3, tiltY: 0, rotate: 0 } },
];

function hexToRgb(hex: string) { const value = hex.replace("#", ""); return [parseInt(value.slice(0, 2), 16) / 255, parseInt(value.slice(2, 4), 16) / 255, parseInt(value.slice(4, 6), 16) / 255] as const; }

function ShaderCanvas({ recipe, paused, onError }: { recipe: Recipe; paused: boolean; onError: (message: string | null) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: .5, y: .5, vx: 0, vy: 0 });
  const frame = useRef<number>(0);
  const start = useRef(0);
  const programRef = useRef<WebGLProgram | null>(null);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl) { onError("WebGL is unavailable in this browser."); return; }
    const compile = (type: number, source: string) => { const shader = gl.createShader(type)!; gl.shaderSource(shader, source); gl.compileShader(shader); if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed"); return shader; };
    try {
      const vertex = compile(gl.VERTEX_SHADER, "attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}");
      const fragment = compile(gl.FRAGMENT_SHADER, recipe.glsl);
      const program = gl.createProgram()!; gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "Shader link failed");
      programRef.current = program; onError(null);
    } catch (error) { onError(error instanceof Error ? error.message.replace(/ERROR: \d+:(\d+):/, "Line $1:") : "Shader compile failed"); }
  }, [recipe.glsl, onError]);

  useEffect(() => {
    const canvas = ref.current; const gl = canvas?.getContext("webgl"); if (!canvas || !gl) return;
    const position = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, position); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const render = (timestamp: number) => {
      frame.current = requestAnimationFrame(render); if (paused) return;
      const program = programRef.current; if (!program) return;
      const width = canvas.clientWidth * devicePixelRatio; const height = canvas.clientHeight * devicePixelRatio;
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
      gl.viewport(0, 0, width, height); gl.useProgram(program);
      const set1 = (name: string, value: number) => gl.uniform1f(gl.getUniformLocation(program, name), value);
      gl.enableVertexAttribArray(gl.getAttribLocation(program, "position")); gl.vertexAttribPointer(gl.getAttribLocation(program, "position"), 2, gl.FLOAT, false, 0, 0);
      if (!start.current) start.current = timestamp;
      gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), width, height); set1("u_time", (timestamp - start.current) / 1000);
      gl.uniform2f(gl.getUniformLocation(program, "u_pointer"), pointer.current.x, pointer.current.y); gl.uniform2f(gl.getUniformLocation(program, "u_velocity"), pointer.current.vx, pointer.current.vy);
      const colors = [...recipe.palette]; while (colors.length < 5) colors.push(colors.at(-1) || "#000000"); gl.uniform3fv(gl.getUniformLocation(program, "u_colors"), colors.slice(0, 5).map(hexToRgb).flat());
      set1("u_style", recipe.style); set1("u_intensity", recipe.intensity); set1("u_zoom", recipe.zoom); set1("u_warp", recipe.warp); set1("u_contrast", recipe.contrast); set1("u_speed", recipe.speed); set1("u_drift", recipe.drift); set1("u_animate", recipe.animate ? 1 : 0); set1("u_reverse", recipe.reverse ? 1 : 0); set1("u_rotate", recipe.rotate); set1("u_seed", recipe.seed); set1("u_smooth_blend", recipe.smoothBlend ? 1 : 0); set1("u_grain", recipe.grain); gl.uniform2f(gl.getUniformLocation(program, "u_offset"), recipe.offsetX, recipe.offsetY);
      set1("u_cursor_on", recipe.cursorEnabled ? 1 : 0); set1("u_cursor_effect", ["push", "repel", "swirl", "ripple", "spotlight"].indexOf(recipe.cursorEffect)); set1("u_cursor_strength", recipe.cursorStrength); set1("u_cursor_radius", recipe.cursorRadius);
      gl.drawArrays(gl.TRIANGLES, 0, 3); pointer.current.vx *= .92; pointer.current.vy *= .92;
    };
    frame.current = requestAnimationFrame(render); return () => cancelAnimationFrame(frame.current);
  }, [recipe, paused]);

  const move = (event: PointerEvent<HTMLCanvasElement>) => { const rect = event.currentTarget.getBoundingClientRect(); const x = (event.clientX - rect.left) / rect.width - .5; const y = .5 - (event.clientY - rect.top) / rect.height; pointer.current.vx = (x - pointer.current.x) * .8; pointer.current.vy = (y - pointer.current.y) * .8; pointer.current.x = x; pointer.current.y = y; };
  return <canvas ref={ref} onPointerMove={move} onPointerLeave={() => { pointer.current.vx = pointer.current.vy = 0; }} className="shader-canvas" style={{ filter: recipe.blur ? `blur(${recipe.blur}px)` : undefined, transform: recipe.blur ? "scale(1.025)" : undefined }} aria-label="Live interactive shader preview" />;
}

function ShaderPreview({ style }: { style: number }) {
  const previewRecipe = useMemo(() => ({ ...defaultRecipe, style, palette: palettes[style % palettes.length], cursorEnabled: false, animate: false, speed: 0, drift: 0, reverse: false, seed: style + 1 }), [style]);
  return <ShaderCanvas recipe={previewRecipe} paused={false} onError={() => undefined} />;
}

function SavedRecipePreview({ recipe }: { recipe: Recipe }) {
  // Saved cards use the exact persisted recipe rather than approximating it
  // with a CSS gradient, including custom GLSL and every shader setting.
  return <ShaderCanvas recipe={recipe} paused={false} onError={() => undefined} />;
}

function SourceSurface({ title, helper, source, onChange, status, footer }: { title: string; helper: string; source: string; onChange?: (source: string) => void; status?: ReactNode; footer?: ReactNode }) {
  return <div className="code-surface"><div className="source-heading"><div><h2>{title}</h2><p className="helper">{helper}</p></div><Code2 /></div><textarea value={source} onChange={(event) => onChange?.(event.target.value)} readOnly={!onChange} spellCheck={false} aria-label={`${title} source editor`} />{status}{footer && <div className="source-actions">{footer}</div>}</div>;
}

function hexToHsv(hex: string) { const [r, g, b] = hexToRgb(hex).map((value) => value / 255); const max = Math.max(r, g, b); const min = Math.min(r, g, b); const delta = max - min; const hue = delta === 0 ? 0 : max === r ? 60 * (((g - b) / delta) % 6) : max === g ? 60 * ((b - r) / delta + 2) : 60 * ((r - g) / delta + 4); return { h: (hue + 360) % 360, s: max === 0 ? 0 : delta / max, v: max }; }
function hsvToHex(h: number, s: number, v: number) { const c = v * s; const x = c * (1 - Math.abs((h / 60) % 2 - 1)); const m = v - c; const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x]; return `#${[r, g, b].map((value) => Math.round((value + m) * 255).toString(16).padStart(2, "0")).join("")}`; }
function ShadcnColorPicker({ color, onChange }: { color: string; onChange: (color: string) => void }) {
  const [open, setOpen] = useState(false); const hsv = hexToHsv(color); const update = (next: Partial<typeof hsv>) => onChange(hsvToHex(next.h ?? hsv.h, next.s ?? hsv.s, next.v ?? hsv.v)); const rgb = hexToRgb(color);
  const pick = (event: PointerEvent<HTMLDivElement>) => { const rect = event.currentTarget.getBoundingClientRect(); update({ s: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)), v: 1 - Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)) }); };
  return <div className="shadcn-colour-picker"><button className="colour-picker-trigger" onClick={() => setOpen((value) => !value)} aria-label={`Edit ${color}`} style={{ background: color }} /><span>{color.toUpperCase()}</span>{open && <div className="colour-picker-popover"><div className="colour-sv" style={{ backgroundColor: `hsl(${hsv.h} 100% 50%)` }} onPointerDown={pick} onPointerMove={(event) => event.buttons === 1 && pick(event)}><i style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%` }} /></div><input className="colour-hue" aria-label="Hue" type="range" min="0" max="360" value={hsv.h} onChange={(event) => update({ h: Number(event.target.value) })} /><div className="colour-hex"><span style={{ background: color }} /><input value={color.toUpperCase()} onChange={(event) => /^#[0-9A-Fa-f]{6}$/.test(event.target.value) && onChange(event.target.value)} aria-label="Hex colour" /></div><div className="colour-rgb">{["R", "G", "B"].map((label, index) => <label key={label}><input type="number" min="0" max="255" value={rgb[index]} onChange={(event) => { const next = [...rgb]; next[index] = Math.min(255, Math.max(0, Number(event.target.value))); onChange(`#${next.map((value) => value.toString(16).padStart(2, "0")).join("")}`); }} /><span>{label}</span></label>)}</div></div>}</div>;
}

function Slider({ label, value, min = 0, max = 1, step = .01, unit = "%", onChange, trailing }: { label: string; value: number; min?: number; max?: number; step?: number; unit?: string; onChange: (value: number) => void; trailing?: ReactNode }) {
  if (label === "Tilt") max = 45;
  if (label === "Grain") max = .2;
  if (label === "Zoom" && max === 1.2) max = 4;
  const shown = unit === "%" ? Math.round(value * 100) : unit === "°" ? Math.round(value) : Number(value.toFixed(2));
  const progress = Math.max(0, Math.min(100, (value - min) / (max - min) * 100));
  const displayMin = unit === "%" ? min * 100 : min;
  const displayMax = unit === "%" ? max * 100 : max;
  const displayStep = unit === "%" ? step * 100 : step;
  return <label className="slider-row"><span className="slider-label">{label}</span><span className="slider-value"><input aria-label={`${label} value`} title="Type a precise value" type="number" min={displayMin} max={displayMax} step={displayStep} value={shown} onFocus={(event) => event.currentTarget.select()} onChange={(event) => { const next = Number(event.target.value); if (!Number.isFinite(next)) return; onChange(Math.min(max, Math.max(min, unit === "%" ? next / 100 : next))); }} />{unit}</span>{trailing && <span className="slider-trailing">{trailing}</span>}<span className="slider-visual"><span className="slider-fill" style={{ width: `${progress}%` }} /><span className="slider-ticks" aria-hidden="true">{Array.from({ length: 9 }, (_, index) => <i key={index} />)}</span><input className="slider-control" aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} /></span></label>;
}

export function ShaderStudio() {
  const [recipe, setRecipe] = useState<Recipe>(defaultRecipe);
  const [tab, setTab] = useState<Tab>("style");
  const [paused, setPaused] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [history, setHistory] = useState<Recipe[]>([]);
  const [future, setFuture] = useState<Recipe[]>([]);
  const [saveOpen, setSaveOpen] = useState(false);
  const [saveName, setSaveName] = useState(defaultRecipe.name);
  const [presetSearch, setPresetSearch] = useState("");
  const [exportOpen, setExportOpen] = useState(false);
  const [mockupExportOpen, setMockupExportOpen] = useState(false);
  const [exportTab, setExportTab] = useState<ExportTab>("image");
  const [mockupExportMode, setMockupExportMode] = useState<MockupExportMode>("image");
  const [mockupImageHeight, setMockupImageHeight] = useState<720 | 1080 | 1440>(1080);
  const [videoSettings, setVideoSettings] = useState<VideoExportSettings>({ aspect: "16:9", height: 720, fps: 30, duration: 3, loop: false, mimeType: "video/webm;codecs=vp9" });
  const [videoProgress, setVideoProgress] = useState<number | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>(companyThemes[0].name);
  const [mockup, setMockup] = useState<MockupSettings>({ media: null, mediaType: null, frame: "browser", radius: 20, shadow: 40, scale: .82, x: 0, y: 0, cameraX: 0, cameraY: 0, tiltX: 0, tiltY: 0, rotate: 0, visible: true });
  const [cameraMode, setCameraMode] = useState<CameraMode>("zoom");
  const [mockupAspect, setMockupAspect] = useState<MockupAspect>("auto");
  const [editorMode, setEditorMode] = useState<EditorMode>("mockup");
  const [basePresetId, setBasePresetId] = useState<string | null>(null);
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
  const [playhead, setPlayhead] = useState(0);
  const [isTimelinePlaying, setIsTimelinePlaying] = useState(false);
  const clipGesture = useRef<{ id: string; kind: "move" | "resize"; x: number; start: number; duration: number } | null>(null);
  const animationTrackRef = useRef<HTMLDivElement>(null);
  const playheadRef = useRef(0);
  const baseDuration = 8;
  const mediaInput = useRef<HTMLInputElement>(null);
  const saved = useStudioStore((state) => state.saved);
  const saveRecipe = useStudioStore((state) => state.save);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--mockup-preview-media", mockup.mediaType === "image" && mockup.media ? `url("${mockup.media}")` : "none");
    const cameraCard = document.querySelector<HTMLElement>(".camera-pad-card");
    if (cameraCard) cameraCard.style.transform = `translate(-50%, -50%) perspective(280px) rotateX(${mockup.tiltX}deg) rotateY(${mockup.tiltY}deg) rotateZ(${mockup.rotate}deg) scale(${.7 + mockup.scale * .16})`;
    return () => { root.style.removeProperty("--mockup-preview-media"); };
  }, [mockup.media, mockup.mediaType, mockup.rotate, mockup.scale, mockup.tiltX, mockup.tiltY]);
  useEffect(() => { const stage = document.querySelector<HTMLElement>(".mockup-stage"); if (stage) stage.style.aspectRatio = mockupAspect === "auto" ? "" : mockupAspect; }, [mockupAspect]);
  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(null), 2400);
    return () => window.clearTimeout(timeout);
  }, [toast]);
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
  useEffect(() => { const existing = localStorage.getItem("shader-studio-saved-recipes"); if (existing) { try { JSON.parse(existing).forEach((item: Recipe) => saveRecipe(item)); } catch {} } }, [saveRecipe]);
  useEffect(() => { localStorage.setItem("shader-studio-saved-recipes", JSON.stringify(saved)); }, [saved]);
  const change = useCallback((update: Partial<Recipe>) => { setHistory((items) => [...items, recipe].slice(-50)); setFuture([]); setRecipe((current) => ({ ...current, ...update })); }, [recipe]);
  const undo = () => { const previous = history.at(-1); if (!previous) return; setFuture((items) => [recipe, ...items]); setHistory((items) => items.slice(0, -1)); setRecipe(previous); };
  const redo = () => { const next = future[0]; if (!next) return; setHistory((items) => [...items, recipe]); setFuture((items) => items.slice(1)); setRecipe(next); };
  const reset = () => { setHistory((items) => [...items, recipe]); setRecipe(defaultRecipe); setFuture([]); };
  const selectPreset = (name: string, style: number) => change({ name, style, glsl: fragmentShader, ...presetSettings[style] });
  const resetCharacter = () => { const settings = presetSettings[recipe.style] ?? defaultRecipe; change({ intensity: settings.intensity ?? defaultRecipe.intensity, zoom: settings.zoom ?? defaultRecipe.zoom, warp: settings.warp ?? defaultRecipe.warp, contrast: settings.contrast ?? defaultRecipe.contrast, seed: defaultRecipe.seed }); };
  const recolour = () => change({ palette: palettes[Math.floor(Math.random() * palettes.length)] });
  const randomizePalette = () => { const palette = palettes[Math.floor(Math.random() * palettes.length)]; change({ palette }); setToast("Palette randomized"); };
  const applyTheme = (name: string) => { const theme = companyThemes.find((item) => item.name === name) ?? companyThemes[0]; setSelectedTheme(theme.name); change({ palette: [...theme.palette] }); setToast(`${theme.name} theme applied`); };
  const restyle = () => {
    const effects: CursorEffect[] = ["push", "repel", "swirl", "ripple", "spotlight"];
    change({
      intensity: .35 + Math.random() * .6, zoom: .65 + Math.random() * 1.15, warp: Math.random(), contrast: .2 + Math.random() * .75,
      speed: Math.random() * 2.4, drift: Math.random(), animate: Math.random() > .12, reverse: Math.random() > .5, grain: Math.random() * .1,
      rotate: -Math.PI + Math.random() * Math.PI * 2, offsetX: -0.5 + Math.random(), offsetY: -0.5 + Math.random(), seed: Math.floor(Math.random() * 100000),
      smoothBlend: Math.random() > .5, cursorEnabled: Math.random() > .35, cursorEffect: effects[Math.floor(Math.random() * effects.length)], cursorStrength: .2 + Math.random() * .75, cursorRadius: .2 + Math.random() * .7,
    });
    setToast("Settings restyled — style and colours kept");
  };
  const inspire = () => {
    const effects: CursorEffect[] = ["push", "repel", "swirl", "ripple", "spotlight"];
    change({
      name: "Inspired shader", style: Math.floor(Math.random() * 14), palette: palettes[Math.floor(Math.random() * palettes.length)],
      intensity: .35 + Math.random() * .6, zoom: .65 + Math.random() * 1.15, warp: Math.random(), contrast: .2 + Math.random() * .75,
      speed: Math.random() * 2.4, drift: Math.random(), animate: Math.random() > .12, reverse: Math.random() > .5, grain: Math.random() * .1,
      rotate: -Math.PI + Math.random() * Math.PI * 2, offsetX: -0.5 + Math.random(), offsetY: -0.5 + Math.random(), seed: Math.floor(Math.random() * 100000),
      smoothBlend: Math.random() > .5, cursorEnabled: Math.random() > .35, cursorEffect: effects[Math.floor(Math.random() * effects.length)], cursorStrength: .2 + Math.random() * .75, cursorRadius: .2 + Math.random() * .7,
      glsl: fragmentShader,
    });
  };
  const exportText = (content: string, filename: string, type: string) => { const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([content], { type })); link.download = filename; link.click(); URL.revokeObjectURL(link.href); };
  const reactCode = `"use client";\n\n// Generated by Shader Studio\nexport const fragmentShader = ${JSON.stringify(recipe.glsl)};\n\nexport const shaderRecipe = ${JSON.stringify({ ...recipe, glsl: undefined }, null, 2)};\n`;
  const buildPrompt = () => {
    const style = styleNames[recipe.style] ?? recipe.name;
    const cursor = recipe.cursorEnabled ? `${recipe.cursorEffect} (strength ${Math.round(recipe.cursorStrength * 100)}/100, radius ${Math.round(recipe.cursorRadius * 100)}/100)` : "off";
    return `Add an animated WebGL shader background to my app.
Style: "${style}".
Colours (low → high): ${recipe.palette.map((color) => color.toUpperCase()).join(", ")}.
Feel: animate ${recipe.animate ? "on" : "off"}, speed ${Math.round(recipe.speed / 3 * 100)}/100, drift ${Math.round(recipe.drift * 100)}/100, zoom ${Math.round(recipe.zoom / 2 * 100)}/100, intensity ${Math.round(recipe.intensity * 100)}/100, warp ${Math.round(recipe.warp * 100)}/100, contrast ${Math.round(recipe.contrast * 100)}/100, rotation ${Math.round(recipe.rotate * 180 / Math.PI)}°, offset (${Math.round(recipe.offsetX * 100)}/100, ${Math.round(recipe.offsetY * 100)}/100), grain ${Math.round(recipe.grain / .12 * 100)}/100, smooth blend ${recipe.smoothBlend ? "on" : "off"}.
Cursor: ${cursor}.
Implementation notes:
Render a fullscreen triangle in a plain WebGL1 context with no rendering library. Cap devicePixelRatio at 2, use requestAnimationFrame only while visible, and mount the canvas absolutely behind the page content.
Use this exact fragment shader:
${recipe.glsl}
Feed the shader its u_resolution, u_time, u_pointer, u_velocity, u_colors, style, palette, surface, movement, frame, and cursor uniforms from the selected recipe.`;
  };
  const copyText = async (source: string, label = "Copied to clipboard") => {
    try { await navigator.clipboard.writeText(source); setCopied(true); setToast(label); window.setTimeout(() => setCopied(false), 1500); }
    catch { setToast("Couldn’t copy — please try again"); }
  };
  const exportPng = () => { const canvas = document.querySelector<HTMLCanvasElement>(".canvas-area .shader-canvas"); if (!canvas) return; const link = document.createElement("a"); link.download = `${recipe.name.toLowerCase().replaceAll(" ", "-")}.png`; link.href = canvas.toDataURL("image/png"); link.click(); };
  const exportAspect = () => videoSettings.aspect.split(":").map(Number) as [number, number];
  const mockupOutputSize = (height: number = videoSettings.height) => { const [ratioWidth, ratioHeight] = exportAspect(); return { width: Math.round(height * ratioWidth / ratioHeight / 2) * 2, height }; };
  const loadExportImage = (src: string) => new Promise<HTMLImageElement>((resolve, reject) => { const image = new Image(); image.onload = () => resolve(image); image.onerror = () => reject(new Error("Could not load mockup media")); image.src = src; });
  const drawMockupComposition = async (canvas: HTMLCanvasElement) => {
    const context = canvas.getContext("2d"); const shader = document.querySelector<HTMLCanvasElement>(".canvas-area .shader-canvas");
    if (!context || !shader) throw new Error("Live shader preview is unavailable");
    context.drawImage(shader, 0, 0, canvas.width, canvas.height);
    if (!mockup.visible) return;
    const size = Math.min(canvas.width, canvas.height) * Math.max(.28, mockup.scale) * .68;
    const mediaRatio = mockupAspect === "auto" ? 16 / 10 : (() => { const [w, h] = mockupAspect.split("/").map(Number); return w / h; })();
    const mediaWidth = size * Math.min(1.6, mediaRatio); const mediaHeight = mediaWidth / mediaRatio;
    const x = canvas.width / 2 + canvas.width * mockup.x / 100; const y = canvas.height / 2 + canvas.height * mockup.y / 100;
    context.save(); context.translate(x, y); context.rotate(mockup.rotate * Math.PI / 180); context.scale(1 - Math.abs(mockup.tiltY) / 60, 1 - Math.abs(mockup.tiltX) / 80);
    context.shadowColor = `rgba(0,0,0,${.2 + mockup.shadow / 160})`; context.shadowBlur = 16 + mockup.shadow; context.shadowOffsetY = 8 + mockup.shadow / 3;
    const framePad = mockup.frame === "inset" ? 14 : mockup.frame === "border" ? 7 : 0; const bar = mockup.frame === "browser" ? Math.max(22, mediaHeight * .09) : 0; const width = mediaWidth + framePad * 2; const height = mediaHeight + bar + framePad * 2;
    const radius = Math.min(mockup.radius, Math.min(width, height) / 4); context.fillStyle = mockup.frame === "glass" ? "rgba(255,255,255,.22)" : mockup.frame === "none" ? "transparent" : "#111216";
    if (mockup.frame !== "none") { context.beginPath(); context.roundRect(-width / 2, -height / 2, width, height, radius); context.fill(); }
    context.shadowColor = "transparent"; context.save(); context.beginPath(); context.roundRect(-mediaWidth / 2, -height / 2 + bar + framePad, mediaWidth, mediaHeight, Math.max(0, radius - framePad)); context.clip();
    if (mockup.media && mockup.mediaType === "image") { const image = await loadExportImage(mockup.media); context.drawImage(image, -mediaWidth / 2, -height / 2 + bar + framePad, mediaWidth, mediaHeight); }
    else { context.fillStyle = "#171a2c"; context.fillRect(-mediaWidth / 2, -height / 2 + bar + framePad, mediaWidth, mediaHeight); context.fillStyle = "#f5f6ff"; context.font = `600 ${Math.max(18, mediaWidth / 11)}px sans-serif`; context.textAlign = "center"; context.fillText(mockup.mediaType === "video" ? "Video mockup" : "Your product", 0, 12); }
    context.restore();
    if (mockup.frame === "browser") { context.fillStyle = "#1b1c20"; context.fillRect(-mediaWidth / 2, -height / 2, mediaWidth, bar); context.fillStyle = "#777b85"; [-12, 0, 12].forEach((offset) => { context.beginPath(); context.arc(-mediaWidth / 2 + 16 + offset, -height / 2 + bar / 2, 3, 0, Math.PI * 2); context.fill(); }); }
    context.restore();
  };
  const exportMockupImage = async () => { try { const { width, height } = mockupOutputSize(mockupImageHeight); const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height; await drawMockupComposition(canvas); const link = document.createElement("a"); link.download = `${recipe.name.toLowerCase().replaceAll(" ", "-")}-mockup.png`; link.href = canvas.toDataURL("image/png"); link.click(); setToast("Mockup image exported"); } catch (error) { setToast(error instanceof Error ? error.message : "Could not export mockup image"); } };
  const exportMockupVideo = async () => { if (!("MediaRecorder" in window)) { setToast("Video export is not supported in this browser"); return; } const mimeType = videoFormats.find((item) => item.value === videoSettings.mimeType && MediaRecorder.isTypeSupported(item.value))?.value ?? videoFormats.find((item) => MediaRecorder.isTypeSupported(item.value))?.value; if (!mimeType) { setToast("No compatible video format is available in this browser"); return; } try { const { width, height } = mockupOutputSize(); const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height; const stream = canvas.captureStream(videoSettings.fps); const chunks: BlobPart[] = []; const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: height >= 1080 ? 12_000_000 : 6_000_000 }); const finished = new Promise<Blob>((resolve, reject) => { recorder.ondataavailable = (event) => event.data.size && chunks.push(event.data); recorder.onerror = () => reject(new Error("Video encoding failed")); recorder.onstop = () => resolve(new Blob(chunks, { type: mimeType })); }); recorder.start(); setVideoProgress(0); const frames = videoSettings.duration * videoSettings.fps; for (let frame = 0; frame < frames; frame += 1) { await drawMockupComposition(canvas); setVideoProgress((frame + 1) / frames); await new Promise<void>((resolve) => window.setTimeout(resolve, 1000 / videoSettings.fps)); } recorder.stop(); const blob = await finished; stream.getTracks().forEach((track) => track.stop()); const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `${recipe.name.toLowerCase().replaceAll(" ", "-")}-mockup.${mimeType.includes("mp4") ? "mp4" : "webm"}`; link.click(); window.setTimeout(() => URL.revokeObjectURL(link.href), 1000); setToast("Mockup video exported"); } catch (error) { setToast(error instanceof Error ? error.message : "Could not export mockup video"); } finally { setVideoProgress(null); } };
  const updateVideoSettings = (update: Partial<VideoExportSettings>) => setVideoSettings((current) => ({ ...current, ...update }));
  const exportVideo = async () => {
    if (!("MediaRecorder" in window)) { setToast("Video export is not supported in this browser"); return; }
    const format = videoFormats.find((item) => item.value === videoSettings.mimeType);
    const mimeType = format && MediaRecorder.isTypeSupported(format.value) ? format.value : videoFormats.find((item) => MediaRecorder.isTypeSupported(item.value))?.value;
    if (!mimeType) { setToast("No compatible video format is available in this browser"); return; }
    const [ratioWidth, ratioHeight] = videoSettings.aspect.split(":").map(Number);
    const height = videoSettings.height;
    const width = Math.round(height * ratioWidth / ratioHeight / 2) * 2;
    const canvas = document.createElement("canvas"); canvas.width = width; canvas.height = height;
    const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl) { setToast("WebGL is unavailable in this browser"); return; }
    const compile = (type: number, source: string) => { const shader = gl.createShader(type)!; gl.shaderSource(shader, source); gl.compileShader(shader); if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed"); return shader; };
    try {
      const vertex = compile(gl.VERTEX_SHADER, "attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}");
      const fragment = compile(gl.FRAGMENT_SHADER, recipe.glsl);
      const program = gl.createProgram()!; gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "Shader link failed");
      const position = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, position); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
      const stream = canvas.captureStream(0); const track = stream.getVideoTracks()[0] as MediaStreamTrack & { requestFrame?: () => void };
      const chunks: BlobPart[] = []; const recorder = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: height >= 1080 ? 12_000_000 : height >= 720 ? 6_000_000 : 3_000_000 });
      const finished = new Promise<Blob>((resolve, reject) => { recorder.ondataavailable = (event) => { if (event.data.size) chunks.push(event.data); }; recorder.onerror = () => reject(new Error("Video encoding failed")); recorder.onstop = () => resolve(new Blob(chunks, { type: mimeType })); });
      const renderFrame = (time: number) => {
        gl.viewport(0, 0, width, height); gl.useProgram(program); gl.enableVertexAttribArray(gl.getAttribLocation(program, "position")); gl.vertexAttribPointer(gl.getAttribLocation(program, "position"), 2, gl.FLOAT, false, 0, 0);
        const set1 = (name: string, value: number) => gl.uniform1f(gl.getUniformLocation(program, name), value);
        gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), width, height); set1("u_time", time); gl.uniform2f(gl.getUniformLocation(program, "u_pointer"), .5, .5); gl.uniform2f(gl.getUniformLocation(program, "u_velocity"), 0, 0);
        const colors = [...recipe.palette]; while (colors.length < 5) colors.push(colors.at(-1) || "#000000"); gl.uniform3fv(gl.getUniformLocation(program, "u_colors"), colors.slice(0, 5).map(hexToRgb).flat());
        set1("u_style", recipe.style); set1("u_intensity", recipe.intensity); set1("u_zoom", recipe.zoom); set1("u_warp", recipe.warp); set1("u_contrast", recipe.contrast); set1("u_speed", recipe.speed); set1("u_drift", recipe.drift); set1("u_animate", recipe.animate ? 1 : 0); set1("u_reverse", recipe.reverse ? 1 : 0); set1("u_rotate", recipe.rotate); set1("u_seed", recipe.seed); set1("u_smooth_blend", recipe.smoothBlend ? 1 : 0); set1("u_grain", recipe.grain); gl.uniform2f(gl.getUniformLocation(program, "u_offset"), recipe.offsetX, recipe.offsetY);
        set1("u_cursor_on", 0); set1("u_cursor_effect", 0); set1("u_cursor_strength", 0); set1("u_cursor_radius", 0); gl.drawArrays(gl.TRIANGLES, 0, 3); gl.finish(); track.requestFrame?.();
      };
      const forwardFrames = videoSettings.duration * videoSettings.fps;
      const indexes = Array.from({ length: forwardFrames }, (_, index) => index);
      const frameIndexes = videoSettings.loop ? [...indexes, ...indexes.slice(1, -1).reverse()] : indexes;
      recorder.start(); setVideoProgress(0);
      for (let index = 0; index < frameIndexes.length; index += 1) { renderFrame(frameIndexes[index] / videoSettings.fps); setVideoProgress((index + 1) / frameIndexes.length); await new Promise<void>((resolve) => requestAnimationFrame(() => resolve())); }
      recorder.stop(); const blob = await finished; stream.getTracks().forEach((item) => item.stop());
      const extension = mimeType.includes("mp4") ? "mp4" : "webm"; const link = document.createElement("a"); link.href = URL.createObjectURL(blob); link.download = `${recipe.name.toLowerCase().replaceAll(" ", "-")}${videoSettings.loop ? "-loop" : ""}.${extension}`; link.click(); window.setTimeout(() => URL.revokeObjectURL(link.href), 1000); setToast("Video exported");
    } catch (error) { setToast(error instanceof Error ? error.message : "Could not export video"); }
    finally { setVideoProgress(null); }
  };
  const save = () => { const item = { ...recipe, id: crypto.randomUUID(), name: saveName.trim() || "Untitled recipe" }; saveRecipe(item); setSaveOpen(false); };
  const activeLabel = useMemo(() => styleNames[recipe.style] ?? recipe.name, [recipe.style, recipe.name]);
  const filteredSaved = useMemo(() => {
    const query = presetSearch.trim().toLowerCase();
    if (!query) return saved;
    return saved.filter((item) => `${item.name} ${styleNames[item.style] ?? "Custom look"}`.toLowerCase().includes(query));
  }, [presetSearch, saved]);
  const updateMockup = (update: Partial<MockupSettings>) => setMockup((current) => ({ ...current, ...update }));
  const loadFile = (file: File) => { if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) { setToast("Choose an image or video"); return; } const reader = new FileReader(); reader.onload = () => { const centered = mockupPresets[0]; updateMockup({ media: String(reader.result), mediaType: file.type.startsWith("video/") ? "video" : "image", ...centered.settings }); setBasePresetId(centered.id); setToast("Centered mockup preset applied"); }; reader.readAsDataURL(file); };
  const loadMockupMedia = (event: ChangeEvent<HTMLInputElement>) => { const file = event.target.files?.[0]; if (file) loadFile(file); };
  const handleDrop = (event: DragEvent<HTMLElement>) => { event.preventDefault(); const file = event.dataTransfer.files?.[0]; if (file) loadFile(file); };
  const useMockupPreset = (preset: typeof mockupPresets[number]) => { updateMockup(preset.settings); setBasePresetId(preset.id); change({ offsetX: preset.settings.x / 56, offsetY: preset.settings.y / 42 }); setToast(`${preset.label} mockup preset applied`); };
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
    transition: Math.min(animationTransition, duration - .18), easing: animationEasing, zoom: focusZoom, tilt: focusTilt, hold: Math.min(animationHold, duration * .3), springSpeed,
    targetX: focusPreset.settings.x, targetY: focusPreset.settings.y, targetTiltX: focusPreset.settings.tiltX, targetTiltY: focusPreset.settings.tiltY, targetRotate: focusPreset.settings.rotate, cameraX: 0, cameraY: 0, exit: "base",
  });
  const openAnimation = () => {
    if (!basePresetId && !mockup.media) { setToast("Upload media, then choose a mockup preset before animating"); return; }
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
    const ordered = [...animationClips].sort((a, b) => a.start - b.start);
    let gapStart = 0;
    let start = -1;
    for (const existing of ordered) {
      if (existing.start - gapStart >= duration) { start = gapStart; break; }
      gapStart = Math.max(gapStart, existing.start + existing.duration);
    }
    if (start < 0 && baseDuration - gapStart >= duration) start = gapStart;
    if (start < 0) { setToast("No room in the base duration for another animation"); return; }
    const clip = createAnimationClip(Math.round(start * 10) / 10, duration);
    setAnimationClips((clips) => [...clips, clip]); setActiveClipId(clip.id); setEditorMode("animation");
  };
  const duplicateActiveClip = () => {
    if (!activeClip) return;
    const others = animationClips.filter((clip) => clip.id !== activeClip.id).sort((a, b) => a.start - b.start);
    let gapStart = 0;
    let start = -1;
    for (const existing of others) {
      if (existing.start - gapStart >= activeClip.duration) { start = gapStart; break; }
      gapStart = Math.max(gapStart, existing.start + existing.duration);
    }
    if (start < 0 && baseDuration - gapStart >= activeClip.duration) start = gapStart;
    if (start < 0) { setToast("No room in the base duration to duplicate this animation"); return; }
    const duplicate = { ...activeClip, id: crypto.randomUUID(), start: Math.round(start * 10) / 10, exit: "base" as const };
    setAnimationClips((clips) => [...clips, duplicate]); setActiveClipId(duplicate.id); setToast("Animation duplicated");
  };
  const selectBaseMedia = () => { setIsTimelinePlaying(false); setActiveClipId(null); setEditorMode("mockup"); setMotionPreview("base"); };
  const selectAnimationClip = (clip: AnimationClip) => { setActiveClipId(clip.id); setFocusPresetId(clip.presetId); setFocusZoom(clip.zoom); setFocusTilt(clip.tilt); setAnimationTransition(clip.transition); setAnimationEasing(clip.easing); setAnimationHold(clip.hold); setSpringSpeed(clip.springSpeed); setEditorMode("animation"); setMotionPreview("focus"); seekToClipTarget(clip); };
  const seekTimeline = (event: PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setTimelinePlayhead((event.clientX - bounds.left) / bounds.width * baseDuration);
  };
  const beginClipGesture = (event: PointerEvent<HTMLElement>, clip: AnimationClip, kind: "move" | "resize") => {
    event.preventDefault(); event.stopPropagation();
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
          const duration = Math.round(Math.max(.6, Math.min(maxEnd - item.start, gesture.duration + delta)) * 10) / 10;
          return { ...item, duration, transition: Math.min(item.transition, duration - .18), hold: Math.min(item.hold, duration * .3) };
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
    const travel = isLinkedFromPrevious(clip) ? 0 : Math.min(clip.transition, Math.max(.12, clip.duration - hold - .18));
    setIsTimelinePlaying(false);
    setTimelinePlayhead(clip.start + travel + Math.min(hold / 2, .06));
    setMotionPreview("focus");
  };
  const previewClip = animationClips.find((clip) => playhead >= clip.start && playhead <= clip.start + clip.duration);
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
      const exitDuration = Math.max(.12, clip.duration - hold);
      if (localTime <= hold) return target;
      return interpolateMockup(target, exitState, motionProgress((localTime - hold) / exitDuration, clip, 1.28));
    }
    const travel = Math.min(clip.transition, Math.max(.12, clip.duration - hold - .18));
    const exitDuration = Math.max(.12, clip.duration - travel - hold);
    const progress = localTime <= travel ? motionProgress(localTime / travel, clip)
      : localTime <= travel + hold ? 1
        : motionProgress((localTime - travel - hold) / exitDuration, clip, 1.28);
    return localTime <= travel + hold ? interpolateMockup(mockup, target, progress) : interpolateMockup(target, exitState, progress);
  };
  const stageTransform = (state: MockupSettings) => {
    const zoomDistance = Math.max(0, state.scale - 1);
    const focusX = -state.cameraX * zoomDistance * .5;
    const focusY = -state.cameraY * zoomDistance * .5;
    return `translate(calc(-50% + ${state.x + focusX}%), calc(-50% + ${state.y + focusY}%)) scale(${state.scale}) perspective(1200px) rotateX(${state.tiltX}deg) rotateY(${state.tiltY}deg) rotateZ(${state.rotate}deg)`;
  };
  const stageMockup = editorMode === "animation" && previewClip ? animationState(previewClip) : mockup;
  const moveCamera = (event: PointerEvent<HTMLDivElement>) => {
    const box = event.currentTarget.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
    const py = Math.min(1, Math.max(0, (event.clientY - box.top) / box.height));
    if (cameraMode === "zoom") { updateMockup({ cameraX: Math.round((px - .5) * 100), cameraY: Math.round((py - .5) * 100) }); }
    else updateMockup({ tiltY: Math.round((px - .5) * 90), tiltX: Math.round((.5 - py) * 90) });
  };
  const moveAnimationCamera = (event: PointerEvent<HTMLDivElement>) => {
    if (!activeClip) return;
    const box = event.currentTarget.getBoundingClientRect();
    const px = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
    const py = Math.min(1, Math.max(0, (event.clientY - box.top) / box.height));
    const updated = cameraMode === "zoom"
      ? { ...activeClip, cameraX: Math.round((px - .5) * 100), cameraY: Math.round((py - .5) * 100) }
      : { ...activeClip, targetTiltY: Math.round((px - .5) * 90), targetTiltX: Math.round((.5 - py) * 90) };
    setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip));
    seekToClipTarget(updated);
  };

  return <main className={`studio-shell ${editorMode === "animation" ? "animation-mode" : ""}`} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
    <header className="topbar"><div className="brand"><span className="brand-mark">S</span><span>SHADER STUDIO</span></div><div className="top-actions"><button className="icon-button" onClick={undo} disabled={!history.length} aria-label="Undo"><Undo2 /></button><button className="icon-button" onClick={redo} disabled={!future.length} aria-label="Redo"><Redo2 /></button><button className="button ghost" onClick={() => { setExportTab(tab === "mockup" || editorMode === "animation" ? "mockup" : "image"); setMockupExportOpen(true); }}><ImageDown /> Export</button><button className="button primary" onClick={() => copyText(buildPrompt(), "Build prompt copied")}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy prompt"}</button><button className="button primary" onClick={() => setSaveOpen(true)}><Save /> Save recipe</button></div></header>
    <section className="workspace">
      <nav className={`icon-rail ${editorMode === "animation" ? "mode-disabled" : ""}`} aria-label="Shader controls">{tabs.map(({ id, label, icon: Icon }) => <button key={id} disabled={editorMode === "animation"} className={`rail-tab ${tab === id ? "active" : ""}`} onClick={() => { if (id === "export") { setExportTab(tab === "mockup" || editorMode === "animation" ? "mockup" : "image"); setMockupExportOpen(true); return; } setTab(id); }} aria-label={label}><Icon size={19} strokeWidth={1.8} /><span>{label}</span></button>)}</nav>
      <aside className={`inspector ${tab === "mockup" && editorMode === "animation" ? "mode-disabled" : ""}`}><div className="inspector-scroll">
        {tab === "mockup" && <div className="editor-mode-switch" role="group" aria-label="Mockup editor mode"><button className={editorMode === "mockup" ? "active" : ""} onClick={() => setEditorMode("mockup")}>Mockup</button><button className={editorMode === "animation" ? "active" : ""} onClick={openAnimation} disabled={!basePresetId && !mockup.media} title={!basePresetId && !mockup.media ? "Upload media or choose a mockup preset first" : undefined}>Animation <Badge variant="secondary">Beta</Badge></button></div>}
        {tab === "style" && <div className="panel-content"><div className="panel-title"><div><h2>Shader styles</h2><p className="helper">Simple, still previews of each base shader.</p></div></div>{presetGroups.map((group) => <section className="preset-group" key={group.title}><h3>{group.title}</h3><div className="preset-grid">{group.items.map(([name, style]) => <button key={name} onClick={() => selectPreset(name, style)} className={`preset-card ${recipe.style === style ? "selected" : ""}`}><ShaderPreview style={style} /><span>{name}</span></button>)}</div></section>)}<section className="control-section"><h3>Character</h3><Slider label="Intensity" value={recipe.intensity} onChange={(intensity) => change({ intensity })} /><Slider label="Zoom" value={recipe.zoom} min={.5} max={2} unit="×" onChange={(zoom) => change({ zoom })} /><Slider label="Warp" value={recipe.warp} onChange={(warp) => change({ warp })} /><Slider label="Contrast" value={recipe.contrast} onChange={(contrast) => change({ contrast })} /><div className="button-pair"><button className="button ghost" onClick={() => change({ seed: Math.floor(Math.random() * 100000) })}><WandSparkles /> Reseed</button><button className="button ghost" onClick={() => change({ intensity: defaultRecipe.intensity, zoom: defaultRecipe.zoom, warp: defaultRecipe.warp, contrast: defaultRecipe.contrast, seed: defaultRecipe.seed })}><RefreshCcw /> Reset</button></div></section><section className="control-section"><h3>Frame</h3><Slider label="Rotate" value={recipe.rotate} min={-3.14} max={3.14} step={.01} unit=" rad" onChange={(rotate) => change({ rotate })} /><Slider label="Offset X" value={recipe.offsetX} min={-1} max={1} onChange={(offsetX) => change({ offsetX })} /><Slider label="Offset Y" value={recipe.offsetY} min={-1} max={1} onChange={(offsetY) => change({ offsetY })} /></section></div>}
        {tab === "palette" && <div className="panel-content"><h2>Colours</h2><div className="stops">{recipe.palette.map((color, index) => <div className="color-stop" key={`${color}-${index}`}><ShadcnColorPicker color={color} onChange={(nextColor) => { const palette = [...recipe.palette]; palette[index] = nextColor; change({ palette }); }} /><b>{index === 0 ? "BASE" : `STOP ${index}`}</b>{index > 0 && <button className="remove-colour" type="button" aria-label={`Remove stop ${index}`} onClick={() => { const palette = recipe.palette.filter((_, itemIndex) => itemIndex !== index); change({ palette }); }}><Minus /></button>}</div>)}</div><button className="add-colour" disabled={recipe.palette.length >= 5} onClick={() => change({ palette: [...recipe.palette, recipe.palette.at(-1) || "#ffffff"] })}>+ &nbsp; Add colour</button><div className="switch-row"><span>Smooth blend (OKLab)</span><button className={`switch ${recipe.smoothBlend ? "on" : ""}`} onClick={() => change({ smoothBlend: !recipe.smoothBlend })} aria-pressed={recipe.smoothBlend}><i /></button></div><div className="section-label">From a theme</div><div className="theme-picker"><div className="theme-select"><select aria-label="Company inspired themes" value={selectedTheme} onChange={(event) => setSelectedTheme(event.target.value)}>{companyThemes.map((theme) => <option key={theme.name}>{theme.name}</option>)}</select><ChevronDown /></div><button className="button primary" onClick={() => applyTheme(selectedTheme)}><Palette /> Apply theme</button></div><button className="button wide ghost palette-randomize" onClick={randomizePalette}><Sparkles /> Randomize palette</button><div className="section-label palette-label">Curated palettes</div><div className="palette-grid">{palettes.map((palette, index) => <button key={index} onClick={() => change({ palette })} className={`palette-swatch ${recipe.palette.join() === palette.join() ? "selected" : ""}`}>{palette.map((color) => <i key={color} style={{ background: color }} />)}</button>)}</div></div>}
        {tab === "surface" && <div className="panel-content"><h2>Surface</h2><p className="helper">Control depth, texture, and contrast across the full shader field.</p><Slider label="Intensity" value={recipe.intensity} onChange={(intensity) => change({ intensity })} /><Slider label="Zoom" value={recipe.zoom} min={.5} max={2} unit="×" onChange={(zoom) => change({ zoom })} /><Slider label="Warp" value={recipe.warp} onChange={(warp) => change({ warp })} /><Slider label="Contrast" value={recipe.contrast} onChange={(contrast) => change({ contrast })} /><Slider label="Grain" value={recipe.grain} max={.12} onChange={(grain) => change({ grain })} /></div>}
        {tab === "motion" && <div className="panel-content"><h2>Movement</h2><div className="switch-row"><span>Animate</span><button className={`switch ${recipe.animate ? "on" : ""}`} onClick={() => change({ animate: !recipe.animate })} aria-pressed={recipe.animate}><i /></button></div><Slider label="Speed" value={recipe.speed} min={0} max={3} unit="×" onChange={(speed) => change({ speed })} /><Slider label="Drift" value={recipe.drift} onChange={(drift) => change({ drift })} /><div className="switch-row"><span>Reverse</span><button className={`switch ${recipe.reverse ? "on" : ""}`} onClick={() => change({ reverse: !recipe.reverse })} aria-pressed={recipe.reverse}><i /></button></div><p className="helper">Drift controls how far the whole field wanders.</p></div>}
        {tab === "cursor" && <div className="panel-content"><h2>Interaction</h2><div className="switch-row"><span>React to cursor</span><button className={`switch ${recipe.cursorEnabled ? "on" : ""}`} onClick={() => change({ cursorEnabled: !recipe.cursorEnabled })} aria-pressed={recipe.cursorEnabled}><i /></button></div><div className="section-label">Effect</div><div className="effect-grid">{(["push", "repel", "swirl", "ripple", "spotlight"] as CursorEffect[]).map((effect) => <button key={effect} className={recipe.cursorEffect === effect ? "selected" : ""} onClick={() => change({ cursorEffect: effect })}>{effect}</button>)}</div><Slider label="Strength" value={recipe.cursorStrength} onChange={(cursorStrength) => change({ cursorStrength })} /><Slider label="Radius" value={recipe.cursorRadius} min={.15} max={1} onChange={(cursorRadius) => change({ cursorRadius })} /><p className="helper">{recipe.cursorEffect === "swirl" ? "Twists the pattern around the pointer." : "Moves the shader field with the pointer."}</p><button className="button wide ghost" onClick={() => change({ cursorStrength: defaultRecipe.cursorStrength, cursorRadius: defaultRecipe.cursorRadius })}><RefreshCcw /> Reset cursor</button></div>}
        {tab === "mockup" && <div className="panel-content mockup-panel"><input ref={mediaInput} className="visually-hidden" type="file" accept="image/*,video/*" onChange={loadMockupMedia} /><h2>Mockup</h2><p className="helper">Place your product on the live shader scene.</p><button className="mockup-upload" onClick={() => mediaInput.current?.click()}>{mockup.media && mockup.mediaType === "image" ? <img src={mockup.media} alt="Selected mockup media" /> : mockup.media ? <video src={mockup.media} muted playsInline /> : <span className="mockup-upload-placeholder"><ImageDown /><b>Screenshot</b><small>Drop media or click to choose</small></span>}</button><button className="button wide ghost replace-media" onClick={() => mediaInput.current?.click()}>{mockup.media ? "Replace media" : "Choose media"}</button><div className="mockup-aspect-inline"><div className="section-label">Aspect ratio</div><div className="aspect-ratio-grid">{(["auto", "16 / 9", "4 / 3", "1 / 1", "9 / 16"] as MockupAspect[]).map((aspect) => <button key={aspect} onClick={() => setMockupAspect(aspect)} className={mockupAspect === aspect ? "selected" : ""}><i className={`aspect-symbol ${aspect.replaceAll(" ", "").replace("/", "-")}`} /><span>{aspect === "auto" ? "Auto" : aspect}</span></button>)}</div></div><div className="section-label">Style</div><div className="mockup-style-grid">{(["browser", "glass", "border", "inset", "none"] as MockupFrame[]).map((frame) => <button key={frame} onClick={() => updateMockup({ frame })} className={mockup.frame === frame ? "selected" : ""}><i className={`frame-sample ${frame}`} /><span>{frame === "none" ? "Clean" : frame}</span></button>)}</div><div className="section-label">Border</div><div className="mockup-segment"><button onClick={() => updateMockup({ radius: 0 })} className={mockup.radius === 0 ? "selected" : ""}>Sharp</button><button onClick={() => updateMockup({ radius: 20 })} className={mockup.radius === 20 ? "selected" : ""}>Curved</button><button onClick={() => updateMockup({ radius: 42 })} className={mockup.radius === 42 ? "selected" : ""}>Round</button></div><Slider label="Radius" value={mockup.radius} min={0} max={48} step={1} onChange={(radius) => updateMockup({ radius })} /><div className="section-label">Shadow</div><div className="mockup-segment"><button onClick={() => updateMockup({ shadow: 0 })} className={mockup.shadow === 0 ? "selected" : ""}>None</button><button onClick={() => updateMockup({ shadow: 40 })} className={mockup.shadow === 40 ? "selected" : ""}>Spread</button><button onClick={() => updateMockup({ shadow: 80 })} className={mockup.shadow === 80 ? "selected" : ""}>Hug</button></div><Slider label="Opacity" value={mockup.shadow / 100} min={0} max={1} step={.01} unit="%" onChange={(shadow) => updateMockup({ shadow: shadow * 100 })} /><div className="section-label">Visibility</div><button className="mockup-visibility" onClick={() => updateMockup({ visible: !mockup.visible })}><Eye /> {mockup.visible ? "Hide mockup" : "Show mockup"}</button><div className="mockup-details"><span>Details</span><div><b>Device</b><em>{mockup.mediaType === "video" ? "Video" : mockup.media ? "Screenshot" : "Demo card"}</em></div><div><b>Screen pixels</b><em>Adapts to media</em></div></div></div>}
      </div>{tab === "presets" && <div className="presets-panel"><div className="presets-heading"><span className="eyebrow">YOUR LIBRARY</span><h2>Presets</h2><p>Saved shader looks, ready to remix.</p></div>{saved.length ? <><label className="preset-search"><Search /><input value={presetSearch} onChange={(event) => setPresetSearch(event.target.value)} placeholder="Search saved presets" aria-label="Search saved presets" />{presetSearch && <button type="button" onClick={() => setPresetSearch("")} aria-label="Clear preset search"><X /></button>}</label><div className="preset-library"><AnimatePresence initial={false} mode="popLayout">{filteredSaved.map((item, index) => <motion.button layout key={item.id} onClick={() => setRecipe(item)} aria-label={`Open saved preset ${item.name}`} initial={{ opacity: 0, y: 12, scale: .985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: .985 }} transition={{ duration: .22, delay: Math.min(index * .025, .14), ease: [0.22, 1, 0.36, 1] }}><SavedRecipePreview recipe={item} /><span><b>{item.name}</b><em>{styleNames[item.style] ?? "Custom look"}</em></span></motion.button>)}</AnimatePresence>{!filteredSaved.length && <motion.p className="preset-search-empty" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}>No saved presets match “{presetSearch}”.</motion.p>}</div></> : <div className="presets-empty"><div className="presets-empty-icon"><WandSparkles /></div><h3>No presets yet</h3><p>Build a look in Styles, then save it here for your next project.</p><button className="button primary" onClick={() => setTab("style")}><WandSparkles /> Explore styles</button></div>}</div>}{tab === "surface" && <div className="surface-blur-inline"><div className="section-label">Focus</div><Slider label="Blur" value={recipe.blur ?? 0} max={20} step={.25} unit="px" onChange={(blur) => change({ blur })} /></div>}<div className="local-recipes"><div className="section-label">Local recipes</div>{saved.length ? saved.slice(0, 3).map((item) => <button key={item.id} onClick={() => setRecipe(item)}>{item.name}<ChevronDown /></button>) : <span>Saved looks appear here.</span>}</div></aside>
{tab === "mockup" && <><div className="mockup-viewport">{editorMode === "animation" && activeClip && <div className="stage-target-badge"><i /> TARGET · {activeClip.label} · {activeClip.easing}</div>}<div className={`mockup-stage frame-${mockup.frame}`} style={{ transform: stageTransform(stageMockup), borderRadius: mockup.radius, boxShadow: `0 ${18 + mockup.shadow / 3}px ${35 + mockup.shadow}px rgba(0,0,0,${.2 + mockup.shadow / 160})`, visibility: mockup.visible ? "visible" : "hidden" }}><div className="browser-bar"><i /><i /><i /><span>your-product.com</span></div>{mockup.media ? <img src={mockup.media} alt="Mockup preview" /> : <div className="mockup-demo"><span>THE NEXT RELEASE</span><h1>Make the work<br />feel inevitable.</h1><p>Your product, framed by a live visual system.</p><b>Explore release notes <span>↗</span></b></div>}</div></div><aside className="camera-inspector"><div className="camera-tabs"><button className={cameraMode === "zoom" ? "active" : ""} onClick={() => setCameraMode("zoom")}>Zoom</button><button className={cameraMode === "tilt" ? "active" : ""} onClick={() => setCameraMode("tilt")}>Tilt</button></div><div className={`camera-pad ${cameraMode === "tilt" ? "tilt-preview" : "zoom-preview"}`} onPointerDown={moveCamera} onPointerMove={(event) => event.buttons === 1 && moveCamera(event)} role="application" aria-label="Camera positioning pad">{cameraMode === "zoom" ? <div className="camera-pad-card camera-focus-window" style={{ left: `${50 + mockup.cameraX}%`, top: `${50 + mockup.cameraY}%`, width: `${Math.min(100, 100 / Math.max(1, mockup.scale))}%`, height: `${Math.min(100, 100 / Math.max(1, mockup.scale)) * .64}%` }} /> : <div className="camera-pad-card" style={{ transform: `translate(-50%, -50%) perspective(280px) rotateX(${mockup.tiltX}deg) rotateY(${mockup.tiltY}deg) rotateZ(${mockup.rotate}deg) scale(${.65 + mockup.scale * .18})` }} />}<span className="camera-cross horizontal" /><span className="camera-cross vertical" /><i className="camera-handle" style={{ left: `${cameraMode === "zoom" ? 50 + mockup.cameraX : 50 + Math.max(-45, Math.min(45, mockup.tiltY)) * 1.1}%`, top: `${cameraMode === "zoom" ? 50 + mockup.cameraY : 50 - Math.max(-45, Math.min(45, mockup.tiltX)) * 1.1}%` }} /><span className="tilt-preview-label">Tilt preview</span></div><Slider label={cameraMode === "zoom" ? "Zoom" : "Tilt"} value={cameraMode === "zoom" ? mockup.scale : mockup.tiltY} min={cameraMode === "zoom" ? .45 : -12} max={cameraMode === "zoom" ? 1.2 : 12} step={.01} unit={cameraMode === "zoom" ? "×" : "°"} onChange={(value) => updateMockup(cameraMode === "zoom" ? { scale: value } : { tiltY: value })} /><div className="section-label camera-label">Layout presets</div><div className="layout-presets">{mockupPresets.map((preset) => <button key={preset.id} onClick={() => useMockupPreset(preset)} className={`layout-preset ${preset.id}`}><span className="layout-backdrop" /><i style={{ transform: `translate(${preset.settings.x}%, ${preset.settings.y}%) rotate(${preset.settings.rotate}deg) scale(${preset.settings.scale})` }} />{preset.id === "hero" && <b>Custom layout</b>}<em>{preset.label}</em></button>)}</div></aside></>}
        {tab === "mockup" && editorMode === "animation" && <>
         <aside className="motion-inspector">
          <div className="motion-header"><div><span className="eyebrow">SELECTED ANIMATION</span><h2>{activeClip?.label ?? "Animation"}</h2><p>Choose its destination, then fine-tune it.</p></div><div className="motion-header-actions"><button className="duplicate-animation" onClick={duplicateActiveClip} title="Duplicate animation" aria-label="Duplicate animation"><Copy /></button><button onClick={selectBaseMedia}>Edit base</button></div></div>
          <Slider label="Transition" value={activeClip?.transition ?? animationTransition} min={.12} max={activeClip?.duration ?? baseDuration} step={.1} unit="s" onChange={(transition) => { if (!activeClip) return; const updated = { ...activeClip, transition: Math.min(transition, activeClip.duration - .18) }; setAnimationTransition(updated.transition); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} trailing={<button type="button" className={`curve-toggle ${activeClip?.easing ?? animationEasing}`} aria-label={`Switch to ${activeClip?.easing === "spring" ? "ease" : "spring"} curve`} title={activeClip?.easing === "spring" ? "Spring curve — click for ease" : "Ease curve — click for spring"} onClick={(event) => { event.preventDefault(); if (!activeClip) return; const easing = activeClip.easing === "spring" ? "ease" as const : "spring" as const; const updated = { ...activeClip, easing }; setAnimationEasing(easing); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); setToast(`${easing === "spring" ? "Spring" : "Ease"} motion applied`); }}><i aria-hidden="true" /></button>} />
          <div className="motion-exit-control"><span>After this animation</span><div><button className={activeClip?.exit === "base" ? "active" : ""} onClick={() => activeClip && setAnimationClips((clips) => clips.map((clip) => clip.id === activeClip.id ? { ...clip, exit: "base" } : clip))}>Return to base</button><button disabled={!activeClip || !nextClip} className={activeClip?.exit === "next" ? "active" : ""} onClick={() => { if (!activeClip || !nextClip) return; const nextStart = activeClip.start + activeClip.duration; setAnimationClips((clips) => clips.map((clip) => clip.id === activeClip.id ? { ...clip, exit: "next" } : clip.id === nextClip.id ? { ...clip, start: nextStart } : clip)); setToast(`Flows into ${nextClip.label}`); }}>Continue to next</button></div>{nextClip ? <small>Flows into {nextClip.label} instead of returning to base.</small> : <small>Add another animation to create a continuation.</small>}</div>
          <div className="camera-tabs"><button className={cameraMode === "zoom" ? "active" : ""} onClick={() => setCameraMode("zoom")}>Zoom</button><button className={cameraMode === "tilt" ? "active" : ""} onClick={() => setCameraMode("tilt")}>Tilt</button><button className="precision-toggle" onClick={() => setPrecisionOpen((value) => !value)}>{precisionOpen ? "Simple" : "Precision"}</button></div>
<div className={`camera-pad animation-camera-pad ${cameraMode === "tilt" ? "tilt-preview" : "zoom-preview"}`} onPointerDown={moveAnimationCamera} onPointerMove={(event) => event.buttons === 1 && moveAnimationCamera(event)} role="application" aria-label="Animation destination camera pad">{cameraMode === "zoom" ? <div className="camera-pad-card camera-focus-window" style={{ left: `${50 + (activeClip?.cameraX ?? 0)}%`, top: `${50 + (activeClip?.cameraY ?? 0)}%`, width: `${Math.min(100, 100 / Math.max(1, activeTargetScale))}%`, height: `${Math.min(100, 100 / Math.max(1, activeTargetScale)) * .64}%` }} /> : <div className="camera-pad-card" style={{ transform: `translate(-50%, -50%) perspective(280px) rotateX(${(activeClip?.targetTiltX ?? 0) + focusTilt}deg) rotateY(${activeClip?.targetTiltY ?? 0}deg) rotateZ(${activeClip?.targetRotate ?? 0}deg) scale(${.65 + activeTargetScale * .18})` }} />}<span className="camera-cross horizontal" /><span className="camera-cross vertical" /><i className="camera-handle" style={{ left: `${cameraMode === "zoom" ? 50 + (activeClip?.cameraX ?? 0) : 50 + Math.max(-45, Math.min(45, activeClip?.targetTiltY ?? 0)) * 1.1}%`, top: `${cameraMode === "zoom" ? 50 + (activeClip?.cameraY ?? 0) : 50 - Math.max(-45, Math.min(45, (activeClip?.targetTiltX ?? 0) + focusTilt)) * 1.1}%` }} /><span className="tilt-preview-label">Tilt preview</span></div>
          {cameraMode === "zoom" ? <Slider label="Zoom" value={focusZoom} min={.45} max={4} step={.01} unit="×" onChange={(value) => { if (!activeClip) return; const updated = { ...activeClip, zoom: value }; setFocusZoom(value); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} /> : <><Slider label="Tilt X" value={(activeClip?.targetTiltX ?? 0) + focusTilt} min={-45} max={45} step={1} unit="°" onChange={(value) => { if (!activeClip) return; const updated = { ...activeClip, targetTiltX: value, tilt: 0 }; setFocusTilt(0); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} /><Slider label="Tilt Y" value={activeClip?.targetTiltY ?? 0} min={-45} max={45} step={1} unit="°" onChange={(value) => { if (!activeClip) return; const updated = { ...activeClip, targetTiltY: value }; setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} /></>}
<AnimatePresence>{precisionOpen && <motion.div className="precision-controls" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}><Slider label="Hold" value={animationHold} min={0} max={Math.min(3, (activeClip?.duration ?? animationDuration) * .3)} step={.1} unit="s" onChange={(hold) => { if (!activeClip) return; const updated = { ...activeClip, hold }; setAnimationHold(hold); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} />{activeClip?.easing === "spring" && <Slider label="Spring speed" value={springSpeed} min={.3} max={2} step={.1} unit="×" onChange={(speed) => { if (!activeClip) return; const updated = { ...activeClip, springSpeed: speed }; setSpringSpeed(speed); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} />}</motion.div>}</AnimatePresence>
<div className="section-label camera-label">Destination preset</div><div className="layout-presets">{mockupPresets.map((preset) => <button key={preset.id} onClick={() => { if (!activeClip) return; const updated = { ...activeClip, presetId: preset.id, label: cameraMode === "tilt" ? "Tilt" : "Zoom", targetX: preset.settings.x, targetY: preset.settings.y, targetTiltX: preset.settings.tiltX, targetTiltY: preset.settings.tiltY, targetRotate: preset.settings.rotate }; setFocusPresetId(preset.id); setAnimationClips((clips) => clips.map((clip) => clip.id === activeClipId ? updated : clip)); seekToClipTarget(updated); }} className={`layout-preset ${preset.id} ${focusPresetId === preset.id ? "selected" : ""}`}><span className="layout-backdrop" /><i style={{ transform: `translate(${preset.settings.x}%, ${preset.settings.y}%) rotate(${preset.settings.rotate}deg) scale(${preset.settings.scale})` }} /><em>{preset.id === basePresetId ? "Same as base" : preset.label}</em></button>)}</div>
        </aside>
        <AnimatePresence>
          {editorMode === "animation" && <motion.section className="timeline-composer" initial={{ y: 36, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 36, opacity: 0 }} transition={{ type: "spring", stiffness: 280, damping: 28 }}>
            <div className="composer-toolbar"><button className="timeline-back" onClick={selectBaseMedia}>Edit mockup</button><button className="composer-add" onClick={addAnimationClip}>+ Add animation</button><button className="timeline-play" onClick={playMotionPreview} aria-label={isTimelinePlaying ? "Pause timeline" : "Play timeline"}>{isTimelinePlaying ? <Pause /> : <Play />}</button><span className="timeline-time">{Math.floor(playhead / 60)}:{(playhead % 60).toFixed(1).padStart(4, "0")} / {baseDuration.toFixed(1)}s</span><button className="timeline-export" onClick={() => { setExportTab("video"); setExportOpen(true); }}><Video /> Export 1080p</button></div>
            <div className="composer-ruler" onPointerDown={seekTimeline}>{Array.from({ length: baseDuration + 1 }, (_, index) => <span key={index} style={{ left: `${index / baseDuration * 100}%` }}>{index === 0 ? "0:00" : `0:0${index}`}</span>)}</div>
<div className="composer-lanes"><div className="composer-lane-label">Animations</div><div ref={animationTrackRef} className="composer-track animation-lane" onPointerDown={seekTimeline}>{animationClips.map((clip) => <button key={clip.id} className={`composer-clip ${activeClipId === clip.id ? "active" : ""}`} style={{ left: `${clip.start / baseDuration * 100}%`, width: `${clip.duration / baseDuration * 100}%` }} onClick={() => selectAnimationClip(clip)} onPointerDown={(event) => beginClipGesture(event, clip, "move")}><span className="clip-handle clip-handle-left" data-drag="move" /><span>{clip.label}</span><small>{clip.duration.toFixed(1)}s</small><span className="clip-handle clip-handle-right" data-drag="resize" onPointerDown={(event) => beginClipGesture(event, clip, "resize")} /></button>)}{orderedClips.map((clip, index) => { const next = orderedClips[index + 1]; return clip.exit === "next" && next && Math.abs(clip.start + clip.duration - next.start) < .11 ? <i key={`${clip.id}-link`} className="clip-link" style={{ left: `${(clip.start + clip.duration) / baseDuration * 100}%`, width: "14px" }} /> : null; })}<button className="composer-plus" onClick={addAnimationClip}>+</button><i className="timeline-playhead" style={{ left: `${playhead / baseDuration * 100}%` }} /></div><div className="composer-lane-label media-label">Base media</div><div className="composer-track media-lane" onPointerDown={seekTimeline}><button type="button" aria-pressed={activeClipId === null} className="base-media-clip" onPointerDown={(event) => { event.stopPropagation(); selectBaseMedia(); }} onClick={selectBaseMedia}><i />Mockup <b>{mockup.media ? "Screenshot" : "Demo media"} · {baseDuration.toFixed(1)}s</b><span>Edit mockup</span></button><i className="timeline-playhead" style={{ left: `${playhead / baseDuration * 100}%` }} /></div></div>
          </motion.section>}
        </AnimatePresence>
      </>}
      <section className="canvas-area"><div className="canvas-frame"><ShaderCanvas recipe={recipe} paused={paused} onError={setError} /><div className="canvas-meta"><span className="live-dot" /> LIVE <b>{activeLabel}</b></div>{error && <div className="canvas-error"><CircleHelp /> Shader error — open Code to repair it.</div>}<div className="canvas-dock"><button data-tooltip="Create a completely new shader recipe" onClick={inspire}><CircleHelp /> Inspire</button><button data-tooltip="Keep the style and settings; choose new colours" onClick={recolour}><Droplets /> Recolour</button><button data-tooltip="Keep the style and colours; replace only the settings" onClick={restyle}><WandSparkles /> Restyle</button><button data-tooltip={paused ? "Resume the live preview" : "Pause the live preview"} onClick={() => setPaused((value) => !value)}>{paused ? <Play /> : <Pause />}{paused ? "Play" : "Pause"}</button></div></div></section>
    </section>
    {saveOpen && <div className="modal-backdrop" role="presentation"><div className="save-modal" role="dialog" aria-modal="true" aria-labelledby="save-title"><button className="close" onClick={() => setSaveOpen(false)} aria-label="Close"><X /></button><Sparkles /><h2 id="save-title">Save recipe</h2><p>Keep this shader configuration in this browser for later remixing.</p><input autoFocus value={saveName} onChange={(event) => setSaveName(event.target.value)} onKeyDown={(event) => event.key === "Enter" && save()} /><button className="button primary wide" onClick={save}><Save /> Save locally</button></div></div>}
    {exportOpen && <div className="modal-backdrop" role="presentation"><div className="export-modal" role="dialog" aria-modal="true" aria-labelledby="export-title"><button className="close" onClick={() => setExportOpen(false)} aria-label="Close"><X /></button><div className="export-header"><div><span className="eyebrow">READY TO SHIP</span><h2 id="export-title">Export shader</h2><p>Take the current look into your project in the format you need.</p></div><ImageDown /></div><div className="export-tabs" role="tablist">{(["image", "video", "prompt", "react", "glsl"] as ExportTab[]).map((item) => <button key={item} className={exportTab === item ? "active" : ""} onClick={() => setExportTab(item)} role="tab" aria-selected={exportTab === item}>{item === "image" ? "Image" : item === "video" ? "Animation" : item === "prompt" ? "Prompt" : item === "react" ? "React code" : "GLSL"}</button>)}</div>{exportTab === "image" && <div className="export-image"><div className="export-preview"><ShaderCanvas recipe={recipe} paused={false} onError={() => undefined} /></div><div><h3>High-resolution PNG</h3><p>Captures the current shader exactly as it appears in the live renderer.</p><button className="button primary wide" onClick={exportPng}><ImageDown /> Download PNG</button></div></div>}{exportTab === "video" && <div className="video-export"><div className="export-preview"><ShaderCanvas recipe={recipe} paused={false} onError={() => undefined} /></div><div className="video-controls"><label>Aspect<select value={videoSettings.aspect} onChange={(event) => updateVideoSettings({ aspect: event.target.value as VideoExportSettings["aspect"] })}><option value="16:9">16:9</option><option value="1:1">1:1</option><option value="9:16">9:16</option></select></label><label>Format<select value={videoSettings.mimeType} onChange={(event) => updateVideoSettings({ mimeType: event.target.value })}>{videoFormats.map((format) => <option key={format.value} value={format.value} disabled={typeof MediaRecorder !== "undefined" && !MediaRecorder.isTypeSupported(format.value)}>{format.label}{typeof MediaRecorder !== "undefined" && !MediaRecorder.isTypeSupported(format.value) ? " — unavailable" : ""}</option>)}</select></label><label>Resolution<select value={videoSettings.height} onChange={(event) => updateVideoSettings({ height: Number(event.target.value) as VideoExportSettings["height"] })}><option value={480}>480p</option><option value={720}>720p</option><option value={1080}>1080p</option></select></label><label>Frame rate<select value={videoSettings.fps} onChange={(event) => updateVideoSettings({ fps: Number(event.target.value) as VideoExportSettings["fps"] })}><option value={24}>24 fps</option><option value={30}>30 fps</option><option value={60}>60 fps</option></select></label><label className="video-duration">Duration<select value={videoSettings.duration} onChange={(event) => updateVideoSettings({ duration: Number(event.target.value) as VideoExportSettings["duration"] })}><option value={2}>2 s</option><option value={3}>3 s</option><option value={5}>5 s</option><option value={8}>8 s</option></select></label><div className="loop-row"><div><b>Ping-pong loop</b><span>{videoSettings.loop ? `Forward + reverse · ${(videoSettings.duration * 2 - 2 / videoSettings.fps).toFixed(1)} s` : "Export one forward pass"}</span></div><button className={`switch ${videoSettings.loop ? "on" : ""}`} onClick={() => updateVideoSettings({ loop: !videoSettings.loop })} aria-pressed={videoSettings.loop} aria-label="Export as a reverse loop"><i /></button></div><p className="video-note">{Math.round(videoSettings.height * ({ "16:9": 16 / 9, "1:1": 1, "9:16": 9 / 16 }[videoSettings.aspect]))} × {videoSettings.height} px · {videoSettings.loop ? videoSettings.duration * videoSettings.fps * 2 - 2 : videoSettings.duration * videoSettings.fps} exact frames. Cursor interactions are excluded from exports.</p><button className="button primary wide" onClick={exportVideo} disabled={videoProgress !== null}><Video /> {videoProgress === null ? "Export video" : `Rendering ${Math.round(videoProgress * 100)}%`}</button></div></div>}{exportTab === "prompt" && <SourceSurface title="Build prompt" helper="A complete implementation prompt generated from the active shader configuration." source={buildPrompt()} footer={<><button className="button primary wide" onClick={() => copyText(buildPrompt(), "Build prompt copied")}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy prompt"}</button><button className="button wide ghost" onClick={() => exportText(buildPrompt(), "shader-studio-prompt.txt", "text/plain")}><Download /> Download .txt</button></>} />}{exportTab === "react" && <SourceSurface title="React component" helper="A self-contained recipe and fragment shader ready to paste into a client component." source={reactCode} footer={<><button className="button primary wide" onClick={() => copyText(reactCode, "React component copied")}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy React code"}</button><button className="button wide ghost" onClick={() => exportText(reactCode, "shader-studio-shader.ts", "text/plain")}><Download /> Download .ts</button></>} />}{exportTab === "glsl" && <SourceSurface title="Fragment GLSL" helper="The exact fragment shader currently driving the preview." source={recipe.glsl} footer={<><button className="button primary wide" onClick={() => copyText(recipe.glsl, "GLSL copied")}>{copied ? <Check /> : <Copy />}{copied ? "Copied" : "Copy GLSL"}</button><button className="button wide ghost" onClick={() => exportText(recipe.glsl, "shader-studio-shader.glsl", "text/plain")}><Download /> Download .glsl</button></>} />}</div></div>}
    {mockupExportOpen && <div className="modal-backdrop" role="presentation"><div className="export-modal mockup-export-modal" role="dialog" aria-modal="true" aria-labelledby="mockup-export-title"><button className="close" onClick={() => setMockupExportOpen(false)} aria-label="Close"><X /></button><div className="export-header"><div><span className="eyebrow">READY TO SHIP</span><h2 id="mockup-export-title">Export shader</h2><p>Choose a shader-only or composed mockup output.</p></div><ImageDown /></div><div className="export-tabs" role="tablist"><button className={exportTab === "image" ? "active" : ""} onClick={() => setExportTab("image")}>Image</button><button className={exportTab === "video" ? "active" : ""} onClick={() => setExportTab("video")}>Animation</button><button className={exportTab === "mockup" ? "active" : ""} onClick={() => setExportTab("mockup")} disabled={!mockup.visible}>Mockup</button></div>{exportTab === "image" && <div className="export-image"><div className="export-preview"><ShaderCanvas recipe={recipe} paused={false} onError={() => undefined} /></div><div><h3>High-resolution PNG</h3><p>Captures the shader only.</p><button className="button primary wide" onClick={exportPng}><ImageDown /> Download PNG</button></div></div>}{exportTab === "video" && <div className="video-export"><div className="export-preview"><ShaderCanvas recipe={recipe} paused={false} onError={() => undefined} /></div><div className="video-controls"><label>Aspect<select value={videoSettings.aspect} onChange={(event) => updateVideoSettings({ aspect: event.target.value as VideoExportSettings["aspect"] })}><option value="16:9">16:9</option><option value="1:1">1:1</option><option value="9:16">9:16</option></select></label><label>Resolution<select value={videoSettings.height} onChange={(event) => updateVideoSettings({ height: Number(event.target.value) as VideoExportSettings["height"] })}><option value={480}>480p</option><option value={720}>720p</option><option value={1080}>1080p</option></select></label><button className="button primary wide" onClick={exportVideo} disabled={videoProgress !== null}><Video /> Export video</button></div></div>}{exportTab === "mockup" && <><div className="export-mode-toggle" role="tablist"><button className={mockupExportMode === "image" ? "active" : ""} onClick={() => setMockupExportMode("image")}>Image</button><button className={mockupExportMode === "video" ? "active" : ""} onClick={() => setMockupExportMode("video")}>Video</button></div><div className="mockup-export"><div className="export-preview mockup-export-preview"><ShaderCanvas recipe={recipe} paused={false} onError={() => undefined} /><div className={`mockup-export-card frame-${mockup.frame}`} style={{ borderRadius: mockup.radius, transform: `translate(${mockup.x / 2}%, ${mockup.y / 2}%) rotate(${mockup.rotate}deg) scale(${Math.max(.5, mockup.scale)})` }}>{mockup.media && mockup.mediaType === "image" ? <img src={mockup.media} alt="Mockup export preview" /> : <div className="mockup-demo"><h1>Your product</h1></div>}</div></div><div className="mockup-export-controls"><h3>{mockupExportMode === "image" ? "Mockup PNG" : "Animated mockup video"}</h3><label>Aspect<select value={videoSettings.aspect} onChange={(event) => updateVideoSettings({ aspect: event.target.value as VideoExportSettings["aspect"] })}><option value="16:9">16:9</option><option value="1:1">1:1</option><option value="9:16">9:16</option></select></label>{mockupExportMode === "image" ? <><label>Resolution<select value={mockupImageHeight} onChange={(event) => setMockupImageHeight(Number(event.target.value) as 720 | 1080 | 1440)}><option value={720}>720p</option><option value={1080}>1080p</option><option value={1440}>1440p</option></select></label><button className="button primary wide" onClick={exportMockupImage}><ImageDown /> Download mockup PNG</button></> : <><label>Resolution<select value={videoSettings.height} onChange={(event) => updateVideoSettings({ height: Number(event.target.value) as VideoExportSettings["height"] })}><option value={480}>480p</option><option value={720}>720p</option><option value={1080}>1080p</option></select></label><label>Duration<select value={videoSettings.duration} onChange={(event) => updateVideoSettings({ duration: Number(event.target.value) as VideoExportSettings["duration"] })}><option value={2}>2 s</option><option value={3}>3 s</option><option value={5}>5 s</option></select></label><button className="button primary wide" onClick={exportMockupVideo} disabled={videoProgress !== null}><Video /> Export mockup video</button></>}</div></div></>}</div></div>}
    {toast && <div className="studio-toast" role="status"><Check />{toast}</div>}
  </main>;
}
