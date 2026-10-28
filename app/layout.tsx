import { Suspense } from "react";
import "./globals.css";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f5f5f5] font-sans text-sm flex flex-col">
        
        {/* 🚨 The Suspense wrapper prevents the usePathname prerender error */}
        <Suspense fallback={<div className="h-[88px] bg-[#0b5c9e] w-full absolute top-0 left-0 z-50"></div>}>
          <Header />
        </Suspense>

        {/* PAGE CONTENT */}
        <main className="flex-grow">
          {children}
        </main>

        {/* FOOTER */}
        <Footer />
        
      </body>
    </html>
  );
}
