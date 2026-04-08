"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, Search } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-obsidian pt-20">
      <div className="max-w-[960px] mx-auto px-6 lg:px-12 py-24 text-center">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-4">
            Page Not Found
          </p>
          <h1 className="font-serif text-6xl sm:text-7xl text-gold mb-4">404</h1>
          <h2 className="font-serif text-3xl sm:text-4xl text-ivory mb-4">
            This page is unavailable
          </h2>
          <p className="font-sans text-base text-ivory/55 max-w-xl mx-auto">
            The page may have been removed during cleanup. You can continue browsing from the home page or go directly to the shop.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-gradient font-sans text-xs tracking-[0.2em] uppercase text-obsidian font-semibold hover:opacity-90 transition-opacity"
          >
            <Home size={16} /> Back to Home
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-gold/30 font-sans text-xs tracking-[0.2em] uppercase text-gold hover:bg-gold/10 transition-colors"
          >
            <Search size={16} /> Browse Shop
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
