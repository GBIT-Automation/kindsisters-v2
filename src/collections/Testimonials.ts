import type { CollectionConfig } from 'payload'
import { isEditorOrAdmin, publishedOrLoggedIn } from '../access/roles'

// Testimonials shown across the site. Attribution is role-only (school names
// masked). Public reads published only; staff manage. Drafts + trash.
export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'role',
    // Show the quote in the list so editors can tell testimonials apart
    // (many share the same role, e.g. "Parent").
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
