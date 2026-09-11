"use client";

import { useEffect } from "react";

const SECTION_IDS = ["mission", "vision", "pillars", "culture"];

/* Highlights the primary nav link for the section currently in view.
   The observer band sits around the upper third of the viewport so the
   active link follows what the visitor is actually reading. */
export function ScrollSpy() {
  useEffect(() => {
    const links = new Map(
      SECTION_IDS.map((id) => [
        id,
        document.querySelector(`.nav-menu a[href="#${id}"]`),
      ]),
    );

    function setActive(id: string | null) {
      for (const [sectionId, link] of links) {
        if (!link) continue;
        if (sectionId === id) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      }
    }

    /* Track ratios for every section: a callback batch only carries
       changed entries, so judging from `entries` alone drops sections
       that are still in view and wrongly clears the active link. */
    const ratios = new Map(SECTION_IDS.map((id) => [id, 0]));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(
            (entry.target as HTMLElement).id,
            entry.isIntersecting ? entry.intersectionRatio : 0,
          );
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        setActive(bestRatio > 0 ? best : null);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    for (const id of SECTION_IDS) {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
