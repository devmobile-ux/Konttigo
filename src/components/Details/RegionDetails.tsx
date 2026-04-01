"use client";

import { useState } from "react";
import Image from "next/image";
import { FaWifi, FaLock, FaTag } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { BsCheck2Circle } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineBolt } from "react-icons/md";

// ✅ Plans (same as country)
const plans = [
  { duration: "7 days", data: "1 GB", price: 4.5 },
  { duration: "15 days", data: "2 GB", price: 5 },
  { duration: "30 days", data: "3 GB", price: 4.5 },
  { duration: "30 days", data: "5 GB", price: 9 },
  { duration: "30 days", data: "10 GB", price: 11.5 },
  { duration: "30 days", data: "20 GB", price: 18.5 },
];

// ✅ Region → icon mapping (USE YOUR SVGs)
const regionIconMap: Record<string, string> = {
  europe: "/icons/EuropeIcon.svg",
  asia: "/icons/AsiaIcon.svg",
  africa: "/icons/AfricaIcon.svg",
  "middle east and north africa": "/icons/MENAIcon.svg",
  "latin america": "/icons/LatinIcon.svg",
  oceania: "/icons/OceaniaIcon.svg",
  "north america": "/icons/NorthAmerica.svg",
};

const getRegionIcon = (region: string) => {
  return regionIconMap[region.toLowerCase()] || "/icons/EuropeIcon.svg";
};

export default function RegionDetails({ region }: { region: string }) {
  const [selected, setSelected] = useState(0);
  const plan = plans[selected];

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
            eSIM for{" "}
            <span className="text-primary-500 capitalize">{region}</span>
          </h1>

          <p className="text-sm text-gray-500 mt-2">
            Get an eSIM for {region} and enjoy reliable and affordable internet access on your trip.
          </p>

          {/* TOGGLE */}
          <div className="flex justify-center mt-4">
            <div className="flex border border-orange-300 rounded-full p-1">
              <button className="px-6 py-2 rounded-full bg-primary-500 text-white text-sm">
                Standard
              </button>
              <button className="px-6 py-2 text-sm">Unlimited</button>
            </div>
          </div>
        </div>

        {/* TOP SECTION */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 shadow-sm">
          <div className="grid md:grid-cols-[2fr_1fr] gap-6">

            {/* LEFT - PLANS */}
            <div>
              <h3 className="text-sm font-medium mb-4">Choose your package</h3>

              <div className="grid grid-cols-2 gap-4">
                {plans.map((p, i) => (
                  <div
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`relative rounded-2xl p-5 cursor-pointer transition border
                      ${
                        selected === i
                          ? "border-primary-500 bg-gradient-to-b from-[#FFF3E8] to-white"
                          : "border-gray-200 bg-white hover:border-primary-300"
                      }`}
                  >
                    {/* RADIO */}
                    <div className="absolute top-4 right-4">
                      <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                        {selected === i && (
                          <div className="w-2.5 h-2.5 bg-primary-500 rounded-full" />
                        )}
                      </div>
                    </div>

                    <p className="text-sm font-medium text-gray-700">
                      {p.duration} • {p.data}
                    </p>

                    <p className="mt-4 font-semibold text-lg">
                      ${p.price.toFixed(2)}{" "}
                      <span className="text-sm font-normal">USD</span>
                    </p>

                    <div className="mt-2 inline-flex items-center gap-1 text-[10px] border border-primary-400 rounded-full px-2 py-1 text-gray-500">
                      💳 3% credit in konttigo money
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT - SUMMARY */}
            <div>
              <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">

                {/* TOP BORDER */}
                <div className="h-1 bg-primary-500" />

                <div className="p-5">

                  {/* HEADER */}
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
                        ${plan.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* DATA + COVERAGE */}
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
                        <p className="text-[10px] text-gray-400">Coverage</p>
                        <p className="font-medium">17 Countries</p>
                      </div>
                    </div>
                  </div>

                  {/* ACTIVATION */}
                  <div className="flex items-center gap-2 bg-gray-100 px-4 py-3 rounded-xl text-sm mb-4">
                    <MdOutlineBolt className="text-primary-500 text-lg" />
                    <div>
                      <p className="text-[10px] text-gray-400">Activation</p>
                      <p className="font-medium">Instant</p>
                    </div>
                  </div>

                  {/* COUNTRIES ROW */}
                  <div className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-xl text-sm mb-4 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <Image
                        src={getRegionIcon(region)}
                        alt="countries"
                        width={20}
                        height={20}
                      />
                      <span>17 Countries and Networks</span>
                    </div>

                    <span className="text-gray-400">›</span>
                  </div>

                  {/* PROMO */}
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

                  {/* BUY */}
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

              {/* CHECK DEVICE */}
              <button className="w-full mt-4 bg-primary-500 text-white py-3 rounded-xl font-medium shadow flex items-center justify-center gap-2">
                <MdPhoneIphone />
                Check Device Compatibility
              </button>

              {/* INFO */}
              <div className="mt-4 bg-gray-50 border rounded-xl p-4 text-sm text-[#A1A1A1] space-y-3">
                <div className="flex items-center gap-2">
                  <BsCheck2Circle className="text-primary-500" />
                  <p>If you're running low, you can always top up</p>
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
                <li>• Affordable data plans, starting from US$4.50.</li>
                <li>• Reliable connection from the USA’s best networks.</li>
                <li>• Works with all eSIM-compatible smartphones.</li>
              </ul>
            </div>

            <div className="border-[1.5px] border-primary-400 rounded-[28px] p-6 bg-gradient-to-b from-[#FFF7F0] to-white">
              <div className="inline-block border border-primary-400 bg-gradient-to-b from-[#FFF7F0] to-white px-5 py-2 rounded-full text-sm mb-4">
                Description
              </div>

              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                Start your trip by getting an eSIM for {region} and avoid sky-high roaming charges! Whether you’re exploring as a tourist or closing business deals, stay connected in Sri Lanka with a prepaid eSIM.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
              Find the best mobile data plan for your trip, with options ranging from 1 GB to 20 GB or unlimited plans. Just download the Konttigo app, pick your data plan, and enjoy easy internet access while visiting Sri Lanka.
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="border-[1.5px] border-primary-400 rounded-[28px] p-6 bg-gradient-to-b from-[#FFF7F0] to-white">
            <div className="inline-block border border-primary-400 bg-gradient-to-b from-[#FFF7F0] to-white px-5 py-2 rounded-full text-sm mb-4">
              Technical details
            </div>

            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>Plan activation:</strong> Automatic when you arrive at your destination (as long as you've turned on your Konttigo eSIM in your settings and enabled roaming).</p>
              <p><strong>Plan duration:</strong>  Depends on the plan - either 7 or 30 days. </p>
              <p><strong>Data plans:</strong> From 1GB to 20GB or unlimited.</p>
              <p><strong>Delivery time:</strong> Instant delivery after purchase.</p>
              <p><strong>SMS:</strong> Not available.</p>
              <p><strong>Calls:</strong> Not available - only through VoIP apps, such as WhatsApp, Signal, and others.</p>
              <p><strong>Speed:</strong> 3G/4G/LTE/5G connectivity, depending on local network providers.</p>
              <p><strong>Hotspot:</strong> Unlimited access with no restrictions.</p>
              <p><strong>Coverage:</strong> Enjoy reliable internet access in various destinations across Sri Lanka, such as Colombo, Kandy, Galle, Ella, and other major cities and tourist areas.*</p>
              <p><strong>Please note that coverage quality will depend on local network providers.</strong></p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}