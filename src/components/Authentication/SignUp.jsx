import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context Api/AuthContext";

const SignUp = () => {
  const { checkUserStatus } = useAuth();
  const navigate = useNavigate();
  const topRef = useRef(null); // Reference to force top position

  const [step, setStep] = useState(1); // 1 = Signup Form, 2 = OTP Form
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });
  const [timer, setTimer] = useState(30);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
  });

  // --- FORCE TOP POSITION ON STEP CHANGE ---
  useEffect(() => {
    if (topRef.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [step, verified]);

  // --- RESEND TIMER ---
  useEffect(() => {
    let interval = null;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleChange = (e) => {
    // Only allow 11 digits for phone
    if (e.target.id === "phone") {
      const val = e.target.value.replace(/\D/g, "").slice(0, 11);
      setFormData({ ...formData, phone: val });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    if (statusMsg.text) setStatusMsg({ type: "", text: "" });
  };

  const handleSignUpSubmit = async (e) => {
    e?.preventDefault();
    if (formData.phone.length !== 11) {
      setStatusMsg({ type: "error", text: "Phone must be 11 digits" });
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
      setStatusMsg({
        type: "error",
        text: error.response?.data?.message || "Something went wrong",
      });
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
      setStatusMsg({ type: "error", text: "Invalid Code. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={topRef}
      className="max-w-[1400px] font-sans lg:mt-[80px] mt-[47px] px-2 lg:px-4 mx-auto md:py-6 py-3"
    >
      <style>{`
        /* Prevent mobile auto-zoom */
        input { font-size: 16px !important; }
        .btn-loader { width: 20px; height: 20px; border: 3px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: #fff; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .otp-input-mobile { font-size: 24px !important; letter-spacing: 1.2rem; }
        @media (min-width: 768px) { .otp-input-mobile { font-size: 36px !important; letter-spacing: 1.7rem; } }
      `}</style>

      <div className="bg-white p-6 flex w-full justify-center shadow rounded min-h-[calc(100vh-12rem)]">
        <div className="lg:mt-[20px] rounded w-full max-w-md p-4 sm:p-10">
          {!verified && (
            <h1 className="text-center text-xl mb-10">
              {step === 1 ? "SignUp to " : "Verify "}
              <span className="text-[#fe741d] text-2xl font-bold">
                Victus <span className="text-black">Byte</span>
              </span>
            </h1>
          )}

          {statusMsg.text && !verified && (
            <div
              className={`mb-4 p-3 rounded text-sm text-center font-medium ${statusMsg.type === "error" ? "bg-red-50 text-red-600 border border-red-200" : "bg-green-50 text-green-600 border border-green-200"}`}
            >
              {statusMsg.text}
            </div>
          )}

          {verified ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="bg-green-100 p-5 rounded-full mb-4 animate-bounce">
                <svg
                  className="w-16 h-16 text-green-600"
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
              <p className="text-gray-500 mt-2 font-medium">
                Redirecting to Victus Byte...
              </p>
            </div>
          ) : (
            <>
              {step === 1 && (
                <form className="space-y-4" onSubmit={handleSignUpSubmit}>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter Full Name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe741d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter Email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe741d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="text"
                      inputMode="numeric"
                      placeholder="017XXXXXXXX"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe741d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter Password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#fe741d] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 flex items-center justify-center bg-[#fe741d] uppercase text-white font-bold rounded-lg hover:bg-[#f5640a] transition-all active:scale-95 disabled:bg-gray-400 mt-4"
                  >
                    {loading ? (
                      <div className="btn-loader"></div>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </form>
              )}

              {step === 2 && (
                <form
                  className="space-y-8 w-full animate-in fade-in duration-500"
                  onSubmit={handleVerifyOTP}
                >
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-800">
                      Check your phone
                    </h3>
                    <p className="text-sm text-gray-500">
                      Waiting for code sent to{" "}
                      <span className="text-black font-semibold">
                        {formData.phone}
                      </span>
                    </p>
                  </div>

                  <div className="relative">
                    <input
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      maxLength="6"
                      required
                      autoFocus
                      value={formData.otp}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border-b-4 border-gray-200 py-4 text-center otp-input-mobile font-black text-[#fe741d] focus:border-[#fe741d] focus:bg-orange-50 outline-none transition-all rounded-t-lg"
                    />
                    <div className="flex justify-between px-2 mt-2">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 w-8 rounded-full transition-all duration-300 ${formData.otp.length >= i ? "bg-[#fe741d]" : "bg-gray-200"}`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-black text-white font-bold rounded-xl shadow-lg hover:bg-gray-900 active:scale-95 transition-all flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="btn-loader"></div>
                    ) : (
                      "ACTIVATE ACCOUNT"
                    )}
                  </button>

                  <div className="text-center space-y-3">
                    {timer > 0 ? (
                      <p className="text-sm text-gray-400 font-medium">
                        Resend in{" "}
                        <span className="text-[#fe741d] font-mono">
                          {timer}s
                        </span>
                      </p>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          handleSignUpSubmit();
                          setTimer(30);
                        }}
                        className="text-[#fe741d] font-bold text-sm hover:underline"
                      >
                        Resend Code Now
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="block w-full text-[10px] text-gray-400 uppercase tracking-widest font-bold hover:text-black"
                    >
                      ← Change Phone Number
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {!verified && step === 1 && (
            <div className="mt-8 text-center border-t border-gray-50 pt-6">
              <p className="text-gray-500 text-sm font-light">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/signin")}
                  className="ml-1.5 font-bold text-[#fe741d] cursor-pointer relative inline-block group"
                >
                  Sign in
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#fe741d] transition-all duration-300 group-hover:w-full"></span>
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
