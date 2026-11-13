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
import { Eyebrow } from "@/components/ui/Eyebrow";

export const metadata: Metadata = pageMetadata({
  title: contactPage.metaTitle,
  description: contactPage.metaDescription,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <PageTransition>
      <section data-tone="lilac" aria-labelledby="contact-title" className="pt-12 pb-[var(--section-y)] md:pt-20">
        <div className="container-wide grid grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="hero-anim hero-rise" style={cssVars({ "--d": "0ms" })}>
              <Eyebrow>{contactPage.eyebrow}</Eyebrow>
            </div>
            <MaskedText
              as="h1"
              id="contact-title"
              trigger="load"
              lines={contactPage.title}
              delay={40}
              className="mt-7 text-h1 text-fg"
            />
            <p
              className="hero-anim hero-rise mt-7 max-w-[34rem] text-lead text-fg-soft"
              style={cssVars({ "--d": "220ms" })}
            >
              {contactPage.intro}
            </p>
            <div className="hero-anim hero-rise mt-12" style={cssVars({ "--d": "300ms" })}>
              <Suspense fallback={<ContactForm />}>
                <ContactFormWithParams />
              </Suspense>
            </div>
          </div>
          <aside
            aria-label={contactPage.detailsTitle}
            className="hero-anim hero-rise lg:col-span-5 lg:pt-3 xl:col-span-4 xl:col-start-9"
            style={cssVars({ "--d": "360ms" })}
          >
            <ContactDetails />
          </aside>
        </div>
      </section>
    </PageTransition>
  );
}
