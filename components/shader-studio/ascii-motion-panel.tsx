import { RefreshCcw } from "lucide-react";
import { asciiAnimationStyleLabels, asciiAnimationStyles } from "./ascii-catalog";
import { defaultRecipe } from "./canvas";
import type { AsciiAnimationStyle, Recipe } from "./types";
import { Slider } from "./slider";

export function AsciiMotionPanel({ recipe, onChange }: { recipe: Recipe; onChange: (update: Partial<Recipe>) => void }) {
  return (
    <div className="panel-content">
      <div className="switch-row">
        <span>Animated</span>
        <button
          type="button"
          className={`switch ${recipe.animate ? "on" : ""}`}
          onClick={() => onChange({ animate: !recipe.animate })}
          aria-pressed={recipe.animate}
        >
          <i />
        </button>
      </div>

      <Slider
        label="Playback speed"
        value={recipe.speed}
        min={0}
        max={3}
        unit="×"
        onChange={(speed) => onChange({ speed })}
      />

      <label className="slider-row">
        <span className="slider-label">Animation style</span>
        <select
          className="ascii-select"
          value={recipe.asciiAnimationStyle}
          onChange={(event) => onChange({ asciiAnimationStyle: event.target.value as AsciiAnimationStyle })}
        >
          {asciiAnimationStyles.map((style) => (
            <option key={style} value={style}>{asciiAnimationStyleLabels[style]}</option>
          ))}
        </select>
      </label>

      <Slider
        label="Motion strength"
        value={recipe.warp}
        min={0}
        max={1}
        onChange={(warp) => onChange({ warp })}
      />

      <div className="switch-row">
        <span>Reverse</span>
        <button
          type="button"
          className={`switch ${recipe.reverse ? "on" : ""}`}
          onClick={() => onChange({ reverse: !recipe.reverse })}
          aria-pressed={recipe.reverse}
        >
          <i />
        </button>
      </div>

      <p className="helper">
        Live: Mixed animates the image. Speed scales everything, including time-based effects
        (Scan lines, Film grain, Glitch, Film dust) when they&apos;re on. Matrix styles default to Matrix rain.
      </p>

      <button
        type="button"
        className="button wide ghost"
        onClick={() => onChange({
          animate: defaultRecipe.animate,
          speed: defaultRecipe.speed,
          warp: defaultRecipe.warp,
          reverse: defaultRecipe.reverse,
          asciiAnimationStyle: defaultRecipe.asciiAnimationStyle,
        })}
      >
        <RefreshCcw /> Reset motion
      </button>
    </div>
  );
}

export function asciiMotionSummary(recipe: Recipe) {
  if (!recipe.animate) return "Static";
  return `${asciiAnimationStyleLabels[recipe.asciiAnimationStyle]} · ${Math.round(recipe.speed / 3 * 100)}%`;
}
