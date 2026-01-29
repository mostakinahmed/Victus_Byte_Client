import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {
  // Final price calculation
  const finalPrice = data.price.selling - (data.price.discount || 0);

  return (
    <div className="flex flex-col md:h-[340px]  h-[280px] font-sans border border-slate-200 rounded overflow-hidden hover:shadow-xl group/card cursor-pointer">
      {/* --- PRODUCT IMAGE SECTION --- */}
      <div className="relative h-56 bg-[#fcfcfc] md:p-4 p-2 flex items-center justify-center overflow-hidden">
        {/* SALE Badge */}
        {data.price.discount > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white  text-[10px] font-bold md:px-2 px-1 md:py-1 py-[4px] flex justify-center items-center rounded">
            <span className="-mb-[2px]">OFF -{data.price.discount} TK</span>
          </div>
        )}

        {/* Tag / New Badge */}
        {data.status?.isNewArrival && (
          <div className="absolute top-3 right-3 z-10 bg-slate-800 text-white text-[10px] font-bold px-2 py-1 rounded">
            New
          </div>
        )}

        <img
          src={data.images?.[0]}
          alt={data.name}
          className="w-full h-full mt- object-contain"
        />
      </div>

      {/* --- PRODUCT INFO SECTION --- */}
      <div className="md:p-3 p-2 flex flex-col flex-grow bg-white">
        {/* Brand */}
        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">
          {data.brandName || "TECH DEVICE"}
        </span>

        {/* Product Name */}
        <h3 className="md:text-sm text-[13px] font-semibold text-slate-800 line-clamp-2  leading-tight  transition-colors group-hover/card:text-blue-600">
          {data.name}
        </h3>

        {/* Price + Action */}
        <div className="mt-auto">
          <div className="flex items-center gap-2">
            <span className="md:text-xl text-lg font-black text-slate-900">
              ৳{finalPrice.toLocaleString()}
            </span>

            {data.price.discount > 0 && (
              <span className="text-xs text-slate-400 line-through">
                ৳{data.price.selling.toLocaleString()}
              </span>
            )}
          </div>

          {/* <Link to="/checkout/cart">
            <button className="w-full md:py-2 py-2 bg-slate-800 text-white md:text-[12px] text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors rounded shadow-lg shadow-slate-200">
              Buy Now
            </button>
          </Link> */}
          {/* <Link to="/checkout/cart">
            <button className="flex items-center justify-center gap-2 w-full md:py-2 py-2 bg-slate-100 text-slate-800 hover:text-white hover:bg-slate-800 md:text-[12px] text-[10px] font-black  tracking-wide transition-colors rounded shadow-slate-200">
          
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              <span className="ml-1 text-[15px]">Buy Now</span>
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
