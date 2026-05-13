import Heropage from "@/components/welcome-page/Heropage";
import VenturePage from "@/components/welcome-page/VenturePage";
import LegacyPage from "@/components/welcome-page/LegacyPage";

export default function Home() {
  return (
    <main>
      <Heropage />
      <VenturePage />
      <LegacyPage />
    </main>
  );
}
