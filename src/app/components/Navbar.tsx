// components/Navbar.tsx
'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex gap-4 p-4 bg-white shadow rounded mb-6">
      <Link href="/" className="text-blue-600 hover:underline">Public Site</Link>
      <Link href="/admin" className="text-blue-600 hover:underline">Admin Dashboard</Link>
    </nav>
  );
}
    