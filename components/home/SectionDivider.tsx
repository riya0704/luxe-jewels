"use client";

import { motion } from "framer-motion";

interface SectionDividerProps {
  label?: string;
  className?: string;
  animate?: boolean;
}

/**
 * Premium animated section divider with:
 * - Sliding animated line
 * - Glowing accent effects
 * - Optional text label
 * - Blur fade effects
 */
export function SectionDivider({
  label,
  className = "",
  animate = true,
}: SectionDividerProps) {
  return (
    <motion.div
      className={`relative h-20 flex items-center justify-center ${className}`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background blur effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="absolute w-96 h-32 rounded-full opacity-5"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(201,168,76,0.4) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      {/* Main divider line with animation */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div
          className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        />
      </div>

      {/* Animated glow effect */}
      {animate && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="h-px w-64 bg-gradient-to-r from-transparent via-gold/30 to-transparent blur-md"
            style={{
              filter: "blur(20px)",
            }}
          />
        </motion.div>
      )}

      {/* Optional label with background */}
      {label && (
        <motion.div
          className="relative z-10 px-6 py-2 backdrop-blur-md bg-charcoal/60 border border-gold/20 rounded-full"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        >
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/70 whitespace-nowrap">
            {label}
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}
