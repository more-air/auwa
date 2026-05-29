"use client";

/*
  Crisis support — independent organisations (§4 of context/business/privacy.md).

  Always one tap away from any Senshin surface. Clearly framed as
  independent organisations not affiliated with Auwa. No telemetry
  on whether the link was tapped. List reviewed quarterly.
*/

import { useRouter } from "next/navigation";
import { Orb } from "@/components/orb";
import { PageHeader } from "@/components/page-header";

const SERVICES = [
  {
    region: "United Kingdom",
    name: "Samaritans",
    contact: "116 123 (24h)",
    href: "tel:116123",
  },
  {
    region: "Republic of Ireland",
    name: "Samaritans Ireland",
    contact: "116 123 (24h)",
    href: "tel:116123",
  },
  {
    region: "United States",
    name: "988 Suicide & Crisis Lifeline",
    contact: "Call or text 988",
    href: "tel:988",
  },
  {
    region: "Canada",
    name: "Talk Suicide Canada",
    contact: "1-833-456-4566",
    href: "tel:18334564566",
  },
  {
    region: "Australia",
    name: "Lifeline Australia",
    contact: "13 11 14",
    href: "tel:131114",
  },
  {
    region: "Japan",
    name: "TELL Japan Lifeline",
    contact: "03-5774-0992",
    href: "tel:0357740992",
  },
];

export default function CrisisHelp() {
  const router = useRouter();
  return (
    <main id="main-content" className="min-h-svh bg-[var(--color-void)]">
      <PageHeader onBack={() => router.back()} />

      <div className="max-w-md mx-auto -mt-10 px-6 pb-16">
        <div className="flex flex-col items-center text-center gap-4">
          <Orb size="sm" />
          <p className="t-voice-l text-cosmic-50 max-w-xs">
            Help is one tap away when you need it.
          </p>
          <p className="t-meta text-cosmic-50/55 max-w-xs leading-[1.55]">
            These are independent organisations. Auwa is not affiliated with
            any of them.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-3">
          {SERVICES.map((s) => (
            <a
              key={s.region}
              href={s.href}
              className="block border border-cosmic-50/12 hover:border-cosmic-50/35 rounded-card px-4 py-3 transition-colors"
            >
              <span className="t-eyebrow text-cosmic-50/45 block">
                {s.region}
              </span>
              <span className="t-title text-cosmic-50 mt-1 block">
                {s.name}
              </span>
              <span className="t-meta text-cosmic-50/65 mt-0.5 block">
                {s.contact}
              </span>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
