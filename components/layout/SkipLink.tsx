import { site } from "@/content/site";

/** First focusable element on every page. Also the target of "Back to top". */
export function SkipLink() {
  return (
    <a
      id="top"
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[110] focus:inline-flex focus:min-h-11 focus:items-center focus:rounded-full focus:bg-ink focus:px-5 focus:text-paper"
    >
      {site.ui.skipLink}
    </a>
  );
}
