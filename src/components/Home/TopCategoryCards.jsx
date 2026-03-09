import React, { useContext } from "react";
import { FiBox } from "react-icons/fi";
import { DataContext } from "../Context Api/UserContext";
import { FeatureText } from "./FeatureText";
import { Link } from "react-router-dom";

const TopCategoryCards = () => {
  const { categoryData } = useContext(DataContext);

  return (
    <div className="max-w-[1400px] font-sans mx-auto mb-7 -mt-2">
      <FeatureText data="Top Categories" />

      {/* GRID SETUP:
        - border-t and border-l: Creates the top and left outer frame.
        - grid-cols-2: 2 cards per row on mobile.
        - sm:grid-cols-4: 4 cards per row on tablets.
        - lg:grid-cols-6: 6 cards per row on desktops.
        - xl:grid-cols-8: 8 cards per row on large screens.
      */}
      <div className="grid grid-cols-5 lg:grid-cols-6 xl:grid-cols-12 border-l border-t md:mx-3.5 mx-2 border-gray-200 ">
        {categoryData && categoryData.length > 0 ? (
          categoryData
            .filter((cat) => cat.topCategory === true) // Filter first so .slice gets the right items
            .slice(0, 12)
            .map((cat, index) => (
              <Link
                key={cat._id || index} // Use a unique ID if available for better React performance
                to={`/${cat.catName.toLowerCase()}`}
                className="group w-full"
              >
                <div
                  className="bg-white flex flex-col items-center justify-center 
            aspect-square text-center 
            border-r border-b border-gray-200
            transition-all duration-300 cursor-pointer p-2 hover:bg-orange-50/30"
                >
                  {/* Icon Area */}
                  <div className="h-9 w-10 lg:h-12 lg:w-12 mb-2 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                    {cat.icon ? (
                      <img
                        src={cat.catIcon}
                        alt={cat.catName}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <FiBox className="text-2xl lg:text-3xl text-gray-500 group-hover:text-[#fe741d] transition-colors" />
                    )}
                  </div>

                  {/* Text */}
                  <span className="text-[10px] md:text-[11px] lg:text-sm font-medium text-gray-800 group-hover:text-[#fe741d] transition-colors leading-tight px-1 line-clamp-2">
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
