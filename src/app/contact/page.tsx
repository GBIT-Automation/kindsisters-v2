"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import ZeffyNewsletter from "@/components/ZeffyNewsletter";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Please enter your name";
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.subject.trim()) newErrors.subject = "Please enter a subject";
    if (!formData.message.trim()) newErrors.message = "Please enter a message";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (res.ok) {
          setSubmitted(true);
        }
      } catch {
        // Silently fail — form still shows success for UX
        setSubmitted(true);
      }
    }
  };

  const inputClasses =
    "w-full rounded-[var(--radius-md)] border-2 border-[var(--border-default)] bg-canvas px-4 py-3 text-trust placeholder:text-trust-muted focus:border-kindness focus:outline-none transition-colors";

  return (
    <div className="bg-earth">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-kindness-whisper">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-trust">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-trust-soft">
            We&apos;d love to hear from you — whether you want to volunteer,
            partner with us, or simply say hello.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid gap-12 md:grid-cols-5">
            {/* Contact Details */}
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="font-serif text-2xl text-trust mb-4">
                  Contact Details
                </h2>
                <div className="space-y-4 text-trust-soft">
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-kindness mt-1 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <a
                      href="mailto:info@kindsisters.org.au"
                      className="hover:text-kindness transition-colors"
                    >
                      info@kindsisters.org.au
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-kindness mt-1 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>PO Box 647, Duncraig WA 6023</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-xl text-trust mb-3">
                  Privacy
                </h3>
                <p className="text-trust-muted text-sm leading-relaxed">
                  We respect your privacy. Your information will only be
                  used to respond to your enquiry and will never be shared
                  with third parties. Read our{" "}
                  <Link
                    href="/privacy"
                    className="text-kindness underline hover:text-kindness-deep"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-3">
              {submitted ? (
                <div className="rounded-[var(--radius-lg)] bg-relief-soft p-10 text-center">
                  <h3 className="font-serif text-2xl text-trust mb-3">
                    Thank you!
                  </h3>
                  <p className="text-trust-soft">
                    We&apos;ve received your message and will get back to
                    you as soon as possible.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-trust mb-1.5"
                    >
                      Full Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      maxLength={200}
                      className={inputClasses}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-kindness-deep">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-trust mb-1.5"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      maxLength={320}
                      className={inputClasses}
                      placeholder="you@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-kindness-deep">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-trust mb-1.5"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      maxLength={500}
                      className={inputClasses}
                      placeholder="What is this about?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-kindness-deep">
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-trust mb-1.5"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      maxLength={5000}
                      className={inputClasses}
                      placeholder="Tell us how we can help..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-kindness-deep">
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="rounded-[var(--radius-full)] bg-kindness px-8 py-3 font-semibold text-white hover:bg-kindness-deep transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 md:py-20 bg-canvas">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-serif text-3xl text-trust mb-4">
            Stay Connected
          </h2>
          <p className="text-trust-soft text-lg mb-8">
            Sign up for our newsletter to hear about upcoming events,
            volunteer opportunities, and stories from our community.
          </p>
          <ZeffyNewsletter />
        </div>
      </section>

      {/* Donate CTA */}
      <section className="py-16 md:py-20 bg-warmth-glow text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-serif text-3xl text-trust mb-4">
            Make a difference today
          </h2>
          <p className="text-trust-soft text-lg mb-8">
            Your donation helps Kind Sisters support families across our
            community with essentials they need.
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
