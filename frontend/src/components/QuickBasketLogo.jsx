import React from 'react';

export default function QuickBasketLogo({ className = '', size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="4" y="16" width="40" height="24" rx="4" fill="#2563eb"/>
      <rect x="10" y="22" width="28" height="12" rx="2" fill="#fff"/>
      <rect x="16" y="28" width="16" height="4" rx="2" fill="#2563eb"/>
      <circle cx="16" cy="40" r="2.5" fill="#2563eb"/>
      <circle cx="32" cy="40" r="2.5" fill="#2563eb"/>
      <rect x="14" y="10" width="20" height="8" rx="4" fill="#2563eb" stroke="#fff" strokeWidth="2"/>
      <text x="24" y="20" textAnchor="middle" fontWeight="bold" fontSize="8" fill="#fff">QB</text>
    </svg>
  );
}
