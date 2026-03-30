'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SECTIONS = [
  { id: 'installation', label: 'Installation' },
  { id: 'features', label: 'Features' },
  { id: 'quickstart', label: 'Quick Start' },
  { id: 'api-reference', label: 'API Reference' },
];

export default function SdkSidebar() {
  const [active, setActive] = useState('installation');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="p-8 flex flex-col min-h-full">
      <nav className="space-y-[25px]">
        <div>
          <button className="flex items-center justify-between w-full text-[16px] leading-[1.31] hover:text-[#ff0000] transition-colors cursor-pointer mb-2">
            <span>SDK</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <ul>
            {SECTIONS.map(({ id, label }, index) => (
              <li key={id}>
                <button
                  onClick={() => handleClick(id)}
                  className={`nav-item w-full text-left ${index < SECTIONS.length - 1 ? 'mb-1' : ''} ${active === id ? 'nav-item-active' : ''}`}
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="mt-auto pt-6 border-t border-border">
        <div className="space-y-2 text-sm">
          {[
            { href: 'https://lobstr.io', label: 'Main Website' },
            { href: 'https://app.lobstr.io', label: 'Dashboard' },
          ].map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[18px] leading-[1.33] hover:text-[#ff0000] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
