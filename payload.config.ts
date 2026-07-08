import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Gallery } from './src/collections/Gallery'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: { user: Users.slug },
  editor: lexicalEditor(),
  collections: [Users, Media, Gallery], // Blog/Events/Testimonials added in later tasks
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URL || 'file:./kindsisters.db' },
  }),
  sharp,
})
