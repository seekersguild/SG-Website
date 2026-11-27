"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Section links share one destination rule on every input device. The browser
   owns the smooth scroll; there is no per-frame animation or page transform. */
export function SectionNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;
    let disposed = false;

    const destination = (hash: string) => {
      try {
        const target = document.getElementById(decodeURIComponent(hash.slice(1)));
        if (target?.id === "main" || target?.hasAttribute("data-scroll-target")) return target;
        return target?.closest<HTMLElement>("section.band") ?? null;
      } catch {
        return null;
      }
    };

    const navigate = (target: HTMLElement, focus: boolean) => {
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      // Let React close a mobile menu and release its scroll lock first.
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => {
          if (disposed || !target.isConnected) return;

          if (focus) {
            const heading = target.querySelector<HTMLElement>("h1, h2") ?? target;
            if (!heading.hasAttribute("tabindex")) {
              heading.setAttribute("tabindex", "-1");
              heading.addEventListener("blur", () => heading.removeAttribute("tabindex"), { once: true });
            }
            heading.focus({ preventScroll: true });
          }

          const header = document.querySelector(".site-header__bar")?.getBoundingClientRect().height ?? 0;
          // Long archives can name their opening heading as the landing point.
          const anchor = target.dataset.scrollAnchor ? document.getElementById(target.dataset.scrollAnchor) : null;
          const rect = (anchor ?? target).getBoundingClientRect();
          const position = anchor
            ? scrollY + rect.top - header - 24
            : scrollY + rect.top + rect.height / 2 - (innerHeight + header) / 2;
          const limit = Math.max(0, document.documentElement.scrollHeight - innerHeight);
          const top = target.id === "main" ? 0 : Math.max(0, Math.min(position, limit));
          window.scrollTo({
            top,
            behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
          });
        });
      });
    };

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link || link.classList.contains("skip-link") || link.hasAttribute("download") ||
        (link.target && link.target !== "_self")) return;

      const url = new URL(link.href, location.href);
      if (!url.hash || url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search) return;
      const target = destination(url.hash);
      if (!target) return;

      // Capture prevents both a native anchor jump and Next Link's top alignment.
      // The event still reaches the link's handler, including mobile menu closure.
      event.preventDefault();
      if (location.hash !== url.hash) history.pushState(null, "", url.hash);
      navigate(target, true);
    };

    document.addEventListener("click", onClick, true);
    const initialHash = location.hash;
    const initial = destination(initialHash);
    const alignInitial = () => {
      if (!initial || initial.id === "main") return;
      // Cached hydration can finish before styles have established geometry.
      void document.fonts.ready.then(() => {
        if (!disposed && location.hash === initialHash) navigate(initial, false);
      });
    };
    if (initial && initial.id !== "main") {
      if (document.readyState === "complete") alignInitial();
      else window.addEventListener("load", alignInitial, { once: true });
    }

    return () => {
      disposed = true;
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("load", alignInitial);
    };
  }, [pathname]);

  return null;
}
