"use client";

import React, { useState } from "react";
import Link from "next/link";
import Reveal from "@/components/Reveal";

export default function Home() {
  const [activeTab, setActiveTab] = useState("objectives");

  const branches = [
    { title: "Electronics & Communications", slug: "electronics", description: "Explore simulation-based labs for analog/digital circuits, signal processing, and 5G networks.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" },
    { title: "Computer Science & Engineering", slug: "computer-science", description: "Access remote labs for programming, data structures, networking, and cloud computing.", image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=800&auto=format&fit=crop" },
    { title: "Mechanical Engineering", slug: "mechanical", description: "Conduct virtual experiments on thermodynamics, fluid mechanics, and robotics.", image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=800&auto=format&fit=crop" },
    { title: "Electrical Engineering", slug: "electrical", description: "Study electrical machines, power systems, and control theory through interactive simulations.", image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=800&auto=format&fit=crop" },
    { title: "Civil Engineering", slug: "civil", description: "Explore structural analysis, surveying, and environmental engineering remotely.", image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop" },
    { title: "Chemical Engineering", slug: "chemical", description: "Simulate chemical reactions, mass transfer, and process control dynamics.", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop" },
  ];

  return (
    <>
      {/* HERO SECTION */}
      <div className="relative w-full h-screen bg-gray-900 flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')" }}></div>
        <div className="relative z-10 max-w-xl mx-6 md:mx-20 bg-black/50 backdrop-blur-sm p-8 md:p-12 border-l-4 border-[#1681b8] shadow-2xl mt-24 md:mt-32">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">Explore the Future of Engineering</h1>
          <p className="text-base md:text-lg text-gray-200 mb-8 leading-relaxed">Discover our world-class Virtual Labs for Electronics & Communication. Conduct remote experiments, access manuals, and learn at your own pace.</p>
          <Link href="/labs" className="inline-block bg-[#1681b8] hover:bg-[#126a96] text-white font-semibold py-3 px-8 rounded-sm transition-colors">Explore Labs &rarr;</Link>
        </div>
      </div>

      {/* TABS SECTION */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-8 pt-12">
          <div className="flex border-b border-gray-200 mb-8">
            <button onClick={() => setActiveTab("objectives")} className={"py-3 px-8 text-sm font-bold uppercase tracking-wider border-b-2 " + (activeTab === "objectives" ? "border-[#1681b8] text-[#1681b8]" : "border-transparent text-gray-500 hover:text-gray-700")}>Objectives</button>
            <button onClick={() => setActiveTab("philosophy")} className={"py-3 px-8 text-sm font-bold uppercase tracking-wider border-b-2 " + (activeTab === "philosophy" ? "border-[#1681b8] text-[#1681b8]" : "border-transparent text-gray-500 hover:text-gray-700")}>The Philosophy</button>
          </div>
          <div className="text-gray-700 text-base leading-relaxed min-h-[200px] pb-12">
            {activeTab === "objectives" ? (
              <div className="space-y-5">
                <p>1. To provide remote-access to simulation-based Labs in various disciplines of Science and Engineering.</p>
                <p>2. To enthuse students to conduct experiments by arousing their curiosity. This would help them in learning basic and advanced concepts through remote experimentation.</p>
                <p>3. To provide a complete Learning Management System around the Virtual Labs where the students/ teachers can avail the various tools for learning.</p>
              </div>
            ) : (
              <div className="space-y-5">
                <p>Good lab facilities and updated lab experiments are critical for any engineering college. Paucity of lab facilities often make it difficult to conduct experiments.</p>
                <p>Yet another objective is to arouse the curiosity of the students and permit them to learn at their own pace. This student-centric approach facilitates the absorption of basic and advanced concepts.</p>
                <p>Virtual labs are any place, any pace, any-time, any-type labs. It is a paradigm shift in student-centric, online education.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BROAD AREAS GRID */}
      <div className="bg-[#f9f9f9] py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <Reveal>
            <div className="mb-10 border-b border-gray-300 pb-4">
              <h2 className="text-3xl font-serif text-gray-900 tracking-tight">Broad Areas of Virtual Labs</h2>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {branches.map((branch, index) => (
              <Reveal key={index} delay={index * 100}>
                <Link href={`/branches/${branch.slug}`}>
                  <div className="group cursor-pointer flex flex-col bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300 h-full">
                    <div className="w-full aspect-[4/3] overflow-hidden">
                      <img src={branch.image} alt={branch.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 flex-grow flex flex-col bg-[#fafafa]">
                      <h3 className="text-xl font-serif text-gray-900 mb-3 group-hover:underline decoration-gray-400 underline-offset-4">{branch.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed flex-grow">{branch.description}</p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
