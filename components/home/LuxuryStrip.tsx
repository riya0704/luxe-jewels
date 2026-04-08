"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stripItems = [
  {
    id: "ring-atelier",
    title: "Atelier Rings",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fm=webp&q=90&w=960&h=1200&fit=crop",
  },
  {
    id: "noir-pendant",
    title: "Noir Pendant",
    image:
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fm=webp&q=90&w=960&h=1200&fit=crop",
  },
  {
    id: "diamond-curve",
    title: "Diamond Curve",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fm=webp&q=90&w=960&h=1200&fit=crop",
  },
  {
    id: "gold-bracelet",
    title: "Gold Bracelet",
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fm=webp&q=90&w=960&h=1200&fit=crop",
  },
  {
    id: "luxe-watch",
    title: "Luxe Watch",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fm=webp&q=90&w=960&h=1200&fit=crop",
  },
];

export function LuxuryStrip() {
  const loopedItems = [...stripItems, ...stripItems];

  return (
    <section className="relative py-14 overflow-hidden" aria-label="Luxury jewellery showcase strip">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 mb-6">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="font-sans text-[10px] tracking-[0.45em] uppercase text-gold/70"
        >
          Signature Highlights
        </motion.p>
      </div>

      <div className="relative">
        <div className="luxury-strip-track">
          {loopedItems.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              className="group relative luxury-strip-item overflow-hidden rounded-2xl border border-gold/15 bg-charcoal/35 backdrop-blur-xl"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 45vw, 20vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <p className="font-serif text-xl text-ivory">{item.title}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
