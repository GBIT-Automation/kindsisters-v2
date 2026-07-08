import type { CollectionConfig } from 'payload'
import { isEditorOrAdmin, publishedOrLoggedIn } from '../access/roles'

// Photo gallery. Each item is an image with a caption/alt. Publicly readable;
// staff create/edit/delete. Drafts let staff stage a photo before publishing;
// trash makes deletes recoverable; version history lets a bad edit be undone.
export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: { useAsTitle: 'alt', defaultColumns: ['alt', 'updatedAt'] },
  access: {
    read: publishedOrLoggedIn,
    create: isEditorOrAdmin,
    update: isEditorOrAdmin,
    delete: isEditorOrAdmin,
  },
  versions: { drafts: true },
  trash: true,
  upload: {
    staticDir: 'public/media/gallery',
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumb', width: 480 },
      { name: 'card', width: 800 },
      { name: 'full', width: 1600 },
    ],
    formatOptions: { format: 'jpeg', options: { quality: 80 } },
  },
  fields: [{ name: 'alt', label: 'Caption / alt text', type: 'text', required: true }],
}
