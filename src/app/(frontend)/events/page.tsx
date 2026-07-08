import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Events',
};

export default function EventsPage() {
  return (
    <div className="bg-earth">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-warmth-glow">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-trust">
            Events
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-trust-soft">
            Join us at our upcoming community events and gatherings
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-serif text-3xl text-trust mb-8">
            Upcoming Events
          </h2>
          <div className="rounded-[var(--radius-lg)] bg-canvas p-10 text-center shadow-[var(--shadow-sm)]">
            <div className="w-16 h-16 rounded-full bg-warmth-glow flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-8 h-8 text-warmth"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="font-serif text-2xl text-trust mb-3">
              Stay tuned
            </h3>
            <p className="text-trust-soft text-lg mb-6 max-w-md mx-auto">
              We&apos;re planning our next Women&apos;s Community Connect
              event. Follow us on social media or subscribe to our newsletter
              to be the first to know.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://www.facebook.com/kindsisterscommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-full)] bg-warmth px-6 py-3 font-semibold text-white hover:bg-warmth-deep transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
                Follow on Facebook
              </a>
              <a
                href="https://www.instagram.com/kind.sisters/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-full)] border-2 border-kindness px-6 py-3 font-semibold text-kindness-deep hover:bg-kindness hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Regular Programs */}
      <section className="py-16 md:py-24 bg-canvas">
        <div className="mx-auto max-w-4xl px-6">
          <h2 className="font-serif text-3xl text-trust text-center mb-12">
            Our Regular Programs
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            <Link
              href="/projects/womens-community-connect"
              className="group rounded-[var(--radius-lg)] bg-earth p-8 hover:shadow-[var(--shadow-md)] transition-all"
            >
              <h3 className="font-serif text-xl text-trust group-hover:text-kindness transition-colors mb-3">
                Women&apos;s Community Connect
              </h3>
              <p className="text-trust-soft leading-relaxed mb-4">
                Regular community events bringing women together for
                connection, support, and access to essential services.
              </p>
              <span className="inline-flex items-center text-kindness font-medium text-sm">
                Learn more
                <svg
                  className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            <Link
              href="/projects/essentials-relief-bags"
              className="group rounded-[var(--radius-lg)] bg-earth p-8 hover:shadow-[var(--shadow-md)] transition-all"
            >
              <h3 className="font-serif text-xl text-trust group-hover:text-kindness transition-colors mb-3">
                Essentials Relief Bags
              </h3>
              <p className="text-trust-soft leading-relaxed mb-4">
                Ongoing program delivering bags of food and hygiene essentials
                to families through local schools.
              </p>
              <span className="inline-flex items-center text-kindness font-medium text-sm">
                Learn more
                <svg
                  className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
