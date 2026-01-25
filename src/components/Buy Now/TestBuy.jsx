import React, { useState, useEffect, useRef } from "react";

const TestBuy = () => {
  // --- DISTRICT STATES ---
  const [districts, setDistricts] = useState([]);
  const [isDistOpen, setIsDistOpen] = useState(false);
  const [districtSearch, setDistrictSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null); // Stores {id, district}
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // --- UPAZILA STATES ---
  const [upazilas, setUpazilas] = useState([]);
  const [isUpazilaOpen, setIsUpazilaOpen] = useState(false);
  const [selectedUpazila, setSelectedUpazila] = useState(null); // Stores {id, upazila}

  // --- REFS FOR CLICK OUTSIDE ---
  const distRef = useRef(null);
  const upazilaRef = useRef(null);

  // 1. Click Outside Logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (distRef.current && !distRef.current.contains(event.target)) {
        setIsDistOpen(false);
      }
      if (upazilaRef.current && !upazilaRef.current.contains(event.target)) {
        setIsUpazilaOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 2. Fetch Districts on Component Mount
  useEffect(() => {
    fetch("https://bdopenapi.vercel.app/api/geo/districts")
      .then((res) => res.json())
      .then((res) => {
        // API structure is { status: 200, data: [...] }
        setDistricts(res.data || []);
      })
      .catch((err) => console.error("District Fetch Error:", err));
  }, []);

  // 3. Fetch Upazilas when District changes
  useEffect(() => {
    if (selectedDistrict?.id) {
      setSelectedUpazila(null); // Reset upazila if district changes
      fetch(
        `https://bdopenapi.vercel.app/api/geo/upazilas/${selectedDistrict.id}`,
      )
        .then((res) => res.json())
        .then((res) => {
          setUpazilas(res.data || []);
        })
        .catch((err) => console.error("Upazila Fetch Error:", err));
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict]);

  // 4. Filter Districts based on search
  const filteredDistricts = districts.filter((d) =>
    (d?.name || "").toLowerCase().includes(districtSearch.toLowerCase()),
  );

  return (
    <div className="min-h-screen font-sans max-w-[1400px] mx-auto md:px-4 px-2 md:mt-27 mt-16 text-white">
      {/* Top Header Row */}
      {/* <div className="hidden md:flex w-full">
        <div className="h-20 max-w-2/3 flex-grow rounded-l bg-indigo-600 p-4 shadow-sm flex items-center justify-center">
          Header Sections
        </div>
        <div className="flex h-20 w-1/3 rounded-r bg-orange-500 shadow-sm">
          <img
            src="https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/Untitled%20%281280%20x%20400%20px%29%20%28433%20x%2075%20px%29.png"
            alt="Payment Provider"
            className="object-cover"
          />
        </div>
      </div> */}

      {/* Main Body */}
      <div className="w-full md:flex gap-4 mt-4">
        {/* Left Sidebar (Form) */}
        <div className="md:w-1/3 min-h-[750px] rounded bg-white shadow flex-shrink-0">
          <div className="h-12 bg-slate-800 rounded-t flex items-center px-5 gap-3">
            <span className="flex items-center justify-center w-8 h-8 bg-slate-700 text-white font-semibold text-lg rounded-full">
              1
            </span>
            <h2 className="text-lg  font-bold  text-white">
              Logistics Information
            </h2>
          </div>

          <div className="bg-white p-4 text-black">
            <div className="flex flex-col gap-5">
              {/* Full Name */}
              <div className="flex flex-col">
                <label className="text-sm  font-bold text-slate-800 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name *"
                  className="px-4 py-2 border rounded focus:ring-1 focus:ring-slate-400 outline-none"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-800  mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Phone number*"
                  className="px-4 py-2 border rounded focus:ring-1 focus:ring-slate-400 outline-none"
                />
              </div>

              {/* Delivery Address */}
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-800 mb-1">
                  Delivery Address
                </label>
                <input
                  placeholder="Full Address *"
                  className="px-4 py-2 border rounded focus:ring-1 focus:ring-slate-400 outline-none"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-800 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="E-mail *"
                  className="px-4 py-2 border rounded focus:ring-1 focus:ring-slate-400 outline-none"
                />
              </div>

              {/* DISTRICT DROPDOWN */}
              <div className="flex flex-col w-full relative" ref={distRef}>
                <label className="text-sm font-bold text-slate-800 mb-1">
                  District
                </label>
                <div
                  onClick={() => setIsDistOpen(!isDistOpen)}
                  className="px-4 py-2 border rounded bg-white cursor-pointer flex justify-between items-center focus-within:ring-1 focus-within:ring-slate-400"
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
                  <div className="absolute z-20 w-full top-full bg-white border rounded shadow max-h-60 flex flex-col mt-1">
                    <div className="p-2 border-b sticky top-0 bg-slate-100">
                      <input
                        type="text"
                        autoFocus
                        placeholder="Search district..."
                        className="w-full p-2 text-sm border bg-white rounded outline-none focus:border-slate-400"
                        value={districtSearch}
                        onChange={(e) => setDistrictSearch(e.target.value)}
                      />
                    </div>
                    <ul className="overflow-y-auto mb-2 mt-2">
                      {filteredDistricts.length > 0 ? (
                        filteredDistricts.map((item) => (
                          <li
                            key={item.id}
                            className="px-4 py-[3px] hover:bg-slate-100 cursor-pointer text-md text-slate-800"
                            onClick={() => {
                              setSelectedDistrict(item);
                              setIsDistOpen(false);
                              setDistrictSearch("");
                            }}
                          >
                            {item.name}
                          </li>
                        ))
                      ) : (
                        <li className="p-2 text-sm text-gray-400 text-center">
                          No districts found
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* UPAZILA DROPDOWN (No Search) */}
              <div className="flex flex-col w-full relative" ref={upazilaRef}>
                <label className="text-sm tracking-wide font-bold text-slate-800 mb-1">
                  Upazila/Thana
                </label>
                <div
                  onClick={() =>
                    selectedDistrict && setIsUpazilaOpen(!isUpazilaOpen)
                  }
                  className={`px-4 py-2 border rounded flex justify-between items-center ${
                    !selectedDistrict
                      ? "bg-gray-50 cursor-not-allowed"
                      : "bg-white cursor-pointer"
                  }`}
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
                  <div className="absolute z-10 w-full top-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto mt-1 pt-2 pb-3">
                    {upazilas.length > 0 ? (
                      upazilas.map((item) => (
                        <div
                          key={item.id}
                          className="px-4 py-[3px] hover:bg-slate-100 cursor-pointer text-md text-slate-800"
                          onClick={() => {
                            setSelectedUpazila(item);
                            setIsUpazilaOpen(false);
                          }}
                        >
                          {item.name}
                        </div>
                      ))
                    ) : (
                      <div className="p-2 text-sm text-gray-400 text-center">
                        Loading Upazilas...
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Comment */}
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-800 mb-1">
                  Comment
                </label>
                <textarea
                  placeholder="Comment"
                  rows="3"
                  className="px-4 py-2 border rounded focus:ring-1 focus:ring-slate-400 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="flex flex-col w-full gap-4 mt-4 md:mt-0">
          <div className="flex md:flex-row flex-col w-full gap-4">
            {/* Payment Method Section */}

            <div className="flex flex-col w-full gap-4 ">
              <div className="flex md:flex-row flex-col w-full gap-4">
                {/* SECTION 2: PAYMENT METHOD */}
                <div className="md:w-1/2 rounded bg-white shadow overflow-hidden">
                  <div className="h-12 bg-slate-800 rounded-t flex items-center px-5 gap-3">
                    <span className="flex items-center justify-center w-8 h-8 bg-slate-700 text-white font-semibold text-lg rounded-full">
                      2
                    </span>
                    <h2 className="text-lg  font-bold  text-white">
                      Payment Method
                    </h2>
                  </div>

                  <div className="p-5 text-black">
                    <p className="text-[17px] tracking-tight text-slate-800 font-medium mb-4">
                      Select a payment method
                    </p>

                    <div className="flex flex-col gap-2">
                      <label className="flex items-center gap-3 group cursor-pointer">
                        <input
                          type="radio"
                          name="pay"
                          defaultChecked
                          className="w-5 h-5 accent-blue-600 group "
                        />
                        <span className="tracking-tight font-medium text-slate-800">
                          Cash on Delivery
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-not-allowed opacity-60 group">
                        <input
                          type="radio"
                          name="pay"
                          disabled={true}
                          className="w-5 h-5 accent-blue-600"
                        />
                        <span className="tracking-tight font-medium text-slate-800">
                          Online Payment
                        </span>
                      </label>
                    </div>

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
                            উপায়
                          </span>
                          <span className="text-[#00a651] font-bold text-sm">
                            TakaPay
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SECTION 3: DELIVERY METHOD */}
                <div className="md:w-1/2 rounded bg-white shadow  overflow-hidden">
                  <div className="h-12 bg-slate-800 rounded-t flex items-center px-5 gap-3">
                    <span className="flex items-center justify-center w-8 h-8 bg-slate-700 text-white font-semibold text-lg rounded-full">
                      3
                    </span>
                    <h2 className="text-lg  font-bold  text-white">
                      Delivery Method
                    </h2>
                  </div>

                  <div className="p-5 text-black">
                    <p className="text-[17px] text-slate-800 font-medium mb-4">
                      Select a delivery method
                    </p>

                    <div className="flex flex-col gap-2">
                      <label
                        className={`flex items-center gap-3 cursor-pointer transition-all ${
                          selectedDistrict?.name === "Dhaka"
                            ? "border-slate-200 opacity-100"
                            : "border-gray-100 opacity-50 cursor-not-allowed bg-gray-50"
                        }`}
                      >
                        <input
                          type="radio"
                          name="del"
                          disabled={selectedDistrict?.name !== "Dhaka"}
                          defaultChecked={selectedDistrict?.name == "Dhaka"}
                          className="w-5 h-5 accent-blue-600 disabled:cursor-not-allowed"
                        />
                        <div className="flex flex-col">
                          <span className="tracking-tight font-medium text-slate-800">
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
                          name="del"
                          defaultChecked
                          className="w-5 h-5 accent-blue-600"
                        />
                        <span className="tracking-tight font-medium text-slate-800">
                          Regular Delivery - 120৳
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="del"
                          className="w-5 h-5 accent-blue-600"
                        />
                        <span className="tracking-tight font-medium text-slate-800">
                          Request Express - 160৳
                        </span>
                      </label>
                      {/* <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="del"
                          className="w-5 h-5 accent-blue-600"
                        />
                        <span className="tracking-tight font-medium text-slate-800">
                          Pickup From Courier - 100৳
                        </span>
                      </label> */}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Overview Section (4) would go here */}
            </div>
          </div>

          {/* Coupon Section */}
          <div className="w-full bg-white rounded shadow p-3">
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
                  className="text-blue-600" // <--- Add this Tailwind class
                >
                  <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
                  <line x1="7" y1="7" x2="7.01" y2="7" />
                </svg>

                <span className="text-slate-800 tracking-wider font-medium whitespace-nowrap">
                  Have a coupon?
                </span>
              </div>

              <div className="flex flex-1 gap-2">
                <input
                  id="coupon-input"
                  type="text"
                  placeholder="Enter code"
                  className="w-full px-4 h-9.5  border placeholder:font-medium border-gray-300 tracking-wide md:tracking-wider uppercase placeholder:text-sm font-semibold md:text-[18px] text-slate-800 rounded focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-transparent transition-all"
                />
                <button
                  id="apply-btn"
                  type="button"
                  className="hover:bg-slate-800 text-slate-800 w-50 border-2 cursor-pointer border-slate-800 font-semibold  active:scale-95 hover:text-white md:px-6 py-1.5 rounded transition-all duration-200 whitespace-nowrap shadow hover:shadow-lg disabled:opacity-50"
                >
                  Apply Coupon
                </button>
              </div>
            </div>

            {/* Hidden Success/Error Message */}
            <p id="coupon-message" className="mt-2 text-sm hidden"></p>
          </div>

          <div className=" bg-white rounded shadow font-sans">
            {/* Header */}
            <div className="flex items-center border-b border-slate-300 gap-2 mb-4">
              <div className="flex items-center justify-center w-full h-12">
                {/* Icon - Shopping Bag/Receipt */}
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
            </div>

            <div className="p-2">
              {/* Table Header */}
              <div className="grid grid-cols-12  bg-gray-50 border-y border-gray-100 py-3 px-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                <div className="col-span-6">Product Name</div>
                <div className="col-span-3 text-left">Price</div>
                <div className="col-span-3 text-right">Total</div>
              </div>

              {/* Product Row */}
              <div className="grid grid-cols-12 items-center border-b border-gray-100 py-4 px-4 text-sm text-gray-700">
                <div className="col-span-6 tracking-tight font-medium text-slate-800">
                  A18 1080P Body Camera
                </div>
                <div className="col-span-3 text-left">2,400৳ x 1</div>
                <div className="col-span-3 text-right font-semibold">
                  2,400৳
                </div>
              </div>

              {/* Calculation Section */}
              <div className="space-y-2 pt-4 px-4 text-sm">
                <div className="flex justify-end gap-8">
                  <span className="font-bold text-gray-800">Sub-Total:</span>
                  <span className="w-20 text-right font-bold text-orange-600">
                    2,400৳
                  </span>
                </div>
                <div className="flex justify-end gap-8">
                  <span className="font-bold text-gray-800">
                    Total Discount:
                  </span>
                  <span className="w-20 text-right font-bold text-orange-600">
                    -250৳
                  </span>
                </div>
                <div className="flex justify-end gap-8">
                  <span className="font-bold text-gray-800">Delivery:</span>
                  <span className="w-20 text-right font-bold text-orange-600">
                    60৳
                  </span>
                </div>
                <div className="flex justify-end gap-8 border-t border-gray-200 pt-3">
                  <span className="text-base font-black text-gray-900 uppercase">
                    Total:
                  </span>
                  <span className="w-20 text-right text-base font-black text-orange-600">
                    2,460৳
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* //place order button */}
          <div className=" bg-white p-3 border border-slate-400 rounded  mb-32 md:mb-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left Side: Checkbox & Policy */}
              <div className="flex items-start gap-3 group cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="policy"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border-1 border-slate-400 checked:bg-orange-500 checked:border-orange-500 transition-all"
                  />
                  {/* Checkmark Icon (Visible when checked) */}
                  <svg
                    className="absolute h-3.5 w-3.5 mt-0.5 ml-0.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <label
                  htmlFor="policy"
                  className="text-sm text-gray-600 cursor-pointer select-none"
                >
                  I have read and agree to the
                  <span className="text-orange-600 font-semibold hover:underline ml-1">
                    Privacy Policy
                  </span>
                  ,
                  <span className="text-orange-600 font-semibold hover:underline ml-1">
                    Terms & Conditions
                  </span>
                </label>
              </div>

              {/* Right Side: Place Order Button */}
              <button className="group w-full md:w-auto px-5 py-3 bg-slate-800  cursor-pointer  text-white font-black uppercase tracking-wider rounded shadow-md transition-all active:scale-95 flex items-center justify-center gap-2">
                Place Order
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-7 transition-transform duration-300 ease-in-out group-hover:translate-x-1.5"
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
