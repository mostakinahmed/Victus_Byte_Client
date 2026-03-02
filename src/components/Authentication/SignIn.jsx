import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../Context Api/AuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { checkUserStatus } = useAuth();

  const [formData, setFormData] = useState({ phone: "", password: "" });
  const [error, setError] = useState("");
  // New Loading State
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true); // Start Spinner

    // 1. Check if the length is exactly 11
    if (formData.phone.length > 0 && formData.phone.length < 11) {
      setError("Phone number must be exactly 11 digits.");
      setIsSubmitting(false);
      return; // Stops the function here
    }

    // Matches: Starts with 01, total 11 digits
    const bdPhoneRegex = /^01[3-9]\d{8}$/;

    if (!bdPhoneRegex.test(formData.phone)) {
      setError(
        "Please enter a valid 11-digit Bangladeshi phone number (e.g., 017xxxxxxxx).",
      );
      setIsSubmitting(false);
      return; // STOP here, do not hit backend
    }

    try {
      const res = await axios.post("/api/customer/signin", formData);
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
    <div className="max-w-[1400px] lg:mt-[80px] mt-[47px] px-2 lg:px-4 mx-auto md:py-6 py-3">
      <div className="bg-white p-6 flex w-full justify-center shadow rounded min-h-[calc(100vh-5rem)]">
        <div className="lg:mt-[20px] rounded w-md p-6 sm:p-10">
          <h1 className="text-center text-xl mb-15">
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
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="01xxxxxxxxx"
                required
                className={`w-full p-2 border rounded focus:ring-2 focus:ring-[#fe741d] outline-none transition-all ${
                  error ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
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
                className={`w-full p-2 border rounded focus:ring-2 focus:ring-[#fe741d] outline-none transition-all ${
                  error ? "border-red-500 bg-red-50" : "border-gray-300"
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting} // Prevent clicking while loading
              className="w-full p-3 bg-[#fe741d] text-white font-semibold rounded hover:bg-[#f5640a] transition-all active:scale-95 disabled:bg-orange-300 disabled:cursor-not-allowed flex justify-center items-center"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-3 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  SIGNING IN...
                </>
              ) : (
                "SIGN IN"
              )}
            </button>
          </form>

          <p className="text-center mt-5 text-sm text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-[#fe741d] cursor-pointer hover:underline"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
