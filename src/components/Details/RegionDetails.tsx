"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaWifi, FaLock, FaTag } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { BsCheck2Circle } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineBolt } from "react-icons/md";
import { type EsimCountry, type EsimPackage } from "@/lib/api";

// konttigo-web uses filter[type]=global for the Regional tab
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:80/konttigo-backend";

async function fetchRegionData(): Promise<EsimCountry[]> {
  const url = `${API_BASE}/airlo/packages?filter[type]=global`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const json = await res.json();
  const data = json?.data ?? json;
  return Array.isArray(data) ? data : [data];
}

// ────────────────────────────────────────────────────────────
// Region icon helper
// ────────────────────────────────────────────────────────────
const regionIconMap: Record<string, string> = {
  europe: "/icons/EuropeIcon.svg",
  asia: "/icons/AsiaIcon.svg",
  africa: "/icons/AfricaIcon.svg",
  "africa safari": "/icons/SafariIcon.svg",
  "middle east and north africa": "/icons/MENAIcon.svg",
  "latin america": "/icons/LatinIcon.svg",
  oceania: "/icons/OceaniaIcon.svg",
  "north america": "/icons/NorthAmerica.svg",
  "caribbean islands": "/icons/Caribbean.svg",
  "european union and united kingdom": "/icons/EU_UKIcon.svg",
};

const getRegionIcon = (region: string) =>
  regionIconMap[region.toLowerCase()] ?? "/icons/EuropeIcon.svg";

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
export default function RegionDetails({ region }: { region: string }) {
  const [regionData, setRegionData] = useState<EsimCountry | null>(null);
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
        // konttigo-web: regional tab fetches filter[type]=global
        const allRegions = await fetchRegionData();
        if (cancelled) return;

        // Match by title or slug
        const match = allRegions.find(
          (r) =>
            r.title?.toLowerCase() === region.toLowerCase() ||
            r.slug?.toLowerCase() === region.toLowerCase().replace(/\s+/g, "-")
        );

        if (match) {
          setRegionData(match);
          const allPlans = match.operators.flatMap((op) => op.packages ?? []);
          setPlans(allPlans);
          setSelected(0);
        } else {
          setError(`No eSIM plans found for "${region}".`);
        }
      } catch {
        if (!cancelled) setError("Failed to load plans. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [region]);

  const plan = plans[selected] ?? null;

  // Country count from operators (estimate from coverage info)
  const coverageCount = regionData?.operators?.length ?? 0;

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
          <p className="text-xl font-medium text-gray-600 capitalize">{region}</p>
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
            <Image
              src={getRegionIcon(region)}
              alt={region}
              width={28}
              height={28}
            />
            eSIM for the {region} -
            <span className="text-primary-500 capitalize">Prepaid & Unlimited Data Plans</span>
          </h1>
          <p className="text-md text-gray-500 mt-2">
            Traveling across the {region}? Get the best eSIM for the {region} starting from $4.99.<br/> Our eSIM USA data plans provide affordable prepaid & unlimited internet, instant<br/> activation, and reliable coverage across major cities and destinations.
          </p>

          <h2 className="text-3xl font-semibold flex items-center justify-center gap-2 mt-8">
           Choose <span className="text-primary-500 capitalize">{region}</span> eSIM Data Plan
           
          </h2>

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
                      <Image
                        src={getRegionIcon(region)}
                        alt={region}
                        width={24}
                        height={24}
                      />
                      <span className="text-sm font-medium capitalize">{region}</span>
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
                    <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl text-sm">
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

                  {/* Coverage countries */}
                  {coverageCount > 0 && (
                    <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-xl text-sm mb-4 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <Image
                          src={getRegionIcon(region)}
                          alt="countries"
                          width={20}
                          height={20}
                        />
                        <span>{coverageCount} Network{coverageCount !== 1 ? "s" : ""} Available</span>
                      </div>
                      <span className="text-gray-400">›</span>
                    </div>
                  )}

                  {/* Promo */}
                  <div className="flex gap-2 mb-4">
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
                <li>• Affordable data plans, starting from ${Number(plans[0]?.price ?? 0).toFixed(2)}.</li>
                <li>• Regional coverage across multiple countries.</li>
                <li>• Works with all eSIM-compatible smartphones.</li>
              </ul>
            </div>
            <div className="border-[1.5px] border-primary-400 rounded-[28px] p-6 bg-gradient-to-b from-[#FFF7F0] to-white">
              <div className="inline-block border border-primary-400 bg-gradient-to-b from-[#FFF7F0] to-white px-5 py-2 rounded-full text-sm mb-4">
                Description
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Start your trip by getting an eSIM for{" "}
                <span className="capitalize">{region}</span> and avoid
                sky-high roaming charges! Stay connected across the region with
                one convenient prepaid eSIM plan.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mt-2">
                With data options from {plans[0]?.data} to {plans[plans.length - 1]?.data},
                find the perfect plan for your journey. Just download the Konttigo
                app, pick your plan, and enjoy seamless connectivity.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="border-[1.5px] border-primary-400 rounded-[28px] p-6 bg-gradient-to-b from-[#FFF7F0] to-white">
            <div className="inline-block border border-primary-400 bg-gradient-to-b from-[#FFF7F0] to-white px-5 py-2 rounded-full text-sm mb-4">
              Technical details
            </div>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Plan activation:</strong> Automatic when you arrive in the region.</p>
              <p><strong>Plan duration:</strong> {plans[0]?.day} to {plans[plans.length - 1]?.day} days depending on plan.</p>
              <p><strong>Data plans:</strong> From {plans[0]?.data} to {plans[plans.length - 1]?.data}.</p>
              <p><strong>Delivery time:</strong> Instant delivery after purchase.</p>
              <p><strong>SMS:</strong> Not available.</p>
              <p><strong>Calls:</strong> Not available — only through VoIP apps.</p>
              <p><strong>Speed:</strong> 3G/4G/LTE/5G connectivity, depending on local network providers.</p>
              <p><strong>Hotspot:</strong> Unlimited access with no restrictions.</p>
              <p><strong>Coverage:</strong> Multiple countries and networks across the{" "}
                <span className="capitalize">{region}</span> region.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}