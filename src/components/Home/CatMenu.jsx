import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../Context Api/UserContext";
import DropDownCategory from "./DropDownCategory";

const CategoryMenu = () => {
  const { categoryData, productData } = useContext(DataContext);
  const [catData, setCatData] = useState([]);

  useEffect(() => {
    const catChanged = () => {
      if (!categoryData || !productData) return;

      const productCategories = productData.map((p) => p.category);

      const data = categoryData.filter((cat) =>
        productCategories.includes(cat.catID)
      );

      setCatData(data);
    };

    catChanged();
  }, [categoryData, productData]);

  return (
    <div className="bg-white shadow-md  w-full hidden md:flex">
      <div className=" xl:max-w-[1370px] w-full mx-auto flex justify-between lg:pl-3 xl:pl-0 py-2">
        <div className="flex flex-nowrap w-full lg:flex-nowrap  overflow-hidden overflow-x-auto sm:flex-wrap  lg:gap-5 lg:ml-2 xl:ml-3 text-sm font-medium text-gray-700">
          {catData.map((cat, index) => (
            <Link
              key={index}
              to={`/${cat.catName.toLowerCase()}`}
              className="relative group text-gray-700 hover:text-blue-600 font-semibold lg:text-[15px] whitespace-nowrap pr-3"
            >
              {cat.catName}
              {/* Hover underline */}
              <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        <div>
          <DropDownCategory />
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;
