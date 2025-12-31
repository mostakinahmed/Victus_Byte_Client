import React, { useState } from "react";
import { FiDatabase, FiCpu, FiZap, FiChevronDown } from "react-icons/fi";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);

  const menuData = [
    {
      id: "storage",
      title: "Storage",
      icon: <FiDatabase />,
      subCats: [
        "NVMe SSD",
        "SATA SSD",
        "Hard Disk (HDD)",
        "Memory Card",
        "USB Flash Drive",
        "RAM (Desktop/Laptop)",
      ],
    },
    {
      id: "robotics",
      title: "Robotics",
      icon: <FiCpu />,
      subCats: [
        "Arduino & Micro",
        "ESP32 & Wireless",
        "Sensors & Modules",
        "Motors & Drivers",
        "Robotics Kits",
        "Display Modules",
      ],
    },
    {
      id: "electrical",
      title: "Electrical",
      icon: <FiZap />,
      subCats: [
        "Cables & Wires",
        "Switches & Relays",
        "Power Supplies",
        "Voltage Regulators",
        "Batteries & BMS",
        "Tools & Meters",
      ],
    },
  ];

  return (
    <nav className="bg-white  sticky top-0 z-[100]  flex items-center">
      <div className="max-w-7xl mx-auto w-full flex items-center gap-4">
        {/* --- Single Column Hover Menus --- */}
        <div className="flex items-center h-full">
          {menuData.map((menu) => (
            <div
              key={menu.id}
              className="relative  flex items-center"
              onMouseEnter={() => setActiveMenu(menu.id)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              {/* Main Nav Link */}
              <button
                className={`flex items-center gap-2 px-5 text-xs font-semibold text-[15px] tracking-wide transition-colors ${
                  activeMenu === menu.id ? "text-blue-600" : "text-gray-700"
                }`}
              >
                <span className="text-lg opacity-80">{menu.icon}</span>
                {menu.title}
                <FiChevronDown
                  className={`transition-transform duration-300 ${
                    activeMenu === menu.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* --- The Single Column Dropdown --- */}
              <div
                className={`absolute top-full left-0 w-48 bg-white shadow-2xl py-3 rounded-b-xl border border-slate-100 transition-all duration-300 origin-top 
    {/* ✅ FIX: Lower z-index than the profile dropdown */}
    z-30 
    ${
      activeMenu === menu.id
        ? "opacity-100 scale-y-100 translate-y-0"
        : "opacity-0 scale-y-0 -translate-y-2 pointer-events-none"
    }`}
              >
                <ul className="flex flex-col">
                  {menu.subCats.map((sub) => (
                    <li key={sub}>
                      <a
                        href={`/category/${sub
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`}
                        className="flex items-center px-4 py-2.5 text-[14px] font-bold text-slate-700 hover:text-blue-600 hover:bg-blue-50/50 transition-all border-l-4 border-transparent hover:border-blue-600"
                      >
                        {sub}
                      </a>
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

export default Navbar;
