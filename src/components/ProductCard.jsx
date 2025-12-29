import React from "react";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";

export const ProductCard = ({ data }) => {
  return (
    <>
      <div className="bg-white  shadow overflow-hidden transform transition-transform duration-300 hover:scale-103">
        <div className="w-full flex justify-between">
          <div className="h-7 flex items-center">
            {data.price.discount > 0 && (
              <div className="inline-flex items-center -ml-3 mt-2 bg-[#fe741d] rounded-md px-4 h-fit leading-none">
                <span className="text-white text-xs ml-2 py-0.5 font-semibold leading-none">
                  Save: {data.price.discount} Tk
                </span>
              </div>
            )}
          </div>

          <div className="h-7 flex items-center">
            {data.status?.isNewArrival && (
              <div className="inline-flex items-center -mr-4 mt-2 bg-green-600 rounded-md px-3 h-fit leading-none">
                <span
                  className="text-white  text-xs mr-3
                 py-1 font-semibold leading-none"
                >
                  NEW
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-hidden">
          <img
            className="w-full h-[165px] p-2 mt-1 object-contain transform transition-transform duration-500 hover:scale-110"
            src={data.images[0]}
            alt={data.name}
          />
        </div>
        <div className="px-3 pt-1">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-[10px] font-bold uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            In Stock
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
