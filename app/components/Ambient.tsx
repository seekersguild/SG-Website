"use client";

import { useEffect } from "react";

/* Keeps the ambient motion (the compass rings and the motes) out of the way
   of scrolling. Sections that carry it opt in with [data-ambient]:
   - off screen, the section gets [data-still] and its motion pauses;
   - while the page is scrolling, <html> gets [data-scrolling] and all of it
     pauses, resuming a moment after the scroll settles. The rings turn once
     every one to two minutes, so the pause is invisible, but it gives every
     scroll frame to the scroll itself.
   The pausing is CSS (animation-play-state in globals.css). */
export function Ambient() {
  useEffect(() => {
    const root = document.documentElement;
    const sections = document.querySelectorAll<HTMLElement>("[data-ambient]");
    if (!sections.length) return;

    let observer: IntersectionObserver | undefined;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) entry.target.toggleAttribute("data-still", !entry.isIntersecting);
      });
      sections.forEach((el) => observer!.observe(el));
    }

    let settle = 0;
    const onScroll = () => {
      if (!settle) root.setAttribute("data-scrolling", "");
      else clearTimeout(settle);
      settle = window.setTimeout(() => {
        settle = 0;
        root.removeAttribute("data-scrolling");
      }, 200);
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
      clearTimeout(settle);
      root.removeAttribute("data-scrolling");
    };
  }, []);
  return null;
}
