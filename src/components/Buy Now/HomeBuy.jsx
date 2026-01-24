"use client";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Modern Animations
import { Toaster, toast } from "sonner"; // Modern Toasts
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiTruck,
  FiPackage,
  FiMap,
  FiChevronRight,
  FiCheckCircle,
  FiCopy,
} from "react-icons/fi";
import { DataContext } from "../Context Api/UserContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context Api/CartContext";

// Utility: Generate Order ID
function generateOrderId() {
  const timestamp = Date.now().toString().slice(-5);
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `OID26${timestamp}${randomNum}`;
}

// Utility: Format date & time (12-hour)
function getOrderDateTime12h() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const hoursStr = String(hours).padStart(2, "0");
  return `${year}-${month}-${day}   ${hoursStr}:${minutes} ${ampm}`;
}

export function HomeBuy({ data }) {
  const [divList, setDiv] = useState([]);
  const [disList, setDis] = useState([]);
  const [upazilaList, setUpazila] = useState([]);
  const [finalDisList, setFinalDis] = useState([]);
  const [finalUpaList, setFinalUpaList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // Modal State
  const [currentOrderId, setCurrentOrderId] = useState("");

  const [discount, setDiscount] = useState(0);
  const [subTotal, setSubtotal] = useState(0);
  const [deliverTk, setDeliverTk] = useState(150);
  const [totalTk, setTotalTk] = useState(0);
  const { productData } = useContext(DataContext);
  const navigate = useNavigate();
  const { updateCart } = useContext(CartContext);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    division: "",
    district: "",
    upazila: "",
    ward: "",
  });

  useEffect(() => {
    const totalPrice = data.reduce(
      (sum, item) => sum + item.price.selling * item.qty,
      0,
    );
    const totalDiscount = data.reduce(
      (sum, item) => sum + (item.price.discount || 0),
      0,
    );
    setTotalTk(totalPrice - totalDiscount + deliverTk);
    setSubtotal(totalPrice);
    setDiscount(totalDiscount);
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [divisionRes, districtRes, upazilaRes] = await Promise.all([
          axios.get("https://bdopenapi.vercel.app/api/geo/divisions"),
          axios.get("https://bdopenapi.vercel.app/api/geo/districts"),
          axios.get("https://bdopenapi.vercel.app/api/geo/upazilas"),
        ]);
        setDiv(divisionRes.data.data);
        setDis(districtRes.data.data);
        setUpazila(upazilaRes.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!form.upazila) return;
    const fetchDataWard = async () => {
      try {
        const WardRes = await axios.get(
          `https://bdopenapi.vercel.app/api/geo/unions/${form.upazila}`,
        );
        setWardList(WardRes.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchDataWard();
  }, [form.upazila]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const divName = divList.find((d) => d.id === form.division)?.name || "";
    const disName =
      finalDisList.find((d) => d.id === form.district)?.name || "";
    const upaName = finalUpaList.find((d) => d.id === form.upazila)?.name || "";

    const orderPayload = {
      order_id: generateOrderId(),
      order_date: getOrderDateTime12h(),
      status: "Pending",
      mode: "Online",
      customer_id: "GUEST_USER",
      items: data.map((item) => ({
        product_id: item.pID,
        product_name: item.name,
        product_price: item.price.selling,
        quantity: item.qty,
        product_comments: item.colors,
      })),
      shipping_address: {
        recipient_name: form.name,
        phone: form.phone,
        email: form.email,
        address_line1: `${form.address}, (Div: ${divName}, Dist: ${disName}, Upa: ${upaName}, Ward: ${form.ward})`,
      },
      payment: { method: "COD", status: "Pending" },
      total_amount: totalTk,
      shipping_cost: deliverTk,
      subtotal: subTotal,
      discount: discount,
    };

    try {
      await axios.post(
        "https://api.victusbyte.com/api/order/create-order",
        orderPayload,
      );

      //. Clear Local Storage
      localStorage.removeItem("cart");
      updateCart();
      setCurrentOrderId(orderPayload.order_id);
      setShowSuccess(true);
      toast.success("Order Synced Successfully");
    } catch (error) {
      toast.error("Network Synchronization Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDistrict = (divID) => {
    setFinalDis(disList.filter((dis) => dis.division_id === divID));
  };

  const handleUpazila = (disID) => {
    setFinalUpaList(upazilaList.filter((upa) => upa.district_id === disID));
  };

  return (
    <div className="min-h-screen font-sans w-full flex flex-col items-center px-2 lg:px-4 mb-20">
      <Toaster position="top-right" richColors />

      {/* --- SUCCESS MODAL (FRAMER MOTION) --- */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[500] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
              onClick={() => (window.location.href = "/")}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-[340px] rounded-[32px] overflow-hidden shadow-2xl"
            >
              <div className="bg-indigo-600 h-24 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center border border-white/30">
                  <FiCheckCircle className="text-white" size={24} />
                </div>
              </div>
              <div className="p-6 text-center">
                <h2 className="text-lg font-black text-slate-900 uppercase">
                  Success, {form.name.split(" ")[0]}!
                </h2>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 mb-6">
                  Manifest Finalized
                </p>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6 group relative">
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Your Order ID
                  </p>
                  <p className="font-mono font-black text-indigo-600 text-sm">
                    {currentOrderId}
                  </p>
                </div>

                <button
                  onClick={() => navigate("/")}
                  className="w-full bg-slate-900 text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95"
                >
                  Return to Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- 1. PRODUCT MANIFEST --- */}
      <div className="bg-white w-full  border border-slate-200 overflow-hidden mb-4 rounded">
        <div className="bg-slate-50 px-6 md:py-4 py-2 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiPackage className="text-indigo-600" size={18} />
            <h2 className="text-xs font-semibold uppercase tracking-widest">
              Order Manifest
            </h2>
          </div>
        </div>
        <div className="p-4 grid lg:grid-cols-3 gap-3">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-xl border border-slate-50 bg-slate-50/50"
            >
              <img
                src={item.images[0]}
                className="w-13 h-13 object-contain"
                alt=""
              />
              <div className="md:min-w-0 w-65">
                <h3 className="text-xs text-slate-900 line-clamp-2 tracking-wider uppercase leading-tight">
                  {item.name}
                </h3>
                <p className="text-indigo-600 text-xs font-black">
                  ৳{item.price.selling}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- 2. CUSTOMER FORM --- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full border border-slate-200 overflow-hidden rounded shadow-sm"
      >
        <div className="bg-slate-800 px-8 py-5 flex items-center gap-3">
          <FiTruck className="text-indigo-400" size={20} />
          <h2 className="text-sm font-black text-white uppercase tracking-widest">
            Logistics Information
          </h2>
        </div>

        <div className="p-6 md:p-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[12px] font-semibold  tracking-wider text-slate-500 ml-1">
                Recipient Name
              </label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 tracking-wider rounded-xl md:text-sm text-[13px] outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[12px] font-semibold  tracking-wider text-slate-500 ml-1">
                Email Address
              </label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 tracking-wider rounded-xl md:text-sm text-[13px] outline-none focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-semibold  tracking-wider text-slate-500 ml-1">
              Phone Number
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300" />
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 tracking-wider rounded-xl md:text-sm text-[13px] outline-none focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[12px] font-semibold  tracking-wider text-slate-500 ml-1">
              Delivery Destination
            </label>
            <div className="relative">
              <FiMapPin className="absolute left-3 top-4 text-slate-300" />
              <textarea
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl md:text-sm text-[13px]  tracking-wider outline-none focus:border-indigo-500 h-20"
              />
            </div>
          </div>

          {/* //droupdown */}
          <div className="md:p-4 p-2 bg-slate-50 rounded-2xl grid md:grid-cols-3 gap-3 border border-slate-100">
            <select
              className="bg-white border p-3 rounded-xl text-sm outline-none"
              value={form.division}
              onChange={(e) => {
                handleDistrict(e.target.value);
                setForm({
                  ...form,
                  division: e.target.value,
                  district: "",
                  upazila: "",
                });
              }}
            >
              <option value="">Division</option>
              {divList.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <select
              className="bg-white border p-3 rounded-xl text-sm outline-none"
              value={form.district}
              onChange={(e) => {
                handleUpazila(e.target.value);
                setForm({ ...form, district: e.target.value, upazila: "" });
              }}
              disabled={!form.division}
            >
              <option value="">District</option>
              {finalDisList.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
            <select
              className="bg-white border p-3 rounded-xl text-sm outline-none"
              value={form.upazila}
              onChange={(e) => setForm({ ...form, upazila: e.target.value })}
              disabled={!form.district}
            >
              <option value="">Upazila</option>
              {finalUpaList.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          {wardList.length > 0 && (
            <div className="grid grid-cols-3  md:grid-cols-6 gap-2">
              {wardList.map((w) => (
                <div
                  key={w.id}
                  onClick={() => setForm({ ...form, ward: w.name })}
                  className={`p-1 border rounded-lg text-center cursor-pointer transition-all ${form.ward === w.name ? "bg-indigo-600 border-indigo-600 text-white" : "bg-white hover:border-indigo-500 text-slate-800"}`}
                >
                  <p className="md:text-[12px] text-[11px]  tracking-wider">
                    {w.name}
                  </p>
                  <p className="md:text-[12px] md:text-sm text-[11px] tracking-wider">
                    {w.bn_name}
                  </p>
                </div>
              ))}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-indigo-100 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            {isSubmitting ? "Transmitting..." : "Complete Purchase"}{" "}
            <FiChevronRight />
          </button>
        </div>
      </form>
    </div>
  );
}
