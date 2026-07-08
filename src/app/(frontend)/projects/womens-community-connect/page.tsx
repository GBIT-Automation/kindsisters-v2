import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Women's Community Connect",
  description:
    "Safe, inclusive events bringing women together for connection, support, and access to essential services in Perth.",
};

const serviceAreas = [
  {
    title: "Compassionate Community",
    description:
      "Creating a welcoming, judgement-free space where women can connect with others who understand their experiences and build lasting friendships.",
  },
  {
    title: "Practical Assistance",
    description:
      "Providing access to everyday essentials, emergency relief items, and tangible support that helps women and their families through difficult times.",
  },
  {
    title: "Information & Referrals",
    description:
      "Connecting women with trusted local agencies, services, and resources so they know where to turn when they need specialist help.",
  },
  {
    title: "Capacity Building",
    description:
      "Offering workshops and learning opportunities that help women develop new skills, build confidence, and strengthen their independence.",
  },
  {
    title: "Therapeutic Activities",
    description:
      "Hosting creative and restorative sessions — from art workshops to mindfulness — that support mental health and provide a moment of calm.",
  },
];

export default function WomensCommunityConnectPage() {
  return (
    <div className="bg-earth">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[50vh] min-h-[400px]">
          <Image
            src="/images/hero/women-multicultural.jpg"
            alt="Women gathering at a Kind Sisters Community Connect event"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-kindness/30 to-trust/60" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto max-w-5xl w-full px-6 pb-12">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white">
                Women&apos;s Community Connect Events
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-6 text-trust-soft text-lg leading-relaxed">
            <p>
              Women&apos;s Community Connect is where belonging begins. Our
              regular events bring women from all walks of life together in
              a warm, supportive environment. Whether someone is new to the
              area, going through a challenging time, or simply looking for
              connection, our gatherings offer something meaningful.
            </p>
            <p>
              Each event is thoughtfully designed around five core service
              areas that address the whole person — not just immediate needs
              but long-term wellbeing, confidence, and community belonging.
            </p>
            <p>
              We partner with local organisations and service providers to
              ensure women can access information, referrals, and practical
              support all in one place, without the barriers that often
              prevent people from seeking help.
            </p>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 md:py-24 bg-canvas">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-trust text-center mb-12">
            Our Five Service Areas
          </h2>
          <div className="space-y-6">
            {serviceAreas.map((area, index) => (
              <div
                key={area.title}
                className="rounded-[var(--radius-lg)] bg-earth p-8 flex gap-6 items-start"
              >
                <span className="shrink-0 w-10 h-10 rounded-full bg-kindness-soft flex items-center justify-center font-serif text-lg text-kindness-deep">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-serif text-xl text-trust mb-2">
                    {area.title}
                  </h3>
                  <p className="text-trust-soft leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <section className="py-16 md:py-20 bg-warmth-glow text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-serif text-3xl text-trust mb-4">
            Support women in our community
          </h2>
          <p className="text-trust-soft text-lg mb-8">
            Your donation helps us host more events, welcome more women, and
            build a stronger, more connected community.
          </p>
          <Link
            href="/donate"
            className="inline-block rounded-[var(--radius-full)] bg-warmth px-10 py-4 text-lg font-semibold text-white hover:bg-warmth-deep transition-colors"
          >
            Donate Now
          </Link>
        </div>
      </section>
    </div>
  );
}
