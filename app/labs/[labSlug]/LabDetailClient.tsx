"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { allBranches } from "@/data/labsData";

export default function LabDetailClient({ labSlug }: { labSlug: string }) {
  const [activeTab, setActiveTab] = useState("overview");

  let currentLab: any = null;
  let branchName = "";
  let branchSlug = "";

  for (const branch of allBranches) {
    const foundLab = branch.labs.find((l: any) => l.slug === labSlug);
    if (foundLab) {
      currentLab = foundLab;
      branchName = branch.title;
      branchSlug = branch.slug;
      break;
    }
  }

  if (!currentLab) {
    return <div className="pt-48 text-center text-xl">Lab not found.</div>;
  }

  // 🚨 Use the short name if it exists, otherwise the full title
  const displayTitle = currentLab.shortName 
    ? `${currentLab.shortName} - ${currentLab.title}` 
    : currentLab.title;

  return (
    <>
      <PageHeader 
        title={displayTitle} 
        breadcrumb={`Labs > ${branchName}`}
        description={currentLab.desc}
      />

      <main className="max-w-[1200px] mx-auto mt-12 px-8 pb-24 flex flex-col md:flex-row gap-10">
        
        {/* Left Sidebar (Tab Navigation) */}
        <aside className="w-full md:w-64 shrink-0">
          <div className="bg-white border border-gray-200 shadow-sm sticky top-28">
            <ul className="flex flex-col text-sm font-medium text-gray-700">
              
              <li className="border-b border-gray-100">
                <button 
                  onClick={() => setActiveTab("overview")} 
                  className={`w-full text-left block px-6 py-3 transition-colors border-l-4 ${activeTab === "overview" ? "bg-[#0b5c9e] text-white border-blue-900" : "border-transparent hover:bg-gray-50 hover:border-gray-300"}`}
                >
                  Introduction / Overview
                </button>
              </li>
              
              <li className="border-b border-gray-100">
                <button 
                  onClick={() => setActiveTab("objectives")} 
                  className={`w-full text-left block px-6 py-3 transition-colors border-l-4 ${activeTab === "objectives" ? "bg-[#0b5c9e] text-white border-blue-900" : "border-transparent hover:bg-gray-50 hover:border-gray-300"}`}
                >
                  Objectives
                </button>
              </li>
              
              <li className="border-b border-gray-100">
                <button 
                  onClick={() => setActiveTab("experiments")} 
                  className={`w-full text-left block px-6 py-3 transition-colors border-l-4 ${activeTab === "experiments" ? "bg-[#0b5c9e] text-white border-blue-900" : "border-transparent hover:bg-gray-50 hover:border-gray-300"}`}
                >
                  List of Experiments
                </button>
              </li>
              
              <li className="border-b border-gray-100">
                <button 
                  onClick={() => setActiveTab("history")} 
                  className={`w-full text-left block px-6 py-3 transition-colors border-l-4 ${activeTab === "history" ? "bg-[#0b5c9e] text-white border-blue-900" : "border-transparent hover:bg-gray-50 hover:border-gray-300"}`}
                >
                  Innovation & History
                </button>
              </li>

            </ul>
            <div className="p-4 bg-gray-50 border-t border-gray-200">
              <Link href={`/branches/${branchSlug}`} className="text-sm text-[#0b5c9e] font-semibold hover:underline flex items-center gap-1">
                &larr; Back to {branchName.split(' ')[0]} Labs
              </Link>
            </div>
          </div>
        </aside>

        {/* Right Content Area */}
        <div className="flex-1 bg-white border border-gray-200 shadow-sm p-8 md:p-12 min-h-[500px]">
          
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-serif text-[#0b5c9e] mb-6 border-b border-gray-200 pb-2">Introduction</h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed text-justify">
                <p>{currentLab.overview || "This virtual laboratory provides students with a comprehensive understanding of the core concepts through interactive simulations and remote experimentation. The lab covers fundamental principles and practical applications required for advanced engineering studies."}</p>
                
                {currentLab.image && (
                  <div className="my-8 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                    <img src={currentLab.image} alt={currentLab.title} className="w-full h-64 object-cover" />
                    <div className="bg-gray-50 p-3 text-xs text-gray-500 text-center">Visual representation of {currentLab.title}</div>
                  </div>
                )}

                <div className="mt-6 bg-blue-50 border-l-4 border-[#1681b8] p-4 text-sm text-gray-700 flex items-center gap-4">
                   <div className="text-4xl">🔬</div>
                   <div><strong>Virtual Lab Experience:</strong> Accessible 24/7, allowing you to perform experiments at your own pace from anywhere.</div>
                </div>
              </div>
            </div>
          )}

          {/* Objectives Tab */}
          {activeTab === "objectives" && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-serif text-[#0b5c9e] mb-6 border-b border-gray-200 pb-2">Objectives</h2>
              <ul className="list-disc list-inside space-y-3 text-gray-700">
                {currentLab.objectives ? currentLab.objectives.map((obj: string, i: number) => (
                  <li key={i} className="leading-relaxed text-lg">{obj}</li>
                )) : (
                  <>
                    <li className="leading-relaxed text-lg">To provide practical knowledge of the theoretical concepts studied in class.</li>
                    <li className="leading-relaxed text-lg">To develop problem-solving skills using modern engineering tools.</li>
                  </>
                )}
              </ul>
            </div>
          )}

          {/* Experiments Tab */}
          {activeTab === "experiments" && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-serif text-[#0b5c9e] mb-6 border-b border-gray-200 pb-2">List of Experiments</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                {currentLab.experiments ? currentLab.experiments.map((exp: string, i: number) => (
                  <li key={i} className="leading-relaxed bg-gray-50 p-4 rounded border border-gray-200 text-md">{exp}</li>
                )) : (
                  <li className="leading-relaxed bg-gray-50 p-4 rounded border border-gray-200 text-md">Experiment 1 details to be added...</li>
                )}
              </ol>
            </div>
          )}

          {/* History Tab */}
          {activeTab === "history" && (
            <div className="animate-fade-in">
              <h2 className="text-3xl font-serif text-[#0b5c9e] mb-6 border-b border-gray-200 pb-2">Innovation & History</h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed text-justify">
                <p>{currentLab.history || "The history of this field represents decades of innovation, starting from fundamental discoveries to modern-day applications that shape our world."}</p>
                
                {!currentLab.history && (
                  <div className="mt-6 w-full h-64 bg-gray-100 border border-gray-300 flex items-center justify-center rounded-lg text-gray-400">
                     <span className="flex items-center gap-2">📸 [Insert Historical Image / Innovation Diagram Here]</span>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </main>
    </>
  );
}
