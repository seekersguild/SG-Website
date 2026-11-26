import { getEvents } from "../content/events";
import { LUMA_URL } from "../content/site";
import { GatheringBarMotion } from "./GatheringBarMotion";

export function GatheringBarFallback() {
  return <Bar label="Your next gathering awaits" title="Join us on Luma for upcoming gatherings" url={LUMA_URL} action="Visit" />;
}

function Bar({ label, title, url, action }: { label: string; title: string; url: string; action: string }) {
  return (
    <GatheringBarMotion>
      <div className="wrap gathering-bar__inner">
        <div className="gathering-bar__copy">
          <p className="gathering-bar__label">{label}</p>
          <a className="gathering-bar__title" href={url} target="_blank" rel="noreferrer noopener">{title}</a>
        </div>
        <a className="button gathering-bar__reserve" href={url} target="_blank" rel="noreferrer noopener" aria-label={`${action}: ${title}`}>{action}</a>
      </div>
    </GatheringBarMotion>
  );
}

export async function GatheringBar() {
  const { upcoming } = await getEvents();
  const next = upcoming[0];
  if (!next) return <GatheringBarFallback />;
  const date = new Intl.DateTimeFormat("en-PH", {
    weekday: "short", month: "short", day: "numeric", timeZone: "Asia/Manila",
  }).format(new Date(next.start));
  return <Bar label={`Next gathering, ${date}`} title={next.title} url={next.url} action="Reserve" />;
}
