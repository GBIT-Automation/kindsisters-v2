import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-earth min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-6 py-20">
        <h1 className="font-serif text-6xl md:text-8xl text-kindness mb-4">404</h1>
        <h2 className="font-serif text-2xl md:text-3xl text-trust mb-4">
          Page not found
        </h2>
        <p className="text-trust-soft text-lg mb-8 max-w-md mx-auto">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or no longer exists.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-block rounded-[var(--radius-full)] bg-kindness px-8 py-3 font-semibold text-white hover:bg-kindness-deep transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/contact"
            className="inline-block rounded-[var(--radius-full)] border-2 border-trust px-8 py-3 font-semibold text-trust hover:bg-trust hover:text-white transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
