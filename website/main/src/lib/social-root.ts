import path from "node:path";

/**
 * The folder that directly contains the Instagram pillar dirs (0-brand,
 * 1-book, 2-store, 3-journal, 4-app) plus _scripts / _assets / _resize.
 *
 * Single source of truth for the internal /instagram planning dashboard and
 * its sibling API routes. By default this points at the repo's committed
 * `social/instagram`, but the actual post media + captions now live in the
 * shared Dropbox `social` folder (mirrored across Tom's and Rieko's Macs), so
 * set AUWA_SOCIAL_ROOT in .env.local to that absolute path to read from there:
 *
 *   AUWA_SOCIAL_ROOT="/Users/<you>/Dropbox/3 venture/auwa/social"
 *
 * Note the Dropbox layout has NO `instagram` nesting level — pillars sit
 * directly under `social` — which is why the value points at `.../social`
 * and the image URLs no longer carry an `instagram/` segment. This is a
 * local-dev-only tool (it reads the filesystem at request time), so a
 * machine-specific absolute path in the gitignored .env.local is the right
 * home for it rather than tracked source.
 */
const REPO_SOCIAL = path.resolve(process.cwd(), "..", "..", "social", "instagram");

export const SOCIAL_ROOT = process.env.AUWA_SOCIAL_ROOT?.trim() || REPO_SOCIAL;
