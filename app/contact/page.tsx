"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/hooks/useScrollReveal";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
        <motion.div
          className="mb-16"
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
        >
          <motion.p variants={fadeUpVariants} className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-3">
            Get in Touch
          </motion.p>
          <motion.h1 variants={fadeUpVariants} className="font-serif text-display-md text-ivory">
            Contact Us
          </motion.h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            <p className="font-sans text-base text-ivory/50 leading-relaxed mb-12">
              Whether you have a question about a piece, want to discuss a custom commission, or simply wish to visit our atelier — we'd love to hear from you.
            </p>

            <div className="space-y-8">
              {[
                { Icon: MapPin, label: "Atelier", value: "14 Bond Street, Mayfair, London W1S 4PH" },
                { Icon: Phone, label: "Phone", value: "+44 20 7946 0958" },
                { Icon: Mail, label: "Email", value: "hello@luxejewellery.com" },
                { Icon: Clock, label: "Hours", value: "Mon–Sat: 10am–7pm · Sun: By appointment" },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex gap-5">
                  <div className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center shrink-0">
                    <Icon size={16} className="text-gold/60" />
                  </div>
                  <div>
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-1">{label}</p>
                    <p className="font-sans text-sm text-ivory/60">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { id: "name", label: "Full Name", type: "text", placeholder: "Your name" },
                  { id: "email", label: "Email Address", type: "email", placeholder: "your@email.com" },
                  { id: "subject", label: "Subject", type: "text", placeholder: "How can we help?" },
                ].map((field) => (
                  <div key={field.id}>
                    <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/50 mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={form[field.id as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                      placeholder={field.placeholder}
                      required
                      className="w-full bg-charcoal-light border border-gold/20 rounded-xl px-5 py-4 font-sans text-sm text-ivory placeholder:text-ivory/25 outline-none focus:border-gold/50 transition-colors duration-300"
                    />
                  </div>
                ))}
                <div>
                  <label className="block font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/50 mb-2">
                    Message
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us more..."
                    required
                    rows={5}
                    className="w-full bg-charcoal-light border border-gold/20 rounded-xl px-5 py-4 font-sans text-sm text-ivory placeholder:text-ivory/25 outline-none focus:border-gold/50 transition-colors duration-300 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-full bg-gold-gradient font-sans text-xs tracking-[0.2em] uppercase text-obsidian font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass border-gold-glow rounded-2xl p-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
                  <span className="text-gold text-2xl">✓</span>
                </div>
                <h3 className="font-serif text-3xl text-ivory mb-4">Message Received</h3>
                <p className="font-sans text-sm text-ivory/50">
                  Thank you for reaching out. We'll respond within 24 hours.
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
