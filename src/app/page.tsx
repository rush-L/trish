import { Nav } from "@/components/ui/Nav";
import { Hero } from "@/components/chapters/Hero";
import { Summary } from "@/components/chapters/Summary";
import { Achievements } from "@/components/chapters/Achievements";
import { Journey } from "@/components/chapters/Journey";
import { Work } from "@/components/chapters/Work";
import { Skills } from "@/components/chapters/Skills";
import { Contact } from "@/components/chapters/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Summary />
        <Achievements />
        <Journey />
        <Work />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
