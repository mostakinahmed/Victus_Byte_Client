import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCpu,
  FiZap,
  FiChevronDown,
  FiHome,
  FiShoppingBag,
  FiLayers,
} from "react-icons/fi";
import CategoryDropdown from "./CategoryDropdown";

const CategoryMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  // Focus on specific niche menus that need custom links
  const customMenus = [
    {
      id: "robotics",
      title: "Robotics",
      icon: <FiCpu />,
      subCats: ["Arduino", "ESP32", "Sensors", "Motors", "Robotics Kits"],
    },
  ];

  return (
    <nav className="bg-white font-sans shadow-sm w-full pb- hidden md:flex h-8.5 sticky top-0 z-[80] border-b border-slate-200">
      <div className="xl:max-w-[1380px] w-full mx-auto flex justify-between items-center px-2">
        {/* --- LEFT SECTION: Primary Navigation --- */}
        <div className="flex items-center h-full gap-2">
          <CategoryDropdown />
        </div>

        {/* --- MIDDLE SECTION: Trending / Direct Links --- */}
        <div className="flex-grow flex items-center xl:gap-8 lg:gap-4 ml-6">
          <Link
            to="/electronics"
            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-semibold text-[13px]  tracking-wide transition-colors"
          >
            <FiLayers className="opacity-80" />
            IoT & Electronics
          </Link>

          <Link
            to="/kids-zone"
            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-semibold text-[13px]  tracking-wide transition-colors"
          >
            <FiShoppingBag className="opacity-80" />
            Kids Zone
          </Link>

          <Link
            to="/daily-deals"
            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-semibold text-[13px]  tracking-wide transition-colors"
          >
            <FiZap className="text-yellow-500 animate-pulse" />
            Daily Deals
          </Link>
        </div>

        {/* --- RIGHT SECTION: Custom Niche Dropdowns --- */}
        <div className="flex items-center h-full">
          {customMenus.map((menu) => (
            <div
              key={menu.id}
              className="relative flex items-center h-full"
              onMouseEnter={() => setActiveMenu(menu.id)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                className={`flex items-center gap-2 px-4 h-full text-[14px] font-bold transition-all duration-300 ${
                  activeMenu === menu.id
                    ? "text-emerald-600 bg-emerald-50/50"
                    : "text-gray-700 hover:text-emerald-600"
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

              {/* Individual Niche Dropdown Panel */}
              <div
                className={`absolute top-full right-0 w-52 bg-white shadow-2xl py-3 rounded-b-xl border-t-2 border-emerald-500 transition-all duration-300 origin-top z-50 ${
                  activeMenu === menu.id
                    ? "opacity-100 scale-y-100 visible"
                    : "opacity-0 scale-y-95 invisible"
                }`}
              >
                <ul className="flex flex-col">
                  {menu.subCats.map((sub) => (
                    <li key={sub}>
                      <Link
                        to={`/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block px-6 py-2.5 text-[13px] font-medium text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 transition-all border-l-2 border-transparent hover:border-emerald-500"
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
    </nav>
  );
};

export default CategoryMenu;
