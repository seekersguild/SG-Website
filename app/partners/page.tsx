import type { Metadata } from "next";
import Link from "next/link";

import { AudienceSection, PartnerReasonsSection, TiersSection } from "../components/OrgSections";
import { PageHero } from "../components/PageHero";
import { NextStep } from "../components/Sections";
import { StructuredData } from "../components/StructuredData";
import { CONTACT_EMAIL } from "../content/site";

const description = "Partner with Seekers Guild: reach students, founders and builders across the Philippines through Open Table, Founders Live Manila and LockIn Villa.";

export const metadata: Metadata = {
  title: "Partner with us",
  description,
  alternates: { canonical: "/partners" },
  openGraph: { title: "Partner with Seekers Guild", description, url: "/partners" },
  twitter: { card: "summary_large_image", title: "Partner with Seekers Guild", description },
};

/* The partnership pitch, in the order a partner decides: why, who they
   reach, how to take part, then one place to start. The proof lives on
   Impact and the programmes on Programmes; this page links to both. */
export default function Partners() {
  return (
    <>
      <StructuredData />
      <PageHero
        variant="partners"
        sections={[
          { label: "Why partner with the guild", href: "#why" },
          { label: "Who you reach", href: "#audience" },
          { label: "Ways to partner", href: "#tiers" },
        ]}
        title="Partner with us"
        intro="Put your organisation in front of a Philippine community of students, founders, developers and designers who build beyond the classroom."
      />
      <PartnerReasonsSection />
      <AudienceSection />
      <TiersSection />
      <NextStep id="partners-next" title="Start a conversation" lead="Tell us about your organisation and what you would like to support. We reply from one shared inbox.">
        <a className="button" href={`mailto:${CONTACT_EMAIL}?subject=Partnership%20with%20Seekers%20Guild`}>
          Email the guild
        </a>
        <Link className="text-link" href="/impact">
          See our impact
        </Link>
      </NextStep>
    </>
  );
}
