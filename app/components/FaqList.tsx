"use client";

import { useEffect, useRef } from "react";

type Faq = { q: string; a: string };

const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

/* Native <details> questions whose height glides open and shut. The element
   stays a real <details>, so it works without script, with find-in-page and
   with the keyboard; script only animates the change in height. */
export function FaqList({ items }: { items: Faq[] }) {
  const list = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = list.current;
    if (!root) return;
    const motion = matchMedia("(prefers-reduced-motion: no-preference)");
    const running = new WeakMap<HTMLDetailsElement, Animation>();

    const onClick = (event: MouseEvent) => {
      const summary = (event.target as Element).closest("summary");
      const item = summary?.parentElement;
      if (!summary || !(item instanceof HTMLDetailsElement) || !root.contains(item) || !motion.matches) return;
      event.preventDefault();

      const answer = item.querySelector<HTMLElement>(".faq__a");
      const from = item.offsetHeight;
      running.get(item)?.cancel();
      const opening = !item.open || item.dataset.closing === "true";
      delete item.dataset.closing;

      if (opening) item.open = true;
      const closed = summary.offsetHeight + parseFloat(getComputedStyle(item).borderBottomWidth);
      const to = opening ? item.scrollHeight + parseFloat(getComputedStyle(item).borderBottomWidth) : closed;
      if (!opening) item.dataset.closing = "true";

      const distance = Math.abs(to - from);
      const duration = Math.min(520, Math.max(260, distance * 1.4));
      item.style.overflow = "hidden";
      const anim = item.animate({ height: [`${from}px`, `${to}px`] }, { duration, easing: EASE });
      answer?.animate(
        opening
          ? { opacity: [0, 1], transform: ["translateY(-6px)", "translateY(0)"] }
          : { opacity: [1, 0] },
        { duration: opening ? duration : duration * 0.6, easing: EASE, fill: "both" },
      );
      running.set(item, anim);
      anim.onfinish = () => {
        if (!opening) item.open = false;
        delete item.dataset.closing;
        item.style.overflow = "";
        answer?.getAnimations().forEach((a) => a.cancel());
        running.delete(item);
      };
    };

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="faq__list" ref={list}>
      {items.map((item) => (
        <details className="faq__item" key={item.q}>
          <summary className="faq__q">
            <span>{item.q}</span>
            <span className="faq__icon" aria-hidden="true" />
          </summary>
          <p className="faq__a">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
