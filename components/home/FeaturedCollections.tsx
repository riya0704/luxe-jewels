"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollReveal, staggerContainerVariants, fadeUpVariants } from "@/lib/hooks/useScrollReveal";
import { collections } from "@/lib/data/products";
import { ArrowRight } from "lucide-react";
import { create3DTilt, createMagneticButton } from "@/lib/animations/premium";

gsap.registerPlugin(ScrollTrigger);

/**
 * Premium asymmetric editorial grid for featured collections.
 * Features:
 * - Asymmetric layout (7-5-12 column spans)
 * - 3D tilt hover effects
 * - Advanced scroll parallax
 * - Magnetic button interactions
 * - Staggered reveals with smooth animations
 */
export function FeaturedCollections() {
  const { ref, controls } = useScrollReveal();
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !cardsRef.current) return;

    const cards = Array.from(cardsRef.current.querySelectorAll<HTMLElement>(".collection-card"));

    // Keep subtle tilt, but avoid aggressive transforms that can cause overlap.
    const tiltCleanups = cards
      .map((card) => create3DTilt(card, 6, 1.015))
      .filter((cleanup): cleanup is () => void => Boolean(cleanup));

    // Apply parallax only to inner media layers so the grid tracks keep their natural height.
    const parallaxLayers = Array.from(
      cardsRef.current.querySelectorAll<HTMLElement>("[data-collection-parallax]")
    );

    const parallaxTweens = parallaxLayers.map((layer, index) =>
      gsap.to(layer, {
        yPercent: index % 2 === 0 ? 6 : -6,
        ease: "none",
        scrollTrigger: {
          trigger: layer.closest(".collection-card") || layer,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      })
    );

    // Add magnetic button to "View All" link
    const viewAllBtn = sectionRef.current.querySelector(".view-all-btn");
    let magneticCleanup: (() => void) | undefined;
    if (viewAllBtn) {
      magneticCleanup = createMagneticButton(viewAllBtn as HTMLElement, 0.3);
    }

    return () => {
      tiltCleanups.forEach((cleanup) => cleanup());
      magneticCleanup?.();
      parallaxTweens.forEach((tween) => {
        tween.scrollTrigger?.kill();
        tween.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 lg:px-12 max-w-[1440px] mx-auto" aria-label="Featured Collections">
      {/* Section header */}
      <motion.div
        ref={ref}
        variants={staggerContainerVariants}
        initial="hidden"
        animate={controls}
        className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6"
      >
        <div>
          <motion.p variants={fadeUpVariants} className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-3">
            Curated for You
          </motion.p>
          <motion.h2 variants={fadeUpVariants} className="font-serif text-display-md text-ivory">
            The Collections
          </motion.h2>
        </div>
        <motion.div variants={fadeUpVariants}>
          <Link
            href="/collections"
            className="view-all-btn flex items-center gap-2 font-sans text-xs tracking-[0.2em] uppercase text-gold/70 hover:text-gold transition-colors duration-300 underline-gold"
          >
            View All <ArrowRight size={14} />
          </Link>
        </motion.div>
      </motion.div>

      {/* Asymmetric grid */}
      <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6">
        {/* Large featured card — spans 7 cols */}
        <motion.div
          className="collection-card lg:col-span-7 lg:row-span-2"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <CollectionCard
            collection={collections[0]}
            size="large"
            aspectClass="aspect-[4/5]"
          />
        </motion.div>

        {/* Two smaller cards stacked — spans 5 cols */}
        {collections.slice(1, 3).map((col, i) => (
          <motion.div
            key={col.id}
            className="collection-card lg:col-span-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: (i + 1) * 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <CollectionCard
              collection={col}
              size="medium"
              aspectClass="aspect-[16/10]"
            />
          </motion.div>
        ))}

        {/* Wide bottom card — spans full */}
        <motion.div
          className="collection-card lg:col-span-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <CollectionCard
            collection={collections[3]}
            size="wide"
            aspectClass="aspect-[21/9]"
          />
        </motion.div>
      </div>
    </section>
  );
}

function CollectionCard({
  collection,
  size,
  aspectClass,
}: {
  collection: (typeof collections)[0];
  size: "large" | "medium" | "wide";
  aspectClass: string;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Fallback colors by collection
  const fallbackBgByCollection: Record<string, string> = {
    celestial: "from-blue-900/40 via-purple-900/30 to-obsidian",
    noir: "from-gray-900 via-charcoal to-obsidian",
    serpentine: "from-emerald-900/40 via-teal-900/30 to-obsidian",
    "limited-edition": "from-rose-900/40 via-pink-900/30 to-obsidian",
  };

  const fallbackBgColor =
    fallbackBgByCollection[collection.id] || "from-charcoal via-charcoal-light to-charcoal";

  return (
    <Link href={`/collections/${collection.id}`} className="group block relative overflow-hidden rounded-2xl luxury-card">
      <motion.div
        className={`${aspectClass} relative overflow-hidden bg-gradient-to-br ${fallbackBgColor} min-h-[300px]`}
        whileHover={{ boxShadow: "0 0 40px rgba(201,168,76,0.3)" }}
        transition={{ duration: 0.4 }}
      >
        {/* Skeleton loader */}
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-charcoal via-charcoal-light to-charcoal opacity-60" />
        )}

        {/* Image */}
        <div data-collection-parallax className="absolute inset-0 scale-[1.06] will-change-transform">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            loading="lazy"
            sizes={size === "wide" ? "100vw" : "(max-width: 1024px) 100vw, 60vw"}
            onLoad={() => {
              setImageLoaded(true);
              setImageError(false);
            }}
            onError={() => {
              setImageError(true);
              setImageLoaded(true);
            }}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.05] ${imageLoaded && !imageError ? "opacity-100" : "opacity-0"}`}
          />
        </div>

        {/* Gradient overlay with enhanced opacity on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent transition-opacity duration-500"
          whileHover={{ opacity: 0.7 }}
          initial={{ opacity: 1 }}
        />

        {/* Enhanced shine sweep */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(105deg, transparent 40%, rgba(201,168,76,0.06) 50%, transparent 60%)",
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Animated glow border on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl border border-gold/0"
          whileHover={{ borderColor: "rgba(201,168,76,0.4)" }}
          transition={{ duration: 0.3 }}
        />

        {/* Decorative elements if image fails */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-ivory/30">
              <div className="text-4xl mb-2">✨</div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
          {collection.isNew && (
            <motion.span
              className="inline-block mb-3 font-sans text-[9px] tracking-[0.4em] uppercase text-gold bg-gold/10 border border-gold/30 rounded-full px-3 py-1 w-fit"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(201,168,76,0.4)" }}
              transition={{ duration: 0.3 }}
            >
              New
            </motion.span>
          )}
          <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-ivory/50 mb-1">
            {collection.productCount} Pieces
          </p>
          <h3 className={`font-serif text-ivory mb-2 ${size === "large" ? "text-4xl lg:text-5xl" : size === "wide" ? "text-3xl lg:text-4xl" : "text-2xl lg:text-3xl"}`}>
            {collection.name}
          </h3>
          <p className="font-sans text-sm text-ivory/50 italic mb-4 hidden sm:block">
            {collection.tagline}
          </p>
          <motion.div
            className="flex items-center gap-2 text-gold/70 transition-colors duration-300 cursor-pointer"
            whileHover={{ color: "rgb(226, 201, 126)" }}
          >
            <span className="font-sans text-xs tracking-[0.2em] uppercase">Explore</span>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight size={14} />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
