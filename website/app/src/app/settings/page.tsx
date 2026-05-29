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
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/button";
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
      router.replace("/welcome");
    }
  };

  return (
    <main id="main-content" className="min-h-svh bg-[var(--color-void)]">
      <PageHeader title="Settings" onBack={() => router.push("/")} />

      <div className="max-w-md mx-auto flex flex-col gap-10 px-6 pt-4 pb-16">
        <Section title="Practice">
          <Toggle
            label="Remind me about unfinished Senshin practices"
            description="A small quiet line on your next arrival visit. Never a push notification, never on a practice surface."
            checked={store.settings.senshinReminder}
            onChange={(v) => setSettings({ senshinReminder: v })}
          />
        </Section>

        <Section title="Your data">
          <p className="t-body text-cosmic-50/65">
            Everything Auwa knows about you lives on this device. Export it
            any time as a JSON file.
          </p>
          <Button variant="secondary" size="sm" onClick={exportData} className="mt-4">
            Export data
          </Button>
        </Section>

        <Section title="Reset">
          <p className="t-body text-cosmic-50/65">
            For testing: wipe local data and start onboarding again. Your
            archive, fireflies, and Senshin entries are deleted.
          </p>
          <Button variant="secondary" size="sm" onClick={reset} className="mt-4">
            Reset everything
          </Button>
        </Section>

        <p className="t-eyebrow text-cosmic-50/30 text-center">
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
      <h2 className="t-eyebrow text-cosmic-50/45 mb-4">{title}</h2>
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
        <span className="t-body text-cosmic-50/95">{label}</span>
        {description ? (
          <span className="t-meta text-cosmic-50/55 mt-1 leading-[1.55]">
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
