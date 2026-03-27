"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface OverlayProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function Overlay({ open, onClose, children }: OverlayProps) {
  useEffect(() => {
    if (!open) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-void/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-lg overflow-y-auto bg-cosmic-900/95 border-l border-cosmic-800"
            role="dialog"
            aria-modal="true"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-5 right-6 md:right-10 p-2 text-cosmic-500 hover:text-cosmic-200 transition-colors duration-300 focus-visible:outline-none focus-visible:text-glow-dim min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <line x1="4" y1="4" x2="16" y2="16" />
                <line x1="16" y1="4" x2="4" y2="16" />
              </svg>
            </button>

            {/* Content */}
            <div className="px-8 md:px-12 py-20 md:py-24">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
