import type { CollectionConfig } from 'payload'
import { isAdmin } from '../access/roles'

// Staff logins. Admins fully manage user accounts. Editors manage content
// (via the content collections) and can access their own account (e.g. change
// their password) but cannot see, create, or manage other users, and cannot
// change their own role.
export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
    // Hide the Users collection from the sidebar for non-admins.
    hidden: ({ user }) => user?.role !== 'admin',
  },
  access: {
    create: isAdmin,
    delete: isAdmin,
    // Admins read/update anyone; everyone else is limited to their own record
    // (required so /api/users/me and the account page work for editors).
    read: ({ req: { user } }) =>
      user?.role === 'admin' ? true : { id: { equals: user?.id } },
    update: ({ req: { user } }) =>
      user?.role === 'admin' ? true : { id: { equals: user?.id } },
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      // Only admins can set/change a role — prevents an editor escalating
      // their own privileges by editing their account.
      access: { update: ({ req }) => req.user?.role === 'admin' },
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
    { name: 'name', type: 'text' },
    // Logout link on the account page (an easy, obvious way to sign out).
    {
      name: 'logout',
      type: 'ui',
      admin: {
        components: {
          Field: '/src/admin/components/LogoutLink#LogoutLink',
        },
      },
    },
  ],
}
