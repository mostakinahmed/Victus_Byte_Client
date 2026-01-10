import React from "react";

export const FeatureText = ({ data }) => {
  return (
    <div className="max-w-[1400px] mx-auto lg:px-4 px-2 mt-6 mb-2">
      <h2 className="text-[16px] sm:text-xl font-bold text-gray-800">{data}</h2>
      {/* <div className="mt-1 w-full h-1  bg-[#ff751f] rounded-full"></div> */}
    </div>
  );
};
