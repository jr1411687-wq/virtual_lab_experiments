import Link from "next/link";
import React from "react";
import CopyrightYear from "./CopyrightYear";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-gray-300 pt-16 pb-8 border-t-4 border-[#1681b8]">
      <div className="max-w-[1400px] mx-auto px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 mb-12">
          
          <div className="lg:col-span-2 flex flex-col items-start pr-4">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="/labs.jpg" 
                alt="GNDEC Logo" 
                className="h-16 w-16 md:h-20 md:w-20 object-contain bg-white rounded-full p-1" 
              />
              <div>
                <h2 className="text-white font-bold text-xl md:text-2xl leading-tight">
                  Guru Nanak Dev<br />Engineering College
                </h2>
                <p className="text-[#1681b8] text-xs font-semibold tracking-wider uppercase mt-1">
                  Ludhiana, Punjab
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed mt-2 text-justify">
              An autonomous college affiliated to I.K. Gujral Punjab Technical University, committed to providing quality technical education and fostering innovation through Virtual Labs.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Virtual Labs</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/about#objectives" className="hover:text-white transition-colors">Objectives</Link></li>
              <li><Link href="/about#philosophy" className="hover:text-white transition-colors">The Philosophy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="/labs" className="hover:text-white transition-colors">All Labs</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Outreach Portal</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Participating Institutes</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">NMEICT</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">College Details</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="https://gndec.ac.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:underline">
                  GNDEC Main Website
                </a>
              </li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li>
                <a href="https://ece.gndec.ac.in/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors hover:underline">
                  ECE Department
                </a>
              </li>
              {/* 🚨 FIXED: Link to the new Campus Map page */}
              <li><Link href="/campus-map" className="hover:text-white transition-colors">Campus Map</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Get in Touch</h4>
            <address className="not-italic text-sm text-gray-400 space-y-3">
              <p>Gill Park, Gill Road, Ludhiana, Punjab - 141006</p>
              <p>
                <span className="block text-gray-500 text-xs uppercase mb-1">Email</span>
                <a href="mailto:ece@gndec.ac.in" className="hover:text-white transition-colors text-[#1681b8]">ece@gndec.ac.in</a>
              </p>
            </address>
          </div>

        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">
            &copy; <CopyrightYear /> Guru Nanak Dev Engineering College. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors bg-gray-800 p-2 rounded-full hover:bg-[#1681b8]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors bg-gray-800 p-2 rounded-full hover:bg-[#1681b8]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors bg-gray-800 p-2 rounded-full hover:bg-[#1681b8]">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2A29.3 29.3 0 0 0 1 11.75a29.3 29.3 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2 29.3 29.3 0 0 0 .46-5.33 29.3 29.3 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
