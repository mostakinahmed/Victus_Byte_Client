import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ data }) => {
  // Final price calculation
  const finalPrice = data.price.selling - (data.price.discount || 0);

  return (
    <div className="flex flex-col md:h-[340px] shadow h-[280px] font-sans border border-slate-200 rounded overflow-hidden transition-all duration-300 hover:shadow-xl group/card cursor-pointer">
      
      {/* --- PRODUCT IMAGE SECTION --- */}
      <div className="relative h-56 bg-[#fcfcfc] md:p-4 p-2 flex items-center justify-center overflow-hidden">
        
        {/* SALE Badge */}
        {data.price.discount > 0 && (
          <div className="absolute top-3 left-3 z-10 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded">
            SALE -{data.price.discount}%
          </div>
        )}

        {/* Tag / New Badge */}
        {data.status?.isNewArrival && (
          <div className="absolute top-3 right-3 z-10 bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded">
            New
          </div>
        )}

        <img
          src={data.images?.[0]}
          alt={data.name}
          className="w-full h-full mt-5 object-contain transition-transform duration-500 group-hover/card:scale-105"
        />
      </div>

      {/* --- PRODUCT INFO SECTION --- */}
      <div className="md:p-3 p-2 md:-mt-2 flex flex-col flex-grow bg-white">
        
        {/* Brand */}
        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1">
          {data.brandName || "TECH DEVICE"}
        </span>

        {/* Product Name */}
        <h3 className="text-sm font-bold text-slate-800 line-clamp-2 md:mb-1 leading-tight  transition-colors group-hover/card:text-blue-600">
          {data.name}
        </h3>

        {/* Price + Action */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg font-black text-slate-900">
              ৳{finalPrice.toLocaleString()}
            </span>

            {data.price.discount > 0 && (
              <span className="text-xs text-slate-400 line-through">
                ৳{data.price.selling.toLocaleString()}
              </span>
            )}
          </div>

          <Link to="/checkout/cart">
            <button className="w-full md:py-2.5 py-2 bg-slate-900 text-white md:text-[11px] text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-colors rounded shadow-lg shadow-slate-200">
              Add to Cart
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
