import type { CollectionConfig } from 'payload'
import { isEditorOrAdmin, publishedOrLoggedIn } from '../access/roles'

// Events. Public reads published only; staff manage. Drafts + version history
// + trash so events can be staged, revised, and recovered.
export const Events: CollectionConfig = {
  slug: 'events',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'date', '_status'] },
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
    { name: 'date', type: 'date', required: true },
    { name: 'location', type: 'text' },
    { name: 'description', type: 'richText' },
    { name: 'image', type: 'upload', relationTo: 'media' },
  ],
}
