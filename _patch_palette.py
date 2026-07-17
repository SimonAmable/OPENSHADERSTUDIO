from pathlib import Path

path = Path(r"c:\Users\simon\Documents\gpt-sites-test\components\shader-studio.tsx")
text = path.read_text(encoding="utf-8")
start = text.index("function PalettePreview")
end = text.index("function VisualsSectionHeader")

new_panel = '''function PalettePanel({ recipe, embedded = false, onChange, onApplyTheme, onRandomize, savedPalettes, paletteName, setPaletteName, onSavePalette, onDeletePalette }: { recipe: Recipe; embedded?: boolean; onChange: (update: Partial<Recipe>) => void; onApplyTheme: (key: string) => void; onRandomize: () => void; savedPalettes: SavedPalette[]; paletteName: string; setPaletteName: (name: string) => void; onSavePalette: () => void; onDeletePalette: (id: string) => void }) {
  const applyPalette = (palette: string[]) => onChange({ palette: [...palette] });
  const themeOptions = useMemo(() => buildThemeOptions(savedPalettes), [savedPalettes]);
  const unnamedPalettes = useMemo(() => savedPalettes.filter((item) => !item.name.trim()), [savedPalettes]);

  return (
    <div className="panel-content palette-panel">
      <div className="palette-panel-heading">
        <div>{!embedded && <><h2>Colours</h2><p className="helper">Build a gradient with up to eight colour stops.</p></>}</div>
        <span>{recipe.palette.length}/8</span>
      </div>
      <div className="stops">
        {recipe.palette.map((color, index) => (
          <div className="color-stop" key={`palette-stop-${index}`}>
            <ShadcnColorPicker
              color={color}
              onChange={(nextColor) => {
                const palette = [...recipe.palette];
                palette[index] = nextColor;
                onChange({ palette });
              }}
            />
            <b>{index === 0 ? "BASE" : `STOP ${index}`}</b>
            <span>{index === recipe.palette.length - 1 ? "Highlight" : "Gradient"}</span>
            <button
              className="remove-colour"
              type="button"
              disabled={recipe.palette.length <= 2}
              aria-label={`Remove stop ${index}`}
              onClick={() => onChange({ palette: recipe.palette.filter((_, itemIndex) => itemIndex !== index) })}
            >
              <Minus />
            </button>
          </div>
        ))}
      </div>
      <button
        className="add-colour"
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
        <button className={`switch ${recipe.smoothBlend ? "on" : ""}`} onClick={() => onChange({ smoothBlend: !recipe.smoothBlend })} aria-pressed={recipe.smoothBlend}><i /></button>
      </div>
      <button className="button wide ghost palette-randomize" type="button" onClick={onRandomize}>
        <Sparkles /> Randomize palette
      </button>
      <div className="section-label palette-label">Curated palettes</div>
      <div className="palette-grid">
        {themeOptions.map((option) => (
          <div className="palette-swatch-wrap" key={option.key}>
            <button
              type="button"
              onClick={() => onApplyTheme(option.key)}
              className={`palette-swatch named ${recipe.palette.join() === option.colors.join() ? "selected" : ""}`}
              aria-label={`Apply ${option.name}`}
            >
              {option.colors.map((color, index) => <i key={`${option.key}-${color}-${index}`} style={{ background: color }} />)}
              <em>{option.name}</em>
            </button>
            {option.deletable && (
              <button
                type="button"
                className="palette-swatch-delete"
                aria-label={`Delete ${option.name}`}
                onClick={() => onDeletePalette(option.key.replace(/^saved:/, ""))}
              >
                <X />
              </button>
            )}
          </div>
        ))}
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

'''

path.write_text(text[:start] + new_panel + text[end:], encoding="utf-8")
print("updated palette panel")
