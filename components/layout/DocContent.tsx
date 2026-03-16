import { marked } from 'marked';
import { DocContentProps } from '@/lib/types/layout.type';
import { getMethodBadgeClass } from '@/lib/utils/code-generator';
import ProTip from '@/components/ui/ProTip';
import CustomTable from '@/components/docs/CustomTable';
import ParametersList from '@/components/docs/ParametersList';
import CopyForLLMButton from '@/components/ui/CopyForLLMButton';
import ResponseFieldsList from '@/components/docs/ResponseFieldsList';

export default function DocContent({ content }: DocContentProps) {
  const methodBadgeClass = getMethodBadgeClass(content.metadata.method);
  const renderer = new marked.Renderer();
  renderer.code = (token: any) => {
    const code = token.text || token;
    const lang = token.lang || 'text';
    const escapedCode = String(code)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    return `
      <div class="my-6 relative group">
        <div class="absolute top-[17px] right-5 z-10">
          <span class="inline-block px-3.5 py-1.5 text-sm leading-[1.36] font-normal  uppercase bg-[#ffffff] opacity-80 leading-[1.36] rounded-lg border border-[#dde1ee]">
            ${lang}
          </span>
        </div>
        <div class="bg-[#f2f5f9]/50 border border-[#dde1ee] rounded-lg overflow-hidden">
          <pre class="py-[19px] px-[22px] overflow-x-auto !text-base leading-[1.19]"><code class="language-${lang}">${escapedCode}</code></pre>
        </div>
      </div>
    `;
  };

  renderer.codespan = (token: any) => {
    const code = token.text || token;
    return `<code class="px-1.5 py-0.5 text-[18px] font-medium bg-[#0a25400d] border border-[#0a25401c] rounded-[7px] font-mono">${code}</code>`;
  };

  const processIntroductionWithSections = (): { parts: (string | React.ReactNode)[]; renderedSections: Set<string> } => {
    const text = content.content.introduction;
    const markerRegex = /\{\{RENDER:(\w+)\}\}/g;
    const parts: (string | React.ReactNode)[] = [];
    const renderedSections = new Set<string>();
    let lastIndex = 0;
    let match;
    let sectionIndex = 0;

    while ((match = markerRegex.exec(text)) !== null) {
      const textBefore = text.substring(lastIndex, match.index);
      if (textBefore) {
        const html = marked.parse(textBefore, {
          async: false,
          breaks: true,
          gfm: true,
          renderer: renderer,
        }) as string;
        parts.push(html);
      }

      const sectionName = match[1];
      const section = content.content.sections?.[sectionName];

      if (section) {
        renderedSections.add(sectionName);
        if ('fields' in section) {
          parts.push(
            <ResponseFieldsList
              key={`inline-section-${sectionIndex++}`}
              title={section.title}
              fields={section.fields}
            />
          );
        } else if ('parameters' in section) {
          parts.push(
            <ParametersList
              key={`inline-section-${sectionIndex++}`}
              title={section.title}
              parameters={section.parameters}
            />
          );
        } else if ('columns' in section && 'rows' in section) {
          parts.push(
            <CustomTable
              key={`inline-section-${sectionIndex++}`}
              title={section.title}
              columns={section.columns}
              rows={section.rows}
            />
          );
        }
      }

      lastIndex = match.index + match[0].length;
    }

    const textAfter = text.substring(lastIndex);
    if (textAfter) {
      const html = marked.parse(textAfter, {
        async: false,
        breaks: true,
        gfm: true,
        renderer: renderer,
      }) as string;
      parts.push(html);
    }

    return { parts, renderedSections };
  };

  const { parts: contentParts, renderedSections } = processIntroductionWithSections();

  const unmentiondSections = content.content.sections
    ? Object.entries(content.content.sections).filter(([key]) => !renderedSections.has(key))
    : [];

  return (
    <div className="prose prose-invert max-w-none">
      <div className="flex items-center justify-between mb-6 text-[#0a2540]">
        <div className="flex-1">
          <div  className={`flex items-center gap-2.5 ${
             !content.metadata?.method && !content.metadata?.endpoint ? "opacity-0" : ""
          }`}>
            <span className={`badge ${methodBadgeClass}`}>
              {content.metadata.method}
            </span>
            <code className="text-base  bg-white px-3 pt-1 rounded-[7px] border border-[#dee0ea] text-[#0a2540]">
              {content.metadata.endpoint}
            </code>
          </div> 
        
        </div>
        <div className="ml-4">
          <CopyForLLMButton content={content} />
        </div>
      </div>
        <h1 className="text-5xl leading-[1.33] font-black mb-10">{content.title}</h1>
        <span className="text-[18px] text-[#0a2540] leading-[1.56] opacity-90">{content.description}</span>
      <div className="text-lg leading-relaxed mb-10">
        {contentParts.map((part, index) =>
          typeof part === 'string' ? (
            <div key={index} dangerouslySetInnerHTML={{ __html: part }} />
          ) : (
            part
          )
        )}
      </div>

      {content.content.headers.length > 0 && (
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-7.5">Headers</h2>
          <div className="border border-[#dde1ee] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#dde1ee] bg-[#f2f5f9] rounded-t-[8px]">
                  <th className="text-left px-[29px] py-3 font-bold leading-[1.31]">
                    Key
                  </th>
                  <th className="text-left px-[29px] py-3 font-bold leading-[1.31]">
                    Value
                  </th>
                  <th className="text-left px-[29px] py-3 font-bold leading-[1.31]">
                    Required
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dde1ee]">
                {content.content.headers.map((header, index) => (
                  <tr
                    key={index}
                  >
                    <td className="px-[29px] pt-[18px] pb-[19px] leading-[1.19]">
                      <span className=" text-[#ff0000]">
                        {header.key}
                      </span>
                    </td>
                    <td className="px-[29px] pt-[18px] pb-[19px] leading-[1.31]">
                      <span className="opacity-80">
                        {header.value}
                      </span>
                    </td>
                    <td className="px-[29px] pt-[18px] pb-[19px] leading-[1.31]">
                      <span
                        className={` ${
                          header.required ? 'font-semibold text-[#10b981]' : 'opacity-60'
                        }`}
                      >
                        {header.required ? 'Yes' : 'No'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {unmentiondSections.length > 0 && (
        <div className="mb-8">
          {unmentiondSections.map(([key, section]) => {
            if ('fields' in section) {
              return (
                <ResponseFieldsList
                  key={`section-${key}`}
                  title={section.title}
                  fields={section.fields}
                />
              );
            } else if ('parameters' in section) {
              return (
                <ParametersList
                  key={`section-${key}`}
                  title={section.title}
                  parameters={section.parameters}
                />
              );
            } else if ('columns' in section && 'rows' in section) {
              return (
                <CustomTable
                  key={`section-${key}`}
                  title={section.title}
                  columns={section.columns}
                  rows={section.rows}
                />
              );
            }
            return null;
          })}
        </div>
      )}

      {content.content.parameters.length > 0 && (
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-5">Parameters</h2>
          <div>
            {content.content.parameters.map((param, index) => (
              <div
                key={index}
                className={`border-t border-[#dde1ee] py-[30px] ${index === content.content.parameters.length - 1 ? ' border-b' : ''}`}
              >
                <div className="flex items-start gap-2.5 mb-[15px]">
                  <div>
                    <span className="text-base leading-[1.31] text-[#FF0000] font-bold mr-3.5">
                      {param.name}
                    </span>
                    <span className="badge-label border border-[#dee0ea] bg-[#fff]">
                      {param.type}
                    </span>
                  </div>
                  <span
                    className={`badge-label ${
                      param.required ? 'badge-get' : 'badge-post'
                    }`}
                  >
                    {param.required ? 'Required' : 'Optional'}
                  </span>
                </div>
                <span className="text-base leading-[1.31]">{param.description}</span>
                {param.example && (
                  <div className="mt-4.5 flex items-center">
                    <span className="text-base leading-[1.31] opacity-60 mr-3.5">Example: </span>
                    <code className="inline-block w-full text-base leading-[1.19] border border-[#dde1ee] bg-[#fbfcfd] px-3.5 py-2.5 rounded-[8px]">
                      {param.example.replaceAll(`"`, "")}
                    </code>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {content.content.proTips.length > 0 && (
        <div className="my-10 space-y-5">
          {content.content.proTips.map((tip, index) => (
            <ProTip key={index} type={tip.type}>
              {tip.content}
            </ProTip>
          ))}
        </div>
      )}

      {content.content.additionalNotes && (
        <div className="mt-8">
          <h2 className="text-3xl font-bold mb-5">Additional Notes</h2>
          <p className="text-text-secondary leading-relaxed">
            {content.content.additionalNotes}
          </p>
        </div>
      )}
    </div>
  );
}
