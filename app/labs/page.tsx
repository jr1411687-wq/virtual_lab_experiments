"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { allBranches } from "@/data/labsData";

function LabsLibrary() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("search") || "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Flatten all labs into one big array for the library
  const allLabs = allBranches.flatMap((branch) => 
    branch.labs.map((lab) => ({
      ...lab,
      branchName: branch.title,
      branchSlug: branch.slug,
      // Ensure every lab has a slug fallback
      slug: (lab as any).slug || "analog-digital-electronics-i" 
    }))
  );

  // Filter labs based on search query
  const filteredLabs = allLabs.filter((lab) =>
    lab.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lab.branchName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <PageHeader 
        title="All Virtual Labs" 
        breadcrumb="Labs Library"
        description="Search and explore our comprehensive collection of virtual laboratories across all engineering branches."
      />

      <main className="max-w-[1200px] mx-auto mt-12 px-8 pb-24">
        
        {/* Search Info Bar */}
        <div className="mb-6 flex justify-between items-center bg-gray-100 p-4 rounded border border-gray-200">
          <p className="text-gray-700 font-medium">
            Showing {filteredLabs.length} subjects {searchQuery && `for "${searchQuery}"`}
          </p>
          {searchQuery && (
             <button onClick={() => setSearchQuery("")} className="text-sm text-[#0b5c9e] hover:underline">
               Clear Search
             </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLabs.map((lab, index) => (
            <Reveal key={index} delay={index * 50}>
              <div className="bg-white border border-gray-200 p-6 flex flex-col h-full hover:shadow-md transition-shadow relative">
                
                {/* Clickable Branch Badge */}
                <Link 
                  href={`/branches/${lab.branchSlug}`}
                  className="inline-block bg-blue-50 text-[#0b5c9e] text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded mb-3 hover:bg-blue-100 transition-colors w-fit"
                >
                  {lab.branchName}
                </Link>

                <h3 className="text-lg font-semibold text-[#003b5c] mb-3">{lab.title}</h3>
                <p className="text-sm text-gray-600 mb-6 flex-grow">{lab.desc}</p>
                
                {/* 🚨 FIXED: Changed from <button> to <Link> */}
                <Link 
                  href={`/labs/${lab.slug}`} 
                  className="w-full block text-center bg-[#0b5c9e] text-white py-2 text-sm font-medium hover:bg-blue-800 transition-colors"
                >
                  Go to Lab
                </Link>
              </div>
            </Reveal>
          ))}
        </div>

        {filteredLabs.length === 0 && (
          <div className="text-center py-20 bg-white border border-gray-200">
            <h3 className="text-xl font-bold text-gray-700 mb-2">No labs found</h3>
            <p className="text-gray-500">Try searching for something else like "Electronics" or "5G".</p>
          </div>
        )}
      </main>
    </>
  );
}

export default function LabsPage() {
  return (
    <Suspense fallback={<div className="pt-48 text-center">Loading library...</div>}>
      <LabsLibrary />
    </Suspense>
  );
}
