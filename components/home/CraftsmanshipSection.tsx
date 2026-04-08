"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Editorial artisan story section with:
 * - Advanced parallax image scrolling
 * - Character reveal animations
 * - Animated accent cards with scroll triggers
 * - Premium typography hierarchy
 */
export function CraftsmanshipSection() {
  const ref = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const textX = useTransform(scrollYProgress, [0, 1], ["0%", "-3%"]);

  useEffect(() => {
    // Add scroll-triggered glow effect to accent cards
    if (accentRef.current) {
      const cards = accentRef.current.querySelectorAll("[data-accent-card]");
      cards.forEach((card) => {
        gsap.to(card, {
          boxShadow: `0 0 40px rgba(201,168,76,0.3)`,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            start: "top center",
            end: "bottom center",
            scrub: 1,
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={ref} className="py-32 bg-charcoal relative overflow-hidden" aria-label="Craftsmanship">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image side */}
          <motion.div
            ref={accentRef}
            className="relative"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            {/* Main image */}
            <div className="relative overflow-hidden rounded-2xl aspect-[4/5]">
              <motion.div className="absolute inset-0" style={{ y: imageY }}>
                <Image
                  src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fm=webp&q=90&w=1000&h=1250&fit=crop"
                  alt="Master jeweller crafting luxury jewelry with precision and artistry"
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/40 to-transparent" />
            </div>

            {/* Floating accent card */}
            <motion.div
              data-accent-card
              className="absolute -bottom-8 -right-8 glass border-gold-glow rounded-xl p-5 w-48"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <p className="font-serif text-3xl text-gold-light mb-1">25+</p>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/50">
                Years of Mastery
              </p>
            </motion.div>

            {/* Second accent */}
            <motion.div
              data-accent-card
              className="absolute -top-6 -left-6 glass border-gold-glow rounded-xl p-4 w-40"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="font-serif text-2xl text-gold-light mb-1">100%</p>
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/50">
                Handcrafted
              </p>
            </motion.div>
          </motion.div>

          {/* Text side */}
          <motion.div style={{ x: textX }}>
            <motion.p
              className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              The Art of Making
            </motion.p>

            <div className="overflow-hidden mb-4">
              <motion.h2
                className="font-serif text-display-md text-ivory"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                Where Craft
              </motion.h2>
            </div>
            <div className="overflow-hidden mb-8">
              <motion.h2
                className="font-serif text-display-md italic text-gold-light"
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                Meets Soul
              </motion.h2>
            </div>

            <motion.p
              className="font-sans text-base text-ivory/50 leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Every LUXE piece begins as a sketch — a vision translated through the hands of master artisans who have spent decades perfecting their craft. We work exclusively with ethically sourced metals and conflict-free gemstones.
            </motion.p>

            <motion.p
              className="font-sans text-base text-ivory/50 leading-relaxed mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              From the initial wax carving to the final polish, each piece passes through 47 quality checkpoints before it reaches you.
            </motion.p>

            {/* Stats row */}
            <motion.div
              className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-gold/10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {[
                { value: "47", label: "Quality Checks" },
                { value: "6", label: "Weeks to Craft" },
                { value: "∞", label: "Lifetime Warranty" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-3xl text-gold-light mb-1">{stat.value}</p>
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-ivory/40">{stat.label}</p>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="/appointment"
                className="inline-flex items-center gap-3 font-sans text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors duration-300 underline-gold"
              >
                Book Consultation
                <div className="w-8 h-px bg-gold" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
