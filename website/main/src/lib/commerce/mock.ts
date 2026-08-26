import type { CommerceSource, Figure } from "./index";

/*
  Placeholder figure data.

  Everything marked PLACEHOLDER below is a real open decision, not a
  guess we've settled on. Do not let any of these numbers reach the
  live /store page:

  Updated 26 Aug 2026 from the figure production session. The spec is
  now settled in context/business/figure.md; what is left below is
  genuinely open.

  - price        — £220 is the RECOMMENDATION, not Tom's confirmed
                   number. Reasoning in figure.md → PRICE: ~£29 of
                   materials plus ~2 hours of Rieko's hands per unit
                   means £180 loses money against her day rate. Floor
                   is £195. Confirm before anything is published.
  - opensAt      — target is mid-November 2026, week not fixed.
  - editionSize  — 15 + 15 is settled, but see the black-Auwa question
                   in figure.md: if the black becomes a character in
                   the books rather than a finish, these become two
                   products, not two colourways.

  SETTLED, no longer placeholder: material (Bambu PLA Wood; allPHA and
  PLA Basic Black both rejected), finish (sanded not fuzzy, waxed not
  oiled, the Sumi stained rather than painted), dimensions (10cm on a
  9cm turned wooden base), edition of 30 made to order.
*/

const figure: Figure = {
  title: "Auwa",
  // Set to "live" so the order flow is walkable in the preview. In
  // production this is derived from Shopify inventory and the drop
  // date, not set by hand. The preview switcher overrides it anyway.
  state: "live",
  opensAt: "2026-11-17", // PLACEHOLDER
  leadTimeWeeks: [2, 3],
  dimensions: "10cm tall on a 9cm base",
  material: "Wood composite, hand sanded and waxed",
  colourways: [
    {
      id: "natural",
      label: "Natural",
      // The undecorated form is the canonical one: in the stories
      // Auwa's light reveals what is already inside a thing, and the
      // whole collaboration programme rests on a blank an artist can
      // reveal. Natural leads; Sumi is the second option, not an
      // equal one.
      note: "The blank form. Wood grain visible under the finish.",
      swatch: "#E8DCC4",
      editionSize: 15,
      claimed: 0,
      price: 220, // RECOMMENDED, not confirmed — VAT inclusive
      // Simulated checkout. In production this is a Shopify cart
      // permalink — `https://store.auwa.life/cart/{variantId}:1` —
      // which lands straight on the hosted checkout.
      checkoutUrl: "/store-preview/checkout?finish=natural",
    },
    {
      id: "sumi",
      label: "Sumi",
      note: "Stained near-black by hand, the grain still showing through.",
      swatch: "#1C1C1A",
      editionSize: 15,
      claimed: 0,
      price: 220, // RECOMMENDED, not confirmed — VAT inclusive
      checkoutUrl: "/store-preview/checkout?finish=sumi",
    },
  ],
};

export const mockCommerce: CommerceSource = {
  async getFigure() {
    return figure;
  },
};
