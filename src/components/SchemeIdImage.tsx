'use client';

import { useState } from 'react';

const SCHEME_ID = 'C11083530';
const DEFAULT_LABEL = 'Tap to copy Scheme ID';

export default function SchemeIdImage() {
  const [label, setLabel] = useState(DEFAULT_LABEL);

  const copy = () => {
    navigator.clipboard?.writeText(SCHEME_ID);
    setLabel('Copied!');
    setTimeout(() => setLabel(DEFAULT_LABEL), 2000);
  };

  return (
    <div className="animate-float relative">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/icons/containers-for-change-social.jpeg"
        alt={`Donate your 10c containers to Kind Sisters — Containers for Change ID ${SCHEME_ID}`}
        className="rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] max-w-xs w-full hover:scale-105 transition-transform duration-300 cursor-pointer"
        onClick={copy}
      />
      <p className="text-center text-trust-muted text-xs mt-3">{label}</p>
    </div>
  );
}
