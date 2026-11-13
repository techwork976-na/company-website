import { Bot, Boxes, Check, LayoutGrid, Receipt, Users, Workflow } from "lucide-react";
import { cn, cssVars } from "@/lib/cn";

/*
 * Hero showcase: the three things Betteflow builds, shown as one layered
 * product scene. A dashboard window (software), an AI agent conversation
 * (AI) and an automation run (automation). Everything is drawn with HTML
 * and palette tokens, so it is sharp on any screen and costs no image
 * download. The copy inside is illustrative interface text and is hidden
 * from assistive technology.
 */

const kpis = [
  { label: "Orders", value: "248" },
  { label: "Revenue", value: "18.4k" },
  { label: "Avg. reply", value: "9s" },
];

const bars = [34, 46, 40, 58, 52, 70, 62, 84, 74, 96, 80, 66];

const rows = [
  { name: "Invoice 1042", status: "Paid" },
  { name: "Stock reorder", status: "Sent" },
];

const sidebar = [LayoutGrid, Boxes, Receipt, Users];

export function HeroShowcase({ caption, index }: { caption: string; index: string }) {
  return (
    <figure className="w-full">
      <div
        aria-hidden="true"
        className="hero-anim hero-rise relative aspect-[10/9] w-full overflow-hidden rounded-panel border border-line bg-surface sm:aspect-[5/4] lg:aspect-[10/11]"
        style={cssVars({ "--d": "100ms" })}
      >
        {/* Dashboard window */}
        <div
          className="hero-anim hero-rise absolute inset-x-[6%] top-[7%] bottom-[20%] flex flex-col overflow-hidden rounded-card border border-line bg-bg shadow-card"
          style={cssVars({ "--d": "180ms" })}
        >
          <div className="flex h-9 shrink-0 items-center gap-1.5 border-b border-line px-3">
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="size-2 rounded-full bg-line-strong" />
            <span className="ml-3 text-[0.6875rem] font-medium text-ink-soft">Operations</span>
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-line px-2 py-0.5 text-[0.625rem] font-medium text-ink2">
              <span className="size-1.5 rounded-full bg-success" />
              Live
            </span>
          </div>
          <div className="flex min-h-0 flex-1">
            <div className="hidden w-10 shrink-0 flex-col items-center gap-2 border-r border-line py-3 sm:flex">
              {sidebar.map((Icon, i) => (
                <span
                  key={i}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-md",
                    i === 0 ? "bg-surface text-ink" : "text-ink-soft",
                  )}
                >
                  <Icon strokeWidth={1.5} className="size-3.5" />
                </span>
              ))}
            </div>
            <div className="min-w-0 flex-1 p-3 sm:p-4">
              <div className="grid grid-cols-3 gap-2">
                {kpis.map((kpi) => (
                  <div key={kpi.label} className="rounded-ui border border-line px-2.5 py-2">
                    <p className="truncate text-[0.625rem] text-ink-soft">{kpi.label}</p>
                    <p className="numeral mt-0.5 text-[0.9375rem] leading-tight font-medium text-ink">{kpi.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex h-[4.5rem] items-end gap-[5px] border-b border-line pb-px sm:h-24">
                {bars.map((height, i) => (
                  <span
                    key={i}
                    className={cn(
                      "hero-anim hero-grow-y flex-1 rounded-t-[3px]",
                      i === 9 ? "bg-accent" : i > 9 ? "bg-ink" : "bg-muted",
                    )}
                    style={cssVars({ "--d": `${260 + i * 18}ms` }, { height: `${height}%` })}
                  />
                ))}
              </div>
              <div className="mt-3 space-y-2">
                {rows.map((row) => (
                  <div key={row.name} className="flex items-center justify-between gap-2 text-[0.6875rem]">
                    <span className="truncate text-ink2">{row.name}</span>
                    <span className="rounded-full bg-surface px-2 py-0.5 font-medium text-ink2">{row.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* AI agent conversation */}
        <div
          className="hero-anim hero-pop absolute bottom-[6%] left-[3%] w-[60%] rounded-card border border-line bg-bg p-3 shadow-pop"
          style={cssVars({ "--d": "320ms" })}
        >
          <div className="flex items-center gap-2">
            <span className="flex size-6 items-center justify-center rounded-md bg-ink text-surface">
              <Bot strokeWidth={1.5} className="size-3.5" />
            </span>
            <span className="text-[0.6875rem] font-medium text-ink">AI agent</span>
            <span className="ml-auto size-1.5 rounded-full bg-success" />
          </div>
          <p className="mt-2 w-fit max-w-[92%] rounded-ui rounded-bl-sm bg-surface px-2.5 py-1.5 text-[0.6875rem] leading-snug text-ink2">
            Can I book for Tuesday morning?
          </p>
          <p className="mt-1.5 ml-auto w-fit max-w-[92%] rounded-ui rounded-br-sm bg-ink px-2.5 py-1.5 text-[0.6875rem] leading-snug text-surface">
            Done. Tuesday 10:30 is confirmed.
          </p>
        </div>

        {/* Automation run */}
        <div
          className="hero-anim hero-pop absolute right-[3%] bottom-[11%] w-[36%] rounded-card bg-ink p-3 text-surface shadow-pop"
          style={cssVars({ "--d": "380ms" })}
        >
          <div className="flex items-center gap-2">
            <Workflow strokeWidth={1.5} className="size-3.5 text-accent" />
            <span className="text-[0.6875rem] font-medium">Automation</span>
          </div>
          <ul className="mt-2 space-y-1.5 text-[0.625rem] text-surface-soft">
            <li className="flex items-center gap-1.5">
              <Check strokeWidth={2} className="size-3 shrink-0 text-surface" />
              <span className="truncate">Lead captured</span>
            </li>
            <li className="flex items-center gap-1.5">
              <Check strokeWidth={2} className="size-3 shrink-0 text-surface" />
              <span className="truncate">Follow-up sent</span>
            </li>
          </ul>
          <span className="mt-2.5 block h-1 overflow-hidden rounded-full bg-line-inverse">
            <span
              className="hero-anim hero-grow-x block h-full w-3/4 rounded-full bg-accent"
              style={cssVars({ "--d": "520ms" })}
            />
          </span>
        </div>
      </div>
      <figcaption
        className="hero-anim hero-fade mt-3 flex items-center justify-between gap-4 text-[0.875rem] text-ink-soft"
        style={cssVars({ "--d": "360ms" })}
      >
        <span className="numeral whitespace-nowrap text-ink">{index}</span>
        <span className="text-right">{caption}</span>
      </figcaption>
    </figure>
  );
}
