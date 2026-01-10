import React, { useContext, useEffect, useState, useRef } from "react";
import { FiZap, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { DataContext } from "../Context Api/UserContext";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";

export default function FlashSale() {
  const { productData } = useContext(DataContext);
  const [flashData, setFlashData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleItems, setVisibleItems] = useState(6);

  // Dynamic Countdown State
  const [timeLeft, setTimeLeft] = useState({ h: 3, m: 12, s: 45 });

  const autoSlideTimer = useRef(null);

  // 1. Handle Responsive Column Count
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleItems(2);
      else if (width < 768) setVisibleItems(3);
      else if (width < 1024) setVisibleItems(4);
      else if (width < 1280) setVisibleItems(5);
      else setVisibleItems(6);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 2. Filter Flash Sale Data
  useEffect(() => {
    const data = productData.filter((item) => item.status?.isFlashSale);
    setFlashData(data);
  }, [productData]);

  // 3. Countdown Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, h: prev.h, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const maxIndex = Math.max(0, flashData.length - visibleItems);

  // 4. Navigation Functions
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // 5. Auto-Slide Logic
  useEffect(() => {
    if (isPaused || flashData.length <= visibleItems) {
      if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
      return;
    }

    autoSlideTimer.current = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(autoSlideTimer.current);
  }, [currentIndex, isPaused, maxIndex, flashData.length, visibleItems]);

  return (
    <section className="max-w-[1370px] bg-gray-800 xl:mx-auto mx-2 lg:mx-4 mt-6 overflow-hidden pb-3">
      {/* --- HEADER SECTION --- */}
      <div className="w-full flex items-center justify-between bg-gray-900 text-white px-4 md:py-4 py-2 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-400 p-1.5 rounded-full animate-pulse">
            <FiZap className="text-gray-900 text-lg md:text-xl" />
          </div>
          <h3 className="text-sm md:text-lg font-black tracking-widest uppercase">
            Flash Sale
          </h3>
        </div>

        {/* Real-time Countdown */}
        <div className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-sm border border-red-500 shadow-inner">
          <span className="text-[10px] md:text-xs font-bold uppercase hidden sm:inline">
            Ends in:
          </span>
          <span className="font-mono text-base md:text-xl font-black tracking-wider">
            {String(timeLeft.h).padStart(2, "0")}:
            {String(timeLeft.m).padStart(2, "0")}:
            {String(timeLeft.s).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* --- SLIDER WRAPPER --- */}
      <div
        className="relative group px-1 mt-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
            style={{
              // Logic: moves exactly by the calculated width of one item
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            }}
          >
            {flashData.map((product) => (
              <div
                key={product.pID}
                style={{ width: `${100 / visibleItems}%` }}
                className="flex-shrink-0 px-1 md:px-1.5"
              >
                <Link
                  to={`/${product.category}/${product.name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  className="block h-full"
                >
                  {/* Using your stylish ProductCard */}
                  <ProductCard data={product} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* --- CONTROLS --- */}
        <button
          onClick={prevSlide}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-gray-900/95 hover:bg-blue-600 text-white p-2  rounded-r-2xl border-y border-r border-gray-700 shadow-2xl transition-all duration-300 ${
            currentIndex === 0 ? "opacity-30" : "opacity-100"
          }`}
        >
          <FiChevronLeft size={24} />
        </button>

        <button
          onClick={nextSlide}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-gray-900/95 hover:bg-blue-600 text-white p-2 rounded-l-2xl border-y border-l border-gray-700 shadow-2xl transition-all duration-300 ${
            currentIndex === maxIndex ? "opacity-30" : "opacity-100"
          }`}
        >
          <FiChevronRight size={24} />
        </button>
      </div>

    </section>
  );
}
