import React, { useState, useRef, useEffect } from "react";
import {
  User,
  LogOut,
  ShoppingBag,
  UserCog,
  Search,
  Package,
  Truck,
  CheckCircle,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaGem } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const Profile = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [open, setOpen] = useState(false); // dropdown
  const [trackModal, setTrackModal] = useState(false); // Tracking Modal state
  const [orderId, setOrderId] = useState("");
  const [trackingResult, setTrackingResult] = useState(null);

  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const goProfile = () => {
    setOpen(false);
    navigate("/profile");
  };



  return (
    <div className="relative" ref={menuRef}>
      {/* --- User Icon / Sign In Trigger --- */}
      {login ? (
        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer border border-transparent hover:border-slate-400 lg:py-[7px] lg:px-2 py-[4px] px-1 rounded-3xl transition-all"
        >
          <button className="flex gap-2 cursor-pointer justify-center items-center">
            <User className="w-6 h-6 hover:text-indigo-600 text-slate-800" />
          </button>
        </div>
      ) : (
        <div className=" md:hover:border-indigo-300 py-[6px] md:px-2 md:rounded-2xl md:border p-1.5 hover:bg-slate-100 transition-all">
          <button
            onClick={() => navigate("/signin")}
            className="flex gap-2 justify-center items-center  md:px-2 cursor-pointer "
          >
            <User className="w-6 h-6 text-indigo-600" />
            <h2 className="hidden lg:flex text-sm font-black  tracking-widest text-slate-700">
              Sign in
            </h2>
          </button>
        </div>
      )}

      {/* --- Logged In Dropdown (Compact Version) --- */}
      {login && open && (
        <div className="relative z-[100]">
          {/* Reduced width from 320px to 260px and padding from p-4 to p-3 */}
          <div className="absolute md:top-2 top-2 md:right-0 -right-2 w-max md:min-w-[260px] min-w-[240px] bg-white backdrop-blur-md shadow-xl rounded-b border border-slate-300 z-[100] p-3 animate-in fade-in zoom-in-95 duration-200">
            {/* User Identity Header - Compacted gap and padding */}
            <div className="flex items-center gap-3 pb-3 border-b border-slate-300">
              {/* Smaller Avatar Icon (w-10 h-10) */}
              <div className="bg-indigo-600 w-9 h-9 flex justify-center items-center rounded-xl shadow-md shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-black text-slate-800 uppercase tracking-tight truncate">
                  Mostakin Ahmed
                </span>
                <span className="text-[12px] text-slate-500 font-mono">
                  +880 1773-820336
                </span>
              </div>
            </div>

            {/* Points Card - Slimmer version */}
            <div className="mt-3 bg-gradient-to-br from-amber-500 to-[#fe741d] rounded-xl p-2.5 shadow-md border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-white">
                  <FaGem className="animate-pulse" size={15} />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-90">
                    Rewards
                  </span>
                </div>
                <span className="bg-white/20 px-1.5 py-0.5 rounded text-[8px] font-black text-white">
                  PRO
                </span>
              </div>
              <p className="text-lg font-black text-white mt-0.5">
                10 <span className="text-[10px] opacity-90 uppercase">Pts</span>
              </p>
            </div>

            {/* Navigation Links - Reduced py and gap */}
            <nav className="mt-3">
              <ul className="flex flex-col gap-0.5">
                {[
                  { label: "Profile", icon: <User />, onClick: goProfile },
                  {
                    label: "My Orders",
                    icon: <ShoppingBag />,
                    onClick: () => {
                      setOpen(false);
                      navigate("/profile/my-order");
                    },
                  },
                  {
                    label: "Track Order",
                    icon: <UserCog />,
                    onClick: () => {
                      setOpen(false);
                      setTrackModal(true);
                    },
                  },
                ].map((item, idx) => (
                  <li
                    key={idx}
                    onClick={item.onClick}
                    className="group px-2 py-1.5 rounded-lg hover:bg-slate-100 flex items-center justify-between cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-slate-100 rounded-md group-hover:bg-white group-hover:shadow-sm transition-all">
                        {React.cloneElement(item.icon, {
                          className:
                            "w-4 h-4 text-slate-700 group-hover:text-indigo-600",
                        })}
                      </div>
                      <span className="text-[14px] font-semibold text-slate-700 group-hover:text-slate-900  tracking-wide">
                        {item.label}
                      </span>
                    </div>
                  </li>
                ))}

                <div className="my-1.5 border-t border-slate-100" />

                <li
                  onClick={() => {
                    setLogin(false);
                    setOpen(false);
                  }}
                  className="group px-2 py-1.5 rounded-lg hover:bg-rose-100 bg-rose-200/70 md:bg-rose-50 flex items-center gap-2.5 cursor-pointer transition-all"
                >
                  <div className="p-1.5 bg-rose-100/50 rounded-md group-hover:bg-rose-500 transition-all">
                    <LogOut className="w-3.5 h-3.5 text-rose-600 group-hover:text-white" />
                  </div>
                  <span className="text-[11px] font-black text-rose-600 uppercase tracking-widest">
                    Logout
                  </span>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};
