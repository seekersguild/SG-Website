import type { Metadata } from "next";
import { PartnershipOpening, PartnershipOptions, PartnershipProgrammes } from "../components/PartnershipSections";
import { StructuredData } from "../components/StructuredData";

const description = "Partner with Seekers Guild: reach students, founders and builders across the Philippines through Open Table, Founders Live Manila and LockIn Villa.";

export const metadata: Metadata = {
  title: "Partner with us",
  description,
  alternates: { canonical: "/partners" },
  openGraph: { title: "Partner with Seekers Guild", description, url: "/partners" },
  twitter: { card: "summary_large_image", title: "Partner with Seekers Guild", description },
};

/* Three useful decisions: know the guild, choose a programme, scope support.
   Confirmed facts and contacts come from the supplied Community Overview. */
export default function Partners() {
  return (
    <>
      <StructuredData />
      <PartnershipOpening />
      <PartnershipProgrammes />
      <PartnershipOptions />
    </>
  );
}
