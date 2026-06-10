import React, { useState, useEffect } from "react";
import { FiZap, FiTruck, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const flashSaleProducts = [
  {
    id: 1,
    name: "Pond's Bright Beauty Serum Cream 50g (Imported)",
    img: "https://www.startech.com.bd/image/cache/catalog/gadget/daily-lifestyle/smart/sek-s18es/sek-s18es-0001-500x500.webp",
    price: { selling: 355, original: 485 },
    discount: 27,
    soldCount: 13,
    totalAvailable: 30,
    isLimitedStock: false,
    badgeText: "50g",
  },
  {
    id: 2,
    name: "Domex Toilet Cleaning Liquid Lime Fresh 750ml (Bundle of 2)",
    img: "https://www.startech.com.bd/image/cache/catalog/ip-camera/hikvision/hilook-ipc-b121h-c/hilook-ipc-b121h-c-01-500x500.webp",
    price: { selling: 181, original: 360 },
    discount: 50,
    soldCount: 7,
    totalAvailable: 40,
    isLimitedStock: false,
    badgeText: "750 ml",
  },
  {
    id: 3,
    name: "Lotto High Quality Mens Casual Comfort Slide Thongs",
    img: "https://www.startech.com.bd/image/cache/catalog/smart-watch/havit/m9035/m9035-black-01-500x500.webp",
    price: { selling: 261, original: 290 },
    discount: 10,
    soldCount: 0,
    totalAvailable: 0,
    isLimitedStock: true,
  },
  {
    id: 4,
    name: "Wholesale Mens Shirt Stays Garters Holder Adjustable Elastic",
    img: "https://www.startech.com.bd/image/cache/catalog/power-supply/t-wolf/atx-350/atx-350w-04-500x500.webp",
    price: { selling: 202, original: 450 },
    discount: 55,
    soldCount: 0,
    totalAvailable: 0,
    isLimitedStock: true,
  },
  {
    id: 5,
    name: "USA Certified EXACTIVE VITAL Blood Glucose Meter with 10 Pcs",
    img: "https://www.startech.com.bd/image/cache/catalog/component/ram/team/delta-8gb/8gb-500x500.jpg",
    price: { selling: 850, original: 1600 },
    discount: 47,
    soldCount: 0,
    totalAvailable: 0,
    isLimitedStock: true,
  },
];

const FlashSaleSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 11,
    minutes: 16,
    seconds: 18,
  });

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

  return (
    <div className="max-w-[1400px] mx-auto mt-6 md:px-4 px-2 font-sans w-full">
      {/* --- MATCHED BACKGROUND GRADIENT FRAME --- */}
      <div className="bg-gradient-to-r from-[#0a1128] via-[#0d2240] to-[#00d2ff] rounded-sm shadow-xl p-4 overflow-hidden">
        {/* --- EXACT HEADER DESIGN TRACK --- */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-4 mb-1 select-none">
          {/* Left Side: Dynamic FlashSale Logo Type */}
          <div className="flex items-center italic font-black tracking-tighter text-2xl md:text-3xl uppercase">
            <img src="flash.png" alt="" />
          </div>

          {/* Center Side: Exact Match Countdown Boxes */}
          <div className="flex items-center gap-1.5 text-white font-sans text-sm md:text-base font-bold md:absolute md:left-1/2 md:-translate-x-1/2">
            <span className="bg-black text-white w-9 h-7 flex items-center justify-center rounded-md shadow-md tracking-wide">
              {formatUnit(timeLeft.hours)}
            </span>
            <span className="text-white font-medium text-lg leading-none mb-1">
              :
            </span>
            <span className="bg-black text-white w-9 h-7 flex items-center justify-center rounded-md shadow-md tracking-wide">
              {formatUnit(timeLeft.minutes)}
            </span>
            <span className="text-white font-medium text-lg leading-none mb-1">
              :
            </span>
            <span className="bg-black text-white w-9 h-7 flex items-center justify-center rounded-md shadow-md tracking-wide">
              {formatUnit(timeLeft.seconds)}
            </span>
          </div>

          {/* Right Side: Exact Match Pill "Shop More" Button */}
          <Link to="/flash-sale" className="shrink-0">
            <div className="w-50 ">
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

        {/* --- PRODUCT SCROLLER MATRIX --- */}
        <div className="flex flex-nowrap overflow-x-auto gap-3 pb-2 no-scrollbar snap-x snap-mandatory scroll-smooth">
          {flashSaleProducts.map((product) => {
            const salePrice = product.price.selling;
            const originalPrice = product.price.original;
            const productPath = `/product/${product.id}`;

            return (
              <div
                key={product.id}
                className="xl:w-[19.4%] lg:w-[23.8%] md:w-[31.8%] sm:w-[46%] w-[74%] flex-shrink-0 snap-start bg-white rounded-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
              >
                {/* Image Grid Anchor */}
                <div className="relative w-full bg-white aspect-square overflow-hidden flex items-center justify-center p-4">
                  <Link to={productPath} className="w-full h-full block">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </Link>

                  {/* Vertical Spec Label Ribbon */}
                  {product.badgeText && (
                    <div className="absolute top-0 right-0 h-full w-7 bg-slate-900 flex flex-col items-center justify-center text-white text-[10px] font-bold py-2 border-l border-slate-800">
                      <span className="writing-vertical tracking-widest text-center uppercase whitespace-nowrap opacity-90">
                        {product.badgeText}
                      </span>
                    </div>
                  )}
                </div>

                {/* Info Container Wrapper */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {/* Free Delivery Ribbon Block */}
                    <div className="bg-[#00badb] text-white flex items-center gap-1.5 px-3 py-1 text-[9px] font-black uppercase tracking-wider">
                      <FiTruck size={12} className="shrink-0" />
                      <span>Free Delivery</span>
                    </div>

                    {/* Meta padding space */}
                    <div className="p-3">
                      <Link to={productPath}>
                        <h3 className="text-slate-700 font-medium text-xs tracking-tight leading-snug line-clamp-2 h-8 hover:text-[#fe741d] transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      {/* Stock Progress Tracking Node */}
                      <div className="mt-3.5 mb-1.5">
                        {product.isLimitedStock ? (
                          <div className="text-[11px] font-bold text-orange-600 tracking-wide">
                            Limited Stock!
                          </div>
                        ) : (
                          <div className="space-y-1.5">
                            <span className="text-[11px] font-bold text-slate-800 block">
                              {product.soldCount} items sold
                            </span>
                            <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden border border-slate-200/20">
                              <div
                                className="bg-slate-900 h-full rounded-full"
                                style={{
                                  width: `${(product.soldCount / product.totalAvailable) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pricing Matrix with Asymmetric Discount Badge */}
                  <div className="bg-slate-50 border-t border-slate-100 p-3 flex items-center justify-between relative overflow-hidden h-12">
                    <div className="flex items-baseline gap-1 wrap min-w-0">
                      <span className="text-xs text-slate-900 font-bold">
                        ৳
                      </span>
                      <span className="text-sm md:text-base font-black text-slate-950 tracking-tight leading-none">
                        {salePrice.toLocaleString()}
                      </span>
                      {originalPrice > 0 && (
                        <span className="text-[10px] text-slate-400 font-medium line-through leading-none ml-0.5">
                          ৳{originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Exact Angle Skew Percentage Ribbon */}
                    <div
                      className="absolute right-0 bottom-0 top-0 bg-[#00badb] text-white font-extrabold text-[11px] md:text-xs flex items-center justify-center pl-4 pr-2.5"
                      style={{
                        clipPath:
                          "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)",
                      }}
                    >
                      {product.discount}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .writing-vertical { writing-mode: vertical-lr; transform: rotate(180deg); }
      `,
        }}
      />
    </div>
  );
};

export default FlashSaleSection;
