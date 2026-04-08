"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const posts = [
  {
    id: "ig-1",
    title: "Midnight Diamond",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fm=webp&q=90&w=900&h=1100&fit=crop",
  },
  {
    id: "ig-2",
    title: "Sculpted Gold",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fm=webp&q=90&w=900&h=1100&fit=crop",
  },
  {
    id: "ig-3",
    title: "Noir Atelier",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fm=webp&q=90&w=900&h=1100&fit=crop",
  },
  {
    id: "ig-4",
    title: "Golden Hour",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fm=webp&q=90&w=900&h=1100&fit=crop",
  },
  {
    id: "ig-5",
    title: "Brilliant Craft",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fm=webp&q=90&w=900&h=1100&fit=crop",
  },
  {
    id: "ig-6",
    title: "LUXE Portrait",
    href: "#",
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fm=webp&q=90&w=900&h=1100&fit=crop",
  },
];

export function InstagramGallery() {
  return (
    <section className="py-28" aria-label="Instagram gallery">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="flex items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-3">Social Atelier</p>
            <h2 className="font-serif text-display-md text-ivory">Seen in Motion</h2>
          </div>
          <Link
            href="#"
            className="font-sans text-xs tracking-[0.25em] uppercase text-gold/80 hover:text-gold transition-colors underline-gold"
          >
            Follow @luxe
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.06 }}
              className={`group relative overflow-hidden rounded-2xl border border-gold/10 ${index % 5 === 0 ? "md:col-span-2" : ""}`}
            >
              <Link href={post.href} className="block">
                <div className="relative aspect-[4/5] md:aspect-[3/4]">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/75 via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <p className="font-serif text-xl text-ivory">{post.title}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
