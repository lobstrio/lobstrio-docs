import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const FOOTER_COLUMNS = [
  // {
  //   label: 'API',
  //   links: [
  //     { label: 'Reference', href: '/docs/authentication' },
  //     { label: 'Client for JavaScript', href: '/docs/rate-limiting' },
  //     { label: 'Client for Python', href: '/docs/rate-limiting' },
  //   ],
  // },
  {
    label: 'SDK',
    links: [
      { label: 'Python', href: 'https://pypi.org/project/lobstrio-sdk/' },
      // { label: 'Node.js', href: '/docs/authentication' },
      // { label: 'Go', href: '/docs/authentication' },
    ],
  },
  {
    label: 'CLI',
    direct: true,
    href: 'https://pypi.org/project/lobstrio/',
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-[#dde1ee] bg-[#fff]">
      <div className="max-w-7xl mx-auto px-6 md:px-0 py-8">
        <div className="flex flex-col items-center gap-8 md:items-start md:flex-row md:justify-between md:gap-10">
         <div className='flex flex-col items-center gap-8 md:items-start md:flex-row md:gap-24'>
           {/* Logo */}
          <div className="shrink-0 md:-mt-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-[26px] text-[#ff0000] font-bold leading-[1.08]">lobstr.io</span>
              <span className="text-[22px] leading-[1.36]">docs</span>
            </Link>
          </div>

          {/* Columns */}
          <div className="flex flex-wrap gap-8 justify-center md:justify-start">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.label} className=''>
              {'direct' in col && col.direct ? (
                <a
                  href={col.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold leading-[1.31] opacity-90 hover:text-[#ff0000] -mt-[1px] block"
                >
                  {col.label}
                </a>
              ) : (
                <>
                  <p className="font-bold leading-[1.31] mb-3.5 opacity-90">
                    {col.label}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {col?.links && col.links.map((link) => (
                      <li key={link.label}>
                        {'external' in link && link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm opacity-60 hover:opacity-100  flex items-center gap-1"
                          >
                            {link.label}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-sm opacity-60 hover:text-[#ff0000] leading-[2]"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}
          </div>
         </div>

          {/* Right actions */}
          <div className="flex flex-col items-center gap-4 md:items-start md:flex-row md:gap-9 shrink-0">
            <a
              href="https://lobstr.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold opacity-70 leading-[1.31] flex items-start gap-1 md:-mt-1"
            >
              Lobstr.io
              <ExternalLink className="w-3 h-3 mt-1" />
            </a>
            <a
              href="https://app.lobstr.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center leading-[1.31] gap-2 md:-mt-4 md:ml-6 text-[#ff0000] hover:text-white px-5 py-3 rounded-lg font-semibold border border-[#FF0000] hover:bg-[#ff0000] w-fit"
            >
              Dashboard
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
