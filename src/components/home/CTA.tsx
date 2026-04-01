"use client";

import Image from "next/image";
import { FaStar } from "react-icons/fa";

export default function CTA() {
  return (
    <section className="py-16 bg-[#ffffff]">
      <div className="max-w-7xl mx-auto px-6">

        {/* CONTAINER */}
        <div className="relative rounded-3xl overflow-hidden">

          {/* BACKGROUND IMAGE (with phone) */}
          <Image
            src="/cta-bg-phone.png"
            alt="CTA Background"
            width={1200}
            height={500}
            className="w-full h-full object-cover"
            priority
          />

          {/* CONTENT */}
          <div className="absolute inset-0 flex items-center px-8 md:px-16">

            <div className="max-w-lg">

              {/* HEADING */}
              <h2 className="text-2xl md:text-3xl font-semibold text-[#3A3A3A]">
                Ready to try eSIMs and change the way you stay connected?
              </h2>

              {/* SUBTEXT */}
              <p className="text-sm text-[#5F5F5F] mt-4">
                Download the Konttigo app to purchase, manage, and top up your eSIMs anytime, anywhere!
              </p>

              {/* BUTTONS */}
              <div className="flex gap-6 mt-6">

                {/* iOS */}
                <a
                  href="https://apps.apple.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow hover:shadow-md hover:scale-105 transition"
                >
                  <Image src="/Apple.png" alt="iOS" width={24} height={24} />
                  <span className="font-medium text-sm">Download IOS</span>
                </a>

                {/* ANDROID */}
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow hover:shadow-md hover:scale-105 transition"
                >
                  <Image src="/Playstore.png" alt="Android" width={24} height={24} />
                  <span className="font-medium text-sm">Download Android</span>
                </a>

              </div>

              {/* RATINGS */}
              <div className="flex gap-24 mt-4 px-3">

                {/* iOS Rating */}
                <div>
                  <p className="text-xs text-gray-500">Rating</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold">4.7</span>
                    <div className="flex text-orange-400 text-sm">
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStar className="opacity-30" />
                    </div>
                  </div>
                </div>

                {/* Android Rating */}
                <div>
                  <p className="text-xs text-gray-500">Rating</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-semibold">4.6</span>
                    <div className="flex text-orange-400 text-sm">
                      <FaStar /><FaStar /><FaStar /><FaStar /><FaStar className="opacity-30" />
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}