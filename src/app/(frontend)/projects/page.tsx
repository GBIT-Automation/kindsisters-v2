import Image from "next/image";
import Link from "next/link";
import Gallery, { type GalleryImage } from "@/components/Gallery";
import { getPayloadClient } from "@/lib/payload";

const featuredPrograms = [
  {
    title: "Essentials Relief Bags",
    href: "/projects/essentials-relief-bags",
    photo: "/images/gallery/img_2446.jpg",
    description:
      "We deliver bags filled with food and hygiene products to families in need through local schools in the Mirrabooka area. These bags provide dignity and relief when it matters most.",
  },
  {
    title: "Women's Community Connect",
    href: "/projects/womens-community-connect",
    photo: "/images/hero/women-multicultural.jpg",
    description:
      "Our community events bring women together for connection, practical support, and access to essential services. Every gathering is a chance to build strength and belonging.",
  },
];

const supportNetwork = [
  { name: "WA Connect", phone: null, website: "https://waconnect.org.au/" },
  { name: "Crisis Care", phone: "1800 199 008", website: null },
  { name: "Salvation Army", phone: "13 72 58", website: null },
  { name: "Anglicare WA", phone: "1300 114 446", website: null },
  { name: "St Vinnies", phone: "1300 794 054", website: null },
  { name: "MercyCare", phone: null, website: "https://www.mercycare.com.au/" },
  { name: "Uniting WA", phone: null, website: "https://unitingwa.org.au/" },
  { name: "Centrecare", phone: "9325 6644", website: null },
  { name: "Ruah", phone: "13 78 24", website: null },
  { name: "Mission Australia", phone: null, website: "https://www.missionaustralia.com.au/" },
  { name: "Foodbank WA", phone: null, website: "https://www.foodbank.org.au/WA/" },
  { name: "MCCO", phone: null, website: null },
  { name: "No Limits Perth", phone: null, website: null },
  { name: "Family Line", phone: "1800 050 321", website: null },
];

// Revalidate so photos Jody publishes in the CMS appear on the site within
// the window without a rebuild.
export const revalidate = 30;

export default async function ProjectsPage() {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "gallery",
    where: { _status: { equals: "published" } },
    limit: 100,
    sort: "-createdAt",
    depth: 0,
  });

  const images: GalleryImage[] = docs
    .filter((d) => d.url && d.width && d.height)
    .map((d) => ({
      src: d.url as string,
      alt: d.alt,
      width: d.width as number,
      height: d.height as number,
    }));

  return (
    <div className="bg-earth">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-kindness-whisper">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-trust">
            Our Programs
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-trust-soft">
            Practical support, genuine connection, and community strength
          </p>
        </div>
      </section>

      {/* Featured Programs */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 md:grid-cols-2">
            {featuredPrograms.map((program) => (
              <Link
                key={program.title}
                href={program.href}
                className="group rounded-[var(--radius-lg)] overflow-hidden bg-canvas shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-shadow"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={program.photo}
                    alt={program.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-8">
                  <h2 className="font-serif text-2xl md:text-3xl text-trust group-hover:text-kindness transition-colors">
                    {program.title}
                  </h2>
                  <p className="mt-4 text-trust-soft leading-relaxed">
                    {program.description}
                  </p>
                  <span className="mt-6 inline-flex items-center text-kindness font-medium">
                    Learn more
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
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-16 md:py-24 bg-canvas">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-trust">
              Gallery
            </h2>
            <p className="mt-3 max-w-2xl text-trust-soft">
              Moments from our relief-bag deliveries and Women&apos;s Community
              Connect events. Tap any photo to view it larger.
            </p>
          </div>
          <Gallery images={images} />
        </div>
      </section>

      {/* Local Support Network */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-trust text-center mb-4">
            Local Support Network
          </h2>
          <p className="text-center text-trust-soft text-lg mb-12 max-w-2xl mx-auto">
            Kind Sisters works alongside these trusted agencies. If you or
            someone you know needs help, please reach out.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {supportNetwork.map((agency) => (
              <div
                key={agency.name}
                className="rounded-[var(--radius-md)] bg-canvas p-5 shadow-[var(--shadow-sm)] flex items-center justify-between"
              >
                <span className="font-medium text-trust">{agency.name}</span>
                <div className="flex items-center gap-3">
                  {agency.phone && (
                    <a
                      href={`tel:${agency.phone.replace(/\s/g, "")}`}
                      className="text-kindness hover:text-kindness-deep transition-colors text-sm font-medium"
                    >
                      {agency.phone}
                    </a>
                  )}
                  {agency.website && (
                    <a
                      href={agency.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-warmth hover:text-warmth-deep transition-colors"
                      aria-label={`Visit ${agency.name} website`}
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
