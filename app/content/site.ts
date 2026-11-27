/* Real guild content: navigation, mission, vision, pillars, culture and
   social links. Copy here comes from the guild's own charter text. */

export type NavItem = { label: string; href: string };

export function programmeAnchor(name: string) {
  return `programme-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`;
}

/* The header's pages. The site markets the guild to organisations first, so
   it reads like a B2B site: who we are, what we run, the proof, how people
   take part, and how to reach us. "Partner with us" is the header's button. */
export const sectionNav: NavItem[] = [
  { label: "About", href: "/about" },
  { label: "Programmes", href: "/programmes" },
  { label: "Impact", href: "/impact" },
  { label: "Get involved", href: "/join" },
  { label: "Contact", href: "/contact" },
];

export const LUMA_URL = "https://luma.com/user/seekersguild";

/* The guild's shared inbox (Community Overview 2026). */
export const CONTACT_EMAIL = "seekersguild.community@gmail.com";

/* From the Seekers Guild Community Overview 2026. All historical figures. */
export const atAGlance = [
  { value: "2025", label: "Founded in April" },
  { value: "200+", label: "Members reached" },
  { value: "10+", label: "Institutions and industry partners" },
  { value: "30+", label: "National and international hackathon wins" },
];

/* Who guild programmes bring together (Community Overview 2026). */
export const audience = [
  "College students",
  "Founders",
  "Developers",
  "Product managers",
  "Designers",
  "Investors",
  "Mentors",
  "Community leaders",
  "Professionals",
  "Corporate innovation teams",
];

/* Selected ecosystem involvement (Community Overview 2026). */
export const ecosystem = [
  { year: "2026", name: "COSMOS 2026 and SparkFest 2026", detail: "Long-term community partnership with GDG on Campus PUP." },
  { year: "2025", name: "AWS Student Community Day Mega Manila 2025", detail: "Gold Partner of AWS Cloud Clubs Philippines. The event involved students from more than 20 universities." },
  { year: "2025", name: "Echelon Philippines 2025", detail: "Brainsparks and e27." },
  { year: "2025", name: "Philippine Design Fest 2025", detail: "Filipino Graphic Designers." },
  { year: "2025", name: "Match & Hatch", detail: "Philippine Startup Week 2025." },
];

/* The partner ecosystem (Community Overview 2026). */
export const partners = [
  { name: "Apex Human", description: "AI product-building education.", relationship: "Long-term partner" },
  { name: "Internly", description: "Internship discovery and hiring for Filipino students and employers.", relationship: "Long-term partner" },
  { name: "SnappyStrip", description: "A customisable web-based photobooth and digital experience.", relationship: "Long-term partner" },
  { name: "GDG on Campus PUP", description: "Google Developer Groups on Campus, Polytechnic University of the Philippines.", relationship: "Long-term partner" },
  { name: "Tutorials Dojo", description: "A Manila-founded technology learning platform focused on cloud and IT certification training.", relationship: "Strategic partner" },
];

/* Why organisations partner with the guild, each reason stated from the
   Community Overview's own facts. */
export const partnerReasons = [
  {
    title: "Reach builders early",
    body: "College students, founders, developers and designers, many from the provinces, met while they are still choosing what to build and where to work.",
  },
  {
    title: "Show up where they gather",
    body: "A public Open Table every month, Founders Live Manila pitch nights, and LockIn Villa retreats for the guild's Top 50 builders.",
  },
  {
    title: "Join partners who stay",
    body: "Apex Human, Internly, SnappyStrip and GDG on Campus PUP are long-term partners, and Tutorials Dojo is a strategic partner.",
  },
];

/* Partnership tiers, named in the Seekers Guild Partnership Primer. Each
   tier's inclusions are agreed by the partnerships team: list them in
   `benefits` and they appear on the Partners page. Until then the page
   shows the tier's scope and invites a conversation. */
export const partnershipTiers: { name: string; scope: string; benefits: string[] }[] = [
  { name: "Annual Anchor Partner", scope: "Year-round support across the guild's full calendar.", benefits: [] },
  { name: "Program Partner", scope: "Support for one flagship programme across its editions.", benefits: [] },
  { name: "Event Support Partner", scope: "Support for a single gathering.", benefits: [] },
  { name: "In-Kind Partner", scope: "Products, services or venues in place of funds.", benefits: [] },
  { name: "Media Partner", scope: "Coverage and promotion of guild events to your audience.", benefits: [] },
];

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

/* The guild's recurring programmes, from the Seekers Guild strategic roadmap,
   programme documents and Community Overview 2026. Flagships first. */
export const programmes: { cadence: string; name: string; body: string; access: string; room: string; flagship?: boolean }[] = [
  {
    cadence: "Monthly",
    name: "Open Table",
    body: "A relaxed gathering at a café on the last Sunday of every month, 2:00 to 7:00 PM. Co-work, catch up, and get informal advice from the people sitting across from you. The series reached its seventh edition in August 2026.",
    access: "Open to the public",
    room: "Students, builders and members of the public meeting the guild",
    flagship: true,
  },
  {
    cadence: "Quarterly",
    name: "LockIn Villa",
    body: "A planned quarterly, three-day build lock-in for the Top 50 ranked members. They build together and present their results, sales, lessons and reach on Day 3.",
    access: "Planned programme",
    room: "The guild's Top 50 ranked builders",
    flagship: true,
  },
  {
    cadence: "Event-based",
    name: "Founders Live Manila",
    body: "The Philippine chapter of the global Founders Live network. Five early-stage founders pitch for 99 seconds each, followed by four minutes of audience Q&A per founder.",
    access: "See individual event details",
    room: "Early-stage founders and the audience that questions them",
    flagship: true,
  },
  {
    cadence: "Twice a year",
    name: "Outreach Program",
    body: "The guild travels to a barangay or municipality outside Manila to run workshops with students, local officials and youth councils.",
    access: "Open, volunteer-driven",
    room: "Students, local officials and youth councils outside Manila",
  },
  {
    cadence: "Yearly",
    name: "Awards & Recognition",
    body: "An evening of journey-sharing where the guild recognises its top contributors, followed by networking with investors.",
    access: "Members recognised for their contribution",
    room: "The guild's top contributors, and investors",
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
    a: "Founders Live Manila features short startup pitches and audience Q&A. LockIn Villa is a separate, planned three-day build lock-in. The guild also runs the Outreach Program outside Manila, yearly Awards & Recognition, and workshops, talks and founder events such as Match & Hatch and Zero to CEO.",
  },
];
