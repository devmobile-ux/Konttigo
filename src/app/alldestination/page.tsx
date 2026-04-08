"use client";

import { useState, useEffect } from "react";
import { getMinPrice, slugToIso, type EsimCountry } from "@/lib/api";
import ReactCountryFlag from "react-country-flag";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";

// API
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:80/konttigo-backend";

async function fetchLocalApi(): Promise<EsimCountry[]> {
  const res = await fetch(`${API_BASE}/airlo/packages?page=1&limit=177`);
  const json = await res.json();
  return json?.data ?? json;
}

async function fetchGlobalApi(): Promise<EsimCountry[]> {
  const res = await fetch(`${API_BASE}/airlo/packages?filter[type]=global`);
  const json = await res.json();
  return json?.data ?? json;
}

export default function AllDestinationPage() {
  const [activeTab, setActiveTab] = useState<"country" | "region">("country");
  const [data, setData] = useState<EsimCountry[]>([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      if (activeTab === "country") {
        const res = await fetchLocalApi();
        setData(res);
      } else {
        const res = await fetchGlobalApi();
        setData(res);
      }

      setLoading(false);
    };

    load();
  }, [activeTab]);

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold">
            All <span className="text-primary-500">Destinations</span>
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Find the best data plans in over 200 destinations — and enjoy easy and safe internet access wherever you go.
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center mb-8">
          <div className="flex border border-primary-300 rounded-full p-1">
            <button
              onClick={() => setActiveTab("country")}
              className={`px-6 py-2 rounded-full ${
                activeTab === "country"
                  ? "bg-primary-500 text-white"
                  : "text-gray-600"
              }`}
            >
              Country
            </button>

            <button
              onClick={() => setActiveTab("region")}
              className={`px-6 py-2 rounded-full ${
                activeTab === "region"
                  ? "bg-primary-500 text-white"
                  : "text-gray-600"
              }`}
            >
              Regional
            </button>
          </div>
        </div>

        {/* SEARCH */}
        <div className="mb-8 relative">
          {/* ICON */}
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

          {/* INPUT */}
          <input
            placeholder="Search for destination"
            className="w-full border rounded-xl pl-10 pr-4 py-3 outline-none focus:ring-2 focus:ring-primary-200"
          />
        </div>

        {/* GRID */}
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.map((c, i) => {
              const minPrice = getMinPrice(c);
              const code = slugToIso(c.slug);

              return (
                <div
                  key={i}
                  onClick={() =>
                    router.push(
                      activeTab === "country"
                        ? `/country/${c.slug}`
                        : `/region/${c.title.toLowerCase().replace(/\s+/g, "-")}`
                    )
                  }
                  className="bg-[#f5f5f5] rounded-xl px-4 py-4 flex items-center justify-between cursor-pointer 
                  transition-all duration-300 ease-in-out 
                  hover:bg-orange-50 hover:shadow-md hover:-translate-y-1"
                >
                  <div className="flex items-center gap-5">
                    {c.image?.url ? (
                      <Image
                        src={c.image.url}
                        alt={c.title}
                        width={24}
                        height={24}
                      />
                    ) : (
                      <ReactCountryFlag
                        countryCode={code}
                        svg
                        className="w-6 h-6"
                      />
                    )}

                    <div>
                      <p className="text-sm font-medium">{c.title}</p>
                      <p className="text-xs text-gray-500">
                        {minPrice ? `From $${minPrice}` : "View plans"}
                      </p>
                    </div>
                  </div>

                  <span>›</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}