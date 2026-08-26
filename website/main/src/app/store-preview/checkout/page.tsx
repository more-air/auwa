import { Suspense } from "react";
import { CheckoutSimulator } from "@/components/store/checkout-simulator";

/*
  Simulated Shopify checkout, reachable from the "Order now" button on
  /store-preview. Preview only — noindexed, covered by the
  /store-preview prefix in robots.ts, and deleted (not adapted) once
  the real Shopify cart permalink replaces it in the commerce mock.

  Suspense boundary is required: CheckoutSimulator reads the `finish`
  query parameter via useSearchParams, which opts the tree into
  client-side rendering and would otherwise fail the static build.
*/

export const metadata = {
  title: "Checkout simulation | Auwa",
  description: "Internal preview of the Auwa checkout handoff.",
  robots: { index: false, follow: false },
};

export default function CheckoutPreviewPage() {
  return (
    <main>
      <Suspense fallback={<div className="min-h-[100svh] bg-surface" />}>
        <CheckoutSimulator />
      </Suspense>
    </main>
  );
}
