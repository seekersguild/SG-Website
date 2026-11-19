"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/* One observer for the whole site. Anything marked [data-reveal] rises in
   once as it enters; children marked [data-reveal-item] follow in a short
   stagger. The hidden state only exists under html.js and
   prefers-reduced-motion: no-preference (see globals.css), so content is
   never lost if this never runs. */
export function Reveal() {
  const pathname = usePathname();

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          el.querySelectorAll<HTMLElement>("[data-reveal-item]").forEach((item, index) => {
            item.style.setProperty("--reveal-delay", `${Math.min(index, 4) * 80}ms`);
          });
          el.classList.add("is-in");
          observer.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
