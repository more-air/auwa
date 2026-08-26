"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

/*
  Simulated checkout.

  Its job is to show what actually happens after "Order now", so the
  handoff can be judged before Shopify exists. It is NOT a design
  proposal: past the button, the page belongs to Shopify. Their hosted
  checkout is a fixed two-column layout — form left, order summary
  right — and on the Basic plan the only things we control are the
  logo, the fonts, the accent colour and the corner radius. This mock
  is drawn to match that constraint, using Auwa's own tokens, so what
  you see here is close to what the real one will look like once
  checkout branding is applied.

  The most useful thing in here is the tax behaviour. Change the
  country and watch the figure's price change: More Air is VAT
  registered, so a UK buyer pays £180 with £30 of VAT inside it, and an
  export buyer pays £150 because the sale is zero-rated. That is a
  Shopify tax setting, not something the front end decides, and it is
  the single easiest thing to get wrong.

  NO PAYMENT FIELDS. The payment step deliberately renders no card
  inputs. Card data never touches our code or our servers — Shopify
  Payments owns that step entirely, which is most of the reason to use
  Shopify at all. A mock that drew a card form would misrepresent
  where the sensitive part actually lives.
*/

type Step = "information" | "shipping" | "payment" | "confirmed";

type Destination = {
  id: string;
  label: string;
  /** Is the sale zero-rated for VAT? Exports are. */
  export: boolean;
  shipping: number;
  /** Shown under the total when there is something the buyer must know. */
  warning?: string;
};

const DESTINATIONS: Destination[] = [
  { id: "gb", label: "United Kingdom", export: false, shipping: 6 },
  {
    id: "us",
    label: "United States",
    export: true,
    shipping: 18,
    warning:
      "No UK VAT on exports. US customs may charge duty on arrival, which is normal and expected at this value.",
  },
  {
    id: "ie",
    label: "Ireland",
    export: true,
    shipping: 14,
    warning:
      "OPEN DECISION. No UK VAT is charged, but without an IOSS registration the courier collects Irish import VAT plus a handling fee (typically £12 to £15) on the doorstep. That is a poor ending for a gift-wrapped £180 object, which is why the EU is either in scope properly or out of scope entirely.",
  },
];

/** VAT-inclusive shelf price. Net is what More Air actually keeps. */
const PRICE_INC_VAT = 180;
const PRICE_NET = 150;

const FINISHES: Record<string, string> = {
  natural: "Natural",
  sumi: "Sumi",
};

function money(n: number) {
  return `£${n.toFixed(2)}`;
}

