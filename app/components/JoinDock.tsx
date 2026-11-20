"use client";

import { useEffect, useState } from "react";

/* A slim bar fixed to the bottom of phones and portrait tablets, inside the
   thumb's reach: the next gathering and a button to reserve it. It shows
   once the opening's own buttons have scrolled away and steps aside for the
   closing section and the footer, which carry their own links. Hidden on
   desktop by the CSS. */
export function JoinDock({ href, title, when }: { href: string; title: string; when: string | null }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const opening = document.querySelector(".hero .actions");
    const ends = [document.querySelector(".close"), document.querySelector(".site-footer")].filter(Boolean) as Element[];
    if (!opening) return;
    let openingVisible = true;
    const endsVisible = new Set<Element>();
    const update = () => setShow(!openingVisible && endsVisible.size === 0);

    // The opening's buttons: any part on screen (or still below it) keeps the bar away.
    const openingWatch = new IntersectionObserver(([entry]) => {
      openingVisible = entry.isIntersecting || entry.boundingClientRect.top > 0;
      update();
    });
    // The ends count once they reach the upper half of the screen, not at their first pixel.
    const endsWatch = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) endsVisible.add(entry.target);
          else endsVisible.delete(entry.target);
        }
        update();
      },
      { rootMargin: "0px 0px -45% 0px" },
    );
    openingWatch.observe(opening);
    ends.forEach((el) => endsWatch.observe(el));
    return () => {
      openingWatch.disconnect();
      endsWatch.disconnect();
    };
  }, []);

  return (
    <div className="join-dock" data-show={show ? "true" : "false"} aria-hidden={show ? undefined : "true"}>
      <p className="join-dock__text">
        <span className="join-dock__label">{when ? `Next gathering, ${when}` : "Gatherings"}</span>
        <span className="join-dock__title">{title}</span>
      </p>
      <a className="button button--gold join-dock__button" href={href} target="_blank" rel="noreferrer noopener" tabIndex={show ? undefined : -1}>
        {when ? "Reserve" : "See Luma"}
      </a>
    </div>
  );
}
