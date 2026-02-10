'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative min-h-screen bg-[#062a3d] overflow-hidden text-white">
      <div className="absolute inset-0">
        <img
          src="/images/not-found.svg"
          alt="Not found background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative bottom-28 z-10 min-h-screen flex flex-col items-center justify-end text-center px-4 mb-10">
        <h1 className="text-[26px] md:text-[36px] font-extrabold mb-8">
          This page does not exist
        </h1>

        <Link
          href="/"
          className="bg-red-600 hover:bg-red-500 transition
                     px-6 py-3 rounded-lg font-semibold text-white"
        >
          Go to homepage
        </Link>
      </div>
    </div>
  );
}
