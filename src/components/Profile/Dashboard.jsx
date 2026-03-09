import React, { useEffect, useState } from "react";
import axios from "axios";
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
  ShoppingBag,
  UserPen,
  Headset,
  RefreshCcw,
  LayoutDashboard,
} from "lucide-react";

import { toast } from "react-hot-toast";
import { useAuth } from "../Context Api/AuthContext";
import EditProfile from "./EditProfile";
import ChangedPassword from "./ChangedPassword";
import { MyOrder } from "../Profile/MyOrder";
import LoyaltyPage from "./LoyalityPage";
import SupportPage from "./SupportPage";
import ReturnPage from "./ReturnPage";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  const { user, checkUserStatus, logout } = useAuth();

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: <User size={20} /> },
    { id: "edit-profile", label: "Edit Profile", icon: <Edit size={20} /> },
    { id: "myorder", label: "My Orders", icon: <Package size={20} /> },
    { id: "points", label: "Loyalty Points", icon: <Award size={20} /> },
    {
      id: "change-password",
      label: "Change Password",
      icon: <Key size={20} />,
    },
    { id: "return", label: "Return Orders", icon: <RefreshCw size={20} /> },
    { id: "wishlist", label: "Wishlist", icon: <Heart size={20} /> },
    { id: "support", label: "Support", icon: <Headphones size={20} /> },
  ];

  // UPDATED: Added explicit border and bg classes for Tailwind JIT
  const MobileMenuItems = [
    {
      id: "myorder",
      label: "My Orders",
      icon: <ShoppingBag size={22} />,
      color: "text-blue-500",
      border: "border-blue-200",
      bg: "bg-blue-50",
    },
    {
      id: "edit-profile",
      label: "Edit Profile",
      icon: <UserPen size={22} />,
      color: "text-emerald-500",
      border: "border-emerald-200",
      bg: "bg-emerald-50",
    },
    {
      id: "wishlist",
      label: "Wishlist",
      icon: <Heart size={22} />,
      color: "text-rose-500",
      border: "border-rose-200",
      bg: "bg-rose-50",
    },
    {
      id: "change-password",
      label: "Change Password",
      icon: <Lock size={22} />,
      color: "text-purple-500",
      border: "border-purple-200",
      bg: "bg-purple-50",
    },
    {
      id: "points",
      label: "Loyalty Points",
      icon: <Award size={22} />,
      color: "text-indigo-500",
      border: "border-indigo-200",
      bg: "bg-indigo-50",
    },
    {
      id: "return",
      label: "Returns",
      icon: <RefreshCcw size={22} />,
      color: "text-orange-500",
      border: "border-orange-200",
      bg: "bg-orange-50",
    },
    {
      id: "support",
      label: "Support",
      icon: <Headset size={22} />,
      color: "text-amber-500",
      border: "border-amber-200",
      bg: "bg-amber-50",
    },
  ];

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "https://api.victusbyte.com/api/customer/my-orders",
        { withCredentials: true },
      );
      if (res.data.success) {
        setOrders(res.data.orders || []);
      }
    } catch (error) {
      if (error.response?.status !== 401) {
        toast.error(
          error.response?.data?.message || "Failed to sync order history",
        );
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Profile...
      </div>
    );
  }

  return (
    <div>
      {/* --- DESKTOP VERSION --- */}
      <div className="hidden md:block max-w-[1400px] lg:mt-[86px] mt-[49px] px-2 lg:px-4 mx-auto md:py-6 py-3 font-sans">
        <div className="flex flex-col lg:flex-row md:gap-4 gap-2">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden flex items-center gap-2 bg-white p-3 rounded shadow text-[#1976d2] font-bold"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            <span>Dashboard Menu</span>
          </button>

          <div
            className={`lg:w-1/4 w-full bg-white shadow-xs rounded p-4 h-fit ${isSidebarOpen ? "block" : "hidden lg:block"}`}
          >
            <div className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`flex items-center justify-between p-2.5 rounded transition-all ${activeTab === item.id ? "bg-[#1976d2] text-white shadow-md" : "text-slate-900 hover:bg-slate-100"}`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon} <span className="">{item.label}</span>
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
              <button
                onClick={logout}
                className="flex items-center gap-3 p-3 text-red-500 hover:bg-red-100 bg-red-50/70 rounded transition-all w-full text-left"
              >
                <LogOut size={20} /> <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          <div className="lg:w-3/4 w-full bg-white shadow-xs p-4 rounded min-h-[calc(100vh-12rem)]">
            {activeTab === "overview" && (
              <div className="animate-in fade-in duration-300">
                <div className="relative mb-8">
                  <h2 className="text-[13px] font-black text-slate-800 uppercase tracking-[0.1em] flex items-center gap-3">
                    <span className="w-1.5 h-5 bg-[#1976d2] rounded-full"></span>{" "}
                    Account Overview
                  </h2>
                  <div className="mt-3 w-full -mb-4 h-[1px] bg-linear-to-r from-slate-200 via-slate-100 to-transparent"></div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-8 px-8 mt-3 bg-slate-50/50 rounded-2xl md:mb-8 mb-3 relative overflow-hidden group">
                  <div className="relative">
                    <img
                      src={
                        "https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/user.png" ||
                        user.images
                      }
                      alt="Profile"
                      className="md:w-28 md:h-28 w-23 h-23 rounded-full object-cover"
                    />
                    {user?.isVerified && (
                      <div className="absolute bottom-1 right-1 bg-blue-500 text-white p-1 rounded-full border-2 border-white shadow-sm">
                        <ShieldCheck size={14} />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow text-center md:text-left z-10">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                      <h3 className="md:text-xl text-md font-black text-slate-800 uppercase tracking-tight">
                        {user.userName}
                      </h3>
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded uppercase border w-fit mx-auto md:mx-0 ${user.isVerified ? "text-blue-600 bg-green-50 border-blue-100" : "text-slate-400 bg-slate-100 border-slate-200"}`}
                      >
                        {user.isVerified ? "Verified" : "Unverified"}
                      </span>
                    </div>
                    <p className="text-slate-600 md:mb-4">{user.email}</p>
                  </div>
                  <div className="flex md:w-1/2 md:bg-slate-100/30 p-2 rounded-xl md:border border-slate-200 flex-col gap-y-4 md:pt-4 pt-2">
                    <div className="flex justify-between gap-10">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-slate-400">
                          Phone
                        </p>
                        <p className="text-sm font-medium text-slate-700">
                          {user.phone || "N/A"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-slate-400">
                          Gender
                        </p>
                        <p className="text-sm font-medium text-slate-700">
                          {user.gender || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between gap-10">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-slate-400">
                          Since
                        </p>
                        <p className="text-sm font-medium text-slate-700">
                          {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString(
                                "en-GB",
                              )
                            : "N/A"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold text-slate-400">
                          Customer ID
                        </p>
                        <p className="text-sm font-bold text-[#1976d2]">
                          {user.cID || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  {[
                    {
                      label: "Total Orders",
                      value: orders.length,
                      color: "bg-blue-50",
                    },
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
                      <p className="text-xs text-gray-500 font-bold uppercase">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "edit-profile" && (
              <EditProfile data={user} checkUserStatus={checkUserStatus} />
            )}
            {activeTab === "change-password" && <ChangedPassword />}
            {activeTab === "myorder" && <MyOrder />}
            {activeTab === "points" && <LoyaltyPage user={user} />}
            {activeTab === "support" && <SupportPage />}
            {activeTab === "return" && <ReturnPage />}
          </div>
        </div>
      </div>

      {/* --- MOBILE VERSION --- */}
      <div className="px-2 mt-15 min-h-screen md:hidden">
        {activeTab === "overview" ? (
          <div className="animate-in fade-in duration-300">
            <div className="relative mb-2 bg-white border border-slate-200 p-2">
              <h2 className="text-[13px] font-bold text-[#1976d2] uppercase tracking-[0.1em] flex items-center gap-3">
                <span className="w-1 h-5 bg-[#1976d2] rounded-full"></span>{" "}
                Dashboard
              </h2>
            </div>

            <div className="flex items-center gap-4 p-3 bg-white border border-slate-100 rounded mb-3 relative overflow-hidden">
              <div className="flex flex-col items-center shrink-0 w-28 border-r border-slate-100 pr-2">
                <div className="relative mb-2.5">
                  <img
                    src={
                      "https://7vgva7cju0vcfvwf.public.blob.vercel-storage.com/user.png" ||
                      user.images
                    }
                    alt="Profile"
                    className="w-16 h-16 p-1.5 rounded-full object-cover border border-blue-100"
                  />
                  {user?.isVerified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-0.5 rounded-full border-2 border-white">
                      <ShieldCheck size={12} />
                    </div>
                  )}
                </div>
                <h3 className="text-xs font-semibold text-slate-800 text-center truncate w-full">
                  {user.userName}
                </h3>
                <span className="text-[8px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded mt-1 border border-blue-100 uppercase">
                  {user.isVerified ? "Verified" : "User"}
                </span>
              </div>
              <div className="flex-grow grid grid-cols-2 gap-x-8">
                <div className="space-y-4">
                  <div className="flex flex-col">
                    <p className="text-[9px] uppercase font-bold text-slate-400">
                      ID
                    </p>
                    <p className="text-[11px] font-bold text-blue-600">
                      #{user.cID || "000"}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <p className="text-[8px] uppercase font-bold text-slate-400">
                      Gender
                    </p>
                    <p className="text-[11px] font-medium text-slate-700">
                      {user.gender || "N/A"}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex flex-col col-span-2 border-t border-slate-50 pt-1">
                    <p className="text-[8px] uppercase font-bold text-slate-400">
                      Phone
                    </p>
                    <p className="text-[11px] font-medium text-slate-700">
                      {user.phone || "N/A"}
                    </p>
                  </div>
                  <div className="flex flex-col col-span-2">
                    <p className="text-[8px] uppercase font-bold text-slate-400">
                      Member Since
                    </p>
                    <p className="text-[10px] font-medium text-slate-700">
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-GB")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex h-10 w-full mb-4 items-center bg-[#1976d2] rounded shadow-[1px_1px_2px_rgba(25,118,210,0.2),2px_2px_4px_rgba(25,118,210,0.2)]">
              {/* Left Side: Membership */}
              <div className="flex-1 flex items-center justify-center  gap-2">
                <ShieldCheck size={16} className="text-white" />
                <span className="text-sm font-bold text-white whitespace-nowrap">
                  Platinum
                </span>
              </div>

              {/* The Divider: Semi-transparent white to blend with #1976d2 */}
              <div className="h-5 w-px bg-white/30 shrink-0"></div>

              {/* Right Side: Points */}
              <div className="flex-1 flex items-center justify-center pl-4 gap-1">
                <span className="text-[10px] font-bold text-blue-100 uppercase tracking-tight">
                  Points:
                </span>
                <span className="text-sm font-black text-white">150</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 px-2">
              {MobileMenuItems.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleTabChange(item.id)}
                    className={`group py-3 flex flex-col items-center justify-center bg-white rounded-md border active:scale-95 active:shadow-inner transition-all duration-200 overflow-hidden relative ${item.border}`}
                  >
                    <div
                      className={`absolute inset-0 opacity-0 group-active:opacity-10 bg-current ${item.color}`}
                    />

                    <div
                      className={`mb-3 p-2.5 rounded-xl transition-colors group-active:bg-transparent ${item.bg} ${item.color}`}
                    >
                      {React.cloneElement(item.icon, {
                        size: 20,
                        strokeWidth: 2,
                      })}
                    </div>

                    <span className="text-[11.55px] font-medium text-slate-800 tracking-tighter leading-tight px-1 text-center">
                      {item.label}
                    </span>

                    <div
                      className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full opacity-40 ${item.bg}`}
                    />
                  </button>
                )
              )}

              <button
                onClick={logout}
                className="flex flex-col items-center justify-center bg-white rounded-lg border border-red-200 active:scale-95 py-3"
              >
                <div className="mb-3 p-2.5 rounded-xl bg-red-50 text-red-500">
                   <LogOut size={20} strokeWidth={2} />
                </div>
                <span className="text-[11.55px] font-medium text-red-600">
                  Logout
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-in slide-in-from-bottom-5 duration-300">
            <button
              onClick={() => handleTabChange("overview")}
              className="mb-2 flex items-center gap-2 text-[#1976d2] font-bold text-sm bg-white p-2 rounded border border-slate-200"
            >
              <ChevronRight size={20} className="rotate-180" /> Back to
              Dashboard
            </button>
            <div className="bg-white p-2 rounded shadow-sm border border-slate-100">
              {activeTab === "edit-profile" && (
                <EditProfile data={user} checkUserStatus={checkUserStatus} />
              )}
              {activeTab === "change-password" && <ChangedPassword />}
              {activeTab === "myorder" && <MyOrder />}
              {activeTab === "points" && <LoyaltyPage user={user} />}
              {activeTab === "support" && <SupportPage />}
              {activeTab === "return" && <ReturnPage />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;