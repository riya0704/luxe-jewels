"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlistStore } from "@/lib/store/wishlistStore";
import { useCartStore } from "@/lib/store/cartStore";
import { ProductCard } from "@/components/home/NewArrivals";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/hooks/useScrollReveal";

export default function WishlistPage() {
  const { items, toggle } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <motion.div
          className="mb-12"
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
        >
          <motion.p variants={fadeUpVariants} className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-3">
            Saved Pieces
          </motion.p>
          <motion.h1 variants={fadeUpVariants} className="font-serif text-display-md text-ivory">
            Wishlist
          </motion.h1>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            className="text-center py-32"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center mx-auto mb-8"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Heart size={28} className="text-gold/40" />
            </motion.div>
            <motion.h2
              className="font-serif text-3xl text-ivory/50 mb-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Your wishlist is empty
            </motion.h2>
            <motion.p
              className="font-sans text-sm text-ivory/30 mb-10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Save pieces you love to revisit them later.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold-gradient font-sans text-xs tracking-[0.2em] uppercase text-obsidian font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-gold/20"
              >
                Discover the Collection
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            animate="visible"
            variants={staggerContainerVariants}
          >
            {items.map((product) => (
              <motion.div key={product.id} variants={fadeUpVariants} whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                <ProductCard
                  product={product}
                  onAddToCart={() => addItem(product)}
                  onWishlist={() => toggle(product)}
                  isWishlisted={true}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
