import { StaticSceneMaterialPreview } from "@/components/shader-studio";
import { resolveThreePreviewMaterial } from "@/components/shader-studio/three-catalog";

export default async function ScenePreviewPage({ params }: { params: Promise<{ material: string }> }) {
  const { material } = await params;
  return <StaticSceneMaterialPreview material={resolveThreePreviewMaterial(material)} />;
}
