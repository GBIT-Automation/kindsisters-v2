import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Kind Sisters with a tax-deductible donation. Every dollar goes directly to helping vulnerable families in Perth with essential relief.",
};

export default function DonateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
