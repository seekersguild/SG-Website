"use client";

import { useEffect, useState } from "react";

/* Dots under a swipeable row of cards (phones and portrait tablets only; the
   CSS hides them on desktop, where the cards sit in a grid). The active dot
   follows the scroll, and each dot scrolls its card into view. */
export function RailDots({ target, count, label }: { target: string; count: number; label: string }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const rail = document.getElementById(target);
    if (!rail) return;
    const items = [...rail.children] as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(items.indexOf(entry.target as HTMLElement));
        }
      },
      { root: rail, threshold: 0.6 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [target]);

  const go = (index: number) => {
    const rail = document.getElementById(target);
    const item = rail?.children[index] as HTMLElement | undefined;
    if (!rail || !item) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.scrollTo({ left: item.offsetLeft - rail.offsetLeft - parseFloat(getComputedStyle(rail).paddingLeft), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div className="rail-dots" role="group" aria-label={label}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          className="rail-dots__dot"
          aria-label={`Show ${i + 1} of ${count}`}
          aria-current={i === active ? "true" : undefined}
          onClick={() => go(i)}
        />
      ))}
    </div>
  );
}
