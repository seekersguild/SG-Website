import type { Metadata } from "next";

import { WaysSection } from "../components/OrgSections";
import { FaqSection, FirstVisitSection, JoinSection } from "../components/Sections";
import { StructuredData } from "../components/StructuredData";

const description = "How to join Seekers Guild: membership is free. Come to an Open Table, get two endorsements, and you are in. Answers to common questions.";

export const metadata: Metadata = {
  title: "Get involved",
  description,
  alternates: { canonical: "/join" },
  openGraph: { title: "How to join Seekers Guild", description, url: "/join" },
  twitter: { card: "summary_large_image", title: "How to join Seekers Guild", description },
};

/* Everything a newcomer needs before their first visit: the reassurance up
   front, what the first table is like, the steps, then the questions. */
export default function Join() {
  return (
    <>
      <StructuredData faq />
      <WaysSection />
      <FirstVisitSection />
      <JoinSection title="Three steps in" />
      <FaqSection />
    </>
  );
}
