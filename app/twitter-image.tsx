import { site } from "@/content/site";
import { ogContentType, ogSize, renderSiteOgImage } from "@/lib/og";

export const alt = `${site.name}: ${site.tagline}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function TwitterImage() {
  return renderSiteOgImage();
}
