/**
 * UI Constants - Centralized design system values
 * Prevents magic numbers throughout the codebase
 */

// Animation Timing (milliseconds)
export const ANIMATION_TIMING = {
  // Standard transitions
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,

  // Scroll reveal animations
  SCROLL_REVEAL: 800,
  STAGGER_CHILDREN: 120,

  // Page transitions
  PAGE_TRANSITION: 400,
  MODAL_TRANSITION: 300,

  // Interactive elements
  HOVER_GLOW: 700,
  BUTTON_RIPPLE: 600,
} as const;

// Easing Functions (cubic-bezier values as strings for Framer Motion)
export const EASING = {
  // Luxury smooth easing
  LUXURY: "easeInOut",
  SMOOTH: "easeOut",
  ENTRANCE: "easeOut",
  EXIT: "easeIn",

  // Spring physics
  SPRING_SMOOTH: [0.34, 1.56, 0.64, 1],
  SPRING_BOUNCE: [0.68, -0.55, 0.265, 1.55],
} as const;

// Opacity Scale - Consistent transparency levels
export const OPACITY = {
  INVISIBLE: 0,
  SUBTLE: 0.05,
  LIGHT: 0.1,
  MEDIUM_LIGHT: 0.2,
  MEDIUM: 0.3,
  MEDIUM_STRONG: 0.4,
  STRONG: 0.5,
  VERY_STRONG: 0.6,
  HEAVY: 0.7,
  NEAR_OPAQUE: 0.8,
  ALMOST_OPAQUE: 0.9,
  FULL: 1,
} as const;

// Spacing Scale (Tailwind-based but centralized)
export const SPACING = {
  XS: "0.5rem",    // 8px
  SM: "1rem",      // 16px
  MD: "1.5rem",    // 24px
  LG: "2rem",      // 32px
  XL: "3rem",      // 48px
  "2XL": "4rem",   // 64px
  "3XL": "6rem",   // 96px
} as const;

// Scroll Trigger Thresholds
export const SCROLL_VIEWPORT = {
  // Amount of element visible before triggering animation
  THRESHOLD_SMALL: 0.1,
  THRESHOLD_MEDIUM: 0.2,
  THRESHOLD_LARGE: 0.4,

  // Viewport offset for lazy loading
  OFFSET_EARLY: "100px",
  OFFSET_NORMAL: "50px",
  OFFSET_LATE: "0px",
} as const;

// Parallax Settings
export const PARALLAX = {
  // Intensity multipliers for different effects
  SUBTLE: "5%",
  NORMAL: "10%",
  STRONG: "15%",
  INTENSE: "30%",

  // Rotation intensity
  TILT_SUBTLE: 2,
  TILT_NORMAL: 5,
  TILT_STRONG: 10,
} as const;

// Blur Effects
export const BLUR = {
  LIGHT: "4px",
  NORMAL: "8px",
  MEDIUM: "12px",
  STRONG: "24px",
  HEAVY: "40px",
  EXTREME: "80px",
} as const;

// Breakpoints (must match Tailwind config)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

// Z-Index Scale - Consistent layering
export const Z_INDEX = {
  BACKGROUND: 0,
  CONTENT: 10,
  STICKY: 20,
  DROPDOWN: 30,
  FIXED_NAV: 40,
  MODAL_BACKDROP: 50,
  MODAL: 51,
  NOTIFICATION: 60,
  TOOLTIP: 70,
  CUSTOM_CURSOR: 9999,
} as const;

// Transition Duration Presets
export const TRANSITIONS = {
  SHORT: `all ${ANIMATION_TIMING.FAST}ms ${EASING.SMOOTH}`,
  NORMAL: `all ${ANIMATION_TIMING.NORMAL}ms ${EASING.SMOOTH}`,
  LONG: `all ${ANIMATION_TIMING.SLOW}ms ${EASING.SMOOTH}`,
  TRANSFORM: `transform ${ANIMATION_TIMING.NORMAL}ms ${EASING.SMOOTH}`,
  COLORS: `color ${ANIMATION_TIMING.NORMAL}ms ${EASING.SMOOTH}`,
  OPACITY: `opacity ${ANIMATION_TIMING.NORMAL}ms ${EASING.SMOOTH}`,
  SHADOW: `box-shadow ${ANIMATION_TIMING.SLOW}ms ${EASING.SMOOTH}`,
} as const;

// Product Grid Settings
export const GRID = {
  // Product card columns
  COLS_MOBILE: 1,
  COLS_TABLET: 2,
  COLS_DESKTOP: 4,

  // Grid gaps (in Tailwind units)
  GAP_MOBILE: "1rem",
  GAP_TABLET: "1.5rem",
  GAP_DESKTOP: "1.5rem",
} as const;

// Image Loading
export const IMAGE = {
  // Aspect ratios
  PRODUCT_RATIO: 3 / 4,
  COLLECTION_RATIO: 1,
  BANNER_RATIO: 16 / 9,
  SQUARE_RATIO: 1,

  // Blur placeholder intensity
  BLUR_AMOUNT: 20,
} as const;

// Form Settings
export const FORM = {
  // Input field transition
  FOCUS_TRANSITION: ANIMATION_TIMING.NORMAL,

  // Validation feedback delay
  VALIDATION_DELAY: 300,

  // Error message fade
  ERROR_FADE: ANIMATION_TIMING.NORMAL,
} as const;

// Notification/Toast Settings
export const TOAST = {
  // Duration notifications stay visible (ms)
  DURATION_SHORT: 2000,
  DURATION_NORMAL: 3000,
  DURATION_LONG: 5000,

  // Entry/exit animations
  ANIMATION_DURATION: ANIMATION_TIMING.NORMAL,
} as const;

// Hover Effect Scales
export const HOVER = {
  // Scale multipliers
  SCALE_SUBTLE: 1.02,
  SCALE_NORMAL: 1.05,
  SCALE_INTERACTIVE: 1.08,

  // Brightness multipliers
  BRIGHTNESS_HOVER: 1.1,
  BRIGHTNESS_ACTIVE: 1.15,
} as const;

// Custom Cursor Settings
export const CURSOR = {
  // Base cursor size (px)
  SIZE_DEFAULT: 24,
  SIZE_HOVER: 36,
  SIZE_ACTIVE: 40,

  // Transition to expanded state
  EXPAND_DURATION: ANIMATION_TIMING.FAST,
} as const;
