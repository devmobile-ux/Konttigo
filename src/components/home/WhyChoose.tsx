"use client";

import Image from "next/image";

type Feature = {
  title: string;
  desc: string;
  iconType: "image" | "react";
  icon: string | React.ReactNode;
};

const features : Feature[]= [
  {
    title: "Flexible eSIM Data Plans",
    desc: "Choose from a wide range of international data plans tailored according to your internet needs.",
    iconType: "image",
    icon: "/icon1.png",
  },
  {
    title: "Easy to Install & Activate",
    desc: "Activate your eSIM instantly in simple steps. Install the eSIM. Purchase an eSIM data plan. Switch to your eSim when you reach your destination.",
    iconType: "image",
    icon: "/icon2.png",
  },
  {
    title: "One eSIM for all Travel Destinations",
    desc: "Add new destinations to your existing Konttigo eSIM. No need to install new eSIMs every time.",
    iconType: "image",
    icon: "/icon4.png",
  },
  {
    title: "Affordable Price",
    desc: "Lowest eSIM data plans for your international travel without compromising on internet speed.",
    iconType: "image",
    icon: "/icon3.png",
  },
  {
    title: "Global & Regional Plans",
    desc: "Stay online across 8+ regions and 300+ countries worldwide with Konttigo eSIM plans. Enjoy seamless internet coverage across continents.",
    iconType: "image",
    icon: "/icon5.png",
  },
  {
    title: "No Hidden Fees",
    desc: "Transparent eSIM price with zero hidden charges—what you see is what you pay. No unexpected roaming charges.",
    iconType: "image",
    icon: "/icon6.png",
  },
];

export default function WhyChoose() {
  return (
    <section className="bg-[#FFFFFF] py-20">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold">
            Why Choose{" "}
            <span className="text-primary-500">Konttigo eSIM </span> 
            Data Plans?
          </h2>

          <p className="text-md mt-2" style={{ color: "#847D7D" }}>
            Konttigio's eSIM data plans allow you to connect to the best networks worldwide effortlessly.<br/>
Here’s why millions of users love our travel eSIM services.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {features.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 border transition hover:shadow-lg hover:-translate-y-1 duration-300"
              style={{ borderColor: "#FFBA94" }}
            >

              {/* ICON */}
              <div className="mb-4">
                {item.iconType === "image" ? (
                  <Image
                    src={item.icon as string}
                    alt={item.title}
                    width={28}
                    height={28}
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center rounded-md bg-gray-50 text-xl text-gray-700">
                    {item.icon}
                  </div>
                )}
              </div>

              {/* TITLE */}
              <h3 className="font-semibold text-md mb-2 text-textPrimary">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="text-sm text-textSecondary leading-relaxed">
                {item.desc}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}