import { StaticAsciiPreview } from "@/components/shader-studio";
import { resolveAsciiPreviewStyle } from "@/components/shader-studio/preview-recipes";

export default async function AsciiPreviewPage({ params }: { params: Promise<{ style: string }> }) {
  const { style } = await params;
  return <StaticAsciiPreview style={resolveAsciiPreviewStyle(style)} />;
}
