"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { memo, useMemo, useState, useRef, useEffect } from "react";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/lib/data/products";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/hooks/useScrollReveal";
import { createMagneticButton } from "@/lib/animations/premium";

gsap.registerPlugin(ScrollTrigger);

/**
 * Premium New Arrivals showcase with:
 * - Asymmetric grid layout for visual interest
 * - Staggered product reveals with scroll triggers
 * - Enhanced hover interactions with 3D tilt
 * - Scroll-based parallax animations
 * - Nested animation sequences
 * - Magnetic button interactions
 */
export function NewArrivals() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const newProducts = useMemo(
    () => products.filter((p) => p.isNew || p.badge === "New").slice(0, 6),
    []
  );
  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();

  useEffect(() => {
    // Animate background orbs
    if (sectionRef.current) {
      const orbs = sectionRef.current.querySelectorAll(".animated-orb");
      orbs.forEach((orb, index) => {
        gsap.fromTo(
          orb,
          { opacity: 0, scale: 0.8 },
          {
            opacity: orb.classList.contains("orb-1") ? 0.08 : 0.05,
            scale: 1,
            duration: 1.2,
            delay: index * 0.2,
            ease: "power2.out",
          }
        );
      });
    }

    // Add scroll-triggered parallax to product cards
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".product-card");
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { filter: "blur(0px)" },
          {
            filter: index % 2 === 0 ? "blur(0px)" : "blur(0px)",
            y: index % 2 === 0 ? 20 : -20,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top center",
              end: "bottom center",
              scrub: 1,
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-gradient-to-b from-charcoal via-obsidian to-charcoal relative overflow-hidden"
      aria-label="New Arrivals"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Left accent orb */}
        <motion.div
          className="animated-orb orb-1 absolute -left-40 top-1/3 w-80 h-80 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.6) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.04, 0.12, 0.04],
            x: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Right accent orb */}
        <motion.div
          className="animated-orb orb-2 absolute -right-32 bottom-1/4 w-64 h-64 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.4) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
          animate={{
            scale: [1.1, 0.9, 1.1],
            opacity: [0.03, 0.1, 0.03],
            y: [0, 25, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Header with premium styling */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainerVariants}
        >
          <div>
            <motion.p
              variants={fadeUpVariants}
              className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-3"
            >
              Recently Added
            </motion.p>
            <motion.h2
              variants={fadeUpVariants}
              className="font-serif text-display-md text-ivory"
            >
              New Arrivals
            </motion.h2>
          </div>
          <motion.div variants={fadeUpVariants}>
            <Link
              href="/shop?sort=newest"
              className="font-sans text-xs tracking-[0.2em] uppercase text-gold/70 hover:text-gold transition-colors underline-gold inline-block"
            >
              View All New
            </Link>
          </motion.div>
        </motion.div>

        {/* Asymmetric product grid */}
        <motion.div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainerVariants}
        >
          {newProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={fadeUpVariants}
              className={`${
                index === 0 || index === 5 ? "lg:col-span-1 lg:row-span-1" : ""
              }`}
            >
              <ProductCard
                product={product}
                onAddToCart={() => addItem(product)}
                onWishlist={() => toggle(product)}
                isWishlisted={isWishlisted(product.id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

type ProductCardProps = {
  product: (typeof products)[0];
  onAddToCart: () => void;
  onWishlist: () => void;
  isWishlisted: boolean;
};

export const ProductCard = memo(function ProductCard({
  product,
  onAddToCart,
  onWishlist,
  isWishlisted,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const buttonGroupRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    onAddToCart();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  // 3D tilt effect on mouse move
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!card.contains(e.target as Node)) return;

      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const rotateX = ((e.clientY - centerY) / rect.height) * 10;
      const rotateY = -((e.clientX - centerX) / rect.width) * 10;

      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = "perspective(1200px) rotateX(0) rotateY(0) scale(1)";
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Shine animation on hover
  useEffect(() => {
    const shine = shineRef.current;
    const card = cardRef.current;
    if (!shine) return;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.fromTo(
        shine,
        { left: "-100%" },
        {
          left: "100%",
          duration: 0.7,
          ease: "power2.inOut",
        }
      );
    };

    card.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Magnetic button effect
  useEffect(() => {
    if (buttonGroupRef.current) {
      const addBtn = buttonGroupRef.current.querySelector("button");
      if (addBtn) {
        createMagneticButton(addBtn, 0.2);
      }
    }
  }, []);

  return (
    <Link
      href={`/product/${product.id}`}
      ref={cardRef}
      className="product-card group relative block transition-all duration-300"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Image container with premium effects */}
      <div className="relative overflow-hidden rounded-2xl mb-5">
        <div className="aspect-[3/4] relative bg-gradient-to-br from-charcoal via-charcoal-light to-charcoal min-h-[360px]">
          {/* Skeleton loader */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-charcoal via-charcoal-light to-charcoal opacity-60 z-40" />
          )}

          {/* Shine effect */}
          <div
            ref={shineRef}
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              left: "-100%",
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            }}
          />

          {/* Primary image with enhanced hover */}
          <motion.div whileHover={{ filter: "brightness(1.1)" }} className="absolute inset-0 z-10">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 40vw, 25vw"
              onLoad={() => {
                setImageLoaded(true);
                setImageError(false);
              }}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
              className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-110 metallic-shine relative z-10 ${
                imageLoaded && !imageError ? "opacity-100" : "opacity-0"
              }`}
            />
          </motion.div>

          {/* Hover second image with smooth transition */}
          <motion.div
            className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105 z-[9]"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            <Image
              src={product.images[1] || product.images[0]}
              alt={`${product.name} alternate view`}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 40vw, 25vw"
              onError={() => {
                setImageError(true);
              }}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Premium badge with animation */}
          {product.badge && (
            <motion.div
              className={`absolute top-4 left-4 px-3.5 py-1.5 rounded-full font-sans text-[9px] tracking-[0.3em] uppercase font-semibold backdrop-blur-md border ${
                product.badge === "Limited"
                  ? "bg-ruby/80 text-ivory border-ruby/40"
                  : product.badge === "New"
                  ? "bg-gold/90 text-obsidian border-gold/50"
                  : product.badge === "Bestseller"
                  ? "bg-emerald-bright/80 text-ivory border-emerald-bright/40"
                  : "bg-charcoal-mid/80 text-ivory border-gold/20"
              }`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {product.badge}
            </motion.div>
          )}

          {/* Action buttons with smooth reveal */}
          <motion.div
            ref={buttonGroupRef}
            className="absolute bottom-4 left-4 right-4 flex gap-2"
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.preventDefault()}
          >
            <motion.button
              onClick={handleAddToCart}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-sans text-[10px] tracking-[0.15em] uppercase transition-all duration-300 font-semibold ${
                addedToCart
                  ? "bg-emerald-bright text-ivory shadow-lg shadow-emerald-bright/30"
                  : "bg-gold-gradient text-obsidian hover:shadow-lg hover:shadow-gold/40"
              }`}
              aria-label="Add to cart"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ShoppingBag size={13} />
              {addedToCart ? "Added ✓" : "Add"}
            </motion.button>

            <motion.button
              onClick={(e) => {
                e.preventDefault();
                onWishlist();
              }}
              className="w-11 h-11 rounded-xl glass flex items-center justify-center text-ivory/70 hover:text-gold transition-colors duration-300"
              aria-label="Quick view"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={14} />
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Product info with smooth animations */}
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-2">
            {product.material}
          </p>
          <h3 className="font-serif text-lg text-ivory/90 hover:text-gold transition-colors duration-300 truncate">
            {product.name}
          </h3>
          {/* Stars with staggered animation */}
          <motion.div
            className="flex items-center gap-1.5 mt-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                  key={i}
                  className={`text-[10px] ${
                    i < Math.floor(product.rating) ? "text-gold" : "text-charcoal-mid"
                  }`}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                >
                  ★
                </motion.span>
              ))}
            </div>
            <span className="font-sans text-[10px] text-ivory/30">({product.reviews})</span>
          </motion.div>
        </div>

        <div className="flex flex-col items-end gap-3 ml-4 flex-shrink-0">
          <motion.span
            className="font-serif text-lg text-ivory/90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            ${product.price.toLocaleString()}
          </motion.span>
          <motion.button
            onClick={(e) => {
              e.preventDefault();
              onWishlist();
            }}
            className="text-ivory/30 hover:text-ruby-bright transition-colors duration-300"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
          >
            <Heart
              size={16}
              fill={isWishlisted ? "currentColor" : "none"}
              className={
                isWishlisted ? "text-ruby-bright" : "text-ivory/30"
              }
            />
          </motion.button>
        </div>
      </div>
    </Link>
  );
});
