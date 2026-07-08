import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How Kind Sisters began — a grass-roots nonprofit strengthening women as the gateway to stronger families and communities in Perth since 2022.",
};

const team = [
  {
    name: "Jody Rynski",
    role: "Founder, Director & CEO",
    photo: "/images/team/jody-rynski.png",
    bio: "Jody is a dedicated and compassionate Social Worker with over a decade of experience working with women, children and families from diverse backgrounds in the City of Stirling. With a strong foundation in trauma-informed practice, therapeutic program facilitation and crisis support, Jody brings a deep understanding of both individual and systemic challenges. She is recognised for building trusted relationships, fostering strong community partnerships and leading initiatives that create meaningful, lasting impact and strengthen social connection.",
  },
  {
    name: "Alison Taylor",
    role: "Director",
    photo: "/images/team/alison-taylor.png",
    bio: "Alison Taylor is a CPA-qualified business leader and growth strategist with a deep commitment to helping people and organisations thrive. After beginning her career in audit at PwC, Alison went on to co-found PUMPNSEAL Australia. As CFO and later General Manager she helped grow the business through a significant period of expansion until it was successfully sold. Alison now works as a Business Growth Educator, supporting business owners and leadership teams with clarity, care and practical insight. In her role at Kind Sisters, Alison is able to combine her business experience with her heart to bring help and hope to those for whom life is most difficult.",
  },
  {
    name: "Penny Webb",
    role: "Director",
    photo: "/images/team/penny-webb.png",
    bio: "Penny brings over 25 years of experience as a senior leader, Board Director, spokesperson and strategic communicator across both the private and not-for-profit sectors. She has held CEO roles with People Who Care, South Coastal Health and Community Services, Rise Network and Riverview, leading teams delivering services in health, mental health, domestic and family violence, and youth and children at risk, including overseas. Penny holds a Master of Business Administration and a Master of Business Leadership, is co-author of She's Not Your Competition, and is co-founder and volunteer of Kinwomen. She is deeply passionate about improving quality of life and reducing inequality for women.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-earth">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-kindness-whisper">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-trust">
            Our Story
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-trust-soft">
            Walking alongside women in our community
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-6 text-trust-soft text-lg leading-relaxed">
            <p>
              Kind Sisters has been responding to community need since 2022
              with the arrival of Ukrainian refugees. In April 2023,
              Australian Kind Sisters Ltd (trading as Kind Sisters) officially
              registered with ASIC and the Australian Charities and
              Not-for-profits Commission as a benevolent institution with Tax
              Deductible Gift Recipient status.
            </p>
            <p>
              Our vision and strategic direction developed over time through
              our founder&apos;s work with women and children in the Mirrabooka
              area and the severe impact of the cost-of-living crisis. Women
              were seeking connection and safe community, a desire to support
              each other, to be seen, heard and valued and take active steps
              towards improving their lives and making a positive impact to the
              community around them.
            </p>
            <p>
              We will continue the journey of walking alongside women and
              showing the strength in kind, compassionate sisterhood.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-canvas">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-serif text-3xl md:text-4xl text-trust text-center mb-12">
            Meet the Team
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <div
                key={member.name}
                className="rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-md)] bg-canvas"
              >
                <div className="bg-kindness-soft p-8 flex justify-center">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden">
                    <Image
                      src={member.photo}
                      alt={`Portrait of ${member.name}`}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-trust">
                    {member.name}
                  </h3>
                  <p className="text-kindness font-medium text-sm mt-1">
                    {member.role}
                  </p>
                  <p className="mt-4 text-trust-soft leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners & Volunteers */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-trust mb-6">
            Partners &amp; Volunteers
          </h2>
          <p className="text-trust-soft text-lg leading-relaxed">
            Our operational team of volunteers and partners have contributed
            greatly to the development and facilitation of our programs. They
            continue to be highly valued members of Kind Sisters and carry the
            heart, soul and vision of all that we do in strengthening women as
            the gateway to stronger families and communities.
          </p>

          <div className="mt-12 rounded-[var(--radius-lg)] bg-kindness-whisper p-8 md:p-10">
            <h3 className="font-serif text-2xl text-trust mb-4">
              Volunteer With Us
            </h3>
            <p className="text-trust-soft text-lg leading-relaxed mb-8">
              Join our Kind Sisters Community; together we can take practical
              steps to demonstrate kindness and build compassionate community.
            </p>
            <Link
              href="/get-involved"
              className="inline-block rounded-[var(--radius-full)] bg-kindness px-8 py-3 font-semibold text-white hover:bg-kindness-deep transition-colors"
            >
              Get Involved
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
