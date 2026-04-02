'use client';

import { useState } from 'react';
import CopyButton from '@/components/ui/CopyButton';

interface QuickStartTabsProps {
  goHtml: string;
  workflowHtml: string;
  goCode: string;
  workflowCode: string;
}

export default function QuickStartTabs({ goHtml, workflowHtml, goCode, workflowCode }: QuickStartTabsProps) {
  const [active, setActive] = useState<'one-command' | 'step-by-step'>('one-command');

  const html = active === 'one-command' ? goHtml : workflowHtml;
  const code = active === 'one-command' ? goCode : workflowCode;

  return (
    <>
      {/* Toggle buttons */}
      <div className="flex justify-center mb-11"> 
        <div className="inline-flex items-center bg-[#f2f5f9] border border-[#dee0ea] rounded-lg p-1 gap-2">
          <button
            onClick={() => setActive('one-command')}
            className={`px-5 py-2 rounded-md text-[13px] font-semibold leading-normal tracking-normal transition cursor-pointer ${
              active === 'one-command'
                ? 'bg-[#FF0000] text-white shadow-sm'
                : 'text-[#536679] '
            }`}
          >
            One-command examples
          </button>
          <button
            onClick={() => setActive('step-by-step')}
            className={`px-5 py-2 rounded-md text-[13px] font-semibold leading-normal tracking-normal transition cursor-pointer ${
              active === 'step-by-step'
                ? 'bg-[#FF0000] text-white shadow-sm'
                : 'text-[#536679]'
            }`}
          >
            Step-by-step workflow
          </button>
        </div>
      </div>

      {/* Single terminal */}
      <div className="bg-[#0a2540] rounded-xl overflow-hidden">
        <div className="flex justify-between items-center gap-2 px-4 py-3">
          <span
            className=" text-[#e1e4e8] text-[13px]"
            style={{ fontFamily: 'var(--font-jetbrains-mono)' }}
          >
            {'>'}_&nbsp; terminal
          </span>
          <CopyButton text={code} variant="dark" className="border !border-[#213447] !bg-[#213447]" />
        </div>
        <div
          className="h-[362px] overflow-y-auto overflow-x-hidden text-sm [&>pre]:!text-[13px] [&>pre]:!leading-relaxed [&>pre]:!whitespace-pre-wrap [&>pre]:!break-words [&_code]:!whitespace-pre-wrap [&_code]:!break-words [&>pre]:!p-5 [&>pre]:!m-0 [&>pre]:!min-h-full"
          style={{ backgroundColor: '#0a1b2b' }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </>
  );
}
