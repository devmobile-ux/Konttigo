"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

type FAQProps = {
  type?: "global" | "region" | "country";
  slug?: string;
};

// ✅ ALL DATA (correct structure)
const FAQ_DATA = {
  global: [
    {
      question: "What is a travel eSIM?",
      answer: `A travel eSIM is a digital SIM...`,
    },
    {
      question: "Which devices are compatible with eSIM?",
      answer: `Most smartphones after 2018 support eSIM...`,
    },
  ],

  regions: {
    europe: [
      {
        question: "Does eSIM work across Europe?",
        answer: `Yes, most EU countries are covered...`,
      },
    ],
    asia: [
      {
        question: "Is eSIM reliable in Asia?",
        answer: `Yes, strong coverage in major countries...`,
      },
    ],
  },

  countries: {
    india: [
      {
        question: "Does eSIM work in India?",
        answer: `Yes, supported by Airtel & Jio...`,
      },
    ],
    usa: [
      {
        question: "Which carriers support eSIM in USA?",
        answer: `AT&T, Verizon, T-Mobile...`,
      },
    ],
  },
};

// ✅ FUNCTION (must be above usage)
const getFAQs = (type?: string, slug?: string) => {
  if (!type || type === "global") return FAQ_DATA.global;

  if (type === "region" && slug) {
    return FAQ_DATA.regions[slug as keyof typeof FAQ_DATA.regions] || [];
  }

  if (type === "country" && slug) {
    return FAQ_DATA.countries[slug as keyof typeof FAQ_DATA.countries] || [];
  }

  return [];
};

export default function FAQ({ type = "global", slug }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // ✅ get base faqs
  const baseFaqs = getFAQs(type, slug);

  // ✅ add debug faq here (correct place)
  const faqs = [
    ...baseFaqs,
    {
      question: "Debug: Which page am I on?",
      answer: `Type: ${type}, Slug: ${slug}`,
    },
  ];

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#FFFFFF] py-4">
      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-3xl font-semibold text-center mb-10">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-[#F3A37A] rounded-xl px-5 py-4 bg-white"
              >
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