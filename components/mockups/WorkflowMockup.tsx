import { Bot, CircleCheck, Database, GitBranch, Mail, MessageCircle, Webhook } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";
import { Window } from "./Window";

type Node = { id: string; x: number; y: number; title: string; detail: string; icon: LucideIcon; tone: string };

// Positions in a 640 x 360 canvas (percentages are derived from these).
const nodes: Node[] = [
  {
    id: "trigger",
    x: 14,
    y: 150,
    title: "New lead",
    detail: "Form · WhatsApp · Email",
    icon: Webhook,
    tone: "bg-violet text-white",
  },
  {
    id: "ai",
    x: 180,
    y: 150,
    title: "AI classify",
    detail: "Score and tag the lead",
    icon: Bot,
    tone: "bg-coral text-ink",
  },
  {
    id: "branch",
    x: 346,
    y: 150,
    title: "If hot lead",
    detail: "Score above 80",
    icon: GitBranch,
    tone: "bg-sun text-ink",
  },
  {
    id: "crm",
    x: 490,
    y: 40,
    title: "Update CRM",
    detail: "Create deal, assign owner",
    icon: Database,
    tone: "bg-sky text-ink",
  },
  {
    id: "notify",
    x: 490,
    y: 150,
    title: "Notify sales",
    detail: "Message the team",
    icon: MessageCircle,
    tone: "bg-emerald text-white",
  },
  {
    id: "nurture",
    x: 490,
    y: 260,
    title: "Nurture",
    detail: "Send follow-up emails",
    icon: Mail,
    tone: "bg-rose text-ink",
  },
];

const W = 640;
const H = 360;
const NODE_W = 136;
const NODE_H = 58;

const edges: [string, string][] = [
  ["trigger", "ai"],
  ["ai", "branch"],
  ["branch", "crm"],
  ["branch", "notify"],
  ["branch", "nurture"],
];

function edgePath(fromId: string, toId: string) {
  const from = nodes.find((node) => node.id === fromId)!;
  const to = nodes.find((node) => node.id === toId)!;
  const fromWidth = from.id === "branch" ? 100 : NODE_W;
  const x1 = from.x + fromWidth;
  const y1 = from.y + NODE_H / 2;
  const x2 = to.x;
  const y2 = to.y + NODE_H / 2;
  const mid = (x1 + x2) / 2;
  return `M${x1} ${y1} C${mid} ${y1}, ${mid} ${y2}, ${x2} ${y2}`;
}

/** An automation canvas: connected nodes with data flowing along the edges. */
export function WorkflowMockup() {
  return (
    <div className="relative @container">
      <Window title="Lead Flow · Automation" className="text-[12px]">
        <div className="flex items-center gap-2 border-b border-ink/8 bg-white px-4 py-2.5">
          <span className="font-semibold">Lead capture to CRM</span>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald/15 px-2 py-0.5 text-[10px] font-bold text-[#0B7A5E]">
            <span className="live-dot size-1.5 rounded-full bg-emerald" /> Active
          </span>
          <span className="ml-auto hidden text-[10.5px] text-ink/50 @md:inline">Last run 2 min ago</span>
        </div>

        <div
          className="relative bg-[#FBFAF6]"
          style={{
            aspectRatio: `${W} / ${H}`,
            backgroundImage: "radial-gradient(rgba(22,18,63,0.14) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
            {edges.map(([from, to]) => (
              <g key={`${from}-${to}`}>
                <path d={edgePath(from, to)} fill="none" stroke="#16123F" strokeOpacity="0.15" strokeWidth="2.5" />
                <path
                  d={edgePath(from, to)}
                  fill="none"
                  stroke={to === "nurture" ? "#FF7EB3" : "#5B3DF5"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="flow-edge"
                />
              </g>
            ))}
          </svg>

          {nodes.map((node) => (
            <div
              key={node.id}
              className={cn(
                "absolute flex items-center gap-2 rounded-xl border border-ink/10 bg-white p-2 shadow-[0_2px_0_rgba(22,18,63,0.06)]",
              )}
              style={{
                left: `${(node.x / W) * 100}%`,
                top: `${(node.y / H) * 100}%`,
                width: `${((node.id === "branch" ? 100 : NODE_W) / W) * 100}%`,
                height: `${(NODE_H / H) * 100}%`,
              }}
            >
              <span className={cn("grid size-7 shrink-0 place-items-center rounded-lg @lg:size-8", node.tone)}>
                <node.icon aria-hidden="true" className="size-3.5 @lg:size-4" />
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[9px] font-bold @lg:text-[11.5px]">{node.title}</span>
                <span className="hidden truncate text-[9.5px] text-ink/50 @xl:block">{node.detail}</span>
              </span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-2 border-t border-ink/8 bg-white p-3 text-[10.5px] @md:grid-cols-3">
          {[
            ["Run #1042", "Hot lead · routed to Sana", "1.2s"],
            ["Run #1041", "Nurture sequence started", "0.9s"],
            ["Run #1040", "CRM deal created", "1.4s"],
          ].map(([run, detail, time], index) => (
            <div key={run} className={cn("flex items-start gap-2", index > 0 && "hidden @md:flex")}>
              <CircleCheck aria-hidden="true" className="mt-px size-3.5 shrink-0 text-emerald" />
              <span className="min-w-0">
                <span className="block font-semibold">
                  {run} <span className="numeral font-normal text-ink/45">· {time}</span>
                </span>
                <span className="block truncate text-ink/55">{detail}</span>
              </span>
            </div>
          ))}
        </div>
      </Window>

      <div className="absolute -top-4 right-4 rounded-xl bg-ink px-3.5 py-2.5 text-white shadow-mock @lg:-right-4">
        <p className="text-[10px] text-white/60">Hours saved this week</p>
        <p className="font-display text-[1.25rem] leading-tight font-bold text-lime">31 h</p>
      </div>
    </div>
  );
}
