"use client";

import { FaMessage, FaRegMessage } from "react-icons/fa6";

const testimonials = [
  {
    name: "Surya Prakash Tiwari",
    title: "Perfect for Beginners",
    text: "This has led to the emergence of a number of no-code communities, which provide a wealth of resources and support for people who are new to no-code.",
  },
  {
    name: "Riktha",
    title: "Very impressed with the session.",
    text: "The first session was really good! I found the pace comfortable and the content engaging. Looking forward to the next session!",
  },
  {
    name: "Shivansh Tiwari",
    title: "Supportive and Inspiring",
    text: "The community is a vibrant hub for innovation, empowering individuals to create tech solutions without traditional coding.",
  },
  {
    name: "Prewal",
    title: "Learnt Something New",
    text: "I was comfortable with the session. I learnt a lot of things which I wasn’t aware of. Overall it was a very good interactive session.",
  },
  {
    name: "Sagar S",
    title: "Clear Explanations.",
    text: "The session was great, and the explanations were clear. The pace was good, and the concepts were easy to follow.",
  },
  {
    name: "Nischal Kotiyan",
    title: "Easy to follow",
    text: "The session was great, and YouTube worked well for me. The pace was good, and the concepts were easy to follow.",
  },
];

// Split rows
const topRow = testimonials.slice(0, 3);
const bottomRow = testimonials.slice(3, 6);

// Duplicate for infinite scroll
const loopTop = [...topRow, ...topRow];
const loopBottom = [...bottomRow, ...bottomRow];

// Avatar colors
const colors = [
  "bg-blue-500",
  "bg-green-500",
  "bg-purple-500",
  "bg-orange-500",
];

export default function Testimonials() {
  return (
    <section className="bg-white py-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADING */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-semibold">
            Trusted by thousands of{" "}
            <span className="text-primary-500">
              travelers worldwide
            </span>
          </h2>

          <p className="text-md mt-2 text-textSecondary">
            Seamless connectivity across countries, without the hassle of roaming charges.
          </p>

          <button className="mt-6 mx-auto block bg-black text-white px-10 py-3 rounded-full 
            flex items-center justify-center gap-2 
            hover:scale-105 hover:shadow-lg transition-all duration-300">
  
            <FaRegMessage className="text-sm" />
            <span>Write a Review</span>

          </button>
        </div>

        {/* WRAPPER (for gradient fade) */}
        <div className="relative overflow-hidden">

          {/* LEFT FADE */}
          <div className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-white to-transparent z-10" />

          {/* RIGHT FADE */}
          <div className="absolute right-0 top-0 h-full w-20 bg-gradient-to-l from-white to-transparent z-10" />

          {/* TOP ROW */}
          <div className="flex gap-6 mb-6 animate-scroll-right">
            {loopTop.map((item, i) => (
              <Card item={item} key={i} index={i} />
            ))}
          </div>

          {/* BOTTOM ROW */}
          <div className="flex gap-6 animate-scroll-left">
            {loopBottom.map((item, i) => (
              <Card item={item} key={i} index={i} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

/* CARD COMPONENT */
function Card({ item, index }: any) {
  return (
    <div className="min-w-[340px] bg-white rounded-xl p-5 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">

      {/* STARS */}
      <div className="text-orange-400 text-sm mb-2">★★★★★</div>

      {/* TITLE */}
      <p className="font-semibold text-sm text-gray-800 mb-2">
        {item.title}
      </p>

      {/* TEXT */}
      <p className="text-sm text-gray-500 mb-4 leading-relaxed">
        {item.text}
      </p>

      {/* USER */}
      <div className="flex items-center gap-2 mt-2">

        {/* INITIAL AVATAR */}
        <div
          className={`w-8 h-8 rounded-full ${
            colors[index % colors.length]
          } text-white flex items-center justify-center text-sm font-semibold`}
        >
          {item.name.charAt(0)}
        </div>

        <span className="text-sm font-medium text-gray-700">
          {item.name}
        </span>
      </div>

    </div>
  );
}