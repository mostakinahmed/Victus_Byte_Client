import React from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiZap } from "react-icons/fi";

export const RelatedProduct = ({ data }) => {
  // Graceful fallback if data array is empty or undefined
  if (!data || data.length === 0) return null;

  return (
    <div className="w-full font-sans bg-white border border-slate-200 lg:border-0 overflow-hidden animate-in fade-in duration-500">
      
      {/* Section Header */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-orange-50 rounded-lg text-[#fe741d] shadow-sm">
            <FiZap size={16} className="fill-[#fe741d]/10" />
          </div>
          <h2 className="text-xs font-bold text-slate-800 uppercase tracking-widest">
            Related Items
          </h2>
        </div>
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {data.slice(0, 5).length} Items
        </span>
      </div>

      {/* Product List Row */}
      <div className="divide-y divide-slate-200">
        {data.slice(0, 5).map((element) => {
          // Safe optional-chaining flattening for specs
          const flatSpecs = element?.specifications 
            ? Object.values(element.specifications).flat() 
            : [];
          const limitedSpecs = flatSpecs.slice(0, 2);

          // Standardize clean routing paths to prevent component matching mismatches
          const productLink = `/${element.category}/${element.name.replace(/\s+/g, "-")}`;

          return (
            <div 
              key={element._id || element.pID} 
              className="group relative mb-3 hover:bg-slate-50/50 transition-all duration-300"
            >
              <Link to={productLink} className="block p-3.5">
                <div className="flex gap-6 items-center">
                  
                  {/* --- Image Frame with Zoom Layer --- */}
                  <div className="w-20 h-20 md:w-24 md:h-24 shrink-0 bg-white rounded-xl border border-slate-200/60 p-1.5 overflow-hidden flex items-center justify-center transition-all group-hover:border-slate-300 group-hover:shadow-sm">
                    <img
                      className="w-full h-full object-contain transition-transform duration-500 ease-out group-hover:scale-105"
                      src={element.images?.[0]}
                      alt={element.name}
                      loading="lazy"
                    />
                  </div>

                  {/* --- Content Description Block --- */}
                  <div className="flex-1 flex flex-col min-w-0 h-20 md:h-24 justify-between">
                    <div>
                      {/* Line clamp handles 2 lines cleanly instead of chopping strings brutally */}
                      <h3 className="text-xs md:text-sm font-semibold text-slate-800 tracking-tight leading-tight line-clamp-2 transition-colors group-hover:text-[#fe741d]">
                        {element.name}
                      </h3>

                      {/* Technical Spec Attribute Badges */}
                      {limitedSpecs.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {limitedSpecs.map((spec, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded uppercase border border-slate-200/40"
                            >
                              {spec.value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Price Tag & Interaction Action Arrow */}
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-xs text-slate-400 font-bold">৳</span>
                        <span className="text-sm md:text-base font-black text-slate-900 tracking-tight">
                          {(element?.price?.selling - (element?.price?.discount || 0)).toLocaleString()}
                        </span>
                        {element?.price?.discount > 0 && (
                          <span className="text-[10px] text-slate-400 line-through">
                            ৳{element.price.selling.toLocaleString()}
                          </span>
                        )}
                      </div>

                      {/* Clean micro-interaction arrow circle */}
                      <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 opacity-60 group-hover:opacity-100 group-hover:bg-[#fe741d] group-hover:text-white group-hover:translate-x-0.5 transition-all duration-300">
                        <FiChevronRight size={14} strokeWidth={3} />
                      </div>
                    </div>

                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};