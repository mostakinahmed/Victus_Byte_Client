import React from "react";

export default function ProductSpecTable({ data }) {
  // Safe fallback in case specifications are undefined
  const productSpecs = data?.specifications || {};

  if (Object.keys(productSpecs).length === 0) return null;

  return (
    <div className="font-sans bg-white  border border-slate-200  overflow-hidden">
      
      {/* Header Section */}
      <div className="px-6 py-3 border-b border-slate-200 bg-white">
        <h2 className="text-lg lg:text-xl font-bold text-slate-800 flex items-center gap-3">
          {/* Subtle Icon for visual polish */}
          <span className="p-2 bg-orange-50 text-[#fe741d] rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </span>
          Product Specifications
        </h2>
      </div>

      {/* Specifications List */}
      <div className="flex flex-col md:p-4 p-2">
        {Object.entries(productSpecs).map(([section, items], sectionIndex) => (
          <div key={section} className="flex flex-col">
            
            {/* Category Sub-header */}
            <div className="bg-slate-100 px-6 py-2.5 border-y border-slate-200 first:border-t-0">
              <h3 className="text-xs lg:text-sm font-bold uppercase tracking-wider text-slate-700">
                {section}
              </h3>
            </div>

            {/* Key-Value Items */}
            <dl className="divide-y divide-slate-200/80 mb-0">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-1 lg:gap-6 px-6 py-3 lg:py-3 hover:bg-orange-50/30 transition-colors duration-200"
                >
                  {/* KEY */}
                  <dt className=" text-sm md:text-md font-medium text-slate-500 lg:col-span-1 flex items-center">
                    {item.key}
                  </dt>

                  {/* VALUE */}
                  <dd className="text-sm md:text-[15px] font-medium text-slate-800 lg:col-span-2">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>

          </div>
        ))}
      </div>
    </div>
  );
}