import React, { useContext } from "react";
import { DataContext } from "../Context Api/UserContext";
import ProductCard from "../ProductCard";
import { Link } from "react-router-dom";
import { FiHeart } from "react-icons/fi"; // Using a Heart icon for "Also Like"

const AlsoLike = () => {
  const { productData } = useContext(DataContext);

  if (!productData || productData.length === 0) return null;

  return (
    <div className="max-w-[1360px] bg-white mx-auto mt-5  rounded  ">
      {/* Header Section - Styled like Featured Product */}
      <div className="flex items-center justify-between bg-white shadow-sm border border-gray-100 p-4 mb-4">
        <div className="flex items-center gap-3">
          {/* Icon Box */}
          <div className="p-2 -ml-4 md:ml-0 bg-pink-50 rounded-xl">
            <FiHeart className="text-xl text-pink-500" />
          </div>
          {/* Title */}
          <h3 className="text-lg -ml-3 md:ml-0 font-bold text-gray-800 uppercase tracking-tight">
            You May Also Like
          </h3>
        </div>
      </div>

      {/* Auto-scrolling Row */}
      <div className="overflow-hidden w-full group">
        <div
          className="flex gap-4 animate-scroll group-hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {/* Double the data for a seamless loop */}
          {[...productData, ...productData].map((product, index) => (
            <div
              key={`${product.pID}-${index}`}
              className="w-[195px] flex-shrink-0"
            >
              <Link to={`/${product.category}/${product.name}`}>
                <ProductCard data={product} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlsoLike;
