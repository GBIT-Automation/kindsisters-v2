import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[var(--trust)] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* ACNC Badge */}
          <div className="text-center md:text-left">
            <Image
              src="/images/icons/acnc-badge.jpg"
              alt="ACNC Registered Charity"
              width={80}
              height={80}
              className="mx-auto md:mx-0 rounded"
            />
            <p className="mt-3 text-xs text-white/60 leading-relaxed">
              ABN: 66666996738<br />
              Charitable Collections<br />
              Licence: #CC23638
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase mb-4 text-white/80">Contact Us</h4>
            <p className="text-sm text-white/70 mb-1">
              <a href="mailto:info@kindsisters.org.au" className="hover:text-[var(--kindness-soft)] transition-colors">
                info@kindsisters.org.au
              </a>
            </p>
            <p className="text-sm text-white/70 mb-4">PO Box 647 Duncraig 6023</p>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/kindsisterscommunity" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--kindness)] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="https://www.instagram.com/kind.sisters/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--kindness)] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.linkedin.com/company/kind-sisters" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--kindness)] transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold text-sm tracking-wider uppercase mb-4 text-white/80">Navigation</h4>
            <nav className="space-y-2" aria-label="Footer navigation">
              {[
                { href: '/', label: 'Home' },
                { href: '/about', label: 'About' },
                { href: '/projects', label: 'Projects' },
                { href: '/events', label: 'Events' },
                { href: '/get-involved', label: 'Get Involved' },
                { href: '/stories', label: 'Stories' },
                { href: '/blog', label: 'Blog' },
                { href: '/contact', label: 'Contact' },
                { href: '/donate', label: 'Donate' },
                { href: '/privacy', label: 'Privacy Policy' },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm text-white/70 hover:text-[var(--kindness-soft)] transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Acknowledgement of Country */}
          <div>
            <p className="text-xs text-white/60 leading-relaxed mb-3">
              We at Kind Sisters acknowledge the Traditional Owners of the land we operate in, the Noongar People and the Traditional Custodians of our main place of work, the Whadjuk People.
            </p>
            <p className="text-xs text-white/60 leading-relaxed mb-4">
              We pay respects to the Elders and leaders past, present and future for they hold the memories, the traditions and culture of this country.
            </p>
            <div className="flex gap-2">
              <Image src="/images/icons/aboriginal-flag.png" alt="Aboriginal Flag" width={48} height={28} />
              <Image src="/images/icons/torres-strait-flag.svg" alt="Torres Strait Islander Flag" width={48} height={28} />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/40">
            Australian Kind Sisters Ltd trading as Kind Sisters &copy; {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
