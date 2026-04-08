"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { createMagneticButton } from "@/lib/animations/premium";

/**
 * Full-width cinematic banner for the limited edition collection.
 * Features:
 * - Parallax background scrolling
 * - Editorial text reveals
 * - Magnetic button interactions
 * - Ruby accent glows
 */
export function LimitedEditionBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  useEffect(() => {
    if (buttonsRef.current) {
      const buttons = buttonsRef.current.querySelectorAll("a");
      buttons.forEach((btn) => {
        createMagneticButton(btn, 0.25);
      });
    }
  }, []);

  return (
    <section ref={ref} className="relative h-[70vh] min-h-[500px] overflow-hidden" aria-label="Limited Edition">
      {/* Background */}
      <motion.div className="absolute inset-0 scale-110" style={{ y: bgY }}>
        <Image
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fm=webp&q=90&w=2200&h=1300&fit=crop"
          alt="Exclusive limited edition jewelry collection with rare gemstones"
          fill
          loading="lazy"
          sizes="100vw"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/60 to-obsidian/30" />
      </motion.div>

      {/* Ruby accent glow */}
      <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-96 h-96 opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(160,32,64,0.8) 0%, transparent 70%)", filter: "blur(80px)" }}
      />

      <div className="relative z-10 h-full flex items-center px-6 lg:px-20 max-w-[1440px] mx-auto">
        <div className="max-w-2xl">
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-2 h-2 rounded-full bg-ruby-bright animate-pulse" />
            <span className="font-sans text-[10px] tracking-[0.5em] uppercase text-ruby-bright">
              Limited Edition · 2026
            </span>
          </motion.div>

          <div className="overflow-hidden mb-3">
            <motion.h2
              className="font-serif text-display-lg text-ivory"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              Only 50 Pieces
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h2
              className="font-serif text-display-lg italic text-gold-light"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              In the World
            </motion.h2>
          </div>

          <motion.p
            className="font-sans text-base text-ivory/50 mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Each piece is individually numbered, hallmarked, and accompanied by a certificate of authenticity. Once they're gone, they're gone forever.
          </motion.p>

          <motion.div
            ref={buttonsRef}
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link
              href="/collections/limited-edition"
              className="px-8 py-4 rounded-full border border-ruby-bright/60 font-sans text-xs tracking-[0.2em] uppercase text-ruby-bright hover:bg-ruby-bright/10 transition-all duration-300"
            >
              View Collection
            </Link>
            <Link
              href="/appointment"
              className="px-8 py-4 rounded-full bg-gold-gradient font-sans text-xs tracking-[0.2em] uppercase text-obsidian font-semibold hover:opacity-90 transition-opacity duration-300"
            >
              Book Private Viewing
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
