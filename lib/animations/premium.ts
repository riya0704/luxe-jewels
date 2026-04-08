/**
 * Premium Animation Utilities
 * GSAP-powered scroll triggers, timeline animations, and advanced effects
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

/**
 * Staggered text reveal animation - reveals text word by word
 * Used for hero headlines, section titles
 */
export const createTextReveal = (element: HTMLElement, options = {}) => {
  if (!element) return;

  const defaultOptions = {
    duration: 0.8,
    stagger: 0.05,
    ease: "power2.out",
    ...options,
  };

  const words = element.querySelectorAll("span");
  gsap.from(words, {
    opacity: 0,
    y: 20,
    duration: defaultOptions.duration,
    stagger: defaultOptions.stagger,
    ease: defaultOptions.ease,
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      once: true,
    },
  });
};

/**
 * Character-by-character reveal for luxury headings
 */
export const createCharacterReveal = (element: HTMLElement) => {
  if (!element) return;

  const text = element.textContent || "";
  element.innerHTML = text
    .split("")
    .map((char) => `<span style="opacity:0">${char}</span>`)
    .join("");

  gsap.to(element.querySelectorAll("span"), {
    opacity: 1,
    duration: 0.03,
    stagger: 0.02,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      once: true,
    },
  });
};

/**
 * Parallax scroll effect for images and backgrounds
 * Creates depth effect as user scrolls
 */
export const createParallax = (element: HTMLElement, speed = 0.5) => {
  if (!element) return;

  gsap.to(element, {
    y: () => window.innerHeight * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top center",
      end: "bottom center",
      scrub: 1,
      invalidateOnRefresh: true,
    },
  });
};

/**
 * Fade and slide up animation for section entries
 * Smooth entrance for main content sections
 */
export const createFadeSlideUp = (element: HTMLElement, delay = 0) => {
  if (!element) return;

  gsap.from(element, {
    opacity: 0,
    y: 60,
    duration: 1,
    delay,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start: "top 85%",
      once: true,
    },
  });
};

/**
 * Staggered items animation - reveals children sequentially
 */
export const createStaggerItems = (
  container: HTMLElement,
  itemSelector: string,
  delay = 0
) => {
  if (!container) return;

  const items = container.querySelectorAll(itemSelector);
  gsap.from(items, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.1,
    delay,
    ease: "power2.out",
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
      once: true,
    },
  });
};

/**
 * Shine sweep animation across elements
 * Creates luxury metallic shine effect
 */
export const createShineEffect = (element: HTMLElement) => {
  if (!element) return;

  const shine = document.createElement("div");
  shine.style.cssText = `
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    pointer-events: none;
  `;
  element.style.position = "relative";
  element.style.overflow = "hidden";
  element.appendChild(shine);

  gsap.to(shine, {
    left: "100%",
    duration: 0.6,
    ease: "power2.inOut",
    repeat: -1,
    repeatDelay: 2.5,
  });
};

/**
 * 3D tilt effect on hover - creates depth perception
 */
