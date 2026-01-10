import React from "react";
import { FaTruck, FaBriefcase, FaDollarSign, FaPhoneAlt } from "react-icons/fa";

const FooterLinks = () => {
  return (
    <div className="max-w-[1370px] font-sans hidden md:flex mx-auto border-1 bg-white border-gray-300 px-4  flex-wrap justify-between p-2 mb-4">
      {/* Cancellation & Returns */}
      <div className="w-full sm:w-1/4 flex items-center justify-center p-4 gap-5 ">
        <FaTruck size={30} className="text-gray-600 mt-2"  />
        <div>
          <span className="block font-bold mt-2 text-gray-600">Cancellation & Returns</span>
          <p className="text-sm text-gray-600 mt-1">If products not matched</p>
        </div>
      </div>

      {/* Privacy Policy */}
      <div className="w-full sm:w-1/4 flex items-center justify-center p-4 gap-4">
        <FaBriefcase size={30} className="text-gray-600 mt-2" />
        <div>
          <span className="block  font-bold mt-2 text-gray-600">Privacy Policy</span>
          <p className="text-sm text-gray-600 mt-1">Check before dealing</p>
        </div>
      </div>

      {/* EMI Policy */}
      <div className="w-full sm:w-1/4 flex items-center justify-center p-4 gap-4 ">
        <FaDollarSign size={30} className="text-gray-600 mt-2" />
        <div>
          <span className="block  font-bold mt-2 text-gray-600">EMI Policy</span>
          <p className="text-sm text-gray-600 mt-1">We provide 0% EMI facilities*</p>
        </div>
      </div>

      {/* Customer Support */}
      <div className="w-full sm:w-1/4 flex items-center justify-center p-4 gap-5 ">
        <FaPhoneAlt size={30} className="text-gray-600 mt-2" />
        <div>
          <span className="block font-bold mt-2 text-gray-600">Customer Support</span>
          <p className="text-sm text-gray-600 mt-1">Call us at 09613800800</p>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
