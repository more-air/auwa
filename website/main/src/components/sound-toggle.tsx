"use client";

/*
  Ambient sound toggle — designed to live INSIDE the header, next to the
  menu trigger.

  Visual: 4 thin vertical bars that sit still when sound is off, and
  animate as a quiet music wave when sound is on. No speaker icon, no
  fixed-position chrome — just typography-scale bars that read as part
  of the header rather than as a floating widget.

  Behaviour:
  - Off by default. First tap creates the <Audio> element lazily, plays
    /audio/drift.mp3 on a 1.2s fade-in to TARGET_VOLUME.
  - Pauses on document.visibilitychange (tab hidden) and window.pagehide
    (bfcache, navigation, tab close). iOS Safari otherwise keeps a
    paused-media badge and can resume after the tab returns.
  - Persists the user preference in localStorage. The flag is read but
    NOT auto-replayed on next visit — modern browsers block autoplay
    without a user gesture, so we use the flag as "this user prefers
    sound on" rather than a command to start.
*/

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "auwa.sound-on";
const AUDIO_SRC = "/audio/drift.mp3";
const TARGET_VOLUME = 0.28;
const FADE_MS = 1200;

interface SoundToggleProps {
  /** Inline color override (passes through `color: currentColor`). Use
      to plumb the header's pickColour result so the bars change tone
      with the rest of the floating header. */
  style?: React.CSSProperties;
  className?: string;
}

export function SoundToggle({ style, className = "" }: SoundToggleProps) {
  const [playing, setPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRafRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pause on tab hidden / page hide. Required on iOS Safari to clear
  // the "now playing" media badge and stop background playback.
  useEffect(() => {
    if (!mounted) return;
    const pause = () => {
      const a = audioRef.current;
      if (a && !a.paused) {
        a.pause();
        a.currentTime = 0;
        setPlaying(false);
      }
    };
    const onVisibility = () => {
      if (document.hidden) pause();
    };
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pagehide", pause);
    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pagehide", pause);
    };
  }, [mounted]);

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
    if (!audioRef.current) {
      const a = new Audio(AUDIO_SRC);
      a.loop = true;
      a.volume = 0;
      a.preload = "auto";
      audioRef.current = a;
    }
    const audio = audioRef.current;

    if (playing) {
      // HARD pause. Cancel any in-flight fade RAF first so it can't
      // resume volume after we've already paused. Set volume to 0
      // immediately and pause synchronously — the previous fade-out
      // version let audio play at low volume for ~1.2s after the user
      // clicked stop, and on Chrome the RAF could be interrupted,
      // leaving audio playing indefinitely.
      if (fadeRafRef.current !== null) {
        cancelAnimationFrame(fadeRafRef.current);
        fadeRafRef.current = null;
      }
      setPlaying(false);
      localStorage.setItem(STORAGE_KEY, "0");
      audio.volume = 0;
      audio.pause();
      audio.currentTime = 0;
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
      localStorage.setItem(STORAGE_KEY, "1");
      fadeTo(TARGET_VOLUME);
    } catch {
      setPlaying(false);
    }
  };

  if (!mounted) return null;

  // 4 thin vertical bars. Each animates with a slightly different
  // duration + delay so the wave reads as organic, not a metronome.
  // Playing: bars run a height-scale loop.
  // Paused: bars hold an ASYMMETRIC equaliser pose (per-bar restY)
  // rather than collapsing to a uniform low strip — so the icon reads
  // as "audio" at a glance even when sound is off, instead of as four
  // stacked dots.
  const bars = [
    { key: 0, dur: "780ms", delay: "0ms", restY: 0.55 },
    { key: 1, dur: "920ms", delay: "120ms", restY: 0.85 },
    { key: 2, dur: "640ms", delay: "240ms", restY: 0.4 },
    { key: 3, dur: "1040ms", delay: "60ms", restY: 0.7 },
  ];

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? "Turn ambient sound off" : "Turn ambient sound on"}
      aria-pressed={playing}
      className={`p-2 cursor-pointer ${className}`}
      style={style}
    >
      <span
        className="block relative"
        style={{ width: 22, height: 22 }}
        aria-hidden="true"
      >
        {bars.map((b, i) => (
          <span
            key={b.key}
            className="absolute rounded-full"
            style={{
              left: i * 6,
              width: 2,
              bottom: 4,
              top: 4,
              backgroundColor: "currentColor",
              transformOrigin: "50% 50%",
              animation: playing
                ? `sound-wave ${b.dur} cubic-bezier(0.4, 0, 0.6, 1) ${b.delay} infinite alternate`
                : "none",
              transform: playing ? undefined : `scaleY(${b.restY})`,
              transition: "transform 240ms cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        ))}
      </span>
    </button>
  );
}
