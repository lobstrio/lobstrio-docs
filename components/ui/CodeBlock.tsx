import { codeToHtml } from 'shiki';
import { CodeBlockProps } from '@/lib/types/layout.type';
import CopyButton from './CopyButton';

export default async function CodeBlock({
  code,
  language,
  showLineNumbers = false,
  theme = 'dark',
  showCopy = false,
  showLabel = true,
  showBorder = false,
  codeBg,
  className,
  style,
}: CodeBlockProps) {
  const shikiTheme = theme === 'dark' ? 'github-dark' : 'github-light';

  // Safe: Shiki generates trusted HTML at build time from hardcoded code strings, not user input
  const html = await codeToHtml(code, {
    lang: language,
    theme: shikiTheme,
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

  const preStyles = className ? className : codeBg
    ? '[&>pre]:!p-4 [&>pre]:!m-0'
    : theme === 'dark'
      ? '[&>pre]:!bg-surface [&>pre]:!p-4 [&>pre]:!m-0'
      : '[&>pre]:!bg-[#F6F8FA] [&>pre]:!p-5 [&>pre]:!m-0 [&>pre]:!rounded-b-lg';

  const processedHtml = codeBg
    ? html.replace(/(<pre[^>]*style="[^"]*background-color:)[^;]*(;)/, `$1${codeBg}$2`)
    : html;

  return (
    <div className="relative group">
      {showLabel && (
        <div className="absolute top-3 right-3 z-10">
          <span className="badge bg-surface text-text-secondary text-xs uppercase">
            {language}
          </span>
        </div>
      )}

      {showCopy && (
        <div className={`absolute ${showLabel ? 'top-12' : 'inset-y-0 flex items-center'} right-3 z-10`}>
          <CopyButton text={code} />
        </div>
      )}

      <div
        className={`overflow-x-hidden overflow-y-auto rounded-lg text-sm [&>pre]:!text-[13px] [&>pre]:!leading-relaxed [&>pre]:!whitespace-pre-wrap [&_code]:!whitespace-pre-wrap ${preStyles} ${showBorder ? 'border border-[#E5E7EB] [&>pre]:!bg-[#F6F8FA]' : ''} `}
        style={codeBg ? { backgroundColor: codeBg } : undefined}
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />
    </div>
  );
}
