/** Shared GLSL noise utilities for mesh surface shaders. */
export const NOISE_GLSL = /* glsl */ `
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}
float hash31(vec3 p) {
  return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
}
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
    f.y
  );
}
float noise3(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n000 = hash31(i);
  float n100 = hash31(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash31(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash31(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash31(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash31(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash31(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash31(i + vec3(1.0, 1.0, 1.0));
  float nx00 = mix(n000, n100, f.x);
  float nx10 = mix(n010, n110, f.x);
  float nx01 = mix(n001, n101, f.x);
  float nx11 = mix(n011, n111, f.x);
  return mix(mix(nx00, nx10, f.y), mix(nx01, nx11, f.y), f.z);
}
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.55;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + 4.1;
    a *= 0.5;
  }
  return v;
}
float fbm3(vec3 p) {
  float v = 0.0;
  float a = 0.55;
  for (int i = 0; i < 5; i++) {
    v += a * noise3(p);
    p = p * 2.03 + vec3(4.1, 2.7, 1.3);
    a *= 0.5;
  }
  return v;
}
vec3 triWeights(vec3 n) {
  vec3 w = pow(abs(normalize(n)), vec3(4.0));
  return w / (w.x + w.y + w.z + 1e-5);
}
float swirlAxis(vec2 p, float time, float warp) {
  float r = length(p);
  float ang = atan(p.y, p.x) + 1.8 / (r + 0.18) + time * (0.2 + warp * 0.35);
  return 0.5 + 0.5 * sin(ang * 4.0 + r * 13.0);
}
float silkAxis(vec2 p, float time, float warp) {
  vec2 s = p * 2.4;
  s.y += fbm(vec2(s.x * 0.8 + time * 0.16, s.y * 0.8)) * (1.2 + warp * 1.8);
  s.x += sin(s.y * 1.8) * 0.45;
  return 0.5 + 0.5 * sin(s.y * 2.5 + fbm(s * 1.7) * 5.0);
}
float wavesAxis(vec2 p, float time, float warp) {
  vec2 w = p * 2.7;
  w.y += sin(w.x * 1.7 + time) * (0.25 + warp * 0.45) + fbm(w + time * 0.05) * 0.55;
  return 0.5 + 0.5 * sin(w.y * 4.8 - time);
}
`;

export const MESH_SURFACE_VERT = /* glsl */ `
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vObjectPos;
varying vec3 vObjectNormal;

void main() {
  vObjectPos = position;
  vObjectNormal = normal;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vViewPosition = -mvPosition.xyz;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * mvPosition;
}
`;

/** Standard uniforms + varyings header for animated mesh shaders. */
export const MESH_SHADER_HEADER = /* glsl */ `
uniform float uTime;
uniform float uWarp;
uniform float uContrast;
uniform float uGrain;
uniform float uSeed;
uniform float uSpeed;
uniform float uIntensity;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vObjectPos;
varying vec3 vObjectNormal;
`;

/** Object-space setup — avoids UV seam lines on curved meshes. */
export const MESH_SHADER_SETUP = /* glsl */ `
  vec3 opos = vObjectPos * 0.52 + vec3(uSeed * 0.01);
  vec3 onrm = normalize(vObjectNormal);
  vec3 triW = triWeights(onrm);
  float time = uTime * (0.35 + uSpeed * 1.1);
  float v;
`;

/** Maps pattern value v to palette with fresnel and grain. */
export const MESH_SHADER_FOOTER = /* glsl */ `
  v = mix(0.5, v, uIntensity);
  v = pow(max(v, 0.001), 1.3 - uContrast * 0.65);

  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.0 + uContrast * 3.0);

  vec3 base = mix(uColorA, uColorB, v);
  base = mix(base, uColorC, fresnel * (0.35 + uContrast * 0.55));
  base += (hash(gl_FragCoord.xy + uTime) - 0.5) * uGrain * 0.35;

  gl_FragColor = vec4(clamp(base, 0.0, 1.0), 1.0);
}
`;

export function buildMeshShader(body: string) {
  return `${MESH_SHADER_HEADER}\n${NOISE_GLSL}\nvoid main() {\n${MESH_SHADER_SETUP}\n${body}\n${MESH_SHADER_FOOTER}`;
}
