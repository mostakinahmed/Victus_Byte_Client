import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../Context Api/UserContext";
import Specification from "../Product Details/Specification.jsx";
import { RelatedProduct } from "./RelatedProduct.jsx";
import { Description } from "./Description.jsx";
import { CartContext } from "../Context Api/CartContext.jsx";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Minus, Plus } from "lucide-react";
import AlsoLike from "./AlsoLike";
import ResponsiveToaster from "./ResponsiveToaster";
import toast from "react-hot-toast";

const ProductDetail = () => {
  const navigate = useNavigate();
  // Cart feature
  const { updateCart } = useContext(CartContext);
  // States
  const [currentStock, setCurrentStock] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");

  // Context data
  const { categoryData, productData, stockData } = useContext(DataContext);
  const { cat, name } = useParams(); // Using 'name' from URL params

  // Find product by name (case insensitive)
  // Remove hyphens and convert to lowercase for comparison
  const normalizedProductName = name.replace(/-/g, " ").toLowerCase().trim();

  // Find product by normalized name (case insensitive, hyphen-agnostic)
  const product = productData?.find(
    (item) =>
      item.name.replace(/-/g, "").toLowerCase().trim() === normalizedProductName
  );

  const CurrCat = categoryData?.find((item) => item.catID === cat).catID;

  // Find related products
  const allProductsInCategory =
    productData
      ?.filter((item) => item.category === cat && item.name !== name)
      .slice(0, 6) || [];

  // Update stock
  useEffect(() => {
    if (!stockData || !product) return;

    const stock = stockData.find((item) => item.pID === product.pID);

    if (stock && Array.isArray(stock.SKU)) {
      const count = stock.SKU.filter((s) => s.status === true).length;
      setCurrentStock(count);
    } else {
      setCurrentStock(0);
    }
  }, [product, stockData]);

  // If product doesn't exist -> NOW it's safe to return
  if (!product) {
    return (
      <div className="p-5 text-center text-xl font-semibold text-red-500">
        Product not found
      </div>
    );
  }

  // Image gallery handlers
  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  // Buy now handler
  const buyNowBtn = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const index = cart.findIndex((item) => item.pID === product.pID);
    if (index !== -1) {
      // cart[index].qty += 1;
    } else {
      cart.push({
        pID: product.pID,
        name: product.name,
        price: product.price.selling,
        image: product.images[0],
        qty: 1,
      });
    }

    saveCart(cart);
    updateCart();
    navigate("/checkout/cart");
  };

  const addToCartBtn = (product) => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const found = existingCart.find((item) => item.pID === product.pID);
    //just toast completed
    if (found) {
      toast.success("Already Added!");
    } else {
      existingCart.push({
        pID: product.pID,
        qty: quantity,
      });
      localStorage.setItem("cart", JSON.stringify(existingCart));
      updateCart();
      toast.success("Added to Cart!");
    }
  };

  return (
    <>
      <div className="min-h-screen pb-5">
        <ResponsiveToaster />
        {/* Top section */}
        <section className="max-w-[1400px] mt-[9px] lg:mt-[50px] p-3 md:px-5 px-2 mx-auto">
          <div className="flex flex-col md:flex-row mt-10 justify-between gap-3">
            {/* Left: Image Gallery */}
            <div className="flex-1 bg-white flex rounded shadow">
              {/* Thumbnails */}
              <div className="flex flex-col gap-2 border-r px-3 py-1 justify-center overflow-y-auto max-h-[400px]">
                {product.images?.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-17 h-17 p-1 object-contain rounded cursor-pointer border-2 ${
                      idx === currentIndex
                        ? "border-blue-500"
                        : "border-gray-200"
                    }`}
                  />
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 relative bg-white rounded h-[400px] flex items-center justify-center">
                <img
                  src={product.images[currentIndex]}
                  alt={product.name}
                  className="w-full h-full object-contain p-6 lg:p-3 rounded"
                />

                {/* Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-1 top-1/2 cursor-pointer transform -translate-y-1/2 bg-gray-100 p-2 rounded-full hover:bg-gray-200"
                    >
                      <FiChevronLeft size={24} />
                    </button>

                    <button
                      onClick={nextImage}
                      className="absolute right-1 top-1/2 cursor-pointer transform -translate-y-1/2 bg-gray-100 p-2 rounded-full hover:bg-gray-200"
                    >
                      <FiChevronRight size={24} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="flex-1 bg-white lg:h-[400px] shadow px-4 pb-5 pt-2 rounded">
              <h1 className="lg:text-xl text-lg font-bold text-gray-800 mb-2">
                {product.name}
              </h1>

              <div className="flex flex-row  lg:gap-4 gap-2 -ml-1 flex-row-wrap ">
                <p className="text-xs lg:text-sm flex items-center text-gray-500 mb-1 bg-gray-100 px-2 rounded-2xl">
                  Category:
                  <span className="text-[#fe741d] ml-1 lg:text-sm font-semibold  uppercase">
                    {CurrCat?.catName}
                  </span>
                </p>
                <h1 className="hidden lg:flex text-gray-500 -mt-1">|</h1>
                <p className="text-xs lg:text-sm flex items-center text-gray-500 mb-1 bg-gray-100 px-2 rounded-2xl">
                  Brand:{" "}
                  <span className="text-[#fe741d] lg:text-sm ml-1 font-semibold uppercase">
                    {product.brandName}
                  </span>
                </p>
                <h1 className="hidden lg:flex text-gray-500 -mt-1">|</h1>

                <p className="text-xs lg:text-sm flex items-center w-[115px] text-gray-500 mb-1 bg-gray-100 px-2 rounded-2xl">
                  Code:{" "}
                  <span className="text-[#fe741d] ml-1 lg:text-sm font-semibold  uppercase">
                    {product.pID}
                  </span>
                </p>
              </div>

              {/* color box */}
              <div className="flex flex-col space-x-3  mt-20 mb-2">
                <h1 className="text-gray-700 mb-1">
                  Color: <span className="font-semibold">{selectedColor}</span>
                </h1>
                <div className="flex gap-3">
                  {["Red", "Blue", "Green", "Yellow", "Purple"].map(
                    (name, idx) => (
                      <div
                        key={idx}
                        onClick={() => setSelectedColor(name)}
                        className={`lg:w-14 lg:h-8 w-12 h-7 flex items-center justify-center border border-[#fe741d] lg:text-sm text-xs font-medium cursor-pointer transition-all
        ${
          selectedColor === name
            ? "bg-[#fe741d] text-white scale-105"
            : "bg-transparent text-gray-900"
        }
      `}
                      >
                        {name}
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Availability */}
              <p className="text- text-gray-700 mb-1 ">
                Availability:{" "}
                {currentStock > 0 ? (
                  <span className="text-green-600 font-semibold">In Stock</span>
                ) : (
                  <span className="text-red-600 font-semibold">
                    Out of Stock
                  </span>
                )}
              </p>

              <div className="flex  gap-3 ">
                <p className="text-xl font-semibold text-gray-800">
                  TK: {product.price.selling - product.price.discount}
                  .00
                </p>
                {product.price.discount > 0 && (
                  <p className="text-md text-gray-500 mt- line-through">
                    TK: {product.price.selling}.00
                  </p>
                )}
              </div>

              {/* quantity */}
              <div className="flex items-center mt-3 mb-4">
                {/* Minus Button */}
                <button
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  className="w-10 h-10 border border-gray-300 bg-gray-100 flex items-center justify-center 
               text-lg hover:bg-gray-200 active:bg-gray-200 select-none"
                >
                  -
                </button>

                {/* Number Box */}
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-14 h-10 border-t border-b border-gray-300 text-center 
               focus:outline-none text-lg"
                />

                {/* Plus Button */}
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 bg-gray-100 flex items-center justify-center 
               text-lg hover:bg-gray-200 active:bg-gray-200 select-none"
                >
                  +
                </button>
              </div>

              {/* Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => buyNowBtn(product)}
                  className="bg-[#2dc6f4] hover:bg-[#00b4ea] w-50 h-10 flex items-center justify-center text-white "
                >
                  Buy Now
                </button>

                <button
                  onClick={() => addToCartBtn(product)}
                  className="bg-[#fe741d] hover:bg-[#fb6405] w-50 h-10 flex items-center justify-center text-white "
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Specs and Related */}
        <section className="max-w-full lg:max-w-[1400px] mx-auto md:px-5 px-2 flex flex-col lg:flex-row lg:gap-3">
          <div className="lg:w-full xl:w-full">
            <Specification data={product} />
          </div>
          <RelatedProduct data={allProductsInCategory} />
        </section>

        {/* Description */}
        <section className="max-w-[1400px] p-3 md:px-5 px-2 mx-auto">
          <Description data={product} />
        </section>
        <section>
          <AlsoLike />
        </section>
      </div>
    </>
  );
};

export default ProductDetail;
