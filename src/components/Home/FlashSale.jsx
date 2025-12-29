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

  // Ref to track the timer for cleaner auto-sliding
  const autoSlideTimer = useRef(null);

  // 1. Handle Responsive Column Count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleItems(2); // Mobile: 2 cards
      else if (window.innerWidth < 768)
        setVisibleItems(3); // Small Tablet: 3 cards
      else if (window.innerWidth < 1024) setVisibleItems(4); // Tablet: 4 cards
      else setVisibleItems(6); // Desktop: 6 cards
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const data = productData.filter((item) => item.status?.isFlashSale);
    setFlashData(data);
  }, [productData]);

  const maxIndex = Math.max(0, flashData.length - visibleItems);

  // 2. Navigation Functions
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // 3. Auto-Slide Logic
  useEffect(() => {
    if (isPaused || flashData.length <= visibleItems) {
      if (autoSlideTimer.current) clearInterval(autoSlideTimer.current);
      return;
    }

    autoSlideTimer.current = setInterval(() => {
      nextSlide();
    }, 2000); // Slides every 3 seconds

    return () => clearInterval(autoSlideTimer.current);
  }, [currentIndex, isPaused, maxIndex, flashData.length, visibleItems]);

  return (
    <section className="max-w-[1370px] bg-gray-800 xl:mx-auto mx-2 lg:mx-4 mt-6 overflow-hidden pb-3 md:pb-4">
      {/* Header Section */}
      <div className="w-full flex items-center justify-between bg-gray-900 text-white px-4 md:py-4 py-2 shadow-md mb-4">
        <div className="flex items-center gap-2">
          <FiZap className="text-xl text-yellow-400 animate-pulse" />
          <h3 className="text-sm md:text-lg font-bold tracking-tight uppercase">
            Flash Sale
          </h3>
        </div>
        <div className="text-sm flex items-center gap-2 bg-red-600 text-white px-3 py-1 font-bold rounded-sm">
          <span>Ends in:</span>
          <span className="font-mono text-base md:text-lg">03:12:45</span>
        </div>
      </div>

      {/* Slider Wrapper */}
      <div
        className="relative group px-1"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              // Moves based on the width of a single item
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            }}
          >
            {flashData.map((product) => (
              <div
                key={product.pID}
                className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 flex-shrink-0 px-1 md:px-2"
              >
                <Link
                  key={product.pID}
                  to={`/${product.category}/${product.name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`} // Replace spaces with hyphens in the URL
                  aria-label={`View details for ${product.name}`}
                >
                  <ProductCard data={product} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Left Control - Overlap style */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-gray-900/90 hover:bg-red-600 text-white p-2 md:p-3 rounded-r-xl border border-l-0 border-gray-700 shadow-xl transition-all"
        >
          <FiChevronLeft className="text-xl md:text-2xl" />
        </button>

        {/* Right Control - Overlap style */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-gray-900/90 hover:bg-red-600 text-white p-2 md:p-3 rounded-l-xl border border-r-0 border-gray-700 shadow-xl transition-all"
        >
          <FiChevronRight className="text-xl md:text-2xl" />
        </button>
      </div>
    </section>
  );
}
