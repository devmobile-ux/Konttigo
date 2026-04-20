"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function GlobalCTA() {
  const router = useRouter();

  return (
    <section className="bg-[#FFFFFF] py-10">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADING */}
        <h1 className="text-center text-4xl font-semibold mb-5">
          Need broader{" "}
          <span className="text-primary-500">coverage?</span>
        </h1>

        {/* CARD */}
        <div className="relative rounded-2xl overflow-hidden">

          {/* BACKGROUND IMAGE */}
          <Image
            src="/global-cta-bg.png"
            alt="Global eSIM"
            width={1200}
            height={300}
            className="w-full h-full object-cover"
          />

          {/* OVERLAY CONTENT */}
          <div className="absolute inset-0 flex items-center px-6 md:px-12">
            <div className="max-w-md text-white">

              <p className="text-sm md:text-base mb-5 leading-relaxed">
                Discover our global eSIM data plans, starting from $2.99.
                Enjoy coverage across 167 countries and networks.
              </p>

              <button
                onClick={() => router.push("/global")}
                className="bg-primary-500 text-white px-6 py-3 rounded-full font-medium hover:scale-105 transition"
              >
                Check Global eSIM Here
              </button>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}