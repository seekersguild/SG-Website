import type { Metadata } from "next";

import { EcosystemSection, PartnersSection } from "../components/OrgSections";
import { GatheringsSection } from "../components/Sections";
import { StructuredData } from "../components/StructuredData";

const description = "The Seekers Guild record since April 2025: the events it has partnered on, every gathering it has hosted, and the organisations behind it.";

export const metadata: Metadata = {
  title: "Our impact",
  description,
  alternates: { canonical: "/impact" },
  openGraph: { title: "Seekers Guild impact", description, url: "/impact" },
  twitter: { card: "summary_large_image", title: "Seekers Guild impact", description },
};

/* The evidence: the work, the gatherings, and who backs it. */
export default function Impact() {
  return (
    <>
      <StructuredData events />
      <EcosystemSection />
      <GatheringsSection />
      <PartnersSection />
    </>
  );
}
