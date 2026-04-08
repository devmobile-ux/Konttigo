"use client";

import { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";
import Image from "next/image";
import { FaWifi, FaLock, FaTag } from "react-icons/fa";
import { MdSignalCellularAlt, MdPhoneIphone, MdApartment } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { BsCheck2Circle } from "react-icons/bs";
import { getLocalPackages, slugToIso, type EsimCountry, type EsimPackage } from "@/lib/api";
import { useRouter } from "next/navigation";
// ────────────────────────────────────────────────────────────
// Skeleton loaders
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
export default function CountryDetails({ country }: { country: string }) {
  const [countryData, setCountryData] = useState<EsimCountry | null>(null);
  const [plans, setPlans] = useState<EsimPackage[]>([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isCompatible, setIsCompatible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Normalize slug: "sri lanka" → "sri-lanka" for matching
  const normalizedSlug = country.toLowerCase().replace(/\s+/g, "-");

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const allCountries = await getLocalPackages();
        if (cancelled) return;

        // Match by slug or title
        const match = allCountries.find(
          (c) =>
            c.slug?.toLowerCase() === normalizedSlug ||
            c.title?.toLowerCase() === country.toLowerCase()
        );

        if (match) {
          setCountryData(match);
          const allPlans = match.operators.flatMap((op) => op.packages ?? []);
          setPlans(allPlans);
          setSelected(0);
        } else {
          setError(`No eSIM plans found for "${country}".`);
        }
      } catch {
        if (!cancelled) setError("Failed to load plans. Please try again.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [country, normalizedSlug]);

  const plan = plans[selected] ?? null;
  const countryCode = slugToIso(normalizedSlug || country);

  // Operators list for the "Providers" row
  const operators = countryData?.operators ?? [];

  // ── Loading state ─────────────────────────────────────────
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
                  {Array.from({ length: 4 }).map((_, i) => (
                    <PlanSkeleton key={i} />
                  ))}
                </div>
              </div>
              <div className="h-80 bg-gray-100 rounded-3xl animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }
  const router = useRouter();

  // ── Error state ────────────────────────────────────────────
  if (error || !plan) {
    return (
      <section className="bg-[#FFFFFF] py-10">
        <div className="max-w-7xl mx-auto px-6 text-center py-20">
          <p className="text-xl font-medium text-gray-600 capitalize">{country}</p>
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
          <h1 className="text-3xl font-semibold">
            eSIM for the{" "}
            <span className="text-primary-500 capitalize">{country}</span>
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Get an eSIM for {country} and enjoy reliable and affordable internet access on your trip.
          </p>

          {/* TOGGLE — standard only for now */}
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
                      {countryData?.image?.url ? (
                        <Image 
                          src={countryData.image.url} 
                          alt={country} 
                          width={28} 
                          height={20} 
                          className="rounded-sm object-cover w-7 h-5"
                        />
                      ) : (
                        <ReactCountryFlag
                          countryCode={countryCode}
                          svg
                          className="w-7 h-5 rounded-sm"
                        />
                      )}
                      <span className="text-sm font-medium capitalize">{country}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400">TOTAL PRICE</p>
                      <p className="text-2xl font-semibold">
                        ${Number(plan.price).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Data + Network chips */}
                  <div className="flex gap-3 mb-5">
                    <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl text-sm">
                      <FaWifi className="text-primary-500 text-lg" />
                      <div>
                        <p className="text-[10px] text-gray-400">Data</p>
                        <p className="font-medium">{plan.data}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl text-sm">
                      <MdSignalCellularAlt className="text-primary-500 text-lg" />
                      <div>
                        <p className="text-[10px] text-gray-400">Validity</p>
                        <p className="font-medium">{plan.day} days</p>
                      </div>
                    </div>
                  </div>

                  {/* Providers */}
                  {operators.length > 0 && (
                    <>
                      <p className="text-xs text-gray-400 mb-2">PROVIDERS</p>
                      <div className="flex gap-2 flex-wrap mb-4">
                        {operators.slice(0, 3).map((op) => (
                          <span
                            key={op.id}
                            className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-xl text-sm"
                          >
                            <MdApartment className="text-primary-500" />
                            {op.title}
                          </span>
                        ))}
                      </div>
                    </>
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
                  <button  disabled={!isCompatible}
                    onClick={() =>
                     router.push(
                      `/checkout?type=country&name=${country}&data=${plan.data}&duration=${plan.day}&price=${plan.price}`
                    )
                    }
                    className={`w-full py-3 rounded-xl font-medium shadow-md flex items-center justify-center gap-2 ${
                      isCompatible
                        ? "bg-primary-500 text-white hover:bg-primary-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <FiShoppingBag />
                    Buy Now
                  </button>
                  <p className="text-[11px] text-gray-400 mt-2 text-center flex items-center justify-center gap-1">
                    <FaLock className="text-gray-400" />
                    Secured payment · Instant delivery
                  </p>
                </div>
              </div>

              {/* Check device */}
              <button 
              onClick = {() => setShowModal(true)}
              className="w-full mt-4 bg-primary-500 text-white py-3 rounded-xl font-medium shadow flex items-center justify-center gap-2">
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
                <li>• Reliable connection from the best local networks.</li>
                <li>• Works with all eSIM-compatible smartphones.</li>
              </ul>
            </div>
            <div className="border-[1.5px] border-primary-400 rounded-[28px] p-6 bg-gradient-to-b from-[#FFF7F0] to-white">
              <div className="inline-block border border-primary-400 bg-gradient-to-b from-[#FFF7F0] to-white px-5 py-2 rounded-full text-sm mb-4">
                Description
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Start your trip by getting an eSIM for{" "}
                <span className="capitalize">{country}</span> and avoid sky-high
                roaming charges! Whether you&apos;re exploring as a tourist or
                closing business deals, stay connected with a prepaid eSIM.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mt-2">
                Find the best mobile data plan for your trip, with options
                ranging from {plans[0]?.data} to {plans[plans.length - 1]?.data}.
                Just download the Konttigo app, pick your data plan, and enjoy
                easy internet access.
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
              <p><strong>Plan duration:</strong> {plans[0]?.day} days to {plans[plans.length - 1]?.day} days depending on plan.</p>
              <p><strong>Data plans:</strong> From {plans[0]?.data} to {plans[plans.length - 1]?.data}.</p>
              <p><strong>Delivery time:</strong> Instant delivery after purchase.</p>
              <p><strong>SMS:</strong> Not available.</p>
              <p><strong>Calls:</strong> Not available — only through VoIP apps.</p>
              <p><strong>Speed:</strong> 3G/4G/LTE/5G connectivity, depending on local network providers.</p>
              <p><strong>Hotspot:</strong> Unlimited access with no restrictions.</p>
            </div>
          </div>
        </div>

      </div>
      {showModal && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    
    <div className="bg-white w-[90%] md:w-[600px] max-h-[80vh] overflow-y-auto rounded-2xl p-6 relative">

      {/* CLOSE */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-4 right-4 text-gray-500 text-xl"
      >
        ✕
      </button>

      {/* TITLE */}
      <h2 className="text-2xl font-semibold text-primary-500 mb-4">
        Device Compatibility
      </h2>

      <h3 className="text-lg font-medium mb-4">
        What devices support eSIM?
      </h3>

      {/* INFO BOX */}
      <div className="bg-gray-100 rounded-xl p-4 mb-4 space-y-2">
        <p className="flex items-center gap-2 text-sm">
          ✅ The device supports eSIMs
        </p>
        <p className="flex items-center gap-2 text-sm">
          ✅ The device is not carrier-locked
        </p>
        <p className="flex items-center gap-2 text-sm">
          ✅ The device is not rooted or jailbroken
        </p>
      </div>

      {/* NOTE */}
      <p className="text-sm text-gray-600 mb-3">
        You can check if your device supports eSIM. Some regional models may not support it.
      </p>

      <p className="text-xs text-gray-400 mb-4">
        This list is temporary for demo purposes.
      </p>

      {/* SEARCH */}
      <input
        placeholder="Search devices..."
        className="w-full border rounded-xl px-4 py-2 mb-4"
      />

      {/* SAMPLE DEVICES */}
      <div className="text-sm space-y-2 mb-6">
        <p>• iPhone 13, 14, 15 series</p>
        <p>• Samsung Galaxy S21, S22, S23</p>
        <p>• Google Pixel 6, 7, 8</p>
        <p>• iPad Pro (latest models)</p>
      </div>

      {/* ACCEPT BUTTON */}
      <button
        onClick={() => {
          setIsCompatible(true);
          setShowModal(false);
        }}
        className="w-full bg-primary-500 text-white py-3 rounded-xl font-medium shadow"
      >
        Read and accept
      </button>

    </div>
  </div>
)}

    </section>
  );
}