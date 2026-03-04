import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion"; // Use for the side animation
import { FiCheckCircle } from "react-icons/fi";

function EditProfile({ data, checkUserStatus }) {
  const [formData, setFormData] = useState({
    userName: data?.userName || "",
    email: data?.email || "",
    gender: data?.gender || "",
  });

  const [loading, setLoading] = useState(false);
  const [showSuccessTag, setShowSuccessTag] = useState(false); // New state for inline notification

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowSuccessTag(false); // Reset tag before starting

    try {
      const res = await axios.post(
        "https://api.victusbyte.com/api/customer/update",
        formData,
        { withCredentials: true },
      );

      if (res.data.success) {
        await checkUserStatus(); // Refresh global data
        toast.success(res.data.message);

        // Show the side notification
        setShowSuccessTag(true);

        // Hide it automatically after 3 seconds
        setTimeout(() => setShowSuccessTag(false), 3000);
      }
    } catch (error) {
      console.error("Update failed:", error.response?.data?.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-300">
      <div className="relative mb-8">
        <h2 className="text-[14px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3">
          {/* Blue accent line */}
          <span className="w-1.5 h-5 bg-[#1976d2] rounded-full"></span>
          Edit Profile
        </h2>
        {/* Elegant thin border with a gradient feel */}
        <div className="mt-3 w-full h-[1px] bg-linear-to-r from-slate-200 via-slate-100 to-transparent"></div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* ... Inputs remain the same ... */}
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">
              Full Name
            </label>
            <input
              name="userName"
              type="text"
              className="w-full border-b-2 border-gray-100 p-2 outline-none focus:border-[#1976d2] transition-colors font-medium text-slate-800"
              value={formData.userName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              className="w-full border-b-2 border-gray-100 p-2 outline-none focus:border-[#1976d2] transition-colors font-medium text-slate-800"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">
              Phone Number
            </label>
            <input
              type="text"
              className="w-full border-b-2 border-gray-100 text-slate-500 p-2 outline-none bg-gray-50/50 cursor-not-allowed font-medium"
              defaultValue={data.phone}
              readOnly
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-100 p-2 outline-none focus:border-[#1976d2] transition-colors font-medium text-slate-800 bg-transparent"
            >
              <option value="" disabled hidden>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* BUTTON SECTION WITH INLINE NOTIFICATION */}
        <div className="relative flex flex-col items-center justify-center md:justify-self-start mt-14">
          {/* Success Tag - Positioned Absolutely */}
          <div className="absolute -top-8 left-0 right-0 flex justify-center h-6">
            <AnimatePresence>
              {showSuccessTag && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2 mb-3 text-emerald-600 font-bold text-[11px] uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100"
                >
                  <FiCheckCircle className="text-sm" />
                  <span>Data Updated</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Button - Now stays in one spot */}
          <button
            type="submit"
            disabled={loading}
            className="bg-[#1976d2] text-white md:px-10 px-5 py-3 rounded font-semibold text-xs uppercase tracking-widest hover:bg-[#1565c0] transition-all shadow-lg shadow-blue-100 active:scale-95 disabled:bg-slate-300 disabled:cursor-not-allowed w-fit"
          >
            {loading ? "Processing..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
