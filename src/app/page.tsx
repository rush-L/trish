import { Nav } from "@/components/ui/Nav";
import { Hero } from "@/components/chapters/Hero";
import { Philosophy } from "@/components/chapters/Philosophy";
import { Journey } from "@/components/chapters/Journey";
import { Beyond } from "@/components/chapters/Beyond";
import { Dashboard } from "@/components/chapters/Dashboard";
import { Work } from "@/components/chapters/Work";
import { Thinking } from "@/components/chapters/Thinking";
import { Human } from "@/components/chapters/Human";
import { Contact } from "@/components/chapters/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Philosophy />
        <Journey />
        <Beyond />
        <Dashboard />
        <Work />
        <Thinking />
        <Human />
        <Contact />
      </main>
    </>
  );
}
