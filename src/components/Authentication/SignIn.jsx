import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context Api/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { checkUserStatus } = useAuth();
  const topRef = useRef(null); // Reference to force top position

  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- FORCE TOP POSITION ON MOUNT ---
  useEffect(() => {
    if (topRef.current) {
      window.scrollTo({ top: 0, behavior: "instant" });
      topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const handleChange = (e) => {
    // Only allow digits for phone to keep numeric keyboard clean
    if (e.target.id === "phone") {
      const val = e.target.value.replace(/\D/g, "").slice(0, 11);
      setFormData({ ...formData, phone: val });
    } else {
      setFormData({ ...formData, [e.target.id]: e.target.value });
    }
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (formData.phone.length > 0 && formData.phone.length < 11) {
      setError("Phone number must be exactly 11 digits.");
      setIsSubmitting(false);
      return;
    }

    const bdPhoneRegex = /^01[3-9]\d{8}$/;
    if (!bdPhoneRegex.test(formData.phone)) {
      setError("Please enter a valid 11-digit Bangladeshi phone number.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await axios.post(
        "https://api.victusbyte.com/api/customer/signin",
        formData,
        { withCredentials: true },
      );
      if (res.data.success) {
        await checkUserStatus();
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid phone or password");
    } finally {
      setIsSubmitting(false);
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
      `}</style>

      <div className="bg-white p-6 flex w-full justify-center shadow rounded min-h-[calc(100vh-12rem)]">
        <div className="lg:mt-[20px] rounded w-full max-w-md p-4 sm:p-10">
          <h1 className="text-center text-xl mb-10">
            Login to{" "}
            <span className="text-[#fe741d] text-2xl font-bold">
              Victus <span className="text-black">Byte</span>
            </span>
          </h1>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-4">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <div>
              <label
                htmlFor="phone"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                type="text"
                inputMode="numeric"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01xxxxxxxxx"
                required
                className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-[#fe741d] outline-none transition-all ${
                  error ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Password"
                required
                className={`w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-[#fe741d] outline-none transition-all ${
                  error ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              />
              <div className="flex justify-end mt-2">
                <span
                  onClick={() => navigate("/forgot-password")}
                  className="text-xs text-gray-400 hover:text-[#fe741d] cursor-pointer transition-colors duration-300 italic"
                >
                  Forgot Password?
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 flex items-center justify-center bg-[#fe741d] uppercase text-white font-bold rounded-lg hover:bg-[#f5640a] transition-all active:scale-95 disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
            >
              {isSubmitting ? <div className="btn-loader"></div> : "SIGN IN"}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-gray-50 pt-6">
            <p className="text-gray-500 text-sm font-light">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="ml-1.5 font-bold text-[#fe741d] cursor-pointer relative inline-block group"
              >
                Sign up
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#fe741d] transition-all duration-300 group-hover:w-full"></span>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
