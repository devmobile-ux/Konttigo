"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { FaEarthAmericas, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#FFFFFF] pt-12">

      {/* TOP LINKS */}
      <div className="max-w-7xl mx-auto px-12 grid grid-cols-2 md:grid-cols-6 gap-8 text-sm">

        {/* COLUMN */}
        <div>
          <h3 className="font-semibold mb-4">Our eSIMs</h3>
          <div className="flex flex-col gap-2 text-textSecondary">
            <Link href="/store" className="hover:text-primary-500 transition">eSIM Store</Link>
            <Link href="/unlimited" className="hover:text-primary-500 transition">Unlimited data</Link>
            <Link href="/global" className="hover:text-primary-500 transition">Global Packages</Link>
            <Link href="/regional" className="hover:text-primary-500 transition">Regional packages</Link>
            <Link href="/local" className="hover:text-primary-500 transition">Local packages</Link>
            <Link href="/refer" className="hover:text-primary-500 transition">Refer and earn</Link>
          </div>
        </div>

        {/* COLUMN */}
        <div>
          <h3 className="font-bold text-textPrimary mb-4">About eSIMs</h3>
          <div className="flex flex-col gap-2 text-textSecondary">
            <Link href="/what-is-esim" className="hover:text-primary-500 transition">What is an eSIM?</Link>
            <Link href="/how-it-works" className="hover:text-primary-500 transition">How Konttigo works</Link>
            <Link href="/compatibility" className="hover:text-primary-500 transition">Device Compatibility</Link>
          </div>
        </div>

        {/* COLUMN */}
        <div>
          <h3 className="font-bold text-textPrimary mb-4">Get help</h3>
          <div className="flex flex-col gap-2 text-textSecondary">
            <Link href="/contact" className="hover:text-primary-500 transition">Contact Us</Link>
          </div>
        </div>

        {/* COLUMN */}
        <div>
          <h3 className="font-bold text-textPrimary mb-4">Blog</h3>
          <div className="flex flex-col gap-2 text-textSecondary">
            <Link href="/blog" className="hover:text-primary-500 transition">Blog</Link>
          </div>
        </div>

        {/* COLUMN */}
        <div>
          <h3 className="font-bold text-textPrimary mb-4">Konttigo</h3>
          <div className="flex flex-col gap-2 text-textSecondary">
            <Link href="/about" className="text-textSecondary hover:text-primary-500 transition">About Konttigo</Link>
            <Link href="/values" className="text-textSecondary hover:text-primary-500 transition">Our Values</Link>
            <Link href="/impact" className="text-textSecondary hover:text-primary-500 transition">Our Impact</Link>
            <Link href="/blog" className="text-textSecondary hover:text-primary-500 transition">Blog</Link>
            <Link href="/refund" className="text-textSecondary hover:text-primary-500 transition">Refund Policy</Link>
          </div>
        </div>

        {/* SOCIAL */}
        <div>
          <h3 className="font-bold text-textPrimary mb-4">Follow Us</h3>

          <div className="flex flex-col gap-3 text-textSecondary">

            <Link href="#" className="flex items-center gap-2 hover:text-primary-500 transition">
              <FaFacebookF /> Facebook
            </Link>

            <Link href="#" className="flex items-center gap-2 hover:text-primary-500 transition">
              <FaInstagram /> Instagram
            </Link>

            <Link href="#" className="flex items-center gap-2 hover:text-primary-500 transition">
              <FaXTwitter /> X (Twitter)
            </Link>

            <Link href="#" className="flex items-center gap-2 hover:text-primary-500 transition">
              <FaLinkedinIn /> LinkedIn
            </Link>

            <Link href="#" className="flex items-center gap-2 hover:text-primary-500 transition">
              <FaYoutube /> Youtube
            </Link>

          </div>
        </div>

      </div>

      {/* KONTTIGO IMAGE STRIP */}
      <div>
        <Image
          src="/footer-konttigo.png" 
          alt="Konttigo Footer"
          width={1920}
          height={100}
          className="w-full object-cover"
        />
      </div>

      {/* BOTTOM STRIP */}

      {/* BOTTOM STRIP */}
<div className="bg-white py-6 text-sm">
  <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-4 text-textSecondary">

    <span>©2025 Konttigo</span>

    <Link href="/privacy" className="hover:text-primary-500 transition">
      Privacy & Cookie Policy
    </Link>

    <Link href="/terms" className="hover:text-primary-500 transition">
      Terms & Conditions
    </Link>

    <span className="hidden md:block">|</span>

    <span className="flex items-center gap-1">
      <FaEarthAmericas className="text-sm" />
      English
    </span>

    <span>$ USD</span>

  </div>

        {/* PAYMENT STRIP */}
        <div className="mt-4">
          <Image
            src="/payments.png" // 👈 your payment icons image
            alt="Payments"
            width={1920}
            height={40}
            className="w-full object-contain"
          />
        </div>

      </div>
    </footer>
  );
}