import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight, FiEye } from "react-icons/fi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const KidsZoneLayout = () => {
  // Mock data for the "Recently Sold" and "Feeding Utensils" sections
  const products = [
    {
      id: 1,
      name: "Kidlon Glass Feeder 8OZ - 5279-G64",
      brand: "Kidlon",
      price: 427,
      oldPrice: null,
      discount: null,
      img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
    },
      {
      id: 3,
      name: "Sony WH-1000XM5 Noise Cancelling Headphones",
      brand: "Sony",
      price: "35,000",
      oldPrice: "38,500",
      discount: 9,
      img: "https://m.media-amazon.com/images/I/51aXvjzcukL._AC_SL1500_.jpg",
      tag: "Wireless"
    },
    {
      id: 2,
      name: "Funskool Fundough Fun Roller Set",
      brand: "Funskool",
      price: 680,
      oldPrice: null,
      discount: null,
      img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
    },
    {
      id: 3,
      name: "Kidlon Toothbrush Roll Box",
      brand: "Kidlon",
      price: 86,
      oldPrice: null,
      discount: null,
      img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
    },
    {
      id: 4,
      name: "Pure Cotton Baby Saliva Napkin Newborn Rice Pocket Bib -1pcs",
      brand: "Non-Brand",
      price: 135,
      oldPrice: 150,
      discount: 10,
      img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
    },
    {
      id: 5,
      name: "Frozen Barbie princess Flaying Doll Blue or pink Doll",
      brand: "Non-Brand",
      price: 689,
      oldPrice: 800,
      discount: 14,
      img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
    },
    {
      id: 6,
      name: "Feeding Utensil Teether",
      brand: "Pur",
      price: 220,
      oldPrice: 250,
      discount: 10,
      img: "https://manchestermuseumshop.com/cdn/shop/files/Keel-Toys-Stan-Small_02d40031-c0ff-452e-bd35-d4b931091da6_1445x.jpg?v=1694443600",
    },
  ];

  return (
    <div className="max-w-[1400px] px-4 mx-auto px- min-h-screen pb-12 mt-[87px] font-sans">
      {/* --- HERO BANNER SECTION --- */}
      <div className=" py-5 relative group">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 2500 }}
          loop={true}
          navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
          pagination={{ clickable: true }}
          className="rounded shadow-sm overflow-hidden"
        >
          <SwiperSlide>
            <div className="bg-[#00ADEF] h-[280px] md:h-[350px] flex items-center justify-center text-white text-4xl font-bold">
              <img
                src="kids2.png"
                className="w-full h-full object-cover"
                alt="Banner 1"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-[#E91E63] h-[280px] md:h-[350px] flex items-center justify-center text-white text-4xl font-bold">
              <img
                src="kids.png"
                className="w-full h-full object-cover"
                alt="Banner 2"
              />
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Banner Navigation Arrows */}
        <button className="hero-prev absolute left-8 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-md hidden group-hover:flex transition-all hover:bg-white">
          <FiChevronLeft size={24} className="text-gray-700" />
        </button>
        <button className="hero-next absolute right-8 top-1/2 -translate-y-1/2 z-10 bg-white/90 p-3 rounded-full shadow-md hidden group-hover:flex transition-all hover:bg-white">
          <FiChevronRight size={24} className="text-gray-700" />
        </button>
      </div>

      {/* --- RECENTLY SOLD PRODUCTS --- */}
      <ProductSection
        title="Recently Sold Products"
        products={products.slice(0, 8)}
      />

      {/* --- FEEDING UTENSILS --- */}
      <ProductSection
        title="Feeding Utensils"
        products={products}
        showSeeMore={true}
      />
    </div>
  );
};

// Sub-component for individual product sections
const ProductSection = ({ title, products, showSeeMore = false }) => (
  <div className="mt-10">
    <div className="flex items-center justify-between mb-6 px-1">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1.5 bg-[#00ADEF] rounded-full"></div>
        <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
          {title}
        </h2>
      </div>
      {showSeeMore && (
        <button className="group flex items-center gap-2 text-[#00ADEF] font-semibold text-sm hover:text-[#0082b5] transition-colors">
          View All
          <FiChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      )}
    </div>

    <div className="relative group/section">
      <Swiper
        modules={[Navigation]}
        spaceBetween={15}
        slidesPerView={2}
        navigation={{ nextEl: ".next-btn", prevEl: ".prev-btn" }}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 }, // Increased density for larger screens
        }}
        className="pb-4"
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="flex flex-col h-80 bg-white border hover:border-[#fe741d]  overflow-hidden transition-all duration-300  border-gray-100 group/card cursor-pointer">
              {/* Top Image Section */}
              <div className="relative aspect-square overflow-hidden bg-gray-50 p-4">
                {item.discount && (
                  <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded ">
                    -{item.discount}%
                  </div>
                )}

                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-110"
                />

                {/* Hover Actions */}
                {/* <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                  <button className="bg-white p-3 rounded-full shadow-lg hover:bg-[#00ADEF] hover:text-white transition-all transform translate-y-4 group-hover/card:translate-y-0 duration-300">
                    <FiEye size={18} />
                  </button>
                </div> */}
              </div>

              {/* Bottom Info Section */}
              <div className=" flex flex-col flex-grow">
                <p className="text-[10px] px-4 font-bold text-[#00ADEF] uppercase tracking-widest mb-1">
                  {item.brand}
                </p>
                <h3 className="px-4 text-sm font-semibold text-gray-800 line-clamp-2 mb-2 leading-snug h-10 group-hover/card:text-[#00ADEF] transition-colors">
                  {item.name}
                </h3>

                <div className="mt-auto border-t border-gray-50">
                  <div className="px-4 flex items-baseline gap-2 mb-3">
                    <span className="text-base font-bold text-gray-900">
                      ৳{item.price}
                    </span>
                    {item.oldPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        ৳{item.oldPrice}
                      </span>
                    )}
                  </div>

                  <button className="w-full py-2.5 bg-[#fe741d] text-white text-xs font-bold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modern Floating Navigation Buttons */}
      <button className="prev-btn absolute -left-4 top-[40%] -translate-y-1/2 z-20 bg-white border border-gray-100 shadow-xl p-3 rounded-full hidden group-hover/section:flex hover:bg-[#00ADEF] hover:text-white transition-all">
        <FiChevronLeft size={20} />
      </button>
      <button className="next-btn absolute -right-4 top-[40%] -translate-y-1/2 z-20 bg-white border border-gray-100 shadow-xl p-3 rounded-full hidden group-hover/section:flex hover:bg-[#00ADEF] hover:text-white transition-all">
        <FiChevronRight size={20} />
      </button>
    </div>
  </div>
);

export default KidsZoneLayout;
