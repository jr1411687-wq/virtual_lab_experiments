import React from "react";
import PageHeader from "@/components/PageHeader";

export default function ContactUs() {
  return (
    <>
      <PageHeader 
        title="Contact Us" 
        breadcrumb="Contact"
        description="Have questions about the Virtual Labs initiative or need technical assistance? Get in touch with our team."
      />

      <main className="max-w-[1200px] mx-auto mt-12 px-8 pb-24">
        {/* Container for both text and map */}
        <div className="bg-white border border-gray-200 shadow-sm flex flex-col lg:flex-row">
          
          {/* LEFT SIDE: Contact Details */}
          <div className="w-full lg:w-1/2 p-8 md:p-12 text-gray-700">
            <h2 className="text-2xl text-[#0b5c9e] font-bold mb-6">Get in Touch</h2>
            
            <div className="space-y-6 text-sm leading-relaxed">
              <div>
                <p className="font-bold text-gray-900">Guru Nanak Dev Engineering College</p>
                <p>Gill Park, Gill Road, Ludhiana, Punjab - 141006, India</p>
              </div>
              
              <div className="pt-4 border-t border-gray-100">
                <p className="font-bold text-gray-900 mb-1">Department of Electronics & Communication Engineering</p>
                <p>Head of Department: Dr. Munish Rattan</p>
                <p>Email: <a href="mailto:ece@gndec.ac.in" className="text-[#1681b8] hover:underline">ece@gndec.ac.in</a></p>
                <p>Phone: +91-0161-5064501</p>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <p className="font-bold text-gray-900 mb-1">General Enquiries</p>
                <p>Email: <a href="mailto:principal@gndec.ac.in" className="text-[#1681b8] hover:underline">principal@gndec.ac.in</a></p>
                <p>Phone: +91-0161-5064501</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Google Map */}
          <div className="w-full lg:w-1/2 min-h-[400px] relative bg-gray-100">
            <iframe 
              // 🚨 This URL embeds the map for GNDEC Ludhiana
              src="https://maps.google.com/maps?q=Guru%20Nanak%20Dev%20Engineering%20College,%20Ludhiana&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0, position: 'absolute', top: 0, left: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="GNDEC Location Map"
            ></iframe>
          </div>

        </div>
      </main>
    </>
  );
}
