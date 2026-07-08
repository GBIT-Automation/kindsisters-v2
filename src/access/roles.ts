import type { Access } from 'payload'

// Only admins pass.
export const isAdmin: Access = ({ req }) => req.user?.role === 'admin'

// Admins and editors pass. Used to gate content-collection writes so staff
// editors can manage content, but not user accounts.
export const isEditorOrAdmin: Access = ({ req }) =>
  req.user?.role === 'admin' || req.user?.role === 'editor'
