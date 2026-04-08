"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Ultra-premium luxury custom cursor with spring physics,
 * magnetic attraction, glow effects, particle trails, and contextual labels.
 * Creates a cinematic, handcrafted interaction experience.
 */
export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");
  const [isMagnetic, setIsMagnetic] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<{ x: number; y: number } | null>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const lastMouseX = useRef(0);
  const lastMouseY = useRef(0);

  // Spring config for ultra-smooth, premium movement
  const springConfig = { damping: 20, stiffness: 400, mass: 0.3 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Trailing particles - slower movement for depth
  const trailConfig = { damping: 60, stiffness: 150, mass: 1 };
  const trailX = useSpring(mouseX, trailConfig);
  const trailY = useSpring(mouseY, trailConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Create particle trail on movement
      if (Math.random() > 0.8) {
        const newParticle = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
        };
        setParticles((prev) => [...prev.slice(-8), newParticle]);
      }

      // Magnetic attraction to buttons
      if (isMagnetic && magneticTarget) {
        const dx = magneticTarget.x - e.clientX;
        const dy = magneticTarget.y - e.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 100) {
          setIsMagnetic(false);
          setMagneticTarget(null);
        }
      }

      if (!isVisible) setIsVisible(true);
      lastMouseX.current = e.clientX;
      lastMouseY.current = e.clientY;
    };

    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => {
      setIsVisible(false);
      setCursorLabel("");
      setParticles([]);
    };
    const handleDown = () => setIsClicking(true);
    const handleUp = () => setIsClicking(false);

    // Detect hoverable elements and add context labels
    const addHoverListeners = () => {
      // Links and buttons
      document.querySelectorAll("a, button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setIsHovering(true);
          const text = (el as HTMLElement).getAttribute("data-cursor") || "Click";
          setCursorLabel(text);
        });
        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorLabel("");
        });
      });

      // Product cards - 3D tilt effect
      document.querySelectorAll(".product-card").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setIsHovering(true);
          setCursorLabel("View");
        });
        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorLabel("");
        });
      });

      // Images - zoom label
      document.querySelectorAll("img[data-cursor-zoom]").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setIsHovering(true);
          setCursorLabel("Zoom");
        });
        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorLabel("");
        });
      });

      // Draggable elements
      document.querySelectorAll("[data-cursor-drag]").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setIsHovering(true);
          setCursorLabel("Drag");
        });
        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorLabel("");
        });
      });

      // Form inputs
      document.querySelectorAll("input, textarea").forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setIsHovering(true);
          setCursorLabel("Type");
        });
        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setCursorLabel("");
        });
      });
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);
    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);

    addHoverListeners();

    // Re-attach on DOM changes
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      observer.disconnect();
    };
  }, [mouseX, mouseY, isVisible, isMagnetic, magneticTarget]);

  return (
    <>
      {/* Particle trail */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="fixed pointer-events-none z-[99998] w-2 h-2 rounded-full"
          initial={{ x: particle.x, y: particle.y, opacity: 0.6, scale: 1 }}
          animate={{ x: particle.x - 8, y: particle.y - 8, opacity: 0, scale: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.8) 0%, transparent 70%)",
            filter: "blur(1px)",
          }}
        />
      ))}

      {/* Main cursor ring - premium glow effect */}
      <motion.div
        className="cursor-dot fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 0.6 : isHovering ? 2 : 1,
          width: isHovering ? 52 : 32,
          height: isHovering ? 52 : 32,
        }}
        transition={{ type: "spring", damping: 20, stiffness: 400, mass: 0.3 }}
      >
        <div
          className="w-full h-full rounded-full border-2 border-gold/70"
          style={{
            boxShadow: isHovering
              ? "0 0 30px rgba(201,168,76,0.7), 0 0 60px rgba(201,168,76,0.4), inset 0 0 20px rgba(201,168,76,0.15)"
              : "0 0 15px rgba(201,168,76,0.5), inset 0 0 10px rgba(201,168,76,0.15)",
            background: isHovering
              ? "radial-gradient(circle, rgba(201,168,76,0.15) 0%, rgba(201,168,76,0.05) 100%)"
              : "radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 100%)",
            backdropFilter: "blur(6px)",
            transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />
      </motion.div>

      {/* Inner glowing dot with enhanced glow */}
      <motion.div
        className="cursor-dot fixed top-0 left-0 pointer-events-none z-[99999]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isClicking ? 2 : isHovering ? 1.3 : 1,
          width: isHovering ? 10 : 6,
          height: isHovering ? 10 : 6,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 350 }}
      >
        <div
          className="w-full h-full rounded-full bg-gold"
          style={{
            boxShadow: isHovering
              ? "0 0 20px rgba(201,168,76,1), 0 0 40px rgba(201,168,76,0.7), 0 0 60px rgba(201,168,76,0.4)"
              : "0 0 10px rgba(201,168,76,0.9), 0 0 20px rgba(201,168,76,0.5)",
          }}
        />
      </motion.div>

      {/* Cursor label - contextual text */}
      {cursorLabel && isVisible && (
        <motion.div
          className="cursor-label fixed pointer-events-none z-[99999]"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "35px",
          }}
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 35 }}
          exit={{ opacity: 0, scale: 0.7, y: 30 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="font-sans text-[11px] tracking-[0.25em] uppercase text-gold/90 whitespace-nowrap px-4 py-1.5 rounded-full font-semibold"
            style={{
              background: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(12px)",
              border: "1.5px solid rgba(201,168,76,0.4)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
            }}
          >
            {cursorLabel}
          </div>
        </motion.div>
      )}

      {/* Enhanced trailing blur effect - creates premium glow trail */}
      <motion.div
        className="cursor-blur fixed top-0 left-0 pointer-events-none z-[99998]"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: 80,
          height: 80,
          opacity: isVisible ? (isHovering ? 0.25 : 0.12) : 0,
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(201,168,76,0.9) 0%, transparent 70%)",
            filter: "blur(40px)",
            pointerEvents: "none",
          }}
        />
      </motion.div>

      {/* Secondary blur layer for extra cinema feel */}
      {isHovering && (
        <motion.div
          className="cursor-blur-secondary fixed top-0 left-0 pointer-events-none z-[99997]"
          style={{
            x: cursorX,
            y: cursorY,
            translateX: "-50%",
            translateY: "-50%",
            width: 120,
            height: 120,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.08 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(201,168,76,0.5) 0%, transparent 80%)",
              filter: "blur(60px)",
            }}
          />
        </motion.div>
      )}
    </>
  );
}
