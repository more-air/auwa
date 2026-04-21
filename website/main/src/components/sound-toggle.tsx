"use client";

/*
  Ambient sound toggle.

  A small bottom-left button that plays a quiet ambient loop on demand. Off
  by default (browsers block autoplay anyway); remembers the user's choice
  in localStorage so a returning visitor isn't silenced again.

  Expects an audio file at /audio/ambient.mp3. If the file is missing or
  fails to play the toggle fails silently — the UI still updates, the
  console stays clean, and the user's preference is not persisted.

  To provide the audio: drop an `ambient.mp3` into `public/audio/`. Brand
  guidance in context/brand.md recommends a slow, warm, temple-tone
  atmosphere (Suno-generated or similar), no beats, no vocals.
*/

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "auwa.sound-on";
// Ambient track served from public/audio/. Swap the filename to rotate
// between tracks: aurora, begin, crystal, drift, float, light, silk.
const AUDIO_SRC = "/audio/drift.mp3";
const TARGET_VOLUME = 0.28;
const FADE_MS = 1200;

export function SoundToggle() {
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    // We intentionally do NOT auto-resume on mount even if the flag is set,
    // because modern browsers block autoplay without a user gesture. The
    // flag is read and then the user just taps the speaker once to
    // actually start it. Treat the persisted flag as "user prefers sound on"
    // rather than a command to play immediately.
  }, []);

  const fadeTo = (target: number, onDone?: () => void) => {
    const audio = audioRef.current;
    if (!audio) return;
    if (fadeRafRef.current !== null) cancelAnimationFrame(fadeRafRef.current);
    const start = audio.volume;
    const startTime = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - startTime) / FADE_MS);
      audio.volume = start + (target - start) * p;
      if (p < 1) fadeRafRef.current = requestAnimationFrame(step);
      else {
        fadeRafRef.current = null;
        onDone?.();
      }
    };
    fadeRafRef.current = requestAnimationFrame(step);
  };

  const toggle = async () => {
    // Lazy-create the audio element on first interaction — saves the
    // network hit (and avoids pre-loading audio for visitors who never
    // use this feature).
    if (!audioRef.current) {
      const a = new Audio(AUDIO_SRC);
      a.loop = true;
      a.volume = 0;
      a.preload = "auto";
      audioRef.current = a;
    }
    const audio = audioRef.current;

    if (playing) {
      setPlaying(false);
      localStorage.setItem(STORAGE_KEY, "0");
      fadeTo(0, () => audio.pause());
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
      localStorage.setItem(STORAGE_KEY, "1");
      fadeTo(TARGET_VOLUME);
    } catch {
      // Autoplay was blocked OR the audio file is missing. Silently
      // revert the UI so the user doesn't see a stuck "on" icon.
      setPlaying(false);
    }
  };

  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Turn ambient sound off" : "Turn ambient sound on"}
      aria-pressed={playing}
      className="fixed bottom-5 right-5 md:bottom-6 md:right-6 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-void/85 text-white backdrop-blur-md hover:bg-void transition-colors duration-300 cursor-pointer"
      style={{ WebkitBackdropFilter: "blur(8px)" }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        {/* Speaker body (always shown) */}
        <path
          d="M3.5 5.5h2L9 3v10L5.5 10.5h-2z"
          fill="currentColor"
        />
        {/* Sound waves fade in when playing, fade out when not — no mute
            slash, just the bare speaker when off. Quieter than a slashed-
            out speaker icon. */}
        <g
          style={{
            opacity: playing ? 1 : 0,
            transition: "opacity 300ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <path
            d="M11 5.8c.9.7 1.5 1.8 1.5 2.7s-.6 2-1.5 2.7"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M12.4 4c1.6 1 2.6 2.6 2.6 4.5S14 12 12.4 13"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </button>
  );
}
