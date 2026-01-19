import React, { useState, useEffect } from "react";

const Header = () => {
  const [scrollDirection, setScrollDirection] = useState("up");
  const [prevOffset, setPrevOffset] = useState(0);

  useEffect(() => {
    const toggleScrollDirection = () => {
      const scrollY = window.scrollY;

      // Determine direction and only hide after scrolling 50px
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

  return (
    <header
      className={`fixed top-0 w-full md:h-10 h-7 bg-slate-900 text-slate-300 flex items-center px-4 z-50 transition-transform duration-1000 ease-in-out ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="md:text-sm text-xs md:max-w-[1400px] md:mx-auto md:px-5 flex justify-between md:justify-start md:gap-10 tracking-widest w-full">
        {/* Hidden on mobile, visible on medium screens and up */}
        <span className="hidden md:block">Welcome to Victus Byte</span>

        {/* Spaced evenly on mobile, gap-4 on desktop */}
        <span className="">📞 09611342936</span>
        <span>✉️ support@victusbyte.com</span>
      </div>
    </header>
  );
};

export default Header;
