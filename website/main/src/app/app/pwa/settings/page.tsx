"use client";

/*
  Settings / Account (§5.19).

  v1 minimal: data export, reset onboarding (testing aid), the
  Senshin "remind me about unfinished practices" toggle (off by
  default per §9.4), and a version label.

  Real account management (profile, subscription, notification
  preferences, delete account, print order history, Senshin
  recovery key generation, Senshin archive export) arrives once
  the auth + Stripe + E2EE layers land.
*/

import { useRouter } from "next/navigation";
import {
  exportStore,
  resetStore,
  setSettings,
  useAppStore,
} from "@/lib/app-store";

export default function Settings() {
  const router = useRouter();
  const store = useAppStore();

  const exportData = () => {
    const data = exportStore();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `auwa-export-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    if (
      window.confirm(
        "Reset onboarding and all local data? This cannot be undone."
      )
    ) {
      resetStore();
      router.replace("/app/pwa/welcome");
    }
  };

  return (
    <main id="main-content" className="min-h-svh px-6 pt-16 pb-16">
      <header className="flex items-center justify-between mb-8">
        <button
          type="button"
          onClick={() => router.push("/app/pwa")}
          className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/55 hover:text-cosmic-50/85 transition-colors"
        >
          ← Back
        </button>
        <span className="font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/45">
          Settings
        </span>
        <span className="w-12" />
      </header>

      <div className="max-w-md mx-auto flex flex-col gap-10">
        <Section title="Practice">
          <Toggle
            label="Remind me about unfinished Senshin practices"
            description="A small quiet line on your next arrival visit. Never a push notification, never on a practice surface."
            checked={store.settings.senshinReminder}
            onChange={(v) => setSettings({ senshinReminder: v })}
          />
        </Section>

        <Section title="Your data">
          <p className="font-display text-[14px] text-cosmic-50/65 leading-[1.55]">
            Everything Auwa knows about you lives on this device. Export it
            any time as a JSON file.
          </p>
          <button
            type="button"
            onClick={exportData}
            className="mt-3 self-start font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/85 hover:text-cosmic-50 border border-cosmic-50/25 hover:border-cosmic-50/55 px-5 py-2.5 rounded-sm transition-colors"
          >
            Export data
          </button>
        </Section>

        <Section title="Reset">
          <p className="font-display text-[14px] text-cosmic-50/65 leading-[1.55]">
            For testing: wipe local data and start onboarding again. Your
            archive, fireflies, and Senshin entries are deleted.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-3 self-start font-sans text-[11px] tracking-[0.18em] uppercase text-cosmic-50/65 hover:text-cosmic-50/95 border border-cosmic-50/20 hover:border-cosmic-50/45 px-5 py-2.5 rounded-sm transition-colors"
          >
            Reset everything
          </button>
        </Section>

        <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-cosmic-50/30 text-center">
          Kokoro Mirror · v1 friends-release
        </p>
      </div>
    </main>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="font-sans text-[10px] tracking-[0.18em] uppercase text-cosmic-50/45 mb-4">
        {title}
      </h2>
      <div className="flex flex-col items-start">{children}</div>
    </section>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="w-full flex items-start justify-between gap-4 text-left py-2"
    >
      <span className="flex flex-col">
        <span className="font-display text-[16px] text-cosmic-50/95">
          {label}
        </span>
        {description ? (
          <span className="font-display text-[13px] text-cosmic-50/55 mt-1 leading-[1.55]">
            {description}
          </span>
        ) : null}
      </span>
      <span
        className={[
          "shrink-0 mt-1 w-10 h-6 rounded-full relative transition-colors duration-200",
          checked ? "bg-cosmic-50/35" : "bg-cosmic-50/10",
        ].join(" ")}
      >
        <span
          className={[
            "absolute top-0.5 w-5 h-5 rounded-full bg-cosmic-50 transition-transform duration-200",
            checked ? "translate-x-[18px]" : "translate-x-0.5",
          ].join(" ")}
        />
      </span>
    </button>
  );
}
