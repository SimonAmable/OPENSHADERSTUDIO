import { RefreshCcw, WandSparkles } from "lucide-react";
import { defaultRecipe, presetGroups, ShaderThumbnail, styleNames } from "./canvas";
import type { Recipe, ThreeEnvironmentId } from "./types";
import { getThreeMaterial, isRoomEnvironment, threeEnvironments } from "./three-catalog";
import { getThreeSurfaceProfile, threeSurfaceResetFields, type SurfaceSliderDef } from "./three-surface-controls";
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

export function ThreeSurfacePanel({ recipe, onChange }: { recipe: Recipe; onChange: (update: Partial<Recipe>) => void }) {
  const material = getThreeMaterial(recipe.threeMaterial);
  const profile = getThreeSurfaceProfile(recipe.threeMaterial);
  const isOpen = recipe.threeEnvironment === "open";

  return (
    <div className="panel-content">
      <p className="helper">{profile.helper}</p>
      <div className="media-surface-filter-tag">{material.label}</div>

      <section className="control-section">
        <h3>Environment</h3>
        <div className="scene-env-grid" role="listbox" aria-label="Environment">
          {threeEnvironments.map((env) => {
            const selected = recipe.threeEnvironment === env.id;
            return (
              <button
                key={env.id}
                type="button"
                role="option"
                aria-selected={selected}
                className={`scene-env-card ${selected ? "selected" : ""}`}
                onClick={() => onChange({
                  threeEnvironment: env.id as ThreeEnvironmentId,
                  ...(env.id === "open" ? { threePedestal: false } : {}),
                })}
              >
                <span className="scene-env-swatch" style={{ background: env.swatch }} />
                <span>{env.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {isOpen && (
        <section className="control-section">
          <h3>Background</h3>
          <p className="helper">Solid uses the BASE palette colour. Shader runs an animated backdrop behind the object.</p>
          <div className="scene-toggle-group" role="group" aria-label="Open scene background">
            <button
              type="button"
              className={recipe.threeOpenBackground === "solid" ? "selected" : ""}
              onClick={() => onChange({ threeOpenBackground: "solid" })}
            >
              Solid colour
            </button>
            <button
              type="button"
              className={recipe.threeOpenBackground === "shader" ? "selected" : ""}
              onClick={() => onChange({ threeOpenBackground: "shader" })}
            >
              Shader
            </button>
          </div>
          {recipe.threeOpenBackground === "shader" && (
            <>
              <p className="helper">Palette and Motion controls tune the background shader.</p>
              {presetGroups.map((group) => (
                <div key={group.title} className="preset-group">
                  <h4 className="scene-bg-group-title">{group.title}</h4>
                  <div className="preset-grid scene-bg-grid">
                    {group.items.map(([name, style]) => (
                      <button
                        key={name}
                        type="button"
                        className={`preset-card ${recipe.style === style ? "selected" : ""}`}
                        onClick={() => onChange({ style, threeOpenBackground: "shader" })}
                      >
                        <ShaderThumbnail style={style} />
                        <span>{name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <p className="helper">Active: {styleNames[recipe.style] ?? `Style ${recipe.style}`}</p>
            </>
          )}
        </section>
      )}

      {isRoomEnvironment(recipe.threeEnvironment) && (
        <section className="control-section">
          <h3>Pedestal</h3>
          <div className="scene-toggle-group" role="group" aria-label="Pedestal">
            <button
              type="button"
              className={recipe.threePedestal ? "selected" : ""}
              onClick={() => onChange({ threePedestal: true })}
            >
              Pedestal
            </button>
            <button
              type="button"
              className={!recipe.threePedestal ? "selected" : ""}
              onClick={() => onChange({ threePedestal: false })}
            >
              None
            </button>
          </div>
        </section>
      )}

      {profile.effect.map((def) => (
        <SurfaceSlider key={def.field} def={def} recipe={recipe} onChange={onChange} />
      ))}

      <section className="control-section">
        <h3>Light</h3>
        <p className="helper">Drag the on-canvas light handle, or tune azimuth and height here.</p>
        {profile.light.map((def) => (
          <SurfaceSlider key={def.field} def={def} recipe={recipe} onChange={onChange} />
        ))}
      </section>

      {profile.frame && profile.frame.length > 0 && (
        <section className="control-section">
          <h3>Object</h3>
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
          <button className="button ghost" type="button" onClick={() => onChange(threeSurfaceResetFields(recipe.threeMaterial, defaultRecipe))}>
            <RefreshCcw /> Reset
          </button>
        </div>
      </section>
    </div>
  );
}
