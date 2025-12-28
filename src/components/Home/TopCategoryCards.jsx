import React, { useContext } from "react";
import { FiBox } from "react-icons/fi"; // Default icon
import { DataContext } from "../Context Api/UserContext";
import { FeatureText } from "./FeatureText";
import { Link } from "react-router-dom";

const TopCategoryCards = () => {
  const { categoryData } = useContext(DataContext);
  return (
    <div className="max-w-[1400px] mx-auto mb-7">
      <FeatureText data="Top Categories" />
      <div className="flex flex-wrap justify-center lg:justify-start lg:ml-4 gap-1 xl:gap-6 lg:gap-3">
        {categoryData && categoryData.length > 0 ? (
          categoryData.filter((item)=> item.topCategory===true).slice(0,10).map((cat, index) => (
            <Link to={`/product/${cat.catID}`}>
              <div
                key={index}
                className="bg-white shadow-md  flex flex-col items-center justify-center h-21 w-22 lg:w-29 lg:h-28 
                text-center hover:scale-105 hover:text-[#fe741d] transform transition duration-300 cursor-pointer"
              >
                {/* Icon: use cat.icon if available, otherwise default */}
                {cat.icon ? (
                  <img
                    src={cat.icon}
                    alt={cat.name}
                    className="h-12 w-12 mb-2 object-contain"
                  />
                ) : (
                  <FiBox className="text-3xl mb-2 text-gray-700" />
                )}
                {/* Name */}
                <span className=" text-sm lg:text-lg font-medium">
                  {cat.catName}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default TopCategoryCards;
