import React, { useState, useEffect } from "react";
import { IoCall, IoMail } from "react-icons/io5";
import ContactPopup from "../ContactPopup";

const Header = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevOffset, setPrevOffset] = useState(0);
  
  // 1. Create a state to control the popup visibility
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const toggleScrollDirection = () => {
      const scrollY = window.scrollY;
      if (scrollY > prevOffset && scrollY > 50) {
        setScrollDirection("down");
      } else if (scrollY < prevOffset) {
        setScrollDirection("up");
      }
      setPrevOffset(scrollY);
    };

    window.addEventListener("scroll", toggleScrollDirection);
    return () => window.removeEventListener("scroll", toggleScrollDirection);
  }, [prevOffset]);

  // 2. Function to toggle the popup
  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <>
      <header
        className={`fixed font-sans top-0 w-full md:h-10 h-7 bg-slate-900 text-slate-300 flex items-center px-4 z-50 transition-transform duration-1000 ease-in-out ${
          scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="md:text-sm text-xs md:max-w-[1400px] md:mx-auto md:px-5 flex justify-between md:justify-start md:gap-10 tracking-widest w-full">
          <span className="hidden md:block">Welcome to Victus Byte.</span>
          
          {/* 3. Added onClick to the phone section */}
          <span
            onClick={togglePopup}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <IoCall
              className="text-emerald-500 group-hover:animate-bounce"
              size={17}
            />
            <span className="hover:text-emerald-400 tracking-wider transition-colors">
              09611-342936
            </span>
          </span>

          <span className="flex items-center gap-2 group cursor-pointer transition-colors">
            <IoMail
              className="text-emerald-500 group-hover:scale-110 transition-transform"
              size={18}
            />
            <span className="hover:text-emerald-400 transition-colors">
              support@victusbyte.com
            </span>
          </span>
        </div>
      </header>

      {/* 4. Render the popup only when isPopupOpen is true */}
      {isPopupOpen && (
        <ContactPopup onClose={() => setIsPopupOpen(false)} />
      )}
    </>
  );
};

export default Header;