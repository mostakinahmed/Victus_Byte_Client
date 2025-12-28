import { useState } from "react";

export default function HorizontalAds() {
 

  return (
    <div className="max-w-[1400px] h-full lg:h-[150px] mx-auto lg:px-3.5 px-2 md:mb-4 md:mt-3 flex justify-between gap-4">
      {/* Left Ad Section */}
      <div className="w-1/2 h-full">
        <img
          src="11.png"
          alt="Left Ad Banner"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right Ad Section */}
      <div className="w-1/2 h-full">
        <img
          src="22.png"
          alt="Right Ad Banner"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
