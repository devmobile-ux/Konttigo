"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaWifi, FaLock, FaTag } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { BsCheck2Circle } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineBolt } from "react-icons/md";
import { FcGlobe } from "react-icons/fc";
import { type EsimCountry, type EsimPackage } from "@/lib/api";

// konttigo-web: fetchGlobalPackages → filter[type]=global, then filter slug==="world" || type==="global"
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:80/konttigo-backend";

async function fetchGlobalData(): Promise<EsimCountry[]> {
  const url = `${API_BASE}/airlo/packages?filter[type]=global`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const json = await res.json();
  const data = json?.data ?? json;
  const arr: EsimCountry[] = Array.isArray(data) ? data : [data];
  // konttigo-web: filter for world/global entries
  const globalOnly = arr.filter(
    (c) => c.slug === "world" || c.type === "global"
  );
  return globalOnly.length > 0 ? globalOnly : arr;
}

const globalIcon = "/icons/GlobalIcon.svg";

// ────────────────────────────────────────────────────────────
// Skeleton
// ────────────────────────────────────────────────────────────
function PlanSkeleton() {
  return (
    <div className="relative rounded-2xl p-5 border border-gray-200 bg-white animate-pulse">
      <div className="h-3 w-28 bg-gray-200 rounded mb-6" />
      <div className="h-5 w-16 bg-gray-300 rounded" />
      <div className="mt-2 h-5 w-24 bg-gray-200 rounded-full" />
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// Main component
// ────────────────────────────────────────────────────────────
export default function GlobalDetails() {
  const [globalEntry, setGlobalEntry] = useState<EsimCountry | null>(null);
  const [plans, setPlans] = useState<EsimPackage[]>([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // konttigo-web pattern: fetchGlobalPackages → filter[type]=global
        const allGlobal = await fetchGlobalData();
        if (cancelled) return;

        if (allGlobal && allGlobal.length > 0) {
          const entry = allGlobal[0];
          setGlobalEntry(entry);
          const allPlans = entry.operators.flatMap((op) => op.packages ?? []);
          setPlans(allPlans);
          setSelected(0);
        } else {
          setError("No global eSIM plans found.");
        }
      } catch {
        if (!cancelled) setError("Failed to load plans. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const plan = plans[selected] ?? null;
  const coverageCount = globalEntry?.operators?.length ?? 0;

  // ── Loading ────────────────────────────────────────────────
  if (loading) {
    return (
      <section className="bg-[#FFFFFF] py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="h-8 w-64 bg-gray-200 rounded mx-auto animate-pulse" />
            <div className="h-4 w-80 bg-gray-100 rounded mx-auto mt-3 animate-pulse" />
          </div>
          <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
            <div className="grid md:grid-cols-[2fr_1fr] gap-6">
              <div>
                <div className="h-4 w-32 bg-gray-200 rounded mb-4 animate-pulse" />
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 4 }).map((_, i) => <PlanSkeleton key={i} />)}
                </div>
              </div>
              <div className="h-80 bg-gray-100 rounded-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ── Error ──────────────────────────────────────────────────
  if (error || !plan) {
    return (
      <section className="bg-[#FFFFFF] py-10">
        <div className="max-w-7xl mx-auto px-6 text-center py-20">
          <FcGlobe className="text-6xl mx-auto mb-4" />
          <p className="text-xl font-medium text-gray-600">Global eSIM Plans</p>
          <p className="text-gray-400 mt-2">{error ?? "No plans available."}</p>
        </div>
      </section>
    );
  }

  // ── Main render ────────────────────────────────────────────
  return (
    <section className="bg-[#FFFFFF] py-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold flex items-center justify-center gap-2">
            <FcGlobe />
            <span className="text-primary-500">Global</span> eSIM Plans
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Get a Global eSIM and enjoy reliable and affordable prepaid data on your world tour!
          </p>

          {/* TOGGLE */}
          <div className="flex justify-center mt-4">
            <div className="flex border border-orange-300 rounded-full p-1">
              <button className="px-6 py-2 rounded-full bg-primary-500 text-white text-sm">
                Standard
              </button>
              <button className="px-6 py-2 text-sm text-gray-500">Unlimited</button>
            </div>
          </div>
        </div>

        {/* TOP SECTION */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
          <div className="grid md:grid-cols-[2fr_1fr] gap-6">

            {/* LEFT – PLANS */}
            <div>
              <h3 className="text-sm font-medium mb-4">Choose your package</h3>
              <div className="grid grid-cols-2 gap-4">
                {plans.map((p, i) => (
                  <div
                    key={p.id}
                    onClick={() => setSelected(i)}
                    className={`relative rounded-2xl p-5 cursor-pointer transition border ${
                      selected === i
                        ? "border-primary-500 bg-gradient-to-b from-[#FFF3E8] to-white"
                        : "border-gray-200 bg-white hover:border-primary-300"
                    }`}
                  >
                    {/* Radio */}
                    <div className="absolute top-4 right-4">
                      <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                        {selected === i && (
                          <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />
                        )}
                      </div>
                    </div>

                    <p className="text-sm font-medium text-gray-700">
                      {p.day} days • {p.data}
                    </p>
                    <p className="mt-4 font-semibold text-lg">
                      ${Number(p.price).toFixed(2)}{" "}
                      <span className="text-sm font-normal">USD</span>
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] border border-primary-400 rounded-full px-2 py-1 text-gray-500">
                      💳 3% credit in konttigo money
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT – SUMMARY */}
            <div>
              <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
                <div className="h-1 bg-primary-500" />
                <div className="p-5">

                  {/* Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <FcGlobe />
                      <span className="text-sm font-medium">
                        {globalEntry?.title ?? "Global"}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400">TOTAL PRICE</p>
                      <p className="text-2xl font-semibold">
                        ${Number(plan.price).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Data + Coverage */}
                  <div className="flex gap-3 mb-4">
                    <div className="flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-xl text-sm">
                      <FaWifi className="text-primary-500 text-lg" />
                      <div>
                        <p className="text-[10px] text-gray-400">Data</p>
                        <p className="font-medium">{plan.data}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl text-sm">
                      <IoLocationOutline className="text-primary-500 text-lg" />
                      <div>
                        <p className="text-[10px] text-gray-400">Validity</p>
                        <p className="font-medium">{plan.day} days</p>
                      </div>
                    </div>
                  </div>

                  {/* Activation */}
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl text-sm mb-4">
                    <MdOutlineBolt className="text-primary-500 text-lg" />
                    <div>
                      <p className="text-[10px] text-gray-400">Activation</p>
                      <p className="font-medium">Instant</p>
                    </div>
                  </div>

                  {/* Coverage */}
                  <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-xl text-sm mb-4 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Image src={globalIcon} alt="countries" width={20} height={20} />
                      <span>
                        {coverageCount > 0
                          ? `${coverageCount} Networks Worldwide`
                          : "167 Countries and Networks"}
                      </span>
                    </div>
                    <span className="text-gray-400">›</span>
                  </div>

                  {/* Promo */}
                  <div className="flex gap-2 mb-1">
                    <div className="flex items-center gap-2 border rounded-lg px-3 py-2 flex-1">
                      <FaTag className="text-gray-400" />
                      <input
                        placeholder="Promo Code"
                        className="flex-1 outline-none text-sm"
                      />
                    </div>
                    <button className="px-4 bg-orange-200 rounded-lg text-sm">
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mb-4 text-right">Apply Coupon</p>

                  {/* Buy */}
                  <button className="w-full bg-primary-500 text-white py-3 rounded-xl font-medium shadow-md flex items-center justify-center gap-2">
                    <FiShoppingBag />
                    Buy Now
                  </button>
                  <p className="text-[11px] text-gray-400 mt-2 text-center flex items-center justify-center gap-1">
                    <FaLock />
                    Secured payment · Instant delivery
                  </p>
                </div>
              </div>

              {/* Check device */}
              <button className="w-full mt-4 bg-primary-500 text-white py-3 rounded-xl font-medium shadow flex items-center justify-center gap-2">
                <MdPhoneIphone />
                Check Device Compatibility
              </button>

              {/* Info */}
              <div className="mt-4 bg-gray-50 border rounded-xl p-4 text-sm text-[#A1A1A1] space-y-3">
                <div className="flex items-center gap-2">
                  <BsCheck2Circle className="text-primary-500" />
                  <p>If you&apos;re running low, you can always top up</p>
                </div>
                <div className="flex items-center gap-2">
                  <BsCheck2Circle className="text-primary-500" />
                  <p>The package starts when you install the eSIM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {/* LEFT */}
          <div className="flex flex-col gap-6">
            <div className="border-[1.5px] border-primary-400 rounded-[28px] p-6 bg-gradient-to-b from-[#FFF7F0] to-white">
              <div className="inline-block border border-primary-400 bg-gradient-to-b from-[#FFF7F0] to-white px-5 py-2 rounded-full text-sm mb-4">
                Key features
              </div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Affordable global data plans, starting from ${Number(plans[0]?.price ?? 0).toFixed(2)}.</li>
                <li>• Worldwide coverage across {coverageCount || "167"}+ networks.</li>
                <li>• Works with all eSIM-compatible smartphones.</li>
              </ul>
            </div>
            <div className="border-[1.5px] border-primary-400 rounded-[28px] p-6 bg-gradient-to-b from-[#FFF7F0] to-white">
              <div className="inline-block border border-primary-400 bg-gradient-to-b from-[#FFF7F0] to-white px-5 py-2 rounded-full text-sm mb-4">
                Description
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Start your world tour with a Global eSIM and avoid sky-high roaming
                charges! Whether exploring as a tourist or on a business trip, stay
                connected everywhere with a prepaid international eSIM.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mt-2">
                With data options from {plans[0]?.data} to {plans[plans.length - 1]?.data},
                find the perfect plan for your journey. Just download the Konttigo app,
                pick your plan, and enjoy seamless global connectivity.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="border-[1.5px] border-primary-400 rounded-[28px] p-6 bg-gradient-to-b from-[#FFF7F0] to-white">
            <div className="inline-block border border-primary-400 bg-gradient-to-b from-[#FFF7F0] to-white px-5 py-2 rounded-full text-sm mb-4">
              Technical details
            </div>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Plan activation:</strong> Automatic when you arrive at your destination.</p>
              <p><strong>Plan duration:</strong> {plans[0]?.day} to {plans[plans.length - 1]?.day} days depending on plan.</p>
              <p><strong>Data plans:</strong> From {plans[0]?.data} to {plans[plans.length - 1]?.data}.</p>
              <p><strong>Delivery time:</strong> Instant delivery after purchase.</p>
              <p><strong>SMS:</strong> Not available.</p>
              <p><strong>Calls:</strong> Not available — only through VoIP apps.</p>
              <p><strong>Speed:</strong> 3G/4G/LTE/5G connectivity, depending on local network providers.</p>
              <p><strong>Hotspot:</strong> Unlimited access with no restrictions.</p>
              <p><strong>Coverage:</strong> Worldwide connectivity across {coverageCount || "167"}+ partner networks.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}