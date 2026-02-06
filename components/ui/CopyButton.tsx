'use client';

import { useState } from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';

interface CopyButtonProps {
  text: string;
  className?: string;
}

/**
 * Copy to clipboard button with success feedback
 */
export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  // const handleCopy = async () => {
  //   try {
  //     await navigator.clipboard.writeText(text);
  //     setCopied(true);
  //     setTimeout(() => setCopied(false), 2000);
  //   } catch (error) {
  //     console.error('Failed to copy:', error);
  //   }
  // };
  const handleCopy = async () => {
    try {
      // Use modern clipboard API if available & secure
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      }
      // Optional fallback for dev / API server only
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

      // Same copied state logic as before
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`text-sm font-semibold leading-[1.36] bg-[#f2f5f9] border border-[#dee0ea] rounded-md px-1.5 py-1 leading-[1.36] flex items-center gap-2 ${className}`}
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
