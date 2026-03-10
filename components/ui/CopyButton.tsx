'use client';

import Image from 'next/image';
import { useState } from 'react';
import { CopyButtonProps } from '@/lib/types/layout.type';

export default function CopyButton({ text, className = '' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const [active, setActive] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleCopy = async () => {
    const formattedContent = text;
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(formattedContent);
    } else {
      let textArea = document.createElement("textarea");
      textArea.value = formattedContent;
      textArea.style.position = "fixed";
      textArea.style.left = "-999999px";
      textArea.style.top = "-999999px";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      // @ts-ignore
      document.execCommand("copy");
      textArea.remove();
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const icon = copied
    ? '/images/coped-icon.svg'
    : active
    ? '/images/copy-active-icon.svg'
    : '/images/copy-init-icon.svg';

  const bgColor = active ? '#f2f5f957' : '#f2f5f9';

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div className="absolute -top-9 left-1/2 -translate-x-1/2 pointer-events-none">
          <div
            className="text-xs leading-[1.33] px-2.5 py-[5px] whitespace-nowrap"
            style={{
              borderRadius: '4px',
              boxShadow: '0 1px 5px 0 rgba(10, 37, 64, 0.12)',
              border: 'solid 1px #dee0ea',
              backgroundColor: '#fff',
            }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </div>
        </div>
      )}
      <button
        onClick={handleCopy}
        onMouseDown={() => setActive(true)}
        onMouseUp={() => setActive(false)}
        onMouseLeave={() => setActive(false)}
        style={{ backgroundColor: bgColor }}
        className={`h-[28px] w-[28px] p-1.5 flex justify-center text-sm font-semibold leading-[1.36] cursor-pointer border border-[#dee0ea] rounded-[7px] items-center gap-2 ${className}`}
        aria-label="Copy to clipboard"
      >
        <Image
          src={icon}
          alt={copied ? 'Copied' : 'Copy'}
          width={60}
          height={60}
          className={copied ? 'w-[14px] h-auto' : 'w-[19px] h-auto'}
        />
      </button>
    </div>
  );
}
