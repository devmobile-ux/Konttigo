'use client'

import {
  FaBolt,
  FaMobileAlt,
  FaGlobeEurope,
  FaApple,
  FaGooglePlay,
  FaCheck,
} from "react-icons/fa";
import { MdOutlinePhonelinkRing, MdSimCardAlert, MdSupportAgent } from "react-icons/md";
import { HiOutlineDeviceMobile } from "react-icons/hi";
import Image from "next/image";
import { FaInfinity} from "react-icons/fa6";
import { PiWifiX } from "react-icons/pi";
import { RiQuestionAnswerLine, RiSimCard2Line } from "react-icons/ri";
import { IoMdGlobe } from "react-icons/io";
import { GoRocket } from "react-icons/go";

type Props = {
  name: string;
};


export default function ExtraSections({ name }: Props) {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-6xl mx-auto px-6 space-y-16">

        {/* ================= WHY eSIM ================= */}
        <div>
          <h2 className="text-2xl font-semibold text-center mb-8">
            Why Choose <span className="text-primary-500">eSIM</span> for{" "}
            <span className="text-primary-500">{name}</span>?
          </h2>

          {/* GRID */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* CARD */}
            {[
              {
                icon: <RiSimCard2Line />,
                title: "Instant Activation",
                desc: `Your ${name} eSIM activates immediately the moment you land in ${name}.`,
              },
              {
                icon: <FaInfinity />,
                title: "Unlimited Data Options",
                desc: `Flexible ${name} eSIM internet plans with prepaid and unlimited data to suit your travel needs.`,
              },
              {
                icon: <PiWifiX />,
                title: "No Roaming Fees",
                desc: `Travel freely in ${name} without worrying about extra charges.`,
              },
              {
                icon: <MdSimCardAlert />,
                title: "No SIM Swapping",
                desc: `With eSIM ${name}, activate or switch data plans without physically swapping SIM cards.`,
              },
              {
                icon: <IoMdGlobe />,
                title: "Works Across Europe",
                desc: `Our ${name} eSIM is compatible with all modern Android and iPhone devices released after 2019-2020. Check out the complete eSIM compatible devices here.`,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-[#F4A582] rounded-2xl p-5 min-h-[200px] flex flex-col gap-2 hover:shadow-sm transition"
              >
                <div className="text-3xl text-black">{item.icon}</div>

                <h3 className="text-md">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
 
     {/* ================= HOW to Activate ================= */}
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADING */}
        <h2 className="text-2xl font-semibold text-center mb-2">
          How to Activate{" "}
          <span className="text-primary-500">{name}</span> Travel eSIM Online
        </h2>

        <p className="text-center text-sm text-gray-500 mb-10">
          Activate your prepaid eSIM for {name} in just 3 easy steps
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* STEP 1 */}
          <div className="rounded-2xl p-6 shadow-md bg-gradient-to-b from-[#FFF7F0] to-[#FFFFFF] min-h-[280px] flex flex-col gap-3">
            <span className="text-sm font-semibold bg-white w-6 h-6 flex items-center justify-center rounded-full">
              1
            </span>

            <h3 className="font-semibold text-md">
              Choose your preferred {name} eSIM plan
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed">
              Discover affordable {name} eSIM data plans with the best prices.
              Buy your preferred internet plan and wait for the confirmation email
              that includes a QR code.
            </p>

            <div className="mt-auto">
              <Image
               src="/step1-ui.png"
               alt="Choose plan"
               width={250}
               height={80}
               className="w-full object-contain"
              />
            </div>
          </div>

          {/* STEP 2 */}
          <div className="rounded-2xl shadow-md p-6 bg-gradient-to-b from-[#FFF7F0] to-[#FFFFFF] min-h-[260px] flex flex-col gap-3">
            <span className="text-sm font-semibold bg-white w-6 h-6 flex items-center justify-center rounded-full">
              2
            </span>

            <h3 className="font-semibold text-md">
              Download Konttigo and install your eSIM
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed">
              Download the Konttigo eSIM app on your smartphone, scan the received QR
              code from your email, and follow the eSIM activation steps.
            </p>

            <div className="mt-6">
              <Image
               src="/step2-ui.png"
               alt="Choose plan"
               width={300}
               height={120}
               className="w-full object-contain"
              />
            </div>
          </div>

          {/* STEP 3 */}
          <div className="rounded-2xl p-6 shadow-md bg-gradient-to-b from-[#FFF7F0] to-[#FFFFFF] min-h-[280px] flex flex-col gap-3">
            <span className="text-sm font-semibold bg-white w-6 h-6 flex items-center justify-center rounded-full">
              3
            </span>

            <h3 className="font-semibold text-md">
              Stay Connected on your {name} Trip
            </h3>

            <p className="text-sm text-gray-500 leading-relaxed">
              Activate your {name} eSIM data plan when you arrive at your destination.
              Enjoy fast 4G/5G internet connectivity and zero roaming charges.
            </p>

            {/* CHECK ICON */}
            <div className="flex justify-center items-center mt-8">
              <div className="bg-primary-500 w-16 h-16 rounded-full flex items-center justify-center text-white text-4xl">
                <FaCheck />
              </div>
            </div>          
          </div>

        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <button className="bg-primary-500 text-white px-6 py-2 rounded-full text-sm hover:scale-105 transition">
            Buy {name} eSIM Online
          </button>
        </div>

      </div>

        {/* ================= WHY KONTTIGO ================= */}
        <div>
          <h2 className="text-2xl font-semibold text-center mb-3">
            Why Choose Konttigo eSIM for{" "}
            <span className="text-primary-500">{name} Travel</span>?
          </h2>

          <p className="text-center text-sm text-gray-500 mb-8 max-w-2xl mx-auto">
            Konttigo’s eSIM data plans let you easily connect to top networksin the {name}.
            Here’s why users love our eSIM for {name} travel.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <RiSimCard2Line />,
                title: "Best Internet Coverage",
                desc: `We connect you to the best local networks in the ${name}, allowing for a smoother experience with a high-speed data plan.`,
              },
              {
                icon: <RiQuestionAnswerLine />,
                title: "24/7 chat support",
                desc: "Get help whenever you need it. Our support team is ready to chat around the clock — just drop a line and they’ll help you solve your issues.",
              },
              {
                icon: <MdOutlinePhonelinkRing />,
                title: "One app for managing all your data eSIMs",
                desc: `Our Konttigo eSIM app lets you buy a data plan, install the eSIM, and track your data usage. Your eSIM for the ${name} will activate automatically as soon as you reach your first destination.`,
              },
              {
                icon: <IoMdGlobe />,
                title: "One Data eSIM for all your travels",
                desc: "Konttigo eSIM provides mobile data plans across 8+ regions and over 200 countries, including the United States. Install your data eSIM once, then easily add new data plans for all your future trips.",
              },
              {
                icon: <GoRocket />,
                title: "Fast, Reliable 4G/5G Internet",
                desc: "Enjoy high-speed connectivity anywhere.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="border border-[#F4A582] rounded-2xl p-5 min-h-[140px] flex flex-col gap-2 hover:shadow-sm transition"
              >
                <div className="text-xl text-black">{item.icon}</div>

                <h3 className="font-semibold text-sm">
                  {item.title}
                </h3>

                <p className="text-xs text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}