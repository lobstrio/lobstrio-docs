'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function McpCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 p-1.5 rounded-md bg-white border border-[#E5E7EB] hover:bg-[#F9FAFB] transition text-[#0A2540]/50 hover:text-[#0A2540] cursor-pointer"
      title="Copy to clipboard"
    >
      {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
    </button>
  );
}
