'use client';

import { useState } from 'react';
import CopyButton from '@/components/ui/CopyButton';
import { CodeColumnProps } from '@/lib/types/layout.type';
import { getStatusBadgeClass, getStatusText } from '@/lib/helpers/status';

export default function CodeColumn({ examples, highlightedCode }: CodeColumnProps) {
  const [activeLanguageIndex, setActiveLanguageIndex] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const [activeResponseIndex, setActiveResponseIndex] = useState(0);

  if (!highlightedCode) {
    return (
      <div className="p-6 h-full flex items-center justify-center">
        <p className="text-text-muted">Loading code examples...</p>
      </div>
    );
  }

  const languages = highlightedCode.languages || [];
  const responses = highlightedCode.responses || [];
  const activeLanguage = languages[activeLanguageIndex];
  const activeResponse = responses[activeResponseIndex];

  return (
    <div className="px-6 py-8 h-full flex flex-col">
      <div className="flex flex-wrap items-center  gap-x-2 gap-y-1 mb-4 border-b border-border">
        {languages.map((lang, index) => (
          <button
            key={lang.language}
            onClick={() => {
              setActiveLanguageIndex(index);
              setShowResponse(false);
            }}
            className={`px-4 py-2 text-base hover:opacity-100  hover:text-[#f00] font-semibold border-b-2 transition-colors cursor-pointer ${!showResponse && activeLanguageIndex === index
                ? 'border-[#ff0000] text-[#ff0000]'
                : 'border-transparent opacity-40 text-[#0a2540]'
              }`}
          >
            {lang.label}
          </button>
        ))}
        {responses.length > 0 && (
          <button
            onClick={() => setShowResponse(true)}
            className={`px-4 py-2 text-base font-semibold border-b-2 transition-colors cursor-pointer ${showResponse
                ? 'border-[#ff0000] text-[#ff0000]'
                : 'border-transparent opacity-40 text-[#0a2540] hover:opacity-100 hover:text-[#f00]'
              }`}
          >
            Response
          </button>
        )}
      </div>

      {showResponse && responses.length > 1 && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          {responses.map((response, index) => (
            <button
              key={response.status}
              onClick={() => setActiveResponseIndex(index)}
              className={`px-3 py-1.5 text-xs font-medium rounded transition-colors cursor-pointer ${activeResponseIndex === index
                  ? getStatusBadgeClass(response.status) + ' ring-2 ring-offset-2 ring-offset-code-bg ring-white/20'
                  : 'bg-surface text-text-muted hover:text-text-secondary border border-border'
                }`}
            >
              {response.status}
            </button>
          ))}
        </div>
      )}

      {
        responses.length > 0 && (
         <div className="flex-1 "> 
            <div className="relative border border-[#e5e5eb] p-[0.5px] rounded-md">
              <div className="absolute top-3 right-3 z-10">
                <CopyButton
                  text={showResponse ? activeResponse?.body || '' : activeLanguage?.code || ''}
                />
              </div>

              {!showResponse && activeLanguage && (
                <div
                  className="overflow-auto code-scroll"
                  dangerouslySetInnerHTML={{ __html: activeLanguage.html }}
                />
              )}

              {showResponse && activeResponse && (
                <div
                  className="overflow-auto code-scroll"
                  dangerouslySetInnerHTML={{ __html: activeResponse.html }}
                />
              )}
            </div>

            {showResponse && activeResponse && (
              <div className="mt-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-text-muted">Status:</span>
                  <span className={`badge ${getStatusBadgeClass(activeResponse.status)}`}>
                    {activeResponse.status}
                  </span>
                  <span className="text-sm text-text-muted">
                    {getStatusText(activeResponse.status)}
                  </span>
                </div>
              </div>
            )}
          </div>
        )
      }
    </div>
  );
}
