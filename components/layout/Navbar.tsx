"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Heart, Menu, X, ChevronDown } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";
import { collections, navLinks } from "@/lib/data/navigation";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const { itemCount } = useCartStore();

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setMegaMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
          scrolled ? "glass border-b border-gold/10" : "bg-transparent"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Left nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.hasMenu && setMegaMenuOpen(true)}
                  onMouseLeave={() => link.hasMenu && setMegaMenuOpen(false)}
                >
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 font-sans text-xs tracking-[0.15em] uppercase text-ivory/70 hover:text-gold transition-colors duration-300 underline-gold"
                  >
                    {link.label}
                    {link.hasMenu && (
                      <ChevronDown
                        size={12}
                        className={`transition-transform duration-300 ${megaMenuOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </Link>
                </div>
              ))}
            </nav>

            {/* Center logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <motion.div
                className="text-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <span className="font-serif text-2xl tracking-[0.4em] text-gold-light">
                  LUXE
                </span>
                <div className="text-[8px] tracking-[0.5em] text-beige/40 uppercase -mt-1">
                  Fine Jewellery
                </div>
              </motion.div>
            </Link>

            {/* Right icons */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-ivory/60 hover:text-gold transition-colors duration-300"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
              <Link href="/wishlist" className="text-ivory/60 hover:text-gold transition-colors duration-300 hidden sm:block" aria-label="Wishlist">
                <Heart size={18} />
              </Link>
              <Link href="/cart" className="relative text-ivory/60 hover:text-gold transition-colors duration-300" aria-label="Cart">
                <ShoppingBag size={18} />
                {hydrated && itemCount() > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-gold text-obsidian text-[9px] font-sans font-semibold flex items-center justify-center">
                    {itemCount()}
                  </span>
                )}
              </Link>
              <button
                className="lg:hidden text-ivory/60 hover:text-gold transition-colors duration-300"
                onClick={() => setMobileOpen(true)}
                aria-label="Menu"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mega menu */}
        <AnimatePresence>
          {megaMenuOpen && (
            <motion.div
              className="hidden lg:block absolute top-full left-0 right-0 glass border-t border-gold/10"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
            >
              <div className="max-w-[1440px] mx-auto px-12 py-10">
                <div className="grid grid-cols-6 gap-6">
                  {collections.map((col, i) => (
                    <motion.div
                      key={col.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link href={col.href} className="group block">
                        {/* Placeholder image */}
                        <div className="aspect-square bg-charcoal-light rounded-lg mb-3 overflow-hidden metallic-shine">
                          <div className="w-full h-full bg-gradient-to-br from-charcoal-mid to-charcoal flex items-center justify-center">
                            <span className="text-gold/30 font-serif text-3xl">{col.label[0]}</span>
                          </div>
                        </div>
                        <p className="font-sans text-xs tracking-[0.15em] uppercase text-ivory/80 group-hover:text-gold transition-colors duration-300">
                          {col.label}
                        </p>
                        <p className="font-sans text-[11px] text-ivory/40 mt-0.5">{col.desc}</p>
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-gold/10 flex items-center justify-between">
                  <Link href="/collections" className="font-sans text-xs tracking-[0.2em] uppercase text-gold hover:text-gold-light transition-colors underline-gold">
                    View All Collections
                  </Link>
                  <Link href="/collections/limited-edition" className="font-sans text-xs tracking-[0.2em] uppercase text-ruby-bright hover:text-ruby-bright/80 transition-colors">
                    ✦ Limited Edition Drop
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              className="absolute top-full left-0 right-0 glass border-t border-gold/10 px-6 lg:px-12 py-5"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="max-w-2xl mx-auto flex items-center gap-4">
                <Search size={16} className="text-gold/60 shrink-0" aria-hidden="true" />
                <label htmlFor="navbar-search" className="sr-only">Search products</label>
                <input
                  id="navbar-search"
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search rings, necklaces, gemstones..."
                  className="flex-1 bg-transparent font-sans text-sm text-ivory placeholder:text-ivory/30 outline-none border-b border-gold/20 pb-1 focus:border-gold/60 transition-colors duration-300"
                  aria-label="Search products"
                />
                <button onClick={() => setSearchOpen(false)} className="text-ivory/40 hover:text-ivory transition-colors" aria-label="Close search">
                  <X size={16} aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[1001] bg-obsidian flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center justify-between px-6 h-20 border-b border-gold/10">
              <span className="font-serif text-2xl tracking-[0.4em] text-gold-light">LUXE</span>
              <button onClick={() => setMobileOpen(false)} className="text-ivory/60 hover:text-gold transition-colors">
                <X size={22} />
              </button>
            </div>
            <nav className="flex-1 px-6 py-10 flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-serif text-3xl text-ivory/80 hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="px-6 pb-10 flex gap-6">
              <Link href="/cart" onClick={() => setMobileOpen(false)} className="text-ivory/60 hover:text-gold transition-colors">
                <ShoppingBag size={20} />
              </Link>
              <Link href="/wishlist" onClick={() => setMobileOpen(false)} className="text-ivory/60 hover:text-gold transition-colors">
                <Heart size={20} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
