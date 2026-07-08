import Image from 'next/image';
import SectionReveal from '@/components/SectionReveal';
import DonateButton from '@/components/DonateButton';
import ImpactCounter from '@/components/ImpactCounter';
import RotatingImpact from '@/components/RotatingImpact';
import ZeffyNewsletter from '@/components/ZeffyNewsletter';
import { getPayloadClient } from '@/lib/payload';

export const revalidate = 30;

export default async function Home() {
  const payload = await getPayloadClient();
  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    where: { _status: { equals: 'published' } },
    sort: '-createdAt',
    limit: 3,
  });

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-end overflow-hidden">
        <Image
          src="/images/hero/women-cafe.jpg"
          alt="Kind Sisters community members sharing a warm moment together"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--trust)]/90 via-[var(--trust)]/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24 w-full">
          <div className="max-w-2xl">
            <h1 className="font-[var(--font-dm-serif)] text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6">
              Creating space<br />for community.
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-lg mb-8">
              A grassroots nonprofit organisation dedicated to strengthening women as the gateway to stronger families and communities.
            </p>
            <div className="flex flex-wrap gap-4">
              <DonateButton size="lg" variant="primary" />
              <DonateButton size="lg" variant="outline" href="/projects" className="border-white text-white hover:bg-white hover:text-[var(--trust)]">
                Our Programs
              </DonateButton>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-3 gap-4 mt-12 max-w-xl">
            {[
              { value: '500+', label: 'Families Supported' },
              { value: '40+', label: 'Schools Reached' },
              { value: '1,000+', label: 'Relief Bags Delivered' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center border border-white/10">
                <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/60 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MISSION ===== */}
      <section className="py-16 md:py-20 bg-[var(--kindness-whisper)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <p className="text-[var(--kindness)] font-semibold text-sm tracking-wider uppercase mb-4">Our Mission</p>
            <p className="font-[var(--font-dm-serif)] text-2xl md:text-3xl text-[var(--trust)] leading-snug">
              To improve the quality of life of women, children and families by supporting essential needs, creating a sense of belonging in community and building personal capacity.
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ===== WHY WE EXIST ===== */}
      <section className="py-20 md:py-28 blend-to-warmth">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-[var(--kindness)] font-semibold text-sm tracking-wider uppercase mb-4">Why we exist</p>
                <h2 className="font-[var(--font-dm-serif)] text-3xl md:text-4xl lg:text-5xl text-[var(--trust)] leading-tight mb-6">
                  Tonight, a mum in Perth will skip dinner so her kids can eat.
                </h2>
                <p className="text-[var(--trust-soft)] text-lg leading-relaxed mb-4">
                  She arrived in Australia fleeing violence. She doesn&apos;t have toothpaste. Her children go to school without breakfast. She&apos;s too proud to ask for help — and too exhausted to know where to find it.
                </p>
                <p className="text-[var(--trust-soft)] text-lg leading-relaxed mb-6">
                  <strong className="text-[var(--trust)]">She&apos;s not a statistic. She&apos;s your neighbour.</strong> And right now, there are hundreds of women just like her across the City of Stirling and surrounding suburbs.
                </p>
                <div className="bg-[var(--kindness-whisper)] rounded-xl p-6 border-l-4 border-[var(--kindness)]">
                  <p className="text-[var(--trust)] font-medium italic text-lg">
                    &ldquo;The bags arrived at just the right time to help a parent struggling with her special-needs child.&rdquo;
                  </p>
                  <p className="text-[var(--kindness)] text-sm mt-2 font-semibold">— School Support Worker</p>
                </div>
              </div>
              <div className="relative">
                <Image
                  src="/images/hero/mother-daughter-asian.jpg"
                  alt="A daughter hugging her mother — the kind of moment your donation protects"
                  width={600}
                  height={450}
                  className="rounded-2xl shadow-[var(--shadow-lg)] object-cover w-full"
                />
                <div className="absolute -bottom-4 -left-4 bg-[var(--warmth)] text-white rounded-xl px-5 py-3 shadow-[var(--shadow-md)]">
                  <p className="text-2xl font-bold">Since 2022</p>
                  <p className="text-xs opacity-80">Serving our community</p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ===== WHAT WE DO ===== */}
      <section className="py-20 md:py-28 blend-warmth-to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <p className="text-[var(--warmth)] font-semibold text-sm tracking-wider uppercase mb-4">What we do</p>
              <h2 className="font-[var(--font-dm-serif)] text-3xl md:text-4xl text-[var(--trust)]">
                Two programs. Real impact.
              </h2>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-2 gap-8">
            <SectionReveal delay={0.1}>
              <a href="/projects/essentials-relief-bags" className="group block bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <Image src="/images/gallery/img_2446.jpg" alt="Essentials Relief Bags program" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--kindness)]/80 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 text-white text-2xl font-[var(--font-dm-serif)]">Essentials Relief Bags</h3>
                </div>
                <div className="p-6">
                  <p className="text-[var(--trust-soft)] leading-relaxed">Food and hygiene essentials delivered directly to families in need through local schools — discreetly, respectfully, and with care.</p>
                </div>
              </a>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <a href="/projects/womens-community-connect" className="group block bg-white rounded-2xl overflow-hidden shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                  <Image src="/images/hero/women-multicultural.jpg" alt="Women's Community Connect Events" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--warmth)]/80 to-transparent" />
                  <h3 className="absolute bottom-4 left-6 text-white text-2xl font-[var(--font-dm-serif)]">Women&apos;s Community Connect</h3>
                </div>
                <div className="p-6">
                  <p className="text-[var(--trust-soft)] leading-relaxed">Safe, inclusive events where women build connections, access support services, and develop confidence through community.</p>
                </div>
              </a>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* ===== IMPACT COUNTERS ===== */}
      <section className="py-20 blend-to-pink">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <h2 className="font-[var(--font-dm-serif)] text-3xl md:text-4xl text-[var(--trust)]">Our Impact</h2>
            </div>
            <ImpactCounter />
          </SectionReveal>
        </div>
      </section>

      {/* ===== STORIES OF HOPE ===== */}
      <section className="pt-20 md:pt-28 pb-10 md:pb-14 blend-pink-to-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionReveal>
            <div className="text-center mb-12">
              <p className="text-[var(--kindness)] font-semibold text-sm tracking-wider uppercase mb-4">Testimonials</p>
              <h2 className="font-[var(--font-dm-serif)] text-3xl md:text-4xl text-[var(--trust)]">Stories of Hope</h2>
            </div>
          </SectionReveal>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, i) => (
              <SectionReveal key={testimonial.id} delay={i * 0.1}>
                <div className="bg-white rounded-2xl p-8 shadow-[var(--shadow-sm)] border-l-4 border-[var(--kindness)] h-full flex flex-col">
                  <p className="text-[var(--trust-soft)] leading-relaxed flex-1 italic line-clamp-6">&ldquo;{testimonial.quote}&rdquo;</p>
                  <p className="mt-4 font-semibold text-[var(--kindness)]">{testimonial.role}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ROTATING IMPACT STATEMENT ===== */}
      <section className="py-6 md:py-8 bg-[var(--earth)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <RotatingImpact />
        </div>
      </section>

      {/* ===== DONATE CTA ===== */}
      <section className="py-20 md:py-28 bg-[var(--kindness)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="font-[var(--font-dm-serif)] text-3xl md:text-5xl text-white mb-6">
              You can change a family&apos;s week tonight.
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-2xl mx-auto">
              While you&apos;re reading this, a volunteer is packing a bag with rice, pasta, soap, and toothpaste for a family who has none. Your donation puts that bag in their hands. Every dollar goes direct. Tax deductible.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              {[
                { amount: '$10', impact: 'A child goes to school with a full belly and a toothbrush' },
                { amount: '$25', impact: 'A mum can wash her children\'s clothes and cook them dinner' },
                { amount: '$50', impact: 'A whole family receives a bag of essentials delivered with dignity' },
              ].map((item) => (
                <div key={item.amount} className="bg-white/15 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                  <p className="text-3xl font-bold text-white mb-2">{item.amount}</p>
                  <p className="text-white/70 text-sm">{item.impact}</p>
                </div>
              ))}
            </div>

            <DonateButton size="lg" variant="white" />

            <p className="mt-6 text-white/50 text-sm">
              Containers for Change ID: C11083530
            </p>
          </SectionReveal>
        </div>
      </section>

      {/* ===== SPONSORS CAROUSEL ===== */}
      <section className="py-12 bg-[var(--earth)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-black font-semibold text-sm tracking-wider uppercase mb-8 text-center">Our Supporters</p>
          <div className="relative">
            <div className="flex animate-scroll-x w-max">
              {[...Array(3)].map((_, setIndex) => (
                <div key={setIndex} className="flex shrink-0 items-center gap-16 px-8" aria-hidden={setIndex > 0}>
                  {[
                    { name: 'City of Stirling', logo: '/images/partners/city-of-stirling-logo.svg', url: 'https://www.stirling.wa.gov.au' },
                    { name: 'GBIT Automation', logo: '/images/partners/gbit-logo.png', url: 'https://gbit.au' },
                    { name: 'Sisters of Charity Inc', logo: '/images/partners/sisters-of-charity-logo.png', url: 'https://www.sistersofcharity.org.au', heightClass: 'h-24' },
                    { name: 'Street Smart Australia', logo: '/images/partners/street-smart-logo.jpg', url: 'https://streetsmartaustralia.org' },
                    { name: 'Relate Counselling', logo: '/images/partners/relate-counselling-logo.png', url: 'https://www.relatecounselling.com.au' },
                    { name: 'SJM Bookkeeping Pty Ltd', logo: null, url: null },
                    { name: 'Inner Wheel Society Scarborough', logo: '/images/partners/inner-wheel-scarborough-logo.png', url: 'https://innerwheelaustralia.org.au/clubs-directory/scarborough/' },
                    { name: 'Mens Shed Wanneroo', logo: '/images/partners/mens-shed-wanneroo-logo.webp', url: 'https://mensshed.org/shed/mens-shed-wanneroo' },
                    { name: 'Sudbury Community House', logo: '/images/partners/sudbury-community-house-logo.png', url: 'https://www.sudburyhouse.org.au/' },
                  ].map((sponsor) => (
                    <div key={`${setIndex}-${sponsor.name}`} className="flex-shrink-0">
                      {sponsor.url ? (
                        <a href={sponsor.url} target="_blank" rel="noopener noreferrer" title={sponsor.name}>
                          {sponsor.logo ? (
                            <img src={sponsor.logo} alt={sponsor.name} className={`${('heightClass' in sponsor && sponsor.heightClass) || 'h-16'} w-auto object-contain`} />
                          ) : (
                            <span className="text-black text-base font-semibold whitespace-nowrap hover:text-[var(--kindness)] transition-colors">{sponsor.name}</span>
                          )}
                        </a>
                      ) : (
                        sponsor.logo ? (
                          <img src={sponsor.logo} alt={sponsor.name} className={`${('heightClass' in sponsor && sponsor.heightClass) || 'h-16'} w-auto object-contain`} />
                        ) : (
                          <span className="text-black text-base font-semibold whitespace-nowrap">{sponsor.name}</span>
                        )
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER ===== */}
      <section className="py-20 blend-cream-to-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionReveal>
            <h2 className="font-[var(--font-dm-serif)] text-3xl text-[var(--trust)] mb-3">Stay Connected</h2>
            <p className="text-[var(--trust-soft)] mb-8">Keep up to date with the positive impact Kind Sisters is making in the lives of vulnerable women and children, with the latest news, stories and events sent directly to your inbox.</p>
            <ZeffyNewsletter />
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
