"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";
import { CopyPlus, Trash2, Type } from "lucide-react";
import { Slider } from "./slider";
import type { TypeAlign, TypeBlock, TypeFont, TypeMode } from "./types";

export const MAX_TYPE_BLOCKS = 3;

export const typeFontStacks: Record<TypeFont, string> = {
  display: `"Syne", "Inter", sans-serif`,
  sans: `"Inter", system-ui, sans-serif`,
  mono: `"DM Mono", ui-monospace, monospace`,
};

export const typeModeLabels: Record<TypeMode, string> = {
  solid: "Solid",
  invert: "Invert",
  knockout: "Knockout",
};

type TypePreset = {
  id: string;
  label: string;
  detail: string;
  partial: Omit<TypeBlock, "id">;
};

export const typePresets: TypePreset[] = [
  {
    id: "hero-invert",
    label: "Hero invert",
    detail: "Tracks the shader",
    partial: {
      text: "Inevitable",
      mode: "invert",
      font: "display",
      align: "center",
      x: 50,
      y: 42,
      width: 78,
      fontSize: 64,
      letterSpacing: -0.06,
      lineHeight: 0.92,
      color: "#ffffff",
      plate: "black",
    },
  },
  {
    id: "knockout",
    label: "Knockout",
    detail: "Cut through a plate",
    partial: {
      text: "NEXT",
      mode: "knockout",
      font: "display",
      align: "center",
      x: 50,
      y: 50,
      width: 72,
      fontSize: 88,
      letterSpacing: -0.08,
      lineHeight: 0.88,
      color: "#ffffff",
      plate: "black",
    },
  },
  {
    id: "caption",
    label: "Caption",
    detail: "Readable solid type",
    partial: {
      text: "Make the work feel inevitable.",
      mode: "solid",
      font: "sans",
      align: "center",
      x: 50,
      y: 68,
      width: 54,
      fontSize: 18,
      letterSpacing: -0.02,
      lineHeight: 1.35,
      color: "#f4f6fb",
      plate: "black",
    },
  },
  {
    id: "eyebrow",
    label: "Eyebrow",
    detail: "Mono label",
    partial: {
      text: "THE NEXT RELEASE",
      mode: "solid",
      font: "mono",
      align: "center",
      x: 50,
      y: 28,
      width: 60,
      fontSize: 12,
      letterSpacing: 0.14,
      lineHeight: 1.2,
      color: "#d7dcf0",
      plate: "black",
    },
  },
];

