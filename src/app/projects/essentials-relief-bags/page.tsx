import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Essentials Relief Bags",
  description:
    "Food and hygiene essentials delivered to families in need through local schools in Perth — discreetly, respectfully, and with care.",
};

const nonPerishables = [
  "Rice and pasta",
  "Canned vegetables and beans",
  "Canned tuna and chicken",
  "Cooking oil",
  "Long-life milk",
  "Cereal and oats",
  "Peanut butter and spreads",
  "Snack bars and crackers",
  "Tea and coffee",
];

const hygieneGoods = [
  "Shampoo and conditioner",
  "Body wash and soap",
  "Toothpaste and toothbrushes",
  "Deodorant",
  "Feminine hygiene products",
  "Tissues and toilet paper",
  "Laundry detergent",
  "Hand sanitiser",
];

export default function EssentialsReliefBagsPage() {
  return (
    <div className="bg-earth">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[50vh] min-h-[400px]">
          <Image
            src="/images/gallery/bags-ready-for-delivery.jpeg"
            alt="Essentials Relief Bags being prepared by volunteers"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-warmth/40 to-trust/60" />
          <div className="absolute inset-0 flex items-end">
            <div className="mx-auto max-w-5xl w-full px-6 pb-12">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white">
                Essentials Relief Bags
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
              Our Essentials Relief Bags program is at the heart of what Kind
              Sisters does. We pack and deliver bags filled with food and
              hygiene products to families experiencing hardship, working
              directly through local schools in the Mirrabooka area.
            </p>
            <p>
              Schools identify families who are struggling quietly —
              parents who are choosing between groceries and rent, children
              who arrive at school without breakfast. By partnering with
              school support workers, we ensure that bags reach the people
              who need them most, discreetly and with dignity.
            </p>
            <p>
              Each bag is carefully packed with essential non-perishable
              food items and personal hygiene products. We know that these
              basics can make the difference between a family feeling
              forgotten and a family feeling supported.
            </p>
          </div>
        </div>
      </section>

      {/* What Bags Contain */}
      <section className="py-16 md:py-24 bg-canvas">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-trust text-center mb-12">
            What Our Bags Contain
          </h2>
          <div className="grid gap-10 md:grid-cols-2">
            {/* Non-perishables */}
            <div className="rounded-[var(--radius-lg)] bg-warmth-glow p-8">
              <h3 className="font-serif text-2xl text-warmth-deep mb-6">
                Non-Perishable Foods
              </h3>
              <ul className="space-y-3">
                {nonPerishables.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-trust-soft">
                    <svg
                      className="w-5 h-5 text-warmth mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Hygiene */}
            <div className="rounded-[var(--radius-lg)] bg-kindness-whisper p-8">
              <h3 className="font-serif text-2xl text-kindness-deep mb-6">
                Hygiene Essentials
              </h3>
              <ul className="space-y-3">
                {hygieneGoods.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-trust-soft">
                    <svg
                      className="w-5 h-5 text-kindness mt-0.5 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <section className="py-16 md:py-20 bg-kindness-whisper text-center">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-serif text-3xl text-trust mb-4">
            Help us pack more bags
          </h2>
          <p className="text-trust-soft text-lg mb-8">
            Partner with us by making a tax-deductible donation today. Or
            consider making monthly contributions to leave a legacy that will
            impact the generations to come.
          </p>
          <Link
            href="/donate"
            className="inline-block rounded-[var(--radius-full)] bg-kindness px-10 py-4 text-lg font-semibold text-white hover:bg-kindness-deep transition-colors"
          >
            Donate Now
          </Link>
        </div>
      </section>
    </div>
  );
}
