import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import ProductCard from "../components/ProductCard";

import "swiper/css";
import "swiper/css/navigation";

const SectionList = () => {
  // Updated data structure to match your stylish card logic
  const electronicsData = [
    {
      id: "cat_1",
      categoryName: "Computer Accessories",
      products: [
        {
          id: 101,
          name: "Logitech MX Master 3S",
          brand: "Logitech",
          price: { selling: 14000, discount: 1500 }, // Nested object for card logic
          status: { isNewArrival: true },
          images: [
            "https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1500_.jpg",
          ],
        },
        {
          id: 102,
          name: "Keychron K2 Keyboard",
          brand: "Keychron",
          price: { selling: 8900, discount: 0 },
          status: { isNewArrival: false },
          images: [
            "https://m.media-amazon.com/images/I/71YvYlF7M7L._AC_SL1500_.jpg",
          ],
        },
      ],
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-10 mt-[90px] flex flex-col gap-16 font-sans">
      {electronicsData.map((section) => (
        <div key={section.id} className="w-full">
          <div className="flex items-center justify-between mb-6 px-1">
            <div className="flex items-center gap-3">
              <div className="h-8 w-1.5 bg-blue-600 rounded-full"></div>
              <h2 className="text-2xl font-black text-slate-800 tracking-tight lowercase">
                {section.categoryName}.
              </h2>
            </div>
          </div>

          <div className="relative group/section">
            <Swiper
              modules={[Navigation]}
              spaceBetween={15}
              slidesPerView={2}
              navigation={{
                nextEl: `.next-${section.id}`,
                prevEl: `.prev-${section.id}`,
              }}
              breakpoints={{
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 5 },
              }}
            >
              {section.products.map((item) => (
                <SwiperSlide key={item.id}>
                  {/* Pass 'item' as 'data' to match ProductCard props */}
                  <ProductCard data={item} />
                </SwiperSlide>
              ))}
            </Swiper>

            <button
              className={`prev-${section.id} absolute -left-4 top-[40%] -translate-y-1/2 z-20 bg-white border border-slate-200 shadow-xl p-3 rounded-full hidden group-hover/section:flex`}
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              className={`next-${section.id} absolute -right-4 top-[40%] -translate-y-1/2 z-20 bg-white border border-slate-200 shadow-xl p-3 rounded-full hidden group-hover/section:flex`}
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionList; // Fixes the Vite Export Error
