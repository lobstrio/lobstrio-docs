'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { SidebarProps } from '@/lib/types/layout.type';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Navigation, NavSubsection } from '@/lib/types/content';

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
              className={`nav-item ${isActive ? 'nav-item-active' : 'opacity-60'}`}
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
      <div key={sub.title} className="ml-2 mt-2">
        <button
          onClick={() => toggle(key)}
          className="flex items-center justify-between w-full text-[18px] font-medium text-text-secondary mb-1 hover:text-accent-red transition-colors text-left"
        >
          <span className="flex-1 text-left">{sub.title}</span>
          {isExpanded ? (
            <ChevronDown className="w-3 h-3" />
          ) : (
            <ChevronRight className="w-3 h-3" />
          )}
        </button>
        {isExpanded && <div className="ml-2">{renderItems(sub.items)}</div>}
      </div>
    );
  };

  return (
    <div className="p-8">
      <div className="flex items-center gap-2 mb-8">
        <a href="/">
          <span className="text-[26px] font-bold text-red-500">lobstr.io</span>{" "}
          <span className="text-text-muted text-[22px]">docs</span>
        </a>
      </div>

      <nav className="space-y-6">
        {navigation.sections.map((section) => (
          <div key={section.title}>
            <button
              onClick={() => toggle(section.title)}
              className="flex items-center justify-between w-full text-[18px] font-semibold text-text-primary mb-2 hover:text-accent-red transition-colors cursor-pointer"
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
              className="block text-[18px] text-[#696a73] hover:text-red-500 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
