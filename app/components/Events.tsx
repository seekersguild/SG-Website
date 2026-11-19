import Image from "next/image";

import { getEvents, type GuildEvent } from "../content/events";
import { LUMA_URL } from "../content/site";
import { Ornate } from "./Ornament";

const tz = "Asia/Manila";
const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-PH", { ...opts, timeZone: tz }).format(new Date(iso));
const year = (iso: string) => fmt(iso, { year: "numeric" });

function Arrow() {
  return (
    <svg className="event-row__arrow" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function Upcoming({ event }: { event: GuildEvent }) {
  return (
    <Ornate className="ornate--dark next-event">
      {event.cover ? (
        <div className="next-event__cover">
          <Image src={event.cover} alt="" fill sizes="(max-width: 760px) 90vw, 240px" />
        </div>
      ) : null}
      <div className="next-event__body">
        <p className="next-event__label">Next gathering</p>
        <h3 className="next-event__title">{event.title}</h3>
        <p className="next-event__when">
          <time dateTime={event.start}>
            {fmt(event.start, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}, {fmt(event.start, { hour: "numeric", minute: "2-digit" })}
          </time>
          {event.venue ? <> &middot; {event.venue}</> : null}
        </p>
        <a className="button button--gold" href={event.url} target="_blank" rel="noreferrer noopener">
          Reserve a seat on Luma
        </a>
      </div>
    </Ornate>
  );
}

export async function Events() {
  const { upcoming, previous } = await getEvents();
  const years = [...new Set(previous.map((e) => year(e.start)))];

  return (
    <>
      {upcoming.length ? (
        <div className="events__next" data-reveal-item>
          {upcoming.map((event) => (
            <Upcoming key={event.id} event={event} />
          ))}
        </div>
      ) : null}

      {years.map((y) => (
        <section className="events__year" key={y} aria-label={`Events in ${y}`} data-reveal-item>
          <h3 className="events__year-title">{y}</h3>
          <ul className="event-list">
            {previous
              .filter((e) => year(e.start) === y)
              .map((event) => (
                <li key={event.id}>
                  <a className="event-row" href={event.url} target="_blank" rel="noreferrer noopener">
                    <span className="event-row__thumb" aria-hidden="true">
                      {event.cover ? <Image src={event.cover} alt="" fill sizes="56px" /> : null}
                    </span>
                    <time className="event-row__date" dateTime={event.start}>
                      {fmt(event.start, { month: "short", day: "numeric" })}
                    </time>
                    <span className="event-row__main">
                      <span className="event-row__title">{event.title}</span>
                      <span className="event-row__meta">
                        {[event.venue, event.partners.length ? `with ${event.partners.join(", ")}` : null].filter(Boolean).join(" · ")}
                      </span>
                    </span>
                    <span className="visually-hidden">(opens on Luma)</span>
                    <Arrow />
                  </a>
                </li>
              ))}
          </ul>
        </section>
      ))}

      <p className="events__more" data-reveal-item>
        <a className="text-link" href={LUMA_URL} target="_blank" rel="noreferrer noopener">
          See every gathering on Luma
        </a>
      </p>
    </>
  );
}
