import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Demo · The Beginning III | Auwa",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
