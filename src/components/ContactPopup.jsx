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
  const whatsappNumber = "+8801XXXXXXXXX"; // Replace with your actual WhatsApp number

  // Victus Byte Primary Color
  const brandColor = "#1976d2";

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[340px] md:max-w-sm bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Brand Accent Bar */}
        <div className={`h-2 bg-[#1976d2] w-full`} />

        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-[#1976d2] transition-colors"
        >
          <IoClose size={24} />
        </button>

        <div className="p-6 md:px-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-slate-800 tracking-tight uppercase">
              <span className="text-[#1976d2]">Victus</span> Byte
            </h2>
            <div className="h-1 w-12 bg-[#1976d2]/20 mx-auto mt-2 rounded-full" />
            <p className="text-[11px] md:text-xs text-slate-400 uppercase tracking-widest mt-3 font-bold">
              Customer Support Desk
            </p>
          </div>

          <div className="space-y-1">
            {/* Phone Item */}
            <a
              href={`tel:${phoneNumber}`}
              className="flex items-center gap-4 px-3 py-2 hover:bg-slate-50 rounded-xl transition-all group"
            >
              <div className="bg-blue-50 p-2.5 rounded-lg text-[#1976d2] group-hover:bg-[#1976d2] group-hover:text-white transition-all shadow-sm">
                <IoCall size={20} />
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                  Direct Line
                </p>
                <p className="text-[14px] md:text-[16px] text-slate-700 font-bold leading-tight">
                  {phoneNumber}
                </p>
              </div>
            </a>

            {/* WhatsApp Item */}
            <a
              href={`https://wa.me/${whatsappNumber.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 px-3 py-2 hover:bg-slate-50 rounded-xl transition-all group"
            >
              <div className="bg-green-50 p-2.5 rounded-lg text-green-600 group-hover:bg-green-500 group-hover:text-white transition-all shadow-sm">
                <IoLogoWhatsapp size={20} />
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                  WhatsApp
                </p>
                <p className="text-[14px] md:text-[16px] text-slate-700 font-bold leading-tight">
                  Live Chat Support
                </p>
              </div>
            </a>

            {/* Email Item */}
            <a
              href="mailto:support@victusbyte.com"
              className="flex items-center gap-4 px-3 py-2 hover:bg-slate-50 rounded-xl transition-all group"
            >
              <div className="bg-blue-50 p-2.5 rounded-lg text-[#1976d2] group-hover:bg-[#1976d2] group-hover:text-white transition-all shadow-sm">
                <IoMail size={20} />
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                  Email
                </p>
                <p className="text-[14px] md:text-[16px] text-slate-700 font-bold leading-tight truncate">
                  support@victusbyte.com
                </p>
              </div>
            </a>

            {/* Website Item */}
            <a
              href="https://victusbyte.com"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 px-3 py-2 hover:bg-slate-50 rounded-xl transition-all group"
            >
              <div className="bg-slate-100 p-2.5 rounded-lg text-slate-600 group-hover:bg-slate-800 group-hover:text-white transition-all shadow-sm">
                <IoGlobeOutline size={20} />
              </div>
              <div>
                <p className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                  Official Web
                </p>
                <p className="text-[14px] md:text-[16px] text-slate-700 font-bold leading-tight">
                  www.victusbyte.com
                </p>
              </div>
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full flex items-center justify-center mt-8 py-3.5 bg-[#1976d2] text-white rounded-xl text-sm font-bold hover:bg-[#1565c0] shadow-lg shadow-blue-200 transition-all active:scale-95 uppercase tracking-widest"
          >
            Close 
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;
