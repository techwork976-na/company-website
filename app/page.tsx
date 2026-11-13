import type { Metadata } from "next";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/motion/PageTransition";
import { FinalCta } from "@/components/sections/home/FinalCta";
import { Hero } from "@/components/sections/home/Hero";
import { Process } from "@/components/sections/home/Process";
import { SelectedWork } from "@/components/sections/home/SelectedWork";
import { ServicesOverview } from "@/components/sections/home/ServicesOverview";
import { TrustStrip } from "@/components/sections/home/TrustStrip";

export const metadata: Metadata = pageMetadata({ description: site.description, path: "/" });

export default function HomePage() {
  return (
    <PageTransition>
      <div>
        <Hero />
        <TrustStrip />
        <ServicesOverview />
        <SelectedWork />
        <Process />
        <FinalCta />
      </div>
    </PageTransition>
  );
}
