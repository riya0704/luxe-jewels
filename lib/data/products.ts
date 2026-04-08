export type Product = {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  material: string;
  gemstone?: string;
  collection: string;
  images: string[];
  badge?: "New" | "Limited" | "Bestseller" | "Sale";
  rating: number;
  reviews: number;
  description: string;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
};

// Luxury jewellery product images from Unsplash and quality sources
const img = (type: string, id: number) => {
  const jewelleryImages: Record<string, string[]> = {
    ring: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=700&fit=crop&auto=format&q=95", // Premium diamond ring
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=700&fit=crop&auto=format&q=95", // Elegant gold ring
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=700&fit=crop&auto=format&q=95", // Vintage engagement ring
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&h=700&fit=crop&auto=format&q=95", // Luxury solitaire ring
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=700&fit=crop&auto=format&q=95", // Modern wedding ring
    ],
    necklace: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=700&fit=crop&auto=format&q=95", // Diamond pendant necklace
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&h=700&fit=crop&auto=format&q=95", // Gold chain necklace
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=700&fit=crop&auto=format&q=95", // Luxury pendant
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=700&fit=crop&auto=format&q=95", // Elegant necklace
    ],
    bracelet: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=700&fit=crop&auto=format&q=95", // Diamond tennis bracelet
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=600&h=700&fit=crop&auto=format&q=95", // Gold bangle bracelet
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=700&fit=crop&auto=format&q=95", // Luxury bracelet
    ],
    earring: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=700&fit=crop&auto=format&q=95", // Diamond stud earrings
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=700&fit=crop&auto=format&q=95", // Gold hoop earrings
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=600&h=700&fit=crop&auto=format&q=95", // Luxury drop earrings
    ],
    watch: [
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=700&fit=crop&auto=format&q=95", // Luxury wristwatch
      "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&h=700&fit=crop&auto=format&q=95", // Gold watch
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=700&fit=crop&auto=format&q=95", // Designer timepiece
    ],
    default: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=700&fit=crop&auto=format&q=95",
    ],
  };

  const images = jewelleryImages[type] || jewelleryImages.default;
  return images[id % images.length];
};

