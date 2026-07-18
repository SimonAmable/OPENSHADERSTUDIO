import { RefreshCcw, WandSparkles } from "lucide-react";
import { defaultRecipe } from "./canvas";
import type { Recipe } from "./types";
import { getMediaFilter } from "./media-catalog";
import { getMediaSurfaceProfile, mediaSurfaceResetFields, type SurfaceSliderDef } from "./media-surface-controls";
import { Slider } from "./slider";

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

export function MediaSurfacePanel({ recipe, onChange }: { recipe: Recipe; onChange: (update: Partial<Recipe>) => void }) {
  const filter = getMediaFilter(recipe.mediaFilter);
  const profile = getMediaSurfaceProfile(recipe.mediaFilter);

  return (
    <div className="panel-content">
      <p className="helper">{profile.helper}</p>
      <div className="media-surface-filter-tag">{filter.label}</div>

      {profile.effect.map((def) => (
        <SurfaceSlider key={def.field} def={def} recipe={recipe} onChange={onChange} />
      ))}

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
        <h3>Character</h3>
        <div className="button-pair">
          {profile.showReseed && (
            <button className="button ghost" type="button" onClick={() => onChange({ seed: Math.floor(Math.random() * 100000) })}>
              <WandSparkles /> Reseed
            </button>
          )}
          <button className="button ghost" type="button" onClick={() => onChange(mediaSurfaceResetFields(recipe.mediaFilter, defaultRecipe))}>
            <RefreshCcw /> Reset
          </button>
        </div>
      </section>
    </div>
  );
}
