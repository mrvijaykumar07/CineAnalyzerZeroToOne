"use client";

import React, { useState } from "react";


const MobileSideMenu = () => {
  const [openSubmenu, setOpenSubmenu] = useState(null);

  return (
    <div className="md:hidden  flex flex-col gap-6 px-6 py-6 text-white w-full h-[420px] mt-20 z-50 bg-black/90 backdrop-blur-lg">
      {/* Nav Items (Non-Link Demo Buttons) */}
      <div className="flex flex-col gap-4 text-lg font-semibold">
        {["Movies", "Series", "Contact", "About Us"].map((item, index) => (
          <div
            key={index}
            className="px-4 py-3 rounded-lg bg-black/30 hover:bg-pink-600/40 hover:text-white transition duration-300 cursor-pointer"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Theme Toggle and Login */}
      <div className="flex justify-between items-center mt-8 px-1">


        <button
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:from-pink-600 hover:to-purple-600 transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default MobileSideMenu;
