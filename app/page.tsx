import dynamic from "next/dynamic";
import { Suspense } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { SectionDivider } from "@/components/home/SectionDivider";

const FeaturedCollections = dynamic(() => import("@/components/home/FeaturedCollections").then((m) => m.FeaturedCollections));
const NewArrivals = dynamic(() => import("@/components/home/NewArrivals").then((m) => m.NewArrivals));
const LimitedEditionBanner = dynamic(() => import("@/components/home/LimitedEditionBanner").then((m) => m.LimitedEditionBanner));
const BestSellers = dynamic(() => import("@/components/home/BestSellers").then((m) => m.BestSellers));
const GemstoneShowcase = dynamic(() => import("@/components/home/GemstoneShowcase").then((m) => m.GemstoneShowcase));
const CraftsmanshipSection = dynamic(() => import("@/components/home/CraftsmanshipSection").then((m) => m.CraftsmanshipSection));
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection").then((m) => m.TestimonialsSection));
const InstagramGallery = dynamic(() => import("@/components/home/InstagramGallery").then((m) => m.InstagramGallery));
const LuxuryStrip = dynamic(() => import("@/components/home/LuxuryStrip").then((m) => m.LuxuryStrip));
const NewsletterSection = dynamic(() => import("@/components/home/NewsletterSection").then((m) => m.NewsletterSection));

function SectionSkeleton() {
  return <div className="h-40 w-full animate-pulse bg-gradient-to-b from-charcoal/20 to-transparent" />;
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SectionDivider label="Curated Signature" />

      <Suspense fallback={<SectionSkeleton />}>
        <FeaturedCollections />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <LuxuryStrip />
      </Suspense>

      <SectionDivider label="New Season Pieces" />

      <Suspense fallback={<SectionSkeleton />}>
        <NewArrivals />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <LimitedEditionBanner />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <BestSellers />
      </Suspense>

      <SectionDivider label="Rare Stones" />

      <Suspense fallback={<SectionSkeleton />}>
        <GemstoneShowcase />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <CraftsmanshipSection />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <InstagramGallery />
      </Suspense>

      <Suspense fallback={<SectionSkeleton />}>
        <TestimonialsSection />
      </Suspense>

      <SectionDivider label="Private Access" />

      <Suspense fallback={<SectionSkeleton />}>
        <NewsletterSection />
      </Suspense>
    </>
  );
}
