import React from "react";
import { FiList } from "react-icons/fi";

export default function ProductSpecTable({ data }) {
  const productSpecs = data?.specifications || {};

  if (Object.keys(productSpecs).length === 0) return null;

  return (
    <div className="font-sans bg-white rounded border border-slate-200 overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#1976d2] via-[#1e88e5] to-[#1565c0] px-6 py-2.5">
        <div className="absolute inset-0 bg-white/5"></div>

        <div className="relative flex items-center gap-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <FiList className="text-white text-lg" />
          </div>

          <h2 className="text-lg lg:text-xl font-bold text-white">
            Product Specifications
          </h2>
        </div>
      </div>

      {/* Specifications */}
      <div className="flex flex-col md:p-4 p-2">
        {Object.entries(productSpecs).map(([section, items]) => (
          <div key={section} className="flex flex-col">
            {/* Category Header */}
            <div className="bg-blue-50 px-6 py-3 border-y border-blue-100 first:border-t-0">
              <h3 className="text-xs lg:text-sm font-bold uppercase tracking-wider text-[#1976d2]">
                {section}
              </h3>
            </div>

            {/* Specification Rows */}
            <dl className="divide-y divide-slate-200">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-2 lg:gap-6 px-6 py-3 hover:bg-blue-50/40 transition-colors duration-200"
                >
                  {/* Key */}
                  <dt className="text-sm md:text-[15px] font-medium text-slate-500 lg:col-span-1">
                    {item.key}
                  </dt>

                  {/* Value */}
                  <dd className="text-sm md:text-[15px] font-semibold text-slate-800 lg:col-span-2">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>

      {/* Bottom Brand Accent */}
      <div className="h-1.5 bg-gradient-to-r from-[#1976d2] via-[#64b5f6] to-[#1976d2]"></div>
    </div>
  );
}