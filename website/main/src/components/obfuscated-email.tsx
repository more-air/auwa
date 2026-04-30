"use client";

import { useState, useCallback } from "react";

export function ObfuscatedEmail({
  user,
  domain,
}: {
  user: string;
  domain: string;
}) {
  const [revealed, setRevealed] = useState(false);

  const handleClick = useCallback(() => {
    if (!revealed) {
      setRevealed(true);
      return;
    }
    window.location.href = `mailto:${user}@${domain}`;
  }, [revealed, user, domain]);

  if (!revealed) {
    return (
      <button
        onClick={handleClick}
        className="underline underline-offset-4 decoration-sumi/20 hover:decoration-sumi/50 transition-colors duration-300 cursor-pointer"
      >
        {user}[at]{domain}
      </button>
    );
  }

  return (
    <a
      href={`mailto:${user}@${domain}`}
      className="underline underline-offset-4 decoration-sumi/20 hover:decoration-sumi/50 transition-colors duration-300"
    >
      {user}@{domain}
    </a>
  );
}
