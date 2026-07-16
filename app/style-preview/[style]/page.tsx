import { StaticStylePreview } from "@/components/shader-studio";

export default async function StylePreviewPage({ params }: { params: Promise<{ style: string }> }) {
  const { style } = await params;
  const styleNumber = Number(style);
  return <StaticStylePreview style={Number.isInteger(styleNumber) && styleNumber >= 0 && styleNumber <= 33 ? styleNumber : 0} />;
}
