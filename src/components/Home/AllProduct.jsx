import React, { useContext, useEffect, useState } from "react";
import { FeatureText } from "../Home/FeatureText";
import ProductCard from "../ProductCard";
import { DataContext } from "../Context Api/UserContext";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiZap, FiChevronRight } from "react-icons/fi";

export default function AllProduct() {
  const { productData } = useContext(DataContext);

  const [visibleProducts, setVisibleProducts] = useState([]);

  useEffect(() => {
    const updateVisibleProducts = () => {
      const width = window.innerWidth; // get current width dynamically

      if (width >= 1024) {
        // lg screens
        setVisibleProducts(productData.slice(0, 12));
      } else {
        // md/sm/xs
        setVisibleProducts(productData.slice(0, 8));
      }
    };

    // run on mount
    updateVisibleProducts();

    // listen for resize
    window.addEventListener("resize", updateVisibleProducts);
    return () => window.removeEventListener("resize", updateVisibleProducts);
  }, [productData]);

  return (
    <div className="max-w-[1400px] mx-auto mt-6 lg:px-4 px-2 ">
      {/* Section Title */}
      <div className="flex items-center justify-between bg-white shadow-sm border border-gray-100 md:p-4 px-4 py-2  mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 -ml-4 md:ml-0">
            <FiZap className="text-xl md:-ml-3 text-[#fe741d] animate-pulse" />
          </div>
          <h3 className=" md:text-xl -ml-3  md:-ml-1 font-bold text-gray-900">
            All Product
          </h3>
        </div>

        {/* View All Button */}
        <Link
          to="/all-products"
          className="flex items-center gap-1 text-[11px] md:text-xs font-bold uppercase tracking-wider text-[#fe741d] hover:text-white border border-[#fe741d] hover:bg-[#fe741d] px-3 py-1.5 md:px-5 md:py-2 rounded-full transition-all duration-300"
        >
          View All
        </Link>
      </div>

      <div className="pb-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 md:gap-4 gap-2">
        {visibleProducts.slice(0, 10).map((product) => (
          <Link
            key={product.pID}
            to={`/${product.category}/${product.name
              .replace(/\s+/g, "-")
              .toLowerCase()}`} // Replace spaces with hyphens in the URL
            aria-label={`View details for ${product.name}`}
          >
            <ProductCard data={product} />
          </Link>
        ))}
      </div>
    </div>
  );
}
