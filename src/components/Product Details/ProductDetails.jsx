import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "../Context Api/UserContext";
import Specification from "../Product Details/Specification.jsx";
import { RelatedProduct } from "./RelatedProduct.jsx";
import { Description } from "./Description.jsx";
import { CartContext } from "../Context Api/CartContext.jsx";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import AlsoLike from "./AlsoLike";
import ResponsiveToaster from "./ResponsiveToaster";
import toast from "react-hot-toast";

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

  const CurrCat = categoryData?.find(
    (item) => item.catID === cat.toUpperCase(),
  );

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

  const saveCart = (cart) =>
    sessionStorage.setItem("cart", JSON.stringify(cart));

  const buyNowBtn = (product) => {
    if (!selectedColor) {
      setShowColorError(true);
      return;
    }

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    for (let i = 0; i < quantity; i++) {
      cart.push({
        pID: product.pID,
        name: product.name,
        price: product.price.selling,
        image: product.images[0],
        qty: 1, 
        color: selectedColor,
        cartItemId: Date.now() + Math.random(),
      });
    }

    saveCart(cart);
    updateCart();
    navigate("/checkout/purchase");
  };

  const addToCartBtn = (product) => {
    if (!selectedColor) {
      setShowColorError(true);
      return;
    }

    const existingCart = JSON.parse(sessionStorage.getItem("cart")) || [];

    for (let i = 0; i < quantity; i++) {
      existingCart.push({
        pID: product.pID,
        name: product.name,
        price: product.price.selling,
        image: product.images[0],
        qty: 1, 
        color: selectedColor,
        cartItemId: Date.now() + Math.random(),
      });
    }

    sessionStorage.setItem("cart", JSON.stringify(existingCart));
    updateCart();
    toast.success(
      `${quantity} ${quantity > 1 ? "units" : "unit"} added to cart!`,
    );

    setQuantity(1);
  };

  const WhatsAppButton = ({ productName }) => {
    const phoneNumber = "8801773820336"; 
    const message = `Hi Victus Byte, I have a question about: ${productName}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    return (
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-2 px-3 rounded-full transition-colors w-full md:w-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z" />
        </svg>
        <span className="text-sm md:text-base">Chat on WhatsApp</span>
      </a>
    );
  };

  return (
    <div className="min-h-screen font-sans pb-5 ">
      <ResponsiveToaster />

      {/* Main Layout Container */}
      <section className="max-w-[1400px] lg:mt-[56px] p-3 md:px-5 px-2 mx-auto w-full">
        <div className="flex flex-col lg:flex-row mt-12 md:mt-11 gap-4 lg:gap-3 w-full">
          
          {/* LEFT COLUMN: Product Images, Details, and Specs */}
          <div className="flex flex-col w-full lg:w-[70%] xl:w-[75%] gap-3">
            
            {/* Top Product Card */}
            <div className="flex flex-col md:flex-row gap-4 bg-white rounded border border-slate-200 overflow-hidden">
              
              {/* Image Gallery Section */}
              <div className="w-full md:w-[45%] flex flex-col md:flex-row bg-white">
                {/* Thumbnails */}
                <div className="order-2 md:order-1 flex md:flex-col gap-2 border-t md:border-t-0 md:border-r border-slate-100 p-3 justify-center md:justify-start overflow-x-auto bg-slate-50/50 hide-scrollbar">
                  {product.images?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt="thumb"
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-14 h-14 md:w-16 md:h-16 flex-shrink-0 object-contain p-1 rounded border-2 transition-all cursor-pointer ${
                        idx === currentIndex
                          ? "border-[#fe741d] bg-white"
                          : "border-transparent opacity-60 hover:opacity-100"
                      }`}
                    />
                  ))}
                </div>

                {/* Main Image View */}
                <div className="order-1 md:order-2 flex-1 relative h-[300px] md:h-[400px] flex items-center justify-center p-4">
                  <span className="absolute top-5 right-3 z-10 bg-slate-800 backdrop-blur-sm px-2 rounded border border-slate-200 py-[2px] text-[11px] md:text-[12px] font-extrabold text-white uppercase tracking-widest pointer-events-none select-none">
                    {product.brandName}
                  </span>

                  <img
                    key={currentIndex}
                    src={product.images[currentIndex]}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />

                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full border border-slate-200 shadow-sm hover:bg-white transition-colors"
                      >
                        <FiChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full border border-slate-200 shadow-sm hover:bg-white transition-colors"
                      >
                        <FiChevronRight size={20} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Product Details Section */}
              <div className="w-full md:w-[55%] p-4 md:p-6 flex flex-col justify-between">
                <div>
                  <h1 className="text-lg md:text-2xl font-semibold text-slate-800 leading-tight mb-3">
                    {product.name}
                  </h1>

                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
                    <span className="bg-slate-100 text-slate-600 text-[11px] font-bold px-2 py-1 rounded uppercase border border-slate-200">
                      Type: <span className="text-[#fe741d]">{CurrCat?.catName}</span>
                    </span>
                    <span className="bg-slate-100 text-slate-600 text-[11px] font-bold px-2 py-1 rounded uppercase border border-slate-200">
                      Brand: <span className="text-[#fe741d]">{product.brandName}</span>
                    </span>
                    <span className="bg-slate-100 text-slate-600 text-[11px] font-bold px-2 py-1 rounded uppercase border border-slate-200">
                      Code: <span className="text-[#fe741d]">{product.pID}</span>
                    </span>
                  </div>

                  <hr className="border-slate-100 mb-4" />

                  <div className="flex flex-col mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-black text-slate-900">
                        ৳{(product.price.selling - product.price.discount).toLocaleString()}
                      </span>
                      {product.price.discount > 0 && (
                        <span className="text-base text-slate-400 line-through">
                          ৳{product.price.selling.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="space-y-4 mt-2">
                    <div
                      className={`py-2 px-2 rounded-xl transition-all duration-500 -ml-2 ${
                        showColorError && !selectedColor
                          ? "bg-red-50 border border-red-200"
                          : "border border-transparent"
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xs tracking-wider font-bold text-slate-800 uppercase">
                          Available Colors
                        </h3>
                        {showColorError && !selectedColor && (
                          <span className="text-[10px] font-bold text-red-500 animate-pulse">
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
                                setShowColorError(false);
                              }}
                              className={`relative flex items-center gap-2 px-3 py-1.5 rounded-xl border-2 transition-all duration-300 group ${
                                isSelected
                                  ? "border-[#fe741d] bg-orange-50/30"
                                  : showColorError && !selectedColor
                                  ? "border-red-300 bg-white"
                                  : "border-slate-200 bg-white cursor-pointer hover:border-slate-300"
                              }`}
                            >
                              <div
                                className="w-4 h-4 rounded-full border border-black/10 shadow-inner"
                                style={{ backgroundColor: name.toLowerCase() }}
                              />
                              <span
                                className={`text-[11px] font-bold uppercase tracking-wide transition-colors ${
                                  isSelected ? "text-[#fe741d]" : "text-slate-700"
                                }`}
                              >
                                {name}
                              </span>
                              {isSelected && (
                                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#fe741d] rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Quantity & Stock */}
                    <div className="select-none pt-2">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xs tracking-wider font-bold text-slate-800 uppercase">
                          Quantity
                        </h3>
                      </div>

                      <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/60 shadow-inner">
                          <button
                            disabled={quantity <= 1}
                            onClick={() => setQuantity(quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm text-slate-600 transition-all enabled:hover:text-red-600 disabled:opacity-40"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                          </button>

                          <div className="w-12 flex justify-center">
                            <span className="text-lg font-bold text-slate-900 tabular-nums">
                              {quantity}
                            </span>
                          </div>

                          <button
                            onClick={() => setQuantity(quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white shadow-sm text-slate-600 transition-all hover:text-indigo-600"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                          </button>
                        </div>

                        <div
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${
                            currentStock > 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                          }`}
                        >
                          <div className="relative flex h-2.5 w-2.5">
                            <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-[ping_2s_linear_infinite] ${currentStock > 0 ? "bg-green-500" : "bg-red-500"}`}></span>
                            <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${currentStock > 0 ? "bg-green-600" : "bg-red-600"}`}></span>
                          </div>
                          <span className={`text-[11px] font-black uppercase tracking-widest ${currentStock > 0 ? "text-green-700" : "text-red-700"}`}>
                            {currentStock > 0 ? "In Stock" : "Sold Out"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions & WhatsApp */}
                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex gap-2 w-full">
                    <button
                      onClick={() => addToCartBtn(product)}
                      disabled={currentStock <= 0}
                      className={`group ${currentStock <= 0 ? "hidden" : "block"} relative flex-1 h-12 text-sm md:text-base font-bold border-2 border-[#fe741d] text-[#fe741d] rounded overflow-hidden transition-colors duration-300`}
                    >
                      <span className="absolute inset-0 w-full h-full bg-[#fe741d] transition-transform duration-300 ease-out -translate-y-full group-hover:translate-y-0"></span>
                      <span className="relative z-10 group-hover:text-white transition-colors duration-300">Add to Cart</span>
                    </button>

                    <button
                      onClick={() => buyNowBtn(product)}
                      disabled={currentStock <= 0}
                      className="group relative flex-1 h-12 text-sm md:text-base font-bold bg-slate-800 text-white rounded overflow-hidden transition-all duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                      <span className="absolute inset-0 w-full h-full bg-slate-700 transition-transform duration-300 ease-out -translate-y-full group-enabled:group-hover:translate-y-0"></span>
                      <span className="relative z-10 transition-colors duration-300">
                        {currentStock > 0 ? "Buy Now" : "Unavailable"}
                      </span>
                    </button>
                  </div>
                  
                  {/* WhatsApp button visible on all screen sizes below Add to Cart, looks cleaner */}
                  <WhatsAppButton productName={product.name} />
                </div>
              </div>
            </div>

            {/* Specifications Section directly under the product card on the left side */}
            <div className="w-full bg-white md:-mb-2 border border-slate-100 overflow-hidden">
              <Specification data={product} />
            </div>
            
          </div>

          {/* RIGHT COLUMN: Related Products */}
          <div className="w-full lg:w-[30%] flex flex-col bg-white rounded border border-slate-200 overflow-hidden h-fit">
            <RelatedProduct data={allProductsInCategory} />
          </div>

        </div>
      </section>

      {/* Description Section */}
      <section className="max-w-[1400px] p-3 md:px-5 px-2 mx-auto w-full">
        <div className="bg-white rounded border border-slate-200 overflow-hidden shadow-sm">
           <Description data={product} />
        </div>
      </section>

      {/* Also Like Section */}
      <section className="max-w-[1400px] p-3 md:px-5 px-2 mx-auto w-full">
        <AlsoLike />
      </section>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;