import React, { useState } from "react";

export const Description = ({ data }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Set your desired mobile character limit here
  const MAX_CHARS = 250; 
  
  // Check if the description actually needs truncation
  const shouldTruncate = data?.description && data.description.length > MAX_CHARS;
  
  const truncatedText = shouldTruncate 
    ? data.description.slice(0, MAX_CHARS) + "..." 
    : data?.description;

  return (
    <div className="bg-white font-sans border-b border-slate-200 px-6 pt-5 pb-5 rounded">
      <h1 className="lg:text-2xl text-xl sm:text-2xl font-bold text-gray-800 mb-3">
        Product Description
      </h1>

      <div className="border-t border-gray-200 flex flex-col md:flex-row items-start pt-4 lg:pt-5 gap-8">
        {/* Description text */}
        <div className="flex-1 w-full">
          
          {/* --- DESKTOP VIEW (Hidden on Mobile) --- */}
          {/* Always shows the full description */}
          <p className="hidden md:block text-gray-700 text-sm sm:text-base leading-relaxed">
            {data?.description}
          </p>

          {/* --- MOBILE VIEW (Hidden on Desktop) --- */}
          {/* Handles the truncation and See More / See Less button */}
          <div className="block md:hidden">
            <p className="text-gray-700 text-sm leading-relaxed inline">
              {isExpanded ? data?.description : truncatedText}
            </p>
            
            {shouldTruncate && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-[#fe741d] font-bold text-sm ml-1 hover:underline focus:outline-none transition-colors"
              >
                {isExpanded ? "See Less" : "See More"}
              </button>
            )}
          </div>
          
        </div>

        {/* Product image */}
        <div className="w-full h-[11rem] md:h-70 md:w-1/3 flex justify-center">
          <img
            src={data?.images?.[0]}
            alt={data?.name}
            className="w-40 sm:w-52 md:w-72 h-auto object-contain rounded-md hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
};