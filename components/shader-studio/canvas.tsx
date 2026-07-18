"use client";

import { type ComponentType, type CSSProperties, type PointerEvent, useEffect, useMemo, useRef, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { BookOpen, ImageDown, WandSparkles } from "lucide-react";
import { ColorPanels, Dithering, DotGrid, DotOrbit, GodRays, GrainGradient, MeshGradient, Metaballs, NeuroNoise, PerlinNoise, PulsingBorder, SimplexNoise, SmokeRing, Spiral, StaticMeshGradient, StaticRadialGradient, Swirl, Voronoi, Warp, Waves } from "@paper-design/shaders-react";
import { MediaCanvas, queryMediaCanvas, waitForMediaCanvas } from "./media-canvas";
import { exportMediaPng, resolveMediaImageForExport } from "./media-export";
import { isPaperMediaFilter, isVfxMediaFilter, mediaFilterNames, mediaPreviewSampleId } from "./media-catalog";
import type { MediaFilterId, Recipe, SavedPalette, ThemeOption, MockupSettings, Tab } from "./types";
import { recordCanvasAnimation as encodeCanvasAnimation, exportExtensionForMime, exportVideoBitrate } from "./video-encoder";

export { exportExtensionForMime, exportVideoBitrate };
export const recordCanvasAnimation = encodeCanvasAnimation;

export const fragmentShader = `precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_pointer;
uniform vec2 u_velocity;
uniform vec3 u_colors[8];
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
vec3 gradient(float t){ t=clamp(t,0.,.999); float x=t*7.; int i=int(floor(x)); float f=fract(x); if(u_smooth_blend>.5)f=f*f*(3.-2.*f); if(i==0)return mix(u_colors[0],u_colors[1],f); if(i==1)return mix(u_colors[1],u_colors[2],f); if(i==2)return mix(u_colors[2],u_colors[3],f); if(i==3)return mix(u_colors[3],u_colors[4],f); if(i==4)return mix(u_colors[4],u_colors[5],f); if(i==5)return mix(u_colors[5],u_colors[6],f); return mix(u_colors[6],u_colors[7],f); }
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
  else if(u_style<13.5){ // Aurora: the original soft curtain implementation.
    vec2 a=p; a.x+=fbm(vec2(a.y*1.4,time*.09))*1.1; float curtain=sin(a.x*5.+fbm(a*2.+time*.12)*4.);
    v=smoothstep(-.3,.85,curtain)*(.56+.44*fbm(a*3.-time*.08));
  }
  else if(u_style<14.5){ // Mesh gradient: moving, organic color spots.
    vec2 m=p*1.4; float a=fbm(m+vec2(time*.10,-time*.06)); float b=fbm(m*1.8+vec2(-time*.05,time*.09)); v=mix(a,b,.42);
  }
  else if(u_style<15.5){ // Static mesh gradient: a calm, non-animated color field.
    vec2 m=p*1.35; v=fbm(m*.9+u_seed*.01)*.62+fbm(m*2.1+vec2(7.3,1.8))* .38;
  }
  else if(u_style<16.5){ // Static radial gradient: nested soft color blooms.
    vec2 r=p+vec2(sin(u_seed)*.08,cos(u_seed)*.08); v=.5+.34*cos(length(r-vec2(.22,-.16))*5.)+.18*cos(length(r+vec2(.28,.22))*7.);
  }
  else if(u_style<17.5){ // Dithering: posterized ordered screen pattern.
    vec2 q=floor((p+1.)*18.); float tone=fbm(q*.16+u_seed); float threshold=fract(dot(mod(q,4.),vec2(.25,.125))); v=step(threshold, tone);
  }
  else if(u_style<18.5){ // Grain gradient: large soft gradient with tactile grain.
    v=.5+.32*sin(p.x*2.2+p.y*.8+time*.15)+.18*fbm(p*2.3+time*.03);
  }
  else if(u_style<19.5){ // Dot orbit: circles travelling around a central orbit.
    vec2 o=p*3.; float a=atan(o.y,o.x)+time*.6; float ring=abs(length(o)-1.25-.12*sin(a*5.)); float dots=step(.78,.5+.5*sin(a*9.-time*2.)); v=(1.-smoothstep(.015,.09,ring))*dots;
  }
  else if(u_style<20.5){ // Dot grid: evenly spaced adjustable graphic dots.
    vec2 g=fract(p*9.)-.5; float shade=.34+.55*fbm(floor(p*9.)*.22+u_seed); v=1.-smoothstep(shade*.08,shade*.16,length(g));
  }
  else if(u_style<21.5){ // Warp: stretched, refracted bands.
    vec2 w=p*3.; w+=vec2(fbm(w.yx+time*.12),fbm(w+time*.08))*1.25; v=.5+.5*sin(w.x*4.7+w.y*1.8);
  }
  else if(u_style<22.5){ // Spiral: graphic arms wrapped around the centre.
    float a=atan(p.y,p.x); float r=length(p); v=.5+.5*sin(a*6.-r*16.-time*.7);
  }
  else if(u_style<23.5){ // Swirl: liquid vortex contours.
    float r=length(p); float a=atan(p.y,p.x)+1.8/(r+.18)+time*.25; v=.5+.5*sin(a*4.+r*13.);
  }
  else if(u_style<24.5){ // Waves: layered directional wave fronts.
    vec2 w=p*2.7; w.y+=sin(w.x*1.7+time)*.45+fbm(w+time*.05)*.55; v=.5+.5*sin(w.y*4.8-time);
  }
  else if(u_style<25.5){ // Neuro noise: dense neural-like pathways.
    vec2 n=p*4.; float a=fbm(n+time*.06); float b=fbm(n.yx*1.7-time*.04); v=pow(abs(sin((a-b)*15.)),.6);
  }
  else if(u_style<26.5){ // Perlin noise: soft coherent clouds.
    v=fbm(p*3.+vec2(time*.08,-time*.04));
  }
  else if(u_style<27.5){ // Simplex-inspired noise: sharper, directional cloud fields.
    vec2 n=p*3.; n=mat2(.866,-.5,.5,.866)*n; v=fbm(n+vec2(time*.07,time*.03));
  }
  else if(u_style<28.5){ // Voronoi: cellular distance field.
    vec2 c=p*6.; vec2 cell=floor(c), f=fract(c); float dist=2.; for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 g=vec2(float(x),float(y));vec2 h=vec2(hash(cell+g),hash(cell+g+4.2));dist=min(dist,length(g+h-f));} v=1.-smoothstep(.08,.72,dist);
  }
  else if(u_style<29.5){ // Pulsing border: luminous animated edge treatment.
    float edge=min(.5-abs(uv.x),.5-abs(uv.y)); float pulse=.55+.45*sin(time*3.+u_seed); v=smoothstep(.015,.09,edge)*.18+(1.-smoothstep(.012,.04,edge))*pulse;
  }
  else if(u_style<30.5){ // Metaballs: soft merging liquid forms.
    vec2 b=p*1.7; float m=0.; for(int i=0;i<4;i++){float fi=float(i); vec2 c=vec2(sin(time*.6+fi*1.7),cos(time*.8+fi*2.1))*.38; m+=.18/(length(b-c)+.08);} v=smoothstep(.38,.78,m);
  }
  else if(u_style<31.5){ // Color panels: modern overlapping translucent blocks.
    vec2 c=p*2.5; float a=smoothstep(-.45,.45,sin(c.x+time*.18)); float b=smoothstep(-.35,.35,sin(c.y*1.5-time*.13)); float d=smoothstep(-.3,.3,sin((c.x+c.y)*.8)); v=(a+b+d)/3.;
  }
  else if(u_style<32.5){ // Smoke ring: turbulent circular plume.
    float r=length(p); float a=atan(p.y,p.x); float ring=abs(r-.38-.11*fbm(vec2(a*2.,time*.09)+u_seed)); v=1.-smoothstep(.015,.13,ring);
  }
  else { // God rays: soft beams radiating from a bright source.
    vec2 g=p-vec2(-.12,-.38); float a=atan(g.y,g.x); float rays=pow(.5+.5*sin(a*13.+fbm(g*5.)*4.+time*.25),3.); v=rays*(1.-smoothstep(.08,1.2,length(g)))+.18*exp(-length(g)*7.);
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

export const defaultRecipe: Recipe = {
  id: "silk-01", name: "Silk", kind: "shader", style: 0, mediaFilter: "paper-water", mediaSource: null,
  palette: ["#060914", "#273dff", "#00ddff", "#e8fbff"],
  intensity: .76, zoom: 1.02, warp: .2, contrast: .56, speed: 1, drift: .5, blur: 0, animate: true, reverse: false, grain: .045, rotate: 0, offsetX: 0, offsetY: 0, seed: 1, smoothBlend: false,
  cursorEnabled: true, cursorEffect: "spotlight", cursorStrength: .5, cursorRadius: .5, glsl: fragmentShader,
};

// App presets are part of the product, not a particular browser's library.
// Keep user-created recipes in localStorage separately so they remain personal.
export const appPresets: Recipe[] = [{
  id: "electric-warp-stripes", name: "Electric Warp stripes", kind: "shader", style: 10,
  mediaFilter: "paper-water", mediaSource: null,
  palette: ["#09151a", "#146b82", "#4bbad7", "#e6faff"],
  intensity: 0.7770323292260786, zoom: 0.6589337896921063, warp: 0.6077682917880166,
  contrast: 0.6671220502700947, speed: 0.15200116236584896, drift: 0.6233140640072878,
  blur: 0, animate: true, reverse: true, grain: 0.023892210393196545,
  rotate: 0.36931710255198746, offsetX: -0.059887687089624886, offsetY: 0.3715470181698023,
  seed: 25330, smoothBlend: false, cursorEnabled: true, cursorEffect: "ripple",
  cursorStrength: 0.3266945243299727, cursorRadius: 0.5646328144774306, glsl: fragmentShader,
}];

export const SAVED_RECIPES_KEY = "shader-studio-saved-recipes";
export const RESUME_RECIPE_KEY = "shader-studio-resume-recipe";
export const SAVED_PALETTES_KEY = "shader-studio-saved-palettes";

export const presetGroups = [
  { title: "Flow", items: [["Silk", 0], ["Smoke", 1], ["Flow field", 3], ["Waves", 24]] },
  { title: "Light", items: [["Aurora", 13], ["Shimmer", 4], ["Orb", 5], ["Caustics", 6]] },
  { title: "Blobs", items: [["Mesh drift", 7], ["Metaballs", 30]] },
  { title: "Pattern", items: [["Plasma", 9], ["Warp stripes", 10], ["Rings", 11], ["Halftone", 12]] },
  { title: "Gradients", items: [["Mesh gradient", 14], ["Static mesh", 15], ["Static radial", 16], ["Grain gradient", 18]] },
  { title: "Graphic", items: [["Dithering", 17], ["Dot orbit", 19], ["Dot grid", 20], ["Color panels", 31]] },
  { title: "Motion", items: [["Warp", 21], ["Spiral", 22], ["Swirl", 23], ["Pulsing border", 29]] },
  { title: "Noise", items: [["Neuro noise", 25], ["Perlin", 26], ["Simplex", 27], ["Voronoi", 28]] },
  { title: "Atmosphere", items: [["Smoke ring", 32], ["God rays", 33]] },
] as const;
export const styleNames: Record<number, string> = {
  0: "Silk", 1: "Smoke", 2: "Waves", 3: "Flow field", 4: "Shimmer", 5: "Orb", 6: "Caustics",
  7: "Mesh drift", 8: "Metaballs", 9: "Plasma", 10: "Warp stripes", 11: "Rings", 12: "Halftone", 13: "Aurora",
  14: "Mesh gradient", 15: "Static mesh gradient", 16: "Static radial gradient", 17: "Dithering", 18: "Grain gradient",
  19: "Dot orbit", 20: "Dot grid", 21: "Warp", 22: "Spiral", 23: "Swirl", 24: "Waves", 25: "Neuro noise",
  26: "Perlin noise", 27: "Simplex noise", 28: "Voronoi", 29: "Pulsing border", 30: "Metaballs", 31: "Color panels",
  32: "Smoke ring", 33: "God rays",
};

export const palettes = [
  ["#060914", "#273dff", "#00ddff", "#e8fbff"], ["#180524", "#7f42ef", "#e95db2", "#ffd4f3"],
  ["#051c1a", "#078b70", "#72e87b", "#f2ffc5"], ["#260c06", "#cf432d", "#fc9f2c", "#ffebbd"],
  ["#08080e", "#4b235e", "#cc51af", "#ffd1ed"], ["#061923", "#137194", "#4cc6e7", "#e6fbff"],
  ["#17120d", "#865633", "#d69a62", "#fff0db"], ["#120b1d", "#5b2a93", "#a94fe0", "#edc3ff"],
  ["#09151a", "#146b82", "#4bbad7", "#e6faff"], ["#1a0a0d", "#9d254c", "#fa729c", "#ffe0e8"],
  ["#101014", "#565b66", "#adb1b8", "#f5f6f7"], ["#080b14", "#253d91", "#637eea", "#dbe4ff"],
  ["#120806", "#8a3619", "#f47132", "#ffce9b"], ["#07150b", "#2f783a", "#a9e84a", "#f2ffd0"],
  ["#060610", "#1b2b82", "#5140af", "#a87bc9"], ["#0c1115", "#2c5f88", "#64b7da", "#f0fbff"],
];

export const presetSettings: Record<number, Partial<Recipe>> = {
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
  14: { palette: ["#170c3d", "#4d3cff", "#e764ff", "#ffd6a5"], intensity: .82, zoom: 1.04, warp: .4, contrast: .62, speed: .8, drift: .22, grain: .025 },
  15: { palette: ["#111827", "#235da8", "#50c7bc", "#f3d9a6"], intensity: .76, zoom: 1.08, warp: .18, contrast: .5, speed: 0, drift: 0, grain: .018, animate: false },
  16: { palette: ["#120d2e", "#6137b8", "#e36fb4", "#fff0b8"], intensity: .8, zoom: 1.05, warp: .1, contrast: .58, speed: 0, drift: 0, grain: .01, animate: false },
  17: { palette: ["#071127", "#0068b5", "#4fd8e8", "#e8ffea"], intensity: .86, zoom: 1.04, warp: .12, contrast: .82, speed: .18, drift: .04, grain: .01 },
  18: { palette: ["#120b2d", "#4b2a9d", "#db62c4", "#ffd7a0"], intensity: .76, zoom: 1.06, warp: .2, contrast: .52, speed: .34, drift: .12, grain: .075 },
  19: { palette: ["#07101d", "#1a4b9b", "#49c6ff", "#f5fdff"], intensity: .93, zoom: 1.12, warp: .1, contrast: .88, speed: .95, drift: .1, grain: .012 },
  20: { palette: ["#160c21", "#7d2c77", "#ed77bb", "#ffe5f6"], intensity: .89, zoom: 1.1, warp: .1, contrast: .84, speed: .14, drift: .04, grain: .012 },
  21: { palette: ["#071c20", "#0e677c", "#36cfce", "#e9ffe8"], intensity: .84, zoom: 1.08, warp: .54, contrast: .72, speed: 1.05, drift: .3, grain: .02 },
  22: { palette: ["#21062b", "#8d218d", "#f26cba", "#ffe6ac"], intensity: .86, zoom: 1.08, warp: .22, contrast: .75, speed: .75, drift: .1, grain: .017 },
  23: { palette: ["#05090f", "#174f91", "#31b8d0", "#e8ffd3"], intensity: .86, zoom: 1.12, warp: .3, contrast: .76, speed: .65, drift: .1, grain: .02 },
  24: { palette: ["#051c2b", "#09618d", "#49d3e5", "#efffc6"], intensity: .8, zoom: 1.12, warp: .36, contrast: .65, speed: 1.05, drift: .22, grain: .018 },
  25: { palette: ["#100b1d", "#55287f", "#c960d7", "#f6d1f0"], intensity: .85, zoom: 1.08, warp: .56, contrast: .82, speed: .52, drift: .16, grain: .035 },
  26: { palette: ["#061512", "#16674e", "#76d58e", "#e3ffe1"], intensity: .75, zoom: 1.1, warp: .22, contrast: .52, speed: .54, drift: .16, grain: .025 },
  27: { palette: ["#111124", "#3d4db3", "#9b7eff", "#eef0ff"], intensity: .78, zoom: 1.08, warp: .28, contrast: .58, speed: .55, drift: .18, grain: .025 },
  28: { palette: ["#18110a", "#84532c", "#df974d", "#fff0c2"], intensity: .88, zoom: 1.08, warp: .2, contrast: .83, speed: .18, drift: .05, grain: .012 },
  29: { palette: ["#050714", "#24328c", "#7478ff", "#eff4ff"], intensity: .92, zoom: 1, warp: .04, contrast: .92, speed: 1.2, drift: .02, grain: .016 },
  30: { palette: ["#050812", "#0b4eae", "#20c7ef", "#dfffea"], intensity: .9, zoom: 1.1, warp: .18, contrast: .8, speed: .85, drift: .2, grain: .015 },
  31: { palette: ["#1d0d24", "#7a2e72", "#ec6e9f", "#ffe5bb"], intensity: .82, zoom: 1.08, warp: .16, contrast: .69, speed: .48, drift: .12, grain: .012 },
  32: { palette: ["#070914", "#283f96", "#b364e6", "#ffe4fa"], intensity: .86, zoom: 1.1, warp: .48, contrast: .77, speed: .62, drift: .18, grain: .04 },
  33: { palette: ["#140c1c", "#7b365e", "#f3a56e", "#fff2bf"], intensity: .9, zoom: 1.04, warp: .25, contrast: .78, speed: .38, drift: .08, grain: .02 },
};

export const companyThemes = [
  { name: "Modern Minimal", palette: ["#111214", "#626875", "#c9cdd3", "#f7f8fa"] },
  { name: "Vercel", palette: ["#050505", "#383838", "#a7a7a7", "#f5f5f5"] },
  { name: "Claude Amber", palette: ["#24150b", "#b55e2f", "#e7975c", "#fff0db"] },
  { name: "Claude", palette: ["#201611", "#7c4d38", "#c98f6a", "#f8e8d5"] },
  { name: "Zen Linen", palette: ["#191611", "#847a68", "#cfc3ab", "#fff9ee"] },
  { name: "Supabase", palette: ["#07120d", "#3c9f66", "#8ee9ae", "#e5ffeb"] },
  { name: "Lime Frost", palette: ["#11170b", "#6da933", "#c8f65e", "#f7ffd9"] },
  { name: "Cappuccino", palette: ["#1b0e09", "#7c472c", "#bd8157", "#f7dac0"] },
] as const;

export function companyThemeKey(name: string) {
  return `company:${name}`;
}

export function savedThemeKey(id: string) {
  return `saved:${id}`;
}

export function buildThemeOptions(savedPalettes: SavedPalette[]): ThemeOption[] {
  return [
    ...companyThemes.map((theme) => ({ key: companyThemeKey(theme.name), name: theme.name, colors: [...theme.palette] })),
    ...savedPalettes
      .filter((item) => item.name.trim().length > 0)
      .map((item) => ({ key: savedThemeKey(item.id), name: item.name, colors: item.colors, deletable: true })),
  ];
}

export function capitalizeWords(value: string) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

export const tabs = [
  { id: "presets" as const, label: "Presets", icon: BookOpen },
  { id: "visuals" as const, label: "Visuals", icon: WandSparkles },
  { id: "mockup" as const, label: "Mockup", icon: ImageDown },
];

export const mockupPresets: { id: string; label: string; settings: Omit<MockupSettings, "media" | "mediaType" | "chrome" | "borderStyle" | "radius" | "shadow" | "visible"> }[] = [
  { id: "custom", label: "Custom layout", settings: { scale: .45, x: 0, y: 0, cameraX: 0, cameraY: 0, tiltX: 0, tiltY: 0, rotate: 0 } },
  { id: "float", label: "Soft focus", settings: { scale: 1.12, x: 0, y: 0, cameraX: 0, cameraY: -8, tiltX: 4, tiltY: -9, rotate: -3 } },
  { id: "left", label: "Focus left", settings: { scale: 1.75, x: 0, y: 0, cameraX: -32, cameraY: 4, tiltX: 0, tiltY: 8, rotate: 1 } },
  { id: "right", label: "Focus right", settings: { scale: 1.75, x: 0, y: 0, cameraX: 32, cameraY: 4, tiltX: 0, tiltY: -8, rotate: -1 } },
  { id: "tilt", label: "Tilted close", settings: { scale: 1.8, x: 0, y: 0, cameraX: 18, cameraY: 10, tiltX: 8, tiltY: -11, rotate: -5 } },
  { id: "drama", label: "Dramatic tilt", settings: { scale: 2.2, x: 0, y: 0, cameraX: -18, cameraY: 14, tiltX: 15, tiltY: 18, rotate: 8 } },
  { id: "overhead", label: "Overhead", settings: { scale: 1.45, x: 0, y: 0, cameraX: 2, cameraY: -28, tiltX: 18, tiltY: 0, rotate: 0 } },
  { id: "corner", label: "Corner crop", settings: { scale: 2.5, x: 0, y: 0, cameraX: 36, cameraY: -24, tiltX: -9, tiltY: -16, rotate: -7 } },
  { id: "postcard", label: "Wide reveal", settings: { scale: .92, x: 0, y: 0, cameraX: 0, cameraY: 15, tiltX: -3, tiltY: 0, rotate: 0 } },
];

export function hexToRgb(hex: string) { const value = hex.replace("#", ""); return [parseInt(value.slice(0, 2), 16) / 255, parseInt(value.slice(2, 4), 16) / 255, parseInt(value.slice(4, 6), 16) / 255] as const; }

type PaperShaderComponent = ComponentType<any>;
const paperShaders: Record<number, PaperShaderComponent> = {
  14: MeshGradient as PaperShaderComponent, 15: StaticMeshGradient as PaperShaderComponent, 16: StaticRadialGradient as PaperShaderComponent,
  17: Dithering as PaperShaderComponent, 18: GrainGradient as PaperShaderComponent, 19: DotOrbit as PaperShaderComponent,
  20: DotGrid as PaperShaderComponent, 21: Warp as PaperShaderComponent, 22: Spiral as PaperShaderComponent, 23: Swirl as PaperShaderComponent,
  24: Waves as PaperShaderComponent, 25: NeuroNoise as PaperShaderComponent, 26: PerlinNoise as PaperShaderComponent,
  27: SimplexNoise as PaperShaderComponent, 28: Voronoi as PaperShaderComponent, 29: PulsingBorder as PaperShaderComponent,
  30: Metaballs as PaperShaderComponent, 31: ColorPanels as PaperShaderComponent, 32: SmokeRing as PaperShaderComponent, 33: GodRays as PaperShaderComponent,
};
export const paperShaderNames: Record<number, string> = { 14: "MeshGradient", 15: "StaticMeshGradient", 16: "StaticRadialGradient", 17: "Dithering", 18: "GrainGradient", 19: "DotOrbit", 20: "DotGrid", 21: "Warp", 22: "Spiral", 23: "Swirl", 24: "Waves", 25: "NeuroNoise", 26: "PerlinNoise", 27: "SimplexNoise", 28: "Voronoi", 29: "PulsingBorder", 30: "Metaballs", 31: "ColorPanels", 32: "SmokeRing", 33: "GodRays" };
export const isPaperStyle = (style: number) => Boolean(paperShaders[style]);

type PaperCursorOffset = { x: number; y: number; rotation: number };

function paperPalette(recipe: Recipe) {
  return recipe.palette.length ? recipe.palette : defaultRecipe.palette;
}

export function paperSpeed(recipe: Recipe, frozen: boolean) {
  if (frozen || !recipe.animate) return 0;
  return recipe.reverse ? -recipe.speed : recipe.speed;
}

function paperSoftness(recipe: Recipe) {
  return recipe.smoothBlend ? 1 : 0.25 + (1 - recipe.contrast) * 0.5;
}

function paperDriftOffset(recipe: Recipe) {
  const phase = recipe.seed * 0.0017;
  return { x: recipe.drift * Math.sin(phase) * 0.55, y: recipe.drift * Math.cos(phase * 1.13) * 0.55 };
}

function paperShared(recipe: Recipe, frozen: boolean, cursor: PaperCursorOffset = { x: 0, y: 0, rotation: 0 }, pixelBudget = 1920 * 1080) {
  const drift = paperDriftOffset(recipe);
  return {
    scale: recipe.zoom,
    rotation: recipe.rotate * 180 / Math.PI + cursor.rotation,
    offsetX: Math.max(-1, Math.min(1, recipe.offsetX + drift.x + cursor.x)),
    offsetY: Math.max(-1, Math.min(1, recipe.offsetY + drift.y + cursor.y)),
    speed: paperSpeed(recipe, frozen),
    frame: recipe.seed,
    minPixelRatio: 1,
    maxPixelCount: pixelBudget,
  };
}

function paperTwoColor(palette: string[]) {
  return { colorBack: palette[0], colorFront: palette.at(-1) ?? palette[0] };
}

function paperBackAndColors(palette: string[]) {
  return { colorBack: palette[0], colors: palette.length > 1 ? palette.slice(1) : palette };
}

function paperUsesNativeSurface(style: number) {
  return style === 25 || style === 33;
}

function paperCanvasStyle(recipe: Recipe): CSSProperties {
  const style: CSSProperties = { width: "100%", height: "100%" };
  if (!paperUsesNativeSurface(recipe.style)) {
    style.opacity = 0.35 + recipe.intensity * 0.65;
    style.filter = `contrast(${0.65 + recipe.contrast * 0.7})`;
  }
  if (recipe.blur) {
    style.filter = `${style.filter ? `${style.filter} ` : ""}blur(${recipe.blur}px)`;
    style.transform = "scale(1.025)";
  }
  return style;
}

export function paperProps(recipe: Recipe, frozen: boolean, cursor: PaperCursorOffset = { x: 0, y: 0, rotation: 0 }, pixelBudget = 1920 * 1080) {
  const palette = paperPalette(recipe);
  const shared = paperShared(recipe, frozen, cursor, pixelBudget);
  const softness = paperSoftness(recipe);
  const mid = palette[Math.floor(palette.length / 2)] ?? palette[0];
  const distortion = { distortion: recipe.warp };
  const swirl = { swirl: recipe.warp * 0.65 };
  const grainOverlay = { grainOverlay: recipe.grain };

  switch (recipe.style) {
    case 14:
      return { ...shared, ...distortion, ...swirl, ...grainOverlay, grainMixer: recipe.grain * 0.7, colors: palette };
    case 15:
      return { ...shared, ...grainOverlay, grainMixer: recipe.grain * 0.7, waveX: recipe.warp * 0.6, waveY: recipe.warp * 0.45, waveXShift: (recipe.seed % 100) / 100, waveYShift: ((recipe.seed * 7) % 100) / 100, mixing: softness, colors: palette, positions: recipe.seed % 100 };
    case 16:
      return { ...shared, ...distortion, ...grainOverlay, grainMixer: recipe.grain * 0.5, mixing: softness, ...paperBackAndColors(palette) };
    case 17:
      return { ...shared, ...paperTwoColor(palette), size: 1 + recipe.warp * 4 };
    case 18:
      return { ...shared, ...paperBackAndColors(palette), intensity: recipe.warp, noise: recipe.grain, softness };
    case 19:
      return { ...shared, ...paperBackAndColors(palette), spreading: recipe.warp * 0.7, size: 0.3 + recipe.intensity * 0.5, stepsPerColor: recipe.smoothBlend ? 2 : 1 };
    case 20:
      return { ...shared, colorBack: palette[0], colorFill: palette.at(-1) ?? palette[0], colorStroke: palette[Math.max(1, palette.length - 2)] ?? palette[0], dotSize: 4 + recipe.intensity * 12, sizeRange: recipe.warp * 0.6, opacityRange: recipe.contrast * 0.4 };
    case 21:
      return { ...shared, ...distortion, ...swirl, colors: palette, softness, swirlIterations: 2 + recipe.drift * 10 };
    case 22:
      return { ...shared, ...paperTwoColor(palette), distortion: recipe.warp, noise: recipe.grain, softness };
    case 23:
      return { ...shared, ...paperBackAndColors(palette), twist: recipe.warp * 0.8, noise: recipe.grain, softness, bandCount: 3 + recipe.drift * 8 };
    case 24:
      return { ...shared, ...paperTwoColor(palette), amplitude: recipe.intensity * 0.8, frequency: 0.5 + recipe.warp, spacing: 0.5 + recipe.drift, softness };
    case 25:
      return { ...shared, colorBack: palette[0], colorMid: mid, colorFront: palette.at(-1) ?? palette[0], brightness: 0.35 + recipe.intensity * 0.65, contrast: 0.2 + recipe.contrast * 0.8 };
    case 26:
      return { ...shared, ...paperTwoColor(palette), proportion: 0.35 + recipe.intensity * 0.3, softness, lacunarity: 1.5 + recipe.warp * 5, persistence: 0.35 + recipe.contrast * 0.55 };
    case 27:
      return { ...shared, colors: palette, stepsPerColor: recipe.smoothBlend ? 2 : 1, softness };
    case 28:
      return { ...shared, colorGap: palette[0], colorGlow: palette.at(-1) ?? palette[0], colors: palette.length > 2 ? palette.slice(1, -1) : palette.slice(1), distortion: Math.min(0.5, recipe.warp * 0.5), glow: recipe.intensity * 0.8, stepsPerColor: recipe.smoothBlend ? 2 : 1 };
    case 29:
      return { ...shared, ...paperBackAndColors(palette), intensity: recipe.intensity, bloom: recipe.contrast, smoke: recipe.grain * 2, softness };
    case 30:
      return { ...shared, ...paperBackAndColors(palette), size: 0.2 + recipe.intensity * 0.55, count: Math.round(4 + recipe.warp * 12) };
    case 31:
      return { ...shared, ...paperBackAndColors(palette), density: 1 + recipe.drift * 3, gradient: recipe.smoothBlend ? 1 : 0.35, blur: recipe.grain * 2 };
    case 32:
      return { ...shared, ...paperBackAndColors(palette), noiseScale: 0.5 + recipe.warp * 2, thickness: 0.15 + recipe.intensity * 0.35, radius: 0.3 + recipe.contrast * 0.4 };
    case 33:
      return { ...shared, colorBack: palette[0], colorBloom: palette.at(-1) ?? palette[0], colors: palette.slice(1).slice(0, 7), intensity: recipe.intensity, bloom: recipe.contrast, density: 0.3 + recipe.warp * 0.5, spotty: recipe.grain * 2 };
    default:
      return { ...shared, ...paperBackAndColors(palette) };
  }
}

export function formatPaperPropsForExport(recipe: Recipe) {
  return Object.entries(paperProps(recipe, false)).map(([key, value]) => `      ${key}={${JSON.stringify(value)}}`).join("\n");
}

export function queryShaderCanvas(style: number) {
  // Prefer live export previews over the main stage — the stage is frozen while export modals are open.
  const selectors = isPaperStyle(style)
    ? [
        "[data-paper-export] canvas",
        ".mockup-export-preview .paper-shader-canvas canvas",
        ".export-preview .paper-shader-canvas canvas",
        ".canvas-area .paper-shader-canvas canvas",
        ".camera-pad .paper-shader-canvas canvas",
      ]
    : [
        ".mockup-export-preview .shader-canvas",
        ".export-preview .shader-canvas",
        ".canvas-area .shader-canvas",
        ".camera-pad .shader-canvas",
      ];
  for (const selector of selectors) {
    const canvas = document.querySelector<HTMLCanvasElement>(selector);
    if (canvas && canvas.width > 0 && canvas.height > 0) return canvas;
  }
  return null;
}

type PaperShaderMountHandle = {
  setFrame: (frame: number) => void;
  setSpeed: (speed: number) => void;
  canvasElement: HTMLCanvasElement;
};

type PaperShaderHost = HTMLElement & { paperShaderMount?: PaperShaderMountHandle };

export function queryPaperShaderMount(root: ParentNode = document) {
  const local = root.querySelector<PaperShaderHost>("[data-paper-shader]");
  if (local?.paperShaderMount) return local.paperShaderMount;
  if (root !== document) return null;
  return document.querySelector<PaperShaderHost>(".export-preview [data-paper-shader], .canvas-area [data-paper-shader]")?.paperShaderMount ?? null;
}

function paperExportDrawStyle(recipe: Recipe) {
  if (paperUsesNativeSurface(recipe.style)) {
    return { opacity: 1, filter: recipe.blur ? `blur(${recipe.blur}px)` : "none" };
  }
  const contrast = `contrast(${0.65 + recipe.contrast * 0.7})`;
  return {
    opacity: 0.35 + recipe.intensity * 0.65,
    filter: recipe.blur ? `${contrast} blur(${recipe.blur}px)` : contrast,
  };
}

/** Draw a paper-shader canvas into an export target, baking the CSS opacity/contrast/blur used on screen. */
export function drawPaperShaderToCanvas(
  target: HTMLCanvasElement | CanvasRenderingContext2D,
  source: HTMLCanvasElement,
  recipe: Recipe,
  width?: number,
  height?: number,
) {
  const ctx = target instanceof HTMLCanvasElement ? target.getContext("2d") : target;
  if (!ctx) throw new Error("Could not create export canvas");
  const outW = width ?? (target instanceof HTMLCanvasElement ? target.width : ctx.canvas.width);
  const outH = height ?? (target instanceof HTMLCanvasElement ? target.height : ctx.canvas.height);
  const style = paperExportDrawStyle(recipe);
  ctx.save();
  ctx.globalAlpha = style.opacity;
  ctx.filter = style.filter;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(source, 0, 0, outW, outH);
  ctx.restore();
}

function PaperExportCanvas({ recipe, width, height }: { recipe: Recipe; width: number; height: number }) {
  const Component = paperShaders[recipe.style];
  if (!Component) return null;
  const props = paperProps(recipe, true, { x: 0, y: 0, rotation: 0 }, width * height);
  return (
    <div className="paper-shader-host" data-paper-export-host="" style={{ width, height, touchAction: "none" }}>
      <Component
        className="paper-shader-canvas"
        width={width}
        height={height}
        {...props}
        style={{ width, height }}
      />
    </div>
  );
}

export type PaperExportSurface = {
  mount: PaperShaderMountHandle;
  canvas: HTMLCanvasElement;
  dispose: () => void;
};

/** Mount a full-resolution offscreen paper shader for deterministic high-quality export. */
export async function createPaperExportSurface(recipe: Recipe, width: number, height: number): Promise<PaperExportSurface> {
  const host = document.createElement("div");
  host.setAttribute("data-paper-export", "");
  host.style.cssText = `position:fixed;left:-10000px;top:0;width:${width}px;height:${height}px;overflow:hidden;pointer-events:none;opacity:0;z-index:-1;`;
  document.body.appendChild(host);

  let root: Root | null = createRoot(host);
  root.render(<PaperExportCanvas recipe={recipe} width={width} height={height} />);

  const dispose = () => {
    try { root?.unmount(); } catch { /* ignore */ }
    root = null;
    host.remove();
  };

  for (let attempt = 0; attempt < 120; attempt += 1) {
    const mount = queryPaperShaderMount(host);
    const canvas = mount?.canvasElement ?? host.querySelector("canvas");
    if (mount && canvas && canvas.width >= width * 0.95 && canvas.height >= height * 0.95) {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      return { mount, canvas, dispose };
    }
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }

  dispose();
  throw new Error("Could not prepare a full-resolution shader for export");
}

export async function waitForShaderCanvas(style: number, attempts = 90) {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const canvas = queryShaderCanvas(style);
    if (canvas && canvas.width > 0 && canvas.height > 0) {
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      return canvas;
    }
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
  }
  throw new Error("Live shader preview is unavailable");
}

function PaperShaderCanvas({ recipe, frozen, onReady }: { recipe: Recipe; frozen: boolean; onReady?: (canvas: HTMLCanvasElement) => void }) {
  const ref = useRef<(HTMLElement & { canvasElement?: HTMLCanvasElement }) | null>(null);
  const pointer = useRef({ x: 0, y: 0, vx: 0, vy: 0 });
  const [cursorOffset, setCursorOffset] = useState<PaperCursorOffset>({ x: 0, y: 0, rotation: 0 });
  const Component = paperShaders[recipe.style];
  const cursorActive = recipe.cursorEnabled && !frozen;

  useEffect(() => {
    if (!onReady || !ref.current?.canvasElement) return;
    const frame = requestAnimationFrame(() => { if (ref.current?.canvasElement) onReady(ref.current.canvasElement); });
    return () => cancelAnimationFrame(frame);
  }, [onReady, recipe.style]);

  useEffect(() => {
    if (frozen) {
      pointer.current = { x: 0, y: 0, vx: 0, vy: 0 };
      setCursorOffset({ x: 0, y: 0, rotation: 0 });
    }
  }, [frozen]);

  useEffect(() => {
    if (!cursorActive) setCursorOffset({ x: 0, y: 0, rotation: 0 });
  }, [cursorActive]);

  const move = (event: PointerEvent<HTMLDivElement>) => {
    if (!cursorActive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = 0.5 - (event.clientY - rect.top) / rect.height;
    pointer.current.vx = (x - pointer.current.x) * 0.8;
    pointer.current.vy = (y - pointer.current.y) * 0.8;
    pointer.current.x = x;
    pointer.current.y = y;
    const distance = Math.hypot(x, y);
    const influence = Math.max(0, 1 - distance / Math.max(0.15, recipe.cursorRadius)) * recipe.cursorStrength;
    let offsetX = 0;
    let offsetY = 0;
    let rotation = 0;
    switch (recipe.cursorEffect) {
      case "push": offsetX = (x + pointer.current.vx * 0.5) * influence * 0.35; offsetY = (y + pointer.current.vy * 0.5) * influence * 0.35; break;
      case "repel": offsetX = -x * influence * 0.45; offsetY = -y * influence * 0.45; break;
      case "swirl": rotation = influence * 18 * Math.sign(x * y || 1); offsetX = -y * influence * 0.25; offsetY = x * influence * 0.25; break;
      case "ripple": offsetX = x * Math.sin(distance * 24) * influence * 0.2; offsetY = y * Math.cos(distance * 24) * influence * 0.2; break;
      case "spotlight": offsetX = x * influence * 0.15; offsetY = y * influence * 0.15; break;
    }
    setCursorOffset({ x: offsetX, y: offsetY, rotation });
  };

  if (!Component) return null;
  return <div className="paper-shader-host" onPointerMove={move} onPointerLeave={() => { if (!cursorActive) return; pointer.current = { x: 0, y: 0, vx: 0, vy: 0 }; setCursorOffset({ x: 0, y: 0, rotation: 0 }); }} style={{ width: "100%", height: "100%", touchAction: "none" }}>
    <Component ref={ref} className="paper-shader-canvas" width="100%" height="100%" {...paperProps(recipe, frozen, cursorActive ? cursorOffset : { x: 0, y: 0, rotation: 0 })} style={paperCanvasStyle(recipe)} />
  </div>;
}

function NativeShaderCanvas({ recipe, frozen, onError }: { recipe: Recipe; frozen: boolean; onError: (message: string | null) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: .5, y: .5, vx: 0, vy: 0 });
  const frame = useRef<number>(0);
  const start = useRef(0);
  const programRef = useRef<WebGLProgram | null>(null);
  const [programVersion, setProgramVersion] = useState(0);
  const frozenTime = useRef(0);
  const onErrorRef = useRef(onError);
  const cursorActive = recipe.cursorEnabled && !frozen;

  useEffect(() => { onErrorRef.current = onError; }, [onError]);

  useEffect(() => {
    if (!frozen) return;
    pointer.current = { x: .5, y: .5, vx: 0, vy: 0 };
  }, [frozen]);

  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!gl) { onErrorRef.current("WebGL is unavailable in this browser."); return; }
    const compile = (type: number, source: string) => { const shader = gl.createShader(type)!; gl.shaderSource(shader, source); gl.compileShader(shader); if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed"); return shader; };
    try {
      const vertex = compile(gl.VERTEX_SHADER, "attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}");
      const fragment = compile(gl.FRAGMENT_SHADER, recipe.glsl);
      const program = gl.createProgram()!; gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "Shader link failed");
        programRef.current = program; setProgramVersion((version) => version + 1); onErrorRef.current(null);
    } catch (error) { onErrorRef.current(error instanceof Error ? error.message.replace(/ERROR: \d+:(\d+):/, "Line $1:") : "Shader compile failed"); }
  }, [recipe.glsl]);

  useEffect(() => {
    const canvas = ref.current; const gl = canvas?.getContext("webgl"); if (!canvas || !gl) return;
    const position = gl.createBuffer()!; gl.bindBuffer(gl.ARRAY_BUFFER, position); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const program = programRef.current;
    if (!program) return;
    const attribute = gl.getAttribLocation(program, "position");
    const uniforms = Object.fromEntries(["u_resolution", "u_time", "u_pointer", "u_velocity", "u_colors", "u_style", "u_intensity", "u_zoom", "u_warp", "u_contrast", "u_speed", "u_drift", "u_animate", "u_reverse", "u_rotate", "u_seed", "u_smooth_blend", "u_grain", "u_offset", "u_cursor_on", "u_cursor_effect", "u_cursor_strength", "u_cursor_radius"].map((name) => [name, gl.getUniformLocation(program, name)])) as Record<string, WebGLUniformLocation | null>;
    const shouldAnimate = !frozen && (recipe.animate || cursorActive);
    const render = (timestamp: number) => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * pixelRatio)); const height = Math.max(1, Math.round(canvas.clientHeight * pixelRatio));
      if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
      gl.viewport(0, 0, width, height); gl.useProgram(program);
      const set1 = (name: string, value: number) => gl.uniform1f(uniforms[name], value);
      gl.enableVertexAttribArray(attribute); gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);
      if (!start.current) start.current = timestamp;
      if (!frozen) frozenTime.current = (timestamp - start.current) / 1000;
      gl.uniform2f(uniforms.u_resolution, width, height); set1("u_time", frozenTime.current);
      gl.uniform2f(uniforms.u_pointer, pointer.current.x, pointer.current.y); gl.uniform2f(uniforms.u_velocity, pointer.current.vx, pointer.current.vy);
      const colors = [...recipe.palette]; while (colors.length < 8) colors.push(colors.at(-1) || "#000000"); gl.uniform3fv(uniforms.u_colors, colors.slice(0, 8).map(hexToRgb).flat());
      set1("u_style", recipe.style); set1("u_intensity", recipe.intensity); set1("u_zoom", recipe.zoom); set1("u_warp", recipe.warp); set1("u_contrast", recipe.contrast); set1("u_speed", recipe.speed); set1("u_drift", recipe.drift); set1("u_animate", recipe.animate ? 1 : 0); set1("u_reverse", recipe.reverse ? 1 : 0); set1("u_rotate", recipe.rotate); set1("u_seed", recipe.seed); set1("u_smooth_blend", recipe.smoothBlend ? 1 : 0); set1("u_grain", recipe.grain); gl.uniform2f(uniforms.u_offset, recipe.offsetX, recipe.offsetY);
      set1("u_cursor_on", cursorActive ? 1 : 0); set1("u_cursor_effect", ["push", "repel", "swirl", "ripple", "spotlight"].indexOf(recipe.cursorEffect)); set1("u_cursor_strength", recipe.cursorStrength); set1("u_cursor_radius", recipe.cursorRadius);
      gl.drawArrays(gl.TRIANGLES, 0, 3); if (cursorActive) { pointer.current.vx *= .92; pointer.current.vy *= .92; }
      if (shouldAnimate) frame.current = requestAnimationFrame(render);
    };
    frame.current = requestAnimationFrame(render); return () => cancelAnimationFrame(frame.current);
  }, [recipe, frozen, cursorActive, programVersion]);

  const move = (event: PointerEvent<HTMLCanvasElement>) => {
    if (!cursorActive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - .5;
    const y = .5 - (event.clientY - rect.top) / rect.height;
    pointer.current.vx = (x - pointer.current.x) * .8;
    pointer.current.vy = (y - pointer.current.y) * .8;
    pointer.current.x = x;
    pointer.current.y = y;
  };
  return <canvas ref={ref} onPointerMove={move} onPointerLeave={() => { if (!cursorActive) return; pointer.current.vx = pointer.current.vy = 0; }} className="shader-canvas" style={{ filter: recipe.blur ? `blur(${recipe.blur}px)` : undefined, transform: recipe.blur ? "scale(1.025)" : undefined }} aria-label="Live interactive shader preview" />;
}

export function ShaderCanvas({ recipe, frozen, onError }: { recipe: Recipe; frozen: boolean; onError: (message: string | null) => void }) {
  if (recipe.kind === "media") return <MediaCanvas recipe={recipe} frozen={frozen} />;
  if (isPaperStyle(recipe.style)) return <PaperShaderCanvas recipe={recipe} frozen={frozen} />;
  return <NativeShaderCanvas recipe={recipe} frozen={frozen} onError={onError} />;
}

export function ShaderThumbnail({ style }: { style: number }) {
  return <img className="shader-thumbnail" src={`/style-previews/${style}.png`} alt="" aria-hidden="true" />;
}

export function MediaThumbnail({ filter }: { filter: MediaFilterId }) {
  return <img className="shader-thumbnail media-thumbnail" src={`/media-previews/${filter}.png`} alt="" aria-hidden="true" />;
}

function buildMediaPreviewRecipe(filter: MediaFilterId): Recipe {
  const vfx = isVfxMediaFilter(filter);
  return {
    ...defaultRecipe,
    id: `media-preview-${filter}`,
    name: mediaFilterNames[filter] ?? "Media",
    kind: "media",
    mediaFilter: filter,
    mediaSource: { type: "sample", sampleId: mediaPreviewSampleId(filter) },
    animate: vfx,
    cursorEnabled: false,
    glsl: fragmentShader,
  };
}

async function paintPixelatePreview(recipe: Recipe, target: HTMLCanvasElement) {
  const dataUrl = await resolveMediaImageForExport(recipe);
  const image = await new Promise<HTMLImageElement>((resolve, reject) => {
    const element = new Image();
    element.onload = () => resolve(element);
    element.onerror = () => reject(new Error("Could not load media preview"));
    element.src = dataUrl;
  });
  const width = 640;
  const height = 400;
  const block = Math.max(4, Math.round(4 + recipe.intensity * 28 + recipe.warp * 16));
  const smallWidth = Math.max(2, Math.ceil(width / block));
  const smallHeight = Math.max(2, Math.ceil(height / block));
  const scratch = document.createElement("canvas");
  scratch.width = smallWidth;
  scratch.height = smallHeight;
  const scratchCtx = scratch.getContext("2d");
  const targetCtx = target.getContext("2d");
  if (!scratchCtx || !targetCtx) return false;
  const scale = Math.max(smallWidth / image.width, smallHeight / image.height);
  const drawWidth = image.width * scale;
  const drawHeight = image.height * scale;
  scratchCtx.drawImage(image, (smallWidth - drawWidth) / 2, (smallHeight - drawHeight) / 2, drawWidth, drawHeight);
  target.width = width;
  target.height = height;
  targetCtx.imageSmoothingEnabled = false;
  targetCtx.drawImage(scratch, 0, 0, smallWidth, smallHeight, 0, 0, width, height);
  return true;
}

// A clean, fixed-size renderer used by `npm run previews`.  It deliberately
// uses the same shader components and canonical style settings as the studio,
// so the checked-in PNG is a real representation rather than a CSS substitute.
export function StaticStylePreview({ style }: { style: number }) {
  const recipe = useMemo(() => ({
    ...defaultRecipe,
    ...presetSettings[style],
    id: `static-preview-${style}`,
    name: styleNames[style] ?? "Shader",
    style,
    glsl: fragmentShader,
    animate: false,
    cursorEnabled: false,
  }), [style]);
  return <main id="style-preview" style={{ width: 640, height: 400, overflow: "hidden", background: recipe.palette[0] }}>
    {isPaperStyle(style)
      ? <PaperShaderCanvas recipe={recipe} frozen />
      : <NativeShaderCanvas recipe={recipe} frozen={false} onError={() => undefined} />}
  </main>;
}

function PixelateStaticPreview({ recipe }: { recipe: Recipe }) {
  const [ready, setReady] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    let cancelled = false;
    const render = async () => {
      const canvas = document.createElement("canvas");
      const painted = await paintPixelatePreview(recipe, canvas);
      if (!painted || cancelled) return;
      const url = canvas.toDataURL("image/png");
      const image = imageRef.current;
      if (!image) return;
      const markReady = () => {
        if (!cancelled) setReady(true);
      };
      image.onload = markReady;
      image.onerror = () => { if (!cancelled) setReady(true); };
      image.src = url;
      if (image.complete) markReady();
    };
    void render();
    return () => { cancelled = true; };
  }, [recipe]);

  return (
    <main id="media-preview" data-preview-ready={ready ? "" : undefined} style={{ width: 640, height: 400, overflow: "hidden", background: "#050609" }}>
      <img ref={imageRef} alt="" width={640} height={400} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }} />
    </main>
  );
}

// Fixed-size renderer for `npm run media-previews`. Reuses the same export path as
// downloads so Paper and VFX filters both produce a trustworthy still frame.
export function StaticMediaPreview({ filter }: { filter: MediaFilterId }) {
  const recipe = useMemo(() => buildMediaPreviewRecipe(filter), [filter]);
  if (filter === "vfx-pixelate") return <PixelateStaticPreview recipe={recipe} />;
  const captureRef = useRef<HTMLCanvasElement>(null);
  const live = isVfxMediaFilter(filter);

  useEffect(() => {
    let cancelled = false;
    captureRef.current?.removeAttribute("data-preview-ready");

    const paintTarget = (source: CanvasImageSource) => {
      const target = captureRef.current;
      if (!target || cancelled) return false;
      target.width = 640;
      target.height = 400;
      const ctx = target.getContext("2d");
      if (!ctx) return false;
      ctx.drawImage(source, 0, 0, 640, 400);
      target.setAttribute("data-preview-ready", "");
      return true;
    };

    const settle = async (frames: number) => {
      for (let attempt = 0; attempt < frames && !cancelled; attempt += 1) {
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      }
    };

    const capture = async () => {
      try {
        if (isPaperMediaFilter(filter)) {
          await waitForMediaCanvas(180);
          await settle(45);
          const source = queryMediaCanvas();
          if (source && source.width > 0 && paintTarget(source)) return;
          throw new Error("Paper preview canvas was not ready");
        }

        const delay = 1800;
        await new Promise<void>((resolve) => setTimeout(resolve, delay));
        try {
          const exported = await exportMediaPng(recipe, 640, 400);
          if (paintTarget(exported)) return;
        } catch {
          // Fall back to the live VFX canvas if export timing is tight.
        }
        await waitForMediaCanvas(180);
        await settle(90);
        const source = queryMediaCanvas();
        if (source && source.width > 0 && paintTarget(source)) return;
        throw new Error("VFX preview canvas was not ready");
      } catch (error) {
        console.error(`Media preview export failed for ${filter}`, error);
      }
    };
    void capture();
    return () => { cancelled = true; };
  }, [recipe, filter]);

  return (
    <main id="media-preview" style={{ width: 640, height: 400, overflow: "hidden", background: "#050609", position: "relative" }}>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          opacity: live ? 1 : 0,
          pointerEvents: "none",
        }}
      >
        <MediaCanvas recipe={recipe} frozen={!live} />
      </div>
      <canvas
        ref={captureRef}
        className="media-preview-canvas"
        style={{ position: "relative", zIndex: 1, display: "block", width: "100%", height: "100%", background: "#050609" }}
      />
    </main>
  );
}

export { resolveMediaPreviewFilter };

export function SavedRecipePreview({ recipe }: { recipe: Recipe }) {
  // Saved cards use the exact persisted recipe rather than approximating it
  // with a CSS gradient, including custom GLSL and every shader setting.
  return <ShaderCanvas recipe={recipe} frozen onError={() => undefined} />;
}
