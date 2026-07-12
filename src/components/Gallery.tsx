"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

// Masonry photo grid + lightbox. Prop-driven so the page can feed it images
// from the CMS. Markup, lightbox behaviour, Escape handling, and focus rings
// are unchanged from the original hardcoded gallery.
export default function Gallery({ images }: { images: GalleryImage[] }) {
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
    <>
      <div className="columns-1 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3 xl:columns-4">
        {images.map((img) => (
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

      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-trust/85 p-4 sm:p-8"
          onClick={() => setLightboxImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label={lightboxImage.alt}
        >
          <div
            className="relative h-[85vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage.src}
              alt={lightboxImage.alt}
              fill
              sizes="(max-width: 896px) 90vw, 896px"
              className="object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]"
            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -right-3 -top-3 flex h-11 w-11 items-center justify-center rounded-full bg-canvas text-trust shadow-[var(--shadow-md)] transition-colors hover:bg-kindness-whisper focus:outline-none focus-visible:ring-2 focus-visible:ring-kindness"
              aria-label="Close lightbox"
              autoFocus
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
