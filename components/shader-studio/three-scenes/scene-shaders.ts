import { Color } from "three";
import type { Recipe } from "../types";

export type ScenePalette = {
  bg: string;
  a: string;
  b: string;
  c: string;
  accent: string;
};

export function scenePalette(recipe: Recipe): ScenePalette {
  const bg = recipe.palette[0] ?? "#060914";
  const a = recipe.palette[1] ?? "#273dff";
  const b = recipe.palette[2] ?? a;
  const c = recipe.palette.at(-1) ?? "#e8fbff";
  return { bg, a, b, c, accent: c };
}

export function scenePaletteColors(palette: ScenePalette) {
  return {
    bg: new Color(palette.bg),
    a: new Color(palette.a),
    b: new Color(palette.b),
    c: new Color(palette.c),
    accent: new Color(palette.accent),
  };
}

export const pointCloudVertex = /* glsl */`
  uniform float uTime;
  uniform float uFlow;
  uniform float uSize;
  uniform float uDrift;
  attribute float aSeed;
  attribute float aWeight;
  varying float vFade;
  varying float vWeight;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }

  void main() {
    vec3 pos = position;
    float t = uTime * (0.35 + uFlow * 0.65);
    float n1 = snoise(pos * 0.55 + vec3(t * 0.18, t * 0.12, aSeed));
    float n2 = snoise(pos * 1.2 + vec3(-t * 0.22, t * 0.16, aSeed * 2.0));
    pos += normal * (n1 * 0.35 + n2 * 0.18) * uDrift;
    pos.y += sin(t + aSeed * 6.28) * 0.08 * uDrift;
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;
    gl_PointSize = uSize * (1.0 + aWeight * 0.8) * (260.0 / -mvPosition.z);
    vFade = smoothstep(12.0, 1.5, -mvPosition.z);
    vWeight = aWeight;
  }
`;

export const pointCloudFragment = /* glsl */`
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  uniform float uIntensity;
  varying float vFade;
  varying float vWeight;

  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float d = length(uv);
    if (d > 0.5) discard;
    float alpha = smoothstep(0.5, 0.08, d) * vFade * (0.35 + vWeight * 0.65);
    vec3 color = mix(uColorA, uColorB, vWeight);
    color = mix(color, uColorC, smoothstep(0.4, 1.0, vWeight) * 0.65);
    gl_FragColor = vec4(color * (0.75 + uIntensity * 0.9), alpha);
  }
`;

export const causticFloorFragment = /* glsl */`
  uniform float uTime;
  uniform float uScale;
  uniform float uWarp;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec2 vUv;

  float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = p * 2.02 + 1.7;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 p = (vUv - 0.5) * uScale;
    float t = uTime * 0.35;
    vec2 q = vec2(fbm(p + t), fbm(p + vec2(1.7, 9.2) - t));
    vec2 r = vec2(fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.15), fbm(p + 4.0 * q + vec2(8.3, 2.8) - t * 0.12));
    float caustic = pow(abs(r.x * r.y), 0.72 + uWarp * 0.35);
    vec3 color = mix(uColorA * 0.08, mix(uColorB, uColorC, caustic), caustic * (0.55 + uWarp * 0.35));
    float vignette = smoothstep(1.2, 0.15, length(vUv - 0.5) * 1.35);
    gl_FragColor = vec4(color * vignette, 1.0);
  }
`;

export const volumetricGlowFragment = /* glsl */`
  uniform float uTime;
  uniform float uIntensity;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorC;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv - 0.5;
    float d = length(uv);
    float pulse = 0.85 + 0.15 * sin(uTime * 1.4 + d * 8.0);
    float core = smoothstep(0.55, 0.0, d) * pulse;
    float halo = smoothstep(0.95, 0.2, d) * 0.35;
    vec3 color = mix(uColorA, uColorB, smoothstep(0.0, 0.5, d));
    color = mix(color, uColorC, halo);
    float alpha = (core + halo) * uIntensity;
    gl_FragColor = vec4(color, alpha);
  }
`;

export function createPointCloudAttributes(count: number, radius = 2.8) {
  const positions = new Float32Array(count * 3);
  const normals = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  const weights = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = radius * (0.25 + Math.pow(Math.random(), 0.55) * 0.75);
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta) * 0.65;
    const z = r * Math.cos(phi);
    positions[i * 3] = x;
    positions[i * 3 + 1] = y;
    positions[i * 3 + 2] = z;
    const len = Math.hypot(x, y, z) || 1;
    normals[i * 3] = x / len;
    normals[i * 3 + 1] = y / len;
    normals[i * 3 + 2] = z / len;
    seeds[i] = Math.random();
    weights[i] = Math.random();
  }

  return { positions, normals, seeds, weights };
}
