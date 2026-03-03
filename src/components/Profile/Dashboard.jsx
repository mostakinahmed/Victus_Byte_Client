import React, { useState } from "react";
import {
  User,
  Package,
  RefreshCw,
  Heart,
  MapPin,
  Lock,
  Award,
  CreditCard,
  Star,
  ShieldCheck,
  Headphones,
  LogOut,
  ChevronRight,
  Menu,
  X,
  Edit,
  Key,
} from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Sidebar Menu Items
  const menuItems = [
    { id: "overview", label: "Overview", icon: <User size={20} /> },
    { id: "edit-profile", label: "Edit Profile", icon: <Edit size={20} /> }, // Added
    { id: "myorder", label: "My Orders", icon: <Package size={20} /> },
    { id: "return", label: "Returns", icon: <RefreshCw size={20} /> },
    { id: "points", label: "Loyalty Points", icon: <Award size={20} /> },
    {
      id: "change-password",
      label: "Change Password",
      icon: <Key size={20} />,
    }, // Added

    { id: "wishlist", label: "Wishlist", icon: <Heart size={20} /> },

    { id: "review", label: "My Reviews", icon: <Star size={20} /> },
    { id: "support", label: "Support", icon: <Headphones size={20} /> },
  ];

  return (
    <div className="max-w-[1400px] lg:mt-[80px] mt-[47px] px-2 lg:px-4 mx-auto md:py-6 py-3 font-sans">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* --- MOBILE SIDEBAR TOGGLE --- */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden flex items-center gap-2 bg-white p-3 rounded shadow mb-2 text-[#1976d2] font-bold"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          <span>Dashboard Menu</span>
        </button>

        {/* --- LEFT SIDEBAR --- */}
        <div
          className={`
          lg:w-1/4 w-full bg-white shadow rounded p-4 h-fit
          ${isSidebarOpen ? "block" : "hidden lg:block"}
        `}
        >
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`flex items-center justify-between p-2.5 rounded transition-all ${
                  activeTab === item.id
                    ? "bg-[#1976d2] text-white shadow-md"
                    : "text-gray-700 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="font-">{item.label}</span>
                </div>
                <ChevronRight
                  size={16}
                  className={
                    activeTab === item.id ? "opacity-100" : "opacity-0"
                  }
                />
              </button>
            ))}

            <hr className="my-3 border-gray-100" />

            <button className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-100 bg-red-50/70 rounded transition-all w-full text-left">
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* --- RIGHT SIDE CONTENT --- */}
        <div className="lg:w-3/4 w-full bg-white shadow p-6 rounded min-h-[calc(100vh-12rem)]">
          {/* TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="animate-in fade-in duration-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 uppercase tracking-tight">
                Account Overview
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gray-50 rounded-xl mb-8">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="Profile"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-sm"
                />
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-800 uppercase">
                    Mostakin Ahmed
                  </h3>
                  <p className="text-gray-500">mostakin@victusbyte.com</p>
                  <span className="mt-2 inline-block px-3 py-1 bg-[#1976d2]/10 text-[#1976d2] text-xs font-bold rounded-full">
                    Customer ID: VB-9921
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Orders", value: "12", color: "bg-blue-50" },
                  { label: "Pending", value: "02", color: "bg-orange-50" },
                  { label: "Wishlist", value: "08", color: "bg-red-50" },
                  { label: "Points", value: "450", color: "bg-green-50" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`${stat.color} p-4 rounded-lg text-center border border-black/5`}
                  >
                    <p className="text-2xl font-black text-gray-800">
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: EDIT PROFILE */}
          {activeTab === "edit-profile" && (
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 uppercase tracking-tight">
                Edit Profile
              </h2>
              <form className="max-w-2xl space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-100 p-2 outline-none focus:border-[#1976d2] transition-colors"
                      defaultValue="Mostakin Ahmed"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full border-b-2 border-gray-100 p-2 outline-none focus:border-[#1976d2] transition-colors"
                      defaultValue="mostakin@victusbyte.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      className="w-full border-b-2 border-gray-100 p-2 outline-none focus:border-[#1976d2] transition-colors bg-gray-50 cursor-not-allowed"
                      defaultValue="01XXXXXXXXX"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Gender
                    </label>
                    <select className="w-full border-b-2 border-gray-100 p-2 outline-none focus:border-[#1976d2] transition-colors">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <button className="bg-[#1976d2] text-white px-8 py-3 rounded font-bold uppercase tracking-wider hover:bg-[#1565c0] transition-all shadow-md active:scale-95">
                  Save Changes
                </button>
              </form>
            </div>
          )}

          {/* TAB: CHANGE PASSWORD */}
          {activeTab === "change-password" && (
            <div className="animate-in slide-in-from-bottom-2 duration-300">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 uppercase tracking-tight">
                Change Password
              </h2>
              <form className="max-w-md space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full border-b-2 border-gray-100 p-2 outline-none focus:border-[#1976d2] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full border-b-2 border-gray-100 p-2 outline-none focus:border-[#1976d2] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full border-b-2 border-gray-100 p-2 outline-none focus:border-[#1976d2] transition-colors"
                  />
                </div>
                <button className="bg-[#1976d2] text-white px-8 py-3 rounded font-bold uppercase tracking-wider hover:bg-[#1565c0] transition-all shadow-md active:scale-95">
                  Update Password
                </button>
              </form>
            </div>
          )}

          {/* TAB: OTHER PLACEHOLDERS */}
          {[
            "myorder",
            "return",
            "wishlist",
            "address",
            "points",
            "payment",
            "review",
            "security",
            "support",
          ].includes(activeTab) && (
            <div className="flex flex-col items-center justify-center h-full text-center py-20 animate-in fade-in">
              <div className="p-4 bg-gray-50 rounded-full mb-4 text-[#1976d2]">
                {menuItems.find((m) => m.id === activeTab)?.icon}
              </div>
              <h2 className="text-xl font-bold text-gray-800 uppercase">
                {menuItems.find((m) => m.id === activeTab)?.label}
              </h2>
              <p className="text-gray-500">
                This feature is coming soon to your Victus Byte dashboard.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
