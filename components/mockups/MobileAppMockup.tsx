import { Bell, Check, ClipboardCheck, Package, Plus, Users, X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

function Phone({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("w-[15.5rem] shrink-0 rounded-[2.25rem] bg-ink p-2 shadow-mock", className)}>
      <div className="relative h-[31rem] overflow-hidden rounded-[1.75rem] bg-[#FBF9F5] text-ink">
        <div className="flex items-center justify-between px-5 pt-3 text-[10px] font-semibold">
          <span>9:41</span>
          <span aria-hidden="true" className="h-4 w-16 rounded-full bg-ink" />
          <span>5G</span>
        </div>
        {children}
      </div>
    </div>
  );
}

const actions = [
  { label: "New order", icon: Plus, tone: "bg-violet text-white" },
  { label: "Approvals", icon: ClipboardCheck, tone: "bg-coral text-ink", badge: 3 },
  { label: "Stock", icon: Package, tone: "bg-sky text-ink" },
  { label: "Customers", icon: Users, tone: "bg-lime text-ink" },
];

/** Two screens of a mobile business app: home and approvals. */
export function MobileAppMockup() {
  return (
    <div className="relative flex justify-center @container">
      <Phone className="relative z-10 text-[11px]">
        <div className="px-4 pt-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] text-ink/55">Good morning</p>
              <p className="font-display text-[16px] font-bold">Hamza Sheikh</p>
            </div>
            <span className="relative grid size-8 place-items-center rounded-full bg-white">
              <Bell aria-hidden="true" className="size-3.5" />
              <span className="absolute top-1.5 right-2 size-1.5 rounded-full bg-coral" />
            </span>
          </div>

          <div className="mt-4 rounded-2xl bg-indigo p-4 text-white">
            <p className="text-[10px] text-white/60">Today&apos;s sales</p>
            <p className="mt-1 font-display text-[22px] leading-none font-extrabold">PKR 186,400</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/15">
              <span className="block h-full w-[72%] rounded-full bg-lime" />
            </div>
            <p className="mt-1.5 flex justify-between text-[9.5px] text-white/60">
              <span>72% of daily target</span>
              <span>+18% vs yesterday</span>
            </p>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {actions.map((action) => (
              <div key={action.label} className="text-center">
                <span className={cn("relative mx-auto grid size-11 place-items-center rounded-2xl", action.tone)}>
                  <action.icon aria-hidden="true" className="size-4.5" />
                  {action.badge ? (
                    <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-ink text-[8.5px] font-bold text-white">
                      {action.badge}
                    </span>
                  ) : null}
                </span>
                <p className="mt-1 text-[9px] font-medium">{action.label}</p>
              </div>
            ))}
          </div>

          <p className="mt-4 font-semibold">Today&apos;s visits</p>
          <ul className="mt-2 space-y-1.5">
            {[
              ["Nexora Retail", "11:00 · Clifton", true],
              ["Orbit Mart", "13:30 · Gulshan", false],
              ["Beyond Stores", "16:00 · DHA", false],
            ].map(([name, time, done]) => (
              <li key={name as string} className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-2">
                <span
                  className={cn(
                    "grid size-5 place-items-center rounded-full border-[1.5px]",
                    done ? "border-emerald bg-emerald text-white" : "border-ink/25",
                  )}
                >
                  {done ? <Check aria-hidden="true" className="size-3" /> : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{name}</span>
                  <span className="block text-[9.5px] text-ink/50">{time}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-ink/8 bg-white py-3 text-[9px] font-semibold text-ink/45">
          <span className="text-violet">Home</span>
          <span>Orders</span>
          <span>Stock</span>
          <span>Profile</span>
        </div>
      </Phone>

      <Phone className="-ml-16 hidden translate-y-10 text-[11px] @lg:block">
        <div className="mx-3 mt-3 flex items-center gap-2 rounded-2xl bg-ink px-3 py-2.5 text-white">
          <span className="grid size-6 place-items-center rounded-full bg-lime text-ink">
            <Check aria-hidden="true" className="size-3.5" />
          </span>
          <span className="text-[10px] leading-tight">
            <span className="block font-bold">Order #2291 approved</span>
            <span className="text-white/60">Synced to the office system</span>
          </span>
        </div>
        <div className="px-4 pt-4">
          <p className="font-display text-[16px] font-bold">Approvals</p>
          <p className="text-[10px] text-ink/55">3 waiting for you</p>
          <ul className="mt-3 space-y-2.5">
            {[
              ["Discount request", "Vertex Labs · 8% off", "bg-sun"],
              ["Stock transfer", "Lahore → Karachi · 40 units", "bg-sky"],
              ["Expense claim", "Fuel · PKR 6,500", "bg-rose"],
            ].map(([title, detail, tone]) => (
              <li key={title} className="rounded-2xl bg-white p-3">
                <div className="flex items-center gap-2">
                  <span className={cn("size-2 rounded-full", tone)} />
                  <span className="font-semibold">{title}</span>
                </div>
                <p className="mt-0.5 text-[10px] text-ink/55">{detail}</p>
                <div className="mt-2.5 grid grid-cols-2 gap-1.5 text-[10px] font-semibold">
                  <span className="flex h-7 items-center justify-center gap-1 rounded-full border border-ink/15">
                    <X aria-hidden="true" className="size-3" /> Decline
                  </span>
                  <span className="flex h-7 items-center justify-center gap-1 rounded-full bg-violet text-white">
                    <Check aria-hidden="true" className="size-3" /> Approve
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Phone>
    </div>
  );
}
