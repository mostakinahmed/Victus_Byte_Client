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
import { useAuth } from "../Context Api/AuthContext";
import EditProfile from "./EditProfile";
import ChangedPassword from "./ChangedPassword";
import { MyOrder } from "../Profile/MyOrder";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const { user, checkUserStatus, logout } = useAuth();

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
    <div className="max-w-[1400px] lg:mt-[86px] mt-[49px] px-2 lg:px-4 mx-auto md:py-6 py-3 font-sans">
      <div className="flex flex-col lg:flex-row md:gap-4 gap-2">
        {/* --- MOBILE SIDEBAR TOGGLE --- */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden flex items-center gap-2 bg-white p-3 rounded shadow text-[#1976d2] font-bold"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          <span>Dashboard Menu</span>
        </button>

        {/* --- LEFT SIDEBAR --- */}
        <div
          className={`
          lg:w-1/4 w-full bg-white shadow-xs rounded p-4 h-fit
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
                    : "text-slate-900 hover:bg-slate-100"
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
              <span onClick={logout} className="font-medium">
                Logout
              </span>
            </button>
          </div>
        </div>

        {/* --- RIGHT SIDE CONTENT --- */}
        <div className="lg:w-3/4 w-full bg-white shadow-xs p-4 rounded min-h-[calc(100vh-12rem)]">
          {/* TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="animate-in fade-in duration-300">
              <div className="relative mb-8">
                <h2 className="text-[14px] font-black text-slate-800 uppercase tracking-[0.2em] flex items-center gap-3">
                  {/* Blue accent line */}
                  <span className="w-1.5 h-5 bg-[#1976d2] rounded-full"></span>
                  Account Overview
                </h2>
                {/* Elegant thin border with a gradient feel */}
                <div className="mt-3 w-full h-[1px] bg-linear-to-r from-slate-200 via-slate-100 to-transparent"></div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-8 px-8 mt-3 bg-slate-50/50 rounded-2xl md:mb-8 mb-3  relative overflow-hidden group">
                {/* Subtle Background Brand Tint */}
                <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl transition-colors" />

                {/* Profile Image Section */}
                <div className="relative">
                  <img
                    src={
                      "https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/user.png" ||
                      user.images
                    }
                    alt="Profile"
                    className="w-28 h-28 rounded-full object-cover"
                  />
                  {user.isVerified && (
                    <div
                      className="absolute bottom-1 right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-white shadow-sm"
                      title="Verified Account"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.64.304 1.24.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Information Content */}
                <div className="flex-grow text-center md:text-left z-10">
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                    <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                      {user.userName}
                    </h3>
                    {user.isVerified ? (
                      <span className="text-[10px] font-extrabold text-blue-600 bg-green-50 px-2 py-0.5 rounded uppercase tracking-wider border border-blue-100 w-fit mx-auto md:mx-0">
                        Verified
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-widest border border-slate-200 w-fit mx-auto md:mx-0">
                        Unverified
                      </span>
                    )}
                  </div>

                  <p className="text-slate-600 md:mb-4">{user.email}</p>
                </div>

                {/* Info Grid */}
                <div className="flex md:w-1/2 md:bg-slate-100/30 p-2 rounded-xl md:border border-slate-200 flex-col gap-y-4 md:pt-4 pt-2">
                  <div className=" flex justify-between gap-10">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Phone Number
                      </p>
                      <p className="text-sm font-medium text-slate-700">
                        {user.phone || "N/A"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Gender
                      </p>
                      <p className="text-sm font-medium text-slate-700">
                        {user.gender || "Not Specified"}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between  gap-10 ">
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Member Since
                      </p>
                      <p className="text-sm font-medium text-slate-700">
                        {user.createdAt
                          ? new Date(user.createdAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "Jan 2026"}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                        Customer ID
                      </p>
                      <p className="text-sm font-bold text-[#1976d2]">
                        {user.cID}
                      </p>
                    </div>
                  </div>
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
            <EditProfile data={user} checkUserStatus={checkUserStatus} />
          )}

          {/* TAB: CHANGE PASSWORD */}
          {activeTab === "change-password" && <ChangedPassword />}

          {/* TAB: CHANGE PASSWORD */}
          {activeTab === "myorder" && <MyOrder />}

          {/* TAB: OTHER PLACEHOLDERS */}
          {[
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
