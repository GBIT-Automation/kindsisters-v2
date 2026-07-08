import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Programs",
  description:
    "Essentials Relief Bags and Women's Community Connect — Kind Sisters' two programs supporting vulnerable families in Perth.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
