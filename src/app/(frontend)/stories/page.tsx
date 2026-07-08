import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stories of Hope",
  description:
    "Real voices from families, volunteers, and donors whose lives have been touched by Kind Sisters in Perth.",
};

const testimonials = [
  {
    name: "Primary School Support Worker",
    context: "June 2026",
    quote:
      "The response from families has been overwhelmingly positive, and everyone was incredibly grateful for the support. Many shared that the bags arrived at exactly the right time and made a real difference. One mum, in particular, said how thankful she was for the laundry detergent. Her special needs son needs his bedding washed almost every day, so it is an item she uses all the time. She said receiving it was a huge help. Thanks so much for your effort and for making such a meaningful difference to the families in our school community.",
  },
  {
    name: "Senior Multicultural Support Worker",
    context: "October 2025",
    quote:
      "At our school we have a high number of students who come from a refugee background who experience adversity and are very vulnerable. The essentials bags provided are crucial in minimising the cost of groceries for our families. The items provided in these bags are not available from any other support service and our families struggle to afford these basic necessities. Our school community receives these items on a regular basis and we distribute to those in need, particularly single parent households and families who have escaped family and domestic violence. We are so grateful that you provide for the practical needs of our children and families.",
  },
  {
    name: "School Support Worker",
    context: "March 2026",
    quote:
      "I dropped off the bags to some of our most vulnerable families. They commented that the items in the essentials bags were so useful and they were so pleased for the support as these are items they just can't afford in the cost-of-living crisis.",
  },
];

export default function TestimonialsPage() {
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
                key={testimonial.name}
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
                  <p className="font-medium text-trust">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-trust-muted">
                    {testimonial.context}
                  </p>
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
