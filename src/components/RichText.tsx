"use client";

import { RichText as LexicalRichText } from "@payloadcms/richtext-lexical/react";
import type { Blog } from "@/payload-types";

// Renders a Payload lexical rich-text field. Styling for the output elements
// lives under `.blog-body` in globals.css.
export default function RichText({ data }: { data: NonNullable<Blog["body"]> }) {
  return <LexicalRichText data={data} className="blog-body" />;
}
