import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiChevronLeft, FiChevronRight, FiCpu, FiZap, FiShield } from "react-icons/fi";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Electronics = () => {
  // Electronics specific data
  const techProducts = [
    {
      id: 1,
      name: "Logitech MX Master 3S Wireless Mouse",
      brand: "Logitech",
      price: "12,500",
      oldPrice: "14,000",
      discount: 11,
      img: "https://m.media-amazon.com/images/I/61ni3t1ryQL._AC_SL1500_.jpg",
      tag: "Best Seller"
    },
    {
      id: 2,
      name: "Keychron K2 Mechanical Keyboard V2",
      brand: "Keychron",
      price: "8,900",
      oldPrice: null,
      discount: null,
      img: "https://m.media-amazon.com/images/I/71YvYlF7M7L._AC_SL1500_.jpg",
      tag: "New"
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
      id: 4,
      name: "Samsung 980 PRO 1TB PCIe 4.0 NVMe SSD",
      brand: "Samsung",
      price: "11,200",
      oldPrice: "12,500",
      discount: 10,
      img: "https://m.media-amazon.com/images/I/719hVp96S6L._AC_SL1500_.jpg",
      tag: "Storage"
    },
    {
      id: 5,
      name: "Apple Watch Series 9 GPS 45mm",
      brand: "Apple",
      price: "48,500",
      oldPrice: null,
      discount: null,
      img: "https://m.media-amazon.com/images/I/71LfnS-Y7rL._AC_SL1500_.jpg",
      tag: "Premium"
    },
    {
      id: 6,
      name: "Razer DeathAdder V3 Pro Gaming Mouse",
      brand: "Razer",
      price: "15,200",
      oldPrice: "16,800",
      discount: 10,
      img: "https://m.media-amazon.com/images/I/61fIq7o-FDL._AC_SL1500_.jpg",
      tag: "Gaming"
    }
  ];

  return (
    <div className="max-w-[1400px] md:px-4 px-2 mx-auto min-h-screen pb-12 md:mt-[97px] mt-12 font-sans">
      
      {/* --- TECH FEATURES HIGHLIGHT --- */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg flex items-center gap-4 border border-slate-100 shadow-sm">
          <div className="bg-blue-50 p-3 rounded-full text-blue-600"><FiCpu size={24}/></div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Authentic Tech</h4>
            <p className="text-xs text-slate-500">100% Genuine Products</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg flex items-center gap-4 border border-slate-100 shadow-sm">
          <div className="bg-orange-50 p-3 rounded-full text-orange-600"><FiShield size={24}/></div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Official Warranty</h4>
            <p className="text-xs text-slate-500">Up to 24 Months Coverage</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg flex items-center gap-4 border border-slate-100 shadow-sm">
          <div className="bg-green-50 p-3 rounded-full text-green-600"><FiZap size={24}/></div>
          <div>
            <h4 className="font-bold text-slate-800 text-sm">Expert Support</h4>
            <p className="text-xs text-slate-500">Specialized Tech Assistance</p>
          </div>
        </div>
      </div> */}

      {/* --- HERO BANNER SECTION (Refined for Tech) --- */}
      <div className="py-2 relative group">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{ delay: 3500 }}
          loop={true}
          navigation={{ nextEl: ".hero-next", prevEl: ".hero-prev" }}
          pagination={{ clickable: true }}
          className="rounded overflow-hidden border border-slate-200"
        >
          <SwiperSlide>
            <div className="bg-slate-900 h-[300px] md:h-[400px] relative overflow-hidden">
               {/* Overlay for tech feel */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-transparent z-10 p-12 flex flex-col justify-center">
                <span className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">Next Gen Performance</span>
                <h2 className="text-white text-4xl md:text-6xl font-black mb-4">RTX 40-SERIES<br/>LAPTOPS</h2>
                <button className="bg-blue-600 w-fit text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 transition-all">Explore Now</button>
              </div>
              <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2000" className="w-full h-full object-cover opacity-60" alt="Tech Banner" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-indigo-900 h-[300px] md:h-[400px] flex items-center justify-center">
              <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2000" className="w-full h-full object-cover" alt="Banner 2" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* --- PRODUCT SECTIONS --- */}
      <ProductSection title="Trending Tech" products={techProducts} />
      <ProductSection title="Gaming Essentials" products={[...techProducts].reverse()} showSeeMore={true} />
    </div>
  );
};

const ProductSection = ({ title, products, showSeeMore = false }) => (
  <div className="mt-12">
    <div className="flex items-center justify-between mb-6 px-1">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1.5 bg-blue-600 rounded-full"></div>
        <h2 className="text-2xl font-black text-slate-800 tracking-tight">
          {title}.
        </h2>
      </div>
      {showSeeMore && (
        <button className="group flex items-center gap-2 text-slate-500 font-bold text-sm hover:text-blue-600 transition-colors uppercase tracking-wider">
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
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="pb-4"
      >
        {products.map((item) => (
          <SwiperSlide key={item.id}>

            
            <div className="flex flex-col h-[400px] bg-white border border-slate-100 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl group/card cursor-pointer">
              
              {/* Product Image Section */}
              <div className="relative h-56 bg-[#fcfcfc] p-6 flex items-center justify-center overflow-hidden">
                {item.discount && (
                  <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                    SALE -{item.discount}%
                  </div>
                )}
                {item.tag && (
                    <div className="absolute top-3 right-3 z-10 bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded">
                        {item.tag}
                    </div>
                )}

                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover/card:scale-105"
                />
              </div>

              {/* Product Info Section */}
              <div className="p-4 flex flex-col flex-grow bg-white">
                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">
                  {item.brand}
                </span>
                <h3 className="text-sm font-bold text-slate-800 line-clamp-2 mb-2 leading-tight h-10 transition-colors group-hover/card:text-blue-600">
                  {item.name}
                </h3>

                <div className="mt-auto">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-black text-slate-900">
                      ৳{item.price}
                    </span>
                    {item.oldPrice && (
                      <span className="text-xs text-slate-400 line-through">
                        ৳{item.oldPrice}
                      </span>
                    )}
                  </div>

                  <button className="w-full py-3 bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors rounded shadow-lg shadow-slate-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>



          </SwiperSlide>
        ))}
      </Swiper>

      <button className="prev-btn absolute -left-4 top-[40%] -translate-y-1/2 z-20 bg-white border border-slate-200 shadow-xl p-3 rounded-full hidden group-hover/section:flex hover:bg-blue-600 hover:text-white transition-all">
        <FiChevronLeft size={20} />
      </button>
      <button className="next-btn absolute -right-4 top-[40%] -translate-y-1/2 z-20 bg-white border border-slate-200 shadow-xl p-3 rounded-full hidden group-hover/section:flex hover:bg-blue-600 hover:text-white transition-all">
        <FiChevronRight size={20} />
      </button>
    </div>
  </div>
);

export default Electronics;