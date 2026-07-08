import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Kind Sisters — volunteer, partner with us, or ask a question. Based in the City of Stirling, Perth WA.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
