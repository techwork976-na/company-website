import { site } from "@/content/site";

/** Absolute base URL of the site, without a trailing slash. */
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || site.url).replace(/\/+$/, "");

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function mailtoUrl(subject?: string) {
  return `mailto:${site.contact.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
}
