import React, { useContext, useEffect, useState } from "react";
import { DataContext, UserContext } from "../Context Api/UserContext";
import { SearchBar } from "../SearchBar";

const BannerSection = () => {
  // const { categoryData, productData } = useContext(DataContext);
  const images = ["ads-1.png", "ads-2.png", "ads-4.webp"];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500); // 2 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="max-w-[1400px] mx-auto mt-[35px] md:mt-[70px] lg:mt-[86px] px-2 lg:px-4 pt-6 grid grid-cols-1 md:grid-cols-3 md:gap-2 gap-1.5">
        {/* Main Banner */}
        {/* //search box */}
        <div className="md:hidden">
          <SearchBar />
        </div>

        <div className="md:col-span-2 relative group">
          {/* The Image */}
          <img
            src={images[index]}
            alt="Banner"
            className="w-full md:h-[263px] lg:h-[349px] xl:h-[480px] h-[210px] rounded transition-all duration-500 object-fill"
          />

          {/* Indicator Dots Container */}
          <div className="absolute bottom-2 md:bottom-4 left-1/2 -translate-x-1/2 flex md:gap-5 gap-2 ">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)} // Assuming your state function is setIndex
                className={`md:h-2.5 h-2 transition-all duration-300 rounded-full ${
                  index === i
                    ? "md:w-10 w-6 bg-white rounded-sm" // Active dot: wider and white
                    : "md:w-2.5 w-2 bg-white/70 hover:bg-white/90" // Inactive: small and semi-transparent
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Sideboxes */}
        <div className="flex lg:flex-col gap- rounded">
          <div className="flex w-full md:gap-2 gap-1.5 lg:block ">
            {" "}
            {/* ← add gap-2 here */}
            <div className="w-1/2 lg:w-full">
              <img
                src="right-side-1.png"
                alt="Career Banner"
                className=" lg:w-full h-auto rounded"
              />
            </div>
            <div className="w-1/2 lg:w-full">
              <img
                src="right-side-2.png"
                alt="Career Banner"
                className=" lg:w-full h-auto rounded lg:mt-2"
              />
            </div>
          </div>
        </div>

        {/* Info Cards Section */}
        <div className="hidden mt-1 col-span-1 md:col-span-3 flex-col md:flex-row gap-2.5 justify-between text-gray-700">
          {/* Card 1 */}
          <div className="flex-1 bg-white px-6 py-4   hover:shadow-md transition text-center">
            <h4 className="text-[20px] font-semibold text-[#fe741d]">
              1K+ Sold
            </h4>
            <p className="text-md text-gray-500 mt-1">
              Trusted by customers nationwide
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex-1 bg-white px-6 py-4   hover:shadow-md transition text-center">
            <h4 className="text-[20px] font-semibold text-[#fe741d]">
              Fast Delivery
            </h4>
            <p className="text-md text-gray-500 mt-1">Anywhere in Bangladesh</p>
          </div>

          {/* Card 3 */}
          <div className="flex-1 bg-white px-6 py-4  hover:shadow-md transition text-center">
            <h4 className="text-[20px] font-semibold text-[#fe741d]">
              24/7 Support
            </h4>
            <p className="text-md text-gray-500 mt-1">Live chat & hotline</p>
          </div>
        </div>

        {/* Info Cards Section (Headings Only) */}
        <div className="flex flex-col md:gap-2 gap-1.5 text-gray-700 md:hidden">
          {/* Row 1: Card 1 & Card 2 */}
          <div className="flex flex-row md:flex-row md:gap-2.5 gap-2">
            <div className="flex-1 bg-white px-6 py-3 h-12 rounded shadow hover:shadow-md transition text-center">
              <h4 className="text-[17px] font-semibold text-[#fe741d]">
                1K+ Sold
              </h4>
            </div>

            <div className="flex-1 bg-white px-6 py-3 h-12 rounded shadow hover:shadow-md transition text-center">
              <h4 className="text-[17px] font-semibold text-[#fe741d]">
                Fast Delivery
              </h4>
            </div>
          </div>

          {/* Row 2: Card 3 */}
          <div className="flex justify-center">
            <div className="bg-white px-6 py-3 h-12 rounded shadow hover:shadow-md transition text-center w-full md:w-1/2">
              <h4 className="text-[17px] font-semibold text-[#fe741d]">
                24/7 Support
              </h4>
            </div>
          </div>
        </div>
      </div>

      <div class="hidden max-w-[1370px] bg-[#E8EDF2] border mt-5 rounded mx-auto  py-6">
        <div class=" flex flex-col px-4 md:flex-row items-stretch justify-between gap-4 md:gap-6">
          <div class="flex-1 flex items-center justify-center md:justify-start gap-3 bg-white/0">
            <svg
              class="w-8 h-8 text-purple-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              ></path>
            </svg>
            <span class="text-gray-700 font-medium text-sm md:text-base">
              36 Months EMI
            </span>
          </div>

          <div class="flex-1 flex items-center justify-center md:justify-start gap-3">
            <svg
              class="w-8 h-8 text-amber-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              ></path>
            </svg>
            <span class="text-gray-700 font-medium text-sm md:text-base">
              Fastest Home Delivery
            </span>
          </div>

          <div class="flex-1 flex items-center justify-center md:justify-start gap-3">
            <svg
              class="w-8 h-8 text-green-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
              ></path>
            </svg>
            <span class="text-gray-700 font-medium text-sm md:text-base">
              Exchange Facility
            </span>
          </div>

          <div class="flex-1 flex items-center justify-center md:justify-start gap-3">
            <svg
              class="w-8 h-8 text-rose-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 14.25l6-6m4.5-3.493V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185zM9.75 9h.008v.008H9.75V9zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 4.5h.008v.008h-.008v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              ></path>
            </svg>
            <span class="text-gray-700 font-medium text-sm md:text-base">
              Best Price Deals
            </span>
          </div>

          <div class="flex-1 flex items-center justify-center md:justify-start gap-3">
            <svg
              class="w-8 h-8 text-orange-500 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
              ></path>
            </svg>
            <span class="text-gray-700 font-medium text-sm md:text-base">
              After-Sales Service
            </span>
          </div>
        </div>
      </div>

      <div className="hidden md:block max-w-[1370px] mx-auto mt-5 relative overflow-hidden rounded border border-blue-200/70 bg-[#E8EDF2]">
        {/* Brand shine animation overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-100 to-transparent bg-[length:200%_100%] animate-[shine_6s_linear_infinite]"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:flex-row">
          {[
            {
              label: "36 Months EMI",
              icon: "https://cdn-icons-png.flaticon.com/512/3135/3135706.png",
            },
            {
              label: "Fast Delivery",
              icon: "https://cdn-icons-png.flaticon.com/512/1048/1048319.png",
            },
            {
              label: "Exchange Facility",
              icon: "https://cdn-icons-png.flaticon.com/512/1828/1828911.png",
            },
            {
              label: "Best Price Deals",
              icon: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
            },
            {
              label: "After-Sales Service",
              icon: "https://cdn-icons-png.flaticon.com/512/2950/2950651.png",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="relative flex-1 flex items-center gap-3 px-5 py-4 group"
            >
              {/* ICON */}
              <div className="w-9 h-9 bg-white rounded-md border border-gray-200 flex items-center justify-center overflow-hidden group-hover:border-[#1976d2]/40 transition">
                <img
                  src={item.icon}
                  alt={item.label}
                  className="w-6 h-6 object-contain"
                />
              </div>

              {/* TEXT */}
              <span className="text-gray-700 font-medium text-sm md:text-base group-hover:text-[#1976d2] transition">
                {item.label}
              </span>

              {/* DIAGONAL DIVIDER */}
              {i !== 4 && (
                <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-6 bg-[#1976d2] rotate-12"></div>
              )}
            </div>
          ))}
        </div>

        {/* ANIMATIONS */}
        <style>
          {`
      @keyframes shine {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }

      .animate-[shine_6s_linear_infinite] {
        animation: shine 6s linear infinite;
        background-size: 200% 100%;
      }
    `}
        </style>
      </div>
    </>
  );
};

export default BannerSection;
