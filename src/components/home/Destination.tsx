"use client";

import { useState, useEffect, useRef } from "react";
import ReactCountryFlag from "react-country-flag";
import Image from "next/image";
import { FcGlobe } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { getMinPrice, slugToIso, type EsimCountry } from "@/lib/api";

// ──────────────────────────────────────────────
// API base — mirror konttigo-web's pattern exactly
// ──────────────────────────────────────────────
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:80/konttigo-backend";

async function apiGetPackages(params: Record<string, string>): Promise<EsimCountry[]> {
  const query = new URLSearchParams(params).toString();
  const url = `${API_BASE}/airlo/packages${query ? `?${query}` : ""}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`API ${res.status}`);
  const json = await res.json();
  const data = json?.data ?? json;
  return Array.isArray(data) ? data : [data];
}

// konttigo-web pattern:
//   local   → page=1&limit=177
//   regional → filter[type]=global  (same as global data, region renderer shows ALL)
//   global  → filter[type]=global   (then we filter slug==="world" or type==="global")
async function fetchLocalApi(): Promise<EsimCountry[]> {
  return apiGetPackages({ page: "1", limit: "177" });
}

async function fetchGlobalApi(): Promise<EsimCountry[]> {
  return apiGetPackages({ "filter[type]": "global" });
}

// ──────────────────────────────────────────────
// Types & tabs
// ──────────────────────────────────────────────
type TabKey = "Popular" | "Local" | "Regional" | "Global";
const TABS: TabKey[] = ["Popular", "Local", "Regional", "Global"];

// Region icon helper
const regionIconMap: Record<string, string> = {
  africa: "/icons/AfricaIcon.svg",
  "africa safari": "/icons/SafariIcon.svg",
  asia: "/icons/AsiaIcon.svg",
  "middle east and north africa": "/icons/MENAIcon.svg",
  europe: "/icons/EuropeIcon.svg",
  "european union and united kingdom": "/icons/EU_UKIcon.svg",
  "latin america": "/icons/LatinIcon.svg",
  "caribbean islands": "/icons/Caribbean.svg",
  "north america": "/icons/NorthAmerica.svg",
  oceania: "/icons/OceaniaIcon.svg",
};
const getRegionIcon = (name: string) =>
  regionIconMap[name.toLowerCase()] ?? "/icons/AfricaIcon.svg";

// ──────────────────────────────────────────────
// Skeleton card
// ──────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-[#f5f5f5] rounded-xl px-4 py-4 flex items-center justify-between animate-pulse">
      <div className="flex items-center gap-5">
        <div className="w-6 h-6 rounded-full bg-gray-300" />
        <div className="space-y-2">
          <div className="h-3 w-24 bg-gray-300 rounded" />
          <div className="h-2 w-16 bg-gray-200 rounded" />
        </div>
      </div>
      <div className="w-4 h-4 bg-gray-300 rounded" />
    </div>
  );
}

// ──────────────────────────────────────────────
// Cache shape — mirror konttigo-web's tabData
// ──────────────────────────────────────────────
interface TabCache {
  data: EsimCountry[];
  timestamp: number;
}
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// ──────────────────────────────────────────────
// Main component
// ──────────────────────────────────────────────
export default function Destination() {
  const [activeTab, setActiveTab] = useState<TabKey>("Popular");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Displayed data for current tab
  const [displayData, setDisplayData] = useState<EsimCountry[]>([]);

  // Cache stored in a ref — never triggers re-renders, never causes loop
  const cacheRef = useRef<Partial<Record<string, TabCache>>>({});

  const router = useRouter();

  // ── Core fetch logic — mirrors konttigo-web controller exactly ──
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      // Check cache (konttigo-web pattern: 5 min TTL)
      const cached = cacheRef.current[activeTab];
      if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
        setDisplayData(cached.data);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let rawData: EsimCountry[] = [];

        if (activeTab === "Local" || activeTab === "Popular") {
          // konttigo-web: fetchPackages("local") → page=1&limit=177
          rawData = await fetchLocalApi();
        } else {
          // konttigo-web: regional → fetchPackages("global"), global → fetchGlobalPackages()
          // BOTH call filter[type]=global — then rendering differentiates them
          rawData = await fetchGlobalApi();
        }

        if (cancelled) return;

        // Store in cache
        cacheRef.current[activeTab] = { data: rawData, timestamp: Date.now() };

        // For Popular: shuffle and show top 9 (konttigo-web: getRandomPopularESIMs)
        if (activeTab === "Popular") {
          const shuffled = [...rawData].sort(() => 0.5 - Math.random());
          setDisplayData(shuffled.slice(0, 9));
        } else if (activeTab === "Global") {
          // konttigo-web: filter for world/global type only
          const globalOnly = rawData.filter(
            (c) => c.slug === "world" || c.type === "global"
          );
          setDisplayData(globalOnly.length > 0 ? globalOnly : rawData);
        } else {
          // Local and Regional: show all
          setDisplayData(rawData);
        }
      } catch (err) {
        if (!cancelled) setError("Failed to load eSIM data. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [activeTab]); // ← ONLY activeTab — no callbacks, no state deps → no infinite loop

  // ── Navigation ─────────────────────────────
  const goToCountry = (slug: string) => router.push(`/country/${slug}`);
  const goToRegion = (name: string) =>
    router.push(`/region/${name.toLowerCase().replace(/\s+/g, "-")}`);

  // ── Render: country grid (Popular / Local) ──
  const renderCountryGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {displayData.map((c, i) => {
        const minPrice = getMinPrice(c);
        const code = slugToIso(c.slug);
        return (
          <div
            key={`${c.slug}-${i}`}
            onClick={() => goToCountry(c.slug)}
            className="bg-[#f5f5f5] rounded-xl px-4 py-4 flex items-center justify-between hover:bg-orange-50 transition cursor-pointer border border-transparent hover:border-orange-200"
          >
            <div className="flex items-center gap-5">
              {c.image?.url ? (
                <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center shrink-0">
                  <Image 
                    src={c.image.url} 
                    alt={c.title} 
                    width={24} 
                    height={24} 
                    className="object-cover w-full h-full"
                  />
                </div>
              ) : (
                <ReactCountryFlag
                  countryCode={code}
                  svg
                  className="w-6 h-6 rounded-full object-cover text-3xl"
                />
              )}
              <div>
                <p className="text-sm font-medium">{c.title}</p>
                <p className="text-xs text-gray-500">
                  {minPrice != null ? `From $${minPrice.toFixed(2)}` : "View plans"}
                </p>
              </div>
            </div>
            <span className="text-gray-400 text-lg">›</span>
          </div>
        );
      })}
    </div>
  );

  // ── Render: regional grid ───────────────────
  // konttigo-web shows ALL entries returned by filter[type]=global for regional tab
  const renderRegionalGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {displayData.map((r, i) => {
        const minPrice = getMinPrice(r);
        const icon = getRegionIcon(r.title);
        return (
          <div
            key={`${r.slug}-${i}`}
            onClick={() => goToRegion(r.title)}
            className="bg-[#f5f5f5] rounded-xl px-4 py-4 flex items-center justify-between hover:bg-orange-50 transition cursor-pointer border border-transparent hover:border-orange-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-200 rounded-3xl flex items-center justify-center overflow-hidden">
                <Image src={icon} alt={r.title} width={34} height={34} />
              </div>
              <div>
                <p className="text-sm font-medium">{r.title}</p>
                <p className="text-xs text-gray-500">
                  {minPrice != null ? `From $${minPrice.toFixed(2)}` : "View plans"}
                </p>
              </div>
            </div>
            <span className="text-gray-400">›</span>
          </div>
        );
      })}
    </div>
  );

  // ── Render: global grid ─────────────────────
  // konttigo-web filters for slug==="world" || type==="global"
  const renderGlobalGrid = () => (
    <div className="flex flex-wrap gap-4">
      {displayData.map((g, i) => {
        const minPrice = getMinPrice(g);
        return (
          <div
            key={`${g.slug}-${i}`}
            onClick={() => router.push("/global")}
            className="bg-[#f5f5f5] rounded-xl px-6 py-4 flex items-center justify-between w-full md:w-[400px] hover:bg-orange-50 transition cursor-pointer border border-transparent hover:border-orange-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-4xl">
                <FcGlobe />
              </div>
              <div>
                <p className="text-sm font-medium">{g.title}</p>
                <p className="text-xs text-gray-500">
                  {minPrice != null ? `From $${minPrice.toFixed(2)}` : "View plans"}
                </p>
              </div>
            </div>
            <span className="text-gray-400">›</span>
          </div>
        );
      })}
    </div>
  );

  // ── Active content ──────────────────────────
  const renderContent = () => {
    if (error)
      return <div className="text-center py-10 text-red-500 text-sm">{error}</div>;

    if (loading)
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      );

    if (displayData.length === 0)
      return (
        <div className="text-center py-10 text-gray-400 text-sm">No eSIM plans found.</div>
      );

    switch (activeTab) {
      case "Popular":
      case "Local":
        return renderCountryGrid();
      case "Regional":
        return renderRegionalGrid();
      case "Global":
        return renderGlobalGrid();
    }
  };

  // ── JSX ─────────────────────────────────────
  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold">Explore High-Speed eSIM Data</h2>
          <h2 className="text-4xl font-semibold">
            Plans for{" "}
            <span className="text-primary-500">200+ Countries &amp; Region</span>
          </h2>
          <p className="text-textSecondary mt-2 text-md">
            Find affordable eSIM data plans for your next trip in just seconds.
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-[#f9f9f9] border border-[#f3d3b3] rounded-full p-1 gap-2 flex-wrap justify-center">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-10 md:px-16 py-3 rounded-full text-md transition ${
                  activeTab === tab
                    ? "bg-primary-500 text-white"
                    : "text-textPrimary hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* DYNAMIC CONTENT */}
        <div className="min-h-[300px]">{renderContent()}</div>

        {/* VIEW MORE */}
        <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              if (activeTab === "Regional") router.push("/region/europe");
              else if (activeTab === "Global") router.push("/global");
              else router.push("/country/india");
            }}
            className="border border-primary-500 text-primary-500 px-8 py-3 rounded-xl hover:bg-primary-100 transition"
          >
            Explore All Destinations
          </button>
        </div>

      </div>
    </section>
  );
}