import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiCpu,
  FiZap,
  FiChevronDown,
  FiShoppingBag,
  FiLayers,
} from "react-icons/fi";
import CategoryDropdown from "./CategoryDropdown";

const CategoryMenu = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  // Victus Byte Brand Color
  const brandColor = "#1976d2";

  const customMenus = [
    {
      id: "robotics",
      title: "Robotics",
      icon: <FiCpu />,
      subCats: ["Arduino", "ESP32", "Sensors", "Motors", "Robotics Kits"],
    },
  ];

  return (
    <nav className="bg-white font-sans shadow-sm w-full hidden md:flex h-10 sticky top-0 z-[80] border-b border-slate-200">
      <div className="xl:max-w-[1380px] w-full mx-auto flex justify-between items-center px-4">
        {/* --- LEFT SECTION: Primary Navigation --- */}
        <div className="flex items-center h-full">
          <CategoryDropdown />
        </div>

        {/* --- MIDDLE SECTION: Trending / Direct Links --- */}
        <div className="flex-grow flex items-center xl:gap-8 lg:gap-4 ml-8">
          <Link
            to="/electronics"
            className="flex items-center gap-2 text-slate-700 hover:text-[#1976d2] font-bold text-[13px] uppercase tracking-wider transition-all"
          >
            <FiLayers className="text-[#1976d2] opacity-90" />
            IoT & Electronics
          </Link>

          <Link
            to="/kids-zone"
            className="flex items-center gap-2 text-slate-700 hover:text-[#1976d2] font-bold text-[13px] uppercase tracking-wider transition-all"
          >
            <FiShoppingBag className="text-[#1976d2] opacity-90" />
            Kids Zone
          </Link>

          <Link
            to="/daily-deals"
            className="flex items-center gap-2 text-slate-700 hover:text-[#1976d2] font-bold text-[13px] uppercase tracking-wider transition-all"
          >
            <FiZap className="text-orange-500 animate-pulse" />
            Daily Deals
          </Link>
        </div>

        {/* --- RIGHT SECTION: Custom Niche Dropdowns (Enabled and Styled) --- */}
        <div className="flex items-center h-full">
          {customMenus.map((menu) => (
            <div
              key={menu.id}
              className="relative flex items-center h-full"
              onMouseEnter={() => setActiveMenu(menu.id)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <button
                className={`flex items-center gap-2 px-5 h-full text-[13px] font-bold uppercase tracking-wider transition-all duration-300 ${
                  activeMenu === menu.id
                    ? "text-[#1976d2] bg-blue-50/50"
                    : "text-slate-700 hover:text-[#1976d2]"
                }`}
              >
                <span className="text-base text-[#1976d2]">{menu.icon}</span>
                {menu.title}
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    activeMenu === menu.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Individual Niche Dropdown Panel */}
              <div
                className={`absolute top-full right-0 w-56 bg-white shadow-[0_15px_40px_rgba(0,0,0,0.15)] py-4 rounded-b-xl border-t-2 border-[#1976d2] transition-all duration-300 origin-top z-50 ${
                  activeMenu === menu.id
                    ? "opacity-100 scale-y-100 visible"
                    : "opacity-0 scale-y-95 invisible"
                }`}
              >
                <ul className="flex flex-col">
                  <li className="px-6 pb-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">
                      Categories
                    </p>
                  </li>
                  {menu.subCats.map((sub) => (
                    <li key={sub}>
                      <Link
                        to={`/${sub.toLowerCase().replace(/\s+/g, "-")}`}
                        className="block px-6 py-2.5 text-[12px] font-bold uppercase tracking-tight text-slate-600 hover:text-[#1976d2] hover:bg-blue-50 transition-all border-l-4 border-transparent hover:border-[#1976d2]"
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
