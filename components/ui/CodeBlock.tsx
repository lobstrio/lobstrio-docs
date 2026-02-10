import { codeToHtml } from 'shiki';
import { CodeBlockProps } from '@/lib/types/layout.type';

export default async function CodeBlock({
  code,
  language,
  showLineNumbers = false,
}: CodeBlockProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'github-dark',
    transformers: showLineNumbers
      ? [
          {
            line(node, line) {
              node.properties['data-line'] = line;
            },
          },
        ]
      : [],
  });

  return (
    <div className="relative group">
      <div className="absolute top-3 right-3 z-10">
        <span className="badge bg-surface text-text-secondary text-xs uppercase">
          {language}
        </span>
      </div>

      <div
        className="overflow-x-auto rounded-lg text-sm [&>pre]:!bg-surface [&>pre]:!p-4 [&>pre]:!m-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
