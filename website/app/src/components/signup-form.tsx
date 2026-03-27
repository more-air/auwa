"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [focused, setFocused] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || status === "submitting") return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="w-full max-w-md" role="region" aria-live="polite">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.p
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-center font-sans text-sm text-cosmic-300 tracking-wide"
          >
            Your kokoro has been noted. We will be in touch.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-3 sm:flex-row sm:gap-0"
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>

            <div className="relative flex-1">
              {/* Glow behind input when focused */}
              <motion.div
                className="pointer-events-none absolute -inset-1 rounded-full"
                animate={{
                  opacity: focused ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background:
                    "radial-gradient(ellipse at center, oklch(0.85 0.15 105 / 0.1) 0%, transparent 70%)",
                }}
              />

              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                disabled={status === "submitting"}
                className="relative w-full rounded-full border border-cosmic-700 bg-cosmic-900/50 px-5 py-3.5 text-sm text-cosmic-100 placeholder:text-cosmic-500 focus:border-glow-dim/50 focus:outline-none transition-colors duration-300 disabled:opacity-50 font-sans tracking-wide sm:rounded-r-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="shrink-0 rounded-full px-7 py-3.5 text-sm font-sans font-medium tracking-widest uppercase text-cosmic-200 border border-cosmic-700 bg-cosmic-900/50 hover:border-glow-dim/50 hover:text-glow-dim focus-visible:border-glow-dim/50 focus-visible:text-glow-dim focus-visible:outline-none transition-colors duration-300 disabled:opacity-50 min-h-[44px] sm:rounded-l-none"
            >
              {status === "submitting"
              ? "..."
              : status === "error"
                ? "Try again"
                : "Notify me"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
