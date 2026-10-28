// 🚨 Tells Next.js to allow this route to block while resolving params
export const instant = false;

import LabDetailClient from "./LabDetailClient";

export default async function LabDetailPage({ params }: { params: Promise<{ labSlug: string }> }) {
  const resolvedParams = await params;
  return <LabDetailClient labSlug={resolvedParams.labSlug} />;
}
