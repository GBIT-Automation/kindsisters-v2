import { buildConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { migrations } from './src/migrations'
import { Users } from './src/collections/Users'
import { Media } from './src/collections/Media'
import { Gallery } from './src/collections/Gallery'
import { Blog } from './src/collections/Blog'
import { Events } from './src/collections/Events'
import { Testimonials } from './src/collections/Testimonials'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default buildConfig({
  admin: {
    user: Users.slug,
    // Use Payload's built-in local avatar icon instead of the default Gravatar
    // (external fetch is blocked by our CSP and keeps data in Australia).
    avatar: 'default',
    meta: {
      titleSuffix: '— Kind Sisters',
    },
    components: {
      graphics: {
        Logo: '/src/admin/graphics/Logo#Logo',
        Icon: '/src/admin/graphics/Icon#Icon',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor(),
  collections: [Users, Media, Gallery, Blog, Events, Testimonials],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URL || 'file:./kindsisters.db' },
    // In production the adapter does not auto-create the schema (it only
    // pushes when NODE_ENV !== 'production'), so a clean database has no
    // tables and any page that queries a collection fails. Handing the
    // migrations here makes the adapter run them on connect, which covers
    // both `next build` inside Docker and the container starting against the
    // mounted volume. Dev is unaffected and still uses schema push.
    prodMigrations: migrations,
  }),
  sharp,
})
