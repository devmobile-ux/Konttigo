"use client";

import { useSearchParams } from "next/navigation";
import { FaGoogle, FaApple, FaChevronDown } from "react-icons/fa";
import {
  SiVisa,
  SiMastercard,
  SiPaypal,
  SiAmericanexpress,
  SiDiscover,
  SiJcb,
  SiGooglepay,
} from "react-icons/si";
import { MdPublic } from "react-icons/md";
import { FaGlobeAsia } from "react-icons/fa";
import { useRouter } from "next/navigation";
import ReactCountryFlag from "react-country-flag";


export default function CheckoutPage() {
  const params = useSearchParams();

  // ✅ Dynamic data from URL
  const type = params.get("type") || "global";
  const name = params.get("name") || "Global";
  const data = params.get("data") || "1 GB";
  const duration = params.get("duration") || "7 days";
  const price = Number(params.get("price")) || 14.99;

  const router = useRouter();
  const generatedId = `#${Date.now()}`;

  const getCountryCode = (name: string) => {
  const map: any = {
    "india": "IN",
    "sri lanka": "LK",
    "united states": "US",
    "switzerland": "CH",
  };
  return map[name?.toLowerCase()] || "US";
};

  return (
    <section className="bg-[#ffffff] min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-6">

        <div className="grid md:grid-cols-2 gap-10">

          {/* LEFT */}
          <div>

            {/* LOGIN */}
            <h2 className="text-lg font-semibold mb-4">Sign up or log in</h2>

            <div className="flex gap-4 mb-4">
              <button className="flex items-center gap-2 border px-4 py-2 rounded-full">
                <FaGoogle /> Google
              </button>

              <button className="flex items-center gap-2 border px-4 py-2 rounded-full">
                <FaApple /> Apple
              </button>
            </div>

            <p className="text-xs text-gray-500 mb-6">
              We’ll occasionally send you news about special offers – you can opt out anytime via your account.
            </p>

            {/* PAYMENT METHODS */}
            <h2 className="text-lg font-semibold mb-4">Select a payment method</h2>

            {/* CARD */}
            <div className="border rounded-xl p-4 mb-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span>Credit or debit card</span>
                <SiVisa className="text-blue-600 text-xl" />
                <SiMastercard className="text-orange-500 text-xl" />
                <SiAmericanexpress className="text-blue-500 text-xl" />
                <SiDiscover className="text-orange-600 text-xl" />
                <SiJcb className="text-green-600 text-xl" />
              </div>
              <FaChevronDown />
            </div>

            {/* GPAY */}
            <div className="border rounded-xl p-4 mb-3 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span>Google Pay</span>
                <SiGooglepay className="text-black text-xl" />
              </div>
              <FaChevronDown />
            </div>

            {/* PAYPAL */}
            <div className="border rounded-xl p-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span>PayPal</span>
                <SiPaypal className="text-blue-600 text-xl" />
              </div>
              <FaChevronDown />
            </div>

            {/* WALLET */}
            <div className="border rounded-xl p-4 flex justify-between items-center mt-3">
              <div>
                <p className="font-medium">Konttigo money</p>
                <p className="text-xs text-gray-500">Available Balance: $12.50</p>
              </div>

              <button className="bg-orange-200 px-3 py-1 rounded text-xs">
                Apply balance
              </button>
            </div>
            </div>

          {/* RIGHT - SUMMARY */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">

            {/* TITLE */}
            <h2 className="text-lg font-semibold mb-4">Order summary</h2>

            {/* COUNTRY / REGION */}
            <div className="flex items-center gap-2 bg-gray-50 px-3 py-2 rounded-lg mb-4">

              {/* Dynamic flag / icon */}
              {type === "country" ? (
                <ReactCountryFlag
                  countryCode={getCountryCode(name)}
                  svg
                  className="w-6 h-4 rounded-sm"
                />
              ) : type === "region" ? (
                <FaGlobeAsia className="text-primary-500 text-lg" />
              ) : (
                <MdPublic className="text-primary-500 text-lg" />
              )}

              <span className="font-medium capitalize">{name}</span>
            </div>

            {/* DETAILS */}
            <div className="text-sm space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Plan</span>
                <span>{data}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Type</span>
                <span>Data only</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Duration</span>
                <span>{duration}</span>
              </div>
            </div>

            <hr className="my-4" />

            {/* TOTAL */}
            <div className="flex justify-between text-sm mb-2">
              <span>Total</span>
              <span className="font-medium">US${price.toFixed(2)}</span>
            </div>

            {/* KONTIIGO MONEY */}
            <div className="flex justify-between items-center text-xs text-gray-500 mb-4">
              <span>Konttigo Money</span>
              <span className="border border-primary-300 px-2 py-1 rounded-md">
                3% credit in konttigo money
              </span>
            </div>

            {/* PROMO */}
            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-2">Apply Coupon</p>

              <div className="flex gap-2">
                <input
                  placeholder="Promo Code"
                  className="flex-1 border rounded-full px-4 py-2 text-sm outline-none"
                />
                <button className="px-5 rounded-full bg-orange-200 text-white">
                  Apply
                </button>
              </div>
            </div>

            {/* PRICE BREAKDOWN */}
            <div className="text-sm space-y-1 mb-4">
              <div className="flex justify-between text-gray-500">
                <span>Total Price</span>
                <span>${price.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-blue-500">
                <span>Wallet money used</span>
                <span>- $12.50</span>
              </div>
            </div>

            {/* FINAL */}
            <div className="bg-[#FFF5E6] p-3 rounded-lg flex justify-between font-semibold mb-6">
              <span>Order Total</span>
              <span>$2.44</span>
            </div>

            {/* CTA */}
            <button
              onClick={() =>
                router.push(
                  `/order-success?type=${type}&slug=${name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}&email=test@gmail.com&orderId=${generatedId}`
                )
              }
              className="w-full bg-primary-500 text-white py-3 rounded-xl font-medium hover:opacity-90 transition"
            >
              PROCEED TO PAYMENT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


