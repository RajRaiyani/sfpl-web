"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorImgRef = useRef<HTMLImageElement>(null);
  const splashContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorImg = cursorImgRef.current;

    if (!cursor || !cursorImg) return;

    // Set initial position and use GSAP's transform properties
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: 0,
      x: 0,
      y: 0,
    });

    // Use quickTo for optimized cursor movement
    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.1,
      ease: "power1.out",
    });
    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.1,
      ease: "power1.out",
    });

    const interactiveElements = document.querySelectorAll(
      "a, button, input, textarea, select, [role='button']"
    );

    const handleMouseEnter = () => {
      gsap.to([cursor], {
        scale: 1.5,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor], {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    const updateCursor = (e: MouseEvent) => {
      // Smooth cursor movement with quickTo
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", updateCursor);

    // Hide cursor when mouse leaves window
    const handleMouseLeaveWindow = () => {
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.3,
      });
    };

    const handleMouseEnterWindow = () => {
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.3,
      });
    };

    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    // Water splash effect on click
    const createSplash = (x: number, y: number) => {
      const splashContainer = splashContainerRef.current;
      if (!splashContainer) return;

      // Create splash particles
      const particles = [];
      const particleCount = 12;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute rounded-full bg-blue-400 opacity-80";
        particle.style.width = `${Math.random() * 8 + 4}px`;
        particle.style.height = particle.style.width;
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.transform = "translate(-50%, -50%)";
        splashContainer.appendChild(particle);
        particles.push(particle);

        // Random angle and distance for each particle
        const angle =
          (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.5;
        const distance = Math.random() * 60 + 30;
        const xOffset = Math.cos(angle) * distance;
        const yOffset = Math.sin(angle) * distance;

        // Animate particle
        gsap.to(particle, {
          x: xOffset,
          y: yOffset,
          scale: Math.random() * 0.5 + 0.5,
          opacity: 0,
          duration: Math.random() * 0.3 + 0.4,
          ease: "power2.out",
          onComplete: () => {
            particle.remove();
          },
        });
      }

      // Create main splash circle
      const mainSplash = document.createElement("div");
      mainSplash.className = "absolute rounded-full bg-blue-300 opacity-60";
      mainSplash.style.width = "20px";
      mainSplash.style.height = "20px";
      mainSplash.style.left = `${x}px`;
      mainSplash.style.top = `${y}px`;
      mainSplash.style.transform = "translate(-50%, -50%)";
      splashContainer.appendChild(mainSplash);

      gsap.fromTo(
        mainSplash,
        { scale: 0, opacity: 0.8 },
        {
          scale: 2.5,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            mainSplash.remove();
          },
        }
      );
    };

    const handleClick = (e: MouseEvent) => {
      createSplash(e.clientX, e.clientY);
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      window.removeEventListener("click", handleClick);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
        style={{
          width: "40px",
          height: "40px",
        }}
      >
        <img
          ref={cursorImgRef}
          src="/shared/sprinkler.png"
          alt="cursor"
          className="w-full h-full object-contain -rotate-12 drop-shadow-lg will-change-transform"
          style={{ transformOrigin: "center center" }}
        />
      </div>
      <div
        ref={splashContainerRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[9998]"
      />
    </>
  );
}
