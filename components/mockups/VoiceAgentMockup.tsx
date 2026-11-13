import { Bot, CalendarCheck, Mic, Pause, PhoneForwarded, PhoneOff, User } from "lucide-react";
import { cn, cssVars } from "@/lib/cn";
import { Window } from "./Window";

// A fixed, natural-looking waveform (no randomness, so server and client match).
const bars = Array.from({ length: 36 }, (_, i) => 0.3 + Math.abs(Math.sin(i * 0.9) * 0.5 + Math.sin(i * 0.37) * 0.3));

const transcript = [
  { who: "caller", text: "Hi, I'd like to book an appointment with Dr. Sana for Friday." },
  { who: "agent", text: "Of course. Dr. Sana is free at 11:30 AM or 4:00 PM on Friday. Which suits you?" },
  { who: "caller", text: "4 PM, please." },
  { who: "agent", text: "Done. You're booked for Friday at 4:00 PM, and I've sent a confirmation by SMS." },
] as const;

/** A live AI voice-agent console: call, waveform, transcript and detected intent. */
export function VoiceAgentMockup() {
  return (
    <div className="relative @container">
      <Window title="Voice Agent Console · Live" dark className="text-[12px]">
        <div className="grid grid-cols-1 @xl:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col border-b border-white/10 p-4 @xl:border-r @xl:border-b-0">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-coral/20 px-2.5 py-1 text-[10.5px] font-bold text-coral">
                <span className="live-dot size-1.5 rounded-full bg-coral" /> Live call
              </span>
              <span className="numeral text-white/60">02:14</span>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-white/10">
                <User aria-hidden="true" className="size-5 text-white/80" />
              </span>
              <div>
                <p className="font-semibold">Incoming · City Care Clinic</p>
                <p className="numeral text-[11px] text-white/55">+92 3•• ••• 4218</p>
              </div>
            </div>

            <div aria-hidden="true" className="mt-6 flex h-20 items-center justify-between gap-[3px]">
              {bars.map((height, index) => (
                <span
                  key={index}
                  className={cn("wave-bar w-full rounded-full", index > 12 && index < 26 ? "bg-coral" : "bg-white/25")}
                  style={cssVars({ "--d": `${(index % 9) * 0.12}s` }, { height: `${Math.round(height * 100)}%` })}
                />
              ))}
            </div>
            <p className="mt-3 flex items-center gap-2 text-[11px] text-white/70">
              <Bot aria-hidden="true" className="size-3.5 text-lime" /> AI agent speaking · English / Urdu
            </p>

            <div className="mt-auto flex items-center justify-center gap-2.5 pt-6">
              {[Mic, Pause, PhoneForwarded].map((Icon, index) => (
                <span key={index} className="flex size-10 items-center justify-center rounded-full bg-white/10">
                  <Icon aria-hidden="true" className="size-4" />
                </span>
              ))}
              <span className="flex size-10 items-center justify-center rounded-full bg-coral text-ink">
                <PhoneOff aria-hidden="true" className="size-4" />
              </span>
            </div>
          </div>

          <div className="p-4">
            <p className="text-[10.5px] font-bold tracking-[0.12em] text-white/50 uppercase">Live transcript</p>
            <ul className="mt-3 space-y-2.5">
              {transcript.map((line, index) => (
                <li key={index} className={cn("flex gap-2", line.who === "agent" && "flex-row-reverse")}>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full",
                      line.who === "agent" ? "bg-lime text-ink" : "bg-white/12 text-white",
                    )}
                  >
                    {line.who === "agent" ? <Bot className="size-3.5" /> : <User className="size-3.5" />}
                  </span>
                  <p
                    className={cn(
                      "max-w-[85%] rounded-xl px-3 py-2 leading-snug",
                      line.who === "agent" ? "rounded-tr-sm bg-violet" : "rounded-tl-sm bg-white/8",
                    )}
                  >
                    {line.text}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-1.5 text-[10.5px] font-semibold">
              <span className="rounded-full bg-white/10 px-2.5 py-1">Intent · Book appointment</span>
              <span className="rounded-full bg-white/10 px-2.5 py-1">Sentiment · Positive</span>
            </div>
          </div>
        </div>
      </Window>

      <div className="absolute right-4 -bottom-6 flex items-center gap-3 rounded-xl bg-white px-3.5 py-3 text-ink shadow-mock @lg:-right-5">
        <span className="flex size-9 items-center justify-center rounded-lg bg-emerald text-white">
          <CalendarCheck aria-hidden="true" className="size-4.5" />
        </span>
        <div>
          <p className="text-[12px] font-bold">Appointment booked</p>
          <p className="text-[10.5px] text-ink/55">Fri · 4:00 PM · Dr. Sana</p>
        </div>
      </div>
    </div>
  );
}
