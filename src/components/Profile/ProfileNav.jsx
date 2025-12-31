import React, { useState, useRef, useEffect } from "react";
import { User, LogOut, ShoppingBag, UserCog } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaGem } from "react-icons/fa";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export const Profile = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(true);
  const [open, setOpen] = useState(false); // dropdown open/close
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

  //all func
  const goProfile = () => {
    setOpen(false);
    navigate("/profile");
  };
  return (
    <div className="relative " ref={menuRef}>
      {/* If user is logged in */}
      {login ? (
        <div
          onClick={() => setOpen(!open)}
          className="cursor-pointer  border border-transparent hover:border-gray-500 lg:py-[7px] lg:px-2 py-[4px] px-1 rounded-3xl "
        >
          <button className="flex gap-2 cursor-pointer justify-center items-center">
            <User className="w-6 h-6 hover:text-orange-500 text-gray-900" />
          </button>
        </div>
      ) : (
        // If user is NOT logged in
        <div className="border border-transparent hover:border-gray-300 py-[6px] px-3 rounded bg-white hover:bg-gray-50 -ml-1 lg:-ml-0">
          <button
            onClick={() => navigate("/signin")}
            className="flex gap-2 justify-center items-center"
          >
            <User className="w-6 h-6" />
            <h2 className="hidden lg:flex text-lg">Sign in</h2>
          </button>
        </div>
      )}

      {/* Dropdown when logged in */}
      {login && open && (
        <div className="relative z-[100]">
          {/* --- 2. THE DROPDOWN DIV --- */}
          <div className="absolute md:top-11 top-11 md:right-0 -right-2 w-max md:min-w-[320px] min-w-[280px] bg-white/95 backdrop-blur-md shadow-2xl rounded-b-2xl border border-slate-300 z-[100] p-4 animate-in fade-in zoom-in-95 duration-300">
            {/* User Identity Header */}
            <div className="flex items-center gap-4 pb- border-b border-slate-100">
              <div className="bg-indigo-600 w-12 h-12 flex justify-center items-center rounded-2xl shadow-lg shadow-indigo-100 shrink-0">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-black text-slate-800 uppercase tracking-tight truncate">
                  Mostakin Ahmed
                </span>
                <span className="text-[11px] font-bold text-slate-400 font-mono">
                  +880 1773-820336
                </span>
              </div>
            </div>

            {/* Points & Loyalty Card */}
            <div className="mt-4 bg-gradient-to-br from-amber-500 to-[#fe741d] rounded-xl p-3 shadow-lg shadow-amber-100 border border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <FaGem className="animate-pulse" size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-80">
                    Reward Balance
                  </span>
                </div>
                <span className="bg-white/20 px-2 py-0.5 rounded-md text-[10px] font-black text-white">
                  PRO
                </span>
              </div>
              <p className="text-xl font-black text-white mt-1">
                10{" "}
                <span className="text-xs font-bold opacity-90 uppercase">
                  Points
                </span>
              </p>
            </div>

            {/* Navigation Links */}
            <nav className="mt-4">
              <ul className="flex flex-col gap-1">
                <li
                  onClick={() => {
                    setOpen(false);
                    navigate("/profile/my-order");
                  }}
                  className="group px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                      <ShoppingBag className="w-4 h-4 text-slate-600 group-hover:text-indigo-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 uppercase tracking-tighter">
                      My Orders
                    </span>
                  </div>
                  <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-indigo-500 transition-all" />
                </li>

                <li
                  onClick={goProfile}
                  className="group px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                      <User className="w-4 h-4 text-slate-600 group-hover:text-indigo-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 uppercase tracking-tighter">
                      Profile Settings
                    </span>
                  </div>
                </li>

                <li
                  onClick={async () => {
                    setOpen(false);
                    /* Your MySwal logic remains the same */
                  }}
                  className="group px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg group-hover:bg-white group-hover:shadow-sm transition-all">
                      <UserCog className="w-4 h-4 text-slate-600 group-hover:text-indigo-600" />
                    </div>
                    <span className="text-xs font-bold text-slate-600 group-hover:text-slate-900 uppercase tracking-tighter">
                      Track Order
                    </span>
                  </div>
                </li>

                {/* Separator */}
                <div className="my-2 border-t border-slate-50" />

                <li
                  onClick={() => {
                    setLogin(false);
                    setOpen(false);
                  }}
                  className="group px-3 py-2.5 rounded-xl hover:bg-rose-50 flex items-center gap-3 cursor-pointer transition-all"
                >
                  <div className="p-2 bg-rose-100/50 rounded-lg group-hover:bg-rose-500 transition-all">
                    <LogOut className="w-4 h-4 text-rose-600 group-hover:text-white" />
                  </div>
                  <span className="text-xs font-black text-rose-600 uppercase tracking-widest">
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
