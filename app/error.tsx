"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-obsidian pt-20 flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-3">
          Something went wrong
        </p>
        <h1 className="font-serif text-5xl text-ivory mb-4">Unexpected Error</h1>
        <p className="font-sans text-base text-ivory/55 mb-8">
          We could not load this page. Please try again or return to the home page.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={reset}
            className="px-8 py-4 rounded-full bg-gold-gradient font-sans text-xs tracking-[0.2em] uppercase text-obsidian font-semibold hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="px-8 py-4 rounded-full border border-gold/30 font-sans text-xs tracking-[0.2em] uppercase text-gold hover:bg-gold/10 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
