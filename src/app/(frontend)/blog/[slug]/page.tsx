import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPayloadClient } from "@/lib/payload";
import RichText from "@/components/RichText";
import type { Media } from "@/payload-types";

export const revalidate = 30;

type Params = { params: Promise<{ slug: string }> };

const formatDate = (value?: string | null): string | null => {
  if (!value) return null;
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Australia/Perth",
  }).format(new Date(value));
};

const heroOf = (image: number | Media | null | undefined) =>
  image && typeof image === "object" ? image : null;

async function getPost(slug: string) {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "blog",
    where: {
      slug: { equals: slug },
      _status: { equals: "published" },
    },
    limit: 1,
    depth: 1,
  });
  return docs[0] ?? null;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt || undefined,
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const hero = heroOf(post.heroImage);
  const date = formatDate(post.publishedDate);

  return (
    <div className="bg-earth">
      <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-kindness font-medium hover:text-kindness-deep transition-colors"
        >
          <svg
            className="mr-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          All posts
        </Link>

        <header className="mt-6">
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-trust">
            {post.title}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-trust-muted">
            {post.author && <span>{post.author}</span>}
            {post.author && date && <span aria-hidden>·</span>}
            {date && <span>{date}</span>}
          </div>
        </header>

        {hero?.url && (
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-md)]">
            <Image
              src={hero.url}
              alt={hero.alt || post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        )}

        {post.body && (
          <div className="mt-10">
            <RichText data={post.body} />
          </div>
        )}
      </article>
    </div>
  );
}
