"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/hooks/useScrollReveal";

const gemstones = [
  { name: "Diamond", color: "#e8f4f8", glow: "rgba(200,230,255,0.4)", href: "/shop?gemstone=diamond", desc: "The eternal stone" },
  { name: "Emerald", color: "#1a4a3a", glow: "rgba(45,122,95,0.5)", href: "/shop?gemstone=emerald", desc: "Colombian brilliance" },
  { name: "Ruby", color: "#6b1a2a", glow: "rgba(160,32,64,0.5)", href: "/shop?gemstone=ruby", desc: "Burmese fire" },
  { name: "Sapphire", color: "#1a2a6b", glow: "rgba(32,64,160,0.5)", href: "/shop?gemstone=sapphire", desc: "Kashmir blue" },
  { name: "Pearl", color: "#f0ece4", glow: "rgba(220,210,190,0.4)", href: "/shop?gemstone=pearl", desc: "South Sea lustre" },
  { name: "Amethyst", color: "#4a1a6b", glow: "rgba(100,32,160,0.5)", href: "/shop?gemstone=amethyst", desc: "Royal violet" },
];

/**
 * Ultra-premium gemstone showcase with animated orbs,
 * floating background elements, and magnetic hover effects.
 */
export function GemstoneShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="py-32 bg-gradient-to-br from-obsidian via-charcoal/20 to-obsidian relative overflow-hidden" aria-label="Gemstones">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Center glow field */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-8"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)",
            filter: "blur(100px)",
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating accent orbs */}
        <motion.div
          className="absolute top-1/4 -right-40 w-80 h-80 rounded-full opacity-5"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.5) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />

        <motion.div
          className="absolute bottom-1/4 -left-40 w-64 h-64 rounded-full opacity-4"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            x: [0, -25, 0],
            y: [0, 35, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainerVariants}
        >
          <motion.p variants={fadeUpVariants} className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-3">
            Rare & Precious
          </motion.p>
          <motion.h2 variants={fadeUpVariants} className="font-serif text-display-md text-ivory">
            The Gemstones
          </motion.h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerVariants}
        >
          {gemstones.map((gem, idx) => (
            <motion.div key={gem.name} variants={fadeUpVariants}>
              <Link href={gem.href} className="group block text-center">
                {/* Gem orb container with inner glow */}
                <motion.div
                  className="relative mx-auto mb-4 w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: `radial-gradient(circle at 35% 35%, ${gem.color}80, ${gem.color}20)` }}
                  whileHover={{ scale: 1.15 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Pulsing glow halo on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ boxShadow: `0 0 30px ${gem.glow}, 0 0 60px ${gem.glow}` }}
                    animate={{
                      boxShadow: [
                        `0 0 30px ${gem.glow}, 0 0 60px ${gem.glow}`,
                        `0 0 40px ${gem.glow}, 0 0 80px ${gem.glow}`,
                        `0 0 30px ${gem.glow}, 0 0 60px ${gem.glow}`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />

                  {/* Inner gem sphere */}
                  <motion.div
                    className="w-12 h-12 rounded-full"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, ${gem.color}, ${gem.color}60)`,
                      boxShadow: `inset 0 2px 4px rgba(255,255,255,0.2), 0 4px 12px ${gem.glow}`,
                    }}
                    animate={{
                      boxShadow: [
                        `inset 0 2px 4px rgba(255,255,255,0.2), 0 4px 12px ${gem.glow}`,
                        `inset 0 2px 8px rgba(255,255,255,0.3), 0 8px 20px ${gem.glow}`,
                        `inset 0 2px 4px rgba(255,255,255,0.2), 0 4px 12px ${gem.glow}`,
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: idx * 0.2 }}
                  />

                  {/* Shine flash effect */}
                  <motion.div
                    className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full opacity-0 group-hover:opacity-100"
                    style={{ background: "rgba(255,255,255,0.6)" }}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1, scale: 1.5 }}
                  />
                </motion.div>

                {/* Text with hover animation */}
                <motion.p
                  className="font-sans text-xs tracking-[0.2em] uppercase text-ivory/60 group-hover:text-gold transition-colors duration-300 mb-1"
                  whileHover={{ letterSpacing: "0.1em" }}
                >
                  {gem.name}
                </motion.p>
                <motion.p
                  className="font-sans text-[10px] text-ivory/30 italic group-hover:text-ivory/50 transition-colors duration-300"
                  initial={{ opacity: 0.3 }}
                  whileHover={{ opacity: 0.6 }}
                >
                  {gem.desc}
                </motion.p>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
