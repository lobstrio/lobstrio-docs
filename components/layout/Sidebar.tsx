'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { SidebarProps } from '@/lib/types/layout.type';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Navigation, NavSubsection } from '@/lib/types/content';
import Image from 'next/image';
import { SIDEBAR_SCROLL_KEY } from './SidebarScrollContainer';

function findActiveContext(navigation: Navigation, pathname: string) {
  const currentSlug = pathname.replace('/docs/', '');

  for (const section of navigation.sections) {
    if (section.items?.some(item => item.slug === currentSlug)) {
      return { section: section.title, subsection: null };
    }
    if (section.subsections) {
      for (const sub of section.subsections) {
        if (sub.items.some(item => item.slug === currentSlug)) {
          return { section: section.title, subsection: `${section.title}:${sub.title}` };
        }
      }
    }
  }
  return { section: null, subsection: null };
}

export default function Sidebar({ navigation }: SidebarProps) {
  const pathname = usePathname();
  const isInitialized = useRef(false);

  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    const { section: activeSection, subsection: activeSubsection } = findActiveContext(navigation, pathname);

    navigation.sections.forEach((section) => {
      initial[section.title] = section.title === activeSection;
      section.subsections?.forEach((sub) => {
        const key = `${section.title}:${sub.title}`;
        initial[key] = key === activeSubsection;
      });
    });
    return initial;
  });

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }

    const { section: activeSection, subsection: activeSubsection } = findActiveContext(navigation, pathname);

    if (activeSection || activeSubsection) {
      setExpanded(prev => {
        const updated = { ...prev };
        if (activeSection) {
          updated[activeSection] = true;
        }
        if (activeSubsection) {
          updated[activeSubsection] = true;
        }
        return updated;
      });
    }
  }, [pathname, navigation]);

  const toggle = (key: string) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderItems = (items: { title: string; slug: string; badge?: string }[]) => (
    <ul className="space-y-1">
      {items.map((item) => {
        const isActive = pathname === `/docs/${item.slug}`;
        return (
          <li key={item.slug}>
            <Link
              href={`/docs/${item.slug}`}
              className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
            >
              {item.title}
              {item.badge && (
                <span className="ml-2 badge badge-get text-[18px]">
                  {item.badge}
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  const renderSubsection = (sub: NavSubsection, parentTitle: string) => {
    const key = `${parentTitle}:${sub.title}`; 
    const isExpanded = expanded[key];
    
    return (
      <div key={sub.title} className="mt-5">
        <button
          onClick={() => toggle(key)}
          className="group flex items-center cursor-pointer justify-between w-full mb-1 hover:text-[#ff0000] transition-colors text-left"
        >
          {/* <span className="flex-1 text-left">{sub.title}</span> */}
            <div className="flex items-center gap-2.5">
    {sub.icon && sub.iconHover && (
      <div className="relative w-[33px] h-[33px]">
        <Image
          src={sub.icon}
          alt="icon"
          fill
          className="transition-opacity duration-200 group-hover:opacity-0"
        />
        <Image
          src={sub.iconHover}
          alt="icon hover"
          fill
          className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      </div>
    )}

    <span className={`flex-1 text-left w-[202px] ${isExpanded ? "text-[16px]  font-semibold leading-[1.25] opacity-90" : "text-[16px] leading-[1.25] opacity-90"}`}>{sub.title}</span>
  </div>
          {/* {isExpanded ? (
            <ChevronDown className="w-3 h-3" />
          ) : (
            <ChevronRight className="w-3 h-3" />
          )} */}
        </button>
        {isExpanded && <div className="ml-2">{renderItems(sub.items)}</div>}
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-2 mb-7.5">
        <a href="/" onClick={() => sessionStorage.removeItem(SIDEBAR_SCROLL_KEY)}>
          <span className="text-2xl font-bold text-[#FF0000] leading-[1.08] font-[family-name:var(--font-source-sans-3)]">lobstr.io</span>{" "}
          <span className="text-[22px] opacity-60 leading-[1.36]">docs</span>
        </a>
      </div>

      <nav className="space-y-[25px]">
        {navigation.sections.map((section) => (
          <div key={section.title}>
            <button
              onClick={() => toggle(section.title)}
              className="flex items-center justify-between w-full text-[16px] leading-[1.31] mb-2 hover:text-[#ff0000] transition-colors cursor-pointer"
            >
              <span>{section.title}</span>
              {expanded[section.title] ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {expanded[section.title] && (
              <>
                {section.items && section.items.length > 0 && renderItems(section.items)}
                {section.subsections?.map((sub) => renderSubsection(sub, section.title))}
              </>
            )}
          </div>
        ))}
      </nav>

      <div className="mt-12 pt-6 border-t border-border">
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
