"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Cinematic loading screen shown on first page load.
 * Fades out after assets are ready.
 */
export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate asset loading with smooth progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 400);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 120);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[99998] bg-obsidian flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Ambient glow */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="w-96 h-96 rounded-full opacity-20"
              style={{
                background: "radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)",
                filter: "blur(60px)",
              }}
            />
          </div>

          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-10 text-center"
          >
            {/* Diamond icon */}
            <motion.div
              className="mx-auto mb-8 w-12 h-12"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M24 4L44 18L24 44L4 18L24 4Z"
                  stroke="url(#goldGrad)"
                  strokeWidth="1.5"
                  fill="none"
                />
                <path
                  d="M4 18H44M24 4L14 18L24 44L34 18L24 4Z"
                  stroke="url(#goldGrad)"
                  strokeWidth="0.75"
                  opacity="0.5"
                />
                <defs>
                  <linearGradient id="goldGrad" x1="4" y1="4" x2="44" y2="44">
                    <stop stopColor="#c9a84c" />
                    <stop offset="0.5" stopColor="#e2c97e" />
                    <stop offset="1" stopColor="#a07830" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            <h1 className="font-serif text-4xl tracking-[0.3em] text-gold-light mb-2">
              LUXE
            </h1>
            <p className="font-sans text-xs tracking-[0.4em] text-beige/60 uppercase mb-12">
              Fine Jewellery
            </p>

            {/* Progress bar */}
            <div className="w-48 h-px bg-charcoal-mid mx-auto overflow-hidden">
              <motion.div
                className="h-full bg-gold-gradient"
                style={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
