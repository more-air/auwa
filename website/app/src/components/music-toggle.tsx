"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element once
    audioRef.current = new Audio("/audio/ambient.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  function toggle() {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Browser blocked autoplay, ignore
      });
    }
    setPlaying(!playing);
  }

  return (
    <button
      onClick={toggle}
      aria-label={playing ? "Pause music" : "Play music"}
      className="group flex items-center gap-2.5 rounded-full border border-cosmic-700 bg-cosmic-900/60 px-4 py-2.5 text-cosmic-500 hover:border-cosmic-600 hover:text-cosmic-300 focus-visible:border-glow-dim/50 focus-visible:outline-none transition-colors duration-300"
    >
      {/* Sound bars */}
      <div className="flex items-end gap-[3px] h-3">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="w-[2px] rounded-full bg-current"
            animate={
              playing
                ? {
                    height: ["4px", "12px", "6px", "10px", "4px"],
                  }
                : { height: "4px" }
            }
            transition={
              playing
                ? {
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }
                : { duration: 0.3 }
            }
          />
        ))}
      </div>

      <span className="text-xs font-sans tracking-widest uppercase">
        {playing ? "Sound on" : "Sound"}
      </span>
    </button>
  );
}
