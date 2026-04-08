"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Check, CreditCard, Lock, ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCartStore } from "@/lib/store/cartStore";
import Link from "next/link";
import { createMagneticButton } from "@/lib/animations/premium";

gsap.registerPlugin(ScrollTrigger);

const steps = ["Shipping", "Payment", "Review"];

export default function CheckoutPage() {
  const [step, setStep] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber] = useState(
    () => `LX-${Math.random().toString(36).slice(2, 8).toUpperCase()}`
  );
  const [summaryOpen, setSummaryOpen] = useState(false);
  const { items, total, clearCart } = useCartStore();
  const cartTotal = total();
  const buttonsRef = useRef<HTMLDivElement>(null);

  const [shipping, setShipping] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", postcode: "", country: "United Kingdom",
  });

  useEffect(() => {
    // Apply magnetic effects to checkout buttons
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll("button");
      buttons.forEach((btn) => {
        createMagneticButton(btn, 0.2);
      });
    }
  }, [step]);

  const handlePlaceOrder = async () => {
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-obsidian pt-20 flex items-center justify-center px-6">
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="w-24 h-24 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-8 shadow-xl shadow-gold/20"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Check size={36} className="text-gold" />
            </motion.div>
          </motion.div>
          <motion.h1
            className="font-serif text-4xl text-ivory mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Order Confirmed
          </motion.h1>
          <motion.p
            className="font-sans text-base text-ivory/50 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Thank you for your order. You&apos;ll receive a confirmation email shortly.
          </motion.p>
          <motion.p
            className="font-sans text-sm text-gold/70 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Order #{orderNumber}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold-gradient font-sans text-xs tracking-[0.2em] uppercase text-obsidian font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-gold/30"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian pt-20 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[520px] opacity-15 blur-[90px] bg-[radial-gradient(circle,rgba(201,168,76,0.45)_0%,transparent_72%)]" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 py-12 lg:py-16 pb-28 lg:pb-16">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <motion.h1
            className="font-serif text-3xl sm:text-4xl text-ivory mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Checkout
          </motion.h1>
          <motion.p
            className="font-sans text-sm text-ivory/55 mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
          >
            Secure, elegant, and optimized for every screen.
          </motion.p>

          {/* Step indicator */}
          <motion.div
            className="grid grid-cols-3 gap-2 sm:flex sm:items-center sm:justify-center sm:gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {steps.map((s, i) => (
              <motion.div
                key={s}
                className={`rounded-xl border px-2 py-3 sm:px-0 sm:py-0 sm:border-0 sm:bg-transparent flex flex-col sm:flex-row items-center justify-center gap-2 ${
                  i === step ? "border-gold/50 bg-gold/10" : "border-gold/15 bg-charcoal/60"
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                  <motion.div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs transition-all duration-300 ${
                      i < step ? "bg-gold text-obsidian shadow-lg shadow-gold/30" :
                      i === step ? "border border-gold text-gold shadow-md shadow-gold/20" :
                      "border border-charcoal-mid text-ivory/30"
                    }`}
                    animate={i === step ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.6, repeat: Infinity }}
                  >
                    {i < step ? <Check size={14} /> : i + 1}
                  </motion.div>
                  <motion.span className={`font-sans text-[10px] sm:text-xs tracking-[0.15em] uppercase ${i === step ? "text-gold" : "text-ivory/40"}`}>
                    {s}
                  </motion.span>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile summary */}
        <div className="lg:hidden mb-8">
          <button
            onClick={() => setSummaryOpen((prev) => !prev)}
            className="w-full glass border border-gold/20 rounded-2xl px-4 py-4 flex items-center justify-between"
          >
            <span className="flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-gold/80">
              <ShoppingBag size={14} /> Order Summary
            </span>
            <span className="flex items-center gap-2 font-serif text-xl text-ivory">
              ${cartTotal.toLocaleString()}
              {summaryOpen ? <ChevronUp size={16} className="text-gold" /> : <ChevronDown size={16} className="text-gold" />}
            </span>
          </button>

          <AnimatePresence>
            {summaryOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 glass border border-gold/10 rounded-2xl p-4">
                  <div className="space-y-3 mb-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between gap-3 font-sans text-xs text-ivory/60">
                        <span className="truncate">{item.product.name} ×{item.quantity}</span>
                        <span className="shrink-0 text-ivory/80">
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gold/10 pt-3 flex justify-between font-serif text-xl text-ivory">
                    <span>Total</span>
                    <span>${cartTotal.toLocaleString()}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Form area */}
          <motion.div
            ref={buttonsRef}
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6 glass border border-gold/10 rounded-2xl p-5 sm:p-6"
                >
                  <h2 className="font-serif text-2xl text-ivory mb-1">Shipping Information</h2>
                  <p className="font-sans text-sm text-ivory/45">Tell us where your order should arrive.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: "firstName", label: "First Name", col: 1 },
                      { id: "lastName", label: "Last Name", col: 1 },
                    ].map((f) => (
                      <div key={f.id}>
                        <label htmlFor={`shipping-${f.id}`} className="block font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/50 mb-2">{f.label}</label>
                        <input
                          id={`shipping-${f.id}`}
                          type="text"
                          value={shipping[f.id as keyof typeof shipping]}
                          onChange={(e) => setShipping({ ...shipping, [f.id]: e.target.value })}
                          placeholder={f.label}
                          className="w-full bg-charcoal-light border border-gold/20 rounded-xl px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/30 outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    ))}
                  </div>
                  {[
                    { id: "email", label: "Email Address", type: "email" },
                    { id: "phone", label: "Phone Number", type: "tel" },
                    { id: "address", label: "Street Address", type: "text" },
                  ].map((f) => (
                    <div key={f.id}>
                      <label htmlFor={`shipping-${f.id}`} className="block font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/50 mb-2">{f.label}</label>
                      <input
                        id={`shipping-${f.id}`}
                        type={f.type}
                        value={shipping[f.id as keyof typeof shipping]}
                        onChange={(e) => setShipping({ ...shipping, [f.id]: e.target.value })}
                        placeholder={f.label}
                        className="w-full bg-charcoal-light border border-gold/20 rounded-xl px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/30 outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  ))}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="shipping-city" className="block font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/50 mb-2">City</label>
                      <input id="shipping-city" type="text" placeholder="City" value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                        className="w-full bg-charcoal-light border border-gold/20 rounded-xl px-4 py-3 font-sans text-sm text-ivory outline-none focus:border-gold/50 transition-colors" />
                    </div>
                    <div>
                      <label htmlFor="shipping-postcode" className="block font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/50 mb-2">Postcode</label>
                      <input id="shipping-postcode" type="text" placeholder="Postcode" value={shipping.postcode} onChange={(e) => setShipping({ ...shipping, postcode: e.target.value })}
                        className="w-full bg-charcoal-light border border-gold/20 rounded-xl px-4 py-3 font-sans text-sm text-ivory outline-none focus:border-gold/50 transition-colors" />
                    </div>
                  </div>
                  <motion.button
                    onClick={() => setStep(1)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 rounded-full bg-gold-gradient font-sans text-xs tracking-[0.2em] uppercase text-obsidian font-semibold hover:opacity-90 transition-opacity mt-2 shadow-lg shadow-gold/30"
                  >
                    Continue to Payment
                  </motion.button>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="glass border border-gold/10 rounded-2xl p-5 sm:p-6"
                >
                  <h2 className="font-serif text-2xl text-ivory mb-6">Payment</h2>
                  <div className="glass border border-gold/10 rounded-2xl p-6 mb-6">
                    <div className="flex items-center gap-3 mb-6 flex-wrap">
                      <CreditCard size={18} className="text-gold/60" />
                      <span className="font-sans text-sm text-ivory/60">Card Details</span>
                      <span className="ml-auto flex items-center gap-1.5">
                        <Lock size={12} className="text-gold/40" />
                        <span className="font-sans text-[10px] text-ivory/30">Secured by Stripe</span>
                      </span>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="payment-card-number" className="block font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/50 mb-2">Card Number</label>
                        <input id="payment-card-number" type="text" placeholder="1234 5678 9012 3456" className="w-full bg-charcoal border border-gold/20 rounded-xl px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/25 outline-none focus:border-gold/50 transition-colors" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="payment-expiry" className="block font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/50 mb-2">Expiry</label>
                          <input id="payment-expiry" type="text" placeholder="MM / YY" className="w-full bg-charcoal border border-gold/20 rounded-xl px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/25 outline-none focus:border-gold/50 transition-colors" />
                        </div>
                        <div>
                          <label htmlFor="payment-cvv" className="block font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/50 mb-2">CVV</label>
                          <input id="payment-cvv" type="text" placeholder="•••" className="w-full bg-charcoal border border-gold/20 rounded-xl px-4 py-3 font-sans text-sm text-ivory placeholder:text-ivory/25 outline-none focus:border-gold/50 transition-colors" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={() => setStep(0)} className="px-6 py-4 rounded-full border border-gold/20 font-sans text-xs tracking-[0.15em] uppercase text-ivory/50 hover:border-gold/50 transition-colors">
                      Back
                    </button>
                    <button onClick={() => setStep(2)} className="flex-1 py-4 rounded-full bg-gold-gradient font-sans text-xs tracking-[0.2em] uppercase text-obsidian font-semibold hover:opacity-90 transition-opacity">
                      Review Order
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="glass border border-gold/10 rounded-2xl p-5 sm:p-6"
                >
                  <h2 className="font-serif text-2xl text-ivory mb-6">Review Your Order</h2>
                  <div className="space-y-4 mb-8">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex gap-4 glass border border-gold/10 rounded-xl p-4">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-serif text-lg text-ivory">{item.product.name}</p>
                          <div className="flex items-center justify-between mt-1 gap-3">
                            <p className="font-sans text-xs text-ivory/40">Qty: {item.quantity}</p>
                            <p className="font-serif text-lg text-ivory">${(item.product.price * item.quantity).toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={() => setStep(1)} className="px-6 py-4 rounded-full border border-gold/20 font-sans text-xs tracking-[0.15em] uppercase text-ivory/50 hover:border-gold/50 transition-colors">
                      Back
                    </button>
                    <button onClick={handlePlaceOrder} className="flex-1 py-4 rounded-full bg-gold-gradient font-sans text-xs tracking-[0.2em] uppercase text-obsidian font-semibold hover:opacity-90 transition-opacity hover:shadow-gold-glow">
                      Place Order · ${cartTotal.toLocaleString()}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Order summary sidebar */}
          <div className="hidden lg:block glass border border-gold/10 rounded-2xl p-6 h-fit sticky top-28">
            <h3 className="font-serif text-xl text-ivory mb-6">Summary</h3>
            <div className="space-y-3 mb-6">
              {items.map((item) => (
                <div key={item.product.id} className="flex justify-between font-sans text-sm text-ivory/50">
                  <span className="truncate mr-2">{item.product.name} ×{item.quantity}</span>
                  <span className="shrink-0">${(item.product.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gold/10 pt-4 flex justify-between font-serif text-xl text-ivory">
              <span>Total</span>
              <span>${cartTotal.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
