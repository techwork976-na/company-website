import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/motion/PageTransition";
import { About } from "@/components/sections/home/About";
import { ClientShowcase } from "@/components/sections/home/ClientShowcase";
import { FeaturedProjects } from "@/components/sections/home/FeaturedProjects";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { Hero } from "@/components/sections/home/Hero";
import { Process } from "@/components/sections/home/Process";
import { Reviews } from "@/components/sections/home/Reviews";
import { ServicesOverview } from "@/components/sections/home/ServicesOverview";
import { TechEcosystem } from "@/components/sections/home/TechEcosystem";
import { WhyChooseUs } from "@/components/sections/home/WhyChooseUs";

export const metadata: Metadata = pageMetadata({ description: site.description, path: "/" });

/**
 * The home page is one continuous journey: each section declares a tone,
 * and the canvas colour shifts between them as you scroll
 * (paper → indigo → lilac → paper → indigo → paper → lilac → violet).
 */
export default function HomePage() {
  return (
    <PageTransition>
      <div>
        <Hero />
        <ClientShowcase />
        <About />
        <ServicesOverview />
        <WhyChooseUs />
        <Process />
        <FeaturedProjects />
        <TechEcosystem />
        <Reviews />
        <FinalCta />
      </div>
    </PageTransition>
  );
}
