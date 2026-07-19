"use client";

import { PointerEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import {
  ChevronDown,
  GripVertical,
  Minus,
  Palette,
  Pipette,
  Plus,
  Save,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import type { Recipe, SavedPalette, ThemeOption } from "./types";
import { buildThemeOptions, companyThemeKey, companyThemes, hexToRgb, palettes } from "./canvas";

function hexToHsv(hex: string) {
  const [r, g, b] = hexToRgb(hex);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  const hue = delta === 0 ? 0 : max === r ? 60 * (((g - b) / delta) % 6) : max === g ? 60 * ((b - r) / delta + 2) : 60 * ((r - g) / delta + 4);
  return { h: (hue + 360) % 360, s: max === 0 ? 0 : delta / max, v: max };
}

function hsvToHex(h: number, s: number, v: number) {
  const c = v * s;
  const x = c * (1 - Math.abs((h / 60) % 2 - 1));
  const m = v - c;
  const [r, g, b] = h < 60 ? [c, x, 0] : h < 120 ? [x, c, 0] : h < 180 ? [0, c, x] : h < 240 ? [0, x, c] : h < 300 ? [x, 0, c] : [c, 0, x];
  return `#${[r, g, b].map((value) => Math.round((value + m) * 255).toString(16).padStart(2, "0")).join("")}`;
}

export function ShadcnColorPicker({ color, onChange }: { color: string; onChange: (color: string) => void }) {
  const [open, setOpen] = useState(false);
  const [hexInput, setHexInput] = useState(color.toUpperCase());
  const rootRef = useRef<HTMLDivElement>(null);
  const hsv = hexToHsv(color);
  const inputId = useId();
  const update = (next: Partial<typeof hsv>) => onChange(hsvToHex(next.h ?? hsv.h, next.s ?? hsv.s, next.v ?? hsv.v));

  useEffect(() => setHexInput(color.toUpperCase()), [color]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const pick = (event: PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    update({
      s: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
      v: 1 - Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height)),
    });
  };

  const startPick = (event: PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pick(event);
  };

  const sampleScreenColour = async () => {
    const EyeDropper = (window as typeof window & { EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper;
    if (!EyeDropper) return;
    try { onChange((await new EyeDropper().open()).sRGBHex); } catch { /* cancelled */ }
  };

  const canSampleScreen = typeof window !== "undefined" && "EyeDropper" in window;
  const closePicker = () => setOpen(false);

  return (
    <div className="shadcn-colour-picker" ref={rootRef}>
      <button
        type="button"
        className={`colour-picker-trigger ${open ? "open" : ""}`}
        onClick={() => setOpen((value) => !value)}
        aria-label={`Edit ${color}`}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <i style={{ background: color }} />
        <span>{color.toUpperCase()}</span>
        <ChevronDown />
      </button>
      {open && (
        <div
          className="colour-picker-popover"
          role="dialog"
          aria-label="Colour picker"
          onKeyDown={(event) => event.key === "Escape" && closePicker()}
        >
          <button type="button" className="colour-picker-close" onClick={closePicker} aria-label="Close colour picker">
            <X />
          </button>
          <div
            className="colour-sv"
            style={{ backgroundColor: `hsl(${hsv.h} 100% 50%)` }}
            onPointerDown={startPick}
            onPointerMove={(event) => event.buttons === 1 && pick(event)}
          >
            <i style={{ left: `${hsv.s * 100}%`, top: `${(1 - hsv.v) * 100}%`, background: color }} />
          </div>
          <input
            id={inputId}
            className="colour-hue"
            aria-label="Hue"
            type="range"
            min="0"
            max="360"
            value={Math.round(hsv.h)}
            onChange={(event) => update({ h: Number(event.target.value) })}
          />
          <div className="colour-picker-footer">
            <label className="colour-hex" htmlFor={`${inputId}-hex`}>
              <span style={{ background: color }} aria-hidden="true" />
              <input
                id={`${inputId}-hex`}
                value={hexInput}
                onChange={(event) => {
                  const next = event.target.value.toUpperCase();
                  setHexInput(next);
                  if (/^#[0-9A-F]{6}$/.test(next)) onChange(next);
                }}
                onBlur={() => setHexInput(color.toUpperCase())}
                aria-label="Hex colour"
                spellCheck={false}
              />
            </label>
            <button
              type="button"
              className="colour-eyedropper"
              onClick={sampleScreenColour}
              disabled={!canSampleScreen}
              title={canSampleScreen ? "Pick a colour from the screen" : "Screen colour picking is not available in this browser"}
              aria-label="Pick a colour from the screen"
            >
              <Pipette />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export function PalettePreview({ colors, className = "" }: { colors: string[]; className?: string }) {
  return (
    <span className={`palette-preview ${className}`.trim()} aria-hidden="true">
      {colors.map((color, index) => <i key={`${color}-${index}`} style={{ background: color }} />)}
    </span>
  );
}

function ThemePaletteSelect({ value, options, onChange, onDelete }: { value: string; options: ThemeOption[]; onChange: (key: string) => void; onDelete: (id: string) => void }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.key === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={`theme-palette-select ${open ? "open" : ""}`} ref={rootRef}>
      <button
        type="button"
        className="theme-palette-trigger"
        aria-label="From a theme"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
      >
        {selected && <PalettePreview colors={selected.colors} />}
        <span>{selected?.name ?? "Select theme"}</span>
        <ChevronDown />
      </button>
      {open && (
        <div className="theme-palette-menu" role="listbox" aria-label="Theme palettes">
          {options.map((option) => (
            <div className={`theme-palette-option ${option.key === selected?.key ? "selected" : ""}`} key={option.key}>
              <button
                type="button"
                role="option"
                aria-selected={option.key === selected?.key}
                onClick={() => {
                  onChange(option.key);
                  setOpen(false);
                }}
              >
                <PalettePreview colors={option.colors} />
                <span>{option.name}</span>
              </button>
              {option.deletable && (
                <button
                  type="button"
                  className="theme-palette-delete"
                  aria-label={`Delete ${option.name}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    const id = option.key.replace(/^saved:/, "");
                    onDelete(id);
                  }}
                >
                  <Trash2 />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

type PaletteStopItem = { id: string; color: string };

function createPaletteStopId() {
  return `palette-stop-${Math.random().toString(36).slice(2, 11)}`;
}

function PaletteStopRow({
  item,
  index,
  total,
  canRemove,
  onColorChange,
  onRemove,
}: {
  item: PaletteStopItem;
  index: number;
  total: number;
  canRemove: boolean;
  onColorChange: (color: string) => void;
  onRemove: () => void;
}) {
  const dragControls = useDragControls();

  return (
    <Reorder.Item
      value={item}
      className="color-stop"
      dragListener={false}
      dragControls={dragControls}
      whileDrag={{
        scale: 1.015,
        boxShadow: "0 14px 34px rgba(0,0,0,0.42)",
        borderColor: "#4f6fd0",
        zIndex: 12,
      }}
      transition={{ layout: { type: "spring", stiffness: 520, damping: 38 } }}
    >
      <button
        type="button"
        className="stop-drag-handle"
        aria-label={`Drag to reorder ${index === 0 ? "base" : `stop ${index}`}`}
        onPointerDown={(event) => dragControls.start(event)}
      >
        <GripVertical aria-hidden="true" />
      </button>
      <ShadcnColorPicker color={item.color} onChange={onColorChange} />
      <b>{index === 0 ? "BASE" : `STOP ${index}`}</b>
      <span>{index === total - 1 ? "Highlight" : "Gradient"}</span>
      <button
        className="remove-colour"
        type="button"
        disabled={!canRemove}
        aria-label={`Remove stop ${index}`}
        onClick={onRemove}
      >
        <Minus />
      </button>
    </Reorder.Item>
  );
}

function PaletteStopsList({ palette, onChange }: { palette: string[]; onChange: (palette: string[]) => void }) {
  const stopIdsRef = useRef<string[]>([]);

  if (stopIdsRef.current.length < palette.length) {
    while (stopIdsRef.current.length < palette.length) {
      stopIdsRef.current.push(createPaletteStopId());
    }
  } else if (stopIdsRef.current.length > palette.length) {
    stopIdsRef.current.length = palette.length;
  }

  const items = useMemo(
    () => palette.map((color, index) => ({ id: stopIdsRef.current[index], color })),
    [palette],
  );

  const handleReorder = (nextItems: PaletteStopItem[]) => {
    stopIdsRef.current = nextItems.map((stop) => stop.id);
    onChange(nextItems.map((stop) => stop.color));
  };

  return (
    <Reorder.Group axis="y" className="stops" values={items} onReorder={handleReorder}>
      {items.map((item, index) => (
        <PaletteStopRow
          key={item.id}
          item={item}
          index={index}
          total={items.length}
          canRemove={palette.length > 2}
          onColorChange={(nextColor) => {
            const nextPalette = [...palette];
            nextPalette[index] = nextColor;
            onChange(nextPalette);
          }}
          onRemove={() => {
            stopIdsRef.current.splice(index, 1);
            onChange(palette.filter((_, itemIndex) => itemIndex !== index));
          }}
        />
      ))}
    </Reorder.Group>
  );
}

export type PalettePanelProps = {
  recipe: Recipe;
  embedded?: boolean;
  selectedTheme: string;
  setSelectedTheme: (key: string) => void;
  onChange: (update: Partial<Recipe>) => void;
  onApplyTheme: (key: string) => void;
  onRandomize: () => void;
  savedPalettes: SavedPalette[];
  paletteName: string;
  setPaletteName: (name: string) => void;
  onSavePalette: () => void;
  onDeletePalette: (id: string) => void;
};

export function PalettePanel({
  recipe,
  embedded = false,
  selectedTheme,
  setSelectedTheme,
  onChange,
  onApplyTheme,
  onRandomize,
  savedPalettes,
  paletteName,
  setPaletteName,
  onSavePalette,
  onDeletePalette,
}: PalettePanelProps) {
  const applyPalette = (palette: string[]) => onChange({ palette: [...palette] });
  const themeOptions = useMemo(() => buildThemeOptions(savedPalettes), [savedPalettes]);
  const unnamedPalettes = useMemo(() => savedPalettes.filter((item) => !item.name.trim()), [savedPalettes]);

  return (
    <div className="panel-content palette-panel">
      <div className="palette-panel-heading">
        <div>{!embedded && <><h2>Colours</h2><p className="helper">Build a gradient with up to eight colour stops.</p></>}</div>
        <span>{recipe.palette.length}/8</span>
      </div>
      <PaletteStopsList palette={recipe.palette} onChange={(palette) => onChange({ palette })} />
      <button
        className="add-colour"
        type="button"
        disabled={recipe.palette.length >= 8}
        onClick={() => applyPalette([...recipe.palette, recipe.palette.at(-1) || "#ffffff"])}
      >
        <Plus /> {recipe.palette.length >= 8 ? "Maximum of 8 colours" : "Add colour stop"}
      </button>
      <div className="save-palette-row">
        <input
          value={paletteName}
          maxLength={36}
          onChange={(event) => setPaletteName(event.target.value)}
          onKeyDown={(event) => event.key === "Enter" && onSavePalette()}
          placeholder="Name (optional)"
          aria-label="Palette name"
        />
        <button className="button primary" type="button" onClick={onSavePalette}>
          <Save /> Save
        </button>
      </div>
      <div className="switch-row">
        <span>Smooth blend (OKLab)</span>
        <button className={`switch ${recipe.smoothBlend ? "on" : ""}`} type="button" onClick={() => onChange({ smoothBlend: !recipe.smoothBlend })} aria-pressed={recipe.smoothBlend}><i /></button>
      </div>
      <div className="section-label">From a theme</div>
      <div className="theme-picker">
        <ThemePaletteSelect value={selectedTheme} options={themeOptions} onChange={setSelectedTheme} onDelete={onDeletePalette} />
        <button className="button primary" type="button" onClick={() => onApplyTheme(selectedTheme)}>
          <Palette /> Apply theme
        </button>
      </div>
      <button className="button wide ghost palette-randomize" type="button" onClick={onRandomize}>
        <Sparkles /> Randomize palette
      </button>
      <div className="section-label palette-label">Curated palettes</div>
      <div className="palette-grid">
        {unnamedPalettes.map((item) => (
          <div className="palette-swatch-wrap" key={item.id}>
            <button
              type="button"
              onClick={() => applyPalette(item.colors)}
              className={`palette-swatch ${recipe.palette.join() === item.colors.join() ? "selected" : ""}`}
              aria-label="Apply saved palette"
            >
              {item.colors.map((color, index) => <i key={`${item.id}-${color}-${index}`} style={{ background: color }} />)}
            </button>
            <button type="button" className="palette-swatch-delete" aria-label="Delete saved palette" onClick={() => onDeletePalette(item.id)}>
              <X />
            </button>
          </div>
        ))}
        {palettes.map((palette, index) => (
          <button
            key={index}
            type="button"
            onClick={() => applyPalette(palette)}
            className={`palette-swatch ${recipe.palette.join() === palette.join() ? "selected" : ""}`}
          >
            {palette.map((color) => <i key={color} style={{ background: color }} />)}
          </button>
        ))}
      </div>
    </div>
  );
}

export function resolveThemePalette(key: string, savedPalettes: SavedPalette[]) {
  const option = buildThemeOptions(savedPalettes).find((item) => item.key === key)
    ?? buildThemeOptions([]).find((item) => item.key === key)
    ?? buildThemeOptions([])[0];
  return option ?? null;
}

export function defaultThemeKey() {
  const first = companyThemes[0];
  return first ? companyThemeKey(first.name) : companyThemeKey("Modern Minimal");
}
