import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { Hero } from "@/components/sections/Hero";
import { ImageGallery } from "@/components/sections/ImageGallery";
import { InstagramTeaser } from "@/components/sections/InstagramTeaser";
import { SpecialtiesPreview } from "@/components/sections/SpecialtiesPreview";
import { UnitsSection } from "@/components/sections/UnitsSection";

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <AboutTeaser />
      <SpecialtiesPreview />
      <BlogTeaser />
      <ImageGallery />
      <UnitsSection />
      <InstagramTeaser />
    </main>
  );
}
