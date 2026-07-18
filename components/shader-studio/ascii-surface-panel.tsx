import { RefreshCcw } from "lucide-react";
import { defaultRecipe } from "./canvas";
import { asciiBlendModeLabels, asciiCharsetLabels, asciiSurfaceResetFields, getAsciiSurfaceProfile } from "./ascii-surface-controls";
import { asciiBlendModes, asciiCharsetOptions, asciiStyleNames } from "./ascii-catalog";
import type { AsciiBlendMode, AsciiCharsetId, Recipe } from "./types";
import { Slider } from "./slider";
import type { SurfaceSliderDef } from "./media-surface-controls";

function SurfaceSlider({ def, recipe, onChange }: { def: SurfaceSliderDef; recipe: Recipe; onChange: (update: Partial<Recipe>) => void }) {
  const value = recipe[def.field];
  return (
    <Slider
      label={def.label}
      value={value}
      min={def.min}
      max={def.max}
      step={def.step}
      unit={def.unit}
      onChange={(next) => onChange({ [def.field]: next })}
    />
  );
}

export function AsciiSurfacePanel({ recipe, onChange }: { recipe: Recipe; onChange: (update: Partial<Recipe>) => void }) {
  const profile = getAsciiSurfaceProfile(recipe.asciiStyle);

  return (
    <div className="panel-content">
      <p className="helper">{profile.helper}</p>
      <div className="media-surface-filter-tag">{asciiStyleNames[recipe.asciiStyle]}</div>

      {profile.effect.map((def) => (
        <SurfaceSlider key={def.field} def={def} recipe={recipe} onChange={onChange} />
      ))}

      <label className="slider-row">
        <span className="slider-label">Blend mode</span>
        <select
          className="ascii-select"
          value={recipe.asciiBlendMode}
          onChange={(event) => onChange({ asciiBlendMode: event.target.value as AsciiBlendMode })}
        >
          {asciiBlendModes.map((mode) => (
            <option key={mode} value={mode}>{asciiBlendModeLabels[mode]}</option>
          ))}
        </select>
      </label>

      <label className="slider-row">
        <span className="slider-label">Character set</span>
        <select
          className="ascii-select"
          value={recipe.asciiCharset}
          onChange={(event) => onChange({ asciiCharset: event.target.value as AsciiCharsetId })}
        >
          {asciiCharsetOptions.map((option) => (
            <option key={option.id} value={option.id}>{asciiCharsetLabels[option.id]}</option>
          ))}
        </select>
      </label>

      {profile.toggles?.map((toggle) => (
        <div key={toggle.field} className="switch-row">
          <span>{toggle.label}</span>
          <button
            type="button"
            className={`switch ${recipe[toggle.field] ? "on" : ""}`}
            onClick={() => onChange({ [toggle.field]: !recipe[toggle.field] })}
            aria-pressed={recipe[toggle.field]}
          >
            <i />
          </button>
        </div>
      ))}

      {profile.frame && profile.frame.length > 0 && (
        <section className="control-section">
          <h3>Frame</h3>
          {profile.frame.map((def) => (
            <SurfaceSlider key={def.field} def={def} recipe={recipe} onChange={onChange} />
          ))}
        </section>
      )}

      {profile.post && profile.post.length > 0 && (
        <section className="control-section">
          <h3>Post</h3>
          {profile.post.map((def) => (
            <SurfaceSlider key={def.field} def={def} recipe={recipe} onChange={onChange} />
          ))}
        </section>
      )}

      <section className="control-section">
        <h3>Reset</h3>
        <button
          type="button"
          className="button wide ghost"
          onClick={() => onChange(asciiSurfaceResetFields(recipe.asciiStyle, defaultRecipe))}
        >
          <RefreshCcw /> Reset surface
        </button>
      </section>
    </div>
  );
}
