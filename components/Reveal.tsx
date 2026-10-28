"use client";
import { useEffect, useRef, useState } from "react";

export default function Reveal({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop watching once it appears
        }
      },
      { threshold: 0.1 } // Triggers when 10% of the element is visible
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={isVisible ? "reveal-play" : "reveal-hidden"}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}