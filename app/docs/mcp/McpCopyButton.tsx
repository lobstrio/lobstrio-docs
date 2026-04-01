'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function McpCopyButton({ text, dark }: { text: string; dark?: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const el = document.createElement('textarea');
        el.value = text;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-1.5 rounded-md transition cursor-pointer ${
        dark
          ? 'bg-[#1b344c] border-white/10 hover:bg-white/10 text-[#8592a0] hover:text-white'
          : 'absolute top-3 right-3 bg-white border-[#E5E7EB] hover:bg-[#F9FAFB] text-[#0A2540]/50 hover:text-[#0A2540]'
      }`}
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-[#8592a0]" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}
