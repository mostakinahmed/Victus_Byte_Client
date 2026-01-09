import React, { useContext } from "react";
import { FiBox } from "react-icons/fi";
import { DataContext } from "../Context Api/UserContext";
import { FeatureText } from "./FeatureText";
import { Link } from "react-router-dom";

const TopCategoryCards = () => {
  const { categoryData } = useContext(DataContext);

  return (
    <div className="max-w-[1400px] mx-auto mb-7 mt-5">
      {/* <FeatureText data="Top Categories" /> */}

      {/* GRID SETUP:
        - border-t and border-l: Creates the top and left outer frame.
        - grid-cols-2: 2 cards per row on mobile.
        - sm:grid-cols-4: 4 cards per row on tablets.
        - lg:grid-cols-6: 6 cards per row on desktops.
        - xl:grid-cols-8: 8 cards per row on large screens.
      */}
      <div className="grid grid-cols-5 lg:grid-cols-6 xl:grid-cols-12 border-l  md:mx-3.5 mx-2 border-gray-200">
        {categoryData && categoryData.length > 0 ? (
          categoryData
            // .filter((item) => item.topCategory === true)
            // .slice(0, 12) // Example: if you have 12 cards and 6 cols, it makes 2 rows perfectly
            .map((cat, index) => (
              <Link
                key={index}
                to={`/${cat.catName.toLowerCase()}`}
                className="group w-full"
              >
                <div
                  className="bg-white flex flex-col items-center justify-center 
                  aspect-square text-center 
                  border-r border-b border-t border-gray-200
                  transition-colors duration-300 cursor-pointer p-2"
                >
                  {/* Icon Area */}
                  <div className="h-10 w-10 lg:h-12 lg:w-12 mb-2 flex items-center justify-center">
                    {cat.icon ? (
                      <img
                        src={cat.icon}
                        alt={cat.catName}
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <FiBox className="text-2xl lg:text-3xl text-gray-700 group-hover:text-[#fe741d] transition-colors" />
                    )}
                  </div>

                  {/* Text */}
                  <span className="text-[11px] lg:text-sm font-bold text-gray-800 group-hover:text-[#fe741d] transition-colors leading-tight px-1">
                    {cat.catName}
                  </span>
                </div>
              </Link>
            ))
        ) : (
          <div className="p-5 col-span-full text-center">Loading...</div>
        )}
      </div>
    </div>
  );
};

export default TopCategoryCards;
