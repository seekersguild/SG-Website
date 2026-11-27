import type { Metadata } from "next";
import Link from "next/link";

import { ContactList } from "../components/OrgSections";
import { PageHero } from "../components/PageHero";
import { StructuredData } from "../components/StructuredData";

const description = "Contact Seekers Guild for partnerships, sponsorships, speaking and media: one email, plus Luma and the guild's social channels.";

export const metadata: Metadata = {
  title: "Contact",
  description,
  alternates: { canonical: "/contact" },
  openGraph: { title: "Contact Seekers Guild", description, url: "/contact" },
  twitter: { card: "summary_large_image", title: "Contact Seekers Guild", description },
};

export default function Contact() {
  return (
    <>
      <StructuredData />
      <PageHero
        variant="contact"
        title="Contact"
        intro="One inbox for partnerships, sponsorships, speaking and media. Students and newcomers are welcome to write too."
        aside={<ContactList />}
      >
        <Link className="text-link" href="/join#faq">
          Read the questions
        </Link>
      </PageHero>
    </>
  );
}
