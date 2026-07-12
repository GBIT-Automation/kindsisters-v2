import type { CollectionConfig } from 'payload'
import { isEditorOrAdmin, publishedOrLoggedIn } from '../access/roles'

// Testimonials shown across the site. Attribution is role-only (school names
// masked). Public reads published only; staff manage. Drafts + trash.
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    // Use the quote as the document title so it is editable and meaningful
    // when adding a testimonial (role is shared across many, e.g. "Parent").
    useAsTitle: 'quote',
    defaultColumns: ['quote', 'role', 'date', '_status'],
  },
  access: {
    read: publishedOrLoggedIn,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  versions: { drafts: true },
  trash: true,
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'role', type: 'text', required: true },
    { name: 'date', type: 'text' },
  ],
}
