import React from "react";
import { FaTruck, FaBriefcase, FaDollarSign, FaPhoneAlt } from "react-icons/fa";

const FooterLinks = () => {
  return (
    <div className="max-w-[1370px] font-sans hidden md:flex mx-auto bg-white border border-slate-200 px-4 flex-wrap justify-between p-2 m-4 rounded">
      
      {/* Cancellation & Returns */}
      <div className="w-full sm:w-1/4 flex items-center justify-center p-4 gap-5 group hover:bg-blue-50/40 transition">
        <FaTruck
          size={30}
          className="text-[#1976d2] group-hover:scale-110 transition-transform duration-300"
        />
        <div>
          <span className="block font-bold text-gray-700 group-hover:text-[#1976d2] transition">
            Cancellation & Returns
          </span>
          <p className="text-sm text-gray-500 mt-1">
            If products not matched
          </p>
        </div>
      </div>

      {/* Privacy Policy */}
      <div className="w-full sm:w-1/4 flex items-center justify-center p-4 gap-4 group hover:bg-blue-50/40 transition">
        <FaBriefcase
          size={30}
          className="text-[#1976d2] group-hover:scale-110 transition-transform duration-300"
        />
        <div>
          <span className="block font-bold text-gray-700 group-hover:text-[#1976d2] transition">
            Privacy Policy
          </span>
          <p className="text-sm text-gray-500 mt-1">
            Check before dealing
          </p>
        </div>
      </div>

      {/* EMI Policy */}
      <div className="w-full sm:w-1/4 flex items-center justify-center p-4 gap-4 group hover:bg-blue-50/40 transition">
        <FaDollarSign
          size={30}
          className="text-[#1976d2] group-hover:scale-110 transition-transform duration-300"
        />
        <div>
          <span className="block font-bold text-gray-700 group-hover:text-[#1976d2] transition">
            EMI Policy
          </span>
          <p className="text-sm text-gray-500 mt-1">
            We provide 0% EMI facilities*
          </p>
        </div>
      </div>

      {/* Customer Support */}
      <div className="w-full sm:w-1/4 flex items-center justify-center p-4 gap-5 group hover:bg-blue-50/40 transition">
        <FaPhoneAlt
          size={30}
          className="text-[#1976d2] group-hover:scale-110 transition-transform duration-300"
        />
        <div>
          <span className="block font-bold text-gray-700 group-hover:text-[#1976d2] transition">
            Customer Support
          </span>
          <p className="text-sm text-gray-500 mt-1">
            Call us at 0961-342936
          </p>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;