'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Navigation, NavSubsection } from '@/lib/types/content';

interface SidebarProps {
  navigation: Navigation;
}

/**
 * Find which section and subsection contains the current path
 */
function findActiveContext(navigation: Navigation, pathname: string) {
  const currentSlug = pathname.replace('/docs/', '');

  for (const section of navigation.sections) {
    // Check direct items
    if (section.items?.some(item => item.slug === currentSlug)) {
      return { section: section.title, subsection: null };
    }
    // Check subsections
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

/**
 * Sidebar navigation component with collapsible sections and subsections
 */
export default function Sidebar({ navigation }: SidebarProps) {
  const pathname = usePathname();
  const isInitialized = useRef(false);

  // Initialize expanded state - only expand section containing active page
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    const { section: activeSection, subsection: activeSubsection } = findActiveContext(navigation, pathname);

    navigation.sections.forEach((section) => {
      // Expand section if it contains the active page
      initial[section.title] = section.title === activeSection;
      section.subsections?.forEach((sub) => {
        const key = `${section.title}:${sub.title}`;
        // Expand subsection if it contains the active page
        initial[key] = key === activeSubsection;
      });
    });
    return initial;
  });

  // When pathname changes, ensure the active section/subsection is expanded
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
                <span className="ml-2 badge badge-get text-xs">
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
          className="flex items-center justify-between w-full text-sm font-medium text-text-secondary mb-1 hover:text-accent-red transition-colors text-left"
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
    <div className="p-6">
      {/* Logo/Header */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <span className="text-xl font-bold text-red-500">lobstr.io</span>
        <span className="text-text-muted text-sm font-medium">API Docs</span>
      </Link>

      {/* Navigation Sections */}
      <nav className="space-y-6">
        {navigation.sections.map((section) => (
          <div key={section.title}>
            {/* Section Header */}
            <button
              onClick={() => toggle(section.title)}
              className="flex items-center justify-between w-full text-sm font-semibold text-text-primary mb-2 hover:text-accent-red transition-colors"
            >
              <span>{section.title}</span>
              {expanded[section.title] ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {/* Section Content */}
            {expanded[section.title] && (
              <>
                {/* Direct items */}
                {section.items && section.items.length > 0 && renderItems(section.items)}

                {/* Subsections */}
                {section.subsections?.map((sub) => renderSubsection(sub, section.title))}
              </>
            )}
          </div>
        ))}
      </nav>

      {/* Footer Links */}
      <div className="mt-12 pt-6 border-t border-border">
        <div className="space-y-2 text-sm">
          <a
            href="https://lobstr.io"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-text-muted hover:text-text-primary transition-colors"
          >
            Main Website
          </a>
          <a
            href="https://app.lobstr.io"
            target="_blank"
            rel="noopener noreferrer"
            className="block text-text-muted hover:text-text-primary transition-colors"
          >
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}
