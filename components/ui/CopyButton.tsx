'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { CopyButtonProps } from '@/lib/types/layout.type';

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

const handleCopy = async () => {
  const formattedContent = text;
  if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(formattedContent);
    } else {
      let textArea = document.createElement("textarea");
      textArea.value = formattedContent;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      return new Promise((res, rej) => {
        // @ts-ignore
        document.execCommand("copy") ? res() : rej();
        textArea.remove();
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
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
