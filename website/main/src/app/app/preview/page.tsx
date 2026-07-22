import type { Metadata } from "next";
import { DarkPageTheme } from "@/components/dark-page-theme";
import { PreviewExperience } from "./experience";

/**
 * /app/preview — internal mockup of the Kokoro Mirror app flow.
 *
 * Not linked from the public nav, disallowed in robots.ts, noindexed
 * via this metadata. Accessible by direct URL for Rieko + Tom review.
 *
 * Not production-gated with notFound() because the URL must work on
 * the live auwa.life domain so Rieko can open it on her phone without
 * running the dev server. The robots disallow + noindex keeps search
 * engines out.
 */
export const metadata: Metadata = {
  title: "Auwa App Preview",
  robots: { index: false, follow: false },
};

export default function PreviewPage() {
  return (
    <>
      <DarkPageTheme />
      <main className="relative">
        <PreviewExperience />
      </main>
    </>
  );
}
