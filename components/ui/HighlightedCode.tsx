import { codeToHtml } from 'shiki';
import { HighlightedCodeProps } from '@/lib/types/layout.type';

export default async function HighlightedCode({
  code,
  language,
}: HighlightedCodeProps) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'github-dark',
  });

  return (
    <div
      className="[&>pre]:!bg-black/30 [&>pre]:!rounded-lg [&>pre]:!p-4 [&>pre]:!m-0 [&>pre]:!border [&>pre]:!border-border [&>pre]:!overflow-x-auto [&>pre]:!text-sm"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
