"use client";

import { useRef, useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/lib/data/products";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { ProductCard } from "./NewArrivals";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/hooks/useScrollReveal";
import { createMagneticButton } from "@/lib/animations/premium";

gsap.registerPlugin(ScrollTrigger);

/**
 * Horizontal scrolling carousel for bestsellers.
 * Premium animations with:
 * - Animated floating orbs
 * - Smooth scroll transitions
 * - Parallax effects on carousel items
 * - Magnetic scroll buttons
 * - Auto-scroll indicators
 */
export function BestSellers() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();

  const bestSellers = useMemo(
    () => products.filter((p) => p.badge === "Bestseller" || p.isFeatured),
    []
  );

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = 340;
    scrollRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    // Add magnetic effect to scroll buttons
    if (controlsRef.current) {
      const buttons = controlsRef.current.querySelectorAll("button");
      buttons.forEach((btn) => {
        createMagneticButton(btn, 0.2);
      });
    }

    // Add parallax to carousel items on scroll
    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", () => {
        const items = scrollRef.current?.querySelectorAll("div > div");
        items?.forEach((item, index) => {
          const scrollPos = scrollRef.current?.scrollLeft || 0;
          const parallaxAmount = (scrollPos / 10) * (index % 2 === 0 ? 1 : -1);
          (item as HTMLElement).style.transform = `translateY(${parallaxAmount}px)`;
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-32 overflow-hidden relative bg-gradient-to-b from-obsidian via-charcoal/30 to-obsidian" aria-label="Best Sellers">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Left accent orb */}
        <motion.div
          className="absolute -left-32 top-1/2 w-80 h-80 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.6) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.15, 0.05],
            x: [0, 20, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Right accent orb */}
        <motion.div
          className="absolute -right-32 top-1/4 w-64 h-64 rounded-full opacity-8"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.5) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.03, 0.12, 0.03],
            y: [0, 30, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          className="flex items-end justify-between mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainerVariants}
        >
          <div>
            <motion.p variants={fadeUpVariants} className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-3">
              Most Loved
            </motion.p>
            <motion.h2 variants={fadeUpVariants} className="font-serif text-display-md text-ivory">
              Best Sellers
            </motion.h2>
          </div>

          {/* Scroll controls */}
          <motion.div ref={controlsRef} variants={fadeUpVariants} className="hidden lg:flex gap-3">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollLeft
                  ? "border-gold/40 text-gold hover:bg-gold/10"
                  : "border-charcoal-mid text-ivory/20 cursor-not-allowed"
              }`}
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                canScrollRight
                  ? "border-gold/40 text-gold hover:bg-gold/10"
                  : "border-charcoal-mid text-ivory/20 cursor-not-allowed"
              }`}
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scrollable track */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-6 overflow-x-auto scrollbar-hide pl-6 lg:pl-12 pr-6 lg:pr-12 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {bestSellers.map((product, i) => (
          <motion.div
            key={product.id}
            className="flex-shrink-0 w-72"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: "easeOut" }}
          >
            <ProductCard
              product={product}
              onAddToCart={() => addItem(product)}
              onWishlist={() => toggle(product)}
              isWishlisted={isWishlisted(product.id)}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
