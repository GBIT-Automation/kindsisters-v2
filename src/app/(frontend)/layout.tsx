import type { Metadata } from 'next';
import { DM_Sans, DM_Serif_Display } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ExitIntentPopup from '@/components/ExitIntentPopup';

const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Kind Sisters — Creating Space for Community',
    template: '%s | Kind Sisters',
  },
  description: 'Kind Sisters is a grass-roots nonprofit dedicated to serving vulnerable women and children in the City of Stirling and surrounding areas in Perth, Western Australia.',
  openGraph: {
    title: 'Kind Sisters — Creating Space for Community',
    description: 'Supporting vulnerable communities through essential relief and connection programs.',
    type: 'website',
    locale: 'en_AU',
  },
  // Third layer, after the X-Robots-Tag header and robots.txt: the meta tag is
  // what a crawler honours if it reaches a page from a link rather than a
  // crawl. Production is left untouched so the live site indexes normally.
  ...(process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') === 'https://kindsisters.org.au'
    ? {}
    : { robots: { index: false, follow: false, nocache: true } }),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={`${dmSans.variable} ${dmSerif.variable}`}>
      <body className="font-[var(--font-dm-sans)] bg-[var(--earth)] text-[var(--trust)] antialiased min-h-screen flex flex-col">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <ExitIntentPopup />
      </body>
    </html>
  );
}
