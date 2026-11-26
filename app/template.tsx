"use client";

import { useEffect, useLayoutEffect, type ReactNode } from "react";

/* The first page is revealed by the loader; only later page switches fade. */
let navigated = false;

/* A template remounts on every page change, so each new page:
   - starts at the very top, before it is painted (no visible jump or glide
     from the old scroll position), unless the link points at a section, and
   - eases in with a short rise and fade, which hides the content swap.
   The header and footer live in the layout and stay put. */
export default function Template({ children }: { children: ReactNode }) {
  const animate = navigated;

  useLayoutEffect(() => {
    if (navigated && !window.location.hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    navigated = true;
  }, []);

  return <div className={animate ? "page-enter page-enter--in" : "page-enter"}>{children}</div>;
}
