/**
 * Structured data (JSON-LD) — single source of truth for the schema.org
 * nodes that repeat across the site.
 *
 * Two rules govern everything in here:
 *
 * 1. One Organization, referenced by @id. Every page used to inline its
 *    own copy of the Auwa organisation, which meant six places to update
 *    and six chances to drift. Pages now emit `organizationNode` once
 *    (root layout) and point at it with `ORG_REF` everywhere else, so
 *    Google resolves them all to a single entity rather than to several
 *    similarly-named ones.
 *
 * 2. Nothing is described that a visitor cannot reach. No Offer without
 *    a price the store can actually take, no ISBN on an unpublished
 *    book, no SoftwareApplication for the parked app. Structured data
 *    that overstates gets the whole site's markup distrusted.
 */

export const SITE_URL = "https://auwa.life";

/** Stable identity for the Auwa organisation across every page's graph. */
export const ORG_ID = `${SITE_URL}/#organization`;
export const SITE_ID = `${SITE_URL}/#website`;

/**
 * Pointer to the Organization node emitted in the root layout.
 *
 * Carries @type and name as well as @id. A bare { "@id" } is valid JSON-LD
 * and Google's crawler does merge it with the full node elsewhere on the
 * page, but the Rich Results test reads each block on its own and reports
 * "missing field publisher.name". Repeating two short fields costs nothing
 * and keeps the test clean.
 */
export const ORG_REF = { "@type": "Organization", "@id": ORG_ID, name: "Auwa" } as const;

const LOGO = {
  "@type": "ImageObject",
  url: `${SITE_URL}/auwa-logo.svg`,
  caption: "Auwa",
} as const;

/**
 * The two founders. Kept here rather than on /about alone so the Article
 * author on a journal post resolves to the same people as the founders
 * on the about page.
 */
export const RIEKO = {
  "@type": "Person",
  "@id": `${SITE_URL}/about#rieko`,
  name: "Rieko Maeda",
  alternateName: "Eko Maeda",
  jobTitle: "Creator",
  nationality: "Japanese",
  url: `${SITE_URL}/about`,
} as const;

export const TOM = {
  "@type": "Person",
  "@id": `${SITE_URL}/about#tom`,
  name: "Tom Vining",
  jobTitle: "Producer",
  nationality: "British",
  url: `${SITE_URL}/about`,
} as const;

/**
 * Resolve a byline string to the founder node, so an article author is the
 * same entity as the founder on /about rather than a loose name string.
 * Carries the name alongside the @id for the same reason as ORG_REF.
 */
export function personRef(name: string) {
  if (name === RIEKO.name || name === RIEKO.alternateName) {
    return { "@type": "Person", "@id": RIEKO["@id"], name: RIEKO.name, url: RIEKO.url };
  }
  if (name === TOM.name) {
    return { "@type": "Person", "@id": TOM["@id"], name: TOM.name, url: TOM.url };
  }
  return { "@type": "Person", name };
}

/**
 * The Organization node. Emitted once, in the root layout.
 *
 * `description` follows the current framing (a character and a
 * philosophy) rather than the old "Japanese lifestyle brand" line —
 * lifestyle brand describes the shelf, not the thing Auwa is.
 *
 * `sameAs` lists only profiles that are live and public. An empty or
 * parked handle in here is a broken entity signal, not a free backlink.
 */
export const organizationNode = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Auwa",
  alternateName: "あうわ",
  url: SITE_URL,
  logo: LOGO,
  image: `${SITE_URL}/og-image.jpg`,
  description:
    "Auwa is a character and a philosophy. An illustrated world by Rieko Maeda, rooted in the ancient Japanese belief that a life force resides in all things.",
  founder: [RIEKO, TOM],
  sameAs: [
    "https://instagram.com/auwalife",
    "https://x.com/auwalife",
    "https://www.threads.net/@auwalife",
    "https://bsky.app/profile/auwa.life",
    "https://www.pinterest.com/auwalife",
    "https://www.youtube.com/@auwalife",
    "https://linkedin.com/company/auwa",
  ],
};

/** The WebSite node. Emitted once, in the root layout, alongside the org. */
export const webSiteNode = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ID,
  name: "Auwa",
  url: SITE_URL,
  inLanguage: "en-GB",
  publisher: ORG_REF,
};

/**
 * Article schema for a journal post. This is the template that repeats,
 * so it carries the fields Google actually reads for article rich
 * results: a resolvable mainEntityOfPage, a dated author entity, and an
 * ImageObject rather than a bare URL string.
 *
 * `dateModified` is deliberately absent. The article records carry one
 * date, and inventing a modified date to fill the field is worse than
 * leaving it out.
 */
export function articleNode(article: {
  slug: string;
  title: string;
  seoTitle?: string;
  subtitle: string;
  description?: string;
  category: string;
  author: string;
  publishedAt: string;
  heroImage: string | null;
}) {
  const url = `${SITE_URL}/journal/${article.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: article.title,
    name: article.seoTitle ?? article.title,
    description: article.description ?? article.subtitle,
    articleSection: article.category,
    inLanguage: "en-GB",
    isAccessibleForFree: true,
    datePublished: article.publishedAt,
    author: personRef(article.author),
    publisher: ORG_REF,
    isPartOf: { "@id": `${SITE_URL}/journal#blog` },
    ...(article.heroImage && {
      image: {
        "@type": "ImageObject",
        url: `${SITE_URL}${article.heroImage}`,
        caption: article.title,
      },
    }),
  };
}
