import { StaticSceneObjectPreview } from "@/components/shader-studio";
import { resolveThreePreviewObject } from "@/components/shader-studio/three-catalog";

export default async function SceneObjectPreviewPage({ params }: { params: Promise<{ object: string }> }) {
  const { object } = await params;
  return <StaticSceneObjectPreview object={resolveThreePreviewObject(object)} />;
}
