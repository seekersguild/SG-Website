"use client";

import { useEffect, useRef } from "react";

import { Emblem } from "./Emblem";

/* The Sigil of Seeking: "This compass does not point north. It points to the
   thing you want most in this world." A damped angular spring gives the
   needle magnetic pull and a little settling motion. Only the compass face
   responds: hover on desktop, a tap on touch screens. Reduced motion rests.
   Transforms are written directly, without React updates or inherited variables. */
export function MagneticCompass({
  id,
  className = "",
  emblemClassName = "",
  initialAngle = 32,
}: {
  id: string;
  className?: string;
  emblemClassName?: string;
  initialAngle?: number;
}) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const needle = el?.querySelector<HTMLElement>(".em-needle");
    if (!el || !needle) return;
    const face = el.closest<HTMLElement>("[data-compass-face]") ?? el;
    const section = el.closest<HTMLElement>("section");
    if (!section) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(any-hover: hover) and (any-pointer: fine)");

    let target = initialAngle;
    let current = initialAngle;
    let velocity = 0;
    let frame = 0;
    let lastTime = 0;
    let controlled = false;
    let tap: { id: number; x: number; y: number; started: number } | null = null;

    // Mass 1, stiffness 100, damping 10: a modest overshoot, then rest.
    // Solve the spring analytically so 60 Hz and 120 Hz feel the same.
    const decay = 5;
    const frequency = Math.sqrt(100 - decay * decay);
    const render = () => {
      needle.style.transform = `rotate(${current.toFixed(3)}deg)`;
    };
    const stop = () => {
      tap = null;
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      velocity = 0;
      target = current;
      needle.style.willChange = "";
    };

    const tick = (time: number) => {
      const dt = Math.min(Math.max((time - lastTime) / 1000, 0), 0.064);
      lastTime = time;
      const displacement = current - target;
      const carry = (velocity + decay * displacement) / frequency;
      const fade = Math.exp(-decay * dt);
      const cos = Math.cos(frequency * dt);
      const sin = Math.sin(frequency * dt);
      const wave = displacement * cos + carry * sin;
      const next = fade * wave;
      velocity = fade * (frequency * (carry * cos - displacement * sin) - decay * wave);
      current = target + next;
      if (Math.abs(next) < 0.02 && Math.abs(velocity) < 0.05) {
        current = target;
        render();
        stop();
        return;
      }
      render();
      frame = requestAnimationFrame(tick);
    };

    const attract = (event: PointerEvent) => {
      if (reducedMotion.matches || document.hidden) return;
      const box = face.getBoundingClientRect();
      const x = event.clientX - (box.left + box.width / 2);
      const y = event.clientY - (box.top + box.height / 2);
      const radius = Math.min(box.width, box.height) / 2;
      const distance = Math.hypot(x, y);
      // Ignore the corners and a small area around the pivot, where a tiny
      // pointer movement would otherwise send the needle through half a turn.
      if (distance > radius || distance < radius * 0.08) return;
      if (!controlled) {
        // Interrupt the entrance at its visible angle rather than jumping.
        const matrix = new DOMMatrixReadOnly(getComputedStyle(needle).transform);
        current = (Math.atan2(matrix.b, matrix.a) * 180) / Math.PI;
        needle.style.animation = "none";
        controlled = true;
        render();
      }
      const bearing = (Math.atan2(y, x) * 180) / Math.PI + 90;
      const delta = ((((bearing - current) % 360) + 540) % 360) - 180;
      target = current + delta;
      if (!frame) {
        needle.style.willChange = "transform";
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && hover.matches) attract(event);
    };
    const onDown = (event: PointerEvent) => {
      if (!event.isPrimary) {
        tap = null;
        return;
      }
      if (event.pointerType !== "touch" && event.pointerType !== "pen") return;
      if (reducedMotion.matches || (event.target instanceof Element &&
        event.target.closest("a, button, input, select, textarea, [role='button']"))) return;
      tap = { id: event.pointerId, x: event.clientX, y: event.clientY, started: event.timeStamp };
    };
    const onTouchMove = (event: PointerEvent) => {
      if (tap?.id === event.pointerId && Math.hypot(event.clientX - tap.x, event.clientY - tap.y) > 10) {
        tap = null;
      }
    };
    const onUp = (event: PointerEvent) => {
      const pending = tap;
      if (!pending || pending.id !== event.pointerId) return;
      tap = null;
      if (event.timeStamp - pending.started > 500 ||
        Math.hypot(event.clientX - pending.x, event.clientY - pending.y) > 10) return;
      attract(event);
    };
    const cancelTap = () => { tap = null; };
    const onAdditionalPointer = (event: PointerEvent) => {
      if (tap && event.pointerId !== tap.id) cancelTap();
    };
    const onReducedMotion = () => { if (reducedMotion.matches) stop(); };
    const onVisibility = () => { if (document.hidden) stop(); };

    // Decorative layers pass pointer events through; listen on this section and
    // check the round face's bounds without covering links or blocking scroll.
    section.addEventListener("pointermove", onMove, { passive: true });
    section.addEventListener("pointerdown", onDown, { passive: true });
    // Wait for release: starting a scroll must never tug the needle. No pointer
    // capture or preventDefault, so native scrolling and pinch zoom stay intact.
    window.addEventListener("pointermove", onTouchMove, { passive: true });
    window.addEventListener("pointerdown", onAdditionalPointer, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    window.addEventListener("pointercancel", cancelTap, { passive: true });
    window.addEventListener("scroll", stop, { passive: true, capture: true });
    reducedMotion.addEventListener("change", onReducedMotion);
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("blur", stop);
    return () => {
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onTouchMove);
      window.removeEventListener("pointerdown", onAdditionalPointer);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", cancelTap);
      window.removeEventListener("scroll", stop, true);
      reducedMotion.removeEventListener("change", onReducedMotion);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("blur", stop);
      stop();
    };
  }, [initialAngle]);

  return (
    <div className={`compass ${className}`} ref={wrap} aria-hidden="true">
      <Emblem id={id} className={emblemClassName} needle={initialAngle} />
    </div>
  );
}
