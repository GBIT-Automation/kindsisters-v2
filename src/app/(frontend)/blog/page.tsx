import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getPayloadClient } from "@/lib/payload";
import type { Media } from "@/payload-types";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "News and stories from Kind Sisters — updates on our relief-bag deliveries, community events, and the people we support in Perth.",
};

export const revalidate = 30;

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

export default async function BlogIndex() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "blog",
    where: { _status: { equals: "published" } },
    sort: "-publishedDate",
    limit: 50,
    depth: 1,
  });

  return (
    <div className="bg-earth">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-kindness-whisper">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-trust">
            Blog
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-trust-soft">
            News, updates, and stories from our community
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          {docs.length === 0 ? (
            <div className="mx-auto max-w-xl text-center">
              <p className="text-lg text-trust-soft">
                We&apos;re getting our first stories ready. Please check back
                soon.
              </p>
              <Link
                href="/get-involved"
                className="mt-6 inline-flex items-center text-kindness font-medium hover:text-kindness-deep transition-colors"
              >
                Get involved in the meantime
                <svg
                  className="ml-2 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {docs.map((post) => {
                const hero = heroOf(post.heroImage);
                const date = formatDate(post.publishedDate);
                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col rounded-[var(--radius-lg)] overflow-hidden bg-canvas shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow"
                  >
                    {hero?.url && (
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={hero.url}
                          alt={hero.alt || post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      {date && (
                        <span className="text-sm text-trust-muted">{date}</span>
                      )}
                      <h2 className="mt-2 font-serif text-xl md:text-2xl text-trust group-hover:text-kindness transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mt-3 text-trust-soft leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      <span className="mt-4 inline-flex items-center text-kindness font-medium">
                        Read more
                        <svg
                          className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
