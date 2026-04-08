"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  createHeroReveal,
  createMagneticButton,
  createOptimizedFloatingParticles,
} from "@/lib/animations/premium";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const [mouse, setMouse] = useState({ x: 0.5, y: 0.4 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, mass: 0.3 });
  const bgY = useTransform(smoothProgress, [0, 1], ["0%", "22%"]);
  const frameY = useTransform(smoothProgress, [0, 1], ["0%", "8%"]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0.25]);

  const spotlightX = `${mouse.x * 100}%`;
  const spotlightY = `${mouse.y * 100}%`;

  const sparkles = useMemo(
    () =>
      Array.from({ length: 18 }).map((_, i) => ({
        id: i,
        size: i % 4 === 0 ? 5 : 3,
        top: `${10 + ((i * 9) % 80)}%`,
        left: `${5 + ((i * 13) % 90)}%`,
        duration: 5 + (i % 6),
      })),
    []
  );

  useEffect(() => {
    if (!containerRef.current) return;

    createHeroReveal(containerRef.current);

    if (particlesRef.current) {
      const isMobile = window.innerWidth < 768;
      createOptimizedFloatingParticles(particlesRef.current, isMobile ? 8 : 18);
    }

    const buttons = ctaRef.current?.querySelectorAll("a");
    buttons?.forEach((btn) => createMagneticButton(btn, 0.24));

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelectorAll("[data-reveal]"),
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.25,
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-obsidian"
      aria-label="Luxury jewellery hero"
      onMouseMove={(e) => {
        if (window.innerWidth < 1024) return;
        const bounds = e.currentTarget.getBoundingClientRect();
        setMouse({
          x: (e.clientX - bounds.left) / bounds.width,
          y: (e.clientY - bounds.top) / bounds.height,
        });
      }}
    >
      <motion.div className="absolute inset-0" style={{ y: bgY, opacity: heroOpacity }}>
        <Image
          src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fm=webp&q=90&w=2200&h=1400&fit=crop"
          alt="Luxury diamond ring close-up with cinematic reflections"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/55 to-obsidian/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/35 via-transparent to-obsidian/80" />
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(420px circle at ${spotlightX} ${spotlightY}, rgba(226,201,126,0.16), transparent 60%)`,
        }}
      />

      <div className="absolute inset-0 pointer-events-none" ref={particlesRef} />

      <div className="absolute inset-0 pointer-events-none">
        {sparkles.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            className="absolute rounded-full bg-gold/45"
            style={{
              width: sparkle.size,
              height: sparkle.size,
              top: sparkle.top,
              left: sparkle.left,
              filter: "blur(0.6px)",
            }}
            animate={{ opacity: [0.1, 0.7, 0.15], y: [0, -22, 0] }}
            transition={{ duration: sparkle.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-[1440px] mx-auto min-h-screen px-6 lg:px-14 py-20 lg:py-24 grid lg:grid-cols-12 gap-8 items-end"
        style={{ y: frameY }}
      >
        <div ref={contentRef} className="lg:col-span-7 pb-16 lg:pb-20">
          <p
            data-reveal
            className="font-sans text-[10px] tracking-[0.55em] uppercase text-gold/80 mb-8"
          >
            Haute Joaillerie 2026
          </p>

          <h1
            data-reveal
            className="font-serif text-[clamp(3rem,8.8vw,8rem)] leading-[0.9] text-ivory max-w-4xl"
          >
            Crafted to Hold
            <br />
            <span className="text-gold-light italic">Eternity</span>
          </h1>

          <p
            data-reveal
            className="mt-8 max-w-xl font-sans text-base md:text-lg text-ivory/70 leading-relaxed"
          >
            A cinematic collection of diamonds, rare gemstones, and sculpted gold designed for collectors of
            modern heirlooms.
          </p>

          <div
            ref={ctaRef}
            data-reveal
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <Link
              href="/collections"
              className="premium-btn relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-gold-gradient text-obsidian font-sans text-[11px] tracking-[0.2em] uppercase font-semibold shadow-[0_15px_35px_rgba(201,168,76,0.35)] hover:shadow-[0_20px_50px_rgba(201,168,76,0.5)] transition-all"
            >
              Explore Collections
            </Link>
            <Link
              href="/appointment"
              className="premium-btn relative inline-flex items-center justify-center px-8 py-4 rounded-full border border-gold/40 bg-charcoal/40 backdrop-blur-md text-ivory font-sans text-[11px] tracking-[0.2em] uppercase hover:text-gold-light hover:border-gold/70 transition-all"
            >
              Book Private Viewing
            </Link>
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.1, delay: 0.55 }}
          className="lg:col-span-5 lg:self-end lg:justify-self-end w-full max-w-md"
        >
          <div className="glass-premium rounded-[28px] p-5 border-gold-glow">
            <div className="relative aspect-[4/5] rounded-[22px] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fm=webp&q=90&w=900&h=1200&fit=crop"
                alt="Model wearing handcrafted luxury necklace"
                fill
                loading="lazy"
                sizes="(max-width: 1024px) 85vw, 30vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
            </div>
            <div className="pt-4 flex items-center justify-between">
              <div>
                <p className="font-sans text-[9px] uppercase tracking-[0.35em] text-gold/70">Editorial Drop</p>
                <p className="font-serif text-2xl text-ivory mt-2">Noir Collection</p>
              </div>
              <Link href="/collections/noir" className="underline-gold font-sans text-xs tracking-[0.2em] uppercase text-gold/80">
                View
              </Link>
            </div>
          </div>
        </motion.aside>
      </motion.div>
    </section>
  );
}
