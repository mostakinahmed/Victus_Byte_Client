import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// Removed Framer Motion import
import { DataContext } from "../Context Api/UserContext";
import Specification from "../Product Details/Specification.jsx";
import { RelatedProduct } from "./RelatedProduct.jsx";
import { Description } from "./Description.jsx";
import { CartContext } from "../Context Api/CartContext.jsx";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AlsoLike from "./AlsoLike";
import ResponsiveToaster from "./ResponsiveToaster";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { updateCart } = useContext(CartContext);
  const [currentStock, setCurrentStock] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showColorError, setShowColorError] = useState(false);

  const { categoryData, productData, stockData } = useContext(DataContext);
  const { cat, name } = useParams();

  const normalizedProductName = name.replace(/-/g, " ").toLowerCase().trim();
  const product = productData?.find(
    (item) =>
      item.name.replace(/-/g, "").toLowerCase().trim() ===
      normalizedProductName,
  );

  const CurrCat = categoryData?.find((item) => item.catID === cat);
  const allProductsInCategory =
    productData
      ?.filter((item) => item.category === cat && item.name !== name)
      .slice(0, 6) || [];

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

  if (!product) {
    return (
      <div className="p-5 text-center text-xl font-semibold text-red-500">
        Product not found
      </div>
    );
  }

  const prevImage = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1,
    );
  const nextImage = () =>
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1,
    );
  const saveCart = (cart) => localStorage.setItem("cart", JSON.stringify(cart));

  const buyNowBtn = (product) => {
    if (!selectedColor) {
      setShowColorError(true);
      // Optional: Scroll to the color section so they see the warning
      return;
    }

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item.pID === product.pID);
    if (index === -1) {
      cart.push({
        pID: product.pID,
        name: product.name,
        price: product.price.selling,
        image: product.images[0],
        qty: quantity,
        color: selectedColor,
      });
    }
    saveCart(cart);
    updateCart();
    navigate("/checkout/cart");
  };

  const addToCartBtn = (product) => {
    if (!selectedColor) {
      const isMobile = window.innerWidth < 768;
      Swal.fire({
        title: "Wait!",
        text: "Please select a color.....",
        icon: "warning",
        width: isMobile ? "300px" : "460px",
        padding: "1em",
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        heightAuto: false,
        scrollbarPadding: false,
      });
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const found = existingCart.find((item) => item.pID === product.pID);
    if (found) {
      toast.success("Already Added!");
    } else {
      existingCart.push({
        pID: product.pID,
        name: product.name,
        price: product.price.selling,
        image: product.images[0],
        qty: quantity,
        color: selectedColor,
      });
      localStorage.setItem("cart", JSON.stringify(existingCart));
      updateCart();
      toast.success("Added to Cart!");
    }
  };

  const WhatsAppButton = ({ productName }) => {
    const phoneNumber = "8801773820336"; // Replace with your actual WhatsApp number
    const message = `Hi Victus Byte, I have a question about: ${productName}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-2 px-2 rounded-full"
      >
        {/* WhatsApp SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
        </svg>
        <span>Chat on WhatsApp</span>
      </a>
    );
  };

  return (
    <div className="min-h-screen font-sans pb-5">
      <ResponsiveToaster />

      {/* Top section */}
      <section className="max-w-[1400px] lg:mt-[50px] p-3 md:px-5 px-2 mx-auto">
        <div className="flex flex-col lg:flex-row mt-11 justify-between gap-3 mx-auto">
          {/* Left: Image Gallery */}
          <div className="lg:w-[45%] flex flex-col md:flex-row bg-white rounded border border-slate-200 overflow-hidden">
            <div className="order-2 md:order-1 flex md:flex-col gap-2 border-t md:border-t-0 md:border-r border-slate-100 p-2 justify-center md:justify-start overflow-x-auto bg-slate-50/50">
              {product.images?.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="thumb"
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-12 h-12 md:w-14 md:h-14 flex-shrink-0 object-contain p-1 rounded border-2 transition-all ${idx === currentIndex ? "border-[#fe741d] bg-white" : "border-transparent opacity-60 hover:opacity-100"}`}
                />
              ))}
            </div>

            <div className="order-1 md:order-2 flex-1 relative bg-white h-[250px] md:h-[400px] flex items-center justify-center p-4">
              <span className="absolute top-3 right-3 z-10 max-h-6 bg-green-400 backdrop-blur-sm px-2 rounded border border-slate-200 py-[2px] md:text-[12px] text-[11px] font-extrabold text-white uppercase tracking-widest pointer-events-none select-none">
                {product.brandName}
              </span>

              {/* Keep the key for efficient re-renders when swapping images */}
              <img
                key={currentIndex}
                src={product.images[currentIndex]}
                alt={product.name}
                className="w-full h-[250px] md:h-[400px] md:p-5 p-2 object-contain"
              />

              {product.images.length > 1 && (
                <div className="flex md:hidden lg:flex">
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full border border-slate-100 shadow-sm hover:bg-white transition-colors"
                  >
                    <FiChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full border border-slate-100 shadow-sm hover:bg-white transition-colors"
                  >
                    <FiChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex-1 bg-white border border-slate-200 p-3 md:p-5 rounded flex flex-col justify-between">
            <div>
              <h1 className="text-lg md:text-xl font-bold text-slate-800 leading-tight mb-2">
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center justify-between  md:justify-start gap-1.5 md:gap-5 mb-4 md:mb-7">
                <span className="bg-slate-100 md:hidden text-slate-600 text-[10px] md:text-[11px] md:tracking-wider font-bold px-2 py-0.5 rounded uppercase border border-slate-200">
                  Cat:{" "}
                  <span className="text-[#fe741d]">{CurrCat?.catName}</span>
                </span>
                <span className="hidden md:block bg-slate-100 text-slate-600 text-[10px] md:text-[11px] md:tracking-wider font-bold px-2 py-0.5 rounded uppercase border border-slate-200">
                  Type:{" "}
                  <span className="text-[#fe741d]">{CurrCat?.catName}</span>
                </span>
                <span className="bg-slate-100 text-slate-600 text-[10px] md:text-[11px] md:tracking-wider font-bold px-2 py-0.5 rounded uppercase border border-slate-200">
                  Brand:{" "}
                  <span className="text-[#fe741d]">{product.brandName}</span>
                </span>
                <span className="bg-slate-100 text-slate-600 text-[10px] md:text-[11px] md:tracking-wider font-bold px-2 py-0.5 rounded uppercase border border-slate-200">
                  Code: <span className="text-[#fe741d] md:text-[12px]">{product.pID}</span>
                </span>
              </div>

              <hr className="border-slate-100 mb-4" />

              <div className="flex flex-col mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-slate-900">
                    ৳
                    {(
                      product.price.selling - product.price.discount
                    ).toLocaleString()}
                  </span>
                  {product.price.discount > 0 && (
                    <span className="text-sm text-slate-400 line-through">
                      ৳{product.price.selling.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="md:space-y- space-y-3">
                <div className="">
                  <div
                    className={`mt-4 -mb-2 py-2 px-1 rounded-2xl transition-all duration-500 ${
                      showColorError && !selectedColor
                        ? "bg-red-50 border-2 border-red-200 animate-pulse-subtle"
                        : "border-2 border-transparent"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-[10px] md:tracking-widest tracking-wider font-black text-slate-500 uppercase">
                        Available Colors
                      </h3>

                      {/* The Warning Alert */}
                      {showColorError && !selectedColor && (
                        <span className="text-[10px] mr-2 font-bold text-red-500 animate-bounce">
                          ⚠️ Please select a color
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {product?.colors?.map((name) => {
                        const isSelected = selectedColor === name;

                        return (
                          <button
                            key={name}
                            onClick={() => {
                              setSelectedColor(name);
                              setShowColorError(false); // Reset error once they pick one
                            }}
                            className={`
            relative flex items-center gap-3 md:px-3 px-2 md:py-2 py-1 rounded-xl border-2 transition-all duration-300 group
            ${
              isSelected
                ? "border-[#fe741d] bg-orange-50/30 shadow-sm"
                : showColorError && !selectedColor
                  ? "border-red-300 bg-white hover:border-red-400" // Highlighted state
                  : "border-slate-100 bg-white hover:border-slate-300 active:scale-95"
            }
          `}
                          >
                            {/* Small Color Circle Indicator */}
                            <div
                              className="w-4 h-4 rounded-full border border-black/5 shadow-inner"
                              style={{ backgroundColor: name.toLowerCase() }}
                            />

                            {/* Color Name */}
                            <span
                              className={`
            text-[10px] md:text-[11px] font-bold uppercase tracking-wide transition-colors
            ${isSelected ? "text-[#fe741d]" : "text-slate-600 group-hover:text-slate-900"}
          `}
                            >
                              {name}
                            </span>

                            {/* Selection Checkbox */}
                            {isSelected && (
                              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#fe741d] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="white"
                                  strokeWidth="4"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="select-none mt-4">
                  {/* Modernized Label */}
                  <div className="flex items-center mb-2 px-1">
                    <h3 className="text-[10px] md:tracking-widest tracking-wider font-black text-slate-500 uppercase">
                      Quantity
                    </h3>
                    {quantity >= 5 && (
                      <span className="text-[10px] ml-1 font-bold text-green-500 animate-pulse">
                        Popular Choice
                      </span>
                    )}
                  </div>

                  <div className="flex gap-5">
                    <div className="group flex items-center bg-slate-100 md:p-1.5 p-1 rounded-2xl w-fit border border-slate-200/60 shadow-inner">
                      {/* Decrease Button */}
                      <button
                        disabled={quantity <= 1}
                        onClick={() => setQuantity(quantity - 1)}
                        className="md:w-8 w-7 md:h-8 h-7 flex items-center justify-center rounded-xl bg-white shadow-sm text-slate-600 transition-all duration-200 
                 enabled:hover:bg-red-50 enabled:hover:text-red-600 enabled:active:scale-90 
                 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>

                      {/* Number Display with "Slot Machine" feel */}
                      <div className="w-14 flex flex-col items-center justify-center overflow-hidden">
                        <span
                          key={quantity}
                          className="md:text-lg text-md font-black text-slate-800 tabular-nums animate-in fade-in zoom-in duration-300"
                        >
                          {quantity}
                        </span>
                      </div>

                      {/* Increase Button */}
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="md:w-8 w-7 md:h-8 h-7  flex items-center justify-center rounded-xl bg-white shadow-sm text-slate-600 transition-all duration-200 
                 hover:bg-indigo-50 hover:text-indigo-600 active:scale-90"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19"></line>
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                        </svg>
                      </button>
                    </div>
                    <div className="flex justify-center items-center ">
                      <div>
                        <div className=" flex items-center justify-center">
                          <div
                            className={`
    inline-flex items-center gap-2 px-2.5 py-1 rounded-full border
    ${
      currentStock > 0
        ? "bg-green-50 border-green-100 text-green-700"
        : "bg-red-50 border-red-100 text-red-700"
    }
  `}
                          >
                            {/* Animated Icon Container */}
                            <div className="relative flex h-2 w-2">
                              {/* The Slow Pulse */}
                              <span
                                className={`
        absolute inline-flex h-full w-full rounded-full opacity-75 
        animate-[ping_2s_linear_infinite]
        ${currentStock > 0 ? "bg-green-500" : "bg-red-500"}
      `}
                              ></span>

                              {/* The Solid Center */}
                              <span
                                className={`
        relative inline-flex rounded-full h-2 w-2
        ${currentStock > 0 ? "bg-green-600" : "bg-red-600"}
      `}
                              ></span>
                            </div>

                            {/* The Text Label */}
                            <span className="text-[10px] font-black uppercase tracking-widest">
                              {currentStock > 0 ? "In Stock" : "Sold Out"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`md:mt-6 mt-4 ${currentStock <= 0 ? "md:w-1/2" : "md:w-2/3 w-full"} flex gap-2`}
            >
              <button
                onClick={() => addToCartBtn(product)}
                disabled={currentStock <= 0}
                className={`group ${currentStock <= 0 ? "hidden" : "block"} disabled:cursor-not-allowed disabled:shadow-none relative flex-1 h-12  md:text-[16px] text-sm font-bold border-2 border-[#fe741d] cursor-pointer  text-[#fe741d] rounded overflow-hidden transition-colors duration-300 `}
              >
                {/* The Sliding Layer */}
                <span className="absolute inset-0 w-full h-full bg-[#fe741d]  transition-transform duration-500 ease-out -translate-y-full group-hover:translate-y-0"></span>

                {/* The Button Text */}
                <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                  Add to Cart
                </span>
              </button>

              <button
                onClick={() => buyNowBtn(product)}
                // Check if stock is 0 or less
                disabled={currentStock <= 0}
                className="group relative flex-1 h-12 md:text-[16px] text-sm font-bold bg-slate-800 text-white rounded overflow-hidden transition-all duration-300 
             disabled:cursor-not-allowed disabled:shadow-none"
              >
                {/* The Sliding Layer - Only animate if NOT disabled */}
                <span className="absolute inset-0 w-full h-full bg-slate-700 transition-transform duration-500 ease-out -translate-y-full group-enabled:group-hover:translate-y-0"></span>

                {/* The Button Text */}
                <span className="relative z-10 transition-colors duration-500">
                  {currentStock > 0 ? "Buy Now" : "Currently Unavailable"}
                </span>
              </button>
              {/* New WhatsApp Button */}
            </div>

            <div className="md:hidden flex flex-col md:flex-row gap-3 w-full mt-5">
              <div className="">
                <WhatsAppButton productName={product.name} />
              </div>
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
  );
};

export default ProductDetail;
