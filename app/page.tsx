// import Heropage from "@/components/welcome-page/Heropage";
// import VenturePage from "@/components/welcome-page/VenturePage";
// import LegacyPage from "@/components/welcome-page/LegacyPage";

// export default function Home() {
//   return (
//     <main>
//       <Heropage />
//       <VenturePage />
//       <LegacyPage />
//     </main>
//   );
// }

import Heropage from "@/components/welcome-page/Heropage";
import VenturePage from "@/components/welcome-page/VenturePage";
import LegacyPage from "@/components/welcome-page/LegacyPage";

export default function Home() {
  return (
    <main>
      <section id="home">
        <Heropage />
      </section>

      <section id="ventures">
        <VenturePage />
      </section>

      <section id="legacy">
        <LegacyPage />
      </section>

      {/* Add similar sections for Behind the Scenes and The 40 if needed */}
    </main>
  );
}
