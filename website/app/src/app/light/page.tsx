"use client";

/*
  Standalone Daily Light surface (§5.14, §5.3 dual-placement note).

  Reachable from the home arc's quiet *light* entry. Lets the user
  capture a small noticed moment without doing the daily revelation
  first — for the lunchtime user who opens the app specifically to
  capture something they noticed at breakfast.

  The inline post-revelation Daily Light follow-on lives inside the
  daily flow at the auwa.app cosmic surface. Same component, same logic — only the
  entry point differs.
*/

import { useRouter } from "next/navigation";
import { DailyLightCapture } from "@/components/daily-light-capture";

export default function DailyLightStandalone() {
  const router = useRouter();
  const back = () => router.push("/");

  return (
    <main id="main-content" className="min-h-svh relative overflow-hidden">
      <DailyLightCapture onSkip={back} onCaptured={back} />
    </main>
  );
}
