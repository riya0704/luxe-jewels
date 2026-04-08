// Centralized navigation and collections data
// Single source of truth for all navigation links across the site

export const collections = [
  { label: "Rings", href: "/shop?category=rings", desc: "Solitaires, bands & statement pieces" },
  { label: "Necklaces", href: "/shop?category=necklaces", desc: "Pendants, chains & chokers" },
  { label: "Bracelets", href: "/shop?category=bracelets", desc: "Tennis, bangles & cuffs" },
  { label: "Earrings", href: "/shop?category=earrings", desc: "Studs, hoops & drops" },
  { label: "Watches", href: "/shop?category=watches", desc: "Luxury timepieces" },
  { label: "Gemstones", href: "/shop?category=gemstones", desc: "Rare & precious stones" },
];

export const navLinks = [
  { label: "Collections", href: "/collections", hasMenu: true },
  { label: "Shop", href: "/shop" },
  { label: "New Arrivals", href: "/shop?sort=newest" },
  { label: "Appointment", href: "/appointment" },
  { label: "Contact", href: "/contact" },
];

export const footerLinks = {
  Shop: [
    { label: "New Arrivals", href: "/shop?sort=newest" },
    { label: "Rings", href: "/shop?category=rings" },
    { label: "Necklaces", href: "/shop?category=necklaces" },
    { label: "Bracelets", href: "/shop?category=bracelets" },
    { label: "Earrings", href: "/shop?category=earrings" },
    { label: "Watches", href: "/shop?category=watches" },
  ],
  Collections: [
    { label: "Limited Edition", href: "/collections/limited-edition" },
    { label: "Signature Series", href: "/collections/signature" },
    { label: "Bridal", href: "/collections/bridal" },
    { label: "Gemstones", href: "/shop?category=gemstones" },
  ],
  Support: [
    { label: "Book Appointment", href: "/appointment" },
    { label: "Contact", href: "/contact" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Cart", href: "/cart" },
    { label: "Checkout", href: "/checkout" },
  ],
};

export const socialLinks = [
  { Icon: "Instagram", href: "#", label: "Instagram" },
  { Icon: "Twitter", href: "#", label: "Twitter" },
  { Icon: "Youtube", href: "#", label: "YouTube" },
  { Icon: "Mail", href: "#", label: "Email" },
];
