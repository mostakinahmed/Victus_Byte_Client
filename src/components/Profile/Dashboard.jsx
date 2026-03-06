import React, { useEffect, useState } from "react";
// Add this import line
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

  // Sidebar Menu Items
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

  const MobileMenuItems = [
    {
      label: "My Orders",
      icon: <ShoppingBag size={22} />,
      color: "text-blue-500",
      path: "/orders",
    },
    {
      label: "Edit Profile",
      icon: <UserPen size={22} />,
      color: "text-emerald-500",
      path: "/profile",
    },
    {
      label: "Wishlist",
      icon: <Heart size={22} />,
      color: "text-rose-500",
      path: "/wishlist",
    },

    {
      label: "Change Password",
      icon: <Lock size={22} />,
      color: "text-purple-500",
      path: "/password",
    },
    {
      label: "Loyalty Points",
      icon: <Award size={22} />,
      color: "text-indigo-500",
      path: "/loyalty",
    },
    {
      label: "Returns",
      icon: <RefreshCcw size={22} />,
      color: "text-orange-500",
      path: "/returns",
    },
    {
      label: "Support",
      icon: <Headset size={22} />,
      color: "text-amber-500",
      path: "/support",
    },
  ];

  // --- API LOGIC: FETCH ORDERS ---
  const fetchOrders = async () => {
    try {
      // axios is now imported and will work
      const res = await axios.get(
        "https://api.victusbyte.com/api/customer/my-orders",
        { withCredentials: true },
      );
      if (res.data.success) {
        setOrders(res.data.orders || []);
      }
    } catch (error) {
      // Only show error toast if it's not a generic auth failure
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

  // Loading state guard to prevent "undefined" errors on user properties
  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Profile...
      </div>
    );
  }

  return (
    <div>
      <div className="hidden md:block max-w-[1400px] lg:mt-[86px] mt-[49px] px-2 lg:px-4 mx-auto md:py-6 py-3 font-sans">
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
                    <span className="">{item.label}</span>
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
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>

          {/* --- RIGHT SIDE CONTENT --- */}
          <div className="lg:w-3/4 w-full bg-white shadow-xs p-4 rounded min-h-[calc(100vh-12rem)]">
            {activeTab === "overview" && (
              <div className="animate-in fade-in duration-300">
                <div className="relative mb-8">
                  <h2 className="text-[13px] font-black text-slate-800 uppercase tracking-[0.1em] flex items-center gap-3">
                    <span className="w-1.5 h-5 bg-[#1976d2] rounded-full"></span>
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
                      {user.isVerified ? (
                        <span className="text-[10px] font-extrabold text-blue-600 bg-green-50 px-2 py-0.5 rounded uppercase border border-blue-100 w-fit mx-auto md:mx-0">
                          Verified
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase border border-slate-200 w-fit mx-auto md:mx-0">
                          Unverified
                        </span>
                      )}
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

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

            {["wishlist"].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center h-full text-center py-20 animate-in fade-in">
                <div className="p-4 bg-gray-50 rounded-full mb-4 text-[#1976d2]">
                  {menuItems.find((m) => m.id === activeTab)?.icon}
                </div>
                <h2 className="text-xl font-bold text-gray-800 uppercase">
                  {menuItems.find((m) => m.id === activeTab)?.label}
                </h2>
                <p className="text-gray-500">Coming soon to your dashboard.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* for mobile */}
      <div className="px-2  mt-15 min-h-screen md:hidden">
        {/* Title for Context */}
        <div className="animate-in fade-in duration-300">
          <div className="relative mb-2 bg-white border p-2">
            <h2 className="text-[13px] font-bold text-[#1976d2] uppercase tracking-[0.1em] flex items-center gap-3">
              <span className="w-1.5 h-5 bg-[#1976d2] rounded-full"></span>
              Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-4 p-3 bg-white border border-slate-200 rounded mb-3 relative overflow-hidden">
            {/* Left Column: Image & Name (Fixed Width) */}
            <div className="flex flex-col items-center shrink-0 w-28 border-r border-slate-100 pr-2">
              <div className="relative mb-2.5 ">
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
              <h3 className="text-xs font-semibold text-slate-800  text-center truncate  w-full">
                {user.userName}
                {/* Show first name only for extreme compactness */}
              </h3>
              <span className="text-[8px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded mt-1 border border-blue-100 uppercase">
                {user.isVerified ? "Verified" : "User"}
              </span>
            </div>

            {/* Right Column: Other Info (Grid) */}
            <div className="flex-grow grid grid-cols-2 gap-x-8">
              {/* Row 1 */}

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

              {/* Row 2 */}
              <div className="space-y-4">
                <div className="flex flex-col col-span-2 border-t border-slate-50 pt-1">
                  <p className="text-[8px] uppercase font-bold text-slate-400">
                    Phone
                  </p>
                  <p className="text-[11px] font-medium text-slate-700">
                    {user.phone || "N/A"}
                  </p>
                </div>

                {/* Row 3 */}
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
        </div>

      
        {/* The 3-Column Grid */}
        <div className="grid grid-cols-3 gap-3">
          {MobileMenuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => navigate(item.path)}
              className="group aspect-square flex flex-col items-center justify-center bg-white rounded-md border border-slate-200 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] active:scale-95 active:shadow-inner transition-all duration-200 overflow-hidden relative"
            >
              {/* Subtle Background Glow on Hover/Active */}
              <div
                className={`absolute inset-0 opacity-0 group-active:opacity-5 bg-current ${item.color}`}
              />

              {/* Icon Container with soft background */}
              <div
                className={`mb-3 p-2.5 rounded-xl bg-slate-50 transition-colors group-active:bg-transparent ${item.color}`}
              >
                {React.cloneElement(item.icon, { size: 22, strokeWidth: 2.2 })}
              </div>

              {/* Label with improved typography */}
              <span className="text-[11.55px] font-medium text-slate-700  tracking-tighter leading-tight px-1">
                {item.label}
              </span>

              {/* Bottom accent bar for a premium feel */}
              <div
                className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full opacity-20 ${item.color.replace("text", "bg")}`}
              />
            </button>
          ))}
        </div>
      </div>{" "}
    </div>
  );
};

export default Profile;
