"use client";

import { motion } from "framer-motion";
import { useCallback, useState } from "react";
import { Overlay } from "./overlay";
import { AboutContent } from "./about-content";
import { StoryContent } from "./story-content";

type Panel = "about" | "story" | null;

export function Header() {
  const [activePanel, setActivePanel] = useState<Panel>(null);
  const close = useCallback(() => setActivePanel(null), []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-6 md:px-10 py-5"
      >
        <a
          href="/"
          className="font-display text-xl md:text-2xl font-light tracking-[0.25em] uppercase text-cosmic-200 hover:text-glow-dim transition-colors duration-300"
        >
          AUWA
        </a>

        <nav className="flex items-center gap-6 md:gap-8">
          <button
            onClick={() => setActivePanel("about")}
            className="font-sans text-sm tracking-widest uppercase text-cosmic-500 hover:text-cosmic-300 transition-colors duration-300"
          >
            About
          </button>
          <button
            onClick={() => setActivePanel("story")}
            className="font-sans text-sm tracking-widest uppercase text-cosmic-500 hover:text-cosmic-300 transition-colors duration-300"
          >
            Story
          </button>
        </nav>
      </motion.header>

      <Overlay open={activePanel !== null} onClose={close}>
        {activePanel === "about" ? <AboutContent /> : <StoryContent />}
      </Overlay>
    </>
  );
}
