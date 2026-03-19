import Link from 'next/link';
import { ArrowRight, ChevronDown } from 'lucide-react';

export default function CtaSection() {
  return (
    <div className="max-w-7xl px-6 md:px-[100px] py-16 rounded-[8px] border border-[#dde1ee] bg-[#f8fafc] my-16 md:my-[120px] !mx-auto">
      <div className="flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
        <div>
          <h2 className="text-[40px] font-bold leading-[1.58] mb-4">Ready to get started?</h2>
          <p className="tetx-[17px] opacity-80 mb-8 max-w-xl mx-auto">
            Get your API key and start collecting data in minutes.
          </p>
        </div>
        <div>

          <Link
            href="/docs/authentication"
            className="inline-flex items-center gap-2 leading-[1.31] bg-[#ff0000] hover:bg-[#ff0000] text-white px-5 py-3.5 rounded-lg font-semibold"
          >
            Get Started
            <ChevronDown className={`w-4 h-4 -rotate-90`} />
          </Link>
        </div>
      </div>
    </div>
  );
}
