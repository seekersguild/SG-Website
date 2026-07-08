import QuestBoard from "./components/QuestBoard";
import SiteFrame from "./components/SiteFrame";
import { homeSection } from "./site-data";

export default function Home() {
  return (
    <SiteFrame activeSlug="quests" title={homeSection.title}>
      <QuestBoard />
    </SiteFrame>
  );
}
