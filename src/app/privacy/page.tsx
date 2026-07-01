import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
};

export default function PrivacyPage() {
  return (
    <div className="bg-earth">
      <section className="py-16 md:py-24 bg-kindness-whisper">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-trust">
            Privacy Policy
          </h1>
          <p className="mt-4 text-trust-soft">
            Last updated: April 2026
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-3xl px-6 prose-policy">
          <div className="space-y-10 text-trust-soft leading-relaxed">
            <div>
              <h2 className="font-serif text-2xl text-trust mb-4">
                About this policy
              </h2>
              <p>
                Australian Kind Sisters Ltd (ABN 66666996738), trading as Kind
                Sisters, is committed to protecting your privacy. This policy
                explains how we collect, use, and safeguard your personal
                information in accordance with the Australian Privacy Act 1988
                and the Australian Privacy Principles (APPs).
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-trust mb-4">
                Information we collect
              </h2>
              <p className="mb-3">
                We may collect the following personal information when you
                interact with us:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Name and contact details (email address, postal address)</li>
                <li>Donation and payment information</li>
                <li>Volunteer registration details</li>
                <li>Newsletter subscription preferences</li>
                <li>Messages you send through our contact form</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-trust mb-4">
                How we use your information
              </h2>
              <p className="mb-3">We use your personal information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process donations and issue tax-deductible receipts</li>
                <li>Respond to enquiries and communications</li>
                <li>Send newsletters and updates (with your consent)</li>
                <li>Coordinate volunteer activities</li>
                <li>Meet our obligations as an ACNC-registered charity</li>
              </ul>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-trust mb-4">
                Sharing your information
              </h2>
              <p>
                We do not sell, rent, or share your personal information with
                third parties for marketing purposes. We may share information
                with trusted service providers who assist us in operating our
                website and processing donations, but only to the extent
                necessary to perform those services.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-trust mb-4">
                Data security
              </h2>
              <p>
                We take reasonable steps to protect your personal information
                from misuse, interference, loss, and unauthorised access or
                disclosure. Donations are processed securely through our
                donation platform, Zeffy, and its payment processor, Stripe.
                Payment card information is entered directly with these providers
                and is not stored on our servers.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-trust mb-4">
                Your rights
              </h2>
              <p>
                You have the right to access, correct, or request deletion of
                your personal information at any time. You can unsubscribe from
                our newsletter at any time by clicking the unsubscribe link in
                any email, or by contacting us directly.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-trust mb-4">
                Cookies and analytics
              </h2>
              <p>
                Our website may use cookies and analytics tools to understand
                how visitors use our site. This information is collected
                anonymously and used to improve your experience. You can
                disable cookies through your browser settings.
              </p>
            </div>

            <div>
              <h2 className="font-serif text-2xl text-trust mb-4">
                Contact us
              </h2>
              <p>
                If you have any questions about this privacy policy or wish to
                make a complaint, please contact us at:
              </p>
              <p className="mt-3">
                <strong className="text-trust">Kind Sisters</strong>
                <br />
                Email:{' '}
                <a
                  href="mailto:info@kindsisters.org.au"
                  className="text-kindness hover:text-kindness-deep underline"
                >
                  info@kindsisters.org.au
                </a>
                <br />
                PO Box 647, Duncraig WA 6023
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
