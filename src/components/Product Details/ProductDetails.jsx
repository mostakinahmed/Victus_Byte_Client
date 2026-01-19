import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion"; // 1. Import motion
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
  const { updateCart } = useContext(CartContext);
  const [currentStock, setCurrentStock] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");

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
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const index = cart.findIndex((item) => item.pID === product.pID);
    if (index === -1) {
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
    if (found) {
      toast.success("Already Added!");
    } else {
      existingCart.push({ pID: product.pID, qty: quantity });
      localStorage.setItem("cart", JSON.stringify(existingCart));
      updateCart();
      toast.success("Added to Cart!");
    }
  };

  // --- Animation Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen font-sans pb-5"
      >
        <ResponsiveToaster />

        {/* Top section */}
        <section className="max-w-[1400px] lg:mt-[50px] p-3 md:px-5 px-2 mx-auto">
          <div className="flex flex-col lg:flex-row mt-11 justify-between gap-3 mx-auto">
            {/* Left: Image Gallery (Animated) */}
            <motion.div
              variants={fadeInUp}
              className="lg:w-[45%] flex flex-col md:flex-row bg-white rounded border border-slate-200 overflow-hidden"
            >
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

                <motion.img
                  key={currentIndex}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={product.images[currentIndex]}
                  alt={product.name}
                  className="w-full h-[250px] md:h-[400px] object-contain"
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
            </motion.div>

            {/* Right: Product Details (Animated) */}
            <motion.div
              variants={fadeInUp}
              className="flex-1 bg-white border border-slate-200 p-3 md:p-5 rounded flex flex-col justify-between"
            >
              <div>
                <h1 className="text-lg md:text-xl font-bold text-slate-800 leading-tight mb-2">
                  {product.name}
                </h1>

                <div className="flex flex-wrap items-center justify-between  md:justify-start gap-1.5 md:gap-5 mb-4 md:mb-10">
                  <span className="bg-slate-100 text-slate-600 text-[10px] md:text-[11px] md:tracking-wider font-bold px-2 py-0.5 rounded uppercase border border-slate-200">
                    Cat:{" "}
                    <span className="text-[#fe741d]">{CurrCat?.catName}</span>
                  </span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] md:text-[11px] md:tracking-wider font-bold px-2 py-0.5 rounded uppercase border border-slate-200">
                    Brand:{" "}
                    <span className="text-[#fe741d]">{product.brandName}</span>
                  </span>
                  <span className="bg-slate-100 text-slate-600 text-[10px] md:text-[11px] md:text-[12px] md:tracking-wider font-bold px-2 py-0.5 rounded uppercase border border-slate-200">
                    Code: <span className="text-[#fe741d]">{product.pID}</span>
                  </span>
                </div>

                <hr className="border-slate-100 mb-4" />

                <div className="flex items-center justify-between mb-4">
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
                  <span
                    className={`text-[10px] font-bold uppercase ${currentStock > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    ● {currentStock > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <div className="md:space-y-4 space-y-3">
                  <div>
                    <h3 className="text-[11px] font-bold text-slate-500 uppercase mb-2">
                      Color:{" "}
                      <span className="text-slate-900">{selectedColor}</span>
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {["Red", "Blue", "Green", "Yellow", "Purple"].map(
                        (name) => (
                          <button
                            key={name}
                            onClick={() => setSelectedColor(name)}
                            className={`px-3 py-1 text-xs font-semibold rounded border transition-all ${selectedColor === name ? "bg-[#fe741d] border-[#fe741d] text-white" : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"}`}
                          >
                            {name}
                          </button>
                        ),
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[11px] font-bold text-slate-500 uppercase mb-2">
                      Quantity
                    </h3>
                    <div className="flex items-center w-fit border border-slate-200 rounded overflow-hidden">
                      <button
                        onClick={() =>
                          quantity > 1 && setQuantity(quantity - 1)
                        }
                        className="w-8 h-8 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold border-r border-slate-200"
                      >
                        -
                      </button>
                      <span className="w-10 text-center text-sm font-bold text-slate-800">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold border-l border-slate-200"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:mt-6 mt-4 flex gap-2">
                <button
                  onClick={() => addToCartBtn(product)}
                  className="flex-1 h-10 text-sm font-bold border-2 border-[#fe741d] text-[#fe741d] rounded hover:bg-orange-50 transition-all active:scale-95"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => buyNowBtn(product)}
                  className="flex-1 h-10 text-sm font-bold bg-[#2dc6f4] hover:bg-[#00b4ea] text-white rounded shadow-sm transition-all active:scale-95"
                >
                  Buy Now
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Specs and Related (Reveal on Scroll) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-full lg:max-w-[1400px] mx-auto md:px-5 px-2 flex flex-col lg:flex-row lg:gap-3"
        >
          <div className="lg:w-full xl:w-full">
            <Specification data={product} />
          </div>
          <RelatedProduct data={allProductsInCategory} />
        </motion.section>

        {/* Description (Reveal on Scroll) */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-[1400px] p-3 md:px-5 px-2 mx-auto"
        >
          <Description data={product} />
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <AlsoLike />
        </motion.section>
      </motion.div>
    </>
  );
};

export default ProductDetail;
