import type { ReactNode } from "react";

export function Slider({ label, value, min = 0, max = 1, step = .01, unit = "%", onChange, trailing }: { label: string; value: number; min?: number; max?: number; step?: number; unit?: string; onChange: (value: number) => void; trailing?: ReactNode }) {
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
