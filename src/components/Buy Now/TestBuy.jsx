import React, { useState, useEffect, useRef, useContext } from "react";
import { DataContext } from "../Context Api/UserContext";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../Context Api/CartContext";
import axios from "axios";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

// Utility: Generate Professional Unique Order ID (12 Digits)
function generateOrderId() {
  const now = new Date();

  // 1. Today's Date: YYMMDD (6 digits)
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const dateStr = `${year}${month}${day}`;

  // 2. Milliseconds: (4 digits)
  // We take the last 4 digits of the timestamp
  const msStr = now.getTime().toString().slice(-4);

  // 3. Random Number: (2 digits)
  const randomStr = Math.floor(10 + Math.random() * 90).toString();

  return `OID${dateStr}${msStr}${randomStr}`;
}

// Utility: Format date & time (12-hour)
function getOrderDateTime12h() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const hoursStr = String(hours).padStart(2, "0");
  return `${year}-${month}-${day}   ${hoursStr}:${minutes} ${ampm}`;
}

const TestBuy = ({ data }) => {
  const navigate = useNavigate();
  const { updateCart } = useContext(CartContext);

  // --- DISTRICT & UPAZILA STATES ---
  const [districts, setDistricts] = useState([]);
  const [isDistOpen, setIsDistOpen] = useState(false);
  const [districtSearch, setDistrictSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [upazilas, setUpazilas] = useState([]);
  const [isUpazilaOpen, setIsUpazilaOpen] = useState(false);
  const [selectedUpazila, setSelectedUpazila] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [couponValue, setCouponValue] = useState(null);
  const [couponArray, setCouponArray] = useState([]);
  const [isApplied, setIsApplied] = useState(false);
  const [error, setError] = useState(false);

  // --- ORDER LOGIC STATES ---
  const [deliveryMethod, setDeliveryMethod] = useState("regular");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [subTotalTk, setSubTotalTk] = useState(0);
  const [errors, setErrors] = useState({});
  const [isNavigating, setIsNavigating] = useState(false); // New navigation state

  const distRef = useRef(null);
  const upazilaRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    comment: "",
  });

  //---------------------------------------------------------------------------------

  useEffect(() => {
    // Create an internal async function
    const fetchCoupons = async () => {
      try {
        const res = await axios.get("https://api.victusbyte.com/api/coupon");
        setCouponArray(res.data.data);
      } catch (error) {
        console.error("Error fetching coupons:", error);
      }
    };

    fetchCoupons();
  }, []);

  //apply coupon button
  const handleApply = () => {
    const code = coupon.toUpperCase();
    const matchedCoupon = couponArray.find((c) => c.couponID === code);
    setCouponValue(matchedCoupon);

    if (!matchedCoupon) {
      // Error 1: Wrong Code
      setIsApplied(false);
      setError("Invalid Coupon Code"); // Set error as a string for the UI
      setTimeout(() => setError(false), 2000);
      return;
    }

    if (subTotalTk < matchedCoupon.minTK) {
      // Error 2: Minimum Amount not met
      setIsApplied(false);
      setError(`Minimum spend of ৳${matchedCoupon.minTK} required`);
      setTimeout(() => setError(false), 3000);
      return;
    }

    // Success Handshake
    setCouponValue(matchedCoupon);
    setIsApplied(true);
    setError(false);

    console.log(isApplied);
    console.log(error);
  };

  const handleRemove = () => {
    setCouponValue(null);
    setIsApplied(false);
    setCoupon("");
    setError(false);
  };

  // --- CALCULATION LOGIC ---
  const subTotal =
    data?.reduce((acc, item) => acc + item.price.selling * item.qty, 0) || 0;
  const deliverTk =
    selectedDistrict?.name === "Dhaka"
      ? deliveryMethod === "home"
        ? 60
        : deliveryMethod === "express"
          ? 160
          : 120
      : deliveryMethod === "express"
        ? 160
        : 120;

  //  const totalTk = subTotal + deliverTk - discount - (couponValue?.value || 0);
  const totalTk = subTotal + deliverTk - discount - (couponValue?.value || 0);
  useEffect(() => {
    setSubTotalTk(subTotal);
  }, [subTotal]);

  // 1. Click Outside Logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (distRef.current && !distRef.current.contains(event.target))
        setIsDistOpen(false);
      if (upazilaRef.current && !upazilaRef.current.contains(event.target))
        setIsUpazilaOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 2. Fetch Districts
  useEffect(() => {
    fetch("https://bdopenapi.vercel.app/api/geo/districts")
      .then((res) => res.json())
      .then((res) => setDistricts(res.data || []))
      .catch((err) => console.error("District Fetch Error:", err));
  }, []);

  // 3. Discount sync
  useEffect(() => {
    const totalDiscount =
      data?.reduce((sum, item) => sum + (item.price.discount || 0), 0) || 0;
    setDiscount(totalDiscount);
  }, [data]);

  // 4. Fetch Upazilas
  useEffect(() => {
    if (selectedDistrict?.id) {
      setSelectedUpazila(null);
      fetch(
        `https://bdopenapi.vercel.app/api/geo/upazilas/${selectedDistrict.id}`,
      )
        .then((res) => res.json())
        .then((res) => setUpazilas(res.data || []))
        .catch((err) => console.error("Upazila Fetch Error:", err));
    }
  }, [selectedDistrict]);

  // 5. Default delivery logic
  useEffect(() => {
    if (selectedDistrict?.name === "Dhaka") {
      setDeliveryMethod("home");
    } else {
      setDeliveryMethod("regular");
    }
  }, [selectedDistrict?.name]);

  const filteredDistricts = districts.filter((d) =>
    (d?.name || "").toLowerCase().includes(districtSearch.toLowerCase()),
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  // 6. Submit Logic
  const handleSubmit = async (e) => {
    const newErrors = {
      name: !form.name,
      phone: !form.phone,
      address: !form.address,
      district: !selectedDistrict,
      upazila: !selectedUpazila,
      agreed: !agreed,
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return toast.error("Please fill required fields and agree to terms");
    }
    console.log("clcik");
    setIsSubmitting(true);

    const orderPayload = {
      order_id: generateOrderId(),
      order_date: getOrderDateTime12h(),
      status: "Pending",
      mode: "Online",
      customer_id: "GUEST_USER",
      items: data.map((item) => ({
        product_id: item.pID,
        product_name: item.name,
        product_price: item.price.selling,
        quantity: item.qty,
        product_comments: item.colors,
      })),
      shipping_address: {
        recipient_name: form.name,
        phone: form.phone,
        email: form.email,
        address_line1: `${form.address}, (Dist: ${selectedDistrict.name}, Upa: ${selectedUpazila.name})`,
      },
      payment: { method: "COD", status: "Pending" },
      total_amount: totalTk,
      shipping_cost: deliverTk,
      subtotal: subTotal,
      discount: discount,
      coupon: couponValue,
    };

    console.log(orderPayload);

    try {
      const res = await axios.post(
        "https://api.victusbyte.com/api/order/create-order/client",
        orderPayload,
      );

      console.log(res);

      localStorage.removeItem("cart");
      updateCart();

      Swal.fire({
        title: "Order Placed Successfully!",
        html: `
    <div style="text-align: center; font-family: 'Inter', sans-serif;">
      <p style="margin-bottom: 15px; color: #475569;">Welcome to the <b style="color: #1e293b;">Victus Byte</b> family!</p>
      <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 2px dashed #cbd5e1;">
        <p style="font-size: 14px; color: #64748b; margin: 0; text-transform: uppercase; letter-spacing: 1px;">Your Order ID</p>
        <p style="color: #fe741d; font-size: 24px; font-weight: 800; margin: 8px 0;">${orderPayload.order_id}</p>
      </div>
      <p style="margin-top: 15px; font-size: 13px; color: #94a3b8;">
        We will contact you shortly at <br/>
        <b style="color: #1e293b;">${form.phone}</b>
      </p>
    </div>
  `,
        icon: "success",
        iconColor: "#22c55e",
        background: "#ffffff", // Solid white for the alert box
        backdrop: `rgba(30, 41, 59, 0.5)`, // Slate-800 tint at 50% opacity
        confirmButtonText: "Back to Home",
        confirmButtonColor: "#1e293b", // Slate-800
        allowOutsideClick: false,
        customClass: {
          container: "swal-custom-blur", // Applies the 8px blur to the backdrop
        },
        showClass: {
          popup: "animate__animated animate__zoomIn animate__faster",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp animate__faster",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          // 1. Manually hide the entire page content to prevent "flicker"
          const mainContent = document.querySelector(".min-h-screen");
          if (mainContent) mainContent.style.opacity = "0";

          // 2. Navigate immediately
          navigate("/", { replace: true });
        }
      });
    } catch (error) {
      // 1. Extract the specific message from the backend (if available)
      const errorMessage =
        error.response?.data?.message || "Order Submission Failed";

      // 2. Display the specific error via toast
      toast.error(errorMessage);

      // Optional: Log it for your own debugging
      console.error("Submission Error:", error.response?.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen w-full font-sans   text-white pb-20">
      <div className="w-full md:flex gap-4 ">
        {/* SECTION 1: CUSTOMER INFO */}
        <div className="md:w-1/3 min-h-[750px] rounded bg-white shadow flex-shrink-0">
          <div className="h-12 bg-slate-800 rounded-t flex items-center px-5 gap-3">
            <span className="flex items-center justify-center w-8 h-8 bg-slate-700 text-white font-semibold text-lg rounded-full">
              1
            </span>
            <h2 className="text-lg font-bold text-white">
              Customer Information
            </h2>
          </div>

          <div className="bg-white p-4 text-black">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-1">
                  Full Name
                  <span className="text-red-500 font-black" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  type="text"
                  placeholder="Full Name "
                  className={`px-4 py-2 border rounded outline-none transition-all ${errors.name ? "border-red-500 bg-red-50" : "focus:ring-1 focus:ring-slate-400"}`}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-1">
                  Phone Number
                  <span className="text-red-500 font-black" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  type="tel"
                  placeholder="Phone number"
                  className={`px-4 py-2 border rounded outline-none transition-all ${errors.phone ? "border-red-500 bg-red-50" : "focus:ring-1 focus:ring-slate-400"}`}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-1">
                  Delivery Address
                  <span className="text-red-500 font-black" aria-hidden="true">
                    *
                  </span>
                </label>

                <input
                  name="address"
                  value={form.address}
                  onChange={handleInputChange}
                  placeholder="Full Address *"
                  className={`px-4 py-2 border rounded outline-none transition-all ${errors.address ? "border-red-500 bg-red-50" : "focus:ring-1 focus:ring-slate-400"}`}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-800 mb-1">
                  Email Address
                </label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  type="email"
                  placeholder="E-mail "
                  className="px-4 py-2 border rounded border-gray-200 outline-none"
                />
              </div>

              <div className="flex flex-col w-full relative" ref={distRef}>
                <label className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-1">
                  District
                  <span className="text-red-500 font-black" aria-hidden="true">
                    *
                  </span>
                </label>

                <div
                  onClick={() => setIsDistOpen(!isDistOpen)}
                  className={`px-4 py-2 border rounded bg-white cursor-pointer flex justify-between items-center transition-all ${errors.district ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                >
                  <span
                    className={
                      selectedDistrict ? "text-black" : "text-gray-400"
                    }
                  >
                    {selectedDistrict
                      ? selectedDistrict.name
                      : "Select a District"}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isDistOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {isDistOpen && (
                  <div className="absolute z-20 w-full top-full bg-slate-50 border rounded shadow max-h-60 flex flex-col mt-1">
                    <div className="p-2 border-b sticky top-0 bg-slate-100">
                      <input
                        type="text"
                        autoFocus
                        placeholder="Search..."
                        className="w-full p-2 md:text-sm text-[16px] border bg-white rounded outline-none"
                        value={districtSearch}
                        onChange={(e) => setDistrictSearch(e.target.value)}
                      />
                    </div>
                    <ul className="overflow-y-auto mb-2 mt-2">
                      {filteredDistricts.map((item) => (
                        <li
                          key={item.id}
                          className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-slate-800"
                          onClick={() => {
                            setSelectedDistrict(item);
                            setIsDistOpen(false);
                            setDistrictSearch("");
                            if (errors.district)
                              setErrors((p) => ({ ...p, district: false }));
                          }}
                        >
                          {item.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-col w-full relative" ref={upazilaRef}>
                <label className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-1">
                  Upazila/Thana
                  <span className="text-red-500 font-black" aria-hidden="true">
                    *
                  </span>
                </label>

                <div
                  onClick={() =>
                    selectedDistrict && setIsUpazilaOpen(!isUpazilaOpen)
                  }
                  className={`px-4 py-2 border rounded flex justify-between items-center transition-all ${!selectedDistrict ? "bg-gray-50 cursor-not-allowed" : "bg-white cursor-pointer"} ${errors.upazila ? "border-red-500 bg-red-50" : "border-gray-200"}`}
                >
                  <span
                    className={selectedUpazila ? "text-black" : "text-gray-400"}
                  >
                    {!selectedDistrict
                      ? "Select District first"
                      : selectedUpazila
                        ? selectedUpazila.name
                        : "Select Upazila"}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isUpazilaOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {isUpazilaOpen && selectedDistrict && (
                  <div className="absolute z-10 w-full top-full bg-slate-50 border rounded shadow-lg max-h-60 overflow-y-auto mt-1 py-2">
                    {upazilas.map((item) => (
                      <div
                        key={item.id}
                        className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-slate-800"
                        onClick={() => {
                          setSelectedUpazila(item);
                          setIsUpazilaOpen(false);
                          if (errors.upazila)
                            setErrors((p) => ({ ...p, upazila: false }));
                        }}
                      >
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-800 mb-1">
                  Comment
                </label>
                <textarea
                  name="comment"
                  value={form.comment}
                  onChange={handleInputChange}
                  placeholder="Comment"
                  rows="3"
                  className="px-4 py-2 border rounded border-gray-200 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE CONTENT */}
        <div className="flex flex-col w-full gap-4 mt-4 md:mt-0">
          <div className="flex md:flex-row flex-col w-full gap-4">
            {/* SECTION 2: PAYMENT METHOD */}
            <div className="md:w-1/2 rounded bg-white shadow overflow-hidden">
              <div className="h-12 bg-slate-800 flex items-center px-5 gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-slate-700 text-white font-semibold rounded-full">
                  2
                </span>
                <h2 className="text-lg font-bold text-white">Payment Method</h2>
              </div>
              <div className="p-5 text-black">
                <p className="text-[17px] font-medium mb-4 text-slate-800">
                  Select a payment method
                </p>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="pay"
                      defaultChecked
                      className="w-5 h-5 accent-blue-600"
                    />

                    <span className="font-medium text-slate-800">
                      Cash on Delivery
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-not-allowed opacity-60">
                    <input
                      type="radio"
                      name="pay"
                      disabled
                      className="w-5 h-5 accent-blue-600"
                    />
                    <span className="font-medium text-slate-800">
                      Online Payment
                    </span>
                  </label>
                </div>
                <div className="mt-6">
                  <div className="mt-6">
                    <p className="text-[16px] font-bold text-black mb-2">
                      We Accept :
                    </p>

                    <div className="flex flex-wrap items-center md:gap-x-4 gap-x-1 gap-y-2">
                      <span className="md:text-[11px] text-[9px] font-bold leading-tight text-black w-14">
                        CASH ON DELIVERY
                      </span>

                      {/* Using colored divs as placeholders for the specific logos in your screenshot */}

                      <div className="flex items-center md:gap-4 gap-2">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                          alt="MC"
                          className=" md:h-6 h-5"
                        />

                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                          alt="Visa"
                          className="md:h-4 h-3"
                        />

                        <span className="text-[#D12053] font-bold italic text-sm">
                          bKash
                        </span>

                        <span className="text-[#F7941D] font-bold text-sm">
                          নগদ
                        </span>

                        <span className="text-[#005DAA] font-bold text-sm">
                          উপায়
                        </span>

                        <span className="text-[#00a651] font-bold text-sm">
                          TakaPay
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SECTION 3: DELIVERY METHOD */}
            <div className="md:w-1/2 rounded bg-white shadow overflow-hidden">
              <div className="h-12 bg-slate-800 flex items-center px-5 gap-3">
                <span className="flex items-center justify-center w-8 h-8 bg-slate-700 text-white font-semibold rounded-full">
                  3
                </span>
                <h2 className="text-lg font-bold text-white">
                  Delivery Method
                </h2>
              </div>
              <div className="p-5 text-black">
                <p className="text-[17px] font-medium mb-4 text-slate-800">
                  Select a delivery method
                </p>
                <div className="flex flex-col gap-2">
                  <label
                    className={`flex items-center gap-3 cursor-pointer rounded transition-all ${selectedDistrict?.name === "Dhaka" ? "bg-white opacity-100" : "bg-gray-50 opacity-50 cursor-not-allowed"}`}
                  >
                    <input
                      type="radio"
                      disabled={selectedDistrict?.name !== "Dhaka"}
                      checked={deliveryMethod === "home"}
                      onChange={() => setDeliveryMethod("home")}
                      className="w-5 h-5 accent-blue-600"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-slate-800">
                        Home Delivery - 60৳
                      </span>
                      {selectedDistrict?.name !== "Dhaka" && (
                        <span className="text-[10px] text-red-500 font-bold uppercase">
                          Only available in Dhaka
                        </span>
                      )}
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={deliveryMethod === "regular"}
                      onChange={() => setDeliveryMethod("regular")}
                      className="w-5 h-5 accent-blue-600"
                    />
                    <span className="font-medium text-slate-800">
                      Regular Delivery - 120৳
                    </span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      checked={deliveryMethod === "express"}
                      onChange={() => setDeliveryMethod("express")}
                      className="w-5 h-5 accent-blue-600"
                    />
                    <span className="font-medium text-slate-800">
                      Request Express - 160৳
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Coupon Section */}
          {/* --- COUPON SECTION --- */}
          <div className="w-full bg-white rounded shadow p-3 text-black">
            <div className="flex flex-col md:flex-row md:items-center gap-5">
              <div className="flex items-center gap-3 mr-5 min-w-fit">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={isApplied ? "text-green-600" : "text-blue-600"}
                >
                  <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>
                <span className="text-slate-800 font-medium">
                  {isApplied ? "Coupon Applied!" : "Have a coupon?"}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <div className="flex gap-2">
                  {!isApplied ? (
                    <>
                      <input
                        type="text"
                        value={coupon}
                        onChange={(e) => {
                          setCoupon(e.target.value);
                          if (error) setError(false);
                        }}
                        placeholder="Enter Coupon"
                        className={`w-full px-4 md:h-9.5 h-10 border placeholder:normal-case rounded outline-none transition-all uppercase ${
                          error
                            ? "border-red-500 focus:ring-1 focus:ring-red-200"
                            : "border-gray-300 focus:border-slate-400"
                        }`}
                      />
                      <button
                        onClick={handleApply}
                        className="md:hover:bg-slate-800 bg-slate-800 md:bg-white md:text-slate-800 text-white md:w-50 w-60 border-2 border-slate-800 font-semibold md:px-6 py-1.5 rounded transition-all shadow hover:text-white"
                      >
                        Apply Coupon
                      </button>
                    </>
                  ) : (
                    /* Success State Badge */
                    <div className="flex items-center justify-between w-full bg-green-50 border border-green-200 px-4 md:h-9.5 h-10 rounded animate-in fade-in slide-in-from-right-2">
                      <span className="text-green-700 font-bold uppercase tracking-widest text-sm">
                        {coupon} - (Applied)
                      </span>
                      <button
                        onClick={handleRemove}
                        className="text-green-700 hover:scale-110 transition-transform"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>

                {/* Inline Warning Message */}
                {error && !isApplied && (
                  <span className="text-[10px] font-bold text-red-500 uppercase tracking-tighter animate-pulse">
                    {error || "Invalid or expired coupon code."}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 4: ORDER OVERVIEW */}
          <div className="bg-white rounded shadow font-sans text-black">
            <div className="flex items-center border-b h-12 justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5 text-slate-800 mr-2"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <h2 className="text-lg font-bold text-slate-800">
                Order Overview
              </h2>
            </div>
            <div className="p-2">
              <div className="grid grid-cols-12 bg-gray-50 border-b py-3 px-4 text-xs font-bold text-gray-500 uppercase">
                <div className="col-span-6">Product Name</div>
                <div className="col-span-3">Price</div>
                <div className="col-span-3 text-right">Total</div>
              </div>
              {data?.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 items-center border-b py-4 px-4 text-sm text-gray-700"
                >
                  <div className="col-span-6 font-medium text-slate-800">
                    {item.name} ({item.colors})
                  </div>
                  <div className="col-span-3">
                    {item.price.selling}৳ x {item.qty}
                  </div>
                  <div className="col-span-3 text-right font-semibold">
                    {item.price.selling * item.qty}৳
                  </div>
                </div>
              ))}
              <div className="space-y-2 pt-4 px-4 text-sm">
                <div className="flex justify-end gap-8">
                  <span className="font-bold text-gray-800">Sub-Total:</span>
                  <span className="w-20 text-right font-bold text-orange-600">
                    {subTotal}৳
                  </span>
                </div>
                <div className="flex justify-end gap-8">
                  <span className="font-bold text-gray-800">Delivery:</span>
                  <span className="w-20 text-right font-bold text-orange-600">
                    {deliverTk}৳
                  </span>
                </div>
                <div className="flex justify-end gap-8">
                  <span className="font-bold text-gray-800">Discount:</span>
                  <span className="w-20 text-right font-bold text-orange-600">
                    - {discount}৳
                  </span>
                </div>

                {isApplied && (
                  <div className="flex justify-end gap-8">
                    <div className="flex items-center gap-2">
                      {/* Success Checkmark Icon */}
                      <div className="bg-green-500 rounded-full p-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="font-bold text-gray-800  text-sm uppercase tracking-tight">
                        Coupon Discount:
                      </span>
                    </div>
                    <span className="w-20 text-right font-bold text-green-600">
                      - {couponValue?.value}৳
                    </span>
                  </div>
                )}

                <div className="flex justify-end gap-8 border-t pt-3">
                  <span className="text-base font-black text-gray-900 uppercase">
                    Total:
                  </span>
                  <span className="w-20 text-right text-base font-black text-orange-600">
                    {totalTk}৳
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SUBMIT FOOTER */}
          <div
            className={`bg-white p-3 border rounded mb-32 md:mb-0 text-black transition-all ${errors.agreed ? "border-red-500 bg-red-50" : "border-slate-400"}`}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="policy"
                    checked={agreed}
                    onChange={(e) => {
                      setAgreed(e.target.checked);
                      if (errors.agreed)
                        setErrors((p) => ({ ...p, agreed: false }));
                    }}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-400 checked:bg-orange-500"
                  />
                  <svg
                    className="absolute h-3.5 w-3.5 mt-0.5 ml-0.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <label
                  htmlFor="policy"
                  className={`text-sm select-none cursor-pointer ${errors.agreed ? "text-red-600 font-bold" : "text-gray-600"}`}
                >
                  I have read and agree to the{" "}
                  <span className="text-orange-600 font-semibold">
                    Privacy Policy
                  </span>
                  ,{" "}
                  <span className="text-orange-600 font-semibold">
                    Terms & Conditions
                  </span>
                </label>
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group w-full md:w-auto px-5 py-3 bg-slate-800 text-white font-black uppercase rounded shadow-md active:scale-95 flex items-center justify-center gap-2"
              >
                {isSubmitting ? "Processing..." : "Place Order"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-7 transition-transform group-hover:translate-x-1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M5 12h14m-7-7 7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestBuy;
