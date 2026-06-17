import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function GlowCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  // Hide on touch devices
  const isTouchDevice =
    typeof window !== "undefined" && "ontouchstart" in window;
  if (isTouchDevice) return null;

  return (
    <>
      {/* Outer glow */}
      <motion.div
        ref={glowRef}
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(159,0,255,0.08) 0%, rgba(0,195,255,0.04) 40%, transparent 70%)",
        }}
      />
      {/* Inner bright dot */}
      <motion.div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.9)",
          boxShadow:
            "0 0 10px rgba(159,0,255,0.6), 0 0 30px rgba(0,195,255,0.4), 0 0 60px rgba(159,0,255,0.2)",
        }}
      />
    </>
  );
}
