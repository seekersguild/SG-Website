"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";

/* One continuous damped pull for wheel and touch, independent of viewport size.
   Touch follows the finger before coasting on release. The document remains
   the scroll surface; there is no transformed wrapper or idle animation loop. */
function attachMomentum(Controller: typeof Lenis) {
  let frame = 0;
  let touchGesture: "pending" | "smooth" | "native" = "pending";
  let touchPosition = 0;
  let touchDelta = 0;
  let touchSamples: { at: number; position: number }[] = [];
  let wheelDirection = 0;
  const nativeTarget = (event: Event) => event.target instanceof Element && !!event.target.closest(
    ".mobile-menu, input, textarea, select, [contenteditable], [data-lenis-prevent]",
  );
  const interrupt = () => {
    wheelDirection = 0;
    cancelAnimationFrame(frame);
    frame = 0;
    if (scroll.isScrolling === "smooth") {
      scroll.stop();
      scroll.start();
    }
  };
  const tick = () => {
    // RAF's timestamp can precede the event that woke us. Use the same
    // monotonic clock for seeding and advancing, never a negative delta.
    scroll.raf(performance.now());
    frame = scroll.isScrolling === "smooth" ? requestAnimationFrame(tick) : 0;
  };
  const wake = () => {
    if (frame) return;
    scroll.raf(performance.now());
    frame = requestAnimationFrame(tick);
  };
  const scroll = new Controller({
    autoRaf: false,
    // About 145ms of exponential decay: enough glide to join wheel notches
    // without the long, delayed tail that makes precise input feel detached.
    lerp: 0.115,
    smoothWheel: true,
    // Touch movement is written once per input event below. Only its release
    // uses an animation loop, avoiding interpolation work between drag events.
    syncTouch: false,
    anchors: false,
    wheelMultiplier: 1,
    touchMultiplier: 1,
    virtualScroll: ({ event, deltaX, deltaY }) => {
      const touch = event.type.startsWith("touch") ? event as TouchEvent : null;
      const zooming = (window.visualViewport?.scale ?? 1) > 1.01;
      const atEdge = (scroll.actualScroll <= 0 && deltaY < 0) ||
        (scroll.actualScroll >= scroll.limit - 1 && deltaY > 0);

      if (touch) {
        if (touch.type === "touchstart") {
          interrupt();
          // A native anchor or scrollbar can move between gestures. Begin
          // at the visible position, never at a cached wheel destination.
          scroll.scrollTo(scroll.actualScroll, { immediate: true });
          touchGesture = touch.touches.length > 1 || zooming || nativeTarget(event) ? "native" : "pending";
          touchPosition = touchDelta = 0;
          touchSamples = [{ at: performance.now(), position: 0 }];
          return touchGesture !== "native";
        }
        // Once a gesture belongs to zoom, a rail or the browser's edge
        // bounce, keep it native until the next gesture, including release.
        if (touch.touches.length > 1 || zooming) touchGesture = "native";
        if (touchGesture === "pending" && touch.type === "touchmove" && (deltaX || deltaY)) {
          touchGesture = Math.abs(deltaX) >= Math.abs(deltaY) || atEdge ? "native" : "smooth";
        }
        if (touchGesture !== "smooth") {
          interrupt();
          return false;
        }
        const now = performance.now();
        if (touch.type === "touchmove") {
          // Measure the gesture itself, not pixels moved in the last render
          // frame: that velocity can already be zero when a finger lifts.
          if (deltaY && Math.sign(deltaY) !== Math.sign(touchDelta)) touchSamples = touchSamples.slice(-1);
          touchDelta = deltaY;
          touchPosition += deltaY;
          touchSamples.push({ at: now, position: touchPosition });
          while (touchSamples.length > 2 && touchSamples[1].at < now - 100) touchSamples.shift();
          if (event.cancelable) event.preventDefault();
          scroll.scrollTo(scroll.targetScroll + deltaY, { immediate: true, programmatic: false });
          return false;
        } else if (touch.type === "touchend") {
          const first = touchSamples[0];
          const last = touchSamples[touchSamples.length - 1];
          const paused = last ? now - last.at : Infinity;
          const velocity = first && last && now - last.at < 80
            ? ((last.position - first.position) / Math.max(8, last.at - first.at)) * Math.exp(-paused / 50) : 0;
          // Exponential coast: distance = release velocity * decay time.
          // If a fast flick hits the distance cap, shorten the decay time too,
          // preserving its release speed instead of slamming on the brakes.
          const cap = Math.max(600, window.innerHeight * 1.4);
          const carry = Math.max(-cap, Math.min(cap, velocity * 240));
          if (Math.abs(carry) > 1) {
            // Prime the idle clock before starting the animation. Otherwise
            // the first RAF includes time spent dragging and jumps ahead.
            wake();
            scroll.scrollTo(scroll.targetScroll + carry, {
              lerp: 1000 / (60 * Math.abs(carry / velocity)),
              programmatic: false,
            });
          }
          return false;
        }
        wake();
        return true;
      }

      // Zero-delta events at the end of a trackpad gesture must not cut off
      // the movement already in flight.
      if (!deltaX && !deltaY) return false;
      const native = event.ctrlKey || event.metaKey || event.shiftKey || zooming ||
        Math.abs(deltaX) >= Math.abs(deltaY) || nativeTarget(event) || atEdge;
      if (native) {
        interrupt();
        return false;
      }
      const direction = Math.sign(deltaY);
      if (wheelDirection && direction !== wheelDirection) {
        // Drop the old destination, not the visible position. A reverse
        // gesture should never have to consume the previous gesture's queue.
        scroll.scrollTo(scroll.actualScroll, { immediate: true });
      }
      wheelDirection = direction;
      // Never switch controllers just because a gesture's deltas get smaller.
      wake();
      return true;
    },
  });
  const cancelTouch = () => {
    touchGesture = "native";
    touchSamples = [];
    interrupt();
  };

  // Direct navigation, selection, touch and scrollbar dragging take control
  // immediately. Let the default action run after cancelling wheel momentum.
  window.addEventListener("keydown", interrupt, { capture: true, passive: true });
  window.addEventListener("pointerdown", interrupt, { capture: true, passive: true });
  window.addEventListener("click", interrupt, { capture: true, passive: true });
  window.addEventListener("focusin", interrupt, { capture: true, passive: true });
  window.addEventListener("hashchange", interrupt);
  window.addEventListener("popstate", interrupt);
  window.addEventListener("touchcancel", cancelTouch, { passive: true });

  return () => {
    interrupt();
    window.removeEventListener("keydown", interrupt, true);
    window.removeEventListener("pointerdown", interrupt, true);
    window.removeEventListener("click", interrupt, true);
    window.removeEventListener("focusin", interrupt, true);
    window.removeEventListener("hashchange", interrupt);
    window.removeEventListener("popstate", interrupt);
    window.removeEventListener("touchcancel", cancelTouch);
    scroll.destroy();
  };
}

export function ScrollMotion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    const connection = (navigator as Navigator & {
      connection?: EventTarget & { saveData?: boolean };
    }).connection;
    let enabled = false;
    let cancelSetup = () => {};

    const sync = () => {
      const next = motion.matches && !document.hidden && !connection?.saveData &&
        !root.hasAttribute("data-loading") && !root.classList.contains("menu-lock");
      if (next === enabled) return;
      enabled = next;
      cancelSetup();
      if (!enabled) return;

      let cancelled = false;
      let detach = () => {};
      cancelSetup = () => { cancelled = true; detach(); };
      // Load after the cover clears on every input type, including hybrids.
      void import("lenis").then(({ default: Controller }) => {
        if (!cancelled) detach = attachMomentum(Controller);
      }).catch(() => { /* A failed optional chunk leaves native scrolling intact. */ });
    };

    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class", "data-loading"] });
    motion.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    connection?.addEventListener("change", sync);
    sync();

    return () => {
      observer.disconnect();
      motion.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
      connection?.removeEventListener("change", sync);
      cancelSetup();
    };
  }, [pathname]);

  return null;
}
