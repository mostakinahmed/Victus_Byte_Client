import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiPackage,
  FiClock,
  FiSearch,
  FiAlertCircle,
  FiNavigation,
  FiMapPin,
} from "react-icons/fi";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

// 1. UPDATED STATUSES: Professional Steadfast Lifecycle
const statuses = [
  {
    title: "In Review",
    icon: <FiClock size={22} />,
    desc: "Awaiting courier approval",
  },
  {
    title: "Picked Up",
    icon: <FiPackage size={22} />,
    desc: "Handed over to courier",
  },
  {
    title: "In Transit",
    icon: <FiNavigation size={22} />,
    desc: "Moving between hubs",
  },
  {
    title: "Out For Delivery",
    icon: <FiMapPin size={22} />,
    desc: "Rider is in your area",
  },
  {
    title: "Delivered",
    icon: <FiCheckCircle size={22} />,
    desc: "Successfully received",
  },
];

const TrackOrderSttedFast = () => {
  const { oid } = useParams();
  const [orderId, setOrderId] = useState(oid || "");
  const [currentStatus, setCurrentStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);

  // --- MOCK ENGINE: SIMULATES API DELAY & LOGIC ---
  const handleTrack = async (idToTrack) => {
    let targetId = idToTrack || orderId;

    if (!targetId || !targetId.trim()) {
      setNotFound(false);
      setCurrentStatus(null);
      return;
    }

    setLoading(true);
    setNotFound(false);
    setCurrentStatus(null);

    // Simulate Network Delay (1.2 seconds)
    setTimeout(() => {
      const idNum = parseInt(targetId);

      // TEST LOGIC: IDs 1 through 5 map to the statuses
      if (idNum >= 1 && idNum <= 5) {
        setCurrentStatus(idNum - 1); // Sets index 0-4
        setNotFound(false);
      } else {
        setNotFound(true);
        setCurrentStatus(null);
      }
      setLoading(false);
    }, 1200);
  };

  useEffect(() => {
    if (oid) handleTrack(oid);
  }, [oid]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1400px] lg:mt-[70px] mt-[38px] px-2 lg:px-4 mx-auto md:py-10 py-6 font-sans"
    >
      <div className="bg-white border border-slate-100 rounded md:p-10 pb-10 m p-3 min-h-[75vh]">
        {/* Header */}
        <div className="text-center md:mb-12 mt-3 md:mt-0 mb-6">
          <h1 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight md:mb-3 uppercase">
            Victus <span className="text-[#1976d2]">Logistics</span> Tracker
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Sandbox Environment
          </p>
        </div>

        {/* Input Section */}
        <div className="relative flex flex-col sm:flex-row gap-3 w-full max-w-xl mx-auto md:mb-20 mb-10">
          <div className="relative flex-grow group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
              <FiSearch
                className="text-slate-400 group-focus-within:text-[#1976d2] transition-colors"
                size={20}
              />
              <span className="text-slate-900 font-bold tracking-wider border-r border-slate-300 pr-2">
                OID
              </span>
            </div>

            <input
              type="text"
              placeholder="Type 1 to 5 to test"
              maxLength={6}
              className="w-full pl-24 pr-4 py-3 uppercase rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-[#1976d2] transition-all font-bold text-[#1976d2] tracking-widest"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value.replace(/\D/g, ""))}
            />
          </div>
          <button
            onClick={() => handleTrack()}
            disabled={loading}
            className="bg-[#1976d2] text-white px-10 py-3.5 rounded-xl font-black uppercase text-sm tracking-widest hover:bg-[#1565c0] active:scale-95 shadow-xl shadow-blue-200 disabled:opacity-50"
          >
            {loading ? "System Sync..." : "Track Order"}
          </button>
        </div>

        <AnimatePresence mode="wait">
          {currentStatus !== null && (
            <motion.div
              key="status-container"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-5xl mx-auto"
            >
              {/* STATUS STEPPER */}
              <div className="relative flex justify-between items-start mb-16 px-4">
                <div className="absolute top-8 left-0 w-full h-1 bg-slate-100 z-0 rounded-full"></div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${(currentStatus / (statuses.length - 1)) * 100}%`,
                  }}
                  className="absolute top-8 left-0 h-1 bg-[#1976d2] z-0 rounded-full shadow-[0_0_15px_rgba(25,118,210,0.4)]"
                ></motion.div>

                {statuses.map((status, index) => {
                  const isActive = index <= currentStatus;
                  const isCurrent = index === currentStatus;
                  return (
                    <div
                      key={status.title}
                      className="relative z-10 flex flex-col items-center flex-1"
                    >
                      <motion.div
                        className={`w-14 h-14 md:w-16 md:h-16 flex justify-center items-center rounded-2xl border-2 transition-all duration-500 ${
                          isActive
                            ? "border-[#1976d2] bg-[#1976d2] text-white shadow-lg"
                            : "border-slate-100 bg-white text-slate-200"
                        } ${isCurrent ? "ring-4 ring-blue-100 animate-pulse" : ""}`}
                      >
                        {status.icon}
                      </motion.div>
                      <p
                        className={`mt-5 text-[9px] md:text-[11px] font-black uppercase tracking-widest text-center ${isActive ? "text-slate-800" : "text-slate-300"}`}
                      >
                        {status.title}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* DETAILS CARD */}
              <motion.div className="bg-slate-900 rounded-3xl md:p-10 p-6 max-w-xl mx-auto text-center border-b-8 border-[#1976d2] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <FiNavigation size={120} className="text-white" />
                </div>

                <h2 className="text-[10px] font-black text-[#1976d2] uppercase tracking-[0.3em] mb-2">
                  Consignment ID: SF-{orderId}9921
                </h2>
                <p className="text-3xl md:text-4xl font-black text-white mb-6 uppercase tracking-tight italic">
                  {statuses[currentStatus].title}
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  Steadfast Intelligence: Your shipment is officially in the{" "}
                  <span className="text-white font-bold underline decoration-[#1976d2] decoration-2 underline-offset-4">
                    {statuses[currentStatus].title.toLowerCase()}
                  </span>{" "}
                  phase. Delivery is estimated to be completed soon.
                </p>
              </motion.div>
            </motion.div>
          )}

          {notFound && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-10 text-center"
            >
              <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-4 border border-rose-100">
                <FiAlertCircle size={40} />
              </div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">
                No Record Found
              </h3>
              <p className="text-slate-400 text-sm max-w-xs mt-2 font-medium leading-relaxed">
                Steadfast system could not find OID{" "}
                <span className="text-rose-500 font-bold">{orderId}</span>.
                <br />
                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mt-2 block italic">
                  Hint: Try typing 1, 2, 3, 4, or 5
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default TrackOrderSttedFast;
