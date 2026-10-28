"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import CircuitWorkbench from "@/components/CircuitWorkbench";
import { AdcsExperiment } from "@/data/adcsExperiments";

type Tab = "aim" | "procedure" | "simulation";

export default function ExperimentClient({
  labSlug,
  experiment,
}: {
  labSlug: string;
  experiment: AdcsExperiment;
}) {
  const [activeTab, setActiveTab] = useState<Tab>("aim");

  const tabs: { id: Tab; label: string }[] = [
    { id: "aim", label: "Aim / Theory" },
    { id: "procedure", label: "Procedure" },
    { id: "simulation", label: "Simulation" },
  ];

  return (
    <>
      <PageHeader
        title={`Experiment ${experiment.number}`}
        breadcrumb={`Labs > ADCS > Exp ${experiment.number}`}
        description={experiment.title}
      />

      <main
        className={`mx-auto mt-12 px-4 md:px-8 pb-24 flex flex-col md:flex-row gap-10 ${
          activeTab === "simulation" ? "max-w-[1400px]" : "max-w-[1200px]"
        }`}
      >
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white border border-gray-200 shadow-sm sticky top-28">
            <ul className="flex flex-col text-sm font-medium text-gray-700">
              {tabs.map((tab) => (
                <li key={tab.id} className="border-b border-gray-100">
                  <button
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left block px-6 py-3 transition-colors border-l-4 ${
                      activeTab === tab.id
                        ? "bg-[#0b5c9e] text-white border-blue-900"
                        : "border-transparent hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <Link
                href={`/labs/${labSlug}`}
                className="text-sm text-[#0b5c9e] font-semibold hover:underline"
              >
                &larr; Back to ADCS Lab
              </Link>
            </div>
          </div>
        </aside>

        <div
          className={`flex-1 bg-white border border-gray-200 shadow-sm min-h-[500px] ${
            activeTab === "simulation" ? "p-4 md:p-6" : "p-8 md:p-12"
          }`}
        >
          {activeTab === "aim" && (
            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-serif text-[#0b5c9e] mb-4 border-b border-gray-200 pb-2">
                  Aim of Experiment
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">{experiment.aim}</p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Apparatus required</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {experiment.apparatus.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Theory</h3>
                <div className="space-y-3 text-gray-700 leading-relaxed text-justify">
                  {experiment.theory.map((para) => (
                    <p key={para.slice(0, 40)}>{para}</p>
                  ))}
                </div>
                <p className="mt-4 text-sm bg-blue-50 border border-blue-100 rounded px-4 py-3 text-blue-900">
                  {experiment.formula.label}: <strong>{experiment.formula.latex}</strong>
                </p>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Lab manual reference</h3>
                <img
                  src={experiment.images.aimTheory}
                  alt="Experiment 1 aim and theory"
                  className="w-full max-w-xl rounded border border-gray-200"
                />
              </section>
            </div>
          )}

          {activeTab === "procedure" && (
            <div className="space-y-8">
              <section>
                <h2 className="text-3xl font-serif text-[#0b5c9e] mb-4 border-b border-gray-200 pb-2">
                  Procedure
                </h2>
                <ol className="list-decimal list-inside space-y-3 text-gray-700">
                  {experiment.procedure.map((step) => (
                    <li key={step.slice(0, 40)} className="leading-relaxed bg-gray-50 p-4 rounded border border-gray-200">
                      {step}
                    </li>
                  ))}
                </ol>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Observations</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {experiment.observations.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Precautions</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {experiment.precautions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Result</h3>
                <p className="text-gray-700 bg-emerald-50 border border-emerald-100 rounded px-4 py-3">
                  {experiment.result}
                </p>
              </section>

              <section className="grid md:grid-cols-2 gap-4">
                <img
                  src={experiment.images.procedure}
                  alt="AM transmitter block diagram and procedure"
                  className="w-full rounded border border-gray-200"
                />
                <img
                  src={experiment.images.waveforms}
                  alt="AM output waveforms"
                  className="w-full rounded border border-gray-200"
                />
              </section>
            </div>
          )}

          {activeTab === "simulation" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-serif text-[#0b5c9e] mb-2 border-b border-gray-200 pb-2">
                Simulation — Circuit Workbench
              </h2>
              <p className="text-gray-600">
                Build the ADCS Exp-1 circuit like Proteus: place components from the library, wire pins, edit Am/Ac,
                then run to view CRO traces and modulation index.
              </p>
              <CircuitWorkbench />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
