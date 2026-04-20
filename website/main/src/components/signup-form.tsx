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

  const isDark = theme === "dark";
  // Shared container keeps height identical between idle/submitting/success
  // states so the block above never shifts when the form swaps to the
  // "thank you" message.
  const rowClasses = `flex items-center gap-4 border-b pb-3 min-h-[44px] transition-colors duration-300 ${
    isDark
      ? "border-white/20 focus-within:border-white/50"
      : "border-void/20 focus-within:border-void/50"
  }`;

  if (status === "success") {
    return (
      <div className={className || "max-w-[440px]"}>
        <div className={rowClasses}>
          <p className={`font-sans text-[16px] ${isDark ? "text-white" : "text-void"}`}>
            {successMessage}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className || "max-w-[440px]"}>
      <div className={rowClasses}>
        <input
          type="email"
          placeholder="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "submitting"}
          className={`flex-1 bg-transparent font-sans text-[16px] outline-none disabled:opacity-50 ${
            isDark
              ? "text-white placeholder:text-white/35"
              : "text-void placeholder:text-void/35"
          }`}
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className={`font-sans text-[16px] font-medium tracking-[0.02em] transition-colors duration-300 whitespace-nowrap cursor-pointer disabled:opacity-50 ${
            isDark
              ? "text-white hover:text-white/55"
              : "text-void hover:text-void/55"
          }`}
        >
          {status === "submitting" ? "..." : status === "error" ? "Try again" : buttonText}
        </button>
      </div>
    </form>
  );
}
