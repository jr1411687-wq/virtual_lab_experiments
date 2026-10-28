// 🚨 Tells Next.js to allow this route to block while resolving params
export const instant = false;

import BranchClient from "./BranchClient";

export default async function BranchPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <BranchClient slug={resolvedParams.slug} />;
}
