"use client";

import { motion, useReducedMotion } from "framer-motion";

export function Orb() {
  const reducedMotion = useReducedMotion();

  return (
    <div className="relative flex items-center justify-center w-52 h-52 md:w-72 md:h-72">
      {/* Outer ambient glow — wider, more visible pulse */}
      <motion.div
        className="absolute inset-[-20%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.85 0.15 105 / 0.15) 0%, oklch(0.85 0.15 105 / 0.06) 35%, transparent 65%)",
        }}
        animate={
          reducedMotion
            ? { scale: 1, opacity: 0.8 }
            : { scale: [1, 1.25, 1], opacity: [0.4, 1, 0.4] }
        }
        transition={{
          duration: 5,
          repeat: reducedMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Middle ring — stronger presence */}
      <motion.div
        className="absolute w-36 h-36 md:w-48 md:h-48 rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.85 0.15 105 / 0.10) 0%, oklch(0.85 0.15 105 / 0.03) 50%, transparent 70%)",
        }}
        animate={
          reducedMotion
            ? { scale: 1, opacity: 0.5 }
            : { scale: [1, 1.12, 1], opacity: [0.3, 0.8, 0.3] }
        }
        transition={{
          duration: 7,
          repeat: reducedMotion ? 0 : Infinity,
          ease: "easeInOut",
          delay: reducedMotion ? 0 : 0.8,
        }}
      />

      {/* Core orb — slightly more pronounced breathing */}
      <motion.div
        className="relative w-20 h-20 md:w-24 md:h-24 rounded-full"
        style={{
          background:
            "radial-gradient(circle at 40% 35%, oklch(0.95 0.05 105) 0%, oklch(0.85 0.15 105) 40%, oklch(0.70 0.10 105) 100%)",
        }}
        animate={
          reducedMotion
            ? { scale: 1, boxShadow: "0 0 50px oklch(0.85 0.15 105 / 0.3), 0 0 100px oklch(0.85 0.15 105 / 0.15)" }
            : {
                scale: [1, 1.06, 1],
                boxShadow: [
                  "0 0 40px oklch(0.85 0.15 105 / 0.3), 0 0 80px oklch(0.85 0.15 105 / 0.12), 0 0 120px oklch(0.85 0.15 105 / 0.06)",
                  "0 0 60px oklch(0.85 0.15 105 / 0.45), 0 0 110px oklch(0.85 0.15 105 / 0.2), 0 0 160px oklch(0.85 0.15 105 / 0.1)",
                  "0 0 40px oklch(0.85 0.15 105 / 0.3), 0 0 80px oklch(0.85 0.15 105 / 0.12), 0 0 120px oklch(0.85 0.15 105 / 0.06)",
                ],
              }
        }
        transition={{
          duration: 4,
          repeat: reducedMotion ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
