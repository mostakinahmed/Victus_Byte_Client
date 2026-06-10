import React, { useState } from "react";
import { FiFileText } from "react-icons/fi";

export const Description = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const MAX_CHARS = 250;

  const shouldTruncate =
    data?.description && data.description.length > MAX_CHARS;

  const truncatedText = shouldTruncate
    ? data.description.slice(0, MAX_CHARS) + "..."
    : data?.description;

  return (
    <div className="bg-white rounded overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1976d2] via-[#1e88e5] to-[#1565c0] px-6 py-2 shadow-md">
        <div className="absolute inset-0 bg-white/5"></div>

        <div className="relative flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <FiFileText className="text-white text-lg" />
          </div>

          <h1 className="lg:text-xl text-lg font-bold text-white">
            Product Description
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex flex-col md:flex-row items-start gap-8">
          {/* Description */}
          <div className="flex-1 w-full">
            {/* Desktop View */}
            <p className="hidden md:block text-slate-700 text-[15px] leading-8">
              {data?.description}
            </p>

            {/* Mobile View */}
            <div className="block md:hidden">
              <p className="text-slate-700 text-sm leading-7 inline">
                {isExpanded ? data?.description : truncatedText}
              </p>

              {shouldTruncate && (
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-[#1976d2] font-semibold ml-1 hover:text-[#1565c0] transition-colors duration-300"
                >
                  {isExpanded ? "See Less" : "See More"}
                </button>
              )}
            </div>
          </div>

          {/* Product Image */}
          <div className="w-full md:w-1/3 flex justify-center">
            <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-4 border border-slate-200 hover:border-[#1976d2]/40 hover:shadow-lg transition-all duration-300">
              <img
                src={data?.images?.[0]}
                alt={data?.name}
                className="w-40 sm:w-52 md:w-72 h-auto object-contain rounded-md hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Brand Accent */}
      <div className="h-1.5 bg-gradient-to-r from-[#1976d2] via-[#64b5f6] to-[#1976d2]"></div>
    </div>
  );
};

export default Description;