import React, { useContext } from "react";
import { DataContext } from "../Context Api/UserContext";
import ProductCard from "../ProductCard";
import { Link } from "react-router-dom";

const AlsoLike = () => {
  const { productData } = useContext(DataContext);

  if (!productData || productData.length === 0) return null;

  return (
    <div className="max-w-[1400px] md:px-5 px-2 mx-auto">
      <div className="mt-5 overflow-hidden">
        <h2 className="lg:text-2xl text-xl text-gray-800 font-semibold mb-3">
          You May Also Like
        </h2>

        {/* This wrapper hides the scrollbar and handles the overflow */}
        <div className="overflow-hidden w-full">
          <div className="flex gap-4 animate-scroll">
            {/* Double the data for a seamless loop */}
            {[...productData, ...productData].map((product, index) => (
              <div
                key={`${product.pID}-${index}`}
                className="w-[190px] flex-shrink-0"
              >
                <Link to={`/product/${product.category}/${product.pID}`}>
                  <ProductCard data={product} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlsoLike;