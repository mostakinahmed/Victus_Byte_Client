import React, { useState, useEffect, useRef } from "react"; // Added useRef
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context Api/AuthContext";
import { motion, AnimatePresence } from "framer-motion";

export default function SignUp() {
  const { checkUserStatus } = useAuth();
  const navigate = useNavigate();
  const topRef = useRef(null); // Reference for the top of the page

  // --- STATE ---
  const [step, setStep] = useState(1);
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

  // --- FORCE SCROLL TO TOP ON STEP CHANGE ---
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    // If you want it even more precise for the card:
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step, verified]); // Triggers when step changes to 2 or when verified becomes true

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

  const handleSignUpSubmit = async (e) => {
    e?.preventDefault();
    if (formData.phone.length !== 11) {
      setErrorInfo("Phone must be 11 digits");
      return;
    }
    formData.otp = "";
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
      setErrorInfo(error.response?.data?.message || "Check your details");
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
      className="min-h-screen bg-[#fafafa] flex items-center justify-center p-3 px-4 font-sans leading-relaxed"
    >
      <style>{`
        input { font-size: 16px !important; }
        .btn-loader { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: #fff; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        
        input:-webkit-autofill,
        input:-webkit-autofill:hover, 
        input:-webkit-autofill:focus {
          -webkit-text-fill-color: #212121;
          -webkit-box-shadow: 0 0 0px 1000px white inset;
          transition: background-color 5000s ease-in-out 0s;
        }
      `}</style>

      <div className="w-full max-w-[400px]">
        <div className="bg-white rounded-lg px-8 pt-10 pb-9 shadow-[0_2px_4px_rgba(0,0,0,0.1),0_8px_16px_rgba(0,0,0,0.1)] relative overflow-hidden transition-all duration-300">
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
                <h2 className="text-2xl font-bold text-gray-800">Verified!</h2>
                <p className="text-gray-500 mt-1">Taking you home...</p>
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

                <form
                  onSubmit={step === 1 ? handleSignUpSubmit : handleVerifyOTP}
                  className="space-y-6"
                >
                  {step === 1 ? (
                    <div className="space-y-6">
                      {["name", "email", "phone", "password"].map((field) => (
                        <div className="relative group" key={field}>
                          <input
                            type={
                              field === "password"
                                ? showPassword
                                  ? "text"
                                  : "password"
                                : field === "email"
                                  ? "email"
                                  : "text"
                            }
                            name={field}
                            required
                            autoComplete={field === "phone" ? "tel" : field}
                            value={formData[field]}
                            onChange={handleChange}
                            className="peer w-full bg-transparent border-b-2 border-[#e0e0e0] py-3 text-base outline-none transition-colors focus:border-[#1976d2] relative z-10"
                            placeholder=" "
                          />
                          <label className="absolute left-0 top-3 text-[#757575] text-base transition-all duration-200 pointer-events-none origin-left peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-[#1976d2] peer-[:not(:placeholder-shown)]:-translate-y-6 peer-[:not(:placeholder-shown)]:scale-75 z-20">
                            {field === "name"
                              ? "Full Name"
                              : field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          {field === "password" && (
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 text-[#757575] z-30 transition-colors"
                            >
                              {showPassword ? (
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88"
                                  />
                                </svg>
                              ) : (
                                <svg
                                  className="w-5 h-5"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                  />
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                  />
                                </svg>
                              )}
                            </button>
                          )}
                          <div className="absolute bottom-0 left-0 h-0.5 bg-[#1976d2] w-0 transition-all duration-300 peer-focus:w-full z-20"></div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-xs text-[#757575] mb-6 tracking-wide">
                        Enter the 6-digit code sent to <br />
                        <b className="text-black">{formData.phone}</b>
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
                          className="w-full bg-transparent border-b-2 border-[#1976d2] py-2 text-center text-4xl tracking-[0.5em] font-bold outline-none text-[#1976d2] z-10 relative"
                          placeholder="000000"
                        />
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
                      className="w-full bg-[#1976d2] text-white py-3 rounded shadow-md hover:bg-[#1565c0] active:scale-95 transition-all uppercase font-medium tracking-wider flex items-center justify-center disabled:opacity-50 min-h-[48px]"
                    >
                      {loading ? (
                        <div className="btn-loader" />
                      ) : step === 1 ? (
                        "Create Account"
                      ) : (
                        "Activate"
                      )}
                    </button>
                    {step === 2 && (
                      <div className="text-center space-y-3 mt-6">
                        {timer > 0 ? (
                          <p className="text-xs text-gray-400 font-medium tracking-tight">
                            Resend code in{" "}
                            <span className="font-mono text-[#1976d2] font-bold">
                              {timer}s
                            </span>
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
                          className="block w-full text-[10px] text-gray-400 font-bold uppercase tracking-widest hover:text-black transition-colors"
                        >
                          ← Change Details
                        </button>
                      </div>
                    )}
                    {step === 1 && (
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
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
