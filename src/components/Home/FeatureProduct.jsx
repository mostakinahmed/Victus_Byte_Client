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

  // Featured Products
  const featuredData = useMemo(
    () => productData.filter((item) => item.status?.isFeatured),
    [productData]
  );

  // Responsive Items Count
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

  // Next Slide
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  // Previous Slide
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Auto Slide
  useEffect(() => {
    if (isPaused || featuredData.length <= visibleItems) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 2500);

    return () => clearInterval(interval);
  }, [currentIndex, isPaused, featuredData.length, visibleItems]);

  return (
    <section className="relative max-w-[1370px] md:mt-4 mt-8 mb-8 lg:mx-auto mx-2 pb-5 rounded overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-orange-900 shadow-2xl border border-white/10">
      {/* Decorative Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between bg-white/10 backdrop-blur-md border-b border-white/10 md:p-4 px-4 py-3 md:mb-8 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2">
            <FiZap className="text-xl text-orange-400 animate-pulse" />
          </div>

          <h3 className="md:text-xl text-lg font-bold text-white">
            Featured Products
          </h3>
        </div>

        <Link
          to="/featured-products"
          className="flex items-center gap-1 text-[10px] md:text-xs font-bold uppercase tracking-wider text-white border border-white/20 bg-white/10 hover:bg-orange-500 px-3 py-1.5 md:px-5 md:py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/30"
        >
          View All
        </Link>
      </div>

      {/* Slider */}
      <div
        className="relative z-10 group px-1"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{
              transform: `translateX(-${
                currentIndex * (100 / visibleItems)
              }%)`,
            }}
          >
            {featuredData.map((product) => (
              <div
                key={product.pID}
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

        {/* Previous Button */}
        {featuredData.length > visibleItems && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-orange-500 hover:text-white text-white p-2 md:p-3 rounded-r-xl shadow-lg transition-all duration-300 hover:scale-110"
            >
              <FiChevronLeft size={22} />
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md hover:bg-orange-500 hover:text-white text-white p-2 md:p-3 rounded-l-xl shadow-lg transition-all duration-300 hover:scale-110"
            >
              <FiChevronRight size={22} />
            </button>
          </>
        )}
      </div>

    </section>
  );
};

export default FeatureProduct;