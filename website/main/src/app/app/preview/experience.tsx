"use client";

/**
 * /app/preview — Kokoro Mirror experience mockup.
 *
 * Five screens in one self-contained state machine:
 *   arrival → shower → revelation → archive | share
 *
 * Everything is hardcoded. No Claude API call, no curated library
 * yet, no accounts, no persistence. The reflection text per emotion
 * is placeholder copy in Rieko's voice direction (to be replaced
 * with her own writing once she signs off the shape).
 *
 * Hidden debug switcher (bottom-right) lets Rieko jump between
 * screens and between emotional states without going through the
 * flow each time.
 */
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Screen = "arrival" | "context" | "shower" | "revelation" | "archive" | "share";
type Context = "working" | "with-people" | "alone" | "outside" | "moving" | "eating" | "online" | "transit" | null;

const CONTEXT_LABELS: { value: NonNullable<Context>; label: string }[] = [
  { value: "working", label: "Working" },
  { value: "with-people", label: "With people" },
  { value: "alone", label: "Alone" },
  { value: "outside", label: "Outside" },
  { value: "moving", label: "Moving" },
  { value: "eating", label: "Eating" },
  { value: "online", label: "Online" },
  { value: "transit", label: "In transit" },
];
type Emotion = "hare" | "takaburi" | "aware" | "yuragi" | "nagomi";

type EmotionData = {
  label: string;
  jpName: string;
  romaji: string;
  reflection: string;
  gradient: string;
  glow: string;
  glowSoft: string;
};

const EMOTIONS: Record<Emotion, EmotionData> = {
  hare: {
    label: "Radiant",
    jpName: "晴れ",
    romaji: "Hare",
    reflection:
      "There is brightness here. Something has settled in its right place, and you can feel it without naming it. The light remembers.",
    gradient:
      "linear-gradient(160deg, oklch(0.82 0.14 85) 0%, oklch(0.62 0.13 70) 50%, oklch(0.30 0.08 55) 100%)",
    glow: "oklch(0.88 0.16 85)",
    glowSoft: "oklch(0.88 0.16 85 / 0.35)",
  },
  takaburi: {
    label: "Intense",
    jpName: "昂",
    romaji: "Takaburi",
    reflection:
      "The heat is real. Stay with it. What is rising in you is asking for room, not for resolution. Let it have the room.",
    gradient:
      "linear-gradient(160deg, oklch(0.62 0.18 25) 0%, oklch(0.42 0.14 18) 55%, oklch(0.20 0.06 12) 100%)",
    glow: "oklch(0.70 0.18 25)",
    glowSoft: "oklch(0.70 0.18 25 / 0.35)",
  },
  aware: {
    label: "Reflective",
    jpName: "哀",
    romaji: "Aware",
    reflection:
      "Something gentle is moving through you. The Japanese have a word for the sadness in beautiful things passing. It is here today. So is the beauty.",
    gradient:
      "linear-gradient(160deg, oklch(0.55 0.10 250) 0%, oklch(0.38 0.08 245) 55%, oklch(0.18 0.04 240) 100%)",
    glow: "oklch(0.75 0.10 250)",
    glowSoft: "oklch(0.75 0.10 250 / 0.35)",
  },
  yuragi: {
    label: "Unsettled",
    jpName: "揺",
    romaji: "Yuragi",
    reflection:
      "You are between two shores. The water is moving, and your feet have not yet found the ground. This is also a kind of standing.",
    gradient:
      "linear-gradient(160deg, oklch(0.58 0.10 55) 0%, oklch(0.42 0.08 50) 50%, oklch(0.22 0.04 45) 100%)",
    glow: "oklch(0.72 0.12 55)",
    glowSoft: "oklch(0.72 0.12 55 / 0.35)",
  },
  nagomi: {
    label: "Serene",
    jpName: "和",
    romaji: "Nagomi",
    reflection:
      "Quiet has arrived. Not the quiet that comes from holding your breath, but the quiet that comes after. Stay a while.",
    gradient:
      "linear-gradient(160deg, oklch(0.62 0.08 160) 0%, oklch(0.46 0.07 155) 55%, oklch(0.24 0.04 150) 100%)",
    glow: "oklch(0.78 0.10 160)",
    glowSoft: "oklch(0.78 0.10 160 / 0.35)",
  },
};

const EMOTION_ORDER: Emotion[] = ["hare", "takaburi", "aware", "yuragi", "nagomi"];

