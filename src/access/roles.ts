import type { Access, Where } from 'payload'

// Only admins pass.
export const isAdmin: Access = ({ req }) => req.user?.role === 'admin'

// Admins and editors pass. Used to gate content-collection writes so staff
// editors can manage content, but not user accounts.
export const isEditorOrAdmin: Access = ({ req }) =>
  req.user?.role === 'admin' || req.user?.role === 'editor'

// Read access for draft-enabled content: logged-in staff see everything
// (including drafts); the public sees only published documents. Returns a
// query constraint for anonymous requests so drafts never leak via the API.
// Trashed documents are excluded too, otherwise ?trash=true would still serve
// a published post Jody has binned.
const publishedAndNotTrashed: Where = {
  and: [{ _status: { equals: 'published' } }, { deletedAt: { exists: false } }],
}

export const publishedOrLoggedIn: Access = ({ req: { user } }) =>
  user ? true : publishedAndNotTrashed
