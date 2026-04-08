"use client";

import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";


export default function Navbar() {
  return (
    <nav className="bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">

        {/* LEFT: Logo */}
        <div className="flex items-center">
          <Link href="/">
          <Image
            src="/logo.png"
            alt="Konttigo Logo"
            width={150}
            height={45}
            priority
          />
          </Link>
        </div>

        {/* CENTER: Menu */}
        <div className="hidden md:flex items-center gap-10 text-[15px] font-medium text-[#2B2B2B]">
          <Link href="#" className="hover:text-primary-500 transition">
            How Konttigo Works
          </Link>
          <Link href="#" className="hover:text-primary-500 transition">
            About Konttigo
          </Link>
          <Link href="#" className="hover:text-primary-500 transition">
            FAQs
          </Link>
          <Link href="#" className="hover:text-primary-500 transition">
            Help
          </Link>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-6">

          {/* Currency */}
          <div className="flex items-center gap-1 text-[14px] font-medium text-[#2B2B2B] cursor-pointer hover:text-primary-500 transition">
            <span>$</span>
            <span>USD</span>
          </div>

          {/* Language */}
          <div className="flex items-center gap-2 text-[14px] font-medium text-[#2B2B2B] cursor-pointer hover:text-primary-500 transition">
            <FaEarthAmericas className="text-base" />
            <span>English</span>
          </div>

          {/* Sign In Button */}
          <button className="bg-primary-500 text-white px-6 py-2.5 rounded-full hover:bg-primary-600 transition flex items-center gap-2 shadow-md">
            <FaUser className="text-sm" />
            <span className="text-sm font-medium">Sign in</span>
          </button>
        </div>

      </div>
    </nav>
  );
}