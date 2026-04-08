"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface NewsletterFormProps {
  /** Optional className for the form container */
  className?: string;
  /** Optional text for the submit button (default: "Join") */
  submitButtonText?: string;
  /** Optional variant: "default", "compact", or "inline" */
  variant?: "default" | "compact" | "inline";
  /** Placeholder text for email input */
  placeholder?: string;
  /** Whether to show success message */
  showSuccessMessage?: boolean;
}

/**
 * Reusable newsletter signup form component
 * Used across Navbar, Footer, and Newsletter sections
 * Handles email validation, loading states, and success feedback
 */
export function NewsletterForm({
  className = "",
  submitButtonText = "Join",
  variant = "default",
  placeholder = "Your email address",
  showSuccessMessage = true,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setLoading(true);
    try {
      // Simulate API call - in production, replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setLoading(false);
      setEmail("");
      setSubmitted(true);
      if (showSuccessMessage) {
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (err) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
    }
  };

  // Variant-specific styling
  const getVariantStyles = () => {
    switch (variant) {
      case "compact":
        return {
          input: "py-2 text-sm px-4",
          button: "px-4 py-2 text-[10px]",
          form: "flex-row gap-2",
        };
      case "inline":
        return {
          input: "py-2 text-sm px-3",
          button: "px-4 py-2 text-[9px]",
          form: "flex-row gap-2",
        };
      default:
        return {
          input: "py-3 px-5",
          button: "px-6 py-3 text-xs",
          form: "flex-col sm:flex-row gap-3",
        };
    }
  };

  const variantStyles = getVariantStyles();

  if (submitted && showSuccessMessage) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`glass border-gold-glow rounded-2xl px-6 py-4 ${
          variant === "compact" ? "max-w-xs" : "max-w-md mx-auto"
        }`}
      >
        <p className="font-serif text-lg text-gold-light mb-1">Welcome to the Circle</p>
        <p className="font-sans text-sm text-ivory/50">
          You'll be the first to know about our next collection.
        </p>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex ${variantStyles.form} max-w-md ${className}`}
    >
      <div className="flex-1 flex flex-col gap-1">
        <label htmlFor="newsletter-email-input" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          className={`flex-1 bg-charcoal-light border border-gold/20 rounded-full font-sans text-ivory placeholder:text-ivory/30 outline-none focus:border-gold/50 transition-colors duration-300 disabled:opacity-60 ${variantStyles.input}`}
          aria-label="Email address"
        />
        {error && (
          <p className="font-sans text-[10px] text-ruby-bright mt-1">{error}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`rounded-full bg-gold-gradient font-sans tracking-[0.15em] uppercase text-obsidian font-semibold hover:opacity-90 transition-opacity duration-300 disabled:opacity-60 whitespace-nowrap ${variantStyles.button}`}
        aria-label="Subscribe to newsletter"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <motion.span
              className="w-2 h-2 rounded-full border border-obsidian/40 border-t-obsidian"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />
            <span className="text-[10px]">Joining...</span>
          </span>
        ) : (
          submitButtonText
        )}
      </button>
    </form>
  );
}
