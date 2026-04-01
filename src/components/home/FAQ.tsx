"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "What is a travel eSIM?",
    answer: `A travel eSIM (short for embedded or electronic SIM) is a digital, virtual SIM card that is pre-installed in your smartphone. This eSIM enables you to connect to mobile networks in other countries and regions, allowing you to access the internet without a physical SIM.`,
  },
  {
    question: "Which devices are compatible with Konttigo eSIM?",
    answer: `Most Android and iOS-based smartphones released after 2018 support eSIM technology. As of 2026, popular iOS devices, such as the iPhone and iPad, as well as Android devices from leading manufacturers like Samsung, OnePlus, Oppo, Vivo, and Google Pixel, support eSIM functionality. However, eSIM device compatibility may vary by model and region; it is good to check the comprehensive list of eSIM-compatible devices. To use a Konttigo travel eSIM, ensure your device is carrier-unlocked.`,
  },
  {
    question: "How to check if my device is eSIM compatible?",
    answer: `The easiest way to check if your smartphone supports eSIM is to dial *#06# on your keypad. If you see an EID number (Embedded Identity Document) on the screen, your device is 100% eSIM compatible.

You can also check your Settings:\n

• For iOS devices: Go to Settings > Cellular > Look for ‘Add eSIM’.
• For Android devices: Go to Settings > Network & Internet > SIMs > Look for 'Download a SIM instead?'`,
  },
  {
    question: "Do Konttigo eSIM data plans work on any mobile carrier?",
    answer: `Absolutely! Konttigo eSIM works regardless of which mobile carrier you use in your home country. All you need to check is whether your smartphone is eSIM compatible. Major mobile carriers such as AT&T, Verizon, T-Mobile, Aliv, BTC, Vodacom, Orange, and Google Fi support eSIM data.`,
  },
  {
    question: "How do I activate Konttigo eSIM?",
    answer: `Activating your Konttigo travel eSIM is a fast, digital process that takes less than 2 minutes. We recommend installing your eSIM while you have a stable internet connection (like at home or somewhere with dependable WiFi).

Here are the three different methods to activate Konttigo eSIM:

• Direct: Go to your eSIM in the Konttigo app, select Install or share, then start installation and follow the step-by-step prompts.
• QR Code: As soon as you buy your eSIM online with Konttigo, we will email you a unique QR code and manual activation details. Use that QR code to start the installation process on another device.
• Manual: Enter the received Konttigo eSIM details manually in your device's Settings section.

For installing the eSIM on your device, here are the steps:

• For iPhone (iOS): Go to Settings > Cellular (or Mobile Service) > Add eSIM > Use QR Code. Scan the code from your email.
• For Android Smartphones: Go to Settings > Connections (or Network & Internet) > SIM Manager > Add eSIM. Scan the QR code.

Pro tip: Once you install Konttigo data eSIM, label your new plan as 'Konttigo' or 'Travel' so you can easily distinguish it from your primary home SIM.

The final step is to activate your travel eSIM data at your destination. For this:

• Go to your Cellular/SIM Settings.
• Turn ON your Konttigo eSIM line.
• Set Konttigo as your Primary Data.`,
  },
  {
    question: "Is the Konttigo eSIM app legit?",
    answer: `Yes, the Konttigo eSIM app is totally legit and secure global eSIM data provider. We provide high-speed mobile connectivity in 300+ countries through top-tier cellular networks, including industry leaders like AT&T, Verizon, Vodafone, and Orange. At Konttigo, we prioritize your security by using bank-grade SSL encryption and trusted payment gateways, while offering instant digital delivery of eSIM, 24/7 support, and no contracts. Our mission is to provide the most affordable eSIM solution worldwide, helping you avoid unnecessary roaming fees while staying connected to what matters most.`,
  },
  {
    question: "What are the best eSIM for international travel?",
    answer: `When selecting the best eSIM for international travel in 2026, it's essential to consider your travel preferences. One of the emerging contenders in the market is Konttigo eSIM, and it offers several advantages. It provides affordable eSIM pricing, a combination of high-speed 4G/5G data, and extensive global coverage in over 300 countries. Konttigo specializes in offering the lowest prepaid plans starting from just a few dollars, making it a prominent choice for travelers who want seamless internet connectivity without the high costs.`,
  },
  {
    question: "Does the Konttigo app offer affordable eSIM data plans?",
    answer: `Yes, the Konttigo eSIM app offers some of the most affordable eSIM prices in the industry, especially compared to top-rated eSIM providers. If you're looking for the lowest prepaid plans, you might find them on Konttigo.

With the Konttigo eSIM provider, you get transparent, high-speed travel eSIM plans with no hidden activation costs. You even get instant delivery, 24/7 customer support, quick and easy eSIM installation, and reliable global coverage.`,
  },
  {
    question: "In how many countries does Konttigo eSIM work?",
    answer: `Konttigo provides extensive global coverage, ensuring your travel eSIM works seamlessly in over 300 countries and 8 regions. Whether you need a reliable international eSIM for major regions, like Europe, the USA, Africa, and the Middle East, or affordable eSIM data plans for countries like France, Germany, Australia, the UAE, and Canada, Konttigo has you covered. Our network partnerships enable us to provide the lowest prepaid plan options, making Konttigo the most versatile eSIM provider for your global adventures.`,
  },
  {
    question: "Are Konttigo eSIM plans cheaper than Saily or Olysim?",
    answer: `Konttigo is an emerging eSIM provider when compared to top-rated eSIM providers like Saily or Olysim, but it offers the most competitive eSIM price on the market by focusing on essential high-speed data without expensive markups. While Saily (backed by Nord Security) and Olysim provide robust 5G connectivity in the same range, Konttigo is specifically designed to provide the lowest prepaid plans. Check out this Konttigo vs Saily and Konttigo vs Olysim comparison to find out more.`,
  },
  {
    question: "Does Konttigo provide any discount on unlimited data plans?",
    answer: `Yes. Konttigo offers an exclusive 20% discount on all our unlimited data plans and unlimited data packages for new and returning travelers. By applying this discount, you can secure the lowest prepaid plan for high-speed, 5G/4G connectivity across 300+ countries, making our international eSIM even more affordable than competitors.`,
  },
  {
    question: "How can I buy Konttigo eSIM online?",
    answer: `To buy an eSIM online with Konttigo, simply visit our website, select your travel destination from our list of 300+ countries, and choose the eSIM data plan that fits your trip. Once you complete your purchase using our secure checkout, your prepaid eSIM activation QR code is delivered instantly to your email—no physical eSIM required. Enjoy the lowest prepaid plan ready to activate the moment you land.`,
  },
  {
    question: "Can I buy eSIM for international travel?",
    answer: `Absolutely! You can buy an eSIM for international travel with Konttigo in under 60 seconds, helping you save money on roaming fees when travelling globally. The easiest way is to either download the Konttigo eSIM app or visit the website, compare eSIM data plans, and receive your activation QR code instantly via email. By choosing a prepaid eSIM from Konttigo, you bypass the need for physical stores or airport kiosks, ensuring you have an affordable internet plan ready to go the moment you land, anywhere in the world.`,
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // first open by default

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#FFFFFF] py-16">
      <div className="max-w-4xl mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-3xl font-semibold text-center mb-10">
          Frequently Asked Questions
        </h2>

        {/* FAQ LIST */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-[#F3A37A] rounded-xl px-5 py-4 bg-white transition"
              >
                {/* QUESTION */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center text-left"
                >
                  <span className="text-sm font-medium">
                    {faq.question}
                  </span>

                  <FiChevronDown
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* ANSWER */}
                {isOpen && (
                  <p className="whitespace-pre-line mt-3 text-sm text-gray-500">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}