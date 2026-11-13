import type { Metadata } from "next";
import { site } from "@/content/site";
import { absoluteUrl, siteUrl } from "./site-url";

type PageMetadataInput = {
  title?: string;
  description: string;
  path: string;
};

/** Title, description, canonical URL and social tags for one page. */
export function pageMetadata({ title, description, path }: PageMetadataInput): Metadata {
  const fullTitle = title ? `${title} | ${site.name}` : site.title;
  return {
    title: title ?? { absolute: site.title },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: site.locale,
      url: path,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: siteUrl,
    logo: absoluteUrl("/logo.png"),
    email: site.contact.email,
    description: site.description,
    sameAs: site.sameAs,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.contact.email,
        availableLanguage: ["English"],
      },
    ],
  };
}

/** Serialises JSON-LD safely for an inline <script>. */
export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
