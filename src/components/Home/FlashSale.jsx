import React, { useContext, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FiZap } from "react-icons/fi";
import { DataContext } from "../Context Api/UserContext";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";

export default function FlashSale() {
  const { productData } = useContext(DataContext);
  const [flashData, setFlashData] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false); // State to track hover

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
  });

  // 1. Filter Flash Sale Data
  useEffect(() => {
    const data = productData.filter((item) => item.status?.isFlashSale);
    setFlashData(data);
  }, [productData]);

  // 2. Progress Calculation (Tracks active slide index)
  useEffect(() => {
    if (!emblaApi) return;

    const updateProgress = () => {
      const progress = emblaApi.selectedScrollSnap();
      const total = emblaApi.scrollSnapList().length;
      const percent = ((progress + 1) / total) * 100;
      setScrollProgress(percent);
    };

    emblaApi.on("select", updateProgress);
    updateProgress();
  }, [emblaApi]);

  // 3. Auto-Scroll Logic with Hover Detection
  useEffect(() => {
    if (!emblaApi || isPaused) return;

    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0); // Loop back to start
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [emblaApi, isPaused]);

  return (
    <section
      className="max-w-[1370px] bg-gray-800 xl:mx-auto mx-2 lg:mx-4 mt-6 overflow-hidden pb-3"
      onMouseEnter={() => setIsPaused(true)} // Stop scroll on hover
      onMouseLeave={() => setIsPaused(false)} // Resume scroll on leave
    >
      {/* --- HEADER SECTION --- */}
      <div className="w-full flex items-center justify-between bg-gray-900 text-white px-4 py-2 md:py-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="bg-yellow-400 p-1.5 rounded-full animate-pulse">
            <FiZap className="text-gray-900 text-lg md:text-xl" />
          </div>
          <h3 className="text-sm md:text-lg font-black tracking-widest uppercase">
            Flash Sale
          </h3>
        </div>
      </div>

      {/* --- CAROUSEL / SLIDER --- */}
      <div className="overflow-hidden mt-4" ref={emblaRef}>
        <div className="flex md:px-2 md:gap-3 md:ml-2.5 gap-2 mx-2 md:mx-0">
          {flashData.map((product) => (
            <div
              key={product.pID}
              className="flex-shrink-0 w-[49%] sm:w-[31%] md:w-[24%] lg:w-[19%] xl:w-[16%]"
            >
              <Link
                to={`/${product.category}/${product.name.replace(/\s+/g, "-").toLowerCase()}`}
              >
                <ProductCard data={product} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* --- PROGRESS BAR --- */}
      <div className="md:px-20 px-4 mt-3">
        <div className="w-1/2 mx-auto h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-400 transition-all duration-500 ease-linear"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>
    </section>
  );
}
