import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context Api/AuthContext";
import { motion } from "framer-motion";

const SignIn = () => {
  const navigate = useNavigate();
  const { checkUserStatus } = useAuth();
  const topRef = useRef(null);

  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --- Force top position on load ---
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // --- Mobile Scroll Fix: Snap back to top when keyboard closes ---
  const handleMobileScrollFix = () => {
    setTimeout(() => {
      if (topRef.current) {
        topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleChange = (e) => {
    if (e.target.name === "phone") {
      const val = e.target.value.replace(/\D/g, "").slice(0, 11);
      setFormData({ ...formData, phone: val });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    // Bangladeshi Phone Validation
    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(formData.phone)) {
      setError("Please enter a valid 11-digit phone number");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://api.victusbyte.com/api/customer/signin",
        formData,
        { withCredentials: true }
      );
      if (res.data.success) {
        await checkUserStatus();
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={topRef} className="min-h-screen bg-[#fafafa] flex items-center justify-center p-5 font-sans leading-relaxed">
      <style>{`
        input { font-size: 16px !important; }
        .btn-loader { width: 20px; height: 20px; border: 3px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: #fff; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="w-full max-w-[400px]">
        <div className="bg-white rounded-lg px-10 pt-12 pb-9 shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.12),0_12_28px_rgba(0,0,0,0.15)] transition-all duration-300 relative overflow-hidden">
          
          {/* LOGO & HEADER */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6 group cursor-pointer">
              <div className="relative w-14 h-14">
                <div className="absolute inset-0 rounded-full bg-[#fe741d] shadow-[0_2px_4px_rgba(254,116,29,0.3)] transition-transform duration-300 group-hover:scale-110"></div>
                <div className="absolute top-2 left-2 w-10 h-10 rounded-full bg-[#f5640a] shadow-[0_1px_3px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-115"></div>
                <div className="absolute top-4 left-4 w-6 h-6 rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.1)] transition-transform duration-300 group-hover:scale-120"></div>
              </div>
            </div>
            <h2 className="text-[#212121] text-2xl font-normal mb-2 tracking-[0.15px]">Sign in</h2>
            <p className="text-[#757575] text-sm">to <span className="text-[#fe741d] font-bold">Victus Byte</span></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* PHONE INPUT */}
            <div className="relative group">
              <input
                type="text"
                name="phone"
                inputMode="numeric"
                required
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleMobileScrollFix}
                className="peer w-full bg-transparent border-b-2 border-[#e0e0e0] py-4 pb-2 text-base outline-none transition-colors focus:border-[#fe741d] z-10 relative"
                placeholder=" "
              />
              <label className="absolute left-0 top-4 text-[#757575] text-base transition-all duration-200 pointer-events-none origin-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#fe741d] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 z-20">
                Phone Number
              </label>
              <div className="absolute bottom-0 left-0 h-0.5 bg-[#fe741d] w-0 transition-all duration-300 peer-focus:w-full z-30"></div>
            </div>

            {/* PASSWORD INPUT */}
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                onBlur={handleMobileScrollFix}
                className="peer w-full bg-transparent border-b-2 border-[#e0e0e0] py-4 pb-2 pr-14 text-base outline-none transition-colors focus:border-[#fe741d] z-10 relative"
                placeholder=" "
              />
              <label className="absolute left-0 top-4 text-[#757575] text-base transition-all duration-200 pointer-events-none origin-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#fe741d] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 z-20">
                Password
              </label>
              
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 text-[#757575] hover:text-[#fe741d] transition-colors z-40"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                )}
              </button>
              <div className="absolute bottom-0 left-0 h-0.5 bg-[#fe741d] w-0 transition-all duration-300 peer-focus:w-full z-30"></div>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[10px] font-bold uppercase tracking-tight">
                {error}
              </motion.div>
            )}

            <button
              disabled={isSubmitting}
              className="w-full bg-[#fe741d] text-white py-3 rounded shadow-[0_2px_4px_rgba(0,0,0,0.2)] hover:bg-[#f5640a] active:scale-95 transition-all uppercase font-medium tracking-wider min-h-[48px] flex items-center justify-center disabled:opacity-50"
            >
              {isSubmitting ? <div className="btn-loader" /> : "Sign In"}
            </button>
          </form>

          <div className="relative text-center my-6 before:content-[''] before:absolute before:top-1/2 before:left-0 before:right-0 before:h-[1px] before:bg-[#e0e0e0] before:-translate-y-1/2">
            <span className="relative bg-white px-4 text-[#757575] text-sm">or</span>
          </div>

          <div className="text-center">
            <p className="text-gray-500 text-sm font-light">
              Don't have an account?{" "}
              <span onClick={() => navigate("/signup")} className="ml-1 font-bold text-[#fe741d] cursor-pointer hover:underline">
                Sign up
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;