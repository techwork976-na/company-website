import type { Metadata } from "next";
import { serviceCategories, servicesPage } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { PageTransition } from "@/components/motion/PageTransition";
import { ServiceCategorySection } from "@/components/sections/services/ServiceCategorySection";
import { ServicesTabs } from "@/components/sections/services/ServicesTabs";
import { PageHeader } from "@/components/ui/PageHeader";

export const metadata: Metadata = pageMetadata({
  title: servicesPage.metaTitle,
  description: servicesPage.metaDescription,
  path: "/services",
});

export default function ServicesPage() {
  const tabs = serviceCategories.map(({ id, index, shortTitle }) => ({ id, index, shortTitle }));
  return (
    <PageTransition>
      <div>
        <PageHeader label={servicesPage.label} title={servicesPage.title} intro={servicesPage.intro} />
        <ServicesTabs categories={tabs} label={servicesPage.tabsLabel} />
        {serviceCategories.map((category, index) => (
          <ServiceCategorySection
            key={category.id}
            category={category}
            tone={index % 2 === 0 ? "surface" : "bg"}
          />
        ))}
      </div>
    </PageTransition>
  );
}
