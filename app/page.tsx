import { Sidebar } from "@/components/sidebar";
import { Hero } from "@/components/sections/hero";
import { TheShow } from "@/components/sections/the-show";
import { TheEra } from "@/components/sections/the-era";
import { TheCharacters } from "@/components/sections/the-characters";
import { ThePlayers } from "@/components/sections/the-players";
import { Comparables } from "@/components/sections/comparables";
import { Media } from "@/components/sections/media";
import { Creators } from "@/components/sections/creators";
import { Contact } from "@/components/sections/contact";
import {
  CHARACTERS,
  PLAYERS,
  COMPARABLES,
  MEDIA_LINKS,
  CREATORS,
} from "@/lib/data";

export default function Page() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main content offset by collapsed sidebar width */}
      <main className="flex-1 ml-12">
        <Hero />
        <TheShow />
        <TheEra />
        <TheCharacters characters={CHARACTERS} />
        <ThePlayers players={PLAYERS} />
        <Comparables comparables={COMPARABLES} />
        <Media links={MEDIA_LINKS} />
        <Creators creators={CREATORS} />
        <Contact />
      </main>
    </div>
  );
}
