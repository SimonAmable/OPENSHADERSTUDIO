"use client";

import { ChevronDown, ChevronUp, ImageDown, Layers3, Plus, Trash2 } from "lucide-react";
import { useRef } from "react";
import type { Recipe, ThreeMaterialId, ThreeObjectId } from "./types";
import { threeMaterialNames, threeObjectGroups, threeObjectNames } from "./three-catalog";
import {
  addSceneObject,
  getActiveSceneObject,
  removeSceneObject,
  reorderSceneObject,
  resolveThreeObjects,
  syncPrimaryThreeFields,
  updateSceneObject,
} from "./three-scene-objects";
import { SceneObjectThumbnail, SceneThumbnail } from "./canvas";
import { Slider } from "./slider";

export function ThreeObjectPanel({
  recipe,
  onChange,
  onUploadModel,
  onSelectObjectShape,
}: {
  recipe: Recipe;
  onChange: (update: Partial<Recipe>) => void;
  onUploadModel: (file: File) => void;
  onSelectObjectShape: (id: ThreeObjectId) => void;
}) {
  const modelInputRef = useRef<HTMLInputElement>(null);
  const objects = resolveThreeObjects(recipe);
  const active = getActiveSceneObject(recipe);
  const activeId = active.id;

  const selectObject = (objectId: string) => {
    onChange(syncPrimaryThreeFields(objects, objectId));
  };

  return (
    <div className="panel-content">
      <p className="helper">Build a composition with up to six objects. Select a layer to edit its shape, material, and transform.</p>

      <input
        ref={modelInputRef}
        className="visually-hidden"
        type="file"
        accept=".glb,.gltf,model/gltf-binary,model/gltf+json"
        onChange={(event) => {
          const file = event.target.files?.[0];
          if (file) onUploadModel(file);
          event.target.value = "";
        }}
      />
      <div className="media-source-row">
        <button type="button" className="media-source-preview scene-upload-preview" onClick={() => modelInputRef.current?.click()}>
          {active.modelUpload ? <span><Layers3 /><small>GLB</small></span> : <span><ImageDown /><small>Upload</small></span>}
        </button>
        <button type="button" className="button wide ghost" onClick={() => modelInputRef.current?.click()}>
          {active.modelUpload ? "Replace model" : "Upload GLB"}
        </button>
      </div>
      {active.modelUpload && (
        <button
          type="button"
          className="button wide ghost"
          onClick={() => onChange(clearObjectModelUpload(recipe))}
        >
          Use preset object
        </button>
      )}

      <section className="control-section">
        <div className="scene-object-list-header">
          <h3>Objects ({objects.length})</h3>
          <button
            type="button"
            className="button ghost compact"
            disabled={objects.length >= 6}
            onClick={() => onChange(addSceneObject(recipe))}
          >
            <Plus size={14} /> Add
          </button>
        </div>
        <div className="scene-object-list" role="list">
          {objects.map((item, index) => {
            const selected = item.id === activeId;
            const label = item.modelUpload
              ? "Uploaded GLB"
              : `${threeObjectNames[item.object]} · ${threeMaterialNames[item.material]}`;
            return (
              <div key={item.id} className={`scene-object-row ${selected ? "selected" : ""}`} role="listitem">
                <button type="button" className="scene-object-select" onClick={() => selectObject(item.id)}>
                  <span className="scene-object-chip">
                    {item.modelUpload ? <span className="scene-object-upload-badge">GLB</span> : <SceneObjectThumbnail object={item.object} />}
                  </span>
                  <span className="scene-object-label">{label}</span>
                </button>
                <div className="scene-object-actions">
                  <button
                    type="button"
                    className="icon-button ghost"
                    aria-label="Move up"
                    disabled={index === 0}
                    onClick={() => onChange(reorderSceneObject(recipe, item.id, -1))}
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    type="button"
                    className="icon-button ghost"
                    aria-label="Move down"
                    disabled={index === objects.length - 1}
                    onClick={() => onChange(reorderSceneObject(recipe, item.id, 1))}
                  >
                    <ChevronDown size={14} />
                  </button>
                  <button
                    type="button"
                    className="icon-button ghost"
                    aria-label="Remove object"
                    disabled={objects.length <= 1}
                    onClick={() => onChange(removeSceneObject(recipe, item.id))}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="control-section">
        <h3>Selected object</h3>
        <div className="media-surface-filter-tag">
          {active.modelUpload ? "Upload" : `${threeObjectNames[active.object]} · ${threeMaterialNames[active.material]}`}
        </div>
        <Slider
          label="Object scale"
          value={active.scale}
          min={0.25}
          max={2.5}
          step={0.01}
          unit="×"
          onChange={(scale) => onChange(updateSceneObject(recipe, activeId, { scale }))}
        />
        <Slider
          label="Position X"
          value={active.position[0]}
          min={-2.5}
          max={2.5}
          step={0.01}
          onChange={(x) => onChange(updateSceneObject(recipe, activeId, {
            position: [x, active.position[1], active.position[2]],
          }))}
        />
        <Slider
          label="Position Z"
          value={active.position[2]}
          min={-2.5}
          max={2.5}
          step={0.01}
          onChange={(z) => onChange(updateSceneObject(recipe, activeId, {
            position: [active.position[0], active.position[1], z],
          }))}
        />
        <Slider
          label="Rotation Y"
          value={active.rotation[1]}
          min={-3.14}
          max={3.14}
          step={0.01}
          unit=" rad"
          onChange={(rotationY) => onChange(updateSceneObject(recipe, activeId, {
            rotation: [active.rotation[0], rotationY, active.rotation[2]],
          }))}
        />
      </section>

      <section className="control-section">
        <h3>Shape presets</h3>
        {threeObjectGroups.map((group) => (
          <div key={group.title} className="preset-group">
            <h4 className="scene-bg-group-title">{group.title}</h4>
            <div className="preset-grid scene-bg-grid">
              {group.items.map((object) => {
                const selected = !active.modelUpload && active.object === object.id;
                return (
                  <button
                    key={object.id}
                    type="button"
                    className={`preset-card ${selected ? "selected" : ""}`}
                    onClick={() => onSelectObjectShape(object.id)}
                  >
                    <SceneObjectThumbnail object={object.id} />
                    <span>{object.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      <section className="control-section">
        <h3>Material preview</h3>
        <div className="scene-active-material-preview">
          <SceneThumbnail material={active.material} />
          <span>{threeMaterialNames[active.material]}</span>
        </div>
      </section>
    </div>
  );
}

export function applyObjectShape(recipe: Recipe, objectId: ThreeObjectId): Partial<Recipe> {
  const active = getActiveSceneObject(recipe);
  return updateSceneObject(recipe, active.id, { object: objectId, modelUpload: null });
}

export function applyObjectMaterial(recipe: Recipe, materialId: ThreeMaterialId): Partial<Recipe> {
  const active = getActiveSceneObject(recipe);
  return updateSceneObject(recipe, active.id, { material: materialId });
}

export function applyObjectModelUpload(recipe: Recipe, dataUrl: string): Partial<Recipe> {
  const active = getActiveSceneObject(recipe);
  return updateSceneObject(recipe, active.id, { modelUpload: dataUrl });
}

export function clearObjectModelUpload(recipe: Recipe): Partial<Recipe> {
  const active = getActiveSceneObject(recipe);
  return updateSceneObject(recipe, active.id, { modelUpload: null });
}
