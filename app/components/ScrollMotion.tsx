"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

/* Wheel notches get a short, damped pull. Precision gestures and touch keep
   the browser's own momentum and edge resistance. No transformed page layer,
   scroll-linked content effects, or animation work while the page is idle. */
function attachMomentum(Controller: typeof Lenis) {
  let frame = 0;
  const interrupt = () => {
    cancelAnimationFrame(frame);
    frame = 0;
    if (scroll.isScrolling === "smooth") {
      scroll.stop();
      scroll.start();
    }
  };
  const tick = (time: number) => {
    scroll.raf(time);
    frame = scroll.isScrolling === "smooth" ? requestAnimationFrame(tick) : 0;
  };
  const scroll = new Controller({
    autoRaf: false,
    lerp: 0.18,
    smoothWheel: true,
    syncTouch: false,
    anchors: false,
    wheelMultiplier: 1,
    virtualScroll: ({ event, deltaX, deltaY }) => {
      const native = !(event instanceof WheelEvent) || event.ctrlKey || event.metaKey || event.shiftKey ||
        Math.abs(deltaX) >= Math.abs(deltaY) ||
        // Small pixel deltas are typically a precision trackpad's own inertia.
        (event.deltaMode === WheelEvent.DOM_DELTA_PIXEL && Math.abs(deltaY) < 50) ||
        (event.target instanceof Element && !!event.target.closest(
          ".mobile-menu, input, textarea, select, [contenteditable], [data-lenis-prevent]",
        )) ||
        (scroll.actualScroll <= 0 && deltaY < 0) ||
        (scroll.actualScroll >= scroll.limit - 1 && deltaY > 0);
      if (native) {
        interrupt();
        return false;
      }
      if (!frame) {
        // Seed the clock before Lenis consumes this event. An idle interval
        // must never become a huge first animation step on the next gesture.
        scroll.raf(performance.now());
        frame = requestAnimationFrame(tick);
      }
      return true;
    },
  });

  // Direct navigation, selection, touch and scrollbar dragging take control
  // immediately. Let the default action run after cancelling wheel momentum.
  window.addEventListener("keydown", interrupt, { capture: true, passive: true });
  window.addEventListener("pointerdown", interrupt, { capture: true, passive: true });
  window.addEventListener("click", interrupt, { capture: true, passive: true });
  window.addEventListener("focusin", interrupt, { capture: true, passive: true });
  window.addEventListener("hashchange", interrupt);
  window.addEventListener("popstate", interrupt);

  return () => {
    interrupt();
    window.removeEventListener("keydown", interrupt, true);
    window.removeEventListener("pointerdown", interrupt, true);
    window.removeEventListener("click", interrupt, true);
    window.removeEventListener("focusin", interrupt, true);
    window.removeEventListener("hashchange", interrupt);
    window.removeEventListener("popstate", interrupt);
    scroll.destroy();
  };
}

export function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const pointer = matchMedia("(any-hover: hover) and (any-pointer: fine)");
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    const connection = (navigator as Navigator & {
      connection?: EventTarget & { saveData?: boolean };
    }).connection;
    let enabled = false;
    let cancelSetup = () => {};

    const sync = () => {
      const next = pointer.matches && motion.matches && !document.hidden && !connection?.saveData &&
        !root.hasAttribute("data-loading") && !root.classList.contains("menu-lock");
      if (next === enabled) return;
      enabled = next;
      cancelSetup();
      if (!enabled) return;

      let cancelled = false;
      let detach = () => {};
      cancelSetup = () => { cancelled = true; detach(); };
      // Touch-only devices never request the controller's separate chunk.
      void import("lenis").then(({ default: Controller }) => {
        if (!cancelled) detach = attachMomentum(Controller);
      }).catch(() => { /* A failed optional chunk leaves native scrolling intact. */ });
    };

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class", "data-loading"] });
    pointer.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    connection?.addEventListener("change", sync);
    sync();

    return () => {
      observer.disconnect();
      pointer.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      connection?.removeEventListener("change", sync);
      cancelSetup();
    };
  }, [pathname]);

  return null;
}
