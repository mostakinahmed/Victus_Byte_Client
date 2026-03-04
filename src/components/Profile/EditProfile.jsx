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
      <h2 className="text-lg font-bold text-gray-800 mb-6 border-b pb-2 uppercase tracking-tight">
        Edit Profile
      </h2>

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
        <div className="flex items-center gap-4 mt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#1976d2] text-white md:px-10 px-5 py-3 rounded font-semibold  text-xs uppercase tracking-widest hover:bg-[#1565c0] transition-all shadow-lg shadow-blue-100 active:scale-95 disabled:bg-slate-300 disabled:cursor-not-allowed"
          >
            {loading ? "Processing..." : "Save Changes"}
          </button>

          <AnimatePresence>
            {showSuccessTag && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-2 text-emerald-600 font-bold text-[11px] uppercase tracking-widest"
              >
                <FiCheckCircle className="text-base" />
                <span>Data Updated</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
