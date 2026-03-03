import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context Api/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function SignUp() {
  const { checkUserStatus } = useAuth();
  const navigate = useNavigate();
  const topRef = useRef(null);

  // --- STATE ---
  const [step, setStep] = useState(1); // 1 = Signup, 2 = OTP
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [errorInfo, setErrorInfo] = useState("");
  const [timer, setTimer] = useState(30);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
  });

  const handleMobileScrollFix = () => {
    // Only execute if the screen width is less than 768px (Mobile)
    if (window.innerWidth < 768) {
      setTimeout(() => {
        if (topRef.current) {
          topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  // --- UI HELPERS ---
  useEffect(() => {
    // Only force top position on mobile devices
    if (window.innerWidth < 768 && topRef.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step, verified]);

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
  const handleSignUpSubmit = async (e) => {
    e?.preventDefault();
    if (formData.phone.length !== 11) {
      setErrorInfo("Phone must be 11 digits");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.victusbyte.com/api/customer/signup",
        {
          userName: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        },
        { withCredentials: true },
      );
      if (response.data.success) {
        setStep(2);
        setTimer(30);
      }
    } catch (error) {
      setErrorInfo(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.victusbyte.com/api/customer/varify-otp",
        { phone: formData.phone, otp: formData.otp },
        { withCredentials: true },
      );
      if (response.data.success) {
        await checkUserStatus();
        setVerified(true);
        setTimeout(() => navigate("/"), 1500);
      }
    } catch (error) {
      setErrorInfo("Invalid Code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={topRef}
      className="min-h-screen bg-[#fafafa] flex items-center justify-center p-5 font-sans leading-relaxed"
    >
      <style>{`
        input { font-size: 16px !important; }
        .btn-loader { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: #fff; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="w-full max-w-[400px]">
        <div className="bg-white rounded-lg px-8 pt-10 pb-9 shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.1)] relative overflow-hidden transition-all duration-300">
          {/* HEADER */}
          {!verified && (
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4 group cursor-pointer">
                <div className="relative w-12 h-12">
                  <div className="absolute inset-0 rounded-full bg-[#1976d2] shadow-[0_2px_4px_rgba(25,118,210,0.3)] transition-transform duration-300 group-hover:scale-110"></div>
                  <div className="absolute top-1.5 left-1.5 w-9 h-9 rounded-full bg-[#2196f3] shadow-[0_1px_3px_rgba(0,0,0,0.1)]"></div>
                </div>
              </div>
              <h2 className="text-[#212121] text-2xl font-normal tracking-[0.15px]">
                {step === 1 ? "Create Account" : "Verify Phone"}
              </h2>
              <p className="text-[#757575] text-sm mt-1">
                to join{" "}
                <span className="text-[#1976d2] font-semibold">
                  Victus Byte
                </span>
              </p>
            </div>
          )}

          {verified ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
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
              <h2 className="text-2xl font-bold text-gray-800">Verified!</h2>
              <p className="text-gray-500 mt-1">Taking you home...</p>
            </motion.div>
          ) : (
            <form
              onSubmit={step === 1 ? handleSignUpSubmit : handleVerifyOTP}
              className="space-y-6"
            >
              {step === 1 ? (
                <>
                  {/* FULL NAME */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="peer w-full bg-transparent border-b-2 border-[#e0e0e0] py-3 text-base outline-none transition-colors focus:border-[#1976d2] relative z-10"
                      placeholder=" "
                    />
                    <label className="absolute left-0 top-3 text-[#757575] text-base transition-all duration-200 pointer-events-none origin-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#1976d2] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 z-20">
                      Full Name
                    </label>
                    <div className="absolute bottom-0 left-0 h-0.5 bg-[#1976d2] w-0 transition-all duration-300 peer-focus:w-full z-30"></div>
                  </div>

                  {/* EMAIL */}
                  <div className="relative group">
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="peer w-full bg-transparent border-b-2 border-[#e0e0e0] py-3 text-base outline-none transition-colors focus:border-[#1976d2] relative z-10"
                      placeholder=" "
                    />
                    <label className="absolute left-0 top-3 text-[#757575] text-base transition-all duration-200 pointer-events-none origin-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#1976d2] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 z-20">
                      Email
                    </label>
                    <div className="absolute bottom-0 left-0 h-0.5 bg-[#1976d2] w-0 transition-all duration-300 peer-focus:w-full z-30"></div>
                  </div>

                  {/* PHONE */}
                  <div className="relative group">
                    <input
                      type="text"
                      name="phone"
                      inputMode="numeric"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="peer w-full bg-transparent border-b-2 border-[#e0e0e0] py-3 text-base outline-none transition-colors focus:border-[#1976d2] relative z-10"
                      placeholder=" "
                    />
                    <label className="absolute left-0 top-3 text-[#757575] text-base transition-all duration-200 pointer-events-none origin-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#1976d2] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 z-20">
                      Phone Number
                    </label>
                    <div className="absolute bottom-0 left-0 h-0.5 bg-[#1976d2] w-0 transition-all duration-300 peer-focus:w-full z-30"></div>
                  </div>

                  {/* PASSWORD */}
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
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-3 text-[#757575] hover:text-[#1976d2] z-40"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                    <div className="absolute bottom-0 left-0 h-0.5 bg-[#1976d2] w-0 transition-all duration-300 peer-focus:w-full z-30"></div>
                  </div>
                </>
              ) : (
                <>
                  {/* OTP INPUT */}
                  <div className="text-center py-2">
                    <p className="text-xs text-[#757575] mb-6">
                      Enter code sent to <b>{formData.phone}</b>
                    </p>
                    <div className="relative">
                      <input
                        type="text"
                        name="otp"
                        maxLength="6"
                        required
                        autoFocus
                        value={formData.otp}
                        onChange={handleChange}
                        className="w-full bg-transparent border-b-2 border-[#1976d2] py-2 text-center text-3xl tracking-[0.5em] font-bold outline-none text-[#1976d2]"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* ERROR INFO */}
              <AnimatePresence>
                {errorInfo && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-[10px] font-bold uppercase text-center"
                  >
                    {errorInfo}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* SUBMIT BUTTON */}
              <button
                disabled={loading}
                className="w-full bg-[#1976d2] text-white py-3 rounded shadow-md hover:bg-[#1565c0] active:scale-95 transition-all uppercase font-medium tracking-wider flex items-center justify-center disabled:opacity-50"
              >
                {loading ? (
                  <div className="btn-loader" />
                ) : step === 1 ? (
                  "Create Account"
                ) : (
                  "Activate"
                )}
              </button>

              {/* RESEND / BACK ACTIONS */}
              {step === 2 && (
                <div className="text-center space-y-3 pt-2">
                  {timer > 0 ? (
                    <p className="text-xs text-gray-400">
                      Resend in{" "}
                      <span className="font-mono text-[#1976d2]">{timer}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleSignUpSubmit}
                      className="text-xs text-[#1976d2] font-bold hover:underline"
                    >
                      Resend OTP Now
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="block w-full text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-black"
                  >
                    ← Change Details
                  </button>
                </div>
              )}
            </form>
          )}

          {/* FOOTER */}
          {!verified && step === 1 && (
            <div className="mt-8 text-center pt-6 border-t border-[#f0f0f0]">
              <p className="text-gray-500 text-sm">
                Already have an account?{" "}
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
