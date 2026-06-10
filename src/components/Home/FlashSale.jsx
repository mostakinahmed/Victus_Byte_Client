import React, { useContext, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FiZap, FiChevronRight } from "react-icons/fi";
import { DataContext } from "../Context Api/UserContext";
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";

export default function FlashSale() {
  const { productData } = useContext(DataContext);
  const [flashData, setFlashData] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Added countdown timer state to display inside the new header layout perfectly
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 16,
    seconds: 18,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    dragFree: false,
  });

  // Countdown timer logic tracking
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        clearInterval(timer);
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatUnit = (num) => String(num).padStart(2, "0");

  // 1. Filter Flash Sale Data (Original Function Intact)
  useEffect(() => {
    const data = productData?.filter((item) => item.status?.isFlashSale) || [];
    setFlashData(data);
  }, [productData]);

  // 2. Progress Calculation (Original Function Intact)
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

  // 3. Auto-Scroll Logic with Hover Detection (Original Function Intact)
  useEffect(() => {
    if (!emblaApi || isPaused) return;

    const interval = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      } else {
        emblaApi.scrollTo(0);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [emblaApi, isPaused]);

  return (
    <section
      className="max-w-[1370px] bg-gradient-to-r from-[#0a1128] via-[#0d2240] to-[#00d2ff] xl:mx-auto mx-2 lg:mx-4 mt-6 overflow-hidden pb-4 pt-4 px-2 md:px-4 rounded shadow-xl relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* --- MATCHED HEADER LAYOUT DESIGN --- */}
      <div className="w-full flex  md:flex-row items-center justify-between gap-4 md:pb-4 pb-2 border-b border-white/10 select-none">
        {/* Left Side: Exact "FLASH⚡SALE" Logo Variant Layout */}
        <div className="flex items-center italic font-black tracking-tighter text-xl md:text-3xl uppercase">
          <span className="text-white drop-shadow-md">Flash</span>
          <span className="text-yellow-400 px-1 drop-shadow-[0_2px_5px_rgba(234,179,8,0.4)] animate-pulse">
            ⚡
          </span>
          <span className="bg-[#007aff] text-white px-3 py-0.5 rounded-sm text-lg md:text-2xl tracking-normal not-italic shadow-inner ml-0.5">
            Sale
          </span>
        </div>

        {/* Center Side: Exact Match Digital Countdown Blocks */}
        <div className="flex items-center gap-1.5 text-white font-sans md:text-sm text-xs font-bold md:absolute md:left-1/2 md:-translate-x-1/2">
          <span className="bg-black text-white md:w-9 md:h-7 w-8 h-6 flex items-center justify-center rounded-md shadow-md tracking-wide">
            {formatUnit(timeLeft.hours)}
          </span>
          <span className="text-white font-medium text-lg leading-none mb-1">
            :
          </span>
          <span className="bg-black text-white  md:w-9 md:h-7 w-8 h-6  flex items-center justify-center rounded-md shadow-md tracking-wide">
            {formatUnit(timeLeft.minutes)}
          </span>
          <span className="text-white font-medium text-lg leading-none mb-1">
            :
          </span>
          <span className="bg-black text-white  md:w-9 md:h-7 w-8 h-6  flex items-center justify-center rounded-md shadow-md tracking-wide">
            {formatUnit(timeLeft.seconds)}
          </span>
        </div>

        {/* Right Side: Pill Shape "Shop More" Action Button */}

        <Link to="/flash-sale" className="shrink-0 hidden md:block">
          <div className="md:w-50 w-30 ">
            <img src="shop-more.png" alt="" />
          </div>
          <button className="hidden flex items-center gap-3 bg-white hover:bg-slate-50 text-[#0a1128] font-bold text-sm pl-5 pr-1.5 py-1.5 rounded-full shadow-md transition-all group">
            Shop More
            <div className="w-6 h-6 rounded-full bg-[#0a1128] text-white flex items-center justify-center group-hover:bg-[#007aff] transition-colors">
              <FiChevronRight size={16} strokeWidth={3} />
            </div>
          </button>
        </Link>
      </div>

      {/* --- CAROUSEL / SLIDER (Cards Left Completely Untouched) --- */}
      <div className="overflow-hidden mt-5" ref={emblaRef}>
        <div className="flex md:px-2 md:gap-3.5 md:md:ml-1 gap-2  md:mx-0">
          {flashData.map((product) => (
            <div
              key={product.pID}
              className="flex-shrink-0 w-[49%] sm:w-[31%] md:w-[24%] lg:w-[19%] xl:w-[16%]"
            >
              <Link
                to={`/${product.category}/${product.name.replace(/\s+/g, "-").toLowerCase()}`}
              >
                {/* Your card layout remains unmodified */}
                <ProductCard data={product} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* --- PROGRESS BAR --- */}
      <div className="md:px-20 px-4 mt-4">
        <div className="w-1/2 mx-auto h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-yellow-400 transition-all duration-500 ease-linear"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </div>

      <Link to="/flash-sale" className="shrink-0 md:hidden">
        <div className="flex items-center justify-center md:w-48 w-32 mt-5 mx-auto">
          <img
            src="shop-more.png"
            alt="Shop More Link Button"
            className="w-full h-auto object-contain"
          />
        </div>
      </Link>
    </section>
  );
}
