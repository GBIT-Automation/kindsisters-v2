import type { Access } from 'payload'

// Only admins pass.
export const isAdmin: Access = ({ req }) => req.user?.role === 'admin'

// Admins and editors pass. Used to gate content-collection writes so staff
// editors can manage content, but not user accounts.
export const isEditorOrAdmin: Access = ({ req }) =>
  req.user?.role === 'admin' || req.user?.role === 'editor'

// Read access for draft-enabled content: logged-in staff see everything
// (including drafts); the public sees only published documents. Returns a
// query constraint for anonymous requests so drafts never leak via the API.
export const publishedOrLoggedIn: Access = ({ req: { user } }) =>
  user ? true : { _status: { equals: 'published' } }
