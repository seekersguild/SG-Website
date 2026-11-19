/* Real guild content: navigation, mission, vision, pillars, culture and
   social links. Copy here comes from the guild's own charter text. */

export type NavItem = { label: string; href: string };

/* The site is one page: these are its four sections. */
export const sectionNav: NavItem[] = [
  { label: "Vision", href: "/#vision" },
  { label: "Mission", href: "/#mission" },
  { label: "Pillars", href: "/#pillars" },
  { label: "Culture", href: "/#culture" },
  { label: "Programmes", href: "/#programmes" },
  { label: "Events", href: "/#events" },
  { label: "Join", href: "/#join" },
];

/* Footer-only links (the header is already full). */
export const moreNav: NavItem[] = [{ label: "Questions", href: "/#faq" }];

export const LUMA_URL = "https://luma.com/user/seekersguild";

export const socialLinks = [
  { label: "Facebook", href: "https://www.facebook.com/seekersguildcommunity" },
  { label: "Instagram", href: "https://www.instagram.com/seekersguild.community/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/seekersguildcommunity/" },
  { label: "Luma", href: LUMA_URL },
];

export const tagline = "A compass for the curious. A home for the driven.";

/* Official copy from the Seekers Guild brand and community documents. */
export const brand = {
  headline: "We seek those who seek",
  founded: "Founded April 2025",
  place: "Philippines",
  pitch:
    "A decentralized, student-led community that empowers curious and driven minds, especially from the provinces, through collaboration, real-world experiences, and opportunities beyond the classroom.",
  who:
    "An AI student builder community in the Philippines that connects students and young builders with like-minded people, real-world projects, and opportunities beyond school.",
  belong:
    "Technology, business, creative and events enthusiasts from colleges and senior high schools, especially, but not limited to, those from the provinces.",
  sigil: {
    quote: "This compass does not point north.",
    answer: "It points to the thing you want most in this world.",
  },
  signoff: "Onward, fellow seeker.",
  motto: "Guided by curiosity, bound by purpose.",
};

export const vision = {
  lead: "To awaken a generation of inspired trailblazers, students transformed not by what school alone can offer, but by the exposure, experience, and empowerment they find beyond it.",
  body: [
    "We envision a decentralized guild where seekers from every corner of the Philippines, especially the provinces, rise as changemakers connected by shared knowledge, driven by purpose, and committed to giving back.",
    "In this future, curiosity becomes courage, access becomes opportunity, and every seeker finds the compass that points to the life they're meant to lead.",
  ],
};

export const mission = [
  {
    lead: "Empower students from all walks of life,",
    body: "especially those from the provinces and underserved sectors, to take ownership of their lifelong learning, leadership, and future by bridging access to opportunities, events, and collaborative spaces across Manila and other major hubs.",
  },
  {
    lead: "Equip seekers with transformative, real-world experiences",
    body: "that transcend the boundaries of textbooks through cross-functional projects, idea exchanges, student-led initiatives, and immersive learning journeys that spark bold action.",
  },
  {
    lead: "Foster a vibrant, purpose-driven community",
    body: "of passionate minds and courageous leaders united across disciplines, institutes, and regions by shared leadership, inclusive collaboration, and a culture of mentorship and lifelong learning.",
  },
];

export const pillars = [
  {
    title: "Purpose-driven collaboration",
    body: "We begin with why. Every project and alliance is rooted in goals that drive real impact.",
  },
  {
    title: "Inclusive community culture",
    body: "A safe, welcoming space where diversity is celebrated and everyone feels they belong.",
  },
  {
    title: "Decentralized empowerment",
    body: "Leadership is shared, not reserved. Every member can shape our direction, because every idea holds potential when heard.",
  },
  {
    title: "Open knowledge exchange",
    body: "Ideas move freely across campuses and disciplines, because when knowledge flows, innovation grows.",
  },
  {
    title: "Continuous learning and development",
    body: "Curiosity, mentorship, and self-improvement fuel lifelong technical and personal growth.",
  },
];

