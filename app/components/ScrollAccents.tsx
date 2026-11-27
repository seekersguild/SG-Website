"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Touch and compact layouts borrow the existing hover accents while an item's
   centre is near the middle of the screen. Observers change only boundary state;
   content never waits for an animation and scrolling needs no frame handler. */
const targets = [
  ".programme", ".event-row", ".faq__q",
  ".close__social a",
  ".footer__links a", ".footer__legal a",
].join(",");

export function ScrollAccents() {
  const pathname = usePathname();

  useEffect(() => {
    const compact = matchMedia("(max-width: 1100px), (hover: none), (any-pointer: coarse)");
    let observers: IntersectionObserver[] = [];
    const states = new Map<HTMLElement, { upper: boolean; lower: boolean }>();
    let revision = 0;
    let resizeTimer: ReturnType<typeof setTimeout>;

    const clear = () => {
      revision++;
      observers.forEach((observer) => observer.disconnect());
      observers = [];
      states.forEach((_, element) => element.removeAttribute("data-scroll-active"));
      states.clear();
    };
    const sync = () => {
      clear();
      if (!compact.matches) return;
      const currentRevision = revision;
      document.querySelectorAll<HTMLElement>(targets).forEach((element) => {
        if (!element.closest(".site-header, .join-dock, .button, button, [role='button']")) {
          states.set(element, { upper: false, lower: false });
        }
      });
      // IO percentage margins use width. Pixels keep the middle 10% of the
      // viewport accurate in portrait, landscape and wide tablet layouts.
      const inset = Math.round(innerHeight * 0.45);
      const reach = Math.max(innerHeight, document.documentElement.scrollHeight);
      // Half the item must cross each boundary. Extending the other edge
      // beyond the page makes this true for tall cards as well as short links.
      // Both conditions hold only while the item's centre is at 45–55% height.
      const watch = (side: "upper" | "lower", rootMargin: string) => {
        const view = new IntersectionObserver((entries) => {
          if (!compact.matches || revision !== currentRevision) return;
          for (const entry of entries) {
            const element = entry.target as HTMLElement;
            const state = states.get(element);
            if (!state) continue;
            state[side] = entry.isIntersecting && entry.intersectionRatio >= 0.5;
            element.toggleAttribute("data-scroll-active", state.upper && state.lower);
          }
        }, { rootMargin, threshold: 0.5 });
        states.forEach((_, element) => view.observe(element));
        return view;
      };
      observers = [
        watch("upper", `${reach}px 0px -${inset}px 0px`),
        watch("lower", `-${inset}px 0px ${reach}px 0px`),
      ];
    };
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(sync, 120);
    };

    compact.addEventListener("change", sync);
    window.addEventListener("resize", onResize, { passive: true });
    sync();
    return () => {
      clearTimeout(resizeTimer);
      compact.removeEventListener("change", sync);
      window.removeEventListener("resize", onResize);
      clear();
    };
  }, [pathname]);

  return null;
}
