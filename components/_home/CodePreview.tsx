"use client";

import CopyButton from "@/components/ui/CopyButton";

export default function CodePreview({ rawCode }: { rawCode: string }) {
  return (
    <div className="md:sticky md:top-6 w-full min-w-0">
      <div className="bg-[#0a2540] rounded-xl h-[600px] md:h-[800px] flex flex-col overflow-hidden">
        <div className="flex justify-between items-center gap-2 px-4 py-3 shrink-0">
          <span className="leading-[2.06] text-white ">example.py</span>
          <CopyButton text={rawCode} variant="dark" className="ml-auto border !border-[#213447] !bg-[#213447]" />
        </div>
        <pre className="overflow-scroll  !max-h-full flex-1 p-4 text-[13px] text-white leading-relaxed bg-[#0a1b2b]  whitespace-pre-wrap m-0 font-mono">
          {rawCode}
        </pre>
      </div>
    </div>
  );
}
