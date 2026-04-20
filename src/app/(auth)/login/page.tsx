"use client";

import Image from "next/image";
import { FaGoogle, FaApple, FaLock, FaEnvelope } from "react-icons/fa";
import { useRouter } from "next/navigation";


export default function LoginPage() {

const router = useRouter();
  return (
    <section className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10 items-center">

      {/* LEFT IMAGE */}
      <div className="hidden md:block">
        <Image
          src="/login-illustration.png" // 👈 your image
          alt="Login"
          width={500}
          height={400}
        />
      </div>

      {/* RIGHT FORM */}
      <div className="bg-white p-8 max-w-md w-full mx-auto">

        <h2 className="text-2xl font-bold mb-2">SIGN IN</h2>
        <p className="text-sm text-gray-500 mb-6">
          Sign in with email address
        </p>

        {/* EMAIL */}
      <div className="w-full max-w-md">
        {/* EMAIL */}
        <div className="flex items-center border rounded-xl px-4 py-3 mb-4 bg-gray-50 hover:bg-gray-100 focus-within:ring-1 focus-within:ring-gray-300">
          < FaEnvelope className="text-gray-300 mr-3" size={18} />
          <input
            type="email"
            placeholder="Yourname@gmail.com"
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>

        {/* PASSWORD */}
        <div className="flex items-center border rounded-xl px-4 py-3 mb-4 bg-gray-50 hover:bg-gray-100 focus-within:ring-1 focus-within:ring-gray-300">
          <FaLock className="text-gray-300 mr-3" size={18} />
          <input
            type="password"
            placeholder="Password"
            className="w-full bg-transparent outline-none text-sm text-gray-700 placeholder-gray-400"
          />
        </div>
      </div>

        {/* BUTTON */}
        <button
            onClick={() => router.push("/home")}
            className="w-full bg-primary-500 hover:bg-primary-600 text-white py-3 rounded-xl mb-6"
            >
            Sign In
        </button>

        {/* DIVIDER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-[1px] bg-gray-400" />
          <span className="text-sm text-gray-400">Or continue with</span>
          <div className="flex-1 h-[1px] bg-gray-400" />
        </div>

        {/* SOCIAL */}
        <div className="flex gap-3 mb-4">
          <button className="flex-1 border rounded-lg py-2 hover:bg-gray-200 flex items-center justify-center gap-2">
            <FaGoogle /> Google
          </button>

          <button className="flex-1 bg-black hover:bg-gray-400 text-white rounded-lg py-2 flex items-center justify-center gap-2">
            <FaApple /> Apple
          </button>
        </div>

         <p className="text-sm text-gray-400 text-center">
          By registring to our{" "}
          <span className="text-primary-400 hover:text-primary-700 cursor-pointer">Terms and Conditions</span>
        </p>


        {/* LINKS */}
        <p className="text-sm mt-4 text-gray-400 text-center">
          Don’t have an account?{" "}
          <span className="text-[#3048A3] cursor-pointer hover:text-blue-900">Sign Up</span>
        </p>

        <p className="text-sm text-[#3048A3] hover:text-blue-900 text-center mt-1 cursor-pointer">
          Forgot Password?
        </p>

      </div>
    </section>
  );
}