'use client';

import Link from 'next/link';
import { ExternalLink, ChevronDown, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef, useCallback } from 'react';

const NAV_ITEMS = [
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
      { label: 'Python', href: 'https://pypi.org/project/lobstrio-sdk/' },      // { label: 'Node.js', href: '/docs/authentication' },
      // { label: 'Go', href: '/docs/authentication' },
    ],
  },
  {
    label: 'CLI',
    direct: true,
    links: [
      { label: 'Python', href: 'https://pypi.org/project/lobstrio/' },
    ],
  },
];

export default function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(null), 200);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpen(null);
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header ref={headerRef} className="border-b border-border sticky top-0 z-50 bg-background">
      <div className="max-w-[1600px] pl-8 pr-6.5 mx-auto py-4 flex items-center justify-between">
        {/* Logo */}
        <div className='flex items-center lg:gap-28'>
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[26px] text-[#ff0000] font-bold leading-[1.08]">lobstr.io</span>
            <span className="text-[22px] leading-[1.36]">docs</span>
          </Link>
          {/* Desktop nav */}
          <ul className='hidden lg:flex items-center gap-9'>
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                className="relative"
                onMouseEnter={() => { cancelClose(); item.links && !item.direct && setOpen(item.label); }}
                onMouseLeave={() => item.links && !item.direct && scheduleClose()}
              >
                {item.links && !item.direct ? (
                  <>
                    <button
                      onClick={() => setOpen(open === item.label ? null : item.label)}
                      className="flex items-center gap-1 font-semibold leading-[1.31] opacity-90 hover:opacity-100"
                    >
                      {item.label}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${open === item.label ? 'rotate-0' : '-rotate-90'}`}
                      />
                    </button>
                    {open === item.label && (
                      <div className="absolute top-full left-0 mt-2 w-44 bg-[#ffffff] border border-[#dde1ee] rounded-lg shadow-md  py-2.5 px-3 z-50">
                        {item.links.map((link) => (
                          <Link
                            key={link.label}
                            href={link.href}
                            onClick={() => setOpen(null)}
                            className="block text-sm leading-[2] px-[7px] py-1 text-sm hover:bg-muted transition-colors hover:bg-[#f2f5f9] hover:text-[#ff0000] hover:font-semibold rounded-lg"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : item.direct && item.links ? (
                  <a
                    href={item.links[0].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold leading-[1.31] opacity-90 hover:opacity-100"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="font-semibold leading-[1.31] opacity-90 hover:opacity-100 cursor-pointer">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop right actions */}
        <div className="hidden lg:flex items-center gap-16">
          <a
            href="https://lobstr.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold opacity-70 leading-[1.31] flex items-center gap-1"
          >
            Lobstr.io
            <ExternalLink className="w-3 h-3 font-semibold opacity-70 leading-[1.31]" />
          </a>
          <a
            href="https://app.lobstr.io"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center leading-[1.31] gap-2 text-[#ff0000] hover:text-[#fff] px-5 py-3 rounded-lg font-semibold border border-[#FF0000] hover:bg-[#ff0000]"
          >
            Dashboard
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => (
            <div key={item.label}>
              {item.links && !item.direct ? (
                <>
                  <button
                    onClick={() => setOpen(open === item.label ? null : item.label)}
                    className="flex items-center gap-1 font-semibold leading-[1.31] opacity-90 w-full"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${open === item.label ? 'rotate-0' : '-rotate-90'}`}
                    />
                  </button>
                  {open === item.label && (
                    <ul className="mt-2 flex flex-col gap-2 pl-3">
                      {item.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            onClick={() => { setOpen(null); setMenuOpen(false); }}
                            className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : item.direct && item.links ? (
                <a
                  href={item.links[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="font-semibold leading-[1.31] opacity-90"
                >
                  {item.label}
                </a>
              ) : (
                <span className="font-semibold leading-[1.31] opacity-90 cursor-pointer">
                  {item.label}
                </span>
              )}
            </div>
          ))}
          <div className="border-t border-border pt-4 flex flex-col gap-3">
            <a
              href="https://lobstr.io"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold opacity-70 leading-[1.31] flex items-center gap-1"
            >
              Lobstr.io
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://app.lobstr.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center leading-[1.31] gap-2 text-[#ff0000] hover:text-[#fff] px-5 py-3 rounded-lg font-semibold border border-[#FF0000] hover:bg-[#ff0000] w-fit"
            >
              Dashboard
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
