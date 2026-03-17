'use client';

import { useRef, useEffect, useLayoutEffect } from 'react';

export const SIDEBAR_SCROLL_KEY = 'sidebar-scroll-position';

export default function SidebarScrollContainer({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  // Restore scroll position before paint to avoid visible jump
  useLayoutEffect(() => {
    const saved = sessionStorage.getItem(SIDEBAR_SCROLL_KEY);
    if (saved && ref.current) {
      ref.current.scrollTop = parseInt(saved, 10);
    }
  }, []);

  // Save scroll position on scroll
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      sessionStorage.setItem(SIDEBAR_SCROLL_KEY, String(el.scrollTop));
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div ref={ref} className="sticky top-[61px] h-[calc(100vh-61px)] overflow-y-auto border-r border-border">
      {children}
    </div>
  );
}
