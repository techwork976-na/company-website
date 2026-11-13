import { CreditCard, Heart, Search, ShoppingBag, Truck } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Window } from "./Window";

/* Flat product illustrations, drawn in SVG instead of photos. */
const Vase = () => (
  <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
    <ellipse cx="40" cy="68" rx="18" ry="3" fill="#16123F" opacity="0.12" />
    <path d="M32 14h16v6c0 4 8 8 8 22 0 14-7 26-16 26S24 56 24 42c0-14 8-18 8-22z" fill="#5B3DF5" />
    <path d="M32 14h16v5H32z" fill="#3F27C7" />
    <path d="M40 30c6 0 9 6 9 12" stroke="#D4F36A" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);
const Lamp = () => (
  <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
    <ellipse cx="40" cy="70" rx="16" ry="3" fill="#16123F" opacity="0.12" />
    <path d="M24 34l8-20h16l8 20z" fill="#FF6B4A" />
    <rect x="38" y="34" width="4" height="30" fill="#16123F" />
    <rect x="28" y="64" width="24" height="5" rx="2.5" fill="#16123F" />
  </svg>
);
const Chair = () => (
  <svg viewBox="0 0 80 80" className="h-full w-full" aria-hidden="true">
    <ellipse cx="40" cy="70" rx="20" ry="3" fill="#16123F" opacity="0.12" />
    <rect x="22" y="14" width="36" height="30" rx="10" fill="#1B1650" />
    <rect x="18" y="40" width="44" height="12" rx="6" fill="#2A2380" />
    <path d="M24 52l-3 16M56 52l3 16" stroke="#1B1650" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const products: { name: string; price: string; bg: string; art: ReactNode; tag?: string }[] = [
  { name: "Mehr Ceramic Vase", price: "PKR 4,800", bg: "bg-sun", art: <Vase />, tag: "New" },
  { name: "Noor Table Lamp", price: "PKR 9,200", bg: "bg-sky", art: <Lamp /> },
  { name: "Saba Lounge Chair", price: "PKR 38,500", bg: "bg-lime", art: <Chair />, tag: "−15%" },
];

/** A modern storefront with quick discovery and an open cart drawer. */
export function EcommerceMockup() {
  return (
    <div className="relative @container">
      <Window title="alma-living.store" className="text-[12px]">
        <div className="relative bg-white">
          <div className="flex items-center gap-3 border-b border-ink/8 px-4 py-3">
            <span className="font-display text-[15px] font-extrabold tracking-[-0.03em]">alma.</span>
            <span className="hidden gap-3 text-ink/60 @md:flex">
              <span className="font-semibold text-ink">Living</span>
              <span>Lighting</span>
              <span>Decor</span>
            </span>
            <span className="ml-auto flex h-8 w-28 items-center gap-1.5 rounded-full bg-[#F4F1EA] px-3 text-ink/45 @md:w-44">
              <Search aria-hidden="true" className="size-3.5" /> Search
            </span>
            <span className="relative grid size-8 place-items-center rounded-full bg-ink text-white">
              <ShoppingBag aria-hidden="true" className="size-3.5" />
              <span className="absolute -top-1 -right-1 grid size-4 place-items-center rounded-full bg-coral text-[9px] font-bold text-ink">
                2
              </span>
            </span>
          </div>

          <div className="p-4 @xl:pr-[13.5rem]">
            <div className="flex items-end justify-between gap-3 rounded-xl bg-rose px-4 py-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.12em] uppercase opacity-70">Winter edit</p>
                <p className="mt-0.5 font-display text-[18px] leading-tight font-extrabold tracking-[-0.03em]">
                  Warm up every room.
                </p>
              </div>
              <span className="shrink-0 rounded-full bg-ink px-3 py-1.5 text-[10.5px] font-semibold text-white">
                Shop now
              </span>
            </div>

            <div className="mt-3 flex gap-1.5 text-[10.5px] font-semibold">
              {["All", "Under 10k", "Best sellers", "In stock"].map((filter, index) => (
                <span
                  key={filter}
                  className={cn("rounded-full px-2.5 py-1", index === 0 ? "bg-ink text-white" : "bg-[#F4F1EA]")}
                >
                  {filter}
                </span>
              ))}
            </div>

            <ul className="mt-3 grid grid-cols-3 gap-2.5">
              {products.map((product) => (
                <li key={product.name}>
                  <div className={cn("relative aspect-square rounded-xl p-3", product.bg)}>
                    {product.art}
                    {product.tag ? (
                      <span className="absolute top-2 left-2 rounded-full bg-white px-1.5 py-0.5 text-[9px] font-bold">
                        {product.tag}
                      </span>
                    ) : null}
                    <span className="absolute top-2 right-2 grid size-5 place-items-center rounded-full bg-white/80">
                      <Heart aria-hidden="true" className="size-2.5" />
                    </span>
                  </div>
                  <p className="mt-1.5 truncate font-semibold">{product.name}</p>
                  <p className="text-ink/55">{product.price}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Cart drawer */}
          <aside className="border-t border-ink/8 bg-[#FBF9F5] p-4 @xl:absolute @xl:top-[57px] @xl:bottom-0 @xl:right-0 @xl:w-[12.75rem] @xl:border-t-0 @xl:border-l">
            <p className="font-display text-[14px] font-bold">Your cart (2)</p>
            <ul className="mt-3 space-y-2.5">
              {products.slice(0, 2).map((product) => (
                <li key={product.name} className="flex items-center gap-2.5">
                  <span className={cn("size-10 shrink-0 rounded-lg p-1", product.bg)}>{product.art}</span>
                  <span className="min-w-0">
                    <span className="block truncate font-semibold">{product.name}</span>
                    <span className="block text-ink/55">{product.price}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-1 border-t border-ink/8 pt-3 text-[11px]">
              <p className="flex justify-between text-ink/60">
                <span>Delivery</span>
                <span className="font-semibold text-emerald">Free</span>
              </p>
              <p className="flex justify-between font-bold">
                <span>Total</span>
                <span>PKR 14,000</span>
              </p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-1 text-center text-[9px] font-semibold">
              <span className="rounded-md bg-white py-1.5">Card</span>
              <span className="rounded-md bg-white py-1.5">Wallet</span>
              <span className="rounded-md border border-ink bg-white py-1.5">COD</span>
            </div>
            <span className="mt-3 flex h-9 items-center justify-center gap-1.5 rounded-full bg-ink text-[11px] font-semibold text-white">
              <CreditCard aria-hidden="true" className="size-3.5" /> Checkout
            </span>
          </aside>
        </div>
      </Window>

      <div className="absolute -top-4 left-4 flex items-center gap-2.5 rounded-xl bg-ink px-3.5 py-2.5 text-white shadow-mock @lg:-left-5">
        <Truck aria-hidden="true" className="size-4 text-lime" />
        <div>
          <p className="text-[11px] font-bold">Checkout in under a minute</p>
          <p className="text-[10px] text-white/60">One page · local payments</p>
        </div>
      </div>
    </div>
  );
}