export function createTypeBlock(partial: Omit<TypeBlock, "id"> = typePresets[0].partial): TypeBlock {
  return { ...partial, id: crypto.randomUUID() };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function TypePanel({
  blocks,
  selectedId,
  onSelect,
  onAdd,
  onPreset,
  onUpdate,
  onDuplicate,
  onRemove,
}: {
  blocks: TypeBlock[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onAdd: () => void;
  onPreset: (presetId: string) => void;
  onUpdate: (id: string, update: Partial<TypeBlock>) => void;
  onDuplicate: (id: string) => void;
  onRemove: (id: string) => void;
}) {
  const selected = blocks.find((block) => block.id === selectedId) ?? null;
  const canAdd = blocks.length < MAX_TYPE_BLOCKS;

  return (
    <div className="panel-content type-panel">
      <h2>Type</h2>
      <p className="helper">Drop headlines on the live shader. Invert and knockout react to the field.</p>

      {!blocks.length ? (
        <div className="type-empty">
          <div className="type-empty-icon"><Type strokeWidth={1.8} /></div>
          <h3>Put a headline on the field</h3>
          <p>Start with a preset — invert is the one that makes a recipe feel like a hero.</p>
        </div>
      ) : (
        <div className="type-block-list" role="list">
          {blocks.map((block, index) => (
            <button
              key={block.id}
              type="button"
              role="listitem"
              className={`type-block-chip ${selectedId === block.id ? "selected" : ""}`}
              onClick={() => onSelect(block.id)}
            >
              <span className={`type-mode-dot mode-${block.mode}`} aria-hidden="true" />
              <span>
                <b>{block.text.trim() || "Empty text"}</b>
                <em>{typeModeLabels[block.mode]} · {index + 1}</em>
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="section-label">Presets</div>
      <div className="type-preset-grid">
        {typePresets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            className={`type-preset-card mode-${preset.partial.mode}`}
            disabled={!canAdd && !selected}
            onClick={() => onPreset(preset.id)}
            title={!canAdd && !selected ? `Limit ${MAX_TYPE_BLOCKS} text blocks` : undefined}
          >
            <span className="type-preset-sample" style={{ fontFamily: typeFontStacks[preset.partial.font] }} aria-hidden="true">
              {preset.partial.mode === "knockout" ? "Aa" : preset.partial.text.slice(0, 4)}
            </span>
            <span>
              <b>{preset.label}</b>
              <em>{preset.detail}</em>
            </span>
          </button>
        ))}
      </div>

      <button type="button" className="button wide ghost type-add" onClick={onAdd} disabled={!canAdd}>
        <Type /> {canAdd ? "Add headline" : `Limit ${MAX_TYPE_BLOCKS} blocks`}
      </button>

      {selected && (
        <>
          <div className="section-label">Mode</div>
          <div className="mockup-segment type-mode-segment" role="tablist" aria-label="Type blend mode">
            {(["solid", "invert", "knockout"] as TypeMode[]).map((mode) => (
              <button
                key={mode}
                type="button"
                role="tab"
                aria-selected={selected.mode === mode}
                className={selected.mode === mode ? "selected" : ""}
                onClick={() => onUpdate(selected.id, { mode })}
              >
                {typeModeLabels[mode]}
              </button>
            ))}
          </div>

          <label className="type-copy-field">
            <span className="section-label">Copy</span>
            <textarea
              value={selected.text}
              rows={3}
              spellCheck={false}
              aria-label="Headline copy"
              onChange={(event) => onUpdate(selected.id, { text: event.target.value })}
            />
          </label>

          <div className="section-label">Font</div>
          <div className="mockup-segment type-font-segment">
            {([
              ["display", "Display"],
              ["sans", "Sans"],
              ["mono", "Mono"],
            ] as [TypeFont, string][]).map(([font, label]) => (
              <button
                key={font}
                type="button"
                className={selected.font === font ? "selected" : ""}
                onClick={() => onUpdate(selected.id, { font })}
                style={{ fontFamily: typeFontStacks[font] }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="section-label">Align</div>
          <div className="mockup-segment type-align-segment">
            {(["left", "center", "right"] as TypeAlign[]).map((align) => (
              <button
                key={align}
                type="button"
                className={selected.align === align ? "selected" : ""}
                onClick={() => onUpdate(selected.id, { align })}
              >
                {align}
              </button>
            ))}
          </div>

          <Slider label="Size" value={selected.fontSize} min={12} max={120} step={1} unit="px" onChange={(fontSize) => onUpdate(selected.id, { fontSize })} />
          <Slider label="Width" value={selected.width} min={20} max={96} step={1} unit="%" onChange={(width) => onUpdate(selected.id, { width })} />
          <Slider label="Tracking" value={selected.letterSpacing} min={-0.12} max={0.28} step={0.01} unit="em" onChange={(letterSpacing) => onUpdate(selected.id, { letterSpacing })} />

          {selected.mode === "solid" && (
            <label className="type-color-row">
              <span>Color</span>
              <input
                type="color"
                value={selected.color}
                aria-label="Solid type color"
                onChange={(event) => onUpdate(selected.id, { color: event.target.value })}
              />
            </label>
          )}

          {selected.mode === "knockout" && (
            <>
              <div className="section-label">Plate</div>
              <div className="mockup-segment type-plate-segment">
                <button type="button" className={selected.plate === "black" ? "selected" : ""} onClick={() => onUpdate(selected.id, { plate: "black" })}>Black</button>
                <button type="button" className={selected.plate === "white" ? "selected" : ""} onClick={() => onUpdate(selected.id, { plate: "white" })}>White</button>
              </div>
            </>
          )}

          <div className="type-actions">
            <button type="button" className="button ghost" onClick={() => onDuplicate(selected.id)} disabled={!canAdd}>
              <CopyPlus /> Duplicate
            </button>
            <button type="button" className="button ghost type-delete" onClick={() => onRemove(selected.id)}>
              <Trash2 /> Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

function TypeBlockView({
  block,
  selected,
  interactive,
  onSelect,
  onChange,
}: {
  block: TypeBlock;
  selected: boolean;
  interactive: boolean;
  onSelect: () => void;
  onChange: (update: Partial<TypeBlock>) => void;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [editing, setEditing] = useState(false);
  const dragRef = useRef<{ pointerId: number; startX: number; startY: number; originX: number; originY: number } | null>(null);

  useEffect(() => {
    if (editing) return;
    const node = copyRef.current;
    if (node && node.textContent !== block.text) node.textContent = block.text;
  }, [block.text, editing]);

  useEffect(() => {
    if (!editing) return;
    const node = copyRef.current;
    if (!node) return;
    node.focus();
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(node);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }, [editing]);

  const beginDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!interactive || editing || (event.target as HTMLElement).closest(".type-resize-handle")) return;
    event.preventDefault();
    event.stopPropagation();
    onSelect();
    const parent = rootRef.current?.offsetParent as HTMLElement | null;
    if (!parent) return;
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: block.x,
      originY: block.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    const parent = rootRef.current?.offsetParent as HTMLElement | null;
    if (!drag || !parent || event.pointerId !== drag.pointerId) return;
    const dx = (event.clientX - drag.startX) / parent.clientWidth * 100;
    const dy = (event.clientY - drag.startY) / parent.clientHeight * 100;
    onChange({
      x: clamp(drag.originX + dx, 8, 92),
      y: clamp(drag.originY + dy, 8, 92),
    });
  };

  const endDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || event.pointerId !== dragRef.current.pointerId) return;
    dragRef.current = null;
    try { event.currentTarget.releasePointerCapture(event.pointerId); } catch { /* already released */ }
  };

  const beginResize = (event: PointerEvent<HTMLSpanElement>) => {
    if (!interactive) return;
    event.preventDefault();
    event.stopPropagation();
    onSelect();
    const parent = rootRef.current?.offsetParent as HTMLElement | null;
    if (!parent) return;
    const originWidth = block.width;
    const originSize = block.fontSize;
    const startX = event.clientX;
    const pointerId = event.pointerId;
    const target = event.currentTarget;
    target.setPointerCapture(pointerId);

    const onMove = (moveEvent: globalThis.PointerEvent) => {
      if (moveEvent.pointerId !== pointerId) return;
      const dx = (moveEvent.clientX - startX) / parent.clientWidth * 100;
      onChange({
        width: clamp(originWidth + dx * 2, 20, 96),
        fontSize: clamp(originSize + dx * 1.1, 12, 120),
      });
    };
    const onUp = (upEvent: globalThis.PointerEvent) => {
      if (upEvent.pointerId !== pointerId) return;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      try { target.releasePointerCapture(pointerId); } catch { /* already released */ }
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  return (
    <div
      ref={rootRef}
      className={`type-block mode-${block.mode} plate-${block.plate}${selected ? " selected" : ""}${editing ? " is-editing" : ""}${interactive ? " is-interactive" : ""}`}
      style={{
        left: `${block.x}%`,
        top: `${block.y}%`,
        width: `${block.width}%`,
        ["--type-size" as string]: `${block.fontSize}px`,
        ["--type-tracking" as string]: `${block.letterSpacing}em`,
        ["--type-leading" as string]: block.lineHeight,
        ["--type-align" as string]: block.align,
        ["--type-color" as string]: block.color,
        ["--type-font" as string]: typeFontStacks[block.font],
      }}
      onPointerDown={beginDrag}
      onPointerMove={moveDrag}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
      onDoubleClick={(event) => {
        if (!interactive) return;
        event.stopPropagation();
        setEditing(true);
      }}
    >
      <div className="type-plate" aria-hidden="true" />
      <div
        ref={copyRef}
        className="type-copy"
        contentEditable={editing}
        suppressContentEditableWarning
        spellCheck={false}
        onBlur={(event) => {
          setEditing(false);
          onChange({ text: event.currentTarget.innerText.replace(/\n+$/, "") || " " });
        }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            event.currentTarget.blur();
          }
        }}
      />
      {selected && interactive && !editing && <span className="type-resize-handle" onPointerDown={beginResize} aria-hidden="true" />}
    </div>
  );
}

export function TypeCanvasLayer({
  blocks,
  selectedId,
  interactive,
  onSelect,
  onChange,
}: {
  blocks: TypeBlock[];
  selectedId: string | null;
  interactive: boolean;
  onSelect: (id: string | null) => void;
  onChange: (id: string, update: Partial<TypeBlock>) => void;
}) {
  if (!blocks.length) return null;

  return (
    <div
      className={`type-layer${interactive ? " is-interactive" : ""}`}
      onPointerDown={(event) => {
        if (!interactive) return;
        if (event.target === event.currentTarget) onSelect(null);
      }}
    >
      {blocks.map((block) => (
        <TypeBlockView
          key={block.id}
          block={block}
          selected={selectedId === block.id}
          interactive={interactive}
          onSelect={() => onSelect(block.id)}
          onChange={(update) => onChange(block.id, update)}
        />
      ))}
    </div>
  );
}
