// Seed the CMS with the real content already on the site: the three
// testimonials from the Stories page and the curated gallery photos.
// Run once (stop the dev server first so it doesn't hold the SQLite file):
//   PAYLOAD_SECRET=... DATABASE_URL=file:./kindsisters.db npx payload run scripts/seed-content.mjs
// Use `payload run` (not plain tsx) so the config loads via @payload-config and
// the runner awaits the async work. Safe to re-run: skips a collection that
// already has documents.
import { getPayload } from 'payload'
import config from '@payload-config'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const galleryDir = path.resolve(dirname, '../public/images/gallery')

// Real testimonials from src/app/(frontend)/stories/page.tsx — role-only
// attribution (school names masked), full text preserved.
const testimonials = [
  {
    role: 'Primary School Support Worker',
    date: 'June 2026',
    quote:
      'The response from families has been overwhelmingly positive, and everyone was incredibly grateful for the support. Many shared that the bags arrived at exactly the right time and made a real difference. One mum, in particular, said how thankful she was for the laundry detergent. Her special needs son needs his bedding washed almost every day, so it is an item she uses all the time. She said receiving it was a huge help. Thanks so much for your effort and for making such a meaningful difference to the families in our school community.',
  },
  {
    role: 'Senior Multicultural Support Worker',
    date: 'October 2025',
    quote:
      'At our school we have a high number of students who come from a refugee background who experience adversity and are very vulnerable. The essentials bags provided are crucial in minimising the cost of groceries for our families. The items provided in these bags are not available from any other support service and our families struggle to afford these basic necessities. Our school community receives these items on a regular basis and we distribute to those in need, particularly single parent households and families who have escaped family and domestic violence. We are so grateful that you provide for the practical needs of our children and families.',
  },
  {
    role: 'School Support Worker',
    date: 'March 2026',
    quote:
      "I dropped off the bags to some of our most vulnerable families. They commented that the items in the essentials bags were so useful and they were so pleased for the support as these are items they just can't afford in the cost-of-living crisis.",
  },
  {
    role: 'School Chaplain',
    date: 'July 2026',
    quote:
      'I just wanted to say a massive thank you again for all the bags we received. All the families were very appreciative.',
  },
  {
    role: 'Parent',
    date: 'July 2026',
    quote:
      'Good morning. I just wanted to say a big thank you for the donated bags I received on Monday containing home and pantry items. I also want to say a big thank you to the sponsor for their kindness and generosity. God Bless you all.',
  },
]

// Curated gallery photos from src/app/(frontend)/projects/page.tsx, with their
// real captions/alt text (18 of the files in public/images/gallery).
const gallery = [
  { file: 'img_8046.jpg', alt: "Women's Community Connect group with the Perth skyline behind them" },
  { file: 'img_7887.jpg', alt: 'Families receiving support at a community event' },
  { file: 'img_6769.jpg', alt: 'Volunteers with flowers at a Community Connect gathering' },
  { file: 'primary-school-delivery.jpeg', alt: 'Delivering essentials to a primary school' },
  { file: 'img_7828.jpg', alt: 'A group of women together outdoors' },
  { file: 'img_1898.jpg', alt: 'A community member holding a Kind Sisters tote bag' },
  { file: '1661576444530263.jpg', alt: 'Kind Sisters members at a community gathering' },
  { file: 'march-2025.jpg', alt: 'March 2025 community gathering' },
  { file: '40-families-first-ever.jpg', alt: 'Relief bags packed for 40 families' },
  { file: 'kellie.jpeg', alt: 'A volunteer with a car full of relief bags' },
  { file: 'img_6702.jpg', alt: 'Women at a Kind Sisters community event' },
  { file: 'img_7841.jpg', alt: 'A Community Connect gathering with the Perth skyline' },
  { file: 'bags-ready-for-delivery.jpeg', alt: 'Bags packed and ready for delivery' },
  { file: '11.2.23.jpg', alt: 'Women gathered for a Kind Sisters community morning tea' },
  { file: 'img_7942.jpg', alt: 'A large community gathering under a tree' },
  { file: 'img_4533.jpg', alt: 'Women taking part in a community workshop' },
  { file: 'picture1.jpg', alt: 'A community event bringing women together' },
  { file: 'hamper.jpg', alt: 'Hygiene essentials packed into a relief bag' },
]

const run = async () => {
  const payload = await getPayload({ config })

  const existingT = await payload.count({ collection: 'testimonials' })
  if (existingT.totalDocs === 0) {
    for (const t of testimonials) {
      await payload.create({ collection: 'testimonials', data: { ...t, _status: 'published' } })
    }
    console.log(`Seeded ${testimonials.length} testimonials`)
  } else {
    console.log(`Testimonials already present (${existingT.totalDocs}) — skipping`)
  }

  const existingG = await payload.count({ collection: 'gallery' })
  if (existingG.totalDocs === 0) {
    for (const g of gallery) {
      await payload.create({
        collection: 'gallery',
        data: { alt: g.alt, _status: 'published' },
        filePath: path.join(galleryDir, g.file),
      })
    }
    console.log(`Seeded ${gallery.length} gallery photos`)
  } else {
    console.log(`Gallery already present (${existingG.totalDocs}) — skipping`)
  }

  console.log('Seed complete')
}

// Top-level await so `payload run` waits for the async work to finish before
// the process exits (a fire-and-forget call would be cut off mid-seed).
try {
  await run()
  process.exit(0)
} catch (e) {
  console.error(e)
  process.exit(1)
}