export const create3DTilt = (
  element: HTMLElement,
  maxRotation = 5,
  scale = 1.02
) => {
  if (!element) return;

  element.style.transformStyle = "preserve-3d";
  element.style.transition = "transform 0.3s ease-out";

  const handleMouseMove = (e: MouseEvent) => {
    if (!(e.target instanceof HTMLElement) || !element.contains(e.target)) return;

    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateX = ((e.clientY - centerY) / rect.height) * maxRotation;
    const rotateY = -((e.clientX - centerX) / rect.width) * maxRotation;

    gsap.to(element, {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      duration: 0.3,
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(element, {
      transform: "perspective(1000px) rotateX(0) rotateY(0) scale(1)",
      duration: 0.3,
    });
  };

  element.addEventListener("mousemove", handleMouseMove);
  element.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    element.removeEventListener("mousemove", handleMouseMove);
    element.removeEventListener("mouseleave", handleMouseLeave);
  };
};

/**
 * Magnetic button hover effect - button follows cursor
 */
export const createMagneticButton = (
  button: HTMLElement,
  strength = 0.3
) => {
  if (!button) return;

  let magneticX = 0;
  let magneticY = 0;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    magneticX = (e.clientX - centerX) * strength;
    magneticY = (e.clientY - centerY) * strength;

    gsap.to(button, {
      x: magneticX,
      y: magneticY,
      duration: 0.3,
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(button, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  button.addEventListener("mousemove", handleMouseMove);
  button.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    button.removeEventListener("mousemove", handleMouseMove);
    button.removeEventListener("mouseleave", handleMouseLeave);
  };
};

/**
 * Glow pulse animation - creates ambient glowing effect
 */
export const createGlowPulse = (element: HTMLElement, color = "rgba(201,168,76,0.5)") => {
  if (!element) return;

  gsap.fromTo(element,
    { boxShadow: `0 0 20px ${color}` },
    {
      boxShadow: `0 0 40px ${color}`,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    }
  );
};

/**
 * Scroll progress indicator - shows scroll position
 */
export const createScrollProgress = (progressBar: HTMLElement) => {
  if (!progressBar) return;

  gsap.to(progressBar, {
    scaleX: () => window.scrollY / (document.documentElement.scrollHeight - window.innerHeight),
    ease: "none",
    scrollTrigger: {
      onUpdate: (self) => {
        gsap.set(progressBar, {
          scaleX: self.getVelocity() / -300,
        });
      },
    },
  });
};

/**
 * Morphing blob animation - abstract flowing shapes
 */
export const createMorphingBlob = (element: HTMLElement) => {
  if (!element) return;

  const paths = [
    "M439.5,151c82.29,69.35,160.64,137.74,160.64,229,0,159.9-57.51,231.96-150.19,231.96C319.05,611.92,0,548.35,0,359.2,0,157.07,206.16,0,309.46,0,335.78,0,379.35,58.18,439.5,151Z",
    "M451,155.5c83,68,200,130,200,230,0,156-60,230-150,230C319,615.5,0,550,0,360,0,159,207,0,310,0,336,0,380,60,451,155.5Z",
    "M412,166c80,65,180,124,180,215,0,150-58,220-148,220C319,601,0,540,0,360,0,158,206,0,309,0,335,0,380,60,412,166Z",
  ];

  let currentPath = 0;

  const animateMorph = () => {
    const nextPath = (currentPath + 1) % paths.length;
    gsap.to(element, {
      attr: { d: paths[nextPath] },
      duration: 3,
      ease: "sine.inOut",
      onComplete: () => {
        currentPath = nextPath;
        animateMorph();
      },
    });
  };

  animateMorph();
};

/**
 * Animated dashed border tracing on cards
 */
export const createBorderTrace = (element: HTMLElement) => {
  if (!element) return;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.style.cssText = `
    position: absolute;
    top: -2px;
    left: -2px;
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    pointer-events: none;
  `;

  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", "2");
  rect.setAttribute("y", "2");
  rect.setAttribute("width", "calc(100% - 4px)");
  rect.setAttribute("height", "calc(100% - 4px)");
  rect.setAttribute("fill", "none");
  rect.setAttribute("stroke", "rgba(201,168,76,0.5)");
  rect.setAttribute("stroke-width", "2");
  rect.setAttribute("stroke-dasharray", "5,5");

  svg.appendChild(rect);
  element.style.position = "relative";
  element.appendChild(svg);

  gsap.to(rect, {
    strokeDashoffset: -100,
    duration: 1.5,
    repeat: -1,
    ease: "none",
  });
};

/**
 * Count up animation for statistics
 */
export const createCountUp = (element: HTMLElement, target: number, duration = 2) => {
  if (!element) return;

  gsap.to(element, {
    textContent: target,
    duration,
    ease: "power2.out",
    snap: { textContent: 1 },
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      once: true,
    },
  });
};

/**
 * Image distortion effect on hover using displacement
 */
export const createImageDistortion = (element: HTMLElement) => {
  if (!element) return;

  element.addEventListener("mouseenter", () => {
    gsap.to(element, {
      filter: "blur(0.5px) brightness(1.1)",
      duration: 0.3,
    });
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(element, {
      filter: "blur(0px) brightness(1)",
      duration: 0.3,
    });
  });
};

/**
 * Liquid button hover effect with wave animation
 */
export const createLiquidHover = (button: HTMLElement) => {
  if (!button) return;

  const originalBg = window.getComputedStyle(button).backgroundColor;

  button.addEventListener("mouseenter", () => {
    gsap.to(button, {
      background: "linear-gradient(135deg, rgba(201,168,76,0.8), rgba(201,168,76,1))",
      duration: 0.4,
      ease: "power2.out",
    });
  });

  button.addEventListener("mouseleave", () => {
    gsap.to(button, {
      background: originalBg,
      duration: 0.4,
      ease: "power2.out",
    });
  });
};

/**
 * Floating particles animation - creates ambient movement
 */
export const createFloatingParticles = (container: HTMLElement, count = 20) => {
  if (!container) return;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 4 + 2}px;
      height: ${Math.random() * 4 + 2}px;
      background: rgba(201,168,76,${Math.random() * 0.3 + 0.1});
      border-radius: 50%;
      pointer-events: none;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
    `;
    container.appendChild(particle);

    gsap.to(particle, {
      y: Math.random() * -100 - 50,
      x: Math.random() * 100 - 50,
      opacity: 0,
      duration: Math.random() * 3 + 2,
      repeat: -1,
      ease: "sine.inOut",
      delay: Math.random() * 2,
    });
  }
};

/**
 * Hero zoom out cinematic reveal
 */
export const createHeroReveal = (hero: HTMLElement) => {
  if (!hero) return;

  gsap.from(hero, {
    scale: 1.1,
    opacity: 0.8,
    duration: 1.5,
    ease: "power3.out",
  });
};

/**
 * Horizontal scroll carousel animation
 */
export const createScrollCarousel = (container: HTMLElement) => {
  if (!container) return;

  gsap.to(container, {
    x: () => -(container.scrollWidth - window.innerWidth),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top center",
      end: () => `+=${container.scrollWidth}`,
      scrub: 1,
      pin: true,
      invalidateOnRefresh: true,
    },
  });
};

/**
 * Page transition animation - smooth fade and slide between pages
 */
export const createPageTransition = (element: HTMLElement, direction = "up") => {
  if (!element) return;

  const yOffset = direction === "up" ? 30 : -30;
  gsap.from(element, {
    opacity: 0,
    y: yOffset,
    duration: 0.8,
    ease: "power3.out",
  });
};

/**
 * Word-by-word reveal with better performance using clip-path
 */
export const createWordByWordReveal = (element: HTMLElement, options = {}) => {
  if (!element) return;

  const defaultOptions = {
    duration: 1,
    stagger: 0.08,
    ease: "power2.out",
    ...options,
  };

  const words = element.innerText.split(" ");
  element.innerHTML = words
    .map((word) => `<span style="display:inline-block;margin-right:0.2em;overflow:hidden"><span style="display:inline-block">${word}</span></span>`)
    .join("");

  const spans = element.querySelectorAll("span span");
  gsap.from(spans, {
    opacity: 0,
    y: 20,
    duration: defaultOptions.duration,
    stagger: defaultOptions.stagger,
    ease: defaultOptions.ease,
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
      once: true,
    },
  });
};

/**
 * Image reveal with clip-path mask animation
 */
export const createImageMaskReveal = (
  element: HTMLElement,
  direction: "ltr" | "rtl" | "circle" | "diagonal" = "ltr"
) => {
  if (!element) return;

  const clipPaths = {
    ltr: ["polygon(0 0, 0% 0, 0% 100%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"],
    rtl: ["polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"],
    circle: ["circle(0% at 50% 50%)", "circle(100% at 50% 50%)"],
    diagonal: ["polygon(0 0, 0 0, 0 100%, 0 100%)", "polygon(0 0, 100% 0, 100% 100%, 0 100%)"],
  };

  element.style.clipPath = clipPaths[direction][0];

  gsap.to(element, {
    clipPath: clipPaths[direction][1],
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: element,
      start: "top 75%",
      once: true,
    },
  });
};

/**
 * Floating image animation - subtle hovering motion
 */
export const createFloatingImage = (element: HTMLElement, intensity = 1) => {
  if (!element) return;

  gsap.to(element, {
    y: -10 * intensity,
    duration: 3,
    ease: "sine.inOut",
    repeat: -1,
    yoyo: true,
  });
};

/**
 * Halo/glow effect around elements
 */
export const createHaloEffect = (element: HTMLElement, color = "rgba(201,168,76,0.4)") => {
  if (!element) return;

  gsap.fromTo(
    element,
    { boxShadow: `0 0 0px ${color}` },
    {
      boxShadow: `0 0 40px ${color}, 0 0 60px ${color}`,
      duration: 2,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    }
  );
};

/**
 * Smooth counter animation with scroll trigger
 */
export const createScrollCounter = (
  element: HTMLElement,
  target: number,
  duration = 2.5
) => {
  if (!element) return;

  gsap.to(
    { value: 0 },
    {
      value: target,
      duration,
      ease: "power2.out",
      snap: { value: 1 },
      onUpdate: function () {
        element.textContent = Math.floor(this.targets()[0].value).toLocaleString();
      },
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        once: true,
      },
    }
  );
};

/**
 * Magnetic card - card attracted to cursor
 */
export const createMagneticCard = (card: HTMLElement, strength = 0.4) => {
  if (!card) return;

  const container = card.parentElement;
  if (!container) return;

  let magneticX = 0;
  let magneticY = 0;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    magneticX = (e.clientX - centerX) * strength;
    magneticY = (e.clientY - centerY) * strength;

    gsap.to(card, {
      x: magneticX,
      y: magneticY,
      duration: 0.3,
      overwrite: "auto",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(card, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)",
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

/**
 * SVG line tracing animation
 */
export const createLineTracing = (svgElement: SVGElement, duration = 2) => {
  if (!svgElement) return;

  const paths = svgElement.querySelectorAll("path, line, rect");
  paths.forEach((path) => {
    if (path instanceof SVGElement) {
      const geometryPath =
        path instanceof SVGGeometryElement ? path : null;
      const length = geometryPath ? geometryPath.getTotalLength() : 0;

      if (length > 0) {
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;

        gsap.to(path, {
          strokeDashoffset: 0,
          duration,
          ease: "power2.out",
          scrollTrigger: {
            trigger: svgElement,
            start: "top 80%",
            once: true,
          },
        });
      }
    }
  });
};

/**
 * Staggered list reveal animation
 */
export const createStaggeredListReveal = (
  container: HTMLElement,
  itemSelector: string,
  options = {}
) => {
  if (!container) return;

  const defaultOptions = {
    duration: 0.7,
    stagger: 0.1,
    yOffset: 30,
    ease: "power2.out",
    ...options,
  };

  const items = container.querySelectorAll(itemSelector);
  gsap.from(items, {
    opacity: 0,
    y: defaultOptions.yOffset,
    duration: defaultOptions.duration,
    stagger: defaultOptions.stagger,
    ease: defaultOptions.ease,
    scrollTrigger: {
      trigger: container,
      start: "top 80%",
      once: true,
    },
  });
};

/**
 * Accordion smooth open/close animation
 */
export const createAccordionAnimation = (
  triggerElement: HTMLElement,
  contentElement: HTMLElement
) => {
  if (!triggerElement || !contentElement) return;

  let isOpen = false;

  triggerElement.addEventListener("click", () => {
    isOpen = !isOpen;

    if (isOpen) {
      gsap.to(contentElement, {
        height: "auto",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
        onStart: () => {
          contentElement.style.display = "block";
        },
      });
    } else {
      gsap.to(contentElement, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          contentElement.style.display = "none";
        },
      });
    }
  });
};

/**
 * Premium drawer/modal slide animation
 */
export const createDrawerAnimation = (
  element: HTMLElement,
  direction: "left" | "right" | "top" | "bottom" = "right",
  duration = 0.5
) => {
  if (!element) return;

  const positionMap = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    top: { x: 0, y: -100 },
    bottom: { x: 0, y: 100 },
  };

  const position = positionMap[direction];

  gsap.from(element, {
    x: position.x,
    y: position.y,
    opacity: 0,
    duration,
    ease: "power2.out",
  });
};

/**
 * Text morphing animation between states
 */
export const createTextMorph = (element: HTMLElement, textStates: string[]) => {
  if (!element || textStates.length < 2) return;

  let currentIndex = 0;
  const cycle = () => {
    const nextIndex = (currentIndex + 1) % textStates.length;

    gsap.timeline()
      .to(element, { opacity: 0, duration: 0.3, ease: "sine.out" })
      .add(() => {
        element.textContent = textStates[nextIndex];
      }, "-=0.15")
      .to(element, { opacity: 1, duration: 0.3, ease: "sine.in" })
      .add(() => {
        currentIndex = nextIndex;
        setTimeout(cycle, 3000);
      });
  };

  cycle();
};

/**
 * Hover distortion effect on large banners
 */
export const createHoverDistortion = (element: HTMLElement, intensity = 5) => {
  if (!element) return;

  element.addEventListener("mousemove", (e: MouseEvent) => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const distortionX = (x / rect.width - 0.5) * intensity;
    const distortionY = (y / rect.height - 0.5) * intensity;

    gsap.to(element, {
      filter: `distort(${distortionX}%) skewY(${distortionY}deg)`,
      duration: 0.3,
      overwrite: "auto",
    });
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(element, {
      filter: "distort(0%) skewY(0deg)",
      duration: 0.5,
    });
  });
};

/**
 * Enhanced floating particles with better performance
 */
export const createOptimizedFloatingParticles = (
  container: HTMLElement,
  count = 15,
  colors = ["rgba(201,168,76,0.3)", "rgba(201,168,76,0.2)"]
) => {
  if (!container) return;

  // Use requestAnimationFrame for batch creation
  requestAnimationFrame(() => {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement("div");
      const size = Math.random() * 3 + 1;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `;
      container.appendChild(particle);

      gsap.to(particle, {
        y: Math.random() * -150 - 100,
        x: Math.random() * 100 - 50,
        opacity: 0,
        duration: Math.random() * 3 + 2,
        repeat: -1,
        ease: "sine.inOut",
        delay: Math.random() * 2,
      });
    }
  });
};

