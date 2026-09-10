import React, { useState, useRef, useEffect } from "react";
import { User, LogOut, UserCog, LayoutDashboard } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FaGem } from "react-icons/fa";
import { useAuth } from "../Context Api/AuthContext";

export const Profile = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const goDashboard = () => {
    setOpen(false);
    navigate("/dashboard");
  };

  return (
    <div className="relative font-sans" ref={menuRef}>
      {user ? (
        <div
          onClick={() => setOpen(!open)}
          className="
    cursor-pointer
    p-1
    rounded-full
    transition-all
    duration-300
    hover:scale-105
    active:scale-95

    animate-in
    fade-in
    slide-in-from-top-2
    zoom-in-95
    duration-300
  "
        >
          <button
            title={user.userName}
            className="flex gap-2 cursor-pointer justify-center items-center bg-transparent border-none"
          >
            <img
              src="/u1.svg"
              alt=""
              className="md:h-9 md;w-9 w-8 h-8 md:p-0 bg-transparent border-0 outline-none"
            />
          </button>
        </div>
      ) : (
        <div
          onClick={() => navigate("/signin")}
          className="group relative cursor-pointer overflow-hidden rounded-full border border-brand/30 bg-white/5 md:px-1.5 md:py-1 shadow-sm transition-all duration-600 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-brand/10 hover:shadow-[0_10px_25px_rgba(25,118,210,0.20)] animate-in fade-in zoom-in-95 duration-800"
        >
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute top-0 -left-20 h-full w-8 bg-white/20 skew-x-12 group-hover:animate-shine" />
          </div>

          <button className="relative z-10 flex cursor-pointer items-center gap-3 md:px-2">
            {/* Icon slides in from the right */}
            <div className="flex h-8 w-8 md:-ml-2 items-center justify-center rounded-full md:bg-brand/30 transition-all duration-500 group-hover:bg-brand group-hover:shadow-[0_0_12px_rgba(25,118,210,0.35)] animate-in slide-in-from-right duration-900">
              <User className="h-5 w-5 md:h-4 md:w-4 text-brand transition-all duration-300 group-hover:text-white group-hover:scale-110" />
            </div>

            {/* Text slides in from the left */}
            <h2 className="hidden lg:flex text-[15.5px] font-bold tracking-wide text-white/90 transition-colors duration-500 group-hover:text-brand animate-in slide-in-from-left duration-800">
              Sign In
            </h2>
          </button>
        </div>
      )}

      {user && open && (
        <div className="relative z-[100]">
          <div className="absolute md:top-5 top-2.5 md:right-0 -right-3 w-max md:min-w-[260px] min-w-[220px] bg-white backdrop-blur-md shadow-2xl rounded-b border border-slate-300 z-[100] p-3 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-center gap-3 pb-3 border-b border-slate-300">
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-black text-slate-800 uppercase tracking-tight truncate">
                  {user.userName}
                </span>
                <span className="text-[12px] text-slate-500 font-mono">
                  +88{user.phone}
                </span>
              </div>
            </div>

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
                {user.loyaltyPoints}{" "}
                <span className="text-[10px] opacity-90 uppercase">Pts</span>
              </p>
            </div>

            <nav className="mt-3 font-sans">
              <ul className="flex flex-col gap-1">
                {[
                  {
                    label: "Dashboard",
                    icon: <LayoutDashboard />,
                    onClick: goDashboard,
                  },
                  {
                    label: "Track Order",
                    icon: <UserCog />,
                    onClick: () => {
                      setOpen(false);
                      navigate("/track-order");
                    },
                  },
                ].map((item, idx) => (
                  <li
                    key={idx}
                    onClick={item.onClick}
                    className="group px-2 py-1.5 rounded-lg hover:bg-slate-100 flex items-center justify-between cursor-pointer transition-all active:scale-95"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-slate-200 rounded-md group-hover:bg-white group-hover:shadow-sm transition-all">
                        {React.cloneElement(item.icon, {
                          className:
                            "w-4 h-4 text-slate-700 group-hover:text-indigo-600",
                        })}
                      </div>
                      <span className="text-xs font-bold text-slate-700 uppercase group-hover:text-slate-900 tracking-wide">
                        {item.label}
                      </span>
                    </div>
                  </li>
                ))}

                <div className="my-1.5 border-t border-slate-100" />

                <li
                  onClick={logout}
                  className="group px-2 py-1.5 rounded-lg hover:bg-rose-100 bg-rose-200/70 md:bg-rose-50 flex items-center gap-2.5 cursor-pointer transition-all active:scale-95"
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
