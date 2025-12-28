import React, { useContext, useEffect, useState, useCallback } from "react";
import { DataContext } from "../Context Api/UserContext";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FiFilter, FiChevronDown } from "react-icons/fi";

const LeftSide = ({ onFilter }) => {
  const { categoryData, productData } = useContext(DataContext);
  const { cat } = useParams();

  const [catData, setCatData] = useState([]);
  const [value, setValue] = useState(false);
  const [selectedRange, setSelectedRange] = useState({ min: "", max: "" });
  const [selectedIds, setSelectedIds] = useState([]);
  const [uniqueBrands, setUniqueBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);

  const toog = () => setValue(!value);

  // Responsive: Show filters by default on large screens
  useEffect(() => {
    const handleInitialView = () => {
      if (window.innerWidth >= 1024) setValue(true);
    };
    handleInitialView();
  }, []);

  // Filter categories that actually exist in the product pool
  useEffect(() => {
    if (!categoryData || !productData) return;
    const availableCatIds = [...new Set(productData.map((p) => p.category))];
    const filteredCats = categoryData.filter((c) =>
      availableCatIds.includes(c.catID)
    );
    setCatData(filteredCats);
  }, [categoryData, productData]);

  // Handle Dynamic Brand List
  useEffect(() => {
    if (!productData) return;

    let relevantProducts = productData;

    // If checkboxes are picked, show brands for those categories
    if (selectedIds.length > 0) {
      relevantProducts = productData.filter((p) =>
        selectedIds.includes(p.category)
      );
    }
    // Else if we are on a specific category page, show brands for that cat
    else if (cat) {
      relevantProducts = productData.filter((p) => p.category === cat);
    }

    const brands = relevantProducts.map((p) => p.brandName).filter(Boolean);
    setUniqueBrands([...new Set(brands)]);
  }, [cat, selectedIds, productData]);

  const handleRangeChange = (field, val) => {
    setSelectedRange((prev) => ({ ...prev, [field]: val }));
  };

  const handleCheckboxChange = (id, checked) => {
    setSelectedIds((prev) =>
      checked ? [...prev, id] : prev.filter((i) => i !== id)
    );
    setSelectedBrand([]); // Clear brands when category changes to avoid empty results
  };

  const handleBrandChange = (brand, checked) => {
    setSelectedBrand((prev) =>
      checked ? [...prev, brand] : prev.filter((b) => b !== brand)
    );
  };

  const reset = () => {
    setSelectedRange({ min: "", max: "" });
    setSelectedIds([]);
    setSelectedBrand([]);

    Swal.fire({
      icon: "info",
      title: "Filters Cleared",
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // Memoized Filter Logic to prevent infinite loops
// 1. Memoized Filter Logic 
const applyFilters = useCallback(() => {
  if (!productData) return;

  let filtered = [...productData];

  // Category Filter
  if (selectedIds.length > 0) {
    filtered = filtered.filter((p) => selectedIds.includes(p.category));
  } else if (cat) {
    filtered = filtered.filter((p) => p.category === cat);
  }

  // Brand Filter
  if (selectedBrand.length > 0) {
    filtered = filtered.filter((p) => selectedBrand.includes(p.brandName));
  }

  // Price Filter
  const minVal = selectedRange.min !== "" ? parseFloat(selectedRange.min) : null;
  const maxVal = selectedRange.max !== "" ? parseFloat(selectedRange.max) : null;

  if (minVal !== null || maxVal !== null) {
    filtered = filtered.filter((p) => {
      const price = typeof p.price === "object"
          ? parseFloat(p.price.selling)
          : parseFloat(p.price);
      const satisfiesMin = minVal === null || price >= minVal;
      const satisfiesMax = maxVal === null || price <= maxVal;
      return satisfiesMin && satisfiesMax;
    });
  }

  // IMPORTANT: We call onFilter here, but we don't include it in the 
  // dependency array of useCallback to prevent the infinite loop.
  onFilter?.(filtered);
  
  // Removed 'onFilter' from dependencies below
}, [productData, selectedIds, selectedBrand, selectedRange, cat]);

useEffect(() => {
  applyFilters();
}, [applyFilters]);

  return (
    <div className="bg-white rounded shadow-sm border border-gray-100 overflow-hidden  top-20">
     {/* Add 'sticky top-0' if you want it to follow the user as they scroll */}
<div className="lg:hidden sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
  <button
    onClick={toog}
    className="w-full flex items-center justify-between px-5 py-4 text-gray-800 transition-all duration-300 active:scale-95"
  >
    {/* Left Side: Icon and Text */}
    <div className="flex items-center gap-3">
      <div className="relative">
        <FiFilter 
          className={`text-xl transition-colors duration-300 ${
            value ? 'text-indigo-600' : 'text-gray-500'
          }`} 
        />
        
        {/* Smart Badge: Only visible if filters are applied */}
        {(selectedIds.length > 0 || selectedBrand.length > 0 || selectedRange.min || selectedRange.max) && (
          <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-white animate-in zoom-in">
            {selectedIds.length + selectedBrand.length + (selectedRange.min || selectedRange.max ? 1 : 0)}
          </span>
        )}
      </div>
      
      <span className="font-bold text-sm uppercase tracking-widest text-gray-700">
        {value ? "Close Filters" : "Filter & Sort"}
      </span>
    </div>

    {/* Right Side: State Indicator */}
    <div className="flex items-center gap-2">
      {value && <span className="text-[10px] font-bold text-indigo-600 uppercase">Active</span>}
      <div className={`transition-transform duration-300 ${value ? "rotate-180" : "rotate-0"}`}>
        <FiChevronDown className="text-xl text-gray-400" />
      </div>
    </div>
  </button>
</div>

      {value && (
        <aside className="w-full md:-ml-2 lg:w-64 p-5 space-y-3">
          {/* PRICE RANGE */}
          <div className="border-b  border-gray-100 pb-2">
            <h3 className="text-sm font-bold text-gray-800 uppercase mb-3">
              Price Range
            </h3>
            <div className="flex w-full -ml-1 gap-2">
              <input
                type="number"
                placeholder="Min"
                value={selectedRange.min}
                onChange={(e) => handleRangeChange("min", e.target.value)}
                className="md:w-23 w-1/2 border border-gray-200 rounded px-2 py-1 text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
              />
              <input
                type="number"
                placeholder="Max"
                value={selectedRange.max}
                onChange={(e) => handleRangeChange("max", e.target.value)}
                className="md:w-23 w-1/2 border border-gray-200 rounded px-2 py-1.5 text-sm focus:ring-1 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          {/* CATEGORY LIST */}
          <div className="flex justify-between md:flex-col gap-4">
            <div className="border-b border-gray-100 pb-2">
              <h3 className="text-sm font-bold text-gray-800 uppercase mb-3">
                Categories
              </h3>
              <div className="space-y-2">
                {catData.map((category) => (
                  <label
                    key={category.catID}
                    className="flex items-center group cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                      checked={selectedIds.includes(category.catID)}
                      onChange={(e) =>
                        handleCheckboxChange(category.catID, e.target.checked)
                      }
                    />
                    <span className="ml-3 text-sm text-gray-600 group-hover:text-indigo-600 transition-colors">
                      {category.catName}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* BRAND LIST */}
            <div className="pb-2">
              <h3 className="text-sm font-bold text-gray-800 uppercase mb-3">
                Brands
              </h3>
              <div className="space-y-2">
                {uniqueBrands.length > 0 ? (
                  uniqueBrands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center group cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500"
                        checked={selectedBrand.includes(brand)}
                        onChange={(e) =>
                          handleBrandChange(brand, e.target.checked)
                        }
                      />
                      <span className="ml-3 text-sm text-gray-600 group-hover:text-indigo-600 transition-colors">
                        {brand}
                      </span>
                    </label>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 italic">
                    No brands found
                  </p>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={reset}
            className=" md:w-4/5 w-full py-2 bg-gray-50 text-gray-500 text-xs font-bold uppercase rounded hover:bg-red-50 hover:text-red-600 transition-all border border-gray-200"
          >
            Reset Filters
          </button>
        </aside>
      )}
    </div>
  );
};

export default LeftSide;
