"use client";

import { useState, type FormEvent } from "react";

interface SignupFormProps {
  source: "app-waitlist" | "store-waitlist" | "book-waitlist" | "newsletter";
  buttonText?: string;
  successMessage?: string;
  theme?: "light" | "dark";
  className?: string;
}

export function SignupForm({
  source,
  buttonText = "Join Waitlist",
  successMessage = "You're in. We'll find you when it's time.",
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

  if (status === "success") {
    return (
      <p className={`font-display text-[16px] md:text-[18px] min-h-[44px] flex items-center ${theme === "dark" ? "text-white" : "text-void"}`}>
        {successMessage}
      </p>
    );
  }

  const isDark = theme === "dark";

  return (
    <form onSubmit={handleSubmit} className={className || "max-w-[440px]"}>
      <div className={`flex items-center gap-4 border-b pb-3 transition-colors duration-300 ${
        isDark
          ? "border-white/20 focus-within:border-white/50"
          : "border-void/20 focus-within:border-void/50"
      }`}>
        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "submitting"}
          className={`flex-1 bg-transparent font-sans text-[14px] outline-none disabled:opacity-50 ${
            isDark
              ? "text-white placeholder:text-white/35"
              : "text-void placeholder:text-void/35"
          }`}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`font-sans text-[14px] font-medium tracking-[0.02em] transition-colors duration-300 whitespace-nowrap cursor-pointer disabled:opacity-50 ${
            isDark
              ? "text-white/70 hover:text-white"
              : "text-void hover:text-void/70"
          }`}
        >
          {status === "submitting" ? "..." : status === "error" ? "Try again" : buttonText}
        </button>
      </div>
    </form>
  );
}
