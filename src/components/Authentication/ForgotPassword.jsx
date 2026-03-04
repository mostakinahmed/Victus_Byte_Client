import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  // --- STATE ---
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");
  const [timer, setTimer] = useState(30);
  const [showPassword, setShowPassword] = useState(false);

  const [userData, setUserData] = useState({ name: "", image: "", phone: "" });
  const [formData, setFormData] = useState({
    phone: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  // --- UI HELPERS: MOBILE-ONLY SCROLL ---
  useEffect(() => {
    // Only scroll if on mobile (screen width < 768px)
    const isMobile = window.innerWidth < 768;

    if (isMobile && cardRef.current && (step > 1 || verified)) {
      const elementTop =
        cardRef.current.getBoundingClientRect().top + window.pageYOffset;
      // Offset of -100px to keep your top-navbar/header visible
      window.scrollTo({ top: elementTop - 100, behavior: "smooth" });
    }
  }, [step, verified]);

  // Resend Timer
  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleChange = (e) => {
    if (e.target.name === "phone") {
      const val = e.target.value.replace(/\D/g, "").slice(0, 11);
      setFormData({ ...formData, phone: val });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    if (errorInfo) setErrorInfo("");
  };

  // --- LOGIC ---
  const handleSearchUser = async (e) => {
    e?.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://api.victusbyte.com/api/customer/forgot-password-search",
        { phone: formData.phone },
      );
      if (res.data.success) {
        setUserData({
          name: res.data.user.userName,
          image: res.data.user.images,
          phone: formData.phone,
        });
        setStep(2);
        setTimer(30);
        console.log(res.data);
      }
    } catch (err) {
      setErrorInfo(err.response?.data?.message || "User not found");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "https://api.victusbyte.com/api/customer/varify-otp",
        { phone: userData.phone, otp: formData.otp, isSignupFlow: false },
      );
      if (res.data.success) setStep(3);
    } catch (err) {
      setErrorInfo("Invalid Code");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setErrorInfo("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        "https://api.victusbyte.com/api/customer/reset-password",
        { phone: userData.phone, password: formData.password },
      );
      if (res.data.success) {
        setVerified(true);
        setTimeout(() => navigate("/signin"), 1500);
      }
    } catch (err) {
      setErrorInfo("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-3 font-sans leading-relaxed">
      <style>{`
        input { font-size: 16px !important; }
        .btn-loader { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: #fff; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="w-full max-w-[400px]">
        <div
          ref={cardRef}
          className="bg-white rounded-lg px-8 pt-10 pb-9 shadow-[0_8px_16px_rgba(0,0,0,0.1)] relative overflow-hidden transition-all duration-300"
        >
          <AnimatePresence mode="wait">
            {verified ? (
              <motion.div
                key="verified"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-6"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-green-500">
                  <svg
                    className="w-12 h-12 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Updated!</h2>
                <p className="text-gray-500 mt-1">Taking you to login...</p>
              </motion.div>
            ) : (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-center mb-8">
                  {step === 3 ? (
                    <div className="flex  flex-col items-center">
                      <img
                        src={
                          userData.images ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        className="w-20 h-20 rounded-full border-4 border-[#1976d2] mb-3 object-cover shadow-md"
                        alt="User"
                      />
                      <h2 className="text-[#212121] md:text-xl font-bold uppercase tracking-tight">
                        Welcome, {userData.name}
                      </h2>
                      <p className="text-[#757575] text-sm">
                        Set your new password
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-center mb-4">
                        <div className="relative w-12 h-12 bg-[#1976d2] rounded-full flex items-center justify-center">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                            />
                          </svg>
                        </div>
                      </div>
                      <h2 className="text-[#212121] text-2xl font-normal tracking-[0.15px]">
                        {step === 1 ? "Forgot Password" : "Verification"}
                      </h2>
                    </>
                  )}
                </div>

                <form
                  onSubmit={
                    step === 1
                      ? handleSearchUser
                      : step === 2
                        ? handleVerifyOTP
                        : handleResetPassword
                  }
                  className="space-y-6"
                >
                  {step === 1 && (
                    <div className="relative group">
                      <input
                        type="text"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="peer w-full bg-transparent border-b-2 border-[#e0e0e0] py-3 text-base outline-none transition-colors focus:border-[#1976d2] relative z-10"
                        placeholder=" "
                      />
                      <label className="absolute left-0 top-3 text-[#757575] text-base transition-all duration-200 pointer-events-none origin-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#1976d2] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 z-20">
                        Phone Number
                      </label>
                      <div className="absolute bottom-0 left-0 h-0.5 bg-[#1976d2] w-0 transition-all duration-300 peer-focus:w-full z-20"></div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="text-center">
                      <p className="text-xs text-[#757575] mb-6">
                        Enter code sent to{" "}
                        <b className="text-black">{userData.phone}</b>
                      </p>
                      <input
                        type="text"
                        name="otp"
                        maxLength="6"
                        required
                        autoFocus
                        value={formData.otp}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-[#1976d2] py-2 text-center text-4xl tracking-[0.5em] font-bold outline-none text-[#1976d2]"
                        placeholder="000000"
                      />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div className="relative group">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          required
                          value={formData.password}
                          onChange={handleChange}
                          className="peer w-full bg-transparent border-b-2 border-[#e0e0e0] py-3 text-base outline-none transition-colors focus:border-[#1976d2] relative z-10"
                          placeholder=" "
                        />
                        <label className="absolute left-0 top-3 text-[#757575] text-base transition-all duration-200 pointer-events-none origin-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#1976d2] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 z-20">
                          New Password
                        </label>
                        <div className="absolute bottom-0 left-0 h-0.5 bg-[#1976d2] w-0 transition-all duration-300 peer-focus:w-full z-20"></div>
                      </div>
                      <div className="relative group">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="confirmPassword"
                          required
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          className="peer w-full bg-transparent border-b-2 border-[#e0e0e0] py-3 text-base outline-none transition-colors focus:border-[#1976d2] relative z-10"
                          placeholder=" "
                        />
                        <label className="absolute left-0 top-3 text-[#757575] text-base transition-all duration-200 pointer-events-none origin-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#1976d2] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 z-20">
                          Confirm Password
                        </label>
                        <div className="absolute bottom-0 left-0 h-0.5 bg-[#1976d2] w-0 transition-all duration-300 peer-focus:w-full z-20"></div>
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    {errorInfo && (
                      <div className="text-red-500 text-[10px] font-bold uppercase text-center mb-4">
                        {errorInfo}
                      </div>
                    )}
                    <button
                      disabled={loading}
                      className="w-full bg-[#1976d2] text-white py-3 rounded shadow-md hover:bg-[#1565c0] active:scale-95 transition-all uppercase font-medium tracking-wider flex items-center justify-center min-h-[48px]"
                    >
                      {loading ? (
                        <div className="btn-loader" />
                      ) : step === 1 ? (
                        "Search User"
                      ) : step === 2 ? (
                        "Verify OTP"
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {!verified && (
            <div className="mt-8 text-center pt-6 border-t border-[#f0f0f0]">
              <p className="text-gray-500 text-sm">
                Remembered password?{" "}
                <span
                  onClick={() => navigate("/signin")}
                  className="ml-1 font-bold text-[#1976d2] cursor-pointer hover:underline"
                >
                  Sign in
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
