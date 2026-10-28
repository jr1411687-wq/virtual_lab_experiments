export const instant = false;

import { notFound } from "next/navigation";
import ExperimentClient from "./ExperimentClient";
import { adcsLabSlug, getAdcsExperiment } from "@/data/adcsExperiments";

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ labSlug: string; expSlug: string }>;
}) {
  const { labSlug, expSlug } = await params;

  if (labSlug !== adcsLabSlug) {
    notFound();
  }

  const experiment = getAdcsExperiment(expSlug);
  if (!experiment) {
    notFound();
  }

  return <ExperimentClient labSlug={labSlug} experiment={experiment} />;
}
