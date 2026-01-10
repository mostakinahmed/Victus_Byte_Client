import React, { useContext, useEffect, useState, useMemo } from "react";
import ProductCard from "../ProductCard";
import { DataContext } from "../Context Api/UserContext";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiZap, FiChevronRight } from "react-icons/fi";

export const FeatureProduct = () => {
  const { productData } = useContext(DataContext);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleItems, setVisibleItems] = useState(6);

  // 1. Filter featured data
  const featuredData = useMemo(
    () => productData.filter((item) => item.status?.isFeatured),
    [productData]
  );

  // 2. Handle Responsive logic
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

  const maxIndex = Math.max(0, featuredData.length - visibleItems);

  // 3. Navigation Controls
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // 4. Auto-Transition Logic
  useEffect(() => {
    if (isPaused || featuredData.length <= visibleItems) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, maxIndex, featuredData.length, visibleItems]);

  return (
    <section className="max-w-[1370px] md:mt-4 mt-8 bg-red-300 mb-6 lg:mx-auto pb-3 mx-2">
      {/* Section Title */}
      <div className="flex items-center justify-between bg-white shadow-sm border border-gray-100 md:p-4 px-4 py-2 mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 -ml-4 md:ml-0">
            <FiZap className="text-xl md:-ml-3 text-[#fe741d] animate-pulse" />
          </div>
          <h3 className="md:text-xl -ml-3 md:-ml-1 font-bold text-gray-900">
            Featured Product
          </h3>
        </div>

        <Link
          to="/featured-products"
          className="flex items-center gap-1 text-[9px] md:text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-white border border-slate-900 hover:bg-slate-900 px-3 py-1.5 md:px-5 md:py-2 rounded-full transition-all duration-300"
        >
          View All
        </Link>
      </div>

      {/* Slider Container */}
      <div
        className="relative group px-1 mt-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              // Calculation: moves by the exact percentage of current visible items
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            }}
          >
            {featuredData.map((product) => (
              <div
                key={product.pID}
                // FIX: Force the width to match the sliding percentage exactly
                style={{ width: `${100 / visibleItems}%` }}
                className="flex-shrink-0 px-1 md:px-1.5"
              >
                <Link
                  to={`/${product.category}/${product.name
                    .replace(/\s+/g, "-")
                    .toLowerCase()}`}
                  aria-label={`View details for ${product.name}`}
                >
                  <ProductCard data={product} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Icons */}
        {featuredData.length > visibleItems && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-red-300/90 hover:bg-slate-900 hover:text-white text-gray-800 p-1.5 md:p-2 rounded-r-xl shadow-lg transition-all"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-red-300/90 hover:bg-slate-900 hover:text-white text-gray-800 p-1.5 md:p-2 rounded-l-xl shadow-lg transition-all"
            >
              <FiChevronRight size={24} />
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default FeatureProduct;
