"use client";

import ReactCountryFlag from "react-country-flag";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Props = {
  type: "country" | "region";
  name: string;
};

const countryList = [
  { name: "Mexico", code: "MX", price: "$4.99" },
  { name: "Switzerland", code: "CH", price: "$3.99" },
  { name: "India", code: "IN", price: "$3.99" },
  { name: "United States", code: "US", price: "$3.99" },
  { name: "Costa Rica", code: "CR", price: "$7.99" },
  { name: "Austria", code: "AT", price: "$3.99" },
  { name: "Saudi Arabia", code: "SA", price: "$4.49" },
  { name: "Thailand", code: "TH", price: "$2.99" },
  { name: "South Africa", code: "ZA", price: "$3.99" },
];

const regionCountries = [
  { name: "Argentina", code: "AR" },
  { name: "Bolivia", code: "BO" },
  { name: "Brazil", code: "BR" },
  { name: "Chile", code: "CL" },
  { name: "Ecuador", code: "EC" },
  { name: "El Salvador", code: "SV" },
  { name: "Colombia", code: "CO" },
  { name: "Costa Rica", code: "CR" },
  { name: "Guatemala", code: "GT" },
  { name: "Panama", code: "PA" },
  { name: "Paraguay", code: "PY" },
  { name: "Peru", code: "PE" },
];



export default function CoverageSection({ type, name }: Props) {

    const router = useRouter();
    const formattedName =
  name.charAt(0).toUpperCase() + name.slice(1);

  return (
    <section className="py-10 bg-white">
      <div className="max-w-8xl mx-auto px-6">

        {/* ================= COUNTRY VIEW ================= */}
        {type === "country" && (
          <>
            <h2 className="text-2xl font-semibold text-center mb-8">
              Explore{" "}
              <span className="text-primary-500">
                Popular Countries
              </span>{" "}
              eSIM Data Plans
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              {countryList.map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3 hover:shadow-sm transition cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <ReactCountryFlag
                      countryCode={c.code}
                      svg
                      className="w-6 h-6 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium">{c.name}</p>
                      <p className="text-xs text-gray-400">
                        From {c.price}
                      </p>
                    </div>
                  </div>

                  <span className="text-gray-400">›</span>
                </div>
              ))}
            </div>

            {/* BUTTON */}
            <div className="flex justify-center mt-8">
              <button 
              onClick={() => router.push("/alldestination")}
              
              className="bg-primary-500 text-white px-6 py-3 rounded-full hover:scale-105 transition">
                Explore All Destinations
              </button>
            </div>
          </>
        )}

        {/* ================= REGION VIEW ================= */}
        {type === "region" && (
          <>
            <div className="grid md:grid-cols-2  items-center">

              {/* MAP IMAGE */}
              <div className="flex justify-center">
                <Image
                  src="/region-map.png" 
                  alt="Region Map"
                  width={350}
                  height={250}
                />
              </div>

              {/* TEXT + FLAGS */}
              <div>
                <h1 className="text-4xl font-semibold mb-4">
                  {formattedName}{" "}
                  <span className="text-primary-500">
                    eSIM Coverage
                  </span>
                </h1>

                <p className="text-md text-gray-500 mb-6">
                  Our {formattedName} eSIM plans provide fast, automatic 4G/5G internet
                  coverage across various countries:
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {regionCountries.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-lg"
                    >
                      <ReactCountryFlag
                        countryCode={c.code}
                        svg
                        className="w-7 h-7 rounded-full"
                      />
                      {c.name}
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </>
        )}
      </div>
    </section>
  );
}