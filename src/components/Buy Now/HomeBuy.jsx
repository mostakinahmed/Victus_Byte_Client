"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiTruck,
  FiPackage,
  FiMap,
  FiChevronRight,
} from "react-icons/fi";

export function HomeBuy({ data }) {
  const [divList, setDiv] = useState([]);
  const [disList, setDis] = useState([]);
  const [upazilaList, setUpazila] = useState([]);
  const [finalDisList, setFinalDis] = useState([]);
  const [finalUpaList, setFinalUpaList] = useState([]);
  const [wardList, setWardList] = useState([]);

  // Customer Form State
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    division: "",
    district: "",
    upazila: "",
    postal: "",
  });

  //api for division and district
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
        console.error("Failed to fetch data", err);
      }
    };

    fetchData();
  }, []); // run once on mount

  //ward list
  useEffect(() => {
    if (!form.upazila) return; // skip if empty

    const fetchDataWard = async () => {
      try {
        const WardRes = await axios.get(
          `https://bdopenapi.vercel.app/api/geo/unions/${form.upazila}`
        );
        setWardList(WardRes.data.data);
      } catch (err) {
        console.error("Failed to fetch data", err);
      }
    };

    fetchDataWard();
  }, [form.upazila]);

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(
      `Order placed!\n\nCustomer: ${form.name}\nProducts: ${data.length} items`
    );
  };

  //handleDistrict
  const handleDistrict = (divID) => {
    const district = disList.filter((dis) => dis.division_id === divID);
    setFinalDis(district);
  };

  const handleUpazila = (disID) => {
    const upazila = upazilaList.filter((upa) => upa.district_id === disID);
    setFinalUpaList(upazila);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center px-2 lg:px-4 mb-20 animate-in fade-in duration-500">
      {/* --- 1. PRODUCT MANIFEST HEADER --- */}
      <div className="bg-white w-full border border-slate-200 shadow-sm overflow-hidden mb-4">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiPackage className="text-indigo-600" size={18} />
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">
              Order Manifest
            </h2>
          </div>
          <span className="text-[12px] font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-full uppercase">
            {data.length} Items Selected
          </span>
        </div>

        <div className="p-4">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-3">
            {data.map((item, index) => (
              <div
                key={index}
                className="group flex items-center gap-4 p-3 rounded-xl border border-slate-100 bg-slate-50/50 hover:border-indigo-200 hover:bg-white transition-all duration-300 shadow-sm"
              >
                <div className="w-16 h-16 shrink-0 bg-white rounded-lg border border-slate-100 p-1 group-hover:shadow-md transition-all">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="text-xs font-black text-slate-800 truncate uppercase tracking-tighter">
                    {item.name}
                  </h3>
                  <p className="text-indigo-600 text-sm font-black mt-0.5">
                    ৳{item.price.selling}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- 2. CUSTOMER LOGISTICS FORM --- */}
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full border border-slate-200 shadow overflow-hidden"
      >
        <div className="bg-slate-900 px-8 py-6 flex items-center gap-3">
          <div className="p-2 bg-indigo-500 rounded-lg text-white shadow-lg shadow-indigo-500/20">
            <FiTruck size={20} />
          </div>
          <div>
            <h2 className="text-lg font-black text-white tracking-tight">
              Logistics Information
            </h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Enter secure delivery destination
            </p>
          </div>
        </div>

        <div className="p-8 space-y-6">
          {/* Name & Email Group */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Recipient Name
              </label>
              <div className="relative group">
                <FiUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="text"
                  placeholder="e.g. Mostakin Ahmed"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">
                Contact Email
              </label>
              <div className="relative group">
                <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                <input
                  type="email"
                  placeholder="email@example.com"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">
               Phone Number
            </label>
            <div className="relative group">
              <FiPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
              <input
                type="tel"
                placeholder="+880 1XXX XXXXXX"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all tracking-tighter"
              />
            </div>
          </div>

          {/* Address Textarea */}
          <div className="space-y-1.5">
            <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Delivery Destination
            </label>
            <div className="relative group">
              <FiMapPin className="absolute left-3.5 top-4 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
              <textarea
                placeholder="Street Address, Apartment, House No..."
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all h-24 leading-relaxed"
              />
            </div>
          </div>

          {/* Geographical Selectors */}
          <div className="space-y-1.5 pt-2">
            <label className="text-[12px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-1">
              <FiMap size={10} /> Territory Mapping
            </label>
            <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
              {/* Division */}
              <select
                className="bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 cursor-pointer focus:border-indigo-500 outline-none"
                required
                value={form.division}
                onChange={(e) => {
                  setWardList([]);
                  const divId = e.target.value;
                  handleDistrict(divId);
                  setForm({
                    ...form,
                    division: divId,
                    district: "",
                    upazila: "",
                  });
                }}
              >
                <option value="">Select Division</option>
                {divList.map((div) => (
                  <option key={div.id} value={div.id}>
                    {div.name} / {div.bn_name}
                  </option>
                ))}
              </select>

              {/* District */}
              <select
                className="bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 cursor-pointer disabled:opacity-50"
                required
                value={form.district}
                onChange={(e) => {
                  setWardList([]);
                  const disId = e.target.value;
                  handleUpazila(disId);
                  setForm({ ...form, district: disId, upazila: "" });
                }}
                disabled={!form.division}
              >
                <option value="">Select District</option>
                {finalDisList.map((dis) => (
                  <option key={dis.id} value={dis.id}>
                    {dis.name} / {dis.bn_name}
                  </option>
                ))}
              </select>

              {/* Upazila */}
              <select
                className="bg-white border border-slate-200 rounded-xl p-3 text-sm font-bold text-slate-700 cursor-pointer disabled:opacity-50"
                required
                value={form.upazila}
                onChange={(e) => {
                  setWardList([]);
                  setForm({ ...form, upazila: e.target.value });
                }}
                disabled={!form.district}
              >
                <option value="">Select Upazila</option>
                {finalUpaList.map((upa) => (
                  <option key={upa.id} value={upa.id}>
                    {upa.name} / {upa.bn_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Ward Selection Chips */}
          {wardList?.length > 0 && (
            <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
              <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest ml-1">
                Select Delivery Ward
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {wardList.map((item) => (
                  <div
                    key={item.id}
                    className="group bg-white border border-slate-200 cursor-pointer rounded-xl p-2 text-center transition-all hover:bg-indigo-600 hover:border-indigo-600 group active:scale-95"
                  >
                    <p className="text-xs font-black text-slate-700 group-hover:text-white transition-colors">
                      {item.name}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 group-hover:text-white/80 transition-colors uppercase">
                      {item.bn_name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Finalize & Place Order <FiChevronRight size={18} />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
