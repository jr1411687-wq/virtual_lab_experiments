 "use client";

import { useState, useEffect } from "react";

export default function CopyrightYear() {
  // Start with a safe static fallback
  const [year, setYear] = useState("2026");

  // Only calculate the real year after the component mounts in the browser
  useEffect(() => {
    setYear(new Date().getFullYear().toString());
  }, []);

  return <>{year}</>;
}