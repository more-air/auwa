/**
 * Commerce interface.
 *
 * The store pages consume ONLY the types and the `commerce` object
 * exported from this file. They never import Shopify, never hold a
 * token, and never know which implementation is behind the call. That
 * keeps the eventual swap (mock → Shopify, and later Buy Button →
 * Storefront API) to a single file rather than a page rewrite.
 *
 * Implementations live alongside:
 *   mock.ts        — placeholder data, used while the figure is being
 *                    finished and no Shopify account exists yet.
 *   shopify.ts     — added once Tom hands over the store domain and
 *                    the variant IDs (see context/website/store.md).
 *
 * Swap by changing the one import at the bottom of this file.
 */

/**
 * Where the edition is in its cycle. All three are DESIGNED states,
 * not error states — the page has to be beautiful in every one of
 * them, and it will live in "upcoming" the longest.
 */
export type DropState = "upcoming" | "live" | "sold-out";

/**
 * One colourway of the figure.
 *
 * Numbering runs WITHIN a colourway, not across the whole edition
 * ("Natural, 1 of 15" rather than a shared 1-30 sequence). Cleaner to
 * read, and it gives two sell-out moments instead of one.
 */
export interface Colourway {
  /** Stable key used for selection state and analytics. */
  id: string;
  /** Shown in the selector. */
  label: string;
  /** One short line under the selector once chosen. */
  note: string;
  /** Swatch fill — a CSS colour sampled from the finished piece. */
  swatch: string;
  /** Total pieces in this colourway. Never reissued. */
  editionSize: number;
  /** Pieces already claimed. `editionSize - claimed` is what's left. */
  claimed: number;
  /**
   * VAT-INCLUSIVE price in GBP. More Air is VAT registered, so 20%
   * applies from the first UK sale and every price on the site must
   * already contain it. A £180 shelf price nets £150.
   */
  price: number;
  /**
   * Where the buy button sends the customer. In production this is a
   * Shopify cart permalink (`/cart/{variantId}:1`), which lands
   * straight on the hosted checkout. Empty string while mocked.
   */
  checkoutUrl: string;
}

export interface Figure {
  title: string;
  state: DropState;
  /** ISO date the drop opens. Drives the date line in "upcoming". */
  opensAt: string;
  colourways: Colourway[];
  /** Made-to-order lead time, in weeks, as [min, max]. */
  leadTimeWeeks: [number, number];
  /** Plain-language size, including the base. */
  dimensions: string;
  /** Material name as it appears in the practical facts. */
  material: string;
}

export interface CommerceSource {
  getFigure(): Promise<Figure>;
}

/** Pieces left in a colourway. */
export function remaining(c: Colourway): number {
  return Math.max(0, c.editionSize - c.claimed);
}

/** "£180" — no trailing zeros on whole pounds, which is how the art-toy
 *  market writes prices. £180.50 would render as "£180.50". */
export function formatPrice(pounds: number): string {
  return pounds % 1 === 0
    ? `£${pounds}`
    : `£${pounds.toFixed(2)}`;
}

/** "17 November" — no year, because the drop is always this year. */
export function formatDropDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
  });
}

// ─── Active implementation ───
// Change this line (and only this line) when Shopify goes live.
export { mockCommerce as commerce } from "./mock";
