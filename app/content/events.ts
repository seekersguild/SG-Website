import snapshot from "./luma-snapshot.json";

/* Gatherings, read from the guild's public Luma profile.
   The site refreshes this list every few hours, so new events appear on their
   own. If Luma cannot be reached (or changes its format), the saved snapshot
   in luma-snapshot.json is used instead. Luma does not document this
   endpoint publicly; the snapshot is the safety net. */

const LUMA_USER = "usr-427cvO2VjLhey7W";
const REFRESH_SECONDS = 6 * 60 * 60;

type LumaEntry = {
  api_id?: string;
  event: {
    api_id?: string;
    name: string;
    start_at: string;
    end_at?: string | null;
    timezone?: string | null;
    url: string;
    cover_url?: string | null;
    location_type?: string | null;
    visibility?: string | null;
    geo_address_info?: { address?: string | null; city_state?: string | null; city?: string | null } | null;
  };
  hosts?: { name?: string | null }[];
  ticket_info?: { is_free?: boolean | null } | null;
};

export type GuildEvent = {
  id: string;
  title: string;
  start: string; // ISO, UTC
  end: string | null;
  free: boolean | null;
  url: string;
  cover: string | null;
  venue: string | null;
  partners: string[];
};

/* Display titles for events whose Luma names are set in all capitals or are
   long; everything else uses the Luma name as written. */
const TITLES: Record<string, string> = {
  "evt-rqaUecPO04G5xZ4": "Match & Hatch: Where Founders Find Each Other",
  "evt-d26RC1Rg6MNiRy1": "Zero to CEO: Forging Visions that Echo",
  "evt-PBNNB18hUK3BGeC": "Open Table: Compass & Conversation VII",
};

/* Hosts that are organisations rather than people, shown as "with …". */
const ORG = /\b(inc\.?|society|group|club|department|university|college|corp|philippines|technologies|gdg|community|foundation)\b/i;

function clean(name: string) {
  return name.replace(/^Seekers Guild\s+/i, "").replace(/\s+with\s+GDG PUP TECH Department$/i, "").trim();
}

function normalise(entry: LumaEntry): GuildEvent | null {
  const ev = entry.event;
  if (!ev?.name || !ev.url || !ev.start_at) return null;
  if (ev.visibility && ev.visibility !== "public") return null;
  const id = ev.api_id ?? entry.api_id ?? ev.url;
  const geo = ev.geo_address_info ?? {};
  const partners = (entry.hosts ?? [])
    .map((h) => (h.name ?? "").trim())
    .filter((n) => n && !/^seekers guild$/i.test(n) && ORG.test(n));
  if (/with GDG PUP TECH Department$/i.test(ev.name)) partners.push("GDG PUP Tech Department");
  return {
    id,
    title: TITLES[id] ?? clean(ev.name),
    start: ev.start_at,
    end: ev.end_at ?? null,
    free: entry.ticket_info?.is_free ?? null,
    url: `https://luma.com/${ev.url}`,
    cover: ev.cover_url ?? null,
    venue: geo.address || geo.city_state || geo.city || null,
    partners: [...new Set(partners)],
  };
}

async function fetchPeriod(period: "past" | "future"): Promise<LumaEntry[] | null> {
  try {
    const url = `https://api.luma.com/user/profile/events-hosting?pagination_limit=50&period=${period}&user_api_id=${LUMA_USER}`;
    const res = await fetch(url, { next: { revalidate: REFRESH_SECONDS } });
    if (!res.ok) return null;
    const data = (await res.json()) as { entries?: LumaEntry[] };
    return Array.isArray(data.entries) ? data.entries : null;
  } catch {
    return null;
  }
}

export async function getEvents() {
  const [past, future] = await Promise.all([fetchPeriod("past"), fetchPeriod("future")]);
  const live = past !== null && future !== null && past.length + future.length > 0;
  const source = live ? { past, future } : (snapshot as unknown as { past: LumaEntry[]; future: LumaEntry[] });

  const map = (list: LumaEntry[]) => list.map(normalise).filter((e): e is GuildEvent => e !== null);
  const upcoming = map(source.future).sort((a, b) => a.start.localeCompare(b.start));
  const previous = map(source.past).sort((a, b) => b.start.localeCompare(a.start));
  return { upcoming, previous, live };
}
