import React from "react";
import { Link } from "react-router-dom";

const Maintenance = ({ pageName }) => {
  return (
    <div className="max-w-[1400px] md:px-4 mx-auto md:mt-28 mt-15 px-2 font-sans">
      <div className="min-h-[500px] flex flex-col mb-5 items-center justify-center bg-white text-center rounded  border border-gray-100">
        <div className="max-w-lg px-4">
          {/* Animated Gear Icon with Victus Byte Primary Color */}
          <div className="flex justify-center mb-16">
            <div className="relative">
              {/* Outer Glow Effect */}
              <div className="absolute inset-0 rounded-full bg-[#1976d2] opacity-10 animate-pulse scale-150"></div>

              <svg
                className="w-16 h-16 text-[#1976d2] animate-[spin_4s_linear_infinite] relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
          </div>

          <h1 className="md:text-xl text-lg font-bold text-gray-800 mb-4 uppercase tracking-tight">
            {pageName} <span className="text-[#1976d2]">Under Development</span>
          </h1>

         

          <Link
            to="/"
            className="inline-block bg-[#1976d2] hover:bg-[#1565c0] text-white font-bold md:text-sm text-xs   py-3 md:px-10 px-4 rounded shadow-md hover:shadow-lg transition-all uppercase tracking-wider active:scale-95"
          >
            Return to Home
          </Link>

          <p className="mt-8 text-xs font-bold text-gray-400 uppercase tracking-widest">
            Victus Byte Ecosystem
          </p>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;
