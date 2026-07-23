"use client";

import { useState, type FormEvent } from "react";

interface SignupFormProps {
  // `source` records WHERE someone signed up. It no longer routes to different
  // lists or welcomes (everyone joins the one Auwa list and gets one welcome);
  // it's saved as the contact's `source` property in Resend for later insight.
  source: "store" | "app" | "book" | "footer" | "article";
  buttonText?: string;
  successMessage?: string;
  theme?: "light" | "dark";
  className?: string;
}

export function SignupForm({
  source,
  buttonText = "Subscribe",
  successMessage = "A note from us is on its way.",
  theme = "light",
  className,
}: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || status === "submitting") return;

    setStatus("submitting");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  const isDark = theme === "dark";
  // Dark theme uses washi (the brand's named light-on-Yoru tone), not
  // pure white — keeps the warm-paper temperature of dark surfaces
  // consistent with the footer + FigureHook + dark-page body text.
  const rowClasses = `flex items-center gap-4 border-b pb-3 min-h-[44px] transition-colors duration-300 ${
    isDark
      ? "border-washi/20 focus-within:border-washi/50"
      : "border-sumi/20 focus-within:border-sumi/50"
  }`;

  if (status === "success") {
    return (
      <div className={className || "max-w-[440px]"}>
        <div className={rowClasses}>
          <p className={`font-sans text-[16px] ${isDark ? "text-washi" : "text-sumi"}`}>
            {successMessage}
          </p>
        </div>
      </div>
    );
  }

  // Stable ID so the hidden label binds to the right input on every render.
  const inputId = `auwa-signup-${source}`;

  return (
    <form onSubmit={handleSubmit} className={className || "max-w-[440px]"}>
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>
      <div className={rowClasses}>
        <input
          id={inputId}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "submitting"}
          className={`flex-1 min-w-0 bg-transparent font-sans text-[16px] focus:outline-none focus-visible:outline-none disabled:opacity-50 ${
            isDark
              ? "text-washi placeholder:text-washi/40"
              : "text-sumi placeholder:text-sumi/40"
          }`}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`font-sans text-[16px] font-medium tracking-[0.02em] transition-colors duration-300 whitespace-nowrap cursor-pointer disabled:opacity-50 ${
            isDark
              ? "text-washi hover:text-washi/55"
              : "text-sumi hover:text-sumi/55"
          }`}
        >
          {status === "submitting" ? "..." : status === "error" ? "Try again" : buttonText}
        </button>
      </div>
    </form>
  );
}
