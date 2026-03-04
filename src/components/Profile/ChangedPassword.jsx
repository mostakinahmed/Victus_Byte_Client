import axios from "axios";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi";

function ChangedPassword() {
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({ msg: "", type: "" });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visibleFields, setVisibleFields] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const timeoutRefs = useRef({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const fieldId = name.replace("Password", "");
    setPasswords((prev) => ({ ...prev, [name]: value }));

    setVisibleFields((prev) => ({ ...prev, [fieldId]: true }));
    if (timeoutRefs.current[fieldId]) clearTimeout(timeoutRefs.current[fieldId]);
    timeoutRefs.current[fieldId] = setTimeout(() => {
      setVisibleFields((prev) => ({ ...prev, [fieldId]: false }));
    }, 500);
  };

  const toggleManualVisibility = (fieldId) => {
    setVisibleFields((prev) => ({ ...prev, [fieldId]: !prev[fieldId] }));
  };

  const triggerNotification = (msg, type) => {
    setNotification({ msg, type });
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validation Logic (Removed 6 char check)
    if (passwords.newPassword !== passwords.confirmPassword) {
      return triggerNotification("Passwords do not match.", "error");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "https://api.victusbyte.com/api/customer/change-password",
        {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        triggerNotification("Password Changed.", "success");
        setPasswords({ oldPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (error) {
      const message = error.response?.data?.message || "Update Failed.";
      triggerNotification(message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-2 duration-300">
      <h2 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2 uppercase tracking-tight">
        Change Password
      </h2>

      <form onSubmit={handleSubmit} className="max-w-md space-y-6">
        {[
          { id: "old", name: "oldPassword", label: "Current Password" },
          { id: "new", name: "newPassword", label: "New Password" },
          { id: "confirm", name: "confirmPassword", label: "Confirm New Password" },
        ].map((field) => (
          <div key={field.id} className="relative">
            <label className="block text-[10px] font-bold text-gray-400 uppercase mb-1 tracking-widest">
              {field.label}
            </label>
            <div className="relative">
              <input
                name={field.name}
                type={visibleFields[field.id] ? "text" : "password"}
                value={passwords[field.name]}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full border-b-2 border-gray-100 py-2 pr-10 outline-none focus:border-[#1976d2] transition-colors font-medium text-slate-800"
                required
              />
              <button
                type="button"
                onClick={() => toggleManualVisibility(field.id)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#1976d2]"
              >
                {visibleFields[field.id] ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </button>
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4 mt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#1976d2] text-white md:px-10 px-5 py-3 rounded font-semibold text-xs uppercase tracking-widest hover:bg-[#1565c0] transition-all active:scale-95 disabled:bg-slate-300 shadow-lg shadow-blue-100"
          >
            {loading ? "Processing..." : "Change Password"}
          </button>

          <AnimatePresence>
            {showNotification && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className={`flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest ${
                  notification.type === "success" ? "text-emerald-600" : "text-rose-500"
                }`}
              >
                {notification.type === "success" ? <FiCheckCircle /> : <FiAlertCircle />}
                <span>{notification.msg}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </div>
  );
}

export default ChangedPassword;