export const culture = [
  "Diverse and inclusive environment",
  "Personal and professional development",
  "Adapt and evolve",
  "Cross-functional collaboration",
  "Open and transparent communication",
  "Positive impact on the world",
  "Embrace failure as a learning opportunity",
  "Foster a sense of belonging",
  "Encourage creativity in problem-solving",
  "Flat hierarchy",
];

/* The guild's recurring programmes, from the Seekers Guild strategic roadmap
   and programme documents. */
export const programmes = [
  {
    cadence: "Monthly",
    name: "Open Table",
    body: "A relaxed gathering at a café on the last Sunday of every month, 2:00 to 7:00 PM. Co-work, catch up, and get informal advice from the people sitting across from you.",
    access: "Open to the public",
  },
  {
    cadence: "Quarterly",
    name: "LockIn Villa × Founders Live Manila",
    body: "A three-day, two-night builder retreat. Hackers, hipsters and hustlers live and build together under one roof, then present what they shipped, sold and learned on Day 3.",
    access: "Selected builders",
  },
  {
    cadence: "Twice a year",
    name: "Outreach Program",
    body: "The guild travels to a barangay or municipality outside Manila to run workshops with students, local officials and youth councils.",
    access: "Open, volunteer-driven",
  },
  {
    cadence: "Yearly",
    name: "Awards & Recognition",
    body: "An evening of journey-sharing where the guild recognises its top contributors, followed by networking with investors.",
    access: "Members recognised for their contribution",
  },
];

/* How membership works, from the Seekers Guild governance framework. */
export const joinSteps = [
  {
    title: "Come to an Open Table",
    body: "Open Table is open to the public. It is the easiest way to meet members and see what the guild is actually about.",
  },
  {
    title: "Get two endorsements",
    body: "New members join on the endorsement of two existing members, so the guild grows through people who know each other.",
  },
  {
    title: "Welcome to the guild",
    body: "After a short review, you are welcomed into the guild's member community and its programmes.",
  },
];

/* Frequently asked questions. Every answer comes from the guild's own
   strategy, governance and brand documents, or its public Luma events. */
export const faqs = [
  {
    q: "What is Seekers Guild?",
    a: "Seekers Guild is a decentralized, student-led community in the Philippines, founded in April 2025. It connects students and young builders with like-minded people, real-world projects and opportunities beyond school, especially those from the provinces and underserved sectors.",
  },
  {
    q: "Who can join Seekers Guild?",
    a: "Technology, business, creative and events enthusiasts from colleges and senior high schools, especially, but not limited to, those from the provinces. Members include AI developers, designers, marketers and young founders.",
  },
  {
    q: "Does it cost anything to join?",
    a: "No. Membership is free and open. There is no paywall and no donation requirement.",
  },
  {
    q: "How do I become a member?",
    a: "New members join on the endorsement of two existing members, followed by a short review. The easiest way to meet members is to come to an Open Table, which is open to the public.",
  },
  {
    q: "What is Open Table?",
    a: "Open Table is the guild's monthly gathering, held on the last Sunday of every month at a café, usually from 2:00 PM. It is open to the public: no pitch and no agenda, just conversation with members and the core team. You buy your own food and drinks, and you RSVP on Luma.",
  },
  {
    q: "Where does Seekers Guild meet?",
    a: "Mostly at cafés and venues across Metro Manila, including Quezon City, Makati, Manila, Taguig and Pasig. The guild also travels outside Manila for its Outreach Program.",
  },
  {
    q: "What else does the guild run besides Open Table?",
    a: "LockIn Villa × Founders Live Manila, a three-day builder retreat; the Outreach Program in barangays and municipalities outside Manila; the yearly Awards & Recognition; and workshops, talks and founder events such as Match & Hatch and Zero to CEO.",
  },
];
