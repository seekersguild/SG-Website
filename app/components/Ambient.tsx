"use client";

import { useEffect } from "react";
/* Ring timelines keep running through scrolling, menus and offscreen travel.
   Only a hidden document pauses them; reduced motion is handled in CSS. */
export function Ambient() {
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => root.toggleAttribute("data-ambient-hidden", document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => {
      document.removeEventListener("visibilitychange", sync);
      root.removeAttribute("data-ambient-hidden");
    };
  }, []);
  return null;
}
