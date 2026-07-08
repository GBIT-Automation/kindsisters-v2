import type { Metadata } from "next";
import Link from "next/link";
import { getPayloadClient } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Stories of Hope",
  description:
    "Real voices from families, volunteers, and donors whose lives have been touched by Kind Sisters in Perth.",
};

export const revalidate = 30;

export default async function TestimonialsPage() {
  const payload = await getPayloadClient();
  const { docs: testimonials } = await payload.find({
    collection: "testimonials",
    where: { _status: { equals: "published" } },
    sort: "-createdAt",
    limit: 50,
  });

  return (
    <div className="bg-earth">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-kindness-whisper">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-trust">
            Stories of Hope
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-trust-soft">
            Real voices from the people whose lives have been touched by
            Kind Sisters
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="rounded-[var(--radius-lg)] bg-canvas p-8 shadow-[var(--shadow-sm)] border-l-4 border-kindness"
              >
                <svg
                  className="w-8 h-8 text-kindness-soft mb-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
                </svg>
                <blockquote className="text-trust-soft leading-relaxed mb-6">
                  {testimonial.quote}
                </blockquote>
                <div>
                  <p className="font-medium text-trust">{testimonial.role}</p>
                  {testimonial.date && (
                    <p className="text-sm text-trust-muted">
                      {testimonial.date}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-warmth-glow text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-serif text-3xl text-trust mb-4">
            Be part of a story that matters
          </h2>
          <p className="text-trust-soft text-lg mb-8">
            Every donation, every volunteer hour, every act of kindness
            creates another story of hope in our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/donate"
              className="inline-block rounded-[var(--radius-full)] bg-warmth px-10 py-4 text-lg font-semibold text-white hover:bg-warmth-deep transition-colors"
            >
              Donate Now
            </Link>
            <Link
              href="/get-involved"
              className="inline-block rounded-[var(--radius-full)] border-2 border-trust px-10 py-4 text-lg font-semibold text-trust hover:bg-trust hover:text-white transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
