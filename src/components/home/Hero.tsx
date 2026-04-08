import Image from "next/image";
import { FaSearch, FaStar } from "react-icons/fa";
import { FaAppStoreIos, FaEarthAmericas, FaGooglePlay } from "react-icons/fa6";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-[#FFFADA] to-[#FFFDE9] pb-16">
      <div className="max-w-7xl mx-auto px-8 pt-8 grid md:grid-cols-[1.2fr_1fr] gap-10 items-center relative">

        {/* LEFT */}
        <div>

          {/* UPDATED HEADING */}
          <h1 className="text-4xl font-semibold leading-tight text-textPrimary">
            Stay Connected Worldwide with Konttigo –{" "}
            <span className="text-primary-500">
              Your Affordable eSIM Provider for Global Travel
            </span>
          </h1>

          {/* UPDATED DESCRIPTION */}
          <p className="text-textSecondary mb-2 text-lg max-w-xl">
            Konttigo provides affordable eSIM data plans to stay connected internationally. 
            No physical SIM swaps, no roaming fees—just high-speed eSIM data plans in 200+ countries. 
            Buy your travel eSIM online in seconds.
          </p>

          {/* SEARCH */}
          <div className="flex items-center bg-white rounded-full shadow-md p-2 max-w-2xl border border-gray-200">
            
            <FaEarthAmericas className="text-gray-400 ml-3" />

            <input
              type="text"
              placeholder="Where are you traveling next?"
              className="flex-1 px-4 py-2 outline-none text-md bg-transparent"
            />

            <button className="bg-primary-500 text-white px-6 py-2 rounded-full hover:bg-primary-600 transition flex items-center gap-2">
              <FaSearch className="text-sm" />
              Search
            </button>
          </div>

          {/* FEATURE POINTS */}
        <div className="flex items-center gap-8 mt-8">

          {/* ITEM 1 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-full border border-primary-500 text-primary-500">
              <Image src="/secure.png" alt="secure" width={16} height={16} />
            </div>
            <p className="text-sm text-textSecondary">Secure Connections</p>
          </div>

          {/* ITEM 2 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-full border border-primary-500 text-primary-500">
              <Image src="/activation.png" alt="activation" width={16} height={16} />
            </div>
            <p className="text-sm text-textSecondary">Instant Activation</p>
          </div>

          {/* ITEM 3 */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-full border border-primary-500 text-primary-500">
              <Image src="/global.png" alt="global" width={16} height={16} />
            </div>
            <p className="text-sm text-textSecondary">200+ Countries Coverage</p>
          </div>

        </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center md:justify-end">

          {/* MAP */}
          <Image
            src="/map.png"
            alt="Map"
            width={620}
            height={320}
            className="absolute top-2 right-[-8] z-0 opacity-70"
          />

          {/* PHONES */}
          <Image
            src="/hero-phone.png"
            alt="Phones"
            width={400}
            height={550}
            className="relative z-10 translate-y-16"
            priority
          />

        </div>

      </div>
    </section>
  );
}