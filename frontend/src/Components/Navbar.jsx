"use client";

import React, { useState } from "react";
import Link from "next/link";
import { User } from "lucide-react";
import { HiX } from "react-icons/hi";
import MobileSideMenu from "../Components/MobaileSideMenu";


const Navbar = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="fixed w-full bg-black/30 backdrop-blur-lg text-white shadow-lg z-50 px-6 md:px-20 py-2 border-b border-white/10">
      <div className="flex items-center justify-between">
        
        <Link href="/" className="text-3xl font-bold text-purple-400 tracking-wide hover:text-pink-400 transition duration-300">
          🎥 CineAnalyzer
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 items-center font-medium text-white">
          <Link href="/" className="hover:text-pink-400 transition duration-300">Home</Link>
          <Link href="/about" className="hover:text-pink-400 transition duration-300">About</Link>
          <Link href="/contact" className="hover:text-pink-400 transition duration-300">Contact</Link>
       <User className="w-6 h-6 text-white" />
        </nav>

        {/* Mobile Button */}
        <button
          className="w-10 h-10 flex justify-center items-center md:hidden p-2 border border-white/20 rounded-full"
          onClick={() => setNavOpen(!navOpen)}
          aria-label="Toggle menu"
        >
          <User className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] sm:w-[60vw] bg-black text-white shadow-lg z-50 transform ${
          navOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 md:hidden`}
      >
        {/* Close Button */}
        <button
          className="absolute top-5 right-5 text-white"
          onClick={() => setNavOpen(false)}
        >
          <HiX className="text-2xl" />
        </button>

        {/* Side Menu Content */}
        <MobileSideMenu />
      </div>
    </header>
  );
};

export default Navbar;
