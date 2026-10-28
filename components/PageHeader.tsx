import React from "react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  breadcrumb: string;
  description?: string;
}

export default function PageHeader({ title, breadcrumb, description }: PageHeaderProps) {
  return (
    <div className="bg-[#0b5c9e] text-white pt-32 pb-16">
      <div className="max-w-[1200px] mx-auto px-8">
        
        {/* Breadcrumbs */}
        <div className="text-sm text-blue-200 mb-8 flex gap-2 items-center">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>›</span>
          <span className="text-white font-medium">{breadcrumb}</span>
        </div>

        {/* Title and Description */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <h1 className="text-4xl md:text-5xl font-serif tracking-tight font-normal">
            {title}
          </h1>
          
          {description && (
            <p className="md:w-1/2 text-blue-50 text-base leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
