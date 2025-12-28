import React, { useContext, useEffect, useState } from "react";
import { DataContext, UserContext } from "../Context Api/UserContext";
import { SearchBar } from "../SearchBar";

const BannerSection = () => {
  // const { categoryData, productData } = useContext(DataContext);
  const images = [
    "https://i.ibb.co.com/k2Jh26yY/ads-banner-2.png",
    "https://i.ibb.co.com/WNthCVS1/main-banner-2.png",
    "https://www.startech.com.bd/image/cache/catalog/home/banner/2025/starlink-in-store-activation-offer-web-banner-982x500.webp",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500); // 2 seconds

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-[1400px] mx-auto mt-[35px] md:mt-[70px] lg:mt-[80px] px-2 lg:px-4 pt-6 grid grid-cols-1 md:grid-cols-3 gap-2">
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
              className={`h-2 transition-all duration-300 rounded-full ${
                index === i
                  ? "w-6 bg-white" // Active dot: wider and white
                  : "w-2 bg-white/70 hover:bg-white/90" // Inactive: small and semi-transparent
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Right Sideboxes */}
      <div className="flex flex-col lg:flex-col gap-3  rounded">
        <div className="flex w-full gap-2 lg:block ">
          {" "}
          {/* ← add gap-2 here */}
          <div className="w-1/2 lg:w-full">
            <img
              src="https://i.ibb.co.com/7dngFcks/right-side.png"
              alt="Career Banner"
              className=" lg:w-full h-auto rounded"
            />
          </div>
          <div className="w-1/2 lg:w-full">
            <img
              src="https://i.ibb.co.com/vbM8093/right-side-2.png"
              alt="Career Banner"
              className=" lg:w-full h-auto rounded lg:mt-2"
            />
          </div>
        </div>
      </div>

      {/* Info Cards Section */}
      <div className="hidden md:flex col-span-1 md:col-span-3 flex-col md:flex-row gap-2.5 justify-between text-gray-700">
        {/* Card 1 */}
        <div className="flex-1 bg-white px-6 py-4  shadow hover:shadow-md transition text-center">
          <h4 className="text-[20px] font-semibold text-[#fe741d]">1K+ Sold</h4>
          <p className="text-md text-gray-500 mt-1">
            Trusted by customers nationwide
          </p>
        </div>

        {/* Card 2 */}
        <div className="flex-1 bg-white px-6 py-4  shadow hover:shadow-md transition text-center">
          <h4 className="text-[20px] font-semibold text-[#fe741d]">
            Fast Delivery
          </h4>
          <p className="text-md text-gray-500 mt-1">Anywhere in Bangladesh</p>
        </div>

        {/* Card 3 */}
        <div className="flex-1 bg-white px-6 py-4 shadow hover:shadow-md transition text-center">
          <h4 className="text-[20px] font-semibold text-[#fe741d]">
            24/7 Support
          </h4>
          <p className="text-md text-gray-500 mt-1">Live chat & hotline</p>
        </div>
      </div>

      {/* Info Cards Section (Headings Only) */}
      <div className="flex flex-col gap-2 text-gray-700 md:hidden">
        {/* Row 1: Card 1 & Card 2 */}
        <div className="flex flex-row md:flex-row gap-2.5">
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
  );
};

export default BannerSection;
