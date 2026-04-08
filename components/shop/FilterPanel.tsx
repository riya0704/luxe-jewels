"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/hooks/useScrollReveal";

interface FilterPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onCategoryChange: (cat: string) => void;
  selectedMaterial: string;
  onMaterialChange: (mat: string) => void;
  priceRange: [number, number];
  onPriceChange: (range: [number, number]) => void;
  onReset: () => void;
  categories: string[];
  materials: string[];
}

export function FilterPanel({
  isOpen,
  onClose,
  selectedCategory,
  onCategoryChange,
  selectedMaterial,
  onMaterialChange,
  priceRange,
  onPriceChange,
  onReset,
  categories,
  materials,
}: FilterPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          {/* Filter panel */}
          <motion.div
            className="fixed inset-0 z-50 overflow-auto max-w-2xl lg:relative lg:max-w-none lg:overflow-visible lg:bg-transparent lg:backdrop-blur-0"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="glass lg:glass-light border border-gold/10 rounded-2xl p-8 m-4 lg:m-0 lg:bg-transparent lg:border-0 lg:p-0">
              {/* Mobile close button */}
              <div className="flex items-center justify-between mb-8 lg:hidden">
                <h3 className="font-serif text-xl text-ivory">Filters</h3>
                <button
                  onClick={onClose}
                  aria-label="Close filters"
                  className="p-2 hover:bg-gold/10 rounded-lg transition-colors"
                >
                  <X size={20} className="text-ivory/60" />
                </button>
              </div>

              {/* Filters grid */}
              <motion.div
                className="space-y-10 lg:grid lg:grid-cols-3 lg:gap-12 lg:space-y-0"
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {/* Category filter */}
                <motion.div variants={fadeUpVariants}>
                  <label className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-4 block">
                    Category
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat, i) => (
                      <motion.button
                        key={cat}
                        onClick={() => onCategoryChange(cat)}
                        className={`px-4 py-2 rounded-full font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
                          selectedCategory === cat
                            ? "bg-gold-gradient text-obsidian shadow-lg shadow-gold/30"
                            : "border border-gold/20 text-ivory/50 hover:border-gold/50 hover:text-ivory/70"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {cat}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Material filter */}
                <motion.div variants={fadeUpVariants}>
                  <label className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-4 block">
                    Material
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {materials.map((mat, i) => (
                      <motion.button
                        key={mat}
                        onClick={() => onMaterialChange(mat)}
                        className={`px-3 py-1.5 rounded-full font-sans text-[10px] transition-all duration-300 ${
                          selectedMaterial === mat
                            ? "bg-gold/20 text-gold border border-gold/60 shadow-lg shadow-gold/20"
                            : "border border-charcoal-mid text-ivory/40 hover:border-gold/40 hover:text-ivory/60"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        {mat}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Price range */}
                <motion.div variants={fadeUpVariants}>
                  <label className="font-sans text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-4 block">
                    Price: ${priceRange[0].toLocaleString()} – ${priceRange[1].toLocaleString()}
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      aria-label="Maximum price"
                      min={0}
                      max={30000}
                      step={500}
                      value={priceRange[1]}
                      onChange={(e) =>
                        onPriceChange([
                          priceRange[0],
                          Number(e.target.value),
                        ])
                      }
                      className="w-full accent-gold"
                    />
                    <input
                      type="range"
                      aria-label="Minimum price"
                      min={0}
                      max={30000}
                      step={500}
                      value={priceRange[0]}
                      onChange={(e) =>
                        onPriceChange([
                          Number(e.target.value),
                          priceRange[1],
                        ])
                      }
                      className="w-full accent-gold"
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Reset button */}
              <motion.button
                onClick={onReset}
                className="mt-8 lg:mt-6 flex items-center gap-2 font-sans text-xs text-ivory/40 hover:text-gold transition-colors duration-300 lg:col-span-3"
                whileHover={{ x: 4 }}
                whileTap={{ x: 2 }}
              >
                <X size={14} /> Clear All Filters
              </motion.button>

              {/* Mobile apply button */}
              <motion.button
                onClick={onClose}
                className="w-full mt-8 lg:hidden px-6 py-3 bg-gold-gradient text-obsidian rounded-full font-sans text-xs tracking-[0.2em] uppercase font-semibold hover:shadow-lg hover:shadow-gold/30 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Apply Filters
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
