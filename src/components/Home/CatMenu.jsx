import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiDatabase,
  FiCpu,
  FiZap,
  FiChevronDown,
  FiHome,
  FiShoppingBag,
  FiLayers,
} from "react-icons/fi";
import DropDownCategory from "./DropDownCategory";

const CategoryMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  // Custom Dropdown Data
  const customMenus = [
    {
      id: "storage",
      title: "Storage",
      icon: <FiDatabase />,
      subCats: ["NVMe SSD", "SATA SSD", "Hard Disk", "RAM", "USB Drive"],
    },
    {
      id: "robotics",
      title: "Robotics",
      icon: <FiCpu />,
      subCats: ["Arduino", "ESP32", "Sensors", "Motors", "Robotics Kits"],
    },
  ];

  return (
    <div className="bg-white font-sans shadow w-full hidden md:flex  h-8.5 top-0 z-[100] border-b border-slate-300">
      <div className="xl:max-w-[1380px] w-full mx-auto flex justify-between items-center py-1">
        {/* --- LEFT SECTION: Home --- */}
        <div className="flex items-center">
          <Link
            to={"/"}
            className="flex items-center gap-2 px-5 py-2 text-slate-900 hover:text-blue-600 font-bold lg:text-[15px] transition-all border-r border-gray-100"
          >
            <FiHome className="text-lg text-blue-600" />
            Home
          </Link>
        </div>

        {/* --- MIDDLE SECTION: Dummy / General Products --- */}
        <div className="flex-grow flex items-center xl:gap-10 lg:gap-3 ml-4">
          <Link
            to="/kids-zone"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold text-[14px]"
          >
            <FiShoppingBag className="opacity-70" />
            <span className="line-clamp-1">Kids Zone</span>
          </Link>
          <Link
            to="/electronics"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold text-[14px]"
          >
            <FiLayers className="opacity-70" />
            Electronics
          </Link>
          <Link
            to="/offers"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold text-[14px]"
          >
            <FiZap className="text-yellow-500" />
            <span className="line-clamp-1">Daily Deals</span>
          </Link>
          <Link
            to="/kids-zone"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold text-[14px]"
          >
            <FiShoppingBag className="opacity-70" />
            <span className="line-clamp-1">Kids Zone</span>
          </Link>
          <Link
            to="/electronics"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold text-[14px]"
          >
            <FiLayers className="opacity-70" />
            Electronics
          </Link>
          <Link
            to="/offers"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-semibold text-[14px]"
          >
            <FiZap className="text-yellow-500" />
            <span className="line-clamp-1">Daily Deals</span>
          </Link>
        </div>

        {/* --- RIGHT SECTION: Robotics & Storage Dropdowns --- */}
        <div className="flex items-center h-full">
          {customMenus.map((menu) => (
            <div
              key={menu.id}
              className="relative flex items-center h-full"
              onMouseEnter={() => setActiveMenu(menu.id)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                className={`flex items-center gap-2 px-3 py-3 text-[14px] font-bold transition-colors ${
                  activeMenu === menu.id
                    ? "text-blue-600 bg-blue-50/50"
                    : "text-gray-700"
                }`}
              >
                <span className="text-lg">{menu.icon}</span>
                {menu.title}
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    activeMenu === menu.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Dropdown Panel */}
              <div
                className={`absolute top-full right-0 w-52 bg-white shadow-xl py-2 rounded-b-md border-t-2 border-blue-600 transition-all duration-200 origin-top z-50 ${
                  activeMenu === menu.id
                    ? "opacity-100 scale-y-100"
                    : "opacity-0 scale-y-0 pointer-events-none"
                }`}
              >
                <ul className="flex flex-col">
                  {menu.subCats.map((sub) => (
                    <li key={sub}>
                      <Link
                        to={`/category/${sub
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="block px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-all"
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;