type ArchiveEntry = { date: string; emotion: Emotion; line: string };

const ARCHIVE_MOCK: ArchiveEntry[] = [
  { date: "25 May", emotion: "nagomi", line: "Quiet has arrived. Not the quiet that comes from holding your breath..." },
  { date: "23 May", emotion: "aware", line: "Something gentle is moving through you. The Japanese have a word..." },
  { date: "20 May", emotion: "aware", line: "There is a softness to the morning that asks nothing of you..." },
  { date: "18 May", emotion: "yuragi", line: "You are between two shores. The water is moving, and your feet have not yet found the ground..." },
  { date: "15 May", emotion: "hare", line: "There is brightness here. Something has settled in its right place..." },
  { date: "12 May", emotion: "takaburi", line: "The heat is real. Stay with it. What is rising in you is asking for room..." },
  { date: "10 May", emotion: "nagomi", line: "Quiet has arrived. Stay a while." },
];

function isScreen(v: string | null): v is Screen {
  return (
    v === "arrival" ||
    v === "context" ||
    v === "shower" ||
    v === "revelation" ||
    v === "archive" ||
    v === "share"
  );
}
function isEmotion(v: string | null): v is Emotion {
  return v === "hare" || v === "takaburi" || v === "aware" || v === "yuragi" || v === "nagomi";
}

export function PreviewExperience() {
  // Initial state can be overridden by URL params for direct linking:
  // /app/preview?screen=revelation&emotion=hare
  const [screen, setScreen] = useState<Screen>("arrival");
  const [emotion, setEmotion] = useState<Emotion>("aware");
  const [context, setContext] = useState<Context>(null);
  const [chromeVisible, setChromeVisible] = useState(false);
  const [shareAspect, setShareAspect] = useState<"square" | "story">("story");

  // Read URL params on mount (client-only, so a useEffect is correct).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("screen");
    const em = params.get("emotion");
    if (isScreen(s)) setScreen(s);
    if (isEmotion(em)) setEmotion(em);
  }, []);

  const showerTimerRef = useRef<number | null>(null);

  // Called when user taps a character variant on the arrival screen.
  // Sets the emotion and moves to the context selector.
  const handleVariantTap = (em: Emotion) => {
    setEmotion(em);
    setChromeVisible(false);
    setScreen("context");
  };

  // Called when user picks a context (or skips). Kicks off the light
  // shower, which lands on the revelation ~3.2s later.
  const handleContextChoice = (ctx: Context) => {
    setContext(ctx);
    setScreen("shower");
    showerTimerRef.current = window.setTimeout(() => setScreen("revelation"), 3200);
  };

  useEffect(() => {
    return () => {
      if (showerTimerRef.current) window.clearTimeout(showerTimerRef.current);
    };
  }, []);

  const e = EMOTIONS[emotion];

  return (
    <div
      className="relative w-full min-h-[100svh] overflow-hidden text-washi"
      style={{ background: "var(--color-cosmic-900)" }}
    >
      {/* Screens rendered conditionally. Each screen has its own
          internal motion (orb breathing, character fade-in, etc.); the
          screen-level crossfade is intentionally instant for v1 so the
          AnimatePresence opacity stacking issue can't bite us. Layered
          crossfade between screens will return once the engine is real. */}
      {screen === "arrival" && (
        <div className="absolute inset-0">
          <ArrivalScreen onVariantTap={handleVariantTap} />
        </div>
      )}
      {screen === "context" && (
        <div className="absolute inset-0">
          <ContextScreen onChoice={handleContextChoice} onBack={() => setScreen("arrival")} />
        </div>
      )}
      {screen === "shower" && (
        <div className="absolute inset-0">
          <ShowerScreen emotion={e} />
        </div>
      )}
      {screen === "revelation" && (
        <div className="absolute inset-0">
          <RevelationScreen
            emotion={e}
            chromeVisible={chromeVisible}
            onChromeReveal={() => setChromeVisible(true)}
            onArchive={() => setScreen("archive")}
            onShare={() => setScreen("share")}
            onContinue={() => {
              setScreen("arrival");
              setContext(null);
              setChromeVisible(false);
            }}
          />
        </div>
      )}
      {screen === "archive" && (
        <div className="absolute inset-0 overflow-y-auto">
          <ArchiveScreen
            onBack={() => setScreen("revelation")}
            onTap={(em) => {
              setEmotion(em);
              setScreen("revelation");
              setChromeVisible(true);
            }}
          />
        </div>
      )}
      {screen === "share" && (
        <div className="absolute inset-0 overflow-y-auto">
          <ShareScreen
            emotion={e}
            aspect={shareAspect}
            setAspect={setShareAspect}
            onBack={() => setScreen("revelation")}
          />
        </div>
      )}

      <DebugSwitcher
        screen={screen}
        emotion={emotion}
        onScreenChange={(s) => setScreen(s)}
        onEmotionChange={(em) => setEmotion(em)}
      />
    </div>
  );
}

