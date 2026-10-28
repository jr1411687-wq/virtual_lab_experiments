import React from "react";

export default function AboutUs() {
  return (
    <>
      {/* SUB-HEADER BANNER */}
      <div className="bg-[#0b5c9e] text-white pt-40 pb-12 px-8">
        <div className="max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-blue-200 mb-4 flex gap-2 items-center">
            <span className="hover:text-white cursor-pointer">Home</span>
            <span>›</span>
            <span className="text-white font-medium">About Us</span>
          </div>
          
          {/* Title Area */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <h1 className="text-4xl md:text-5xl font-serif tracking-tight font-normal">
              About VLAB
            </h1>
            <p className="md:w-1/2 text-blue-50 text-base leading-relaxed">
              Learn about the Ministry of Education's initiative to provide remote-access to simulation-based labs in various disciplines of Science and Engineering.
            </p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-[1200px] mx-auto mt-12 px-8 pb-24">
        <div className="bg-white p-8 md:p-12 border border-gray-200 shadow-sm leading-relaxed text-gray-700">
          
          <h2 className="text-2xl text-[#003b5c] font-bold mb-6">Overview</h2>
          
          <p className="mb-4">
            Virtual Labs project is an initiative of Ministry of Education (MoE), Government of India under the aegis of National Mission on Education through Information and Communication Technology (NMEICT). This project is a consortium activity of twelve participating institutes and IIT Delhi is coordinating institute.
          </p>
          <p className="mb-8">
            It is a paradigm shift in ICT-based education. For the first time, such an initiative has been taken-up in remote-experimentation. Under Virtual Labs project, over 175 Virtual Labs consisting of approximately 1590+ web-enabled experiments were designed for remote-operation and viewing.
          </p>

          <p className="mb-4">
            Virtual Labs do not require any additional infrastructural setup for conducting experiments at user premises. The simulations-based experiments can be accessed remotely via internet.
          </p>

          {/* DIAGRAM IMAGE SECTION */}
          <div className="w-full mt-12 flex justify-center border-t border-gray-100 pt-10">
             <img 
               src="/diagram.jpg" 
               alt="Virtual Labs Diagram" 
               className="w-full max-w-3xl h-auto object-contain mix-blend-multiply" 
             />
          </div>

        </div>
      </main>
    </>
  );
}