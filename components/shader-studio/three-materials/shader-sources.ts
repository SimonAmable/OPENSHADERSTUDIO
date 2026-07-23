import { buildMeshShader, NOISE_GLSL } from "./noise-glsl";

export const LIQUID_CHROME_FRAG = /* glsl */ `
uniform float uTime;
uniform float uWarp;
uniform float uContrast;
uniform float uGrain;
uniform float uSeed;
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uColorC;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying vec3 vObjectPos;
varying vec3 vObjectNormal;

${NOISE_GLSL}

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);
  float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 2.0 + uContrast * 3.0);

  vec3 opos = vObjectPos * (1.05 + uWarp * 0.35) + vec3(uSeed * 0.01);
  vec3 flowOffset = vec3(
    uTime * (0.18 + uWarp * 0.55),
    -uTime * (0.12 + uWarp * 0.35),
    uTime * 0.08
  );
  float flow = fbm3(opos * (2.2 + uWarp * 1.1) + flowOffset);
  float ripple = fbm3(opos * (2.8 + uWarp * 0.8) + flowOffset * 1.4 + vec3(flow * 1.4, flow, uTime * 0.2));
  float sheen = smoothstep(0.28, 0.82, mix(flow, ripple, 0.45 + uGrain * 2.0));

  vec3 base = mix(uColorA, uColorB, sheen);
  base = mix(base, uColorC, fresnel * (0.35 + uContrast * 0.55));
  vec3 specular = mix(uColorC, vec3(1.0), 0.35) * (sheen * (0.45 + uWarp * 0.55) + fresnel * 1.1);
  vec3 color = base * (0.55 + sheen * 0.5) + specular;
  color += (hash(gl_FragCoord.xy + uTime) - 0.5) * uGrain * 0.35;

  gl_FragColor = vec4(color, 1.0);
}
`;

export const FLOW_FIELD_FRAG = buildMeshShader(`
  vec3 f = opos * 2.0;
  f += vec3(
    fbm3(f + vec3(time * 0.09, 0.0, 0.0)),
    fbm3(f.yzx - vec3(0.0, time * 0.08, 0.0)),
    fbm3(f.zxy + vec3(0.0, 0.0, time * 0.06))
  ) * (0.35 + uWarp * 0.45);
  v = fbm3(f * 2.25);
`);

export const PLASMA_FRAG = buildMeshShader(`
  v = 0.5
    + 0.25 * sin(opos.x * 4.0 + time)
    + 0.25 * sin(opos.y * 5.0 - time * 0.7)
    + 0.2 * sin(opos.z * 4.5 + time * 0.4 + uWarp * 2.0);
`);

export const CAUSTICS_FRAG = buildMeshShader(`
  vec2 cX = opos.yz * 5.0;
  vec2 cY = opos.zx * 5.0;
  vec2 cZ = opos.xy * 5.0;
  cX += vec2(sin(cX.y + time * 0.55), sin(cX.x - time * 0.42)) * (0.25 + uWarp * 0.55);
  cY += vec2(sin(cY.y + time * 0.55), sin(cY.x - time * 0.42)) * (0.25 + uWarp * 0.55);
  cZ += vec2(sin(cZ.y + time * 0.55), sin(cZ.x - time * 0.42)) * (0.25 + uWarp * 0.55);
  float vX = pow(abs(sin(cX.x + sin(cX.y)) * sin(cX.y + sin(cX.x))), 0.28);
  float vY = pow(abs(sin(cY.x + sin(cY.y)) * sin(cY.y + sin(cY.x))), 0.28);
  float vZ = pow(abs(sin(cZ.x + sin(cZ.y)) * sin(cZ.y + sin(cZ.x))), 0.28);
  v = vX * triW.x + vY * triW.y + vZ * triW.z;
`);

export const AURORA_FRAG = buildMeshShader(`
  float curtainX = sin(opos.y * 5.0 + fbm3(vec3(opos.y * 1.4, time * 0.09, opos.z)) * 4.0);
  float curtainY = sin(opos.z * 5.0 + fbm3(vec3(opos.z * 1.4, time * 0.09, opos.x)) * 4.0);
  float curtainZ = sin(opos.x * 5.0 + fbm3(vec3(opos.x * 1.4, time * 0.09, opos.y)) * 4.0);
  float blendX = smoothstep(-0.3, 0.85, curtainX) * (0.56 + 0.44 * fbm3(opos + vec3(time * 0.08, 0.0, 0.0)));
  float blendY = smoothstep(-0.3, 0.85, curtainY) * (0.56 + 0.44 * fbm3(opos.yzx + vec3(0.0, time * 0.08, 0.0)));
  float blendZ = smoothstep(-0.3, 0.85, curtainZ) * (0.56 + 0.44 * fbm3(opos.zxy + vec3(0.0, 0.0, time * 0.08)));
  v = blendX * triW.x + blendY * triW.y + blendZ * triW.z;
  v += fbm3(opos * 1.6 + vec3(uWarp * 0.4, time * 0.05, 0.0)) * 0.12;
`);

export const SMOKE_FRAG = buildMeshShader(`
  float a = fbm3(opos * 1.45 + vec3(time * 0.11, -time * 0.06, time * 0.04));
  float b = fbm3(opos * 3.1 + vec3(-time * 0.07, time * 0.12, uWarp));
  v = smoothstep(0.22, 0.83, a * 0.72 + b * 0.42);
`);

export const SWIRL_FRAG = buildMeshShader(`
  v = swirlAxis(opos.yz, time, uWarp) * triW.x
    + swirlAxis(opos.zx, time, uWarp) * triW.y
    + swirlAxis(opos.xy, time, uWarp) * triW.z;
`);

export const SILK_FRAG = buildMeshShader(`
  v = silkAxis(opos.yz, time, uWarp) * triW.x
    + silkAxis(opos.zx, time, uWarp) * triW.y
    + silkAxis(opos.xy, time, uWarp) * triW.z;
`);

export const NEURO_NOISE_FRAG = buildMeshShader(`
  float a = fbm3(opos * 4.0 + vec3(time * 0.06, 0.0, 0.0));
  float b = fbm3(opos.yzx * 4.0 + vec3(0.0, -time * 0.04, uWarp));
  v = pow(abs(sin((a - b) * 15.0)), 0.6);
`);

export const WAVES_FRAG = buildMeshShader(`
  v = wavesAxis(opos.yz, time, uWarp) * triW.x
    + wavesAxis(opos.zx, time, uWarp) * triW.y
    + wavesAxis(opos.xy, time, uWarp) * triW.z;
`);
