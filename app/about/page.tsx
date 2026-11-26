import type { Metadata } from "next";

import { CultureSection, MissionSection, PillarsSection, VisionSection } from "../components/Sections";
import { StructuredData } from "../components/StructuredData";

const description = "The Seekers Guild charter: the vision, mission, five pillars and culture of a student-led AI builder community in the Philippines.";

export const metadata: Metadata = {
  title: "About the guild",
  description,
  alternates: { canonical: "/about" },
  openGraph: { title: "About Seekers Guild", description, url: "/about" },
  twitter: { card: "summary_large_image", title: "About Seekers Guild", description },
};

/* The guild's charter: what it is for, and how it works. */
export default function About() {
  return (
    <>
      <StructuredData />
      <VisionSection />
      <MissionSection />
      <PillarsSection />
      <CultureSection />
    </>
  );
}
