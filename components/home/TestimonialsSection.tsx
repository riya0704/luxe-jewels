"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "@/lib/data/products";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/hooks/useScrollReveal";
import { create3DTilt } from "@/lib/animations/premium";

gsap.registerPlugin(ScrollTrigger);

/**
 * Premium testimonials section with:
 * - Parallax scrolling backgrounds
 * - 3D tilt effects on hovering cards
 * - Masonry-influenced layout with varied spacing
 * - Animated stars and avatars
 * - Enhanced glow effects
 */
export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });

  const quoteOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.1, 0.15, 0.1]);
  const quoteScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);

  useEffect(() => {
    // Add 3D tilt to testimonial cards
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll("[data-testimonial-card]");
      cards.forEach((card) => {
        create3DTilt(card as HTMLElement, 6, 1.01);
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-32 bg-obsidian relative overflow-hidden" aria-label="Testimonials">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Top left orb */}
        <motion.div
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-8"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.5) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.04, 0.12, 0.04],
            x: [0, 25, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Bottom right orb */}
        <motion.div
          className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-8"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1.2, 0.95, 1.2],
            opacity: [0.03, 0.1, 0.03],
            x: [0, -30, 0],
            y: [0, 25, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Background quote mark with scroll transform */}
      <motion.div
        className="absolute top-10 left-1/2 -translate-x-1/2 font-serif text-[20rem] text-gold/3 leading-none pointer-events-none select-none"
        style={{
          opacity: quoteOpacity,
          scale: quoteScale,
        }}
      >
        "
      </motion.div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <motion.div
          className="text-center mb-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainerVariants}
        >
          <motion.p variants={fadeUpVariants} className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-3">
            Client Stories
          </motion.p>
          <motion.h2 variants={fadeUpVariants} className="font-serif text-display-md text-ivory">
            Worn with Love
          </motion.h2>
        </motion.div>

        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerVariants}
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              variants={fadeUpVariants}
              data-testimonial-card
              className={`glass border-gold-glow rounded-2xl p-8 relative group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gold/20 ${i === 1 ? "lg:mt-8" : ""}`}
              whileHover={{ y: -4 }}
            >
              {/* Premium shine effect on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent opacity-0 group-hover:opacity-100"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />

              {/* Stars with animation */}
              <motion.div
                className="flex gap-1 mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                {Array.from({ length: t.rating }).map((_, j) => (
                  <motion.span
                    key={j}
                    className="text-gold text-sm"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + j * 0.08 }}
                  >
                    ★
                  </motion.span>
                ))}
              </motion.div>

              <p className="font-serif text-xl text-ivory/80 leading-relaxed mb-8 italic">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4 relative z-10">
                {/* Avatar with glow */}
                <motion.div
                  className="w-10 h-10 rounded-full bg-charcoal-mid border border-gold/20 flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, borderColor: "rgba(201,168,76,0.6)" }}
                >
                  <span className="font-serif text-gold text-sm">{t.name[0]}</span>
                </motion.div>
                <div>
                  <p className="font-sans text-sm text-ivory/80">{t.name}</p>
                  <p className="font-sans text-[10px] text-ivory/30 group-hover:text-gold/60 transition-colors">{t.location} · {t.product}</p>
                </div>
              </div>

              {/* Animated decorative corner */}
              <motion.div
                className="absolute top-6 right-6 w-6 h-6 border-t border-r border-gold/20"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
