'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { CopyButtonProps } from '@/lib/types/layout.type';

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      }

      else if (process.env.NODE_ENV !== 'production') {
        const t = document.createElement('textarea');
        t.value = text;
        t.style.position = 'fixed';
        t.style.left = '-9999px';
        document.body.appendChild(t);
        t.select();
        document.execCommand('copy');
        document.body.removeChild(t);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`text-sm font-semibold leading-[1.36] bg-[#f2f5f9] cursor-pointer border border-[#dee0ea] rounded-md px-1.5 py-1 leading-[1.36] flex items-center gap-2 ${className}`}
      aria-label="Copy to clipboard"
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Copied!
        </>
      ) : (
        <>
          <Image
            src="/images/copy-icon.svg"
            alt="Copy"
            width={14}
            height={14}
          />
          Copy
        </>

      )}
    </button>
  );
}
