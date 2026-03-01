import React, { useContext, useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiGrid, FiChevronDown, FiHome, FiBox } from "react-icons/fi";
import { DataContext } from "../Context Api/UserContext";

const CategoryDropdown = () => {
  const { categoryData, productData } = useContext(DataContext);
  const [isOpen, setIsOpen] = useState(false);
  const [catList, setCatList] = useState([]);

  const hoverTimeout = useRef(null);

  const handleMouseEnter = () => {
    hoverTimeout.current = setTimeout(() => {
      setIsOpen(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout.current);
    setIsOpen(false);
  };

  useEffect(() => {
    if (productData.length && categoryData.length) {
      const formattedData = productData
        .map((element) => {
          const category = categoryData.find(
            (c) => c.catID === element.category,
          );
          // Return an object containing both properties
          return category
            ? { name: category.catName, icon: category.catIcon }
            : null;
        })
        .filter(Boolean);

      const uniqueCategories = Array.from(
        new Map(formattedData.map((item) => [item.name, item])).values(),
      );

      setCatList(uniqueCategories);
    }
  }, [productData, categoryData]);

  return (
    <div className="flex items-center">
      {/* Home */}
      <div className="-ml-3">
        <Link
          to={"/"}
          className="flex items-center gap-2 px-4 py-2 text-slate-900 hover:text-emerald-600 font-bold text-[14px] transition-all"
        >
          <FiHome className="text-lg text-emerald-600" />
          Home
        </Link>
      </div>

      {/* Category Dropdown */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Button */}
        <button className="flex items-center cursor-pointer gap-2 px-4 py-1.5 rounded-r text-slate-800 hover:text-emerald-600 transition-all duration-200 font-medium">
          <FiGrid className="text-sm text-slate-500" />
          <span className="whitespace-nowrap text-sm text-slate-600">
            All Categories
          </span>
          <FiChevronDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Dropdown */}
        <div
          className={`absolute top-full left-0
  w-[320px] md:w-[650px] lg:w-[900px] xl:w-[1050px]
  bg-white border border-gray-200 
  shadow-[0_20px_60px_rgba(0,0,0,0.08)] 
  rounded-b-2xl
  transform-gpu origin-top
  transition-all duration-300 ease-out
  ${
    isOpen
      ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
      : "opacity-0 scale-95 -translate-y-3 pointer-events-none"
  }
  z-[999] overflow-hidden`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-emerald-100 to-white">
            <h3 className="text-sm font-bold text-gray-800 tracking-wide">
              Browse Categories
            </h3>
            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
            >
              View All
            </Link>
          </div>

          {/* Categories */}
          <div className="p-4">
            <div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 max-h-[420px] overflow-y-auto 
              scrollbar scrollbar-thin scrollbar-thumb-emerald-500 scrollbar-track-transparent
              hover:scrollbar-thumb-emerald-600 transition-colors"
            >
              {categoryData && categoryData.length > 0 ? (
                catList.map((cat, index) => {
                  // Generate a clean URL: "Mobile Phone" -> "mobile-phone"
                  const categoryUrl = cat.name
                    .toLowerCase()
                    .trim()
                    .replace(/\s+/g, "-");

                  return (
                    <Link
                      key={cat.name || index}
                      to={`/${categoryUrl}`}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-100 rounded-lg hover:border-emerald-400 hover:bg-emerald-50 transition-all duration-200 group"
                    >
                      <div className="w-9 h-9 flex-shrink-0 bg-slate-50 rounded-md flex items-center justify-center group-hover:bg-white transition-colors">
                        {cat.icon ? (
                          <img
                            src={cat.icon}
                            alt={cat.name}
                            className="w-8 h-8 object-contain group-hover:scale-110 transition-transform"
                          />
                        ) : (
                          <FiBox className="text-slate-400 text-sm group-hover:text-emerald-500" />
                        )}
                      </div>

                      <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-600 truncate">
                        {cat.name}
                      </span>
                    </Link>
                  );
                })
              ) : (
                <div className="col-span-full py-10 text-center text-slate-400">
                  <FiBox className="mx-auto mb-2 opacity-20" size={32} />
                  <p className="text-xs font-bold uppercase tracking-widest">
                    No categories found
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Banner */}
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs opacity-80">Special Deals</p>
              <p className="text-sm font-bold">Shop Latest Tech Gadgets</p>
            </div>

            <Link
              to="/shop"
              onClick={() => setIsOpen(false)}
              className="bg-white text-emerald-600 text-xs font-bold px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Explore
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDropdown;
