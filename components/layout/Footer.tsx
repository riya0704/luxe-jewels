"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Share2, Heart, Link2, Mail } from "lucide-react";
import { footerLinks } from "@/lib/data/navigation";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

const socialLinks = [
  { Icon: Share2, href: "#", label: "Instagram" },
  { Icon: Heart, href: "#", label: "Twitter" },
  { Icon: Link2, href: "#", label: "YouTube" },
  { Icon: Mail, href: "#", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal border-t border-gold/10">
      <div
        className="absolute -top-40 left-1/3 w-[520px] h-[520px] rounded-full opacity-15 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.35) 0%, transparent 72%)", filter: "blur(90px)" }}
      />
      <div
        className="absolute -bottom-48 right-0 w-[540px] h-[540px] rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(226,201,126,0.45) 0%, transparent 74%)", filter: "blur(95px)" }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12 pt-24 pb-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 xl:gap-8">
          <div className="xl:col-span-4">
            <Link href="/" className="inline-block">
              <p className="font-serif text-4xl tracking-[0.35em] text-gold-light">LUXE</p>
              <p className="font-sans mt-2 text-[10px] tracking-[0.5em] uppercase text-ivory/40">Fine Jewellery House</p>
            </Link>

            <p className="mt-8 max-w-sm font-sans text-sm text-ivory/55 leading-relaxed">
              Fine jewellery designed with architectural precision and finished by hand, for milestones that deserve permanence.
            </p>

            <div className="mt-7 flex items-center gap-3">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group size-10 rounded-full border border-gold/20 bg-charcoal-light/40 backdrop-blur-md flex items-center justify-center text-ivory/45 hover:text-gold hover:border-gold/60 transition-all"
                >
                  <Icon size={16} className="transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          <div className="xl:col-span-5 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(footerLinks).slice(0, 3).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/75 mb-4">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="font-sans text-sm text-ivory/45 hover:text-ivory transition-colors underline-gold">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="xl:col-span-3 rounded-2xl glass-premium p-6 border border-gold/20"
          >
            <p className="font-sans text-[10px] tracking-[0.35em] uppercase text-gold/75 mb-3">Private List</p>
            <h4 className="font-serif text-2xl text-ivory mb-2">The Salon Invite</h4>
            <p className="font-sans text-sm text-ivory/45 mb-6 leading-relaxed">
              Early access to new drops, private showcases, and concierge appointment windows.
            </p>
            <NewsletterForm
              placeholder="Enter your email"
              submitButtonText="Join"
              variant="compact"
              showSuccessMessage={false}
            />
          </motion.div>
        </div>

        <div className="my-12 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-ivory/30">© 2026 LUXE Fine Jewellery. Crafted in London.</p>
          <div className="flex items-center gap-6">
            <Link href="#" className="font-sans text-xs text-ivory/35 hover:text-ivory/70 transition-colors">Privacy</Link>
            <Link href="#" className="font-sans text-xs text-ivory/35 hover:text-ivory/70 transition-colors">Terms</Link>
            <Link href="#" className="font-sans text-xs text-ivory/35 hover:text-ivory/70 transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
