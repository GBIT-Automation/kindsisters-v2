import type { CollectionConfig } from 'payload'
import { isEditorOrAdmin, publishedOrLoggedIn } from '../access/roles'

// Turn a title into a URL-safe slug.
const slugify = (s: string): string =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

// Blog posts. Public reads published only; staff manage. Drafts + version
// history + trash so posts can be staged, revised safely, and recovered.
export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'publishedDate', '_status'] },
  access: {
    read: publishedOrLoggedIn,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  versions: { drafts: true },
  trash: true,
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
        description: 'Auto-filled from the title. Leave blank to generate.',
      },
      // Auto-generate from the title when left blank, so editors never have to
      // craft URLs by hand.
      hooks: {
        beforeValidate: [
          ({ value, data }) => value || (data?.title ? slugify(data.title as string) : value),
        ],
      },
    },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea' },
    { name: 'body', type: 'richText' },
    { name: 'author', type: 'text', defaultValue: 'Kind Sisters' },
    { name: 'publishedDate', type: 'date', admin: { position: 'sidebar' } },
  ],
}
