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
     

      <div className="flex flex-col lg:flex-row gap-8">
        {/* --- Left Side: Product List --- */}
        <div className="flex-1">
          <div className="bg-white  overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse overflow-x-auto whitespace-nowrap">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="px-6 py-4 text-[12px] uppercase tracking-widest">
                      Product
                    </th>
                    <th className="px-6 py-4 text-[12px] uppercase tracking-widest">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-[12px] uppercase tracking-widest">
                      Unit Price
                    </th>
                    <th className="px-6 py-4 text-[12px] uppercase tracking-widest">
                      Subtotal
                    </th>
                    <th className="px-6 py-4 text-[12px] uppercase tracking-widest">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="">
                  {items.map((item, index) => (
                    <tr
                      key={index}
                      className="group hover:bg-slate-50/30 transition-all divide-y"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 shrink-0 bg-white border border-slate-100 rounded-2xl p-2 group-hover:shadow-md transition-all">
                            <img
                              src={item.images[0]}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex w-30 md:w-full flex-col">
                            <span className="text-md  leading-tight mb-1">
                              {item.name}
                            </span>
                            <span className="text-[12px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md w-fit">
                              PID: {item.pID}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className=" py-5 text-center">
                        <span className="bg-slate-100 px-3 py-1 rounded-lg">
                          x{item.qty}
                        </span>
                      </td>

                      <td className=" py-5 text-center">
                        <div className="flex flex-col items-center">
                          <span className=" ">
                            ৳{item.price.selling}
                          </span>
                          {item.price.discount > 0 && (
                            <span className="text-[10px] font-bold text-rose-500 bg-rose-50 px-1.5 rounded">
                              -{item.price.discount} Disc.
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="px-8 py-5 text-right ">
                        ৳{item.price.selling * item.qty - item.price.discount}
                      </td>

                      <td className="px-6 py-5 text-center">
                        <button
                          onClick={() => onRemove(item.pID)}
                          className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                        >
                          <IoClose size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {items.length === 0 && (
              <div className="p-20 flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                  <FiPackage size={40} />
                </div>
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest">
                  Your Bag is Empty
                </h2>
                <p className="text-sm text-slate-400 mt-2">
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
