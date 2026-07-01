import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import PullQuote from '@/components/PullQuote';

export const metadata: Metadata = {
  title: 'Get Involved',
};

const volunteerRoles = [
  {
    title: 'Bag Packing',
    description:
      'Help us sort, organise, and pack essentials relief bags for families in need. Sessions run regularly and are a great way to get started.',
  },
  {
    title: 'Event Support',
    description:
      "Assist at Women's Community Connect events — setting up, welcoming attendees, and helping everything run smoothly.",
  },
  {
    title: 'Deliveries',
    description:
      'Help deliver relief bags to local schools. A valid driver\'s licence and your own vehicle are needed.',
  },
  {
    title: 'Professional Skills',
    description:
      'Contribute your expertise in areas like marketing, photography, grant writing, bookkeeping, or web design.',
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="bg-earth">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[50vh] min-h-[400px]">
          <Image
            src="/images/gallery/img_7828.jpg"
            alt="Kind Sisters volunteers working together"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-warmth/30 to-trust/60" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto max-w-5xl w-full px-6 pb-12">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white">
                Get Involved
              </h1>
              <p className="mt-4 text-white/80 text-lg max-w-xl">
                Every hand, every hour, every act of kindness makes a
                difference
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Help */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-trust mb-4">
              Ways You Can Help
            </h2>
            <p className="text-trust-soft text-lg max-w-2xl mx-auto">
              Whether you have time, skills, or resources to share, there&apos;s
              a place for you in the Kind Sisters community.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-[var(--radius-lg)] bg-kindness-whisper p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-kindness-soft flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-kindness-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-trust mb-3">Donate</h3>
              <p className="text-trust-soft mb-6">
                Your financial support goes directly to packing relief bags
                and running community events. All donations over $2 are tax
                deductible.
              </p>
              <Link
                href="/donate"
                className="inline-block rounded-[var(--radius-full)] bg-kindness px-6 py-3 font-semibold text-white hover:bg-kindness-deep transition-colors"
              >
                Donate Now
              </Link>
            </div>

            <div className="rounded-[var(--radius-lg)] bg-warmth-glow p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-warmth/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-warmth-deep" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-trust mb-3">Volunteer</h3>
              <p className="text-trust-soft mb-6">
                Join our team of dedicated volunteers. No experience needed —
                just a willingness to help and a kind heart.
              </p>
              <a
                href="mailto:info@kindsisters.org.au?subject=Volunteer%20Interest"
                className="inline-block rounded-[var(--radius-full)] bg-warmth px-6 py-3 font-semibold text-white hover:bg-warmth-deep transition-colors"
              >
                Register Interest
              </a>
            </div>

            <div className="rounded-[var(--radius-lg)] bg-relief-soft p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-relief/20 flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-relief" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-serif text-xl text-trust mb-3">
                Donate Goods
              </h3>
              <p className="text-trust-soft mb-6">
                We accept non-perishable food items, hygiene products, and
                school supplies. Contact us to arrange a drop-off.
              </p>
              <Link
                href="/contact"
                className="inline-block rounded-[var(--radius-full)] bg-relief px-6 py-3 font-semibold text-white hover:bg-relief/80 transition-colors"
              >
                Get in Touch
              </Link>
            </div>
          </div>

          <PullQuote
            quote="Our families are so grateful for the support in the cost-of-living crisis."
            attribution="School Support Worker"
            className="mt-16"
          />
        </div>
      </section>

      {/* Volunteer Roles */}
      <section className="py-16 md:py-24 bg-canvas">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-trust text-center mb-12">
            Volunteer Roles
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {volunteerRoles.map((role) => (
              <div
                key={role.title}
                className="rounded-[var(--radius-lg)] bg-earth p-8 border-l-4 border-warmth"
              >
                <h3 className="font-serif text-xl text-trust mb-3">
                  {role.title}
                </h3>
                <p className="text-trust-soft leading-relaxed">
                  {role.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Containers for Change */}
      <section className="py-16 md:py-20 bg-relief-soft">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-serif text-3xl text-trust mb-4">
            Containers for Change
          </h2>
          <p className="text-trust-soft text-lg mb-6 max-w-2xl mx-auto">
            Recycle your eligible containers and donate the refund to Kind
            Sisters. Simply quote our scheme ID at any refund point.
          </p>
          <div className="inline-block rounded-[var(--radius-lg)] bg-canvas px-10 py-8 shadow-[var(--shadow-md)]">
            <p className="text-sm font-medium text-relief uppercase tracking-wider mb-2">
              Our Scheme ID
            </p>
            <p className="font-serif text-4xl md:text-5xl text-relief">
              C11083530
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-kindness-whisper text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-serif text-3xl text-trust mb-4">
            Ready to make a difference?
          </h2>
          <p className="text-trust-soft text-lg mb-8">
            Get in touch to learn more about how you can help Kind Sisters
            support families in our community.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-[var(--radius-full)] border-2 border-kindness px-8 py-3 font-medium text-kindness-deep hover:bg-kindness hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}
