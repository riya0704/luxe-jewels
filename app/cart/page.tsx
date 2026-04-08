"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCartStore } from "@/lib/store/cartStore";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/hooks/useScrollReveal";
import { createMagneticButton } from "@/lib/animations/premium";

gsap.registerPlugin(ScrollTrigger);

export default function CartPage() {
  const { items, removeItem, updateQuantity, total, itemCount } = useCartStore();
  const count = itemCount();
  const cartTotal = total();
  const checkoutBtnRef = useRef<HTMLAnchorElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apply magnetic effects to checkout button
    if (checkoutBtnRef.current) {
      createMagneticButton(checkoutBtnRef.current, 0.3);
    }

    // Apply magnetic effects to other buttons in summary
    if (summaryRef.current) {
      const buttons = summaryRef.current.querySelectorAll("a, button");
      buttons.forEach((btn) => {
        createMagneticButton(btn as HTMLElement, 0.2);
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
        >
          <motion.p variants={fadeUpVariants} className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-3">
            Your Selection
          </motion.p>
          <motion.h1 variants={fadeUpVariants} className="font-serif text-display-md text-ivory">
            Shopping Cart
            {count > 0 && (
              <span className="font-sans text-lg text-ivory/30 ml-4">({count} {count === 1 ? "item" : "items"})</span>
            )}
          </motion.h1>
        </motion.div>

        {count === 0 ? (
          /* Empty state */
          <motion.div
            className="text-center py-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center mx-auto mb-8"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <ShoppingBag size={28} className="text-gold/40" />
            </motion.div>
            <motion.h2
              className="font-serif text-3xl text-ivory/50 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Your cart is empty
            </motion.h2>
            <motion.p
              className="font-sans text-sm text-ivory/30 mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Discover our collections and find something extraordinary.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold-gradient font-sans text-xs tracking-[0.2em] uppercase text-obsidian font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-gold/20"
              >
                Explore the Collection <ArrowRight size={14} />
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence mode="popLayout">
                {items.map((item, idx) => (
                  <motion.div
                    key={item.product.id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -50, height: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    whileHover={{ y: -4 }}
                    className="flex gap-6 glass border border-gold/10 rounded-2xl p-5 shadow-lg shadow-gold/5 hover:shadow-gold/10 transition-all"
                  >
                    {/* Image */}
                    <Link href={`/product/${item.product.id}`} className="shrink-0">
                      <motion.div
                        className="w-24 h-24 rounded-xl overflow-hidden bg-charcoal-light"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </motion.div>
                    </Link>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <motion.p
                        className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        {item.product.material}
                      </motion.p>
                      <Link href={`/product/${item.product.id}`}>
                        <motion.h3
                          className="font-serif text-xl text-ivory hover:text-gold transition-colors duration-300 truncate"
                          whileHover={{ x: 4 }}
                        >
                          {item.product.name}
                        </motion.h3>
                      </Link>
                      {item.size && (
                        <p className="font-sans text-xs text-ivory/40 mt-1">Size: {item.size}</p>
                      )}

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity */}
                        <motion.div
                          className="flex items-center gap-3 border border-gold/20 rounded-full px-4 py-1.5"
                          whileHover={{ borderColor: "rgba(212, 175, 55, 0.3)" }}
                        >
                          <motion.button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-ivory/60 hover:text-gold transition-colors w-4 text-center"
                          >
                            −
                          </motion.button>
                          <span className="font-sans text-sm text-ivory w-4 text-center">{item.quantity}</span>
                          <motion.button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-ivory/60 hover:text-gold transition-colors w-4 text-center"
                          >
                            +
                          </motion.button>
                        </motion.div>

                        <div className="flex items-center gap-4">
                          <motion.span
                            className="font-serif text-xl text-ivory"
                            key={item.quantity}
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 0.3 }}
                          >
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </motion.span>
                          <motion.button
                            onClick={() => removeItem(item.product.id)}
                            whileHover={{ scale: 1.2, rotate: 8 }}
                            whileTap={{ scale: 0.9 }}
                            className="text-ivory/30 hover:text-ruby-bright transition-colors duration-300"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Order summary */}
            <motion.div
              ref={summaryRef}
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div
                className="glass border border-gold/10 rounded-2xl p-8 sticky top-28 shadow-2xl shadow-gold/5 hover:shadow-gold/10 transition-all"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.h2
                  className="font-serif text-2xl text-ivory mb-8"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Order Summary
                </motion.h2>

                <motion.div
                  className="space-y-4 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, staggerChildren: 0.05 }}
                >
                  <motion.div className="flex justify-between font-sans text-sm text-ivory/60">
                    <span>Subtotal</span>
                    <motion.span key={cartTotal} animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.3 }}>
                      ${cartTotal.toLocaleString()}
                    </motion.span>
                  </motion.div>
                  <motion.div className="flex justify-between font-sans text-sm text-ivory/60">
                    <span>Shipping</span>
                    <motion.span
                      className={cartTotal >= 500 ? "text-emerald-bright" : ""}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 0.3 }}
                    >
                      {cartTotal >= 500 ? "Free" : "$25"}
                    </motion.span>
                  </motion.div>
                  <motion.div className="flex justify-between font-sans text-sm text-ivory/60">
                    <span>Tax (estimated)</span>
                    <motion.span
                      key={Math.round(cartTotal * 0.08)}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 0.3 }}
                    >
                      ${Math.round(cartTotal * 0.08).toLocaleString()}
                    </motion.span>
                  </motion.div>
                </motion.div>

                {/* Promo code */}
                <motion.div
                  className="flex gap-2 mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <input
                    type="text"
                    placeholder="Promo code"
                    className="flex-1 bg-charcoal-light border border-gold/20 rounded-full px-4 py-2.5 font-sans text-xs text-ivory placeholder:text-ivory/30 outline-none focus:border-gold/50 transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2.5 rounded-full border border-gold/30 font-sans text-[10px] tracking-[0.15em] uppercase text-gold hover:bg-gold/10 transition-colors"
                  >
                    Apply
                  </motion.button>
                </motion.div>

                <motion.div
                  className="flex justify-between font-serif text-2xl text-ivory mb-8 pt-6 border-t border-gold/10"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <span>Total</span>
                  <motion.span
                    key={cartTotal}
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 0.4 }}
                  >
                    ${(cartTotal + (cartTotal >= 500 ? 0 : 25) + Math.round(cartTotal * 0.08)).toLocaleString()}
                  </motion.span>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Link
                    ref={checkoutBtnRef}
                    href="/checkout"
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-full bg-gold-gradient font-sans text-xs tracking-[0.2em] uppercase text-obsidian font-semibold hover:opacity-90 transition-all shadow-lg shadow-gold/30"
                  >
                    Proceed to Checkout <ArrowRight size={14} />
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link
                    href="/shop"
                    className="w-full flex items-center justify-center mt-4 font-sans text-xs tracking-[0.15em] uppercase text-ivory/40 hover:text-gold transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
