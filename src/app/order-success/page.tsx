"use client";

import { BsCheckCircle } from "react-icons/bs";
import { useSearchParams, useRouter } from "next/navigation";

export default function OrderSuccess() {
  const params = useSearchParams();
  const router = useRouter();

  // Dynamic data
  const email = params.get("email") || "user@email.com";
  const orderId =
    params.get("orderId") ||
    `#${Math.floor(Math.random() * 1000000000000)}`;

  const type = params.get("type") || "global";
  const slug = params.get("slug") || "global";  

  return (
    <section className="bg-[#FFFFFF] py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8">

        {/* HEADER */}
        <h2 className="text-center text-2xl font-semibold mb-10">
          Order Completed
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <BsCheckCircle className="text-green-500 text-5xl" />
              <h3 className="text-lg font-semibold">
                Thanks you for your order.
              </h3>
            </div>

            <p className="text-sm text-gray-500 mb-3">
              We’ve sent you a confirmation receipt to{" "}
              <span className="font-medium text-black">{email}</span>
            </p>

            <p className="text-sm text-gray-400">
              ORDER ID:{" "}
              <span className="font-medium text-gray-600">{orderId}</span>
            </p>
          </div>

          {/* RIGHT */}
          <div className="bg-[#FFFFFF] p-5">
            <h3 className="font-semibold mb-2">
              How to Install an eSIM
            </h3>

            <p className="text-sm text-gray-500 mb-4">
              You can install your eSIM by visiting your eSIM details now.
            </p>

            <button
              onClick={() => {
                if (type === "country") {
                  router.push(`/country/${slug}`);
                } else if (type === "region") {
                  router.push(`/region/${slug}`);
                } else {
                  router.push(`/global`);
                }
              }}
              className="w-full flex justify-between items-center bg-white px-4 py-3 rounded-xl shadow hover:bg-orange-100 transition-all duration-300 hover:shadow-md hover:-translate-y-1"
            >
              Go to eSIM Details
              <span className="transition-transform duration-300 group-hover:translate-x-1">
                ›
              </span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}