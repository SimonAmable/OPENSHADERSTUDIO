import type { Metadata } from "next";
import { ThumbnailLab } from "@/components/thumbnail-lab/thumbnail-lab";

export const metadata: Metadata = {
  title: "Thumbnail Lab · Shader Studio",
  description: "Generate shader, media, and ASCII thumbnail samples.",
};

export default function SamplesPage() {
  return <ThumbnailLab />;
}
