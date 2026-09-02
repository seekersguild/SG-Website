"use client";

import { useEffect } from "react";

const TALL_SECTION_OFFSET = 72;

export function SmoothAnchors() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const node = event.target;
      if (!(node instanceof Element)) return;

      const anchor = node.closest("a");
      const href = anchor?.getAttribute("href");
      if (!href || href === "#" || !href.startsWith("#")) return;

      const target = document.getElementById(href.slice(1));
      if (!target) return;

      event.preventDefault();

      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (href === "#top") {
        window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
        history.pushState(null, "", href);
        return;
      }

      const rect = target.getBoundingClientRect();
      const viewport = window.innerHeight;
      // Centering only reads well when the section fits on screen. A taller
      // section centred would land mid-paragraph with its heading offscreen,
      // so those align near the top instead.
      const offset =
        rect.height < viewport
          ? (viewport - rect.height) / 2
          : Math.min(TALL_SECTION_OFFSET, viewport * 0.08);

      window.scrollTo({
        top: Math.max(0, rect.top + window.scrollY - offset),
        behavior: reduced ? "auto" : "smooth",
      });

      history.pushState(null, "", href);

      // Keyboard users need focus to follow the scroll, but focusing a
      // non-interactive section would otherwise jump the page a second time.
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
      target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
