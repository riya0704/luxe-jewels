"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { collections } from "@/lib/data/products";
import { staggerContainerVariants, fadeUpVariants } from "@/lib/hooks/useScrollReveal";

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-obsidian pt-20">
      {/* Hero */}
      <div className="relative h-64 bg-charcoal border-b border-gold/10 flex items-end px-6 lg:px-12 pb-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ background: "radial-gradient(ellipse at 50% 100%, rgba(201,168,76,0.4) 0%, transparent 60%)" }}
        />
        <div className="max-w-[1440px] mx-auto w-full relative z-10">
          <motion.p
            className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Curated Worlds
          </motion.p>
          <motion.h1
            className="font-serif text-display-md text-ivory"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Collections
          </motion.h1>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial="hidden"
          animate="visible"
          variants={staggerContainerVariants}
        >
          {collections.map((col, i) => (
            <motion.div key={col.id} variants={fadeUpVariants}>
              <Link href={`/collections/${col.id}`} className="group block relative overflow-hidden rounded-2xl luxury-card">
                <div className={`relative overflow-hidden ${i === 0 ? "aspect-[4/3]" : "aspect-[16/9]"}`}>
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/30 to-transparent" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    {col.isNew && (
                      <span className="inline-block mb-3 font-sans text-[9px] tracking-[0.4em] uppercase text-gold bg-gold/10 border border-gold/30 rounded-full px-3 py-1 w-fit">
                        New
                      </span>
                    )}
                    <p className="font-sans text-[10px] tracking-[0.3em] uppercase text-ivory/40 mb-2">
                      {col.productCount} Pieces
                    </p>
                    <h2 className="font-serif text-4xl text-ivory mb-2">{col.name}</h2>
                    <p className="font-sans text-sm text-ivory/50 italic mb-4">{col.tagline}</p>
                    <p className="font-sans text-sm text-ivory/40 mb-6 max-w-md">{col.description}</p>
                    <div className="flex items-center gap-2 text-gold/70 group-hover:text-gold transition-colors duration-300">
                      <span className="font-sans text-xs tracking-[0.2em] uppercase">Explore Collection</span>
                      <ArrowRight size={14} className="transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
