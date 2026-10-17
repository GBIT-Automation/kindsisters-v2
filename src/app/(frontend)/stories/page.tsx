import type { Metadata } from "next";
import Image from "next/image";
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
          {/* A loose pile of prints: KS's own delivery photos underneath, and on top two
              KS volunteers on a school delivery (Jody has their consent, 17 Oct 2026). */}
          <figure className="mt-12 mx-auto w-full max-w-[210px] md:max-w-[280px]">
            <div className="relative">
              {[
                { src: "/images/gallery/img_7942.jpg", tilt: "rotate-[16deg] translate-x-9 md:translate-x-24 translate-y-8 scale-90" },
                { src: "/images/gallery/1661576443217546.jpg", tilt: "-rotate-[17deg] -translate-x-9 md:-translate-x-24 translate-y-10 scale-90" },
                { src: "/images/gallery/40-families-first-ever.jpg", tilt: "-rotate-[11deg] -translate-x-8 md:-translate-x-20 -translate-y-1" },
                { src: "/images/gallery/img_2446.jpg", tilt: "rotate-[10deg] translate-x-8 md:translate-x-20 -translate-y-3" },
                { src: "/images/gallery/hamper.jpg", tilt: "-rotate-[5deg] translate-x-5 md:translate-x-10 translate-y-5" },
                { src: "/images/gallery/bags-ready-for-delivery.jpeg", tilt: "rotate-[5deg] -translate-x-4 md:-translate-x-8 -translate-y-4" },
              ].map((print) => (
                <div
                  key={print.src}
                  aria-hidden="true"
                  className={`absolute inset-0 bg-white p-2 pb-8 rounded-sm shadow-[var(--shadow-md)] ${print.tilt}`}
                >
                  <div className="relative h-full w-full overflow-hidden">
                    <Image src={print.src} alt="" fill sizes="280px" className="object-cover" />
                  </div>
                </div>
              ))}
              <div className="relative bg-white p-2 pb-8 rounded-sm shadow-[var(--shadow-lg)] -rotate-[2deg]">
                <Image
                  src="/images/gallery/volunteers-school-delivery.jpg"
                  alt="Two Kind Sisters volunteers with trolleys of relief bags on a school delivery"
                  width={900}
                  height={1200}
                  preload
                  className="w-full aspect-[3/4] object-cover"
                />
              </div>
            </div>
            <figcaption className="mt-16 text-xs text-trust-muted">
              Two of our volunteers on a school delivery
            </figcaption>
          </figure>
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
