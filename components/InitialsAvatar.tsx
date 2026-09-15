import React from 'react';

interface InitialsAvatarProps {
  name: string;
  className?: string;
}

// Honorifics are skipped so "Shri Rajeev Chauhan" becomes "RC", not "SR".
const HONORIFICS = new Set(['shri', 'smt', 'smt.', 'dr', 'dr.', 'mr', 'mr.', 'ms', 'ms.', 'mrs', 'mrs.', 'prof', 'prof.']);

export function getInitials(name: string) {
  const parts = name
    .split(/\s+/)
    .filter((p) => p && !HONORIFICS.has(p.toLowerCase()));
  const letters = parts.length > 1 ? [parts[0], parts[parts.length - 1]] : parts;
  return letters.map((p) => p[0]).join('').toUpperCase() || '?';
}

export default function InitialsAvatar({ name, className = '' }: InitialsAvatarProps) {
  return (
    <div
      role="img"
      aria-label={name}
      className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br from-maroon-700 to-maroon-800 text-gold-300 font-serif font-bold select-none ${className}`}
    >
      {getInitials(name)}
    </div>
  );
}
