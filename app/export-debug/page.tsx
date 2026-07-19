"use client";

import { useEffect, useState } from "react";
import { createPaperExportSurface, defaultRecipe, presetSettings } from "@/components/shader-studio/canvas";

export default function ExportDebugPage() {
  const [result, setResult] = useState<string>("running...");

  useEffect(() => {
    void (async () => {
      const styles = [14, 18] as const;
      const lines: string[] = [];
      for (const style of styles) {
        const recipe = {
          ...defaultRecipe,
          style,
          ...presetSettings[style],
        };
        try {
          const surface = await createPaperExportSurface(recipe, 1920, 1080);
          lines.push(`style ${style}: ok ${surface.canvas.width}x${surface.canvas.height}`);
          surface.dispose();
        } catch (error) {
          lines.push(`style ${style}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
      setResult(lines.join("\n"));
    })();
  }, []);

  return <pre style={{ padding: 24, fontFamily: "monospace" }}>{result}</pre>;
}
