"use client";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  return (
    <html lang="en">
      <body className="bg-obsidian text-ivory antialiased min-h-screen flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <p className="font-sans text-[10px] tracking-[0.5em] uppercase text-gold/70 mb-3">
            Critical Error
          </p>
          <h1 className="font-serif text-5xl text-ivory mb-4">Application Error</h1>
          <p className="font-sans text-base text-ivory/55 mb-8">
            A critical error occurred while loading the application.
          </p>
          {error.digest ? (
            <p className="font-sans text-xs text-ivory/30 mb-6">Error ID: {error.digest}</p>
          ) : null}
          <button
            onClick={() => window.location.assign("/")}
            className="px-8 py-4 rounded-full bg-gold-gradient font-sans text-xs tracking-[0.2em] uppercase text-obsidian font-semibold hover:opacity-90 transition-opacity"
          >
            Reload Home
          </button>
        </div>
      </body>
    </html>
  );
}