/**
 * Animated mesh background (very subtle)
 */
export const createMeshBackground = (container: HTMLElement) => {
  if (!container) return;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("style", `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0.02;
    pointer-events: none;
  `);

  const lines = 5;
  const spacing = 100 / (lines - 1);

  for (let i = 0; i < lines; i++) {
    for (let j = 0; j < lines; j++) {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", String((i * spacing) + "%"));
      rect.setAttribute("y", String((j * spacing) + "%"));
      rect.setAttribute("width", "2");
      rect.setAttribute("height", "2");
      rect.setAttribute("fill", "rgba(201,168,76,0.5)");
      svg.appendChild(rect);
    }
  }

  container.appendChild(svg);
};

/**
 * Scroll reveal with blur effect
 */
export const createBlurReveal = (element: HTMLElement) => {
  if (!element) return;

  element.style.filter = "blur(10px)";
  element.style.opacity = "0";

  gsap.to(element, {
    filter: "blur(0px)",
    opacity: 1,
    duration: 1,
    ease: "power2.out",
    scrollTrigger: {
      trigger: element,
      start: "top 75%",
      once: true,
    },
  });
};

/**
 * Confetti/celebration animation
 */
export const createConfetti = (container: HTMLElement, count = 30) => {
  if (!container) return;

  const colors = ["#c9a84c", "#e2c97e", "#a07830"];

  for (let i = 0; i < count; i++) {
    const confetti = document.createElement("div");
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 8 + 4;
    const delay = Math.random() * 0.2;

    confetti.style.cssText = `
      position: fixed;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      pointer-events: none;
      left: ${Math.random() * 100}%;
      top: -10px;
      border-radius: 50%;
      z-index: 9000;
    `;
    container.appendChild(confetti);

    gsap.to(confetti, {
      y: window.innerHeight + 20,
      x: Math.random() * 200 - 100,
      opacity: 0,
      duration: Math.random() * 2 + 2,
      delay,
      ease: "power1.in",
      onComplete: () => {
        confetti.remove();
      },
    });

    gsap.to(confetti, {
      rotation: Math.random() * 360,
      duration: Math.random() * 2 + 2,
      ease: "power0.inOut",
    });
  }
};
