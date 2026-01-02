import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiMessageCircle,
  FiGlobe,
  FiCheckCircle,
} from "react-icons/fi";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className=" max-w-[1400px] mx-auto md:px-4 px-2 md:mt-27 mt-15 min-h-screen">
      {/* --- 1. HERO HEADER --- */}
      <section className="relative md:py-20 py-15 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600 rounded-full blur-[150px] -translate-x-1/2 translate-y-1/2"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-left"
          >
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter uppercase mb-4">
              Get in <span className="text-indigo-500">Touch</span>
            </h1>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">
              Victus Byte Support Registry // BD Division
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- 2. MAIN CONTENT: 1400px Max Width --- */}
      <section className="py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* LEFT: Contact Information (4 Columns) */}
          <div className="lg:col-span-5 space-y-10">
            <div>
              <h2 className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.4em] mb-4">
                Contact Details
              </h2>
              <h3 className="text-3xl font-black text-slate-800 uppercase tracking-tight mb-8">
                Connect with our <br /> Technical Experts
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <ContactCard
                icon={<FiPhone />}
                label="Direct Line"
                value="+880 1773-820336"
                sub="Available 10AM - 8PM"
              />
              <ContactCard
                icon={<FiMail />}
                label="Registry Email"
                value="support@victusbyte.com"
                sub="Response within 24 hours"
              />
              <ContactCard
                icon={<FiMapPin />}
                label="Corporate Hub"
                value="Multiplan Center, Level-9, Dhaka, Bangladesh"
                sub="In-person technical support"
              />
              <ContactCard
                icon={<FiMessageCircle />}
                label="WhatsApp Support"
                value="Connect via Chat"
                sub="Fastest response time"
                link="https://wa.me/8801773820336"
              />
            </div>
          </div>

          {/* RIGHT: Contact Form (7 Columns) */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-sm relative overflow-hidden">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                    <FiCheckCircle size={40} />
                  </div>
                  <h4 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
                    Transmission Received
                  </h4>
                  <p className="text-slate-500 mt-2 font-medium">
                    Your inquiry has been logged into our support registry.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Mostakin Ahmed"
                        className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="admin@example.com"
                        className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Subject
                    </label>
                    <select className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all appearance-none">
                      <option>Product Inquiry</option>
                      <option>Order Tracking Support</option>
                      <option>Bulk/Corporate Purchase</option>
                      <option>Warranty Claim</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Message Detail
                    </label>
                    <textarea
                      rows="5"
                      required
                      placeholder="How can we assist you today?"
                      className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 text-sm font-bold outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all active:scale-[0.98]"
                  >
                    <FiSend /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* --- 3. GOOGLE MAPS AREA --- */}
      <section className="pb-24">
        <div className="max-w-[1400px] mx-auto px-2">
          <div className="w-full h-[450px] bg-slate-100 rounded overflow-hidden border border-slate-200 shadow-inner grayscale hover:grayscale-0 transition-all duration-1000">
            {/* Replace this with an actual Google Maps Iframe */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.2685711019114!2d90.384201775896!3d23.73780338925708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8dc43501719%3A0xf639a03957f86749!2sMultiplan%20Center!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

/* --- Helper Component: Contact Card --- */
const ContactCard = ({ icon, label, value, sub, link }) => {
  const CardContent = () => (
    <div className="flex items-center gap-5 p-5 bg-white rounded-3xl border border-slate-100 group-hover:border-indigo-500 transition-all shadow-sm">
      <div className="p-4 bg-slate-50 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
        {React.cloneElement(icon, { size: 22 })}
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">
          {label}
        </p>
        <p className="text-sm font-black text-slate-800 uppercase tracking-tight">
          {value}
        </p>
        <p className="text-[10px] font-bold text-slate-500 mt-1">{sub}</p>
      </div>
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noreferrer" className="group block">
      {CardContent()}
    </a>
  ) : (
    <div className="group">{CardContent()}</div>
  );
};

export default Contact;
