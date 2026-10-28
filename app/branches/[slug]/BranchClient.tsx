"use client";

import React from "react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { allBranches } from "@/data/labsData";

export default function BranchClient({ slug }: { slug: string }) {
  const branch = allBranches.find((b) => b.slug === slug) || allBranches[0];

  return (
    <>
      <PageHeader 
        title={branch.title} 
        breadcrumb={`Branches > ${branch.title}`}
        description={`Explore our comprehensive collection of virtual laboratories for ${branch.title}.`}
      />

      <main className="max-w-[1200px] mx-auto mt-12 px-8 pb-24">
        <div className="bg-white border border-gray-200 shadow-sm w-full">
          <div className="p-4 border-b border-gray-200 bg-gray-50 text-sm text-gray-600 flex justify-between items-center">
            <span>Home &raquo; Broad Areas &raquo; {branch.title}</span>
            <Link href="/labs" className="text-[#0b5c9e] hover:underline font-medium">&larr; Back to All Labs</Link>
          </div>
          <div className="flex flex-col">
            {branch.labs.map((lab, index) => (
              <div key={index} className="border-b border-gray-100 p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-[#004b87] font-semibold text-lg mb-2">{lab.title}</h3>
                    <div className="flex gap-6 text-sm text-gray-500">
                      <span className="text-[#d97706] cursor-pointer hover:underline flex items-center gap-1">Reference Books <span className="text-[10px]">▼</span></span>
                      <span className="text-[#d97706] cursor-pointer hover:underline flex items-center gap-1">Syllabus Mapping <span className="text-[10px]">▼</span></span>
                    </div>
                  </div>
                  <div>
                    <Link href={`/labs/${(lab as any).slug || 'analog-digital-electronics-i'}`} className="inline-block bg-[#0b5c9e] text-white text-sm px-6 py-2 rounded shadow hover:bg-blue-800 transition-colors">
                      Go to Lab
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
