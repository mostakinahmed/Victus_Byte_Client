import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context Api/AuthContext";

const SignUp = () => {
  const { checkUserStatus } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = Signup Form, 2 = OTP Form
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    otp: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (statusMsg.text) setStatusMsg({ type: "", text: "" });
  };

  // --- STEP 1: SUBMIT SIGNUP ---
  const handleSignUpSubmit = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setStatusMsg({ type: "", text: "" });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/customer/signup",
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

  // --- STEP 2: VERIFY OTP ---
  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/customer/varify-otp",
        { phone: formData.phone, otp: formData.otp },
        { withCredentials: true }, // THIS IS MANDATORY
      );

      if (response.data.success) {
        await checkUserStatus();
        console.log(response.data);

        setVerified(true);
        setTimeout(() => navigate("/"), 1000);
      }
    } catch (error) {
      setStatusMsg({ type: "error", text: "Invalid Code. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  //resend wait
  const [timer, setTimer] = useState(30); // Initial 30s wait

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

  return (
    <div className="max-w-[1400px] lg:mt-[80px] mt-[47px] px-2 lg:px-4 mx-auto md:py-6 py-3">
      {/* CSS for the Loader */}
      <style>{`
        .btn-loader { width: 20px; height: 20px; border: 3px solid rgba(255,255,255,0.3); border-radius: 50%; border-top-color: #fff; animation: spin 0.8s linear infinite; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      <div className="bg-white p-6 flex w-full justify-center shadow rounded min-h-[calc(100vh-10rem)]">
        <div className="lg:mt-[20px] rounded w-full max-w-md p-6 sm:p-10">
          {/* LOGO / HEADER (Hidden if verified) */}
          {!verified && (
            <h1 className="text-center text-xl mb-10">
              {step === 1 ? "SignUp to " : "Verify "}
              <span className="text-[#fe741d] text-2xl font-bold">
                Victus <span className="text-black">Byte</span>
              </span>
            </h1>
          )}

          {/* STATUS MESSAGE */}
          {statusMsg.text && !verified && (
            <div
              className={`mb-4 p-3 rounded text-sm text-center font-medium ${
                statusMsg.type === "error"
                  ? "bg-red-50 text-red-600 border border-red-200"
                  : "bg-green-50 text-green-600 border border-green-200"
              }`}
            >
              {statusMsg.text}
            </div>
          )}

          {/* --- VIEW 3: SUCCESS REDIRECT --- */}
          {verified ? (
            <div className="flex flex-col items-center justify-center py-10 animate-in zoom-in duration-500 text-center">
              <div className="bg-green-100 p-5 rounded-full mb-4">
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
                  ></path>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Verified!</h2>
              <p className="text-gray-500 mt-2 font-medium">
                Redirecting to Victus Byte...
              </p>
            </div>
          ) : (
            <>
              {/* --- VIEW 1: PREVIOUS SIGNUP DESIGN --- */}
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
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#fe741d] outline-none"
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
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#fe741d] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-gray-700">
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="text"
                      placeholder="017XXXXXXXX"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#fe741d] outline-none"
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
                      className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-[#fe741d] outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 flex items-center justify-center bg-[#fe741d] uppercase text-white font-semibold rounded hover:bg-[#f5640a] transition-transform duration-300 disabled:bg-gray-400"
                  >
                    {loading ? <div className="btn-loader"></div> : "Create Account"}
                  </button>
                </form>
              )}

              {/* --- VIEW 2: OTP VERIFICATION --- */}
              {step === 2 && (
                <form
                  className="space-y-8 animate-in zoom-in duration-300 w-full"
                  onSubmit={handleVerifyOTP}
                >
                  <div className="text-center w-full">
                    <div className="inline-block p-4 rounded-full bg-orange-50 mb-4  shadow-inner animate-wobble">
                      <svg
                        className="w-8 h-8 text-[#fe741d] drop-shadow-sm"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>

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

                  <div className="relative group">
                    {/* Individual Box Underline Design */}
                    <input
                      id="otp"
                      type="text"
                      maxLength="6"
                      placeholder="      "
                      required
                      autoFocus
                      value={formData.otp}
                      onChange={handleChange}
                      className="w-full bg-slate-100 border-b-4 border-gray-200 py-4 text-center md:text-4xl pl-3 md:pl-4 text-3xl tracking-[1.3rem] md:tracking-[1.7rem] font-black text-[#fe741d] focus:border-[#fe741d] focus:bg-orange-50/50 outline-none transition-all duration-300 rounded-t-lg"
                    />
                    <div className="flex justify-between px-2 mt-1">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                          key={i}
                          className={`h-1 w-8 rounded-full ${formData.otp.length >= i ? "bg-[#fe741d]" : "bg-gray-200"}`}
                        ></div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 flex items-center justify-center bg-black text-white font-bold rounded-2xl shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300"
                  >
                    {loading ? (
                      <div className="btn-loader"></div>
                    ) : (
                      "ACTIVATE ACCOUNT"
                    )}
                  </button>

                  <div className="text-center space-y-2">
                    <div className="text-sm">
                      {timer > 0 ? (
                        <p className="text-gray-400">
                          Resend code in{" "}
                          <span className="text-[#fe741d] font-mono font-bold">
                            {timer}s
                          </span>
                        </p>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            handleSignUpSubmit(); // Resends the OTP
                            setTimer(30); // Resets the clock
                          }}
                          className="text-[#fe741d] font-bold hover:underline decoration-2 underline-offset-4"
                        >
                          Resend Code Now
                        </button>
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-[10px] text-gray-500 hover:text-black uppercase font-black tracking-widest transition-colors"
                    >
                      ← Wrong Number? Change it
                    </button>
                  </div>
                </form>
              )}
            </>
          )}

          {/* FOOTER (Hidden if verified) */}
          {!verified && step === 1 && (
            <p className="text-center mt-5 text-sm text-gray-600">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/signin")}
                className="text-[#fe741d] cursor-pointer hover:underline"
              >
                Sign in
              </span>
            </p>
          )}

          {!verified && (
            <p className="text-center text-gray-500 text-xs mt-6">
              By continuing, you agree to our{" "}
              <a href="#" className="text-[#fe741d] hover:underline">
                Terms
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#fe741d] hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
