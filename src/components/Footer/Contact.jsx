import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiMessageCircle,
  FiCheckCircle,
  FiArrowUpRight,
} from "react-icons/fi";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-2 lg:px-4 mt-20 md:mt-28">
      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative min-h-[40vh] flex items-center overflow-hidden rounded-lg bg-slate-950">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-brand/20 blur-[120px]" />

          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/10 blur-[120px]" />

          <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 w-full px-6 py-16 md:px-14 lg:px-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-white/60 text-[10px] font-medium uppercase tracking-[0.25em] mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              Victus Byte Support
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05]">
              Let's talk about
              <span className="block text-brand mt-2">your next device.</span>
            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-sm md:text-base leading-7 text-slate-400 font-normal">
              Have a question about a product, order, warranty, or corporate
              purchase?
              <br /> Our support team is ready to help you with fast, reliable
              assistance.
            </p>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          MAIN CONTACT SECTION
      ========================================================= */}
      <section className="py-14 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* =====================================================
              LEFT - CONTACT INFORMATION
          ===================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            {/* Heading */}
            <div className="mb-8">
              <p className="text-[10px] font-medium text-brand uppercase tracking-[0.3em] mb-3">
                Contact Information
              </p>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                We're here to
                <span className=" text-slate-400"> help you.</span>
              </h2>

              <p className="mt-4 text-sm leading-6 text-slate-500 max-w-md font-normal">
                Reach out through any of the channels below. Whether you're
                looking for product information or need help with an order,
                we'll get you connected.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-3">
              <ContactCard
                icon={<FiPhone />}
                label="Phone Support"
                value="09611-342936"
                sub="Available daily · 10 AM – 8 PM"
              />

              <ContactCard
                icon={<FiMail />}
                label="Email Support"
                value="support@victusbyte.com"
                sub="Typically responds within 24 hours"
              />

              <ContactCard
                icon={<FiMessageCircle />}
                label="WhatsApp"
                value="Chat with our team"
                sub="Fastest way to reach us"
                link="https://wa.me/8801773820336"
              />

              {/* <ContactCard
                icon={<FiMapPin />}
                label="Visit Us"
                value="Multiplan Center, Level 9"
                sub="Dhaka, Bangladesh"
              /> */}
            </div>

            {/* Business Hours */}
            <div className="mt-5 rounded-3xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-brand">
                  <FiClock size={19} />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Customer Support Hours
                  </p>

                  <p className="text-[12px] text-slate-500 mt-0.5 font-normal">
                    Every day · 10:00 AM – 8:00 PM
                  </p>
                </div>

                <span className="ml-auto flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-wider text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Online
                </span>
              </div>
            </div>
          </motion.div>

          {/* =====================================================
              RIGHT - CONTACT FORM
          ===================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-[2rem] border border-slate-200 bg-white p-5 sm:p-7 md:p-9 shadow-[0_20px_70px_rgba(15,23,42,0.07)]">
              {/* Top Accent */}
              <div className="absolute top-0 left-10 right-10 h-1 rounded-b-full bg-brand" />

              {submitted ? (
                /* =================================================
                   SUCCESS STATE
                ================================================= */
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="min-h-[480px] flex flex-col items-center justify-center text-center px-6"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                    <FiCheckCircle size={38} />
                  </div>

                  <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-emerald-600 mb-3">
                    Message Sent
                  </p>

                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                    Thanks for reaching out.
                  </h3>

                  <p className="mt-3 text-sm text-slate-500 max-w-md leading-6 font-normal">
                    Your message has been received. Our support team will review
                    your inquiry and get back to you as soon as possible.
                  </p>

                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-8 px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold uppercase tracking-wider hover:bg-brand transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                /* =================================================
                   FORM
                ================================================= */
                <form onSubmit={handleSubmit}>
                  {/* Form Heading */}
                  <div className="mb-8">
                    <p className="text-[10px] font-medium text-brand uppercase tracking-[0.3em] mb-2">
                      Send an Inquiry
                    </p>

                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
                      How can we help?
                    </h3>

                    <p className="text-sm text-slate-500 mt-2 font-normal">
                      Fill out the form and our team will get back to you.
                    </p>
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField label="Full Name">
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        className="contact-input"
                      />
                    </FormField>

                    <FormField label="Email Address">
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        className="contact-input"
                      />
                    </FormField>
                  </div>

                  {/* Subject */}
                  <div className="mt-5">
                    <FormField label="Subject">
                      <select className="contact-input cursor-pointer">
                        <option>Product Inquiry</option>
                        <option>Order Tracking Support</option>
                        <option>Bulk / Corporate Purchase</option>
                        <option>Warranty Claim</option>
                        <option>Technical Support</option>
                        <option>Other</option>
                      </select>
                    </FormField>
                  </div>

                  {/* Message */}
                  <div className="mt-5">
                    <FormField label="Message">
                      <textarea
                        rows="6"
                        required
                        placeholder="Tell us how we can assist you..."
                        className="contact-input resize-none"
                      />
                    </FormField>
                  </div>

                  {/* Submit */}
                  <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4">
                    <button
                      type="submit"
                      className="group flex-1 flex items-center justify-center gap-3 rounded-xl bg-brand px-6 py-4 text-xs font-semibold uppercase tracking-[0.15em] text-white shadow-lg shadow-brand/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-brand/25 transition-all active:scale-[0.98]"
                    >
                      Send Message
                      <FiSend
                        size={15}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    </button>

                    <p className="text-[13px] text-slate-400 text-center sm:text-left font-medium">
                      We respect your privacy.
                      <br />
                      No unnecessary emails.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          GOOGLE MAP
      ========================================================= */}
      <section className="pb-20 md:pb-28">
        {/* Map Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-7">
          <div>
            <p className="text-[10px] font-medium text-brand uppercase tracking-[0.3em] mb-2">
              Find Us
            </p>

            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
              Visit our location
            </h2>
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Multiplan+Center+Dhaka"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 hover:text-brand transition-colors"
          >
            Open in Google Maps
            <FiArrowUpRight size={15} />
          </a>
        </div>

        {/* Map */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 shadow-sm">
          {/* Location Badge */}
          <div className="absolute top-5 left-5 z-10 bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center text-brand">
                <FiMapPin size={18} />
              </div>

              <div>
                <p className="text-xs font-semibold text-slate-900">
                  Multiplan Center
                </p>

                <p className="text-[10px] text-slate-500 font-normal">
                  Dhaka, Bangladesh
                </p>
              </div>
            </div>
          </div>

          <div className="h-[350px] md:h-[450px] bg-slate-100">
            <iframe
              title="Victus Byte Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.2685711019114!2d90.384201775896!3d23.73780338925708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8dc43501719%3A0xf639a03957f86749!2sMultiplan%20Center!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* =========================================================
          INPUT STYLES
      ========================================================= */}
      <style>
        {`
          .contact-input {
            width: 100%;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 0.875rem;
            padding: 0.875rem 1rem;
            font-size: 0.875rem;
            font-weight: 400;
            color: #0f172a;
            outline: none;
            transition: all 0.2s ease;
          }

          .contact-input::placeholder {
            color: #94a3b8;
            font-weight: 400;
          }

          .contact-input:focus {
            background: #ffffff;
            border-color: #f66107;
            box-shadow: 0 0 0 4px rgba(246, 97, 7, 0.08);
          }

          .contact-input:hover {
            border-color: #cbd5e1;
          }
        `}
      </style>
    </div>
  );
};

/* =============================================================
   FORM FIELD
============================================================= */

const FormField = ({ label, children }) => {
  return (
    <div className="space-y-2">
      <label className="ml-1 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-500">
        {label}
      </label>

      {children}
    </div>
  );
};

/* =============================================================
   CONTACT CARD
============================================================= */

const ContactCard = ({ icon, label, value, sub, link }) => {
  const content = (
    <div className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-lg hover:shadow-slate-200/50">
      {/* Icon */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-all duration-300 group-hover:bg-brand group-hover:text-white">
        {React.cloneElement(icon, { size: 20 })}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold text-slate-800">
          {value}
        </p>

        <p className="mt-0.5 text-[11px] tracking-[0.10em] font-medium text-slate-400">
          {sub}
        </p>
      </div>

      {/* Arrow */}
      {link && (
        <FiArrowUpRight
          size={17}
          className="shrink-0 text-slate-300 transition-all group-hover:text-brand group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      )}
    </div>
  );

  return link ? (
    <a href={link} target="_blank" rel="noreferrer" className="block">
      {content}
    </a>
  ) : (
    <div>{content}</div>
  );
};

export default Contact;
