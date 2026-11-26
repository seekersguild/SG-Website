"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/* Keep event data server-rendered; only the dock's visibility needs JS. */
export function GatheringBarMotion({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [footerVisible, setFooterVisible] = useState(false);
  const footerInView = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const interacting = useRef(false);

  const clearTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  }, []);
  const hideAfterPause = useCallback(() => {
    clearTimer();
    if (!interacting.current) timer.current = setTimeout(() => setVisible(false), 1800);
  }, [clearTimer]);
  const reveal = useCallback(() => {
    if (footerInView.current) return;
    setVisible(true);
    hideAfterPause();
  }, [hideAfterPause]);

  useEffect(() => {
    const footer = document.querySelector(".site-footer");
    const updateFooter = (inView: boolean) => {
      footerInView.current = inView;
      setFooterVisible(inView);
      if (inView) {
        interacting.current = false;
        clearTimer();
        setVisible(false);
      } else {
        reveal();
      }
    };
    const observer = new IntersectionObserver(([entry]) => updateFooter(entry.isIntersecting));
    if (footer) {
      const bounds = footer.getBoundingClientRect();
      updateFooter(bounds.top < window.innerHeight && bounds.bottom > 0);
      observer.observe(footer);
    }
    hideAfterPause();
    // A narrow bottom-edge target recreates a taskbar without covering content.
    const edge = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.clientY >= window.innerHeight - 12) reveal();
    };
    window.addEventListener("scroll", reveal, { passive: true });
    window.addEventListener("pointermove", edge, { passive: true });
    return () => {
      clearTimer();
      observer.disconnect();
      window.removeEventListener("scroll", reveal);
      window.removeEventListener("pointermove", edge);
    };
  }, [clearTimer, hideAfterPause, reveal]);

  return (
    <aside
      className="gathering-bar"
      aria-label="Next gathering"
      data-visible={visible ? "" : undefined}
      data-footer-visible={footerVisible ? "" : undefined}
      inert={footerVisible}
      aria-hidden={footerVisible || undefined}
      onPointerEnter={(event) => {
        if (event.pointerType !== "mouse") return;
        interacting.current = true;
        clearTimer();
        setVisible(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType !== "mouse") return;
        interacting.current = false;
        hideAfterPause();
      }}
      onFocus={() => {
        interacting.current = true;
        clearTimer();
        setVisible(true);
      }}
      onBlur={(event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;
        interacting.current = false;
        hideAfterPause();
      }}
    >
      {children}
    </aside>
  );
}
