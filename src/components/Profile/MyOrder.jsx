import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiX,
  FiPackage,
  FiTruck,
  FiMapPin, // New icon for tracking
} from "react-icons/fi";

export const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://api.victusbyte.com/api/customer/my-orders",
        { withCredentials: true },
      );
      if (res.data.success) {
        setOrders(res.data.orders);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-300">
      <div className="relative mb-8">
        <h2 className="text-[14px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3">
          {/* Blue accent line */}
          <span className="w-1.5 h-5 bg-[#1976d2] rounded-full"></span>
          My Orders
        </h2>
        {/* Elegant thin border with a gradient feel */}
        <div className="mt-3 w-full h-[1px] bg-linear-to-r from-slate-200 via-slate-100 to-transparent"></div>
      </div>
      <div className="bg-white min-h-[400px] rounded-b-lg overflow-hidden">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="w-10 h-10 border-4 border-[#1976d2] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">
              Syncing...
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <p className="text-sm font-bold uppercase tracking-widest">
              No orders found.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 text-[#1976d2] font-bold uppercase text-[10px] tracking-widest hover:underline"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div
            className="overflow-x-scroll border border-slate-100 rounded md:p-1
     [&::-webkit-scrollbar]:h-1.5 
     [&::-webkit-scrollbar]:block
     [&::-webkit-scrollbar-track]:bg-slate-50
     [&::-webkit-scrollbar-thumb]:bg-slate-300
     [&::-webkit-scrollbar-thumb]:rounded-full
     hover:[&::-webkit-scrollbar-thumb]:bg-[#1976d2] transition-all"
          >
            <table className="w-full text-left border-collapse whitespace-nowrap font-sans">
              <thead className="bg-slate-50 border-b">
                <tr>
                  <th className="md:px-6 px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Order ID
                  </th>
                  <th className="md:px-6 px-4 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Date
                  </th>
                  <th className="md:px-6 px-2 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
                    Tracking
                  </th>
                  <th className="md:px-6 px-2 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    Total
                  </th>
                  <th className="md:px-6 px-2  py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-slate-100 transition-colors"
                  >
                    <td className="md:px-6 px-2 py-3 text-sm font-bold text-slate-700">
                      {order.order_id}
                    </td>

                    <td className="md:px-6 px-4 py-3">
                      <div className="flex flex-col">
                        {/* Date Styling */}
                        <span className="text-xs font-bold text-slate-700">
                          {order.order_date.slice(0, 10)}
                        </span>
                        {/* Time Styling - center aligned under date as requested */}
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">
                          {order.order_date.slice(10).trim()}
                        </span>
                      </div>
                    </td>

                    <td className="md:px-6 px-2 py-3 text-center">
                      <button
                        onClick={() =>
                          window.open(
                            `/track-order/${order.order_id}`,
                            "_blank",
                          )
                        }
                        className="inline-flex cursor-pointer items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full hover:bg-amber-600 hover:text-white transition-all border border-amber-200 shadow-sm shadow-amber-100"
                      >
                        <FiMapPin size={12} />
                        Track
                      </button>
                    </td>

                    <td className="md:px-6 px-4 py-3 text-sm font-medium text-gray-900">
                      ৳{order.total_amount}
                    </td>

                    <td className="md:px-6 px-2 py-3 text-center">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-[10px] font-bold uppercase tracking-widest py-2 px-4 border rounded hover:bg-[#1976d2] hover:text-white transition-all active:scale-95 bg-white"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedOrder && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl shadow-2xl relative"
            >
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center z-10">
                <div>
                  <h3 className="font-bold text-lg text-slate-800">
                    Order:{" "}
                    <span className="text-[#1976d2]">
                      {selectedOrder.order_id}
                    </span>
                  </h3>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">
                    {selectedOrder.order_date}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-gray-200 cursor-pointer rounded-full transition-colors"
                >
                  <FiX size={24} />
                </button>
              </div>

              <div className="px-6 py-4 space-y-2">
                <section>
                  <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <FiPackage /> Ordered Items
                  </h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center bg-slate-50 p-3 rounded-lg border border-slate-100"
                      >
                        <div>
                          <p className="text-sm font-bold text-slate-700">
                            {item.product_name}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            Qty: {item.quantity} | {item.product_comments}
                          </p>
                        </div>
                        <p className="font-bold text-sm text-slate-800">
                          ৳{selectedOrder.subtotal}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <section>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                      <FiTruck /> Shipping Address
                    </h4>
                    <div className="text-sm text-slate-600 space-y-1">
                      <p className="font-bold text-slate-800 uppercase text-xs">
                        {selectedOrder.shipping_address.recipient_name}
                      </p>
                      <p>{selectedOrder.shipping_address.phone}</p>
                      <p className="leading-relaxed">
                        {selectedOrder.shipping_address.address_line1}
                      </p>
                    </div>
                  </section>

                  <section className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">
                      Summary
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between text-slate-500">
                        <span>Method</span>
                        <span className="font-bold text-slate-800">
                          {selectedOrder.payment.method}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Shipping</span>
                        <span className="font-bold text-slate-800">
                          ৳
                          {selectedOrder.shipping_address.status === "Pending"
                            ? selectedOrder.shipping_cost
                            : 0}
                        </span>
                      </div>
                      {selectedOrder.coupon?.value > 0 && (
                        <div className="flex justify-between text-emerald-600 font-medium">
                          <span>
                            Discount ({selectedOrder.coupon.couponID})
                          </span>
                          <span>-৳{selectedOrder.coupon.value}</span>
                        </div>
                      )}
                      <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg text-[#1976d2]">
                        <span>Total</span>
                        <span>৳{selectedOrder.total_amount}</span>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
