"use client";

import { useState, useEffect } from "react";

export function useMobile(breakpoint = 1400) {
  const [isMobile, setIsMobile] = useState(false); // Always false on SSR

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkIsMobile();

    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, [breakpoint]);

  return isMobile;
}
