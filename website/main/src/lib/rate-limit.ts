/*
  Best-effort rate limiter for API routes.

  Uses an in-memory Map keyed by the caller's IP. Good for catching casual
  abuse (a single bot hammering the endpoint from one machine) on a low-
  traffic site running on a single serverless instance. For hardened
  rate-limiting under real load, migrate to Upstash Redis or Vercel KV so
  counters are shared across instances.
*/

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export function rateLimit({
  key,
  limit,
  windowMs,
}: {
  key: string;
  limit: number;
  windowMs: number;
}): { ok: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    const fresh: Bucket = { count: 1, resetAt: now + windowMs };
    buckets.set(key, fresh);
    return { ok: true, remaining: limit - 1, resetAt: fresh.resetAt };
  }

  if (existing.count >= limit) {
    return { ok: false, remaining: 0, resetAt: existing.resetAt };
  }

  existing.count += 1;
  return { ok: true, remaining: limit - existing.count, resetAt: existing.resetAt };
}

export function clientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "unknown";
}
