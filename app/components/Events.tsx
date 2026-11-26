import Link from "next/link";

import { getEvents, type GuildEvent } from "../content/events";
import { LUMA_URL } from "../content/site";
import { LumaImage } from "./LumaImage";
import { PastEvents } from "./PastEvents";

const tz = "Asia/Manila";
const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-PH", { ...opts, timeZone: tz }).format(new Date(iso));
const year = (iso: string) => fmt(iso, { year: "numeric" });

/* Home and Impact use the same event layout and registration link. */
function FeaturedEvent({ event }: { event: GuildEvent }) {
  const days = Math.ceil((new Date(event.start).getTime() - Date.now()) / 86_400_000);
  const soon = days <= 0 ? "Today" : days === 1 ? "Tomorrow" : `In ${days} days`;
  return (
    <article className={`feature-event${event.cover ? "" : " feature-event--text-only"}`}>
      <time className="feature-event__when" dateTime={event.start} aria-label={fmt(event.start, { dateStyle: "full", timeStyle: "short" })}>
        <span className="feature-event__day">{fmt(event.start, { day: "numeric" })}</span>
        <span className="feature-event__month">{fmt(event.start, { month: "long" })}</span>
        <span className="feature-event__year">{year(event.start)}</span>
        <span className="feature-event__weekday">
          {fmt(event.start, { weekday: "long" })}, {fmt(event.start, { hour: "numeric", minute: "2-digit" })}
        </span>
        <span className="feature-event__issuer">Seekers Guild</span>
      </time>
      <div className="feature-event__body">
        <h3 className="feature-event__title">{event.title}</h3>
        <p className="feature-event__details">
          {[soon, event.venue, event.free ? "Free entry" : null].filter(Boolean).join(" · ")}
        </p>
        <div className="actions">
          <a className="button" href={event.url} target="_blank" rel="noreferrer noopener">
            Reserve a seat on Luma
          </a>
        </div>
      </div>
      {event.cover ? (
        <div className="feature-event__cover">
          <LumaImage src={event.cover} alt={`${event.title} poster`} fill sizes="(max-width: 640px) 240px, (max-width: 1000px) 148px, 260px" />
        </div>
      ) : null}
    </article>
  );
}

export async function Events() {
  const { upcoming, previous } = await getEvents();
  const years = [...new Set(previous.map((e) => year(e.start)))];

  return (
    <>
      {upcoming.length ? (
        <div className="events__next">
          {upcoming.map((event) => (
            <FeaturedEvent key={event.id} event={event} />
          ))}
        </div>
      ) : null}

      <PastEvents total={previous.length}>
      {years.map((y) => (
        <section className="events__year" key={y} aria-label={`Events in ${y}`}>
          <h3 className="events__year-title">{y}</h3>
          <ul className="event-list">
            {previous
              .filter((e) => year(e.start) === y)
              .map((event) => (
                <li key={event.id}>
                  <a className="event-row" href={event.url} target="_blank" rel="noreferrer noopener">
                    <span className="event-row__thumb" aria-hidden="true">
                      {event.cover ? <LumaImage src={event.cover} alt="" fill sizes="56px" /> : null}
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
                  </a>
                </li>
              ))}
          </ul>
        </section>
      ))}
      </PastEvents>

      <p className="events__more">
        <a className="text-link" href={LUMA_URL} target="_blank" rel="noreferrer noopener">
          See every gathering on Luma
        </a>
      </p>
    </>
  );
}

/* The home page's gathering block, set like an event poster: a calendar
   leaf with the date, the title and details, and the event's own cover
   large beside it. The count of past gatherings sits under the heading. */
export async function NextGathering() {
  const { upcoming, previous } = await getEvents();
  const next = upcoming[0];
  return (
    <>
      <p className="events__intro">
        {previous.length
          ? `The guild has hosted ${previous.length} gatherings since April 2025. ${next ? "Here is the next one." : "The next one goes up on Luma as soon as it is set."}`
          : "Every gathering is posted on Luma."}
      </p>
      {next ? <FeaturedEvent event={next} /> : null}
      <p className="events__more">
        <Link className="text-link" href="/impact#events">
          See every gathering the guild has hosted
        </Link>
      </p>
    </>
  );
}
