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
} from "react-icons/fi";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="border-t-2 text-white">
        <footer className="bg-gray-900 text-white py-4">
          <div className="max-w-[1400px] mt-5 mx-auto px-2 sm:px-6 lg:px-4">
            <div className="flex justify-between lg:gap-8 gap-4 flex-col md:flex-row">
              {/* LEFT SECTION */}
              <div className="flex flex-col">
                <Link to={"/"}>
                  <img
                    className="lg:h-16 lg:w-32 h-14 w-30 lg:mb-4  bg-gray-800 p-1 rounded"
                    src="/logo full final.png"
                    alt=""
                  />
                </Link>

                <div className="hidden lg:flex flex-col">
                  <p className="text-gray-200">
                    Your one-stop shop for all your tech needs.
                    <br />
                    Quality products, great prices.
                  </p>
                </div>
              </div>

              {/* QUICK LINKS & SUPPORT */}
              <div className="flex justify-between md:gap-48">
                {/* Quick Links */}
                <div className="text-gray-200">
                  <h4 className="text-white font-semibold lg:mb-4 mb-2">
                    Quick Links
                  </h4>

                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 cursor-pointer hover:text-indigo-500">
                      <FiShoppingBag size={20} />
                      <span>Shop</span>
                    </li>

                    <li
                      onClick={() => navigate("/track-order")}
                      className="flex items-center gap-2 cursor-pointer hover:text-indigo-500"
                    >
                      <FiTruck size={22} />
                      <span>Track Order</span>
                    </li>

                    <li className="flex items-center gap-2 cursor-pointer hover:text-indigo-500">
                      <FiInfo size={20} />
                      <span>About Us</span>
                    </li>

                    <li className="flex items-center gap-2 cursor-pointer hover:text-indigo-500">
                      <FiPhoneCall size={20} />
                      <span>Contact</span>
                    </li>

                    <li className="flex items-center gap-2 cursor-pointer hover:text-indigo-500">
                      <FiHelpCircle size={20} />
                      <span>FAQ</span>
                    </li>
                  </ul>
                </div>

                {/* Support */}
                <div className="text-gray-200">
                  <h4 className="text-white font-semibold mb-4">Support</h4>

                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 cursor-pointer hover:text-indigo-500">
                      <FiSend size={20} />
                      <span>Shipping</span>
                    </li>

                    <li className="flex items-center gap-2 cursor-pointer hover:text-indigo-500">
                      <FiRotateCcw size={20} />
                      <span>Returns</span>
                    </li>

                    <li className="flex items-center gap-2 cursor-pointer hover:text-indigo-500">
                      <FiList size={20} />
                      <span>Order Status</span>
                    </li>

                    <li className="flex items-center gap-2 cursor-pointer hover:text-indigo-500">
                      <FiCreditCard size={20} />
                      <span>Payment Options</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* NEWSLETTER + SOCIAL + PAYMENT METHODS */}
              <div className="text-white lg:w-1/4">
                <h4 className="font-semibold lg:mb-4 mb-2">
                  Subscribe to our Newsletter
                </h4>

                <form className="flex flex-col gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="px-3 py-2 rounded border-2 bg-gray-100 text-gray-900"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
                  >
                    Subscribe
                  </button>
                </form>

                {/* Social Icons */}
                <div className="flex space-x-4 lg:mt-6 mt-4">
                  <a
                    href="https://www.facebook.com/victusbyte"
                    aria-label="Facebook"
                    className="hover:text-indigo-500"
                    target="_blank"
                  >
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5 3.657 9.128 8.438 9.876v-6.987H7.898v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.466h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 17 22 12z" />
                    </svg>
                  </a>

                  <a
                    href="#"
                    aria-label="Twitter"
                    className="hover:text-indigo-500"
                  >
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.59-2.46.7a4.298 4.298 0 001.88-2.37 8.57 8.57 0 01-2.72 1.04 4.29 4.29 0 00-7.3 3.91A12.18 12.18 0 013 5.16a4.28 4.28 0 001.33 5.72 4.25 4.25 0 01-1.94-.53v.05a4.29 4.29 0 003.44 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.98A8.6 8.6 0 012 19.54 12.14 12.14 0 008.29 21c7.54 0 11.67-6.25 11.67-11.67 0-.18 0-.35-.01-.53A8.32 8.32 0 0022.46 6z" />
                    </svg>
                  </a>

                  <a
                    href="#"
                    aria-label="Instagram"
                    className="hover:text-indigo-500"
                  >
                    <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5A4.25 4.25 0 007.75 20.5h8.5a4.25 4.25 0 004.25-4.25v-8.5a4.25 4.25 0 00-4.25-4.25h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zm5.5-2.5a1 1 0 110 2 1 1 0 010-2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* PAYMENT METHODS */}
            <div className="lg:mt-1 mt-4">
              <h4 className="text-white font-semibold lg:mb-3">
                Payment Methods
              </h4>

              {/* Mobile Banking */}
              <div className="flex flex-wrap  items-center lg:gap-4 gap-3 lg:mt-3 mt-1.5">
                <img
                  src="https://freelogopng.com/images/all_img/1656227518bkash-logo-png.png"
                  alt="bKash"
                  className="lg:h-9 h-7 rounded bg-white object-contain p-1"
                />
                <img
                  src="https://download.logo.wine/logo/Nagad/Nagad-Logo.wine.png"
                  alt="Nagad"
                  className="lg:h-9 h-7 rounded bg-white object-contain p-"
                />
                <img
                  src="https://sajidshop.com/public/frontend/images/payment_method/rocket.png"
                  alt="Rocket"
                  className="lg:h-9 h-7 rounded bg-white object-contain p-1"
                />

                <img
                  src="https://play-lh.googleusercontent.com/ihEz3fNdT5fFzUr0ThhdT_6b5MPPTImKwoUDAujHrn37KDEDAqq-xGnxwFIGI9cbvOE"
                  alt="SureCash"
                  className="lg:h-9 h-7 rounded bg-white"
                />
                <img
                  src="https://play-lh.googleusercontent.com/oh-03_05Int0h23OdtIUpbQzu8GEiy-5IalmH-3k97nilPMw8aKT1hSCn_AczeliHXc7lXaiECns0BOPMgPp9w"
                  alt="mCash"
                  className="lg:h-9 h-7 rounded bg-white "
                />

                <img
                  src="https://logowik.com/content/uploads/images/visa-payment-card1873.jpg"
                  alt="Visa"
                  className="lg:h-9 h-7 rounded bg-white object-contain"
                />
                <img
                  src="https://p1.hiclipart.com/preview/110/429/95/visa-mastercard-logo-credit-card-payment-card-number-atm-card-automated-teller-machine-mousepad-computer-accessory-circle-png-clipart.jpg"
                  alt="Mastercard"
                  className="lg:h-9 h-7 rounded"
                />
                <img
                  src="https://img.icons8.com/color/1200/amex.jpg"
                  alt="American Express"
                  className="lg:h-9 h-7 rounded hidden md:block"
                />
                <img
                  src="https://cdn-icons-png.flaticon.com/512/825/825484.png"
                  alt="UnionPay"
                  className="lg:h-9 h-7 rounded hidden md:block"
                />
              </div>
            </div>
            <p className="text-gray-400 text-sm lg:mt-5 mt-4 -mb-3 lg:-mb-1 text-center">
              &copy; {new Date().getFullYear()} Victus Byte. All rights
              reserved.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;
