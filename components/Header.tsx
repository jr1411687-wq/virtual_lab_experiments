"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/labs?search=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push(`/labs`);
    }
  };

  // 🟢 1. HOME PAGE HEADER
  if (isHome) {
    return (
      <header className="absolute top-0 left-0 w-full z-50 pt-8 pb-12 bg-gradient-to-b from-black/90 via-black/50 to-transparent">
        <div className="w-full px-8 md:px-16 flex flex-col items-start relative">
          <div className="flex items-center mb-4">
            <div className="w-6 md:w-10 h-[2px] bg-white mr-3"></div>
            <h1 className="text-white text-xl md:text-2xl font-bold tracking-[0.22em]">VIRTUAL LABS</h1>
            <div className="w-6 md:w-10 h-[2px] bg-white ml-3"></div>
          </div>
          <nav className="flex flex-wrap gap-6 md:gap-8 text-white text-[10px] md:text-xs font-semibold tracking-widest uppercase">
            <Link href="/" className="hover:text-[#1681b8] transition-colors">HOME</Link>
            <Link href="/about" className="hover:text-[#1681b8] transition-colors">ABOUT US</Link>
            <Link href="/labs" className="hover:text-[#1681b8] transition-colors">LABS</Link>
            <Link href="#" className="hover:text-[#1681b8] transition-colors">OUTREACH PORTAL</Link>
            <Link href="/contact" className="hover:text-[#1681b8] transition-colors">CONTACT US</Link>
          </nav>
          <div className="absolute top-0 right-8 md:right-16 hidden md:block">
            <form onSubmit={handleSearch} className="flex items-center bg-black/40 border border-white/20 rounded-full w-[240px] overflow-hidden backdrop-blur-sm">
              <input 
                type="text" 
                placeholder="Search Labs..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white px-4 py-2 text-xs focus:outline-none w-full placeholder-white/60" 
              />
              <button type="submit" className="px-4 text-white/60 hover:text-white cursor-pointer transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </form>
          </div>
        </div>
      </header>
    );
  }

  // 🔵 2. OTHER PAGES HEADER
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0b5c9e] shadow-lg border-b border-blue-900/20">
      <div className="w-full max-w-[1600px] mx-auto px-6 py-3 flex justify-between items-center">
        
        {/* Left: Logos */}
        <div className="flex items-center gap-6 z-10">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="border-[2px] border-white p-1.5 rounded-sm group-hover:bg-white/10 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
            </div>
            <span className="text-white text-sm font-bold tracking-widest uppercase hidden lg:block">Virtual Labs</span>
          </Link>
          <div className="h-8 w-[1px] bg-white/30 hidden md:block"></div>
          <div className="flex items-center gap-3">
             <img src="/labs.jpg" alt="College Logo" className="h-8 w-8 md:h-10 md:w-auto object-contain rounded-sm" />
             <div className="hidden md:flex flex-col">
               <span className="text-white font-bold text-[13px] leading-tight tracking-wide">Guru Nanak Dev</span>
               <span className="text-white font-bold text-[13px] leading-tight tracking-wide">Engineering College</span>
             </div>
          </div>
        </div>

        {/* Right: Nav & Search */}
        <div className="flex items-center gap-6 z-10">
          <nav className="hidden md:flex gap-6 text-white text-[11px] font-semibold tracking-wide uppercase">
            <Link href="/" className="hover:text-blue-200 transition-colors">Home</Link>
            <Link href="/about" className="hover:text-blue-200 transition-colors">About Us</Link>
            <Link href="/labs" className="hover:text-blue-200 transition-colors">Labs</Link>
            <Link href="/contact" className="hover:text-blue-200 transition-colors">Contact Us</Link>
          </nav>
          
          <form onSubmit={handleSearch} className="hidden lg:flex items-center bg-white/10 border border-white/20 rounded-full w-[200px] overflow-hidden">
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-white px-3 py-1.5 text-xs focus:outline-none w-full placeholder-white/60" 
            />
            <button type="submit" className="px-3 text-white/60 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
