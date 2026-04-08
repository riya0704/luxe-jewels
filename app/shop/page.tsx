"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/home/NewArrivals";
import { useCartStore } from "@/lib/store/cartStore";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/hooks/useScrollReveal";
import { createMagneticButton } from "@/lib/animations/premium";

gsap.registerPlugin(ScrollTrigger);

const categories = ["All", "Rings", "Necklaces", "Bracelets", "Earrings", "Watches", "Gemstones"];
const materials = ["All", "18k Yellow Gold", "18k White Gold", "18k Rose Gold", "Platinum", "Titanium"];
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Rated", value: "rating" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMaterial, setSelectedMaterial] = useState("All");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 30000]);
  const [sortBy, setSortBy] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const addItem = useCartStore((s) => s.addItem);
  const { toggle, isWishlisted } = useWishlistStore();

  useEffect(() => {
    // Add magnetic effects to sort and filter buttons
    if (controlsRef.current) {
      const buttons = controlsRef.current.querySelectorAll("button");
      buttons.forEach((btn) => {
        createMagneticButton(btn, 0.2);
      });
    }

    // Add scroll-triggered animations to product grid
    if (gridRef.current) {
      const items = gridRef.current.querySelectorAll("[data-product-item]");
      items.forEach((item, index) => {
        gsap.from(item, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          delay: index * 0.05,
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            once: true,
          },
        });
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [selectedCategory, selectedMaterial, priceRange, sortBy]);

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category === selectedCategory.toLowerCase());
    }
    if (selectedMaterial !== "All") {
      result = result.filter((p) => p.material === selectedMaterial);
    }
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
    }

    return result;
  }, [selectedCategory, selectedMaterial, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      {/* Page header */}
      <div className="bg-charcoal border-b border-gold/10 py-16 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto">
          <motion.p
            className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Discover
          </motion.p>
          <motion.h1
            className="font-serif text-display-md text-ivory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            The Collection
          </motion.h1>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
        {/* Filter bar */}
        <div ref={controlsRef} className="flex flex-wrap items-center justify-between gap-4 mb-10">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat, idx) => (
              <motion.button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`px-4 py-2 rounded-full font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 relative ${
                  selectedCategory === cat
                    ? "bg-gold-gradient text-obsidian shadow-lg shadow-gold/30"
                    : "border border-gold/20 text-ivory/50 hover:border-gold/50 hover:text-ivory/80 hover:shadow-md hover:shadow-gold/20"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Sort + Filter controls */}
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs text-ivory/30">{filtered.length} pieces</span>

            {/* Sort dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setSortOpen(!sortOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2 border border-gold/20 rounded-full font-sans text-[10px] tracking-[0.15em] uppercase text-ivory/60 hover:border-gold/50 hover:text-ivory hover:shadow-md hover:shadow-gold/20 transition-all duration-300"
              >
                Sort <ChevronDown size={12} className={`transition-transform ${sortOpen ? "rotate-180" : ""}`} />
              </motion.button>
              <AnimatePresence>
                {sortOpen && (
                  <motion.div
                    className="absolute right-0 top-full mt-2 w-48 glass border border-gold/10 rounded-xl overflow-hidden z-50 shadow-2xl shadow-gold/10"
                    initial={{ opacity: 0, y: -12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -12, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {sortOptions.map((opt, idx) => (
                      <motion.button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                        whileHover={{ x: 4 }}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`w-full text-left px-4 py-3 font-sans text-xs transition-all duration-200 ${
                          sortBy === opt.value ? "text-gold bg-gold/5 shadow-inset shadow-gold/10" : "text-ivory/60 hover:text-ivory hover:bg-white/5"
                        }`}
                      >
                        {opt.label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filter toggle */}
            <motion.button
              onClick={() => setFiltersOpen(!filtersOpen)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-2 px-4 py-2 border border-gold/20 rounded-full font-sans text-[10px] tracking-[0.15em] uppercase text-ivory/60 hover:border-gold/50 hover:text-ivory hover:shadow-md hover:shadow-gold/20 transition-all duration-300"
            >
              <SlidersHorizontal size={12} /> Filters
            </motion.button>
          </div>
        </div>

        {/* Expanded filters */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              className="glass border border-gold/10 rounded-2xl p-6 mb-10 shadow-2xl shadow-gold/5"
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Material filter */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-4">Material</p>
                  <div className="flex flex-wrap gap-2">
                    {materials.map((mat, idx) => (
                      <motion.button
                        key={mat}
                        onClick={() => setSelectedMaterial(mat)}
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`px-3 py-1.5 rounded-full font-sans text-[10px] transition-all duration-300 ${
                          selectedMaterial === mat
                            ? "bg-gold/20 text-gold border border-gold/40 shadow-md shadow-gold/20"
                            : "border border-charcoal-mid text-ivory/40 hover:border-gold/30 hover:text-ivory/60"
                        }`}
                      >
                        {mat}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Price range */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/60 mb-4">
                    Price Range: ${priceRange[0].toLocaleString()} – ${priceRange[1].toLocaleString()}
                  </p>
                  <input
                    type="range"
                    min={0}
                    max={30000}
                    step={500}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-gold"
                  />
                </motion.div>

                {/* Reset */}
                <motion.div
                  className="flex items-end"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    onClick={() => {
                      setSelectedCategory("All");
                      setSelectedMaterial("All");
                      setPriceRange([0, 30000]);
                      setSortBy("featured");
                    }}
                    whileHover={{ x: 4 }}
                    whileTap={{ x: 2 }}
                    className="flex items-center gap-2 font-sans text-xs text-ivory/40 hover:text-gold transition-colors duration-300"
                  >
                    <X size={12} /> Clear All Filters
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <motion.div
            className="text-center py-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.p
              className="font-serif text-3xl text-ivory/30 mb-4"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              No pieces found
            </motion.p>
            <p className="font-sans text-sm text-ivory/20">Try adjusting your filters</p>
          </motion.div>
        ) : (
          <motion.div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            key={`${selectedCategory}-${selectedMaterial}-${sortBy}`}
          >
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                variants={fadeUpVariants}
                data-product-item
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
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
        )}
      </div>
    </div>
  );
}
