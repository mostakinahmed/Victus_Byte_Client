import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion"; // 1. Import motion
import { CartContext } from "../components/Context Api/CartContext";
import { DataContext } from "../components/Context Api/UserContext";
import { useNavigate } from "react-router-dom";
import { IoClose, IoBagHandleOutline, IoArrowForward } from "react-icons/io5";
import { FiPackage, FiTruck, FiTag } from "react-icons/fi";

export const Cart = () => {
  const navigate = useNavigate();
  const { updateCart } = useContext(CartContext);
  const { productData } = useContext(DataContext);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    console.log(cartItems);
    const merged = cartItems
      .map((cartItem) => {
        const product = productData.find((p) => p.pID === cartItem.pID);
        if (!product) return null;
        return { ...product, qty: cartItem.qty || 1,colors:cartItem.color };
      })
      .filter(Boolean);
    setItems(merged);
  }, [productData]);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price.selling * item.qty,
    0,
  );
  const totalDiscount = items.reduce(
    (sum, item) => sum + item.price.discount,
    0,
  );
console.log(items);

  const onRemove = (pID) => {
    const updatedItems = items.filter((item) => item.pID !== pID);
    setItems(updatedItems);
    localStorage.setItem(
      "cart",
      JSON.stringify(
        updatedItems.map((item) => ({ pID: item.pID, qty: item.qty })),
      ),
    );
    updateCart();
  };

  const ProceedBtn = () => navigate("/checkout/purchase");

  // Animation Variants (Fast & Snappy)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const leftSideVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const rightSideVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-[1400px] lg:mt-[86px] font-sans mt-[40px] pt-5 mx-auto md:px-4 px-2 mb-60"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* --- Left Side: Product List --- */}
        <motion.div variants={leftSideVariants} className="flex-1">
          <div className="bg-white overflow-hidden border border-slate-200">
            {/* Table (Desktop) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      Product
                    </th>
                    <th className="px-4 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center">
                      Color
                    </th>
                    <th className="px-4 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center">
                      Quantity
                    </th>

                    <th className="px-4 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center">
                      Unit Price
                    </th>
                    <th className="px-4 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-right">
                      Subtotal
                    </th>
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item, index) => (
                    <tr
                      key={index}
                      className="group hover:bg-slate-50/50 transition-all"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 shrink-0 bg-white border border-slate-100 p-1 rounded">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-semibold text-slate-800 line-clamp-1">
                              {item.name}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] font-bold tracking-wider text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded uppercase">
                                {item.pID}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-md">
                          {item.colors}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span className="text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-md">
                          x{item.qty}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-center">
                        <span className="text-sm font-bold text-slate-800">
                          ৳{item.price.selling.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right font-black text-slate-900 text-sm">
                        ৳
                        {(
                          item.price.selling * item.qty -
                          item.price.discount
                        ).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => onRemove(item.pID)}
                          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-all"
                        >
                          <IoClose size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View */}
            <div className="md:hidden divide-y divide-slate-100">
              {items.map((item, index) => (
                <div key={index} className="p-4 flex flex-col gap-4">
                  <div className="flex gap-4">
                    <div className="w-20 h-20 shrink-0 bg-white border border-slate-100 p-1 rounded-lg">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm tracking-wider text-slate-800 line-clamp-2 pr-2">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => onRemove(item.pID)}
                          className="text-slate-500 p-1"
                        >
                          <IoClose size={20} />
                        </button>
                      </div>
                      <div className="mt-3 flex justify-between items-end">
                        <span className="text-sm font-black text-slate-900">
                          ৳{(item.price.selling * item.qty).toLocaleString()}
                        </span>
                        <div className="bg-slate-100 px-3 py-1 rounded text-xs font-bold text-slate-800">
                          Qty: {item.qty}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {items.length === 0 && (
              <div className="py-20 flex flex-col items-center text-center px-6">
                <FiPackage size={32} className="text-slate-200 mb-4" />
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                  Your Bag is Empty
                </h2>
              </div>
            )}
          </div>
        </motion.div>

        {/* --- Right Side: Order Summary --- */}
        {items.length > 0 && (
          <motion.div variants={rightSideVariants} className="lg:w-[400px]">
            <div className="bg-slate-900 p-8 text-white shadow-2xl sticky top-24">
              <h2 className="text-xl font-black mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center text-slate-400 text-sm">
                  <span>Sub-Total</span>
                  <span className="text-white font-bold">৳{totalPrice}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400 text-sm">
                  <span>Savings</span>
                  <span className="text-rose-400 font-bold">
                    -৳{totalDiscount}
                  </span>
                </div>
                <div className="pt-6 mt-6 border-t border-white/10">
                  <div className="flex justify-between items-end mb-8">
                    <div>
                      <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">
                        Total Payable
                      </p>
                      <p className="text-3xl font-black tracking-tighter">
                        ৳{totalPrice + 60}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={ProceedBtn}
                    className="group w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};