export function CheckoutSimulator() {
  const params = useSearchParams();
  const finish = FINISHES[params.get("finish") ?? "natural"] ?? "Natural";

  const [step, setStep] = useState<Step>("information");
  const [dest, setDest] = useState<Destination>(DESTINATIONS[0]);

  const itemPrice = dest.export ? PRICE_NET : PRICE_INC_VAT;
  const total = itemPrice + dest.shipping;
  // VAT already sits inside the total on a domestic sale; it is shown
  // as an "includes" line, never added on top.
  const vatIncluded = dest.export ? 0 : total - total / 1.2;

  const steps: Step[] = ["information", "shipping", "payment"];
  const stepIndex = steps.indexOf(step);

  return (
    <div className="min-h-[100svh] bg-surface">
      {/* Simulation banner. Loud on purpose — nobody should ever
          mistake this for a working checkout. */}
      <div className="bg-sumi px-6 py-3 text-center">
        <p className="font-sans text-[12px] leading-[1.5] text-surface/80">
          Simulation. This is what Shopify&rsquo;s hosted checkout will do once
          it is connected. No payment is taken and nothing is sent anywhere.
        </p>
      </div>

      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-0 px-6 lg:grid-cols-[1fr_400px] lg:px-10">

        {/* ── Left: the form Shopify presents ── */}
        <div className="py-10 lg:py-14 lg:pr-14">
          <Link href="/store-preview" className="font-display text-[22px] tracking-[0.02em] text-sumi">
            Auwa
          </Link>
          <p className="mt-1 font-sans text-[12px] text-sumi/40">
            store.auwa.life
          </p>

          {step !== "confirmed" && (
            <nav aria-label="Checkout progress" className="mt-8 flex flex-wrap items-center gap-2">
              {steps.map((s, i) => (
                <span key={s} className="flex items-center gap-2">
                  <span
                    className={`font-sans text-[12px] capitalize ${
                      i <= stepIndex ? "text-sumi" : "text-sumi/35"
                    }`}
                  >
                    {s}
                  </span>
                  {i < steps.length - 1 && (
                    <span aria-hidden="true" className="font-sans text-[12px] text-sumi/25">
                      ›
                    </span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {step === "information" && (
            <section className="mt-10">
              <h2 className="font-display text-[20px] text-sumi">Contact</h2>
              <MockField label="Email" value="tom@moreair.co" />

              <h2 className="mt-10 font-display text-[20px] text-sumi">
                Delivery
              </h2>

              <label className="mt-5 block">
                <span className="font-sans text-[12px] uppercase tracking-[0.14em] text-sumi/45">
                  Country
                </span>
                <select
                  value={dest.id}
                  onChange={(e) =>
                    setDest(
                      DESTINATIONS.find((d) => d.id === e.target.value) ??
                        DESTINATIONS[0]
                    )
                  }
                  className="mt-2 w-full cursor-pointer border-b border-sumi/20 bg-transparent pb-3 font-sans text-[16px] text-sumi focus:border-sumi/50 focus:outline-none"
                >
                  {DESTINATIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </label>
              <p className="mt-2 font-sans text-[12px] leading-[1.5] text-sumi/40">
                Change this to see the tax treatment change. It is the setting
                most likely to be wrong on day one.
              </p>

              <MockField label="Name" value="Tom Vining" />
              <MockField label="Address" value="1 Example Street" />
              <MockField label="City" value="London" />
              <MockField label="Postcode" value="N1 1AA" />

              <Advance onClick={() => setStep("shipping")}>
                Continue to shipping
              </Advance>
            </section>
          )}

          {step === "shipping" && (
            <section className="mt-10">
              <h2 className="font-display text-[20px] text-sumi">
                Shipping method
              </h2>
              <div className="mt-5 rounded-md border border-sumi/15 px-5 py-4">
                <div className="flex items-baseline justify-between gap-4">
                  <span className="font-sans text-[15px] text-sumi">
                    Tracked and signed for
                  </span>
                  <span className="font-sans text-[15px] text-sumi">
                    {money(dest.shipping)}
                  </span>
                </div>
                <p className="mt-2 font-sans text-[13px] leading-[1.5] text-sumi/50">
                  Dispatched two to three weeks after ordering. Each piece is
                  made once the order is placed.
                </p>
              </div>
              <p className="mt-4 font-sans text-[12px] leading-[1.5] text-sumi/40">
                Shipping rates come from Shopify shipping profiles, set per
                zone. International orders also generate the CN22 customs data
                automatically once that is switched on.
              </p>
              <Advance onClick={() => setStep("payment")}>
                Continue to payment
              </Advance>
              <Back onClick={() => setStep("information")} />
            </section>
          )}

          {step === "payment" && (
            <section className="mt-10">
              <h2 className="font-display text-[20px] text-sumi">Payment</h2>
              <div className="mt-5 rounded-md border border-sumi/15 px-5 py-5">
                <p className="font-sans text-[15px] text-sumi">
                  Shopify Payments
                </p>
                <p className="mt-2 font-sans text-[13px] leading-[1.6] text-sumi/55">
                  Card, Apple Pay and Shop Pay appear here. The card fields are
                  Shopify&rsquo;s, served inside their checkout, and card
                  details never pass through auwa.life or through any code we
                  write. That is most of the reason to use Shopify rather than
                  build this ourselves.
                </p>
                <p className="mt-4 font-sans text-[12px] leading-[1.5] text-sumi/40">
                  Deliberately not mocked up: drawing a fake card form here
                  would put the sensitive part of the flow in the wrong place
                  in your head.
                </p>
              </div>
              <Advance onClick={() => setStep("confirmed")}>
                Pay {money(total)}
              </Advance>
              <Back onClick={() => setStep("shipping")} />
            </section>
          )}

          {step === "confirmed" && (
            <section className="mt-10 max-w-[52ch]">
              <p className="font-sans text-[12px] uppercase tracking-[0.16em] text-sumi/45">
                Order #1001
              </p>
              <h2 className="mt-4 font-display text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.1] text-sumi">
                Thank you.
              </h2>
              <p className="mt-5 font-display text-[18px] leading-[1.65] text-sumi/60 md:text-[19px]">
                Your Auwa is number four of fifteen in the {finish} finish. It
                will be made, finished and packed over the next two to three
                weeks, and we will write when it is on its way.
              </p>

              <div className="mt-10 border-t border-sumi/10 pt-8">
                <p className="font-sans text-[12px] uppercase tracking-[0.16em] text-sumi/45">
                  What happens on our side
                </p>
                <ul className="mt-5 space-y-3 font-sans text-[14px] leading-[1.6] text-sumi/70">
                  <li>
                    The order appears in Shopify admin, and inventory for this
                    finish drops from fifteen to fourteen. That decrement is
                    atomic, which is the reason a numbered edition needs
                    Shopify rather than a payment link: two people buying the
                    last one at the same time cannot both succeed.
                  </li>
                  <li>
                    Shopify sends the confirmation email. That template needs
                    rewriting in our voice before launch, or it goes out
                    sounding like a generic shop.
                  </li>
                  <li>
                    The edition number is <strong>not</strong> automatic.
                    Shopify counts stock, it does not assign &ldquo;four of
                    fifteen&rdquo;. That is a manual step: allocate the next
                    number in sequence, write it on the card, stamp it on the
                    base, and record it. Worth deciding now who does it and
                    where the register lives, because a numbered edition with a
                    lost register is worth less on resale.
                  </li>
                </ul>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/store-preview"
                  className="border border-sumi/20 px-6 py-3 font-sans text-[12px] uppercase tracking-[0.16em] text-sumi transition-colors duration-300 hover:border-sumi/40"
                >
                  Back to the page
                </Link>
                <button
                  type="button"
                  onClick={() => setStep("information")}
                  className="cursor-pointer px-2 py-3 font-sans text-[12px] uppercase tracking-[0.16em] text-sumi/45 transition-colors duration-300 hover:text-sumi"
                >
                  Run it again
                </button>
              </div>
            </section>
          )}
        </div>

        {/* ── Right: the order summary Shopify shows throughout ── */}
        <aside className="border-t border-sumi/10 bg-paper px-6 py-10 lg:border-l lg:border-t-0 lg:px-8 lg:py-14">
          <div className="lg:sticky lg:top-14">
            <div className="flex items-start gap-4">
              <div className="relative h-[76px] w-[62px] shrink-0 overflow-hidden rounded-md bg-surface">
                <Image
                  src="/store/insitu-1.jpg"
                  alt=""
                  fill
                  sizes="62px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display text-[17px] leading-[1.3] text-sumi">
                  Auwa figure
                </p>
                <p className="mt-1 font-sans text-[13px] text-sumi/50">
                  {finish} &middot; First edition
                </p>
              </div>
              <p className="font-display text-[17px] text-sumi">
                {money(itemPrice)}
              </p>
            </div>

            <dl className="mt-8 space-y-3 border-t border-sumi/10 pt-6 font-sans text-[14px]">
              <Row label="Subtotal" value={money(itemPrice)} />
              <Row label="Shipping" value={money(dest.shipping)} />
            </dl>

            <div className="mt-6 flex items-baseline justify-between border-t border-sumi/10 pt-6">
              <span className="font-sans text-[15px] text-sumi">Total</span>
              <span className="font-display text-[24px] leading-none text-sumi">
                {money(total)}
              </span>
            </div>

            <p className="mt-3 font-sans text-[12px] leading-[1.5] text-sumi/45">
              {dest.export
                ? "Zero-rated export. The £30 of UK VAT inside the domestic price is not charged, so More Air nets the same £150 either way."
                : `Includes ${money(vatIncluded)} VAT. The £180 shelf price nets £150.`}
            </p>

            {dest.warning && (
              <p className="mt-4 rounded-md bg-surface px-4 py-3 font-sans text-[12px] leading-[1.6] text-sumi/60">
                {dest.warning}
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ─── Local primitives ─── */

/** A filled-in field. Read-only: this collects nothing and submits
 *  nowhere, it only shows what Shopify will ask for. */
function MockField({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-5">
      <span className="font-sans text-[12px] uppercase tracking-[0.14em] text-sumi/45">
        {label}
      </span>
      <p className="mt-2 border-b border-sumi/15 pb-3 font-sans text-[16px] text-sumi/70">
        {value}
      </p>
    </div>
  );
}

function Advance({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-10 w-full cursor-pointer bg-sumi px-6 py-4 font-sans text-[12px] uppercase tracking-[0.16em] text-surface transition-opacity duration-300 hover:opacity-85"
    >
      {children}
    </button>
  );
}

function Back({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 cursor-pointer font-sans text-[13px] text-sumi/45 transition-colors duration-300 hover:text-sumi"
    >
      &larr; Back
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between">
      <dt className="text-sumi/55">{label}</dt>
      <dd className="text-sumi">{value}</dd>
    </div>
  );
}
