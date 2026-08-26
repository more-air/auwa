"use client";

import { useState } from "react";
import { CtaLink } from "@/components/cta-link";
import { SignupForm } from "@/components/signup-form";
import {
  formatDropDate,
  formatPrice,
  remaining,
  type Figure,
} from "@/lib/commerce";

/*
  The product panel — the right-hand column of the split at the top of
  the page, and the whole reason a visitor can tell within a second
  that they have landed somewhere they can buy something.

  Structure follows 1X's Neo order page, which is the reference Tom
  picked: name, subtitle, selectable option cards, price, one primary
  action, all visible on arrival without scrolling. What Neo uses those
  two cards for is pricing tiers; we have one price and two finishes,
  so the cards carry the finishes. Same shape, honest content, and it
  avoids inventing a tier structure we don't have.

  Three DESIGNED states, not one state plus two fallbacks:

    upcoming  — the object, the price, the date, a notify capture.
                The page lives here longest, so it has to hold without
                a buy button at all.
    live      — buyable, with what's left stated plainly.
    sold-out  — dignified. "All claimed", not "out of stock".

  What deliberately ISN'T here, because the art-toy collector reads
  every one of them as amateur: countdown timers, urgency banners,
  discount codes, star ratings, "only 2 left!" nags. The edition size
  does that work honestly on its own.
*/

/** Small numbers read warmer written out. Above twenty, digits win. */
const WORDS = [
  "zero", "one", "two", "three", "four", "five", "six", "seven",
  "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen",
  "fifteen", "sixteen", "seventeen", "eighteen", "nineteen", "twenty",
];
function spell(n: number): string {
  return n <= 20 ? WORDS[n] : String(n);
}

