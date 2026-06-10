import React, { useContext } from "react";
import { FiBox } from "react-icons/fi";
import { DataContext } from "../Context Api/UserContext";
import { Link } from "react-router-dom";

const TopCategoryCards = () => {
  const { categoryData } = useContext(DataContext);

  return (
    <div className="max-w-[1400px] font-sans mx-auto mb-7 mt-1">
      {/* Header */}
      <div className="mx-2 md:mx-3.5 mb-4">
        <div className="relative overflow-hidden rounded border border-[#1976d2]/15 bg-gradient-to-r from-white via-blue-50 to-white">
          {/* Glow background effect */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#1976d2]/20 blur-3xl rounded-full"></div>
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#1976d2]/10 blur-3xl rounded-full"></div>

          <div className="relative px-5 py-3 flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-3">
              {/* Icon badge */}
              <div className="w-10 h-10 rounded-lg bg-[#1976d2] flex items-center justify-center shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7h18M3 12h18M3 17h18"
                  />
                </svg>
              </div>

              {/* Title */}
              <div>
                <h2 className="text-lg md:text-xl font-extrabold text-[#1976d2] tracking-tight">
                  Top Categories
                </h2>

                <div className="h-0.5 w-16 bg-gradient-to-r from-[#1976d2] to-transparent rounded-full mt-1"></div>
              </div>
            </div>

            {/* Right badge */}
            <div className="px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
              <span className="text-[#1976d2] text-xs md:text-sm font-semibold">
                {categoryData?.length || 0} Categories
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-5 lg:grid-cols-6 xl:grid-cols-12 border-l border-t border-blue-100 md:mx-3.5 mx-2 rounded overflow-hidden">
        {categoryData && categoryData.length > 0 ? (
          categoryData
            .filter((cat) => cat.topCategory === true)
            .slice(0, 12)
            .map((cat, index) => (
              <Link
                key={cat._id || index}
                to={`/${cat.catName.toLowerCase()}`}
                className="group w-full"
              >
                <div
                  className="
                    bg-white
                    flex flex-col items-center justify-center
                    aspect-square text-center
                    border-r border-b border-blue-100
                    transition-all duration-300
                    cursor-pointer p-2
                    hover:bg-gradient-to-b
                    hover:from-blue-50
                    hover:to-white
                    hover:-translate-y-1
                    hover:shadow-md
                  "
                >
                  {/* ICON */}
                  <div className="h-9 w-10 lg:h-12 lg:w-12 mb-2 flex items-center justify-center rounded-xl bg-blue-50 group-hover:bg-[#1976d2]/10 transition-all duration-300">
                    {cat.catIcon ? (
                      <img
                        src={cat.catIcon}
                        alt={cat.catName}
                        className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <FiBox className="text-2xl lg:text-3xl text-[#1976d2]" />
                    )}
                  </div>

                  {/* TEXT */}
                  <span className="text-[10px] md:text-[11px] lg:text-sm font-medium text-gray-700 group-hover:text-[#1976d2] transition-colors leading-tight px-1 line-clamp-2">
                    {cat.catName}
                  </span>
                </div>
              </Link>
            ))
        ) : (
          <div className="p-10 col-span-full text-center text-gray-400 font-medium">
            No Categories Found
          </div>
        )}
      </div>
    </div>
  );
};

export default TopCategoryCards;