/* ----- Orb ----- */

function Orb({
  size = 56,
  glow = "oklch(0.85 0.15 105)",
  breathing = true,
}: {
  size?: number;
  glow?: string;
  breathing?: boolean;
}) {
  const haloAlpha = glow.replace(")", " / 0.32)");
  return (
    <motion.div
      animate={
        breathing
          ? { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }
          : { scale: 1, opacity: 1 }
      }
      transition={
        breathing
          ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
          : { duration: 0 }
      }
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${glow} 0%, transparent 70%)`,
        boxShadow: `0 0 ${size * 1.4}px ${size * 0.35}px ${haloAlpha}`,
      }}
    />
  );
}

/* ----- Arrival -----

   New flow per the 26 May 2026 spec revision. Text input is gone.
   Five Auwa character variants in a horizontal row, one per Yamato
   state, each with its emotional-state halo behind it. The user
   recognises which one fits (visual + colour cue) and taps. Tap →
   context screen → shower → revelation. Optional label sits below
   each variant; in production these would be replaced by Rieko's
   five emotionally-distinct character illustrations and the labels
   would likely be removed entirely. */

function ArrivalScreen({ onVariantTap }: { onVariantTap: (em: Emotion) => void }) {
  return (
    <div className="relative w-full min-h-[100svh] flex flex-col items-center justify-start pt-[18vh] md:pt-[16vh] px-6">
      {/* Orb — Auwa's presence before the character is revealed */}
      <div className="mb-10 md:mb-12">
        <Orb size={48} />
      </div>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="font-sans text-[12px] uppercase tracking-[0.16em] text-washi/45 mb-5 text-center max-w-[420px]"
      >
        Auwa is here to reveal your Kokoro
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
        className="font-display text-[clamp(1.5rem,4vw,2rem)] leading-[1.35] text-washi/85 text-center max-w-[520px] mb-12"
      >
        How are you feeling right now?
      </motion.h1>

      {/* Five character variants in a horizontal row.
          User taps the one that resonates. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.65 }}
        className="w-full max-w-[520px] grid grid-cols-5 gap-3"
      >
        {EMOTION_ORDER.map((em) => {
          const data = EMOTIONS[em];
          return (
            <button
              key={em}
              type="button"
              onClick={() => onVariantTap(em)}
              aria-label={`I'm feeling ${data.label}`}
              className="group flex flex-col items-center gap-2 py-3 px-1 rounded-md transition-colors duration-300 hover:bg-washi/[0.03] focus-visible:bg-washi/[0.05]"
            >
              <div className="relative w-[56px] h-[56px] flex items-center justify-center">
                {/* Per-emotion glow halo behind the character */}
                <div
                  className="absolute inset-[-40%] rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${data.glowSoft} 0%, transparent 65%)`,
                  }}
                />
                {/* Placeholder character — Rieko produces 5 emotional
                    variants in production. For the mockup we re-use
                    the front-facing Auwa, differentiated only by the
                    halo colour, so Rieko can see the layout shape. */}
                <Image
                  src="/book/character/auwa-front.webp"
                  alt=""
                  width={48}
                  height={48}
                  quality={95}
                  className="object-contain relative"
                />
              </div>
              <span className="font-jp-serif text-[18px] text-washi/55 group-hover:text-washi/85 transition-colors duration-300">
                {data.jpName.charAt(0)}
              </span>
            </button>
          );
        })}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 1.0 }}
        className="font-sans text-[11px] uppercase tracking-[0.18em] text-washi/30 mt-10 text-center"
      >
        Tap the one that fits
      </motion.p>
    </div>
  );
}

/* ----- Context selector -----

   New screen per the 26 May 2026 spec. After tapping a character
   variant, the user is asked what they were up to. Eight broad
   labels in a 4x2 grid, plus skip. Powers the correlation engine
   in the archive over time ("Nagomi has visited 11 times this
   season — 8 of those after time outside"). Skipping is one tap
   and never penalised. */

