import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, Scrollbar } from "swiper/modules";

import {
  FiShoppingBag,
  FiBriefcase,
  FiCreditCard,
  FiCompass,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import { Link } from "react-router-dom";

import ProductCard from "../ProductCard";

// ============================================================
// SWIPER STYLES
// ============================================================

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

// ============================================================
// DAILY ACCESSORIES PAGE
// ============================================================

const DailyAccessories = () => {
  // ============================================================
  // BAG & BACKPACKS
  // ============================================================

  const bagsBackpacks = [
    {
      _id: "bag1",
      name: "Classic Casual Backpack",
      brandName: "Urban Style",
      category: "DA001",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000",
      ],
      price: { selling: 1450, cost: 1100, discount: 10 },
      status: {
        isFeatured: true,
        isFlashSale: false,
        isNewArrival: true,
      },
    },
    {
      _id: "bag2",
      name: "Premium Laptop Backpack",
      brandName: "TravelPro",
      category: "DA001",
      images: [
        "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=1000",
      ],
      price: { selling: 2200, cost: 1750, discount: 15 },
      status: {
        isFeatured: true,
        isFlashSale: true,
        isNewArrival: true,
      },
    },
    {
      _id: "bag3",
      name: "Minimal Everyday Shoulder Bag",
      brandName: "Urban Style",
      category: "DA001",
      images: [
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1000",
      ],
      price: { selling: 1250, cost: 950, discount: 5 },
      status: {
        isFeatured: false,
        isFlashSale: false,
        isNewArrival: true,
      },
    },
    {
      _id: "bag4",
      name: "Water Resistant Travel Backpack",
      brandName: "TravelPro",
      category: "DA001",
      images: [
        "https://images.unsplash.com/photo-1556306535-0f09a537f0a3?q=80&w=1000",
      ],
      price: { selling: 1850, cost: 1400, discount: 8 },
      status: {
        isFeatured: true,
        isFlashSale: false,
        isNewArrival: false,
      },
    },
    {
      _id: "bag5",
      name: "Canvas Casual Backpack",
      brandName: "DailyCarry",
      category: "DA001",
      images: [
        "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1000",
      ],
      price: { selling: 1100, cost: 850, discount: 10 },
      status: {
        isFeatured: false,
        isFlashSale: true,
        isNewArrival: false,
      },
    },
    {
      _id: "bag6",
      name: "Compact Sling Bag",
      brandName: "DailyCarry",
      category: "DA001",
      images: [
        "https://images.unsplash.com/photo-1571208653893-0b3b8c9a8d1d?q=80&w=1000",
      ],
      price: { selling: 850, cost: 650, discount: 5 },
      status: {
        isFeatured: true,
        isFlashSale: false,
        isNewArrival: true,
      },
    },
    {
      _id: "bag7",
      name: "Modern Travel Backpack",
      brandName: "Urban Style",
      category: "DA001",
      images: [
        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1000",
      ],
      price: { selling: 2100, cost: 1600, discount: 10 },
      status: {
        isFeatured: true,
        isFlashSale: false,
        isNewArrival: true,
      },
    },
    {
      _id: "bag8",
      name: "Everyday Tote Bag",
      brandName: "DailyCarry",
      category: "DA001",
      images: [
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000",
      ],
      price: { selling: 1300, cost: 950, discount: 8 },
      status: {
        isFeatured: false,
        isFlashSale: true,
        isNewArrival: false,
      },
    },
  ];

  // ============================================================
  // LUGGAGE & TRAVEL
  // ============================================================

  const luggageTravel = [
    {
      _id: "lug1",
      name: "Hard Shell Cabin Luggage",
      brandName: "TravelPro",
      category: "DA002",
      images: [
        "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?q=80&w=1000",
      ],
      price: { selling: 4200, cost: 3500, discount: 12 },
      status: {
        isFeatured: true,
        isFlashSale: true,
        isNewArrival: true,
      },
    },
    {
      _id: "lug2",
      name: "Large Travel Suitcase",
      brandName: "Voyager",
      category: "DA002",
      images: [
        "https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=1000",
      ],
      price: { selling: 5800, cost: 4800, discount: 10 },
      status: {
        isFeatured: true,
        isFlashSale: false,
        isNewArrival: true,
      },
    },
    {
      _id: "lug3",
      name: "Lightweight Carry-On Suitcase",
      brandName: "Voyager",
      category: "DA002",
      images: [
        "https://images.unsplash.com/photo-1599639668273-0d5a3d0b1f4a?q=80&w=1000",
      ],
      price: { selling: 3900, cost: 3200, discount: 8 },
      status: {
        isFeatured: false,
        isFlashSale: true,
        isNewArrival: true,
      },
    },
    {
      _id: "lug4",
      name: "Travel Duffel Bag",
      brandName: "Adventure",
      category: "DA002",
      images: [
        "https://images.unsplash.com/photo-1554342872-034a06541bad?q=80&w=1000",
      ],
      price: { selling: 1800, cost: 1400, discount: 10 },
      status: {
        isFeatured: true,
        isFlashSale: false,
        isNewArrival: false,
      },
    },
    {
      _id: "lug5",
      name: "Foldable Travel Bag",
      brandName: "Adventure",
      category: "DA002",
      images: [
        "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=1000",
      ],
      price: { selling: 1200, cost: 900, discount: 5 },
      status: {
        isFeatured: false,
        isFlashSale: false,
        isNewArrival: true,
      },
    },
    {
      _id: "lug6",
      name: "Travel Organizer Bag Set",
      brandName: "TravelPro",
      category: "DA002",
      images: [
        "https://images.unsplash.com/photo-1601598851547-4302969d9b5a?q=80&w=1000",
      ],
      price: { selling: 950, cost: 700, discount: 10 },
      status: {
        isFeatured: true,
        isFlashSale: true,
        isNewArrival: false,
      },
    },
    {
      _id: "lug7",
      name: "Premium Rolling Suitcase",
      brandName: "Voyager",
      category: "DA002",
      images: [
        "https://images.unsplash.com/photo-1553531889-56b6b33a32a0?q=80&w=1000",
      ],
      price: { selling: 6500, cost: 5400, discount: 12 },
      status: {
        isFeatured: true,
        isFlashSale: false,
        isNewArrival: true,
      },
    },
  ];

  // ============================================================
  // WALLETS & SMALL ACCESSORIES
  // ============================================================

  const walletsAccessories = [
    {
      _id: "acc1",
      name: "Classic Leather Wallet",
      brandName: "Urban Leather",
      category: "DA003",
      images: [
        "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000",
      ],
      price: { selling: 750, cost: 550, discount: 10 },
      status: {
        isFeatured: true,
        isFlashSale: false,
        isNewArrival: true,
      },
    },
    {
      _id: "acc2",
      name: "Slim Card Holder Wallet",
      brandName: "DailyCarry",
      category: "DA003",
      images: [
        "https://images.unsplash.com/photo-1606503825008-8f3f5f1a1c3e?q=80&w=1000",
      ],
      price: { selling: 450, cost: 320, discount: 5 },
      status: {
        isFeatured: false,
        isFlashSale: true,
        isNewArrival: true,
      },
    },
    {
      _id: "acc3",
      name: "Minimalist Key Holder",
      brandName: "Urban Leather",
      category: "DA003",
      images: [
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000",
      ],
      price: { selling: 350, cost: 250, discount: 0 },
      status: {
        isFeatured: false,
        isFlashSale: false,
        isNewArrival: true,
      },
    },
    {
      _id: "acc4",
      name: "Travel Passport Holder",
      brandName: "TravelPro",
      category: "DA003",
      images: [
        "https://images.unsplash.com/photo-1585832770485-e68a5dbf4e5c?q=80&w=1000",
      ],
      price: { selling: 650, cost: 480, discount: 8 },
      status: {
        isFeatured: true,
        isFlashSale: false,
        isNewArrival: false,
      },
    },
    {
      _id: "acc5",
      name: "RFID Card Holder",
      brandName: "SafeCarry",
      category: "DA003",
      images: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1000",
      ],
      price: { selling: 550, cost: 400, discount: 10 },
      status: {
        isFeatured: true,
        isFlashSale: true,
        isNewArrival: false,
      },
    },
    {
      _id: "acc6",
      name: "Compact Travel Pouch",
      brandName: "DailyCarry",
      category: "DA003",
      images: [
        "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000",
      ],
      price: { selling: 500, cost: 350, discount: 5 },
      status: {
        isFeatured: false,
        isFlashSale: false,
        isNewArrival: true,
      },
    },
    {
      _id: "acc7",
      name: "Compact Coin Wallet",
      brandName: "Urban Leather",
      category: "DA003",
      images: [
        "https://images.unsplash.com/photo-1600091166971-7f9faad6e1e0?q=80&w=1000",
      ],
      price: { selling: 400, cost: 280, discount: 5 },
      status: {
        isFeatured: false,
        isFlashSale: true,
        isNewArrival: false,
      },
    },
  ];

  // ============================================================
  // DAILY & TRAVEL ESSENTIALS
  // ============================================================

  const dailyEssentials = [
    {
      _id: "ess1",
      name: "Premium Stainless Steel Water Bottle",
      brandName: "DailyLife",
      category: "DA004",
      images: [
        "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=1000",
      ],
      price: { selling: 850, cost: 600, discount: 10 },
      status: {
        isFeatured: true,
        isFlashSale: false,
        isNewArrival: true,
      },
    },
    {
      _id: "ess2",
      name: "Compact Travel Umbrella",
      brandName: "RainSafe",
      category: "DA004",
      images: [
        "https://images.unsplash.com/photo-1553900775-a7e1b5c6f2a1?q=80&w=1000",
      ],
      price: { selling: 650, cost: 450, discount: 5 },
      status: {
        isFeatured: false,
        isFlashSale: true,
        isNewArrival: true,
      },
    },
    {
      _id: "ess3",
      name: "Travel Neck Pillow",
      brandName: "ComfortGo",
      category: "DA004",
      images: [
        "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000",
      ],
      price: { selling: 750, cost: 550, discount: 8 },
      status: {
        isFeatured: true,
        isFlashSale: false,
        isNewArrival: true,
      },
    },
    {
      _id: "ess4",
      name: "Portable Travel Organizer",
      brandName: "DailyLife",
      category: "DA004",
      images: [
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=1000",
      ],
      price: { selling: 550, cost: 400, discount: 5 },
      status: {
        isFeatured: false,
        isFlashSale: false,
        isNewArrival: false,
      },
    },
    {
      _id: "ess5",
      name: "Multi-Purpose Travel Pouch",
      brandName: "Adventure",
      category: "DA004",
      images: [
        "https://images.unsplash.com/photo-1585386959984-a41552231693?q=80&w=1000",
      ],
      price: { selling: 450, cost: 300, discount: 10 },
      status: {
        isFeatured: true,
        isFlashSale: true,
        isNewArrival: false,
      },
    },
    {
      _id: "ess6",
      name: "Everyday Crossbody Bag",
      brandName: "Urban Style",
      category: "DA004",
      images: [
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?q=80&w=1000",
      ],
      price: { selling: 950, cost: 700, discount: 5 },
      status: {
        isFeatured: true,
        isFlashSale: false,
        isNewArrival: true,
      },
    },
    {
      _id: "ess7",
      name: "Portable Everyday Bottle",
      brandName: "DailyLife",
      category: "DA004",
      images: [
        "https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=1000",
      ],
      price: { selling: 700, cost: 500, discount: 8 },
      status: {
        isFeatured: false,
        isFlashSale: false,
        isNewArrival: true,
      },
    },
  ];

  // ============================================================
  // REUSABLE PRODUCT SLIDER SECTION
  // ============================================================
  const ProductSection = ({
    title,
    icon: Icon,
    products,
    iconClass = "text-blue-600",
    sliderId,
  }) => (
    <section className="mt-6">
      {/* =========================================
        SECTION HEADER
    ========================================= */}

      <div className="flex items-center justify-between bg-white shadow-xs border border-gray-100 md:p-4 px-4 py-2 mb-3">
        {/* TITLE */}
        <div className="flex items-center gap-3">
          <div className="p-2 -ml-4 md:ml-0">
            <Icon className={`text-2xl md:-ml-3 ${iconClass}`} />
          </div>

          <h3 className="text-md md:text-xl -ml-3 md:-ml-1 font-bold text-gray-900">
            {title}
          </h3>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2">
          {/* PREVIOUS BUTTON */}
          <button
            type="button"
            className={`
            ${sliderId}-prev
            flex items-center justify-center
            w-8 h-8
            md:w-9 md:h-9
            rounded-full
            border border-slate-200
            bg-white
            text-slate-600
            hover:bg-[#1976d2]
            hover:text-white
            hover:border-[#1976d2]
            transition-all duration-300
            cursor-pointer
          `}
            aria-label={`Previous ${title}`}
          >
            <FiChevronLeft size={18} />
          </button>

          {/* NEXT BUTTON */}
          <button
            type="button"
            className={`
            ${sliderId}-next
            flex items-center justify-center
            w-8 h-8
            md:w-9 md:h-9
            rounded-full
            border border-slate-200
            bg-white
            text-slate-600
            hover:bg-[#1976d2]
            hover:text-white
            hover:border-[#1976d2]
            transition-all duration-300
            cursor-pointer
          `}
            aria-label={`Next ${title}`}
          >
            <FiChevronRight size={18} />
          </button>

          {/* VIEW ALL */}
          <Link
            to="/daily-accessories"
            className="
            hidden sm:flex
            items-center
            text-[9px] md:text-xs
            font-bold uppercase
            tracking-wider
            text-slate-900
            hover:text-white
            border border-slate-900
            hover:bg-slate-900
            px-3 py-1.5
            md:px-5 md:py-2
            rounded-full
            transition-all duration-300
          "
          >
            View All
          </Link>
        </div>
      </div>

      {/* =========================================
        PRODUCT SLIDER
    ========================================= */}

      <div className="relative">
        <Swiper
          modules={[Navigation, Scrollbar]}
          navigation={{
            nextEl: `.${sliderId}-next`,
            prevEl: `.${sliderId}-prev`,
          }}
          scrollbar={{
            draggable: true,
            el: `.${sliderId}-scrollbar`,
          }}
          grabCursor={true}
          spaceBetween={10}
          slidesPerView={2}
          breakpoints={{
            480: {
              slidesPerView: 2,
              spaceBetween: 10,
            },

            640: {
              slidesPerView: 3,
              spaceBetween: 10,
            },

            1024: {
              slidesPerView: 5,
              spaceBetween: 12,
            },

            1280: {
              slidesPerView: 6,
              spaceBetween: 12,
            },
          }}
          className="pb-5"
        >
          {products.map((product) => (
            <SwiperSlide key={product._id} className="h-auto">
              <ProductCard data={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* =========================================
          CUSTOM SCROLLBAR
      ========================================= */}

        <div
          className={`
          ${sliderId}-scrollbar
          product-swiper-scrollbar
        `}
        />

        {/* MOBILE SWIPE HINT */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-2">
          <span className="text-[10px] font-medium text-slate-400">
            Swipe to explore
          </span>

          <span className="text-slate-400 animate-pulse">← →</span>
        </div>
      </div>
    </section>
  );
  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div
      className="
        max-w-[1400px]
        md:px-4
        px-2
        mx-auto
        min-h-screen
        pb-12
        md:mt-[101px]
        mt-12.5
        font-sans
      "
    >
      {/* ======================================================
          HERO BANNER
      ====================================================== */}

      <div className="py-2 relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          pagination={{
            clickable: true,
          }}
          className="
            rounded-xl
            overflow-hidden
            border
            border-slate-200
          "
        >
          {/* HERO 1 */}

          <SwiperSlide>
            <div className="bg-slate-900 h-[300px] md:h-[400px] relative overflow-hidden">
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-slate-950
                  via-slate-900/80
                  to-transparent
                  z-10

                  p-8
                  md:p-12

                  flex
                  flex-col
                  justify-center
                "
              >
                <span className="text-brand font-bold uppercase tracking-widest text-xs mb-2">
                  Everyday Collection
                </span>

                <h2 className="text-white text-4xl md:text-6xl font-black mb-4">
                  DAILY
                  <br />
                  ESSENTIALS
                </h2>

                <Link
                  to="/daily-accessories"
                  className="
                    bg-brand
                    w-fit
                    text-white
                    px-8
                    py-3
                    rounded-lg
                    font-bold
                    hover:bg-[#1565c0]
                    transition-all
                  "
                >
                  Shop Now
                </Link>
              </div>

              <img
                src="https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2000"
                className="w-full h-full object-cover opacity-60"
                alt="Daily Accessories"
              />
            </div>
          </SwiperSlide>

          {/* HERO 2 */}

          <SwiperSlide>
            <div className="bg-slate-800 h-[300px] md:h-[400px] relative overflow-hidden">
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-black/80
                  via-black/40
                  to-transparent
                  z-10

                  p-8
                  md:p-12

                  flex
                  flex-col
                  justify-center
                "
              >
                <span className="text-white font-bold uppercase tracking-widest text-xs mb-2">
                  Travel Collection
                </span>

                <h2 className="text-white text-4xl md:text-6xl font-black mb-4">
                  TRAVEL
                  <br />
                  SMART
                </h2>

                <Link
                  to="/daily-accessories"
                  className="
                    bg-white
                    text-slate-900
                    w-fit
                    px-8
                    py-3
                    rounded-lg
                    font-bold
                    hover:bg-slate-100
                    transition-all
                  "
                >
                  Explore Now
                </Link>
              </div>

              <img
                src="https://images.unsplash.com/photo-1581553680321-4fffae59fccd?q=80&w=2000"
                className="w-full h-full object-cover"
                alt="Travel Luggage"
              />
            </div>
          </SwiperSlide>

          {/* HERO 3 */}

          <SwiperSlide>
            <div className="bg-slate-800 h-[300px] md:h-[400px] relative overflow-hidden">
              <div
                className="
                  absolute
                  inset-0
                  bg-gradient-to-r
                  from-black/80
                  via-black/40
                  to-transparent
                  z-10

                  p-8
                  md:p-12

                  flex
                  flex-col
                  justify-center
                "
              >
                <span className="text-emerald-400 font-bold uppercase tracking-widest text-xs mb-2">
                  New Collection
                </span>

                <h2 className="text-white text-4xl md:text-6xl font-black mb-4">
                  CARRY
                  <br />
                  YOUR STYLE
                </h2>

                <Link
                  to="/daily-accessories"
                  className="
                    bg-emerald-600
                    text-white
                    w-fit
                    px-8
                    py-3
                    rounded-lg
                    font-bold
                    hover:bg-emerald-700
                    transition-all
                  "
                >
                  Discover
                </Link>
              </div>

              <img
                src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2000"
                className="w-full h-full object-cover"
                alt="Bags Collection"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* ======================================================
          PRODUCT SECTIONS
      ====================================================== */}

      <ProductSection
        title="Bags & Backpacks"
        icon={FiShoppingBag}
        iconClass="text-blue-600"
        products={bagsBackpacks}
        sliderId="bags-slider"
      />

      <ProductSection
        title="Luggage & Travel"
        icon={FiBriefcase}
        iconClass="text-emerald-600"
        products={luggageTravel}
        sliderId="luggage-slider"
      />

      <ProductSection
        title="Wallets & Accessories"
        icon={FiCreditCard}
        iconClass="text-orange-500"
        products={walletsAccessories}
        sliderId="wallet-slider"
      />

      <ProductSection
        title="Daily & Travel Essentials"
        icon={FiCompass}
        iconClass="text-purple-600"
        products={dailyEssentials}
        sliderId="essentials-slider"
      />
    </div>
  );
};

export default DailyAccessories;
