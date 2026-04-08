"use client";

import { use, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Heart, ShoppingBag, Star, ChevronDown, Share2, Ruler } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/lib/data/products";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { ProductCard } from "@/components/home/NewArrivals";
import { notFound } from "next/navigation";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/hooks/useScrollReveal";
import { createMagneticButton } from "@/lib/animations/premium";

gsap.registerPlugin(ScrollTrigger);

const sizes = ["5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const ctaRef = useRef<HTMLDivElement>(null);
  const wishlistRef = useRef<HTMLButtonElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  useEffect(() => {
    // Apply magnetic effects to main CTA button
    if (ctaRef.current) {
      const addBtn = ctaRef.current.querySelector("button:first-child");
      if (addBtn) createMagneticButton(addBtn as HTMLElement, 0.25);
    }

    // Apply magnetic effect to wishlist button
    if (wishlistRef.current) {
      createMagneticButton(wishlistRef.current, 0.2);
    }

    // Animate related products on scroll
    if (relatedRef.current) {
      const items = relatedRef.current.querySelectorAll("[data-related-item]");
      items.forEach((item, i) => {
        gsap.from(item, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: item,
            start: "top 75%",
            once: true,
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedSize);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Image gallery */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Main image */}
            <motion.div
              className="relative aspect-square rounded-2xl overflow-hidden bg-charcoal-light metallic-shine group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>

              {/* Badge */}
              {product.badge && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full font-sans text-[9px] tracking-[0.3em] uppercase ${
                    product.badge === "Limited" ? "bg-ruby/80 text-ivory" :
                    product.badge === "New" ? "bg-gold/90 text-obsidian" :
                    "bg-emerald-bright/80 text-ivory"
                  }`}
                >
                  {product.badge}
                </motion.div>
              )}

              {/* Share */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 8 }}
                whileTap={{ scale: 0.95 }}
                className="absolute top-4 right-4 w-9 h-9 glass rounded-full flex items-center justify-center text-ivory/60 hover:text-gold transition-colors duration-300"
              >
                <Share2 size={14} />
              </motion.button>
            </motion.div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <motion.button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                      selectedImage === i ? "ring-1 ring-gold shadow-md shadow-gold/20" : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`View ${i + 1}`}
                      fill
                      sizes="80px"
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Breadcrumb */}
            <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/30 mb-6">
              Shop / {product.category} / {product.name}
            </p>

            {/* Material */}
            <p className="font-sans text-[10px] tracking-[0.4em] uppercase text-gold/70 mb-3">
              {product.material} {product.gemstone && `· ${product.gemstone}`}
            </p>

            {/* Name */}
            <h1 className="font-serif text-4xl lg:text-5xl text-ivory mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < Math.floor(product.rating) ? "text-gold fill-gold" : "text-charcoal-mid"}
                  />
                ))}
              </div>
              <span className="font-sans text-sm text-ivory/40">{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-8 pb-8 border-b border-gold/10">
              <span className="font-serif text-4xl text-ivory">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="font-sans text-lg text-ivory/30 line-through">${product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            {/* Description */}
            <p className="font-sans text-base text-ivory/50 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Size selector (for rings) */}
            {product.category === "rings" && (
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/60">Ring Size</p>
                  <motion.button
                    whileHover={{ x: 2 }}
                    className="flex items-center gap-1 font-sans text-[10px] text-gold/70 hover:text-gold transition-colors"
                  >
                    <Ruler size={12} /> Size Guide
                  </motion.button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size, idx) => (
                    <motion.button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: idx * 0.03 }}
                      className={`w-12 h-12 rounded-full font-sans text-sm transition-all duration-300 ${
                        selectedSize === size
                          ? "bg-gold-gradient text-obsidian font-semibold shadow-lg shadow-gold/30"
                          : "border border-charcoal-mid text-ivory/50 hover:border-gold/40 hover:text-ivory"
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-8">
              <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/60">Qty</p>
              <div className="flex items-center gap-3 border border-gold/20 rounded-full px-4 py-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-ivory/60 hover:text-gold transition-colors w-5 text-center"
                >
                  −
                </button>
                <span className="font-sans text-sm text-ivory w-4 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-ivory/60 hover:text-gold transition-colors w-5 text-center"
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <motion.div
              ref={ctaRef}
              className="flex gap-3 mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={handleAddToCart}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-full font-sans text-xs tracking-[0.2em] uppercase font-semibold transition-all duration-300 relative overflow-hidden ${
                  addedToCart
                    ? "bg-emerald-bright text-ivory shadow-lg shadow-emerald-bright/30"
                    : "bg-gold-gradient text-obsidian hover:opacity-90 hover:shadow-lg hover:shadow-gold/40"
                }`}
              >
                <ShoppingBag size={16} />
                {addedToCart ? "Added to Cart" : "Add to Cart"}
              </motion.button>
              <motion.button
                ref={wishlistRef}
                onClick={() => toggle(product)}
                whileHover={{ scale: 1.08, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${
                  wishlisted
                    ? "border-ruby-bright text-ruby-bright bg-ruby/10 shadow-md shadow-ruby-bright/20"
                    : "border-gold/20 text-ivory/50 hover:border-gold/50 hover:text-gold"
                }`}
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
              </motion.button>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="grid grid-cols-3 gap-4 py-6 border-t border-gold/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {[
                { icon: "✦", label: "Free Shipping", sub: "On orders over $500" },
                { icon: "◈", label: "Lifetime Warranty", sub: "Guaranteed forever" },
                { icon: "◇", label: "Free Returns", sub: "30-day policy" },
              ].map((badge, idx) => (
                <motion.div
                  key={badge.label}
                  className="text-center"
                  whileHover={{ scale: 1.05, y: -4 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + idx * 0.05 }}
                >
                  <span className="text-gold/60 text-lg block mb-1">{badge.icon}</span>
                  <p className="font-sans text-[10px] text-ivory/60">{badge.label}</p>
                  <p className="font-sans text-[9px] text-ivory/30">{badge.sub}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Accordion tabs */}
            <motion.div
              className="border-t border-gold/10 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { id: "details", label: "Details & Specifications" },
                { id: "care", label: "Care Instructions" },
                { id: "shipping", label: "Shipping & Returns" },
              ].map((tab) => (
                <div key={tab.id} className="border-b border-gold/10">
                  <motion.button
                    onClick={() => setActiveTab(activeTab === tab.id ? "" : tab.id)}
                    whileHover={{ x: 4 }}
                    className="w-full flex items-center justify-between py-4 font-sans text-xs tracking-[0.2em] uppercase text-ivory/60 hover:text-gold transition-colors duration-300"
                  >
                    {tab.label}
                    <motion.div animate={{ rotate: activeTab === tab.id ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={14} />
                    </motion.div>
                  </motion.button>
                  <AnimatePresence>
                    {activeTab === tab.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="font-sans text-sm text-ivory/40 leading-relaxed pb-4">
                          {tab.id === "details" && `Material: ${product.material}. ${product.gemstone ? `Gemstone: ${product.gemstone}.` : ""} Collection: ${product.collection}. Each piece is individually crafted and may have slight natural variations.`}
                          {tab.id === "care" && "Store in the provided velvet pouch away from direct sunlight. Clean gently with a soft cloth. Avoid contact with perfumes, lotions, and chemicals. Professional cleaning recommended annually."}
                          {tab.id === "shipping" && "Complimentary shipping on all orders over $500. Standard delivery 3–5 business days. Express available at checkout. Free returns within 30 days of delivery."}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <motion.div
            ref={relatedRef}
            className="mt-32"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="mb-12"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={staggerContainerVariants}
            >
              <motion.p variants={fadeUpVariants} className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-3">
                You May Also Love
              </motion.p>
              <motion.h2 variants={fadeUpVariants} className="font-serif text-3xl text-ivory">
                Related Pieces
              </motion.h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {related.map((p) => (
                <motion.div
                  key={p.id}
                  data-related-item
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard
                    product={p}
                    onAddToCart={() => addItem(p)}
                    onWishlist={() => toggle(p)}
                    isWishlisted={isWishlisted(p.id)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
