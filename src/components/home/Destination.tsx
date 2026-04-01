"use client";

import { useState } from "react";
import ReactCountryFlag from "react-country-flag";
import Image  from "next/image";
import { FcGlobe } from "react-icons/fc";
import { useRouter } from "next/navigation";

const tabs = ["Popular", "Local", "Regional", "Global"];

// 🌍 Countries (for Popular & Local)
const countries = [
  { name: "Mexico", code: "MX", price: "$4.99" },
  { name: "Switzerland", code: "CH", price: "$3.99" },
  { name: "India", code: "IN", price: "$3.99" },
  { name: "United States", code: "US", price: "$3.99" },
  { name: "Costa Rica", code: "CR", price: "$7.99" },
  { name: "Austria", code: "AT", price: "$3.99" },
  { name: "Saudi Arabia", code: "SA", price: "$4.49" },
  { name: "Thailand", code: "TH", price: "$2.99" },
  { name: "South Africa", code: "ZA", price: "$3.99" }
];

// 🌍 Regional plans
const regions = [
  { name: "Africa", price: "$17.00" },
  { name: "Asia", price: "$17.00" },
  { name: "Latin America", price: "$17.00" },
  { name: "Europe", price: "$17.00" },
  { name: "Middle East and North Africa", price: "$17.00" },
  { name: "Caribbean Islands", price: "$17.00" },
  { name: "Oceania", price: "$17.00" },
  { name: "North America", price: "$17.00" },
  { name: "Africa Safari", price: "$17.00" }
];

const getRegionIcon = (name) => {
  switch (name) {
    case "Africa":
      return <Image src="/icons/AfricaIcon.svg" alt="Africa" width={34} height={34} />;

    case "Africa Safari":
      return <Image src="/icons/SafariIcon.svg" alt="Safari" width={34} height={34} />;

    case "Asia":
      return <Image src="/icons/AsiaIcon.svg" alt="Asia" width={34} height={34} />;

    case "Middle East and North Africa":
      return <Image src="/icons/MENAIcon.svg" alt="MENA" width={34} height={34} />;

    case "Europe":
      return <Image src="/icons/EuropeIcon.svg" alt="Europe" width={34} height={34} />;

    case "European Union and United Kingdom":
      return <Image src="/icons/EU_UKIcon.svg" alt="EU UK" width={34} height={34} />;

    case "Latin America":
      return <Image src="/icons/LatinIcon.svg" alt="Latin" width={34} height={34} />;

    case "Caribbean Islands":
      return <Image src="/icons/Caribbean.svg" alt="Caribbean" width={34} height={34} />;

    case "North America":
      return <Image src="/icons/NorthAmerica.svg" alt="North America" width={34} height={34} />;

    case "Oceania":
      return <Image src="/icons/OceaniaIcon.svg" alt="Oceania" width={34} height={34} />;

    default:
      return <Image src="/icons/AfricaIcon.svg" alt="Default" width={34} height={34} />;
  }
};

// Global plans
const globalPlans = [
  { name: "Discover Global", price: "$8.00" }
];


export default function Destination() {
  const [activeTab, setActiveTab] = useState("Popular");

  const router = useRouter();

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold">
            Explore High-Speed eSIM Data 
          </h2>
          <h2 className="text-4xl font-semibold">Plans for <span className="text-primary-500">200+ Countries & Region</span></h2>
          <p className="text-textSecondary mt-2 text-md">
            Find affordable eSIM data plans for your next trip in just seconds.
          </p>
        </div>

        {/* TABS */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-[#f9f9f9] border border-[#f3d3b3] rounded-full p-1 gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-16 py-3 rounded-full text-md transition ${
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
          
        {/* ===================== */}
        {/* DYNAMIC CONTENT */}
        {/* ===================== */}

        {/* COUNTRY GRID */}
{(activeTab === "Popular" || activeTab === "Local") && (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {countries.map((country, i) => (
     <div
        key={i}
        onClick={() =>
          router.push(
            `/country/${country.name.toLowerCase().replace(/\s+/g, "-")}`
          )
        }
        className="bg-[#f5f5f5] rounded-xl px-4 py-4 flex items-center justify-between hover:bg-gray-100 transition cursor-pointer"
      >
        {/* LEFT */}
        <div className="flex items-center gap-5">
          
          {/* FLAG */}
          <ReactCountryFlag
            countryCode={country.code}
            svg
            className="w-6 h-6 rounded-full object-cover text-3xl"
          />

          {/* TEXT */}
          <div>
            <p className="text-sm font-medium">{country.name}</p>
            <p className="text-xs text-gray-500">
              From {country.price}
            </p>
          </div>
        </div>

        {/* RIGHT ARROW */}
        <span className="text-gray-400 text-lg">›</span>
      </div>
    ))}
  </div>
)}

        {/* 🌍 REGIONAL */}
        {activeTab === "Regional" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {regions.map((region, i) => (
              <div
                key={i}
                onClick={()=>
                  router.push(`/region/${region.name.toLowerCase().replace(/\s+/g, "-")}`)
                }
                className="bg-[#f5f5f5] rounded-xl px-4 py-4 flex items-center justify-between hover:bg-gray-100 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-3xl flex items-center justify-center">
                    {getRegionIcon(region.name)}
                  </div>

                  <div>
                    <p className="text-sm font-medium">{region.name}</p>
                    <p className="text-xs text-gray-500">{region.price}</p>
                  </div>
                </div>

                <span className="text-gray-400">›</span>
              </div>
            ))}
          </div>
        )}

        {/* 🌐 GLOBAL */}
        {activeTab === "Global" && (
          <div className="flex justify-left">
            {globalPlans.map((plan, i) => (
              <div
                key={i}
                onClick={() => router.push(`/global`)}
                className="bg-[#f5f5f5] rounded-xl px-6 py-4 flex items-center justify-between w-full md:w-[400px] hover:bg-gray-100 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-4xl ">
                    <FcGlobe />
                  </div>

                  <div>
                    <p className="text-sm font-medium">{plan.name}</p>
                    <p className="text-xs text-gray-500">{plan.price}</p>
                  </div>
                </div>

                <span className="text-gray-400">›</span>
              </div>
            ))}
          </div>
        )}

        {/* VIEW MORE BUTTON */}
        <div className="flex justify-center mt-10">
          <button className="border border-primary-500 text-primary-500 px-8 py-3 rounded-xl hover:bg-primary-100 transition">
            Explore All Destinations
          </button>
        </div>

      </div>
    </section>
  );
}