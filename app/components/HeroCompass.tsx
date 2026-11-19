"use client";

import { useEffect, useRef } from "react";

import { Emblem } from "./Emblem";

/* The Sigil of Seeking: "This compass does not point north. It points to the
   thing you want most in this world." The needle eases toward the visitor:
   the cursor on desktop, the last tap on touch screens. With reduced motion it rests. The angle is
   written straight onto the needle each frame, so React never re-renders. */
export function HeroCompass({ className = "" }: { className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const needle = el?.querySelector<SVGGElement>(".em-needle");
    if (!el || !needle) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let target = 32;
    let current = 32;
    let frame = 0;

    const tick = () => {
      const delta = ((((target - current) % 360) + 540) % 360) - 180;
      current += delta * 0.08;
      needle.style.setProperty("--needle", `${current.toFixed(2)}deg`);
      frame = Math.abs(delta) > 0.05 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (event: PointerEvent) => {
      const box = el.getBoundingClientRect();
      const x = event.clientX - (box.left + box.width / 2);
      const y = event.clientY - (box.top + box.height / 2);
      target = (Math.atan2(y, x) * 180) / Math.PI + 90;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    // Mouse: follow the cursor. Touch and pen: turn toward wherever the visitor taps.
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") onMove(event);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className={`compass ${className}`} ref={wrap} aria-hidden="true">
      <Emblem className="emblem--hero" needle={32} />
    </div>
  );
}
