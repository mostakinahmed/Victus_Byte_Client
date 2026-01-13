import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../components/Context Api/CartContext";
import { DataContext } from "../components/Context Api/UserContext";
import { useNavigate } from "react-router-dom";
import { IoClose, IoBagHandleOutline, IoArrowForward } from "react-icons/io5";
import { FiPackage, FiTruck, FiTag } from "react-icons/fi";

export const Cart = () => {
  const navigate = useNavigate();

  const { updateCart } = useContext(CartContext);
  const { productData } = useContext(DataContext);
  const [items, setItems] = useState([]); // merged cart items

  // Load cart from localStorage and merge with productData
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    const merged = cartItems
      .map((cartItem) => {
        const product = productData.find((p) => p.pID === cartItem.pID);
        if (!product) return null;

        return {
          ...product,
          qty: cartItem.qty || 1,
        };
      })
      .filter(Boolean);

    setItems(merged);
  }, [productData]);

  // Calculate total price
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price.selling * item.qty,
    0
  );

  const totalDiscount = items.reduce(
    (sum, item) => sum + item.price.discount,
    0
  );

  // Remove item from cart
  const onRemove = (pID) => {
    const updatedItems = items.filter((item) => item.pID !== pID);
    setItems(updatedItems);
    localStorage.setItem(
      "cart",
      JSON.stringify(
        updatedItems.map((item) => ({ pID: item.pID, qty: item.qty }))
      )
    );

    //update navber
    updateCart();
  };

  //proceed button handler
  const ProceedBtn = () => {
    navigate("/checkout/purchase");
  };
  return (
    <div className="max-w-[1400px] lg:mt-[86px] font-sans mt-[40px] pt-5 mx-auto md:px-4 px-2 mb-60  animate-in fade-in duration-700">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* --- Left Side: Product List --- */}
        <div className="flex-1">
          <div className="bg-white overflow-hidden border border-slate-200">
            {/* DESKTOP VIEW: Table (Hidden on Mobile) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-widest">
                      Product
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
                            <span className="text-sm font-bold text-slate-800 line-clamp-1">
                              {item.name}
                            </span>
                            <div className="flex items-center gap-1">
                              <span className="text-[10px] font-bold text-slate-400 uppercase">
                                Code:
                              </span>
                              <span className="text-[10px] font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded uppercase">
                                {item.pID}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <span className="text-sm font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-md">
                          x{item.qty}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-center">
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-bold text-slate-800">
                            ৳{item.price.selling.toLocaleString()}
                          </span>
                          {item.price.discount > 0 && (
                            <span className="text-[9px] font-bold text-rose-500 bg-rose-50 px-1 rounded">
                              -{item.price.discount} Disc.
                            </span>
                          )}
                        </div>
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

            {/* MOBILE VIEW: Card List (Hidden on Desktop) */}
            <div className="md:hidden divide-y divide-slate-100">
              {items.map((item, index) => (
                <div key={index} className="p-4 flex flex-col gap-4">
                  <div className="flex gap-4">
                    {/* Image */}
                    <div className="w-20 h-20 shrink-0 bg-white border border-slate-100 p-1 rounded-lg">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h3 className="text-sm font-bold text-slate-800 line-clamp-2 pr-2">
                          {item.name}
                        </h3>
                        <button
                          onClick={() => onRemove(item.pID)}
                          className="text-slate-400 p-1"
                        >
                          <IoClose size={20} />
                        </button>
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        Code: {item.pID}
                      </span>

                      <div className="mt-3 flex justify-between items-end">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-xs text-slate-500">
                            Unit: ৳{item.price.selling}
                          </span>
                          <span className="text-sm font-black text-slate-900">
                            Total: ৳
                            {(
                              item.price.selling * item.qty -
                              item.price.discount
                            ).toLocaleString()}
                          </span>
                        </div>
                        <div className="bg-slate-100 px-3 py-1 rounded text-xs font-bold text-slate-700">
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
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                  <FiPackage size={32} />
                </div>
                <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
                  Your Bag is Empty
                </h2>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Looks like you haven't added anything yet.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* --- Right Side: Order Summary --- */}
        {items.length > 0 && (
          <div className="lg:w-[400px]">
            <div className="bg-slate-900  p-8 text-white shadow-2xl shadow-slate-200 sticky ">
              <h2 className="text-xl font-black mb-6 flex items-center gap-2">
                Order Summary
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-slate-400 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <FiPackage size={14} /> <span>Sub-Total</span>
                  </div>
                  <span className="text-white font-bold">৳{totalPrice}</span>
                </div>

                <div className="flex justify-between items-center text-slate-400 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <FiTag size={14} className="text-rose-400" />{" "}
                    <span>Savings</span>
                  </div>
                  <span className="text-rose-400 font-bold">
                    -৳{totalDiscount}
                  </span>
                </div>

                <div className="flex justify-between items-center text-slate-400 text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <FiTruck size={14} /> <span>Logistics</span>
                  </div>
                  <span className="text-white font-bold">৳60</span>
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
                    <div className="text-right">
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                        VAT Included
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => ProceedBtn()}
                    className="group w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all duration-300 shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2"
                  >
                    Proceed to Checkout
                    <IoArrowForward className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Secure Checkout Note */}
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />{" "}
              256-bit SSL Secure Checkout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
