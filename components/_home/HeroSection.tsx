import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="bg-[#fff]">
      <div className="max-w-7xl mx-auto px-6 md:px-0 pt-24 pb-[120px]">
        <div className="text-center mx-auto">
          <h1 className="text-[40px] sm:text-[60px] lg:text-[80px] font-black leading-[1.29]">
            Get the data you need
          </h1>
          <p className="text-[18px] font-normal pt-6.5 pb-11 leading-[1.83] text-center opacity-90" style={{ fontFamily: 'SegoeUI, sans-serif' }}>
            The most powerful and easy-to-use data collection API. 50+ ready-made crawlers, <br className="hidden sm:block" />
            simple REST endpoints, structured JSON output.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/authentication"
              className="inline-flex items-center gap-2 leading-[1.31] bg-[#ff0000] hover:bg-[#ff0000] text-white px-5 py-3.5 rounded-lg font-semibold"
            >
              Get Started
               <ChevronDown className={`w-4 h-4 -rotate-90`} />
            </Link>
            <Link
              href="/list-crawlers"
              className="inline-flex items-center gap-2 leading-[1.31] text-[#ff0000]  hover:text-[#fff] px-5 py-3.5 rounded-lg font-semibold border border-[#FF0000] hover:bg-[#ff0000]"
            >
              Explore Crawlers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
