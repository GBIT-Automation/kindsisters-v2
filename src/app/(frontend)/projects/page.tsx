"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

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

const galleryImages = [
  { src: "/images/gallery/img_8046.jpg", alt: "Women's Community Connect group with the Perth skyline behind them", width: 1600, height: 1067 },
  { src: "/images/gallery/img_7887.jpg", alt: "Families receiving support at a community event", width: 800, height: 1200 },
  { src: "/images/gallery/img_6769.jpg", alt: "Volunteers with flowers at a Community Connect gathering", width: 1200, height: 800 },
  { src: "/images/gallery/primary-school-delivery.jpeg", alt: "Delivering essentials to a primary school", width: 900, height: 1200 },
  { src: "/images/gallery/img_7828.jpg", alt: "A group of women together outdoors", width: 1461, height: 913 },
  { src: "/images/gallery/img_1898.jpg", alt: "A community member holding a Kind Sisters tote bag", width: 374, height: 640 },
  { src: "/images/gallery/1661576444530263.jpg", alt: "Kind Sisters members at a community gathering", width: 1600, height: 1200 },
  { src: "/images/gallery/march-2025.jpg", alt: "March 2025 community gathering", width: 480, height: 640 },
  { src: "/images/gallery/40-families-first-ever.jpg", alt: "Relief bags packed for 40 families", width: 1200, height: 900 },
  { src: "/images/gallery/kellie.jpeg", alt: "A volunteer with a car full of relief bags", width: 552, height: 640 },
  { src: "/images/gallery/img_6702.jpg", alt: "Women at a Kind Sisters community event", width: 1200, height: 800 },
  { src: "/images/gallery/img_7841.jpg", alt: "A Community Connect gathering with the Perth skyline", width: 1600, height: 1000 },
  { src: "/images/gallery/bags-ready-for-delivery.jpeg", alt: "Bags packed and ready for delivery", width: 640, height: 480 },
  { src: "/images/gallery/11.2.23.jpg", alt: "Women gathered for a Kind Sisters community morning tea", width: 1024, height: 768 },
  { src: "/images/gallery/img_7942.jpg", alt: "A large community gathering under a tree", width: 1200, height: 800 },
  { src: "/images/gallery/img_4533.jpg", alt: "Women taking part in a community workshop", width: 640, height: 316 },
  { src: "/images/gallery/picture1.jpg", alt: "A community event bringing women together", width: 410, height: 307 },
  { src: "/images/gallery/hamper.jpg", alt: "Hygiene essentials packed into a relief bag", width: 320, height: 250 },
];

type GalleryImage = (typeof galleryImages)[number];

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

export default function ProjectsPage() {
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  useEffect(() => {
    if (!lightboxImage) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxImage(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxImage]);

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
          <div className="columns-1 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3 xl:columns-4">
            {galleryImages.map((img) => (
              <button
                key={img.src}
                onClick={() => setLightboxImage(img)}
                className="group relative mb-4 block w-full cursor-zoom-in break-inside-avoid overflow-hidden rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] transition-shadow duration-300 hover:shadow-[var(--shadow-md)] focus:outline-none focus-visible:ring-2 focus-visible:ring-kindness focus-visible:ring-offset-2 focus-visible:ring-offset-canvas"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-0 bg-trust/0 transition-colors duration-300 group-hover:bg-trust/15" />
                <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-canvas/95 text-trust opacity-0 shadow-[var(--shadow-sm)] transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-5.2-5.2m0 0A7.5 7.5 0 105.2 5.2a7.5 7.5 0 0010.6 10.6zM10.5 7.5v6m3-3h-6" />
                  </svg>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-trust/85 p-4 sm:p-8"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.alt}
        >
          <div className="relative" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              width={lightboxImage.width}
              height={lightboxImage.height}
              sizes="90vw"
              className="h-auto max-h-[85vh] w-auto max-w-[90vw] rounded-[var(--radius-lg)] object-contain shadow-[var(--shadow-lg)]"
            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -right-3 -top-3 flex h-11 w-11 items-center justify-center rounded-full bg-canvas text-trust shadow-[var(--shadow-md)] transition-colors hover:bg-kindness-whisper focus:outline-none focus-visible:ring-2 focus-visible:ring-kindness"
              aria-label="Close lightbox"
              autoFocus
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

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
