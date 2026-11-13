import type { ProjectStage } from "@/content/projects";

/** Panel colour for each project and the text colours that read on it. */
export const stages: Record<ProjectStage, { panel: string; text: string; soft: string; chip: string }> = {
  emerald: { panel: "bg-emerald", text: "text-white", soft: "text-white/80", chip: "border-white/35" },
  coral: { panel: "bg-coral", text: "text-ink", soft: "text-ink/75", chip: "border-ink/25" },
  violet: { panel: "bg-violet", text: "text-white", soft: "text-white/80", chip: "border-white/35" },
  rose: { panel: "bg-rose", text: "text-ink", soft: "text-ink/75", chip: "border-ink/25" },
  sun: { panel: "bg-sun", text: "text-ink", soft: "text-ink/75", chip: "border-ink/25" },
  lime: { panel: "bg-lime", text: "text-ink", soft: "text-ink/75", chip: "border-ink/25" },
};
