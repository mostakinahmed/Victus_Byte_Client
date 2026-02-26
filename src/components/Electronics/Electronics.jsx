import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { FiCpu, FiActivity, FiZap, FiChevronRight } from "react-icons/fi";

// Import your existing ProductCard
import ProductCard from "../ProductCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const Electronics = () => {
  // --- DUMMY DATA FOLLOWING YOUR MONGODB STRUCTURE ---

  // Category C001: Microcontrollers
  const microcontrollers = [
    {
      _id: "m1",
      name: "ESP32 DevKit V1 WiFi + Bluetooth Board",
      brandName: "Espressif",
      category: "C001",
      images: [
        "https://www.electronics.com.bd/12563-large_default/esp32-development-board.webp",
      ],
      price: { selling: 650, cost: 450, discount: 5 },
      status: { isFeatured: true, isFlashSale: false, isNewArrival: true },
    },
    {
      _id: "m2",
      name: "Arduino Uno R3 with USB Cable latest version",
      brandName: "Arduino",
      category: "C001",
      images: [
        "https://img.drz.lazcdn.com/static/bd/p/6e0944f5ef8bdea726b2b00b71bb6b90.jpg_720x720q80.jpg",
      ],
      price: { selling: 850, cost: 600, discount: 0 },
      status: { isFeatured: true, isFlashSale: false, isNewArrival: false },
    },
    {
      _id: "m3",
      name: "Raspberry Pi Pico H (Headers Pre-soldered)",
      brandName: "Raspberry Pi",
      category: "C001",
      images: [
        "https://electropeak.com/media/catalog/product/cache/fd3007d55266f7276c10ebf7f3da2215/m/i/min-01-142-1-raspberry-pi-pico-h.jpg",
      ],
      price: { selling: 550, cost: 400, discount: 2 },
      status: { isFeatured: false, isFlashSale: true, isNewArrival: true },
    },
    {
      _id: "m4",
      name: "NodeMCU Lua Lolin V3 ESP8266",
      brandName: "AI-Thinker",
      category: "C001",
      images: [
        "https://static-01.daraz.com.bd/p/6d134a5598833d419d19c5824a414ee1.jpg",
      ],
      price: { selling: 350, cost: 250, discount: 10 },
      status: { isFeatured: true, isFlashSale: false, isNewArrival: false },
    },
    {
      _id: "m2",
      name: "Arduino Uno R3 with USB Cable",
      brandName: "Arduino",
      category: "C001",
      images: [
        "https://img.drz.lazcdn.com/static/bd/p/6e0944f5ef8bdea726b2b00b71bb6b90.jpg_720x720q80.jpg",
      ],
      price: { selling: 850, cost: 600, discount: 0 },
      status: { isFeatured: true, isFlashSale: false, isNewArrival: false },
    },
    {
      _id: "m4",
      name: "NodeMCU Lua Lolin V3 ESP8266",
      brandName: "AI-Thinker",
      category: "C001",
      images: [
        "https://static-01.daraz.com.bd/p/6d134a5598833d419d19c5824a414ee1.jpg",
      ],
      price: { selling: 350, cost: 250, discount: 10 },
      status: { isFeatured: true, isFlashSale: false, isNewArrival: false },
    },
  ];

  // Category C002: Sensors (8 items for 2 rows)
  const sensors = [
    {
      _id: "s1",
      name: "DHT11 Humidity & Temperature sensor (Digital & Analog)",
      brandName: "Generic",
      images: [
        "https://m.media-amazon.com/images/I/61oK9y53c9L._AC_UF1000,1000_QL80_.jpg",
      ],
      price: { selling: 120, discount: 0 },
      status: { isNewArrival: true },
    },
    {
      _id: "s2",
      name: "HC-SR04 Ultrasonic Sensor for Distance",
      brandName: "Generic",
      images: [
        "https://thepihut.com/cdn/shop/products/ultrasonic-distance-sensor-hc-sr04-the-pi-hut-100284-1118255996_grande.jpg?v=1646101268",
      ],
      price: { selling: 150, discount: 5 },
      status: { isFeatured: true },
    },
    {
      _id: "s3",
      name: "PIR Motion Sensor HC-SR501 work with 5V",
      brandName: "Generic",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGrq4pa6mMvzApQyIPBH3NO-sCUJXUv-L_sA&s",
      ],
      price: { selling: 180, discount: 2 },
      status: { isFlashSale: true },
    },
    {
      _id: "s4",
      name: "MQ-2 Gas & Smoke Sensor",
      brandName: "Generic",
      images: [
        "https://fluxworkshop.com/cdn/shop/products/4774e734-fd47-4a0f-bb69-d3395fff8fbd_2048x.jpg?v=1598564353",
      ],
      price: { selling: 220, discount: 0 },
      status: { isNewArrival: false },
    },
    {
      _id: "s5",
      name: "Soil Moisture Sensor Module",
      brandName: "Generic",
      images: [
        "https://cdn11.bigcommerce.com/s-2fbyfnm8ev/images/stencil/500x659/products/1046/3726/ODSeven_3_e901f9d2-9806-450b-81ff-8b7dc04e84fc_500x__00792.1598895358.jpg?c=2",
      ],
      price: { selling: 85, discount: 0 },
      status: { isNewArrival: true },
    },
    {
      _id: "s6",
      name: "Raindrop Sensor Module",
      brandName: "Generic",
      images: [
        "https://nabatechshop.com/wp-content/uploads/2021/11/Rain-Sensor-Module.jpg",
      ],
      price: { selling: 110, discount: 0 },
      status: { isFeatured: false },
    },
    {
      _id: "s7",
      name: "LDR 5mm Photoresistor Kit",
      brandName: "Generic",
      images: [
        "https://www.etstore.in/cdn/shop/files/GI1-1_b6b0640b-477e-42a5-8e6e-09817f871be8.jpg?v=1734335206",
      ],
      price: { selling: 60, discount: 0 },
      status: { isNewArrival: false },
    },
    {
      _id: "s8",
      name: "Infrared IR Obstacle Avoidance",
      brandName: "Generic",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRczj1UXHW6EK5_UF5-xNahv2vmRx9-gNwB-A&s",
      ],
      price: { selling: 95, discount: 5 },
      status: { isFlashSale: true },
    },
    {
      _id: "s6",
      name: "Raindrop Sensor Module",
      brandName: "Generic",
      images: [
        "https://nabatechshop.com/wp-content/uploads/2021/11/Rain-Sensor-Module.jpg",
      ],
      price: { selling: 110, discount: 0 },
      status: { isFeatured: false },
    },
    {
      _id: "s1",
      name: "DHT11 Humidity & Temperature",
      brandName: "Generic",
      images: [
        "https://m.media-amazon.com/images/I/61oK9y53c9L._AC_UF1000,1000_QL80_.jpg",
      ],
      price: { selling: 120, discount: 0 },
      status: { isNewArrival: true },
    },
    {
      _id: "s2",
      name: "HC-SR04 Ultrasonic Distance",
      brandName: "Generic",
      images: [
        "https://thepihut.com/cdn/shop/products/ultrasonic-distance-sensor-hc-sr04-the-pi-hut-100284-1118255996_grande.jpg?v=1646101268",
      ],
      price: { selling: 150, discount: 5 },
      status: { isFeatured: true },
    },
    {
      _id: "s3",
      name: "PIR Motion Sensor HC-SR501",
      brandName: "Generic",
      images: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGrq4pa6mMvzApQyIPBH3NO-sCUJXUv-L_sA&s",
      ],
      price: { selling: 180, discount: 2 },
      status: { isFlashSale: true },
    },
  ];

  // Category C003: Power/Actuators
  const powerActuators = [
    {
      _id: "p1",
      name: "5V Relay Module 1-Channel",
      brandName: "Songle",
      images: [
        "https://m.media-amazon.com/images/I/61qS09v84JL._AC_SL1000_.jpg",
      ],
      price: { selling: 90, discount: 10 },
      status: { isFlashSale: true },
    },
    {
      _id: "p2",
      name: "SG90 Micro Servo Motor",
      brandName: "TowerPro",
      images: [
        "https://m.media-amazon.com/images/I/51A3I1-9qTL._AC_SL1000_.jpg",
      ],
      price: { selling: 220, discount: 0 },
      status: { isFeatured: true },
    },
    {
      _id: "p3",
      name: "TP4056 Lipo Battery Charger",
      brandName: "Generic",
      images: [
        "https://m.media-amazon.com/images/I/61X-pX0-nNL._AC_SL1000_.jpg",
      ],
      price: { selling: 55, discount: 0 },
      status: { isNewArrival: true },
    },
    {
      _id: "p4",
      name: "Solar Panel 6V 1W",
      brandName: "Victus",
      images: [
        "https://m.media-amazon.com/images/I/61j6X2fNfNL._AC_SL1000_.jpg",
      ],
      price: { selling: 350, discount: 8 },
      status: { isFeatured: true },
    },
  ];

  return (
    <div className="max-w-[1400px] md:px-4 px-2 mx-auto min-h-screen pb-12 md:mt-[95px] mt-12.5 font-sans">
      {/* --- HERO BANNER (Original UI preserved) --- */}
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
                <span className="text-blue-400 font-bold uppercase tracking-widest text-xs mb-2">
                  Next Gen Performance
                </span>
                <h2 className="text-white text-4xl md:text-6xl font-black mb-4">
                  RTX 40-SERIES
                  <br />
                  LAPTOPS
                </h2>
                <button className="bg-blue-600 w-fit text-white px-8 py-3 rounded-md font-bold hover:bg-blue-700 transition-all">
                  Explore Now
                </button>
              </div>
              <img
                src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2000"
                className="w-full h-full object-cover opacity-60"
                alt="Tech Banner"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="bg-indigo-900 h-[300px] md:h-[400px] flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2000"
                className="w-full h-full object-cover"
                alt="Banner 2"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>{" "}
      {/* --- SECTIONS --- */}
      <div className="mt-6">
        <div className="flex  items-center justify-between bg-white shadow-xs border border-gray-100 md:p-4 px-4 py-2 mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 -ml-4 md:ml-0">
              <FiCpu className="text-2xl md:-ml-3 text-blue-600 animate-pulse" />
            </div>
            <h3 className="text-md md:text-xl -ml-3 md:-ml-1 font-bold text-gray-900">
              Microcontrollers and Boards
            </h3>
          </div>

          {/* View All Button */}
          <Link
            to="/new-arrival"
            className="flex items-center gap-1 text-[9px] md:text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-white border border-slate-900 hover:bg-slate-900 px-3 py-1.5 md:px-5 md:py-2 rounded-full transition-all duration-300"
          >
            View All
          </Link>
        </div>
        <div className="pb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 md:gap-2.5 gap-2">
          {microcontrollers.map((product) => (
            <ProductCard data={product} />
          ))}
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between bg-white shadow-xs border border-gray-100 md:p-4 px-4 py-2 mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 -ml-4 md:ml-0">
              <FiActivity className="text-2xl md:-ml-3 text-emerald-600 animate-pulse" />
            </div>
            <h3 className="text-md md:text-xl -ml-3 md:-ml-1 font-bold text-gray-900">
              Sensors & Inputs
            </h3>
          </div>

          {/* View All Button */}
          <Link
            to="/new-arrival"
            className="flex items-center gap-1 text-[9px] md:text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-white border border-slate-900 hover:bg-slate-900 px-3 py-1.5 md:px-5 md:py-2 rounded-full transition-all duration-300"
          >
            View All
          </Link>
        </div>
        <div className="pb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 md:gap-2.5 gap-2">
          {sensors.map((product) => (
            <ProductCard data={product} />
          ))}
        </div>
      </div>
      <div className="mt-6">
        <div className="flex items-center justify-between bg-white shadow-xs border border-gray-100 md:p-4 px-4 py-2 mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 -ml-4 md:ml-0">
              <FiZap className="text-2xl md:-ml-3 text-orange-500 animate-pulse" />
            </div>
            <h3 className="text-md md:text-xl -ml-3 md:-ml-1 font-bold text-gray-900">
              Power & Outputs
            </h3>
          </div>

          {/* View All Button */}
          <Link
            to="/new-arrival"
            className="flex items-center gap-1 text-[9px] md:text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-white border border-slate-900 hover:bg-slate-900 px-3 py-1.5 md:px-5 md:py-2 rounded-full transition-all duration-300"
          >
            View All
          </Link>
        </div>
        <div className="pb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 md:gap-2.5 gap-2">
          {powerActuators.map((product) => (
            <ProductCard data={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Electronics;
