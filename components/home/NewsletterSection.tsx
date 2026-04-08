"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { NewsletterForm } from "@/components/ui/NewsletterForm";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/hooks/useScrollReveal";

/**
 * Premium newsletter signup section with animated background,
 * floating elements, and premium visual effects.
 */
export function NewsletterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-b from-charcoal via-obsidian/50 to-charcoal relative overflow-hidden" aria-label="Newsletter">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left accent */}
        <motion.div
          className="absolute -left-40 top-1/3 w-80 h-80 rounded-full opacity-8"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.04, 0.12, 0.04],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Right accent */}
        <motion.div
          className="absolute -right-40 bottom-1/4 w-96 h-96 rounded-full opacity-6"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 70%)",
            filter: "blur(90px)",
          }}
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.03, 0.1, 0.03],
            y: [0, 40, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        {/* Center ambient glow */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-[800px] h-[400px]"
            style={{
              background: "radial-gradient(ellipse, rgba(201,168,76,0.5) 0%, transparent 70%)",
              filter: "blur(80px)",
            }}
          />
        </motion.div>
      </div>

      <div className="max-w-2xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainerVariants}
        >
          {/* Animated diamond icon */}
          <motion.div
            variants={fadeUpVariants}
            className="flex justify-center mb-8"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <motion.svg
              width="32"
              height="32"
              viewBox="0 0 48 48"
              fill="none"
              aria-hidden="true"
              animate={{
                filter: [
                  "drop-shadow(0 0 0px rgba(201,168,76,0.3))",
                  "drop-shadow(0 0 20px rgba(201,168,76,0.6))",
                  "drop-shadow(0 0 0px rgba(201,168,76,0.3))",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <path d="M24 4L44 18L24 44L4 18L24 4Z" stroke="url(#ng)" strokeWidth="1.5" fill="none" />
              <defs>
                <linearGradient id="ng" x1="4" y1="4" x2="44" y2="44">
                  <stop stopColor="#c9a84c" /><stop offset="1" stopColor="#e2c97e" />
                </linearGradient>
              </defs>
            </motion.svg>
          </motion.div>

          <motion.p variants={fadeUpVariants} className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-4">
            The Inner Circle
          </motion.p>

          <motion.h2 variants={fadeUpVariants} className="font-serif text-display-md text-ivory mb-4">
            First to Know
          </motion.h2>

          <motion.p variants={fadeUpVariants} className="font-sans text-base text-ivory/40 leading-relaxed mb-12">
            Join our private list for early access to new collections, exclusive events, and offers reserved for our most discerning clients.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <NewsletterForm
              placeholder="Your email address"
              submitButtonText="Join Now"
              variant="default"
              showSuccessMessage={true}
            />
          </motion.div>

          <motion.p
            variants={fadeUpVariants}
            className="font-sans text-[10px] text-ivory/20 mt-6 hover:text-ivory/40 transition-colors"
          >
            No spam. Unsubscribe at any time.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
