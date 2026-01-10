import React from "react";
import { Link } from "react-router-dom";
import { FiChevronRight, FiZap, FiShoppingBag } from "react-icons/fi";

export const RelatedProduct = ({ data }) => {
  return (
    <div className="w-full lg:w-[400px] font-sans bg-white border border-slate-200 shadow-sm overflow-hidden animate-in fade-in duration-700">
      {/* Section Header */}
      <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-amber-500 rounded-lg text-white shadow-lg shadow-amber-200">
            <FiZap size={16} />
          </div>
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
            Related Product
          </h2>
        </div>
       
      </div>

      <div className="p-3 space-y-4">
        {data.slice(0, 5).map((element) => {
          // Flatten specs
          const flatSpecs = Object.values(element.specifications).flat();
          const limitedSpecs = flatSpecs.slice(0, 2); // Reduced to 2 for cleaner sidebar look

          return (
            <div key={element._id} className="group relative">
              <Link
                to={`/${element.category}/${element.name
                  .replace(/\s+/g, "-")
                  .toLowerCase()}`}
                className="block"
              >
                <div className="flex gap-4 p-3 rounded-2xl border border-transparent hover:border-indigo-100 hover:bg-indigo-100/30 transition-all duration-300">
                  {/* --- Image Frame --- */}
                  <div className="w-24 h-24 shrink-0 bg-white rounded-xl border border-slate-100 p-2 shadow-sm group-hover:shadow-md transition-all">
                    <img
                      className="w-full h-full object-contain"
                      src={element.images[0]}
                      alt={element.name}
                    />
                  </div>

                  {/* --- Content Area --- */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <h2 className="text-xs font-black text-slate-800 uppercase tracking-tight truncate group-hover:text-indigo-600 transition-colors">
                        {element.name}
                      </h2>

                      {/* Attribute Chips */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {limitedSpecs.map((spec, i) => (
                          <span
                            key={i}
                            className="text-[9px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md uppercase border border-slate-200/50"
                          >
                            {spec.value}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-end justify-between mt-2">
                      <div className="flex flex-col">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">
                          Price
                        </p>
                        <p className="text-sm font-black text-slate-900 leading-none">
                          ৳{element?.price?.selling ?? "0.00"}
                        </p>
                      </div>

                      {/* Subtle "View" Link */}
                      <div className="text-indigo-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all">
                        <FiChevronRight size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              {/* --- Integrated Action Button --- */}
              <Link
                to={`/product/${element.category}/${element.pID}/buynow`}
                className="block px-3 -mt-1 pb-2"
              >
                <button className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 shadow-xl shadow-slate-200 transition-all active:scale-[0.98]">
                  <FiShoppingBag size={12} /> Direct Purchase
                </button>
              </Link>
            </div>
          );
        })}
      </div>

   
    </div>
  );
};