function ContextScreen({
  onChoice,
  onBack,
}: {
  onChoice: (ctx: Context) => void;
  onBack: () => void;
}) {
  return (
    <div className="relative w-full min-h-[100svh] flex flex-col items-center justify-start pt-[18vh] md:pt-[16vh] px-6">
      <h1 className="font-display text-[clamp(1.5rem,4vw,2rem)] leading-[1.35] text-washi/85 text-center max-w-[520px] mb-3">
        What were you up to?
      </h1>
      <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-washi/35 mb-10 text-center max-w-[420px]">
        Optional. Helps Auwa notice patterns over time.
      </p>

      <div className="w-full max-w-[420px] grid grid-cols-2 gap-3">
        {CONTEXT_LABELS.map((c) => (
          <button
            key={c.value}
            type="button"
            onClick={() => onChoice(c.value)}
            className="font-display text-[15px] text-washi/85 px-4 py-4 rounded-md border border-washi/15 hover:border-washi/40 hover:bg-washi/[0.04] transition-colors duration-300"
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-8">
        <button
          type="button"
          onClick={() => onChoice(null)}
          className="font-sans text-[12px] uppercase tracking-[0.16em] text-washi/55 hover:text-washi transition-colors duration-300"
        >
          Skip
        </button>
        <button
          type="button"
          onClick={onBack}
          className="font-sans text-[12px] uppercase tracking-[0.16em] text-washi/30 hover:text-washi/60 transition-colors duration-300"
        >
          Back
        </button>
      </div>
    </div>
  );
}

/* ----- Light shower ----- */

function ShowerScreen({ emotion }: { emotion: EmotionData }) {
  return (
    <div className="relative w-full min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Gradient backdrop blooming in */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
        style={{ background: emotion.gradient }}
      />

      {/* Halo expanding behind orb */}
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: [0.3, 1.4, 2.6], opacity: [0, 0.9, 0.2] }}
        transition={{ duration: 3.0, ease: [0.16, 1, 0.3, 1] }}
        className="absolute"
        style={{
          width: 220,
          height: 220,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${emotion.glow} 0%, transparent 65%)`,
        }}
      />

      {/* Orb scaling up */}
      <motion.div
        initial={{ scale: 1, opacity: 0.9 }}
        animate={{ scale: [1, 1.3, 1.0], opacity: [0.9, 1, 0.7] }}
        transition={{ duration: 3.0, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        <Orb size={72} glow={emotion.glow} breathing={false} />
      </motion.div>
    </div>
  );
}

/* ----- Revelation ----- */

function RevelationScreen({
  emotion,
  chromeVisible,
  onChromeReveal,
  onArchive,
  onShare,
  onContinue,
}: {
  emotion: EmotionData;
  chromeVisible: boolean;
  onChromeReveal: () => void;
  onArchive: () => void;
  onShare: () => void;
  onContinue: () => void;
}) {
  return (
    <div
      onClick={onChromeReveal}
      className="relative w-full min-h-[100svh] cursor-default"
      style={{ background: emotion.gradient }}
    >
      {/* Kokoro — HERO. Large, centred horizontally, slightly above
          vertical centre. The character carries the visual weight,
          the text supports. Per the May 2026 spec update: inversion
          of character vs text proportions makes the revelation about
          the character (which spreads on Instagram) rather than a
          wall of text (which doesn't). */}
      <div className="absolute left-1/2 top-[34%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="relative w-[280px] md:w-[360px] aspect-square">
          <div
            className="absolute inset-[-25%] rounded-full"
            style={{
              background: `radial-gradient(circle, ${emotion.glowSoft} 0%, transparent 65%)`,
            }}
          />
          <Image
            src="/book/character/auwa-front.webp"
            alt="Your Kokoro, revealed"
            fill
            quality={95}
            sizes="(max-width: 768px) 280px, 360px"
            className="object-contain relative"
            priority
          />
        </div>
      </div>

      {/* Reflection — SECONDARY. Smaller than before, centred below
          the character. Reads as caption, not as the main moment. */}
      <div className="absolute left-8 right-8 md:left-12 md:right-12 bottom-[20%] md:bottom-[22%] max-w-[480px] mx-auto">
        <p
          className="font-display text-[16px] md:text-[17px] leading-[1.55] text-washi/90 text-center"
          style={{ letterSpacing: "0.005em" }}
        >
          {emotion.reflection}
        </p>
      </div>

      {/* Action chrome — appears on user tap, never on timer */}
      <div
        className="absolute left-0 right-0 bottom-8 md:bottom-10 px-8 md:px-12 flex items-center gap-8 justify-center md:justify-start"
        style={{
          opacity: chromeVisible ? 1 : 0,
          transition: "opacity 600ms cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: chromeVisible ? "auto" : "none",
        }}
      >
        <ChromeButton
          onClick={(ev) => {
            ev.stopPropagation();
            onArchive();
          }}
          label="Archive"
        />
        <ChromeButton
          onClick={(ev) => {
            ev.stopPropagation();
            onShare();
          }}
          label="Share"
        />
        <ChromeButton
          onClick={(ev) => {
            ev.stopPropagation();
            onContinue();
          }}
          label="Continue"
        />
      </div>

      {/* Quiet hint that the screen is interactive */}
      <div
        className="absolute left-1/2 -translate-x-1/2 bottom-8 md:bottom-10 font-sans text-[10px] uppercase tracking-[0.18em] text-washi/40 pointer-events-none"
        style={{
          opacity: chromeVisible ? 0 : 0.4,
          transition: "opacity 800ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        Tap to continue
      </div>
    </div>
  );
}

function ChromeButton({
  onClick,
  label,
}: {
  onClick: (ev: React.MouseEvent) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-sans text-[12px] uppercase tracking-[0.16em] text-washi/65 hover:text-washi transition-colors duration-300"
    >
      {label}
    </button>
  );
}

/* ----- Archive ----- */

function ArchiveScreen({
  onBack,
  onTap,
}: {
  onBack: () => void;
  onTap: (em: Emotion) => void;
}) {
  return (
    <div className="relative w-full min-h-[100svh] px-6 md:px-12 pt-24 md:pt-28 pb-16">
      <div className="flex items-center justify-between max-w-[640px] mx-auto mb-10">
        <h2 className="font-display text-[clamp(1.5rem,3vw,2rem)] text-washi/85">
          What Auwa has revealed
        </h2>
        <button
          type="button"
          onClick={onBack}
          className="font-sans text-[12px] uppercase tracking-[0.16em] text-washi/45 hover:text-washi transition-colors duration-300"
        >
          Close
        </button>
      </div>

      <div className="max-w-[640px] mx-auto flex flex-col gap-3">
        {ARCHIVE_MOCK.map((entry, i) => {
          const em = EMOTIONS[entry.emotion];
          return (
            <button
              key={i}
              type="button"
              onClick={() => onTap(entry.emotion)}
              className="relative w-full text-left rounded-md overflow-hidden p-6 md:p-7 hover:scale-[1.005] transition-transform duration-300"
              style={{ background: em.gradient }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-jp-serif text-[20px] text-washi/85">
                  {em.jpName}
                </span>
                <span className="font-sans text-[11px] uppercase tracking-[0.16em] text-washi/55">
                  {entry.date}
                </span>
              </div>
              <p className="font-display text-[15px] md:text-[16px] leading-[1.55] text-washi/85 line-clamp-2">
                {entry.line}
              </p>
            </button>
          );
        })}
      </div>

      <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-washi/35 mt-10 text-center max-w-[420px] mx-auto">
        The colour is the diary. Tap any card to revisit.
      </p>
    </div>
  );
}

/* ----- Share ----- */

function ShareScreen({
  emotion,
  aspect,
  setAspect,
  onBack,
}: {
  emotion: EmotionData;
  aspect: "square" | "story";
  setAspect: (a: "square" | "story") => void;
  onBack: () => void;
}) {
  return (
    <div className="relative w-full min-h-[100svh] px-6 md:px-12 pt-24 md:pt-28 pb-16 flex flex-col items-center">
      <div className="flex items-center justify-between w-full max-w-[640px] mb-8">
        <h2 className="font-display text-[clamp(1.25rem,2.5vw,1.5rem)] text-washi/85">
          Share this revelation
        </h2>
        <button
          type="button"
          onClick={onBack}
          className="font-sans text-[12px] uppercase tracking-[0.16em] text-washi/45 hover:text-washi transition-colors duration-300"
        >
          Close
        </button>
      </div>

      <div className="flex items-center gap-6 mb-8">
        <button
          type="button"
          onClick={() => setAspect("story")}
          className={`font-sans text-[12px] uppercase tracking-[0.16em] transition-colors duration-300 ${aspect === "story" ? "text-washi" : "text-washi/40 hover:text-washi/70"}`}
        >
          Story (9:16)
        </button>
        <button
          type="button"
          onClick={() => setAspect("square")}
          className={`font-sans text-[12px] uppercase tracking-[0.16em] transition-colors duration-300 ${aspect === "square" ? "text-washi" : "text-washi/40 hover:text-washi/70"}`}
        >
          Feed (1:1)
        </button>
      </div>

      <div
        key={aspect}
        className="relative rounded-md overflow-hidden shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]"
        style={{
          background: emotion.gradient,
          width: aspect === "story" ? "min(280px, 70vw)" : "min(360px, 80vw)",
          aspectRatio: aspect === "story" ? "9 / 16" : "1 / 1",
        }}
      >
        {/* Character — HERO of the share card. Big, centred. */}
        <div
          className={`absolute pointer-events-none left-1/2 -translate-x-1/2 aspect-square ${aspect === "story" ? "top-[28%] -translate-y-1/2 w-[70%]" : "top-[36%] -translate-y-1/2 w-[60%]"}`}
        >
          <div
            className="absolute inset-[-15%] rounded-full"
            style={{
              background: `radial-gradient(circle, ${emotion.glowSoft} 0%, transparent 65%)`,
            }}
          />
          <Image
            src="/book/character/auwa-front.webp"
            alt=""
            fill
            quality={95}
            sizes="280px"
            className="object-contain relative"
          />
        </div>

        {/* Reflection — secondary. Centred under the character. */}
        <div className={`absolute left-4 right-4 text-center ${aspect === "story" ? "bottom-12" : "bottom-10"}`}>
          <p
            className={`font-display text-washi/90 ${aspect === "story" ? "text-[12px] leading-[1.5]" : "text-[13px] leading-[1.5]"}`}
          >
            {emotion.reflection}
          </p>
        </div>

        <div className="absolute left-0 right-0 bottom-4 text-center">
          <span
            className="font-display text-[10px] uppercase text-washi/55"
            style={{ letterSpacing: "0.25em" }}
          >
            Revealed by Auwa
          </span>
        </div>
      </div>

      <p className="font-sans text-[11px] uppercase tracking-[0.16em] text-washi/35 mt-8 text-center max-w-[420px]">
        In the real app, this saves to your camera roll and opens an Instagram share sheet.
      </p>
    </div>
  );
}

/* ----- Debug switcher ----- */

function DebugSwitcher({
  screen,
  emotion,
  onScreenChange,
  onEmotionChange,
}: {
  screen: Screen;
  emotion: Emotion;
  onScreenChange: (s: Screen) => void;
  onEmotionChange: (em: Emotion) => void;
}) {
  const [open, setOpen] = useState(false);
  const screens: Screen[] = ["arrival", "context", "shower", "revelation", "archive", "share"];

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.3 }}
            className="mb-3 rounded-md p-4 border border-washi/10 min-w-[200px]"
            style={{ background: "oklch(0.12 0.025 235 / 0.85)", backdropFilter: "blur(12px)" }}
          >
            <div className="font-sans text-[10px] uppercase tracking-[0.16em] text-washi/40 mb-2">
              Screen
            </div>
            <div className="flex flex-col gap-1 mb-4">
              {screens.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => onScreenChange(s)}
                  className={`text-left font-sans text-[12px] uppercase tracking-[0.12em] transition-colors duration-200 ${screen === s ? "text-washi" : "text-washi/45 hover:text-washi/70"}`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="font-sans text-[10px] uppercase tracking-[0.16em] text-washi/40 mb-2">
              Emotion
            </div>
            <div className="flex flex-col gap-1">
              {EMOTION_ORDER.map((em) => (
                <button
                  key={em}
                  type="button"
                  onClick={() => onEmotionChange(em)}
                  className={`text-left font-sans text-[12px] tracking-[0.05em] transition-colors duration-200 ${emotion === em ? "text-washi" : "text-washi/45 hover:text-washi/70"}`}
                >
                  <span className="font-jp-serif mr-2">{EMOTIONS[em].jpName}</span>
                  <span className="uppercase tracking-[0.12em] text-[11px]">{EMOTIONS[em].label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Preview controls"
        className="w-10 h-10 rounded-full border border-washi/15 flex items-center justify-center hover:border-washi/40 transition-colors duration-300"
        style={{ background: "oklch(0.12 0.025 235 / 0.7)", backdropFilter: "blur(12px)" }}
      >
        <span className="font-sans text-[14px] text-washi/70">{open ? "×" : "·"}</span>
      </button>
    </div>
  );
}
