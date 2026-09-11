import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  X,
  Plus,
  Minus,
  MapPin,
  Mail,
  Clock,
  Phone,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
} from "react-icons/fa";

export const ModernSidebar = ({ isOpen, onClose, catData }) => {
  const navigate = useNavigate();
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (section) => {
    setOpenDropdown(openDropdown === section ? null : section);
  };

  const handleNavigate = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-[200] flex justify-start transition-[visibility,opacity] duration-500 ease-in-out ${
        isOpen
          ? "visible opacity-100"
          : "invisible opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-500 ease-in-out ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`relative z-10 w-full max-w-[380px] bg-white h-full shadow-2xl flex flex-col justify-between overflow-y-auto font-sans transform-gpu transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center h-[55px] shrink-0 justify-between px-5 border-b border-white/10 sticky top-0 bg-black z-10">
          <img
            src="/logo/web NAV tp white1.png"
            alt="Victus-Byte Logo"
            className="w-36 h-auto object-contain"
          />

          <button
            onClick={onClose}
            className="w-10 h-10 text-white hover:text-[#FF751F] flex items-center justify-center transition-all duration-300 hover:rotate-90 active:scale-90 cursor-pointer"
          >
            <X size={26} />
          </button>
        </div>

        {/* Main Content */}

        <div className="p-6 flex-1 space-y-1">
          {/* Home */}
          <div
            onClick={() => handleNavigate("/")}
            className="flex items-center justify-between py-3 border-b border-slate-100 font-bold text-slate-800 text-sm cursor-pointer hover:text-[#FF751F] transition-colors duration-200"
          >
            <span>Home</span>
          </div>

          {/* All Categories - ORIGINAL */}
          <div className="border-b border-slate-100">
            <div
              onClick={() => toggleDropdown("shop")}
              className="flex items-center justify-between py-3 font-bold text-slate-800 text-sm cursor-pointer hover:text-[#FF751F] transition-colors duration-200"
            >
              <span>All Categories</span>

              <div
                className={`w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 transition-transform duration-300 ${
                  openDropdown === "shop" ? "rotate-180" : "rotate-0"
                }`}
              >
                {openDropdown === "shop" ? (
                  <Minus size={14} />
                ) : (
                  <Plus size={14} />
                )}
              </div>
            </div>

            {/* Category Dropdown */}
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                openDropdown === "shop"
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-3 pl-4 flex flex-col space-y-2 pt-1">
                  {catData?.map((cat, idx) => (
                    <span
                      key={idx}
                      onClick={() => {
                        navigate(`/${cat.catName}`);
                        onClose();
                      }}
                      className="text-xs font-semibold text-slate-500 hover:text-[#FF751F] cursor-pointer py-1.5 flex items-center gap-2 border-b border-slate-50 last:border-none transition-all duration-200 hover:translate-x-1"
                    >
                      <ChevronRight size={12} />
                      {cat.catName}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* QUICK CATEGORY OPTIONS - SEPARATE */}

          <div className="py-4 border-b border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-3">
              Explore
            </p>

            <div className="grid grid-cols-3 gap-2">
              {/* Kids Zone */}
              <div
                onClick={() => handleNavigate("/kids-zone")}
                className="group cursor-pointer rounded-xl border border-slate-100 bg-slate-50 hover:bg-orange-50 hover:border-[#FF751F]/30 p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-xl mb-1.5 transition-transform duration-300 group-hover:scale-110">
                  🧸
                </div>
                <span className="text-[10px] font-bold text-slate-600 group-hover:text-[#FF751F] transition-colors">
                  Kids Zone
                </span>
              </div>

              {/* Electronics */}
              <div
                onClick={() => handleNavigate("/electronics")}
                className="group cursor-pointer rounded-xl border border-slate-100 bg-slate-50 hover:bg-orange-50 hover:border-[#FF751F]/30 p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-xl mb-1.5 transition-transform duration-300 group-hover:scale-110">
                  ⚡
                </div>
                <span className="text-[10px] font-bold text-slate-600 group-hover:text-[#FF751F] transition-colors">
                  Electronics
                </span>
              </div>

              {/* Daily Accessories */}
              <div
                onClick={() => handleNavigate("/daily-accessories")}
                className="group cursor-pointer rounded-xl border border-slate-100 bg-slate-50 hover:bg-orange-50 hover:border-[#FF751F]/30 p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <div className="text-xl mb-1.5 transition-transform duration-300 group-hover:scale-110">
                  👜
                </div>
                <span className="text-[10px] font-bold text-slate-600 group-hover:text-[#FF751F] transition-colors">
                  Daily Accessories
                </span>
              </div>
            </div>
          </div>

          {/* Pages - ORIGINAL */}
          <div className="border-b border-slate-100">
            <div
              onClick={() => toggleDropdown("pages")}
              className="flex items-center justify-between py-3 font-bold text-slate-800 text-sm cursor-pointer hover:text-[#FF751F] transition-colors duration-200"
            >
              <span>Pages</span>

              <div
                className={`w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 transition-transform duration-300 ${
                  openDropdown === "pages" ? "rotate-180" : "rotate-0"
                }`}
              >
                {openDropdown === "pages" ? (
                  <Minus size={14} />
                ) : (
                  <Plus size={14} />
                )}
              </div>
            </div>

            {/* Pages Dropdown */}
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                openDropdown === "pages"
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="pb-3 pl-4 flex flex-col space-y-2 pt-1">
                  {[
                    "About Us",
                    "Compare Products",
                    "FAQ",
                    "Terms & Conditions",
                  ].map((page, idx) => (
                    <span
                      key={idx}
                      onClick={() =>
                        handleNavigate(
                          `/${page.toLowerCase().replace(/[\s&]+/g, "-")}`,
                        )
                      }
                      className="text-xs font-semibold text-slate-500 hover:text-[#FF751F] cursor-pointer py-1 flex items-center gap-2 transition-all duration-200 hover:translate-x-1"
                    >
                      <ChevronRight size={12} />
                      {page}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Blog */}
          <div
            onClick={() => handleNavigate("/blog")}
            className="flex items-center justify-between py-3 border-b border-slate-100 font-bold text-slate-800 text-sm cursor-pointer hover:text-[#FF751F] transition-colors duration-200"
          >
            <span>Blog</span>
          </div>

          {/* Contact */}
          <div
            onClick={() => handleNavigate("/contact")}
            className="flex items-center justify-between py-3 border-b border-slate-100 font-bold text-slate-800 text-sm cursor-pointer hover:text-[#FF751F] transition-colors duration-200"
          >
            <span>Contact Us</span>
          </div>

          {/* ===================================== */}
          {/* COMPARE & OFFERS */}
          {/* ===================================== */}

          <div className="pt-4 space-y-2">
            {/* Compare Products */}
            <div
              onClick={() => handleNavigate("/product/compare")}
              className="group flex items-center justify-between px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-orange-50 hover:border-[#FF751F]/30 cursor-pointer transition-all duration-300 hover:translate-x-1"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-sm group-hover:bg-[#FF751F] group-hover:text-white group-hover:border-[#FF751F] transition-all duration-300">
                  ⇄
                </div>

                <div>
                  <span className="block text-xs font-bold text-slate-700 group-hover:text-[#FF751F] transition-colors">
                    Compare Products
                  </span>
                  <span className="block text-[9px] text-slate-400">
                    Compare your favorites
                  </span>
                </div>
              </div>

              <ChevronRight
                size={15}
                className="text-slate-300 group-hover:text-[#FF751F] group-hover:translate-x-1 transition-all duration-300"
              />
            </div>

            {/* Offers */}
            <div
              onClick={() => handleNavigate("/offer")}
              className="group flex items-center justify-between px-4 py-3 rounded-xl border border-[#FF751F]/20 bg-[#FF751F]/5 hover:bg-[#FF751F]/10 hover:border-[#FF751F]/40 cursor-pointer transition-all duration-300 hover:translate-x-1"
            >
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 rounded-lg bg-[#FF751F] text-white flex items-center justify-center text-sm shadow-sm">
                  🔥
                </div>

                <div>
                  <span className="block text-xs font-bold text-slate-700 group-hover:text-[#FF751F] transition-colors">
                    Special Offers
                  </span>
                  <span className="block text-[9px] text-slate-400">
                    Grab today's best deals
                  </span>
                </div>
              </div>

              <ChevronRight
                size={15}
                className="text-[#FF751F] group-hover:translate-x-1 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 space-y-4 pt-4">
            <h4 className="text-sm font-black uppercase text-slate-900 tracking-wider">
              Contact Info
            </h4>

            {/* Address */}
            <div className="flex items-start gap-3 text-xs text-slate-600">
              <MapPin className="text-[#FF751F] shrink-0 mt-0.5" size={16} />
              <span>123 Market Street, Dhaka, Bangladesh</span>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <Mail className="text-[#FF751F] shrink-0" size={16} />
              <span>support@victusbyte.com</span>
            </div>

            {/* Opening Hours */}
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <Clock className="text-[#FF751F] shrink-0" size={16} />
              <span>Sat - Thu, 09:00 AM - 08:00 PM</span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <Phone className="text-[#FF751F] shrink-0" size={16} />
              <span className="font-mono font-bold">+8809611-342936</span>
            </div>
          </div>

          {/* Let's Talk */}
          <div className="mt-6">
            <button
              onClick={() => handleNavigate("/contact")}
              className="w-full bg-[#FF751F] hover:bg-[#e6671a] text-white py-3 rounded-md font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg"
            >
              <span>Let's Talk</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Social Footer */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-center gap-4 bg-slate-50">
          {[
            {
              icon: <FaFacebookF size={14} />,
              link: "#",
            },
            {
              icon: <FaTwitter size={14} />,
              link: "#",
            },
            {
              icon: <FaYoutube size={14} />,
              link: "#",
            },
            {
              icon: <FaLinkedinIn size={14} />,
              link: "#",
            },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="w-9 h-9 rounded-full border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-[#FF751F] hover:text-white hover:border-[#FF751F] transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              {item.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
