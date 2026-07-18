import { StaticMediaPreview } from "@/components/shader-studio";
import { resolveMediaPreviewFilter } from "@/components/shader-studio/media-catalog";

export default async function MediaPreviewPage({ params }: { params: Promise<{ filter: string }> }) {
  const { filter } = await params;
  return <StaticMediaPreview filter={resolveMediaPreviewFilter(filter)} />;
}
