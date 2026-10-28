"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import PageHeader from "@/components/PageHeader";
import { useMap } from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Tooltip = dynamic(() => import("react-leaflet").then((mod) => mod.Tooltip), { ssr: false });

// 🚨 UPDATED IMAGES: Highly accurate professional images for each department
const campusBuildings = [
  { 
    id: "admin", 
    name: "Administration Block", 
    description: "Houses the Principal's office, admissions, and administrative departments.", 
    position: [30.858775, 75.860585],
    // Professional office building
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop",
    address: "Main Campus, Near Gate 1",
    offices: ["Principal's Office (Dr. Sehijpal Singh Khangura)", "Admissions Cell", "Accounts Department", "HR Office"]
  },
  { 
    id: "ece", 
    name: "ECE Department", 
    description: "Established in 1981. The department focuses on VLSI, Communication, and Signal Processing.", 
    position: [30.858154, 75.861610],
    // 🚨 ECE: Circuit board / VLSI chip
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop",
    address: "Academic Block, 2nd Floor",
    offices: ["HOD: Dr. S. S. Gill", "VLSI Lab", "Communication Lab", "Faculty Rooms"]
  },
  { 
    id: "cse", 
    name: "Computer Sc. & Engg.", 
    description: "Established in 1997. Offers UG and PG programs with state-of-the-art computing labs.", 
    position: [30.859795, 75.860174],
    // 🚨 CSE: Code on a screen
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=600&auto=format&fit=crop",
    address: "IT Block, 1st Floor",
    offices: ["HOD: Dr. Parminder Singh", "Programming Lab", "Networking Lab", "Project Room"]
  },
  { 
    id: "it", 
    name: "Information Technology", 
    description: "NBA Accredited. Faculty actively research AI, Machine Learning, IoT, and Cyber Security.", 
    position: [30.860368, 75.860258],
    // 🚨 IT: Server room / networking cables
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
    address: "IT Block, 2nd Floor",
    offices: ["HOD: Dr. K. S. Mann", "Data Science Lab", "Cyber Security Lab"]
  },
  { 
    id: "workshop", 
    name: "Mechanical Workshop", 
    description: "Central workshop for mechanical engineering students. The ME Dept is NBA accredited.", 
    position: [30.858730, 75.861639],
    // 🚨 MECH: Lathe machine / gears
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=600&auto=format&fit=crop",
    address: "Workshop Zone",
    offices: ["HOD: Dr. Sehijpal Singh Khangura", "Machine Shop", "Welding Section", "CAD Lab"]
  },
  { 
    id: "electrical", 
    name: "Electrical Engineering", 
    description: "NBA Accredited. Offers B.Tech and M.Tech (Power) with a strong legacy in the power sector.", 
    position: [30.858561, 75.861206],
    // 🚨 EE: Power lines / Electrical panel
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=600&auto=format&fit=crop",
    address: "Academic Block, Ground Floor",
    offices: ["HOD: Dr. Kanwardeep Singh", "Machines Lab", "Power Systems Lab", "Microcontroller & PLC Lab"]
  },
  { 
    id: "civil", 
    name: "Civil Engineering", 
    description: "A QIP centre for Ph.D. admissions by AICTE. Focuses on Structural and Environmental Engineering.", 
    position: [30.8590, 75.8610],
    // 🚨 CIVIL: Construction site / blueprint
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop",
    address: "Civil Block",
    offices: ["HOD: Dr. J. N. Jha", "Structures Lab", "Surveying Lab", "Environmental Lab"]
  },
  { 
    id: "library", 
    name: "Central Library", 
    description: "A vast collection of engineering, science, and management resources.", 
    position: [30.858240, 75.860417],
    // Library shelves
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=600&auto=format&fit=crop",
    address: "Academic Block Area",
    offices: ["Digital Library Section", "Reference Section", "Reading Hall", "Journal Section"]
  },
  { 
    id: "sports", 
    name: "Sports Complex", 
    description: "Indoor and outdoor sports facilities, including a swimming pool.", 
    position: [30.858663, 75.863278],
    // Gym / Sports equipment
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
    address: "East Campus",
    offices: ["Gymnasium", "Basketball Court", "Swimming Pool", "Sports Office"]
  },
];

function ResizeMap({ containerRef, isFullscreen }: { containerRef: React.RefObject<HTMLDivElement>, isFullscreen: boolean }) {
  const map = useMap();
  useEffect(() => {
    if (!map || !containerRef.current) return;
    const timer = setTimeout(() => { if (typeof map.invalidateSize === 'function') map.invalidateSize(); }, 300);
    const observer = new ResizeObserver(() => { if (map && typeof map.invalidateSize === 'function') map.invalidateSize(); });
    observer.observe(containerRef.current);
    return () => { clearTimeout(timer); observer.disconnect(); };
  }, [map, containerRef, isFullscreen]);
  return null;
}

