'use client'

import React from 'react'

// Rendered as a UI field on the account/user page so there is an obvious way
// to log out. Links to Payload's logout route.
export const LogoutLink = () => (
  <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f1dbe3' }}>
    <a
      href="/admin/logout"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.6rem 1.15rem',
        borderRadius: '6px',
        background: '#e8709a',
        color: '#ffffff',
        textDecoration: 'none',
        fontWeight: 600,
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      Log out
    </a>
  </div>
)

export default LogoutLink