export function BuyBlock({ figure }: { figure: Figure }) {
  const [selectedId, setSelectedId] = useState(figure.colourways[0].id);
  const selected =
    figure.colourways.find((c) => c.id === selectedId) ?? figure.colourways[0];

  return (
    <div className="mx-auto w-full max-w-[440px]">

      {/* Two lines, not three. The uppercase "FIRST EDITION" eyebrow
          that used to sit above the title made the lockup top-heavy and
          was redundant three times over: the finish cards state the
          edition size, the inclusions line states the numbering, and
          the facts section states it again.

          It still needs to register though, so it carries weight by
          TONE rather than by a badge or a rule — full-strength Sumi
          against the rest of the line at 55%. A pill or a coloured tag
          would read as retail; contrast inside one line reads as a
          book's title page, which is the right register for something
          signed and numbered. */}
      <h1 className="font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.1] tracking-[0.005em] text-sumi">
        Auwa
      </h1>
      <p className="mt-3 font-display text-[18px] leading-[1.5] text-sumi/60 md:text-[19px]">
        <span className="text-sumi">First edition</span>, hand-finished figure
      </p>

      {/* Finish cards. The selected one is raised onto Surface with a
          hairline; the other sits flat on Paper. Same treatment Neo
          uses to separate its two tiers, and it reads instantly as
          "these are the choices, this is the one you have". */}
      <div className="mt-8 overflow-hidden rounded-md bg-paper">
        {figure.colourways.map((c) => {
          const active = c.id === selected.id;
          const left = remaining(c);
          const claimed = figure.state !== "upcoming" && left === 0;
          return (
            <button
              key={c.id}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={`${c.label}${claimed ? ", all claimed" : ""}`}
              onClick={() => setSelectedId(c.id)}
              className="block w-full cursor-pointer px-5 py-5 text-left transition-colors duration-300"
              style={{
                backgroundColor: active
                  ? "var(--color-surface)"
                  : "transparent",
                boxShadow: active
                  ? "inset 0 0 0 1px color-mix(in oklch, var(--color-sumi) 12%, transparent)"
                  : "none",
                borderRadius: active ? "6px" : "0",
              }}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="flex items-center gap-2.5">
                  <span
                    aria-hidden="true"
                    className="block h-3.5 w-3.5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: c.swatch,
                      boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.12)",
                      opacity: claimed ? 0.35 : 1,
                    }}
                  />
                  <span className="font-display text-[19px] leading-none text-sumi">
                    {c.label}
                  </span>
                </span>
                <span className="font-display text-[19px] leading-none text-sumi">
                  {formatPrice(c.price)}
                </span>
              </div>
              <div className="mt-3 flex items-end justify-between gap-4">
                <span className="max-w-[24ch] font-sans text-[13px] leading-[1.5] text-sumi/50">
                  {c.note}
                </span>
                <span className="whitespace-nowrap font-sans text-[12px] tracking-[0.06em] text-sumi/45">
                  {figure.state === "live"
                    ? `${spell(left)} left`
                    : claimed
                    ? "All claimed"
                    : `Edition of ${spell(c.editionSize)}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* What every piece carries, whichever finish. Plain type rather
          than ticks or icons: these are facts about a made object, not
          features of a product. */}
      <p className="mt-6 font-sans text-[13px] leading-[1.7] text-sumi/50">
        Signed by Rieko and numbered, each figure arrives in a wooden box with
        a hand-written card.
      </p>

      {/* ── The action ── */}

      {figure.state === "upcoming" && (
        <div className="mt-8 border-t border-sumi/10 pt-8">
          {/* Same two-part shape as the sold-out line: state, then what
              to do about it. The date alone left the form beneath it
              unexplained — a bare email field under a date reads as an
              orphan, and "Notify me" on the button is doing too much
              work on its own. "Be notified" deliberately echoes the
              button's own word so the two read as one instruction. */}
          <p className="font-display text-[19px] leading-[1.5] text-sumi md:text-[20px]">
            Opens {formatDropDate(figure.opensAt)}. Be notified first.
          </p>
          <div className="mt-6">
            <SignupForm
              source="store"
              buttonText="Notify me"
              successMessage="We will write the morning it opens."
              className="w-full"
            />
          </div>
        </div>
      )}

      {figure.state === "live" && (
        <div className="mt-8 border-t border-sumi/10 pt-8">
          {selected.checkoutUrl ? (
            /* "solid" rather than the site-wide "primary": this is the
               one genuine commerce action on the site, and at rest it
               needs to read as the thing to press without the visitor
               having to hunt. Dark at rest, flooding back to Surface on
               hover — primary's mechanic run backwards. */
            <CtaLink
              href={selected.checkoutUrl}
              variant="solid"
              className="w-full"
            >
              Order now
            </CtaLink>
          ) : (
            /* No checkout URL means the commerce source is still the
               mock. Say so loudly rather than rendering a button that
               goes nowhere — a dead buy button is the one bug that
               must never reach the live page unnoticed. */
            <div className="flex flex-col items-center gap-3">
              <span className="w-full cursor-not-allowed border border-sumi/20 px-6 py-3 text-center font-sans text-[12px] uppercase tracking-[0.16em] text-sumi/30">
                Order now
              </span>
              <span className="font-sans text-[12px] uppercase tracking-[0.16em] text-sumi/45">
                Checkout not connected
              </span>
            </div>
          )}
          <p className="mt-5 font-sans text-[13px] leading-[1.6] text-sumi/50">
            Made to order, {spell(figure.leadTimeWeeks[0])} to{" "}
            {spell(figure.leadTimeWeeks[1])} weeks, because each one is sanded,
            finished and packed by hand. Price includes VAT.
          </p>
        </div>
      )}

      {figure.state === "sold-out" && (
        <div className="mt-8 border-t border-sumi/10 pt-8">
          {/* Says the state plainly, then the reason the capture form
              is here at all. An earlier version led on "Never reissued"
              to avoid echoing the cards, but paired with "another will
              follow" it read as a contradiction — the distinction
              between reissuing THIS edition and making a different one
              is too fine to carry in half a sentence. Clarity beats
              avoiding the repetition: "Sold out" is the plainest
              possible signal and nobody has to work it out. */}
          <p className="font-display text-[19px] leading-[1.5] text-sumi md:text-[20px]">
            Sold out. Another edition will follow.
          </p>
          <div className="mt-6">
            <SignupForm
              source="store"
              buttonText="Notify me"
              successMessage="We will write when the next one is ready."
              className="w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
}
