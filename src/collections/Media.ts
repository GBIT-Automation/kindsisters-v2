import type { CollectionConfig } from 'payload'
import { isEditorOrAdmin } from '../access/roles'
import { requireMinImageEdge } from '../hooks/requireMinImageEdge'

// Uploaded images used by Blog/Events (and any future content). Images are
// publicly readable (they render on the site); only staff can upload/change.
// sharp auto-generates web-optimised sizes on upload.
export const Media: CollectionConfig = {
  slug: 'media',
  // Hidden from the nav/dashboard — it fills automatically when staff add
  // images to blog posts / events, so it needn't be a visible tile.
  admin: { hidden: true },
  hooks: {
    beforeValidate: [requireMinImageEdge(1200)],
  },
  access: {
    read: () => true,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  upload: {
    staticDir: 'public/media',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumb', width: 480 },
      { name: 'card', width: 1024 },
      { name: 'full', width: 1600 },
    ],
    formatOptions: { format: 'jpeg', options: { quality: 80 } },
  },
  fields: [{ name: 'alt', type: 'text', required: true }],
}