export default function CampusMapPage() {
  const mapRef = useRef<LeafletMap | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [leafletLoaded, setLeafletLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      });
      setLeafletLoaded(true);
    });
  }, []);

  const handleMapReady = (map: LeafletMap) => { mapRef.current = map; };

  const handleSidebarClick = (building: any) => {
    setSelectedBuilding(building);
    if (mapRef.current) {
      mapRef.current.flyTo(building.position, 18, { duration: 1.5 });
    }
  };

  if (!leafletLoaded) return <div className="pt-48 text-center text-xl font-semibold text-gray-500">Loading Interactive Map...</div>;

  return (
    <>
      {!isFullscreen && (
        <PageHeader title="Campus Map" breadcrumb="Campus Map" description="Explore the GNDEC campus. Click a building in the directory or a marker to view details." />
      )}

      <main className={`w-full max-w-[1600px] mx-auto mt-8 px-4 md:px-8 pb-12 flex gap-6 transition-all duration-300 ${
        isFullscreen ? "fixed inset-0 z-[9999] bg-white mt-0 px-0 pb-0 h-screen max-w-none" : "flex-col md:flex-row h-[calc(100vh-200px)] min-h-[600px]"
      }`}>
        
        {!isFullscreen && (
          <aside className="w-full md:w-1/3 lg:w-1/4 h-full flex flex-col">
            <div className="bg-white border border-gray-200 shadow-md rounded-lg overflow-hidden flex flex-col h-full">
              <div className="bg-[#0b5c9e] text-white p-5">
                <h2 className="text-xl font-bold">Campus Directory</h2>
                <p className="text-sm text-blue-200 mt-1">Click a location to zoom</p>
              </div>
              <ul className="divide-y divide-gray-100 overflow-y-auto flex-grow">
                {campusBuildings.map((building, index) => (
                  <li 
                    key={index} 
                    className={`p-5 hover:bg-blue-50 transition-colors cursor-pointer group ${selectedBuilding?.id === building.id ? 'bg-blue-50 border-l-4 border-[#1681b8]' : ''}`}
                    onClick={() => handleSidebarClick(building)}
                  >
                    <h3 className="font-semibold text-[#003b5c] text-lg group-hover:text-[#1681b8] transition-colors">{building.name}</h3>
                    <p className="text-sm text-gray-500 mt-2 leading-relaxed">{building.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        <div ref={containerRef} className={`relative z-0 transition-all duration-300 ${
          isFullscreen ? "w-full h-full" : "w-full md:w-2/3 lg:w-3/4 h-full rounded-lg overflow-hidden shadow-xl border border-gray-300"
        }`}>
          
          <button 
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="absolute top-4 right-4 z-[1000] bg-white p-2 rounded shadow-md border border-gray-300 hover:bg-gray-100 transition-colors"
          >
            {isFullscreen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            )}
          </button>

          {selectedBuilding && (
            <div className="absolute top-4 left-4 z-[1000] w-[340px] bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200 animate-[fadeIn_0.3s_ease-out]">
              <div className="relative h-48 w-full bg-gray-200">
                <img src={selectedBuilding.image} alt={selectedBuilding.name} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedBuilding(null)}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-black/90 text-white rounded-full p-1.5 transition-colors shadow-lg"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#0b5c9e] mb-2">{selectedBuilding.name}</h3>
                <p className="text-xs text-gray-500 font-medium mb-5 flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  {selectedBuilding.address}
                </p>

                <p className="text-sm text-gray-600 mb-6 leading-relaxed">{selectedBuilding.description}</p>

                <div className="border-t border-gray-100 pt-5">
                  <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-3">Main Offices / Facilities</h4>
                  <ul className="space-y-2.5">
                    {selectedBuilding.offices.map((office: string, idx: number) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-[#1681b8] font-bold mt-0.5">•</span> {office}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          <MapContainer 
            center={[30.8593, 75.8610]} 
            zoom={17} 
            style={{ height: "100%", width: "100%" }}
            ref={handleMapReady} 
            className={isFullscreen ? "" : "rounded-lg"}
          >
            <ResizeMap containerRef={containerRef} isFullscreen={isFullscreen} />

            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              maxZoom={19}
            />
            
            {campusBuildings.map((building, index) => (
              <Marker 
                key={index} 
                position={building.position as [number, number]}
                eventHandlers={{
                  click: () => handleSidebarClick(building),
                }}
              >
                <Tooltip direction="top" offset={[0, -30]} opacity={1}>
                  <span className="font-bold text-[#0b5c9e]">{building.name}</span>
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </div>

      </main>
    </>
  );
}
