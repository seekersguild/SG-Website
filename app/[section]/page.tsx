import { notFound, redirect } from "next/navigation";
import CodexBoard from "../components/CodexBoard";
import RankersHall from "../components/RankersHall";
import ScrollsBoard from "../components/ScrollsBoard";
import SiteFrame from "../components/SiteFrame";
import SubguildsBoard from "../components/SubguildsBoard";
import { getSection, sections } from "../site-data";

type SectionPageProps = {
  params: Promise<{
    section: string;
  }>;
};

export function generateStaticParams() {
  return sections.map((section) => ({
    section: section.slug,
  }));
}

export async function generateMetadata({ params }: SectionPageProps) {
  const { section: slug } = await params;
  const section = getSection(slug);

  if (!section) {
    return {};
  }

  return {
    title: `${section.title} | Seekers Guild`,
    description: section.intro,
  };
}

export default async function SectionPage({ params }: SectionPageProps) {
  const { section: slug } = await params;
  const section = getSection(slug);

  if (!section) {
    notFound();
  }

  if (section.slug === "quests") {
    redirect("/");
  }

  if (section.slug === "subguilds") {
    return (
      <SiteFrame activeSlug={section.slug} title={section.title} showHero={false}>
        <SubguildsBoard />
      </SiteFrame>
    );
  }

  if (section.slug === "rankers-hall") {
    return (
      <SiteFrame activeSlug={section.slug} title={section.title} showHero={false}>
        <RankersHall />
      </SiteFrame>
    );
  }

  if (section.slug === "scrolls") {
    return (
      <SiteFrame activeSlug={section.slug} title={section.title} showHero={false}>
        <ScrollsBoard />
      </SiteFrame>
    );
  }

  if (section.slug === "codex") {
    return (
      <SiteFrame activeSlug={section.slug} title={section.title} showHero={false}>
        <CodexBoard />
      </SiteFrame>
    );
  }

  return <SiteFrame activeSlug={section.slug} title={section.title} />;
}
