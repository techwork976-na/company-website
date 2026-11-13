import { Bell, ChartColumn, LayoutDashboard, Package, Search, Settings, TrendingUp, Users, Wallet } from "lucide-react";
import { cn, cssVars } from "@/lib/cn";
import { Initial, Window } from "./Window";

const kpis = [
  { label: "Revenue", value: "PKR 4.82M", change: "+12.4%", tone: "bg-violet text-white" },
  { label: "Orders", value: "1,284", change: "+8.1%", tone: "bg-lime text-ink" },
  { label: "Customers", value: "836", change: "+5.6%", tone: "bg-sky text-ink" },
];

const months = [42, 55, 48, 62, 58, 71, 66, 78, 74, 86, 80, 94];
const monthLabels = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const branches = [
  { name: "Karachi", share: 42, color: "#5B3DF5" },
  { name: "Lahore", share: 33, color: "#FF6B4A" },
  { name: "Islamabad", share: 25, color: "#D4F36A" },
];

/** Where each donut segment starts (the circle's circumference is 100). */
const segmentOffsets = branches.map((_, index) => 25 - branches.slice(0, index).reduce((sum, b) => sum + b.share, 0));

const orders = [
  {
    id: "#ORD-2291",
    client: "Nexora Retail",
    amount: "PKR 84,200",
    status: "Paid",
    tone: "bg-emerald/15 text-[#0B7A5E]",
  },
  {
    id: "#ORD-2290",
    client: "Vertex Labs",
    amount: "PKR 126,500",
    status: "Pending",
    tone: "bg-sun/30 text-[#8A5A00]",
  },
  { id: "#ORD-2289", client: "Cloudnest", amount: "PKR 39,900", status: "Paid", tone: "bg-emerald/15 text-[#0B7A5E]" },
];

/** Donut chart drawn with stroke segments on a circle. */
function Donut() {
  const radius = 15.9155; // circumference of 100
  return (
    <svg viewBox="0 0 42 42" className="size-24 shrink-0" aria-hidden="true">
      <circle cx="21" cy="21" r={radius} fill="none" stroke="#EFEAF9" strokeWidth="6" />
      {branches.map((branch, index) => (
        <circle
          key={branch.name}
          cx="21"
          cy="21"
          r={radius}
          fill="none"
          stroke={branch.color}
          strokeWidth="6"
          strokeDasharray={`${branch.share - 1.2} ${100 - branch.share + 1.2}`}
          strokeDashoffset={segmentOffsets[index]}
        />
      ))}
      <text x="21" y="22.5" textAnchor="middle" className="fill-ink text-[6px] font-bold">
        3
      </text>
      <text x="21" y="27.5" textAnchor="middle" className="fill-ink/50 text-[3.2px]">
        branches
      </text>
    </svg>
  );
}

/** A business management dashboard: KPIs, revenue chart, branch split and orders. */
export function DashboardMockup() {
  return (
    <div className="relative @container">
      <Window title="Operations Hub · Dashboard" className="text-[12px]">
        <div className="flex">
          <nav aria-hidden="true" className="hidden w-14 shrink-0 flex-col items-center gap-2 bg-indigo py-4 @lg:flex">
            <span className="mb-2 grid size-8 place-items-center rounded-lg bg-lime font-display text-[13px] font-extrabold text-ink">
              O
            </span>
            {[LayoutDashboard, ChartColumn, Package, Users, Wallet, Settings].map((Icon, index) => (
              <span
                key={index}
                className={cn(
                  "grid size-9 place-items-center rounded-lg",
                  index === 0 ? "bg-white/15 text-white" : "text-white/50",
                )}
              >
                <Icon className="size-4" />
              </span>
            ))}
          </nav>

          <div className="min-w-0 flex-1 bg-[#F8F6FF] p-3.5 @lg:p-4">
            <div className="flex items-center gap-2.5">
              <div className="min-w-0 flex-1">
                <p className="text-[10.5px] text-ink/50">Good morning, Ahmed</p>
                <p className="font-display text-[15px] font-bold">This month at a glance</p>
              </div>
              <span className="hidden h-8 items-center gap-2 rounded-lg bg-white px-2.5 text-ink/45 @md:flex">
                <Search aria-hidden="true" className="size-3.5" /> Search
              </span>
              <span className="grid size-8 place-items-center rounded-lg bg-white">
                <Bell aria-hidden="true" className="size-3.5" />
              </span>
              <Initial name="Ahmed Raza" className="bg-coral text-ink" />
            </div>

            <div className="mt-3.5 grid grid-cols-3 gap-2.5">
              {kpis.map((kpi) => (
                <div key={kpi.label} className={cn("rounded-xl p-3", kpi.tone)}>
                  <p className="text-[10.5px] opacity-75">{kpi.label}</p>
                  <p className="mt-1 font-display text-[13px] leading-tight font-bold @md:text-[17px]">{kpi.value}</p>
                  <p className="mt-1 inline-flex items-center gap-1 text-[10px] font-semibold opacity-85">
                    <TrendingUp aria-hidden="true" className="size-3" /> {kpi.change}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-2.5 grid grid-cols-1 gap-2.5 @lg:grid-cols-[1.6fr_1fr]">
              <div className="rounded-xl bg-white p-3">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">Revenue</p>
                  <span className="rounded-md bg-[#F2EFFB] px-2 py-0.5 text-[10px] font-semibold text-ink/60">
                    2026
                  </span>
                </div>
                <div aria-hidden="true" className="mt-3 flex h-28 items-end gap-1.5">
                  {months.map((value, index) => (
                    <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                      <span
                        className={cn(
                          "chart-bar w-full rounded-t-[4px]",
                          index === months.length - 1 ? "bg-violet" : "bg-[#D9D2FF]",
                        )}
                        style={cssVars({ "--i": index }, { height: `${value}%` })}
                      />
                      <span className="text-[8.5px] text-ink/40">{monthLabels[index]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl bg-white p-3">
                <Donut />
                <ul className="space-y-1.5 text-[10.5px]">
                  {branches.map((branch) => (
                    <li key={branch.name} className="flex items-center gap-1.5">
                      <span className="size-2 rounded-sm" style={{ backgroundColor: branch.color }} />
                      <span className="text-ink/65">{branch.name}</span>
                      <span className="font-semibold">{branch.share}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-2.5 rounded-xl bg-white p-3">
              <p className="font-semibold">Recent orders</p>
              <table className="mt-2 w-full text-left text-[10.5px]">
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-t border-ink/6">
                      <td className="numeral py-1.5 text-ink/55">{order.id}</td>
                      <td className="py-1.5 font-medium">{order.client}</td>
                      <td className="hidden py-1.5 @md:table-cell">{order.amount}</td>
                      <td className="py-1.5 text-right">
                        <span className={cn("rounded-full px-2 py-0.5 font-semibold", order.tone)}>{order.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Window>
    </div>
  );
}
