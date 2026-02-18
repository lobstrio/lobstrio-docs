'use client';

import { useState } from 'react';
import { Bot, Check } from 'lucide-react';
import { CopyForLLMButtonProps } from '@/lib/types/layout.type';

export default function CopyForLLMButton({ content }: CopyForLLMButtonProps) {
  const [copied, setCopied] = useState(false);

  const formatForLLM = (): string => {
    let formatted = `Context for LLM: Lobstr.io API Documentation\n\n`;
    formatted += `# ${content.title}\n\n`;
    formatted += `${content.description}\n\n`;
    formatted += `## Endpoint Details\n`;
    formatted += `- Method: ${content.metadata.method}\n`;
    formatted += `- Endpoint: ${content.metadata.endpoint}\n`;
    formatted += `- Requires Authentication: ${content.metadata.requiresAuth ? 'Yes' : 'No'}\n\n`;

    if (content.metadata.rateLimit) {
      formatted += `- Rate Limit: ${content.metadata.rateLimit}\n\n`;
    }

    formatted += `## Description\n\n${content.content.introduction}\n\n`;

    if (content.content.headers.length > 0) {
      formatted += `## Headers\n\n`;
      content.content.headers.forEach((header) => {
        formatted += `- **${header.key}**: ${header.value} ${header.required ? '(Required)' : '(Optional)'}\n`;
        if (header.description) {
          formatted += `  ${header.description}\n`;
        }
      });
      formatted += '\n';
    }

    if (content.content.parameters.length > 0) {
      formatted += `## Parameters\n\n`;
      content.content.parameters.forEach((param) => {
        formatted += `- **${param.name}** (${param.type}) ${param.required ? '(Required)' : '(Optional)'}\n`;
        formatted += `  ${param.description}\n`;
        if (param.example) {
          formatted += `  Example: ${param.example}\n`;
        }
      });
      formatted += '\n';
    }

    if (content.examples.languages && content.examples.languages.length > 0) {
      content.examples.languages.forEach((lang) => {
        formatted += `## ${lang.label} Example\n\n\`\`\`${lang.language}\n${lang.code}\n\`\`\`\n\n`;
      });
    }

    if (content.examples.responses && content.examples.responses.length > 0) {
      content.examples.responses.forEach((resp) => {
        formatted += `## Response (${resp.status})\n\n\`\`\`json\n${resp.body}\n\`\`\`\n\n`;
      });
    }

    if (content.content.proTips.length > 0) {
      formatted += `## Pro Tips\n\n`;
      content.content.proTips.forEach((tip) => {
        formatted += `- **${tip.type.toUpperCase()}**: ${tip.content}\n`;
      });
    }

    return formatted;
  };

  const handleCopy = async () => {
    const formattedContent = formatForLLM();

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
      className="btn btn-primary flex items-center gap-2 cursor-pointer"
      aria-label="Copy for LLM"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied for AI!
        </>
      ) : (
        <>
          <Bot className="w-4 h-4" />
          Copy for LLM
        </>
      )}
    </button>
  );
}
