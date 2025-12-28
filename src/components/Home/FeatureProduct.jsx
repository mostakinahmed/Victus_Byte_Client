import React, { useContext, useEffect, useState, useMemo, useRef } from "react";
import { FeatureText } from "./FeatureText";
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
      if (window.innerWidth < 640) setVisibleItems(2); // Mobile: 2 items
      else if (window.innerWidth < 768) setVisibleItems(3);
      else if (window.innerWidth < 1024) setVisibleItems(4);
      else setVisibleItems(6); // Desktop: 6 items
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

  // 4. Auto-Transition Logic (Every 3 seconds)
  useEffect(() => {
    if (isPaused || featuredData.length <= visibleItems) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, maxIndex, featuredData.length, visibleItems]);

  return (
    <section className="max-w-[1370px] md:mt-4 mt-8 bg-red-300 mb-6 lg:mx-auto md:pb-4 pb-3 mx-2 ">
      {/* Section Title */}
      <div className="flex items-center justify-between bg-white shadow-sm border border-gray-100 md:p-4 px-4 py-2  mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 -ml-4 md:ml-0">
            <FiZap className="text-xl md:-ml-3 text-[#fe741d] animate-pulse" />
          </div>
          <h3 className=" md:text-xl -ml-3  md:-ml-1 font-bold text-gray-800">
            Featured Product
          </h3>
        </div>

        {/* View All Button */}
        <Link
          to="/all-products"
          className="flex items-center gap-1 text-[11px] md:text-xs font-bold uppercase tracking-wider text-[#fe741d] hover:text-white border border-[#fe741d] hover:bg-[#fe741d] px-3 py-1.5 md:px-5 md:py-2 rounded-full transition-all duration-300"
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
            className="flex transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
            }}
          >
            {featuredData.map((product) => (
              <div
                key={product.pID}
                className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 flex-shrink-0 px-1 md:px-2"
              >
                <Link to={`/product/${product.category}/${product.pID}`}>
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
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-red-300/90 hover:bg-indigo-600 hover:text-white text-gray-800 p-2 md:p-3 rounded-r-xl shadow-lg transition-all"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-red-300/90 hover:bg-indigo-600 hover:text-white text-gray-800 p-2 md:p-3 rounded-l-xl shadow-lg transition-all"
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
