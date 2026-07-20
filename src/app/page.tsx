import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Hero } from "@/components/sections/Hero";
import { InstagramTeaser } from "@/components/sections/InstagramTeaser";
import { MissionVisionValues } from "@/components/sections/MissionVisionValues";
import { SpecialtiesPreview } from "@/components/sections/SpecialtiesPreview";
import { StructureTeaser } from "@/components/sections/StructureTeaser";
import { UnitsSection } from "@/components/sections/UnitsSection";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutTeaser />
      <SpecialtiesPreview />
      <MissionVisionValues />
      <StructureTeaser />
      <UnitsSection />
      <InstagramTeaser />
    </main>
  );
}
