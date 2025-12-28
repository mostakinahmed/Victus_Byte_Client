import React from "react";
import { Link } from "react-router-dom";

export const ProductCard = ({ data }) => {
  return (
    <>
      <div className="bg-white  shadow overflow-hidden transform transition-transform duration-300 hover:scale-103">
        <div className="h-7 flex items-center">
          {data.price.discount > 0 && (
            <div className="inline-flex items-center -ml-3 mt-2 bg-[#fe741d] rounded-md px-4 h-fit leading-none">
              <span className="text-white text-xs ml-2 py-0.5 font-semibold leading-none">
                Save: {data.price.discount} Tk
              </span>
            </div>
          )}
        </div>

        <div className="overflow-hidden">
          <img
            className="w-full h-[165px] p-2 mt-1 object-contain transform transition-transform duration-500 hover:scale-110"
            src={data.images[0]}
            alt={data.name}
          />
        </div>
        <div className="px-3 pt-1">
          <span className="text-white px-1 -ml-6 bg-green-500 rounded-2xl text-xs font-semibold ">
            <span className="ml-5">stock in</span>
          </span>
          <h2 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2 truncate">
            {data.name}
          </h2>

          <div className="flex items-center justify-between -mt-2 lg:-mt-1">
            <span className="text-red-600  font-bold lg:text- text-">
              {data.price.selling - (data.price.discount || 0) || 0}{" "}
              <span className="-ml-1">৳</span>
            </span>
            {data.price.discount > 0 && (
              <span className="text-gray-600 font-semibold line-through">
                {data.price.selling} <span className="-ml-1">৳</span>
              </span>
            )}
          </div>
        </div>
        <Link to={`/checkout/cart`}>
          <button className="w-full  bg-[#fe741d] hover:bg-indigo-800 text-white text-sm py-2 transition duration-300">
            Buy Now
          </button>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
