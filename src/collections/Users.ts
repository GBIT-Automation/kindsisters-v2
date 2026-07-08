import type { CollectionConfig } from 'payload'

// Minimal auth collection so Payload can boot and the admin panel can load.
// Roles (admin/editor) and access control are added in Task 2.
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: { useAsTitle: 'email' },
  fields: [],
}
