"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
/* Ring timelines keep running through scrolling, menus and offscreen travel.
   Only a hidden document pauses them; reduced motion is handled in CSS. */
export function Ambient() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => root.toggleAttribute("data-ambient-hidden", document.hidden);
    sync();
    document.addEventListener("visibilitychange", sync);
    // Fetch each below-fold painting shortly before it enters view. Keep the
    // section's real geometry so anchor measurements and scrolling stay exact.
    const paintings = document.querySelectorAll<HTMLElement>(".band:not(.hero) > .paint, .who__field, .join__field");
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-paint-ready", "");
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "800px 0px" });
    paintings.forEach((painting) => observer.observe(painting));
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      root.removeAttribute("data-ambient-hidden");
    };
  }, [pathname]);
  return null;
}
