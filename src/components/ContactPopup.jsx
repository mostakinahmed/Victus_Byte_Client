import React from "react";
import {
  IoCall,
  IoMail,
  IoGlobeOutline,
  IoClose,
  IoLogoWhatsapp,
} from "react-icons/io5";

const ContactPopup = ({ onClose }) => {
  const phoneNumber = "09611-342936";
  const whatsappNumber = "+8801XXXXXXXXX"; // Replace with your WhatsApp number

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[340px] md:max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Slimmer Accent Bar */}
        <div className="h-1.5 bg-emerald-500 w-full" />

        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 text-slate-900 hover:text-emerald-500 transition-colors"
        >
          <IoClose size={22} />
        </button>

        {/* Reduced padding on mobile (p-4 vs md:p-8) */}
        <div className="p-5 md:p-2">
          <div className="text-center mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
              <span className="text-[#ff751f]">Victus</span> Byte
            </h2>
            <p className="text-[12px] md:text-sm text-slate-500">
              Official Contact Information
            </p>
          </div>

          <div className="">
            {/* Phone Item */}
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-3 md:gap-4 p-2 md:p-3 hover:bg-slate-50 rounded-xl transition-colors group"
            >
              <div className="bg-emerald-100 p-1.5 md:p-2 rounded-lg text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <IoCall size={18} />
              </div>
              <div>
                <p className="text-[9px] md:text-[10px] uppercase font-bold text-slate-400">
                  Phone
                </p>
                <p className="text-[13px] md:text-[15px] text-slate-700 font-semibold leading-tight">
                  {phoneNumber}
                </p>
              </div>
            </a>

            {/* WhatsApp Item */}
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 md:gap-4 p-2 md:p-3 hover:bg-slate-50 rounded-xl transition-colors group"
            >
              <div className="bg-green-100 p-1.5 md:p-2 rounded-lg text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all">
                <IoLogoWhatsapp size={18} />
              </div>
              <div>
                <p className="text-[9px] md:text-[10px] uppercase font-bold text-slate-400">
                  WhatsApp
                </p>
                <p className="text-[13px] md:text-[15px] text-slate-700 font-semibold leading-tight">
                  Message Us
                </p>
              </div>
            </a>

            {/* Email Item */}
            <a
              href="mailto:support@victusbyte.com"
              className="flex items-center gap-3 md:gap-4 p-2 md:p-3 hover:bg-slate-50 rounded-xl transition-colors group"
            >
              <div className="bg-blue-100 p-1.5 md:p-2 rounded-lg text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-all">
                <IoMail size={18} />
              </div>
              <div>
                <p className="text-[9px] md:text-[10px] uppercase font-bold text-slate-400">
                  Email
                </p>
                <p className="text-[13px] md:text-[15px] text-slate-700 font-semibold leading-tight truncate max-w-[180px] md:max-w-full">
                  support@victusbyte.com
                </p>
              </div>
            </a>

            {/* Website Item */}
            <a
              href="https://victusbyte.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 md:gap-4 p-2 md:p-3 hover:bg-slate-50 rounded-xl transition-colors group"
            >
              <div className="bg-purple-100 p-1.5 md:p-2 rounded-lg text-purple-600 group-hover:bg-purple-500 group-hover:text-white transition-all">
                <IoGlobeOutline size={18} />
              </div>
              <div>
                <p className="text-[9px] md:text-[10px] uppercase font-bold text-slate-400">
                  Website
                </p>
                <p className="text-[13px] md:text-[15px] text-slate-700 font-semibold leading-tight">
                  victusbyte.com
                </p>
              </div>
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-5 md:mt-8 py-2.5 md:py-3 bg-slate-900 text-white rounded-xl text-sm md:text-base font-bold hover:bg-emerald-600 shadow-lg shadow-slate-200 transition-all active:scale-95"
          >
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;