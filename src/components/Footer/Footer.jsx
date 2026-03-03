import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiTruck,
  FiShoppingBag,
  FiInfo,
  FiPhoneCall,
  FiHelpCircle,
  FiSend,
  FiRotateCcw,
  FiCreditCard,
  FiList,
  FiFacebook,
  FiInstagram,
  FiTwitter,
} from "react-icons/fi";

const Footer = () => {
  const navigate = useNavigate();

  const footerLinks = {
    quickLinks: [
      { name: "Shop", icon: <FiShoppingBag />, path: "/shop" },
      { name: "Track Order", icon: <FiTruck />, path: "/track-order" },
      { name: "About Us", icon: <FiInfo />, path: "/about-us" },
      { name: "Contact", icon: <FiPhoneCall />, path: "/contact-us" },
      { name: "FAQ", icon: <FiHelpCircle />, path: "/faq" },
    ],
    support: [
      { name: "Shipping", icon: <FiSend />, path: "/shipping-info" },
      { name: "Returns", icon: <FiRotateCcw />, path: "/return-policy" },
      { name: "Order Status", icon: <FiList />, path: "/order-status" },
      {
        name: "Payment Options",
        icon: <FiCreditCard />,
        path: "/payment-info",
      },
    ],
  };

  // Primary Brand Color Variable for easy changes
  const brandColor = "#1976d2";

  return (
    <footer className="relative bg-[#0f172a] text-gray-300 font-sans mt-10">
      {/* Top Gradient Border using Brand Color */}
      <div
        className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#1976d2] to-transparent opacity-40`}
      ></div>

      <div className="max-w-[1400px] mx-auto px-6 md:pt-16 pt-8 md:pb-8 pb-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 md:mb-16 mb-6">
          {/* 1. BRAND SECTION */}
          <div className="space-y-6">
            <Link
              to="/"
              className="inline-block transition-transform hover:scale-105"
            >
              <img
                className="h-14 w-auto bg-slate-800/50 p-2 rounded-xl backdrop-blur-sm border border-slate-700"
                src="/logo full final.png"
                alt="Victus Byte"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm">
              Elevating your digital lifestyle with premium tech essentials.
              Join the <strong className="text-[#1976d2]">Victus Byte</strong>{" "}
              community.
            </p>
            <div className="flex gap-3">
              {[
                {
                  name: "Facebook",
                  icon: <FiFacebook />,
                  link: "https://facebook.com/victusbyte",
                  color: "hover:bg-[#1877F2]",
                },
                {
                  name: "Instagram",
                  icon: <FiInstagram />,
                  link: "https://instagram.com/victusbyte.bd",
                  color:
                    "hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]",
                },
                {
                  name: "Twitter",
                  icon: <FiTwitter />,
                  link: "#",
                  color: "hover:bg-[#1DA1F2]",
                },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-2.5 bg-slate-800 rounded-full text-white transition-all duration-300 ${social.color} hover:scale-110`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* 2. EXPLORE & SERVICE (Two columns) */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-white font-bold text-base mb-6 flex items-center gap-2 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-[#1976d2] rounded-full"></span>{" "}
                Explore
              </h4>
              <ul className="space-y-4 text-sm">
                {footerLinks.quickLinks.map((link) => (
                  <li
                    key={link.name}
                    onClick={() => navigate(link.path)}
                    className="group flex items-center gap-3 cursor-pointer hover:text-[#1976d2] transition-colors"
                  >
                    <span className="text-[#1976d2] group-hover:scale-110 transition-transform">
                      {link.icon}
                    </span>
                    <span className="relative">
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1976d2] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold text-base mb-6 flex items-center gap-2 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 bg-[#1976d2] rounded-full"></span>{" "}
                Service
              </h4>
              <ul className="space-y-4 text-sm">
                {footerLinks.support.map((link) => (
                  <li
                    key={link.name}
                    onClick={() => navigate(link.path)}
                    className="group flex items-center gap-3 cursor-pointer hover:text-[#1976d2] transition-colors"
                  >
                    <span className="text-[#1976d2] group-hover:rotate-12 transition-transform">
                      {link.icon}
                    </span>
                    <span className="relative">
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#1976d2] transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4. NEWSLETTER SECTION */}
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 backdrop-blur-md">
            <h4 className="text-white font-bold text-base mb-4 uppercase tracking-wider">
              Stay Updated
            </h4>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="email@example.com"
                className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 focus:border-[#1976d2] focus:outline-none text-xs transition-colors"
              />
              <button className="w-full bg-[#1976d2] hover:bg-[#1565c0] text-white font-bold py-3 rounded-xl transition-all active:scale-95 shadow-lg text-xs uppercase tracking-widest">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* PAYMENT & COPYRIGHT */}
        <div className="pt-8 border-t border-slate-800 flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center items-center gap-3 lg:gap-4 grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100">
            <img
              src="https://freelogopng.com/images/all_img/1656227518bkash-logo-png.png"
              alt="bKash"
              className="h-6 lg:h-7 rounded bg-white object-contain p-1"
            />
            <img
              src="https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png"
              alt="Nagad"
              className="h-6 lg:h-7 rounded bg-white object-contain"
            />
            <img
              src="https://sajidshop.com/public/frontend/images/payment_method/rocket.png"
              alt="Rocket"
              className="h-6 lg:h-7 rounded bg-white object-contain p-1"
            />
            <img
              src="https://logowik.com/content/uploads/images/visa-payment-card1873.jpg"
              alt="Visa"
              className="h-6 lg:h-7 rounded bg-white object-contain"
            />
            <img
              src="https://p1.hiclipart.com/preview/110/429/95/visa-mastercard-logo-credit-card-payment-card-number-atm-card-automated-teller-machine-mousepad-computer-accessory-circle-png-clipart.jpg"
              alt="Mastercard"
              className="h-6 lg:h-7 rounded bg-white object-contain"
            />
          </div>

          <div className="text-center space-y-2">
            <p className="text-xs text-gray-500">
              © {new Date().getFullYear()}{" "}
              <span className="text-[#1976d2] font-bold">Victus Byte</span>. All
              rights reserved.
            </p>
            <p className="text-[9px] text-gray-600 uppercase tracking-[0.3em] font-medium">
              Designed & Developed by Mostakin Ahmed
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
