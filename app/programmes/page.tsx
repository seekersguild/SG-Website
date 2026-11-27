import type { Metadata } from "next";

import { ProgrammesSection } from "../components/Sections";
import { StructuredData } from "../components/StructuredData";

const description = "Seekers Guild programmes: Open Table every month, Founders Live Manila, the LockIn Villa build retreat, outreach beyond Manila and a yearly night of recognition.";

export const metadata: Metadata = {
  title: "Programmes",
  description,
  alternates: { canonical: "/programmes" },
  openGraph: { title: "Seekers Guild programmes", description, url: "/programmes" },
  twitter: { card: "summary_large_image", title: "Seekers Guild programmes", description },
};

/* What the guild runs, and who is in the room at each. */
export default function Programmes() {
  return (
    <>
      <StructuredData />
      <ProgrammesSection />
    </>
  );
}
