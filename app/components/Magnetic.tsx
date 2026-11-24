"use client";

import { useEffect } from "react";

/* Buttons and the main links lean toward the cursor and spring back when it
   leaves, on the compass's own spring curve. Mouse and trackpad only, never
   with reduced motion; one passive listener, at most one style write per frame,
   and only the translate property moves, so nothing is laid out again. */
const TARGETS = ".button, .site-nav a, .wordmark, .close__social a, .footer__links a";
const PULL = 0.28; // share of the cursor's offset from the centre
const REACH = 9; // most a target moves, in pixels

export function Magnetic() {
  useEffect(() => {
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    let active: HTMLElement | null = null;
    let frame = 0;
    let last: PointerEvent | null = null;

    const release = () => {
      if (!active) return;
      active.removeAttribute("data-magnet");
      active.style.removeProperty("--mx");
      active.style.removeProperty("--my");
      active = null;
    };

    const apply = () => {
      frame = 0;
      const event = last;
      if (!event) return;
      const target = (event.target as Element | null)?.closest<HTMLElement>(TARGETS) ?? null;
      if (target !== active) {
        release();
        active = target;
        active?.setAttribute("data-magnet", "");
      }
      if (!active) return;
      const box = active.getBoundingClientRect();
      const clamp = (v: number) => Math.max(-REACH, Math.min(REACH, v));
      active.style.setProperty("--mx", `${clamp((event.clientX - box.left - box.width / 2) * PULL).toFixed(2)}px`);
      active.style.setProperty("--my", `${clamp((event.clientY - box.top - box.height / 2) * PULL).toFixed(2)}px`);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      last = event;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => {
      last = null;
      release();
    };

    let attached = false;
    const sync = () => {
      const on = fine.matches && motion.matches;
      if (on === attached) return;
      attached = on;
      if (on) {
        document.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerleave", onLeave);
        window.addEventListener("blur", onLeave);
      } else {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerleave", onLeave);
        window.removeEventListener("blur", onLeave);
        cancelAnimationFrame(frame);
        frame = 0;
        onLeave();
      }
    };

    fine.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    sync();
    return () => {
      fine.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      cancelAnimationFrame(frame);
      onLeave();
    };
  }, []);

  return null;
}
