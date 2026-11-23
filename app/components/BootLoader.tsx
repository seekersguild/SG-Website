"use client";

import { useEffect, useState, type ReactNode } from "react";

/* Hydration is the readiness signal. Never wait for below-fold images or
   an arbitrary minimum duration just to finish the decorative animation. */
export function BootLoader({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let retire = 0;
    const frame = requestAnimationFrame(() => {
      window.dispatchEvent(new Event("guild:ready"));
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setVisible(false);
      } else {
        // This only lets the exit fade finish; the page is already usable.
        retire = window.setTimeout(() => setVisible(false), 240);
      }
    });
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(retire);
    };
  }, []);

  return visible ? children : null;
}
