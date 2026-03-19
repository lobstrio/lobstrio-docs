import Link from 'next/link';
import CodePreview from './CodePreview';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { HOW_IT_WORKS } from './Home.dto';

export default function HowItWorks({ code, rawCode }: { code: string; rawCode: string }) {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-0 py-[120px] overflow-hidden">
      <div className="text-center mb-20">
        <h2 className="text-[40px] leading-[1.58] font-bold mb-4">How it works</h2>
        <p className=" max-w-2xl mx-auto leading-[1.28] opacity-90">
          Start collecting data in minutes. No infrastructure to manage, no proxies to configure.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start min-w-0">
        <div className="space-y-4">
          {HOW_IT_WORKS.map((item) => (
            <Link
              key={item.step}
              href={item.link}
              className="flex justify-between items-center px-7 py-6 rounded-lg border hover:border-[#dde1ee] border-[#dde1ee] bg-[#fff] hover:bg-[#f2f5f9] transition-all group"
            >

             <div className='flex flex-col gap-2'>
                <h3 className="text-[18px] font-bold leading-[1.28] group-hover:text-[#ff0000] transition-colors">
                  <span className='text-[#ff0000]'>{item.step}. </span> {item.title}
                </h3>
              <p className="opacity-60 leading-[1.44] pl-6">
                {item.desc}
              </p>
              </div>
      
              <ChevronDown className={`w-4 h-4 group-hover:text-[#ff0000] -rotate-90 opacity-90`} />
            </Link>
          ))}
        </div>
        <CodePreview html={code} rawCode={rawCode} />      </div>
    </div>
  );
}
