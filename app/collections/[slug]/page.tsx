import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { collections, products } from "@/lib/data/products";

type CollectionView = {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  productCount: number;
  isNew?: boolean;
};

const extraCollections: Record<string, CollectionView> = {
  signature: {
    id: "signature",
    name: "Signature Series",
    tagline: "Icons of the House",
    description:
      "Our most definitive pieces, selected for timeless proportion and exceptional finishing.",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1400&h=900&fit=crop&auto=format&q=95",
    productCount: 6,
  },
  bridal: {
    id: "bridal",
    name: "Bridal",
    tagline: "For the Promise of Forever",
    description:
      "Engagement and wedding pieces designed to mark your most meaningful milestone.",
    image:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=1400&h=900&fit=crop&auto=format&q=95",
    productCount: 8,
  },
};

function toSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

function getCollectionProducts(slug: string) {
  return products.filter((product) => {
    if (toSlug(product.collection) === slug) return true;
    if (slug === "signature") return Boolean(product.isFeatured);
    if (slug === "bridal") return product.category === "rings";
    return false;
  });
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = collections.find((item) => item.id === slug) ?? extraCollections[slug];

  if (!collection) {
    notFound();
  }

  const collectionProducts = getCollectionProducts(slug);

  return (
    <div className="min-h-screen bg-obsidian pt-20">
      <section className="relative h-[48vh] min-h-[360px] overflow-hidden border-b border-gold/10">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-obsidian/30 to-obsidian" />

        <div className="relative z-10 max-w-[1440px] mx-auto h-full px-6 lg:px-12 flex flex-col justify-end pb-12">
          <p className="font-sans text-[10px] tracking-[0.45em] uppercase text-gold/70 mb-3">
            Curated Collection
          </p>
          <h1 className="font-serif text-display-md text-ivory mb-3">{collection.name}</h1>
          <p className="font-sans text-lg text-ivory/60 max-w-2xl">{collection.description}</p>
        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="flex items-center justify-between mb-10 gap-6 flex-wrap">
          <div>
            <p className="font-serif text-2xl text-ivory">{collection.tagline}</p>
            <p className="font-sans text-sm text-ivory/50 mt-2">
              {collectionProducts.length} pieces available
            </p>
          </div>
          <Link
            href="/shop"
            className="px-6 py-3 rounded-full border border-gold/30 font-sans text-xs tracking-[0.2em] uppercase text-gold hover:bg-gold/10 transition-colors"
          >
            View All Shop
          </Link>
        </div>

        {collectionProducts.length === 0 ? (
          <div className="glass border border-gold/10 rounded-2xl p-12 text-center">
            <h2 className="font-serif text-3xl text-ivory mb-3">Pieces are arriving soon</h2>
            <p className="font-sans text-sm text-ivory/50 mb-8">
              This collection is being prepared by our atelier. Book a private consultation to preview upcoming pieces.
            </p>
            <Link
              href="/appointment"
              className="inline-flex px-6 py-3 rounded-full bg-gold-gradient font-sans text-xs tracking-[0.2em] uppercase text-obsidian font-semibold hover:opacity-90 transition-opacity"
            >
              Book Appointment
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {collectionProducts.map((product) => (
              <Link key={product.id} href={`/product/${product.id}`} className="group block">
                <article className="glass border border-gold/10 rounded-2xl overflow-hidden h-full hover:border-gold/30 transition-all">
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 to-transparent" />
                  </div>
                  <div className="p-5">
                    <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-gold/60 mb-2">
                      {product.material}
                    </p>
                    <h3 className="font-serif text-xl text-ivory mb-2 group-hover:text-gold transition-colors">
                      {product.name}
                    </h3>
                    <p className="font-sans text-xs text-ivory/50 mb-4 line-clamp-2">{product.description}</p>
                    <p className="font-serif text-xl text-gold">${product.price.toLocaleString()}</p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}