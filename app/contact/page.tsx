import type { Metadata } from "next";
import { Suspense } from "react";
import { contactPage } from "@/content/site";
import { cssVars } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";
import { MaskedText } from "@/components/motion/MaskedText";
import { PageTransition } from "@/components/motion/PageTransition";
import { ContactDetails } from "@/components/sections/contact/ContactDetails";
import { ContactForm } from "@/components/sections/contact/ContactForm";
import { ContactFormWithParams } from "@/components/sections/contact/ContactFormWithParams";
import { SectionLabel } from "@/components/ui/SectionLabel";

export const metadata: Metadata = pageMetadata({
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="container-wide pt-12 pb-[var(--section-y)] md:pt-16 lg:pt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="hero-anim hero-rise" style={cssVars({ "--d": "0ms" })}>
              <SectionLabel>{contactPage.label}</SectionLabel>
            </div>
            <MaskedText as="h1" trigger="load" lines={contactPage.title} delay={40} className="mt-6 text-h1 text-ink" />
            <p className="hero-anim hero-rise mt-5 max-w-[34rem] text-lead text-ink2" style={cssVars({ "--d": "160ms" })}>
              {contactPage.intro}
            </p>
            <div className="hero-anim hero-rise mt-10" style={cssVars({ "--d": "220ms" })}>
              <Suspense fallback={<ContactForm />}>
                <ContactFormWithParams />
              </Suspense>
            </div>
          </div>
          <aside
            aria-label={contactPage.detailsTitle}
            className="hero-anim hero-rise lg:col-span-5 lg:pt-2 xl:col-span-4 xl:col-start-9"
            style={cssVars({ "--d": "280ms" })}
          >
            <ContactDetails />
          </aside>
        </div>
      </div>
    </PageTransition>
  );
}