export const products: Product[] = [
  {
    id: "p001",
    name: "Celestial Solitaire Ring",
    price: 4850,
    category: "rings",
    material: "18k White Gold",
    gemstone: "Diamond",
    collection: "Celestial",
    images: [img("ring", 0), img("ring", 1), img("ring", 2)],
    badge: "Bestseller",
    rating: 4.9,
    reviews: 128,
    description: "A breathtaking 2.1ct round brilliant diamond set in hand-polished 18k white gold. The six-prong cathedral setting elevates the stone to catch light from every angle.",
    inStock: true,
    isFeatured: true,
  },
  {
    id: "p002",
    name: "Noir Emerald Pendant",
    price: 3200,
    category: "necklaces",
    material: "18k Yellow Gold",
    gemstone: "Emerald",
    collection: "Noir",
    images: [img("necklace", 0), img("necklace", 1)],
    badge: "New",
    rating: 4.8,
    reviews: 64,
    description: "A 1.8ct Colombian emerald suspended in a hand-forged 18k yellow gold bezel. The deep green stone is framed by a delicate halo of pavé diamonds.",
    inStock: true,
    isNew: true,
    isFeatured: true,
  },
  {
    id: "p003",
    name: "Serpentine Bracelet",
    price: 2750,
    category: "bracelets",
    material: "18k Rose Gold",
    gemstone: "Ruby",
    collection: "Serpentine",
    images: [img("bracelet", 0), img("bracelet", 1)],
    badge: "Limited",
    rating: 4.7,
    reviews: 42,
    description: "Inspired by ancient serpent motifs, this articulated bracelet winds around the wrist in 18k rose gold, set with 0.8ct of Burmese rubies.",
    inStock: true,
    isFeatured: true,
  },
  {
    id: "p004",
    name: "Aurora Drop Earrings",
    price: 1890,
    category: "earrings",
    material: "18k White Gold",
    gemstone: "Sapphire",
    collection: "Aurora",
    images: [img("earring", 0), img("earring", 1)],
    badge: "New",
    rating: 4.9,
    reviews: 87,
    description: "Cascading blue sapphires in graduated sizes, set in 18k white gold. Each earring moves with the wearer, catching light like the northern lights.",
    inStock: true,
    isNew: true,
  },
  {
    id: "p005",
    name: "Obsidian Tourbillon Watch",
    price: 28500,
    category: "watches",
    material: "Titanium & 18k Gold",
    collection: "Obsidian",
    images: [img("watch", 0), img("watch", 1)],
    badge: "Limited",
    rating: 5.0,
    reviews: 18,
    description: "A masterpiece of horological art. The flying tourbillon movement is visible through the sapphire crystal case back. Limited to 50 pieces worldwide.",
    inStock: true,
    isFeatured: true,
  },
  {
    id: "p006",
    name: "Midnight Eternity Band",
    price: 3600,
    category: "rings",
    material: "Platinum",
    gemstone: "Diamond",
    collection: "Midnight",
    images: [img("ring", 3), img("ring", 4)],
    rating: 4.8,
    reviews: 95,
    description: "A full eternity band set with 3.2ct of F/VS1 round brilliant diamonds in a shared-prong platinum setting. The ultimate symbol of endless love.",
    inStock: true,
    isFeatured: true,
  },
  {
    id: "p007",
    name: "Velvet Choker",
    price: 1450,
    category: "necklaces",
    material: "18k Yellow Gold",
    gemstone: "Pearl",
    collection: "Velvet",
    images: [img("necklace", 2), img("necklace", 3)],
    badge: "Bestseller",
    rating: 4.6,
    reviews: 156,
    description: "South Sea pearls graduated from 8mm to 12mm, hand-knotted on silk thread with an 18k gold clasp set with a single brilliant-cut diamond.",
    inStock: true,
  },
  {
    id: "p008",
    name: "Phantom Cuff",
    price: 5200,
    category: "bracelets",
    material: "18k Black Gold",
    gemstone: "Black Diamond",
    collection: "Phantom",
    images: [img("bracelet", 2), img("bracelet", 0)],
    badge: "Limited",
    rating: 4.9,
    reviews: 31,
    description: "A bold architectural cuff in 18k black gold, pavé-set with 4.5ct of black diamonds. The asymmetric form is inspired by modernist sculpture.",
    inStock: true,
    isFeatured: true,
  },
];

export const collections = [
  {
    id: "celestial",
    name: "Celestial",
    tagline: "Born from starlight",
    description: "Inspired by the cosmos — each piece captures the luminosity of distant stars.",
    image: img("ring", 0),
    productCount: 12,
    isNew: false,
  },
  {
    id: "noir",
    name: "Noir",
    tagline: "Dark elegance",
    description: "A study in contrast — deep stones against luminous metals.",
    image: img("necklace", 0),
    productCount: 8,
    isNew: true,
  },
  {
    id: "serpentine",
    name: "Serpentine",
    tagline: "Ancient power, modern form",
    description: "Sinuous forms inspired by ancient serpent mythology.",
    image: img("bracelet", 0),
    productCount: 6,
    isNew: false,
  },
  {
    id: "limited-edition",
    name: "Limited Edition",
    tagline: "Rare. Numbered. Yours.",
    description: "Each piece is numbered and comes with a certificate of authenticity.",
    image: img("ring", 1),
    productCount: 5,
    isNew: true,
  },
];

export const testimonials = [
  {
    id: 1,
    name: "Isabelle M.",
    location: "Paris",
    text: "The Celestial ring is beyond anything I've ever worn. The craftsmanship is extraordinary — it feels like wearing a piece of art.",
    rating: 5,
    product: "Celestial Solitaire Ring",
  },
  {
    id: 2,
    name: "Priya S.",
    location: "Mumbai",
    text: "I ordered the Aurora earrings for my anniversary and they arrived in the most beautiful packaging. My wife was speechless.",
    rating: 5,
    product: "Aurora Drop Earrings",
  },
  {
    id: 3,
    name: "Charlotte W.",
    location: "London",
    text: "LUXE is the only jewellery brand I trust for truly special occasions. The quality is unmatched and the service is impeccable.",
    rating: 5,
    product: "Midnight Eternity Band",
  },
];
