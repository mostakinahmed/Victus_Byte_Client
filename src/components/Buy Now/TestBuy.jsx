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
      <div className="flex w-full">
        <div className="h-20 max-w-2/3 flex-grow rounded-l bg-indigo-600 p-4 shadow-sm flex items-center justify-center">
          Header Sections
        </div>
        <div className="h-20 w-1/3 bg-orange-500 rounded-r p-4 shadow-sm flex items-center justify-center font-bold italic">
          Payment Ads
        </div>
      </div>

      {/* Main Body */}
      <div className="w-full md:flex gap-4 mt-4">
        {/* Left Sidebar (Form) */}
        <div className="md:w-1/3 min-h-[800px] rounded bg-white shadow flex-shrink-0">
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
                <label className="text-sm  font-bold text-slate-800 mb-2">
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
                <label className="text-sm font-bold text-slate-800 mb-2">
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
                <label className="text-sm font-bold text-slate-800 mb-2">
                  Delivery Address
                </label>
                <input
                  placeholder="Full Address *"
                  className="px-4 py-2 border rounded focus:ring-1 focus:ring-slate-400 outline-none"
                />
              </div>

              {/* Email Address */}
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-800 mb-2">
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
                <label className="text-sm font-bold text-slate-800 mb-2">
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
                  <div className="absolute z-20 w-full top-full bg-white border rounded shadow-lg max-h-60 flex flex-col mt-1">
                    <div className="p-2 border-b sticky top-0 bg-slate-50">
                      <input
                        type="text"
                        autoFocus
                        placeholder="Search district..."
                        className="w-full p-2 text-sm border bg-white rounded outline-none focus:border-slate-400"
                        value={districtSearch}
                        onChange={(e) => setDistrictSearch(e.target.value)}
                      />
                    </div>
                    <ul className="overflow-y-auto">
                      {filteredDistricts.length > 0 ? (
                        filteredDistricts.map((item) => (
                          <li
                            key={item.id}
                            className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-md text-slate-800"
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
                <label className="text-sm tracking-wide font-bold text-slate-800 mb-2">
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
                  <div className="absolute z-10 w-full top-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto mt-1">
                    {upazilas.length > 0 ? (
                      upazilas.map((item) => (
                        <div
                          key={item.id}
                          className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-md text-slate-800"
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
                <label className="text-sm font-bold text-slate-800 mb-2">
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

            <div className="flex flex-col w-full gap-4 md:mt-4">
              <div className="flex md:flex-row flex-col w-full gap-4">
                {/* SECTION 2: PAYMENT METHOD */}
                <div className="md:w-1/2 rounded bg-white shadow-sm border border-slate-200 overflow-hidden">
                  <div className="h-12 bg-slate-800 rounded-t flex items-center px-5 gap-3">
                    <span className="flex items-center justify-center w-8 h-8 bg-slate-700 text-white font-semibold text-lg rounded-full">
                      2
                    </span>
                    <h2 className="text-lg  font-bold  text-white">
                      Payment Method
                    </h2>
                  </div>

                  <div className="p-5 text-black">
                    <p className="text-[17px] text-slate-800 font-medium mb-4">
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
                        <span className=" font-medium text-slate-800">
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
                        <span className=" font-medium text-slate-800">
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
                <div className="md:w-1/2 rounded bg-white shadow-sm border border-slate-200 overflow-hidden">
                  <div className="h-12 bg-slate-800 rounded-t flex items-center px-5 gap-3">
                    <span className="flex items-center justify-center w-8 h-8 bg-slate-700 text-white font-semibold text-lg rounded-full">
                      3
                    </span>
                    <h2 className="text-lg  font-bold  text-white">
                      Delivaery Method
                    </h2>
                  </div>

                  <div className="p-5 text-black">
                    <p className="text-[17px] text-slate-800 font-medium mb-4">
                      Select a delivery method
                    </p>

                    <div className="flex flex-col gap-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="del"
                          defaultChecked
                          className="w-5 h-5 accent-blue-600"
                        />
                        <span className=" font-medium text-slate-800">
                          Home Delivery By Courier - 100৳
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="del"
                          className="w-5 h-5 accent-blue-600"
                        />
                        <span className="font-medium text-slate-800">
                          Request Express Delivery By Courier - 160৳
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="del"
                          className="w-5 h-5 accent-blue-600"
                        />
                        <span className=" font-medium text-slate-800">
                          Pickup From Courier - 100৳
                        </span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Overview Section (4) would go here */}
            </div>
          </div>

          {/* Order Overview Section */}
          <div className="bg-white rounded shadow-sm overflow-hidden flex-grow min-h-[300px]">
            <div className="h-12 bg-slate-800 flex items-center px-5 gap-3">
              <span className="flex items-center justify-center w-8 h-8 bg-slate-700 text-white font-semibold text-lg rounded-full">
                4
              </span>
              <h2 className="text-lg tracking-wide font-semibold text-white">
                Order Overview
              </h2>
            </div>
            <div className="p-5 text-black">
              <h3 className="font-bold border-b pb-2 mb-2">Shipping To:</h3>
              <p>
                District:{" "}
                <span className="font-semibold">
                  {selectedDistrict?.district || "Not selected"}
                </span>
              </p>
              <p>
                Upazila:{" "}
                <span className="font-semibold">
                  {selectedUpazila?.upazila || "Not selected"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestBuy;
