// app/page.tsx
import { Sidebar } from "@/components/sidebar";
import { Hero } from "@/components/sections/hero";
import { TheShow } from "@/components/sections/the-show";
import { TheNumbers } from "@/components/sections/the-numbers";
import { TheEra } from "@/components/sections/the-era";
import { TheArc } from "@/components/sections/the-arc";
import { TheCharacters } from "@/components/sections/the-characters";
import { TheBetrayal } from "@/components/sections/the-betrayal";
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

      <main className="flex-1 ml-12">
        <Hero />
        <TheShow />
        <TheNumbers />
        <TheEra />
        <TheArc />
        <TheCharacters characters={CHARACTERS} />
        <TheBetrayal />
        <ThePlayers players={PLAYERS} />
        <Comparables comparables={COMPARABLES} />
        <Media links={MEDIA_LINKS} />
        <Creators creators={CREATORS} />
        <Contact />
      </main>
    </div>
  );
}
