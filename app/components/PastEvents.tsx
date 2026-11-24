"use client";

import { useState, type ReactNode } from "react";

/* The list of past gatherings. On phones and portrait tablets it opens
   showing only the latest few, with a button for the rest; on desktop the
   CSS shows everything and hides the button. */
export function PastEvents({ total, children }: { total: number; children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="events__past" data-open={open ? "true" : "false"}>
      {children}
      {total > 4 ? (
        <button type="button" className="button events__toggle" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? "Show fewer" : `Show all ${total} past gatherings`}
        </button>
      ) : null}
    </div>
  );
}
