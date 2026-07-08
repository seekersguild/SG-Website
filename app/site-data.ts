export type SectionSlug = "quests" | "subguilds" | "rankers-hall" | "scrolls" | "codex";

export type Section = {
  slug: SectionSlug;
  label: string;
  href: string;
  title: string;
  eyebrow: string;
  intro: string;
  action: string;
  secondaryAction: string;
  panels: string[];
};

export const sections: Section[] = [
  {
    slug: "quests",
    label: "QUESTS",
    href: "/",
    title: "Quest Board",
    eyebrow: "Active paths",
    intro: "Browse the guild's missions, track progress, and prepare future quest details here.",
    action: "Post a quest",
    secondaryAction: "View quest log",
    panels: ["Featured quests", "Open parties", "Reward board"],
  },
  {
    slug: "subguilds",
    label: "SUBGUILDS",
    href: "/subguilds",
    title: "Subguilds",
    eyebrow: "Guild circles",
    intro: "A home for teams, specialties, and smaller communities inside Seekers Guild.",
    action: "Create subguild",
    secondaryAction: "Browse groups",
    panels: ["Study circles", "Event teams", "Member directory"],
  },
  {
    slug: "rankers-hall",
    label: "RANKER'S HALL",
    href: "/rankers-hall",
    title: "Ranker's Hall",
    eyebrow: "Standing and honors",
    intro: "Recognize members, display rankings, and keep achievements easy to find.",
    action: "See rankings",
    secondaryAction: "Nominate member",
    panels: ["Top rankers", "Recent badges", "Guild milestones"],
  },
  {
    slug: "scrolls",
    label: "SCROLLS",
    href: "/scrolls",
    title: "Scrolls",
    eyebrow: "Knowledge archive",
    intro: "Store announcements, references, writeups, and guides for the guild.",
    action: "Write scroll",
    secondaryAction: "Open archive",
    panels: ["Announcements", "Guides", "Meeting notes"],
  },
  {
    slug: "codex",
    label: "CODEX",
    href: "/codex",
    title: "Codex",
    eyebrow: "Rules and lore",
    intro: "Centralize guild lore, policies, onboarding, and shared definitions.",
    action: "Add entry",
    secondaryAction: "Read codex",
    panels: ["Guild charter", "Lore index", "Terms and rules"],
  },
];

export const homeSection = {
  title: "Our Journey",
  eyebrow: "Seekers Guild",
  intro: "Desktop-first guild hub with working navigation for quests, subguilds, rankers, scrolls, and codex pages.",
  action: "Start with quests",
  secondaryAction: "Open codex",
};

export function getSection(slug: string) {
  return sections.find((section) => section.slug === slug);
}
