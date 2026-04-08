"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface SortOption {
  label: string;
  value: string;
}

interface SortControlsProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  sortOptions: SortOption[];
  productCount: number;
}

export function SortControls({
  sortBy,
  onSortChange,
  sortOptions,
  productCount,
}: SortControlsProps) {
  const [sortOpen, setSortOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <motion.span
        className="font-sans text-xs text-ivory/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {productCount} piece{productCount !== 1 ? "s" : ""} available
      </motion.span>

      <div className="relative">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          onClick={() => setSortOpen((prev: boolean) => !prev)}
          className="flex items-center gap-2 px-4 py-2 border border-gold/30 rounded-full font-sans text-[10px] tracking-[0.15em] uppercase text-ivory/70 hover:border-gold/60 hover:text-gold transition-all duration-300 group"
          whileHover={{ scale: 1.02 }}
        >
          Sort{" "}
          <motion.div
            className="transition-transform"
            animate={{ rotate: sortOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown size={14} />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {sortOpen && (
            <motion.div
              className="absolute right-0 top-full mt-3 w-56 glass border border-gold/20 rounded-xl overflow-hidden z-50 shadow-2xl"
              initial={{ opacity: 0, y: -12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {sortOptions.map((opt, index) => (
                <motion.button
                  key={opt.value}
                  onClick={() => {
                    onSortChange(opt.value);
                    setSortOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 font-sans text-xs transition-all duration-200 ${
                    sortBy === opt.value
                      ? "text-gold bg-gold/10 border-l-2 border-gold"
                      : "text-ivory/60 hover:text-ivory hover:bg-gold/5"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ x: 4 }}
                >
                  {opt.label}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
