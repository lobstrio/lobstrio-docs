import { ExternalLink } from 'lucide-react';
import HeroButton from '@/components/ui/HeroButton';

export default function CliHero() {
  return (
    <section>
      <div className="max-w-4xl mx-auto px-6 py-10 md:py-[80px] text-center">
        <div className="inline-flex items-center gap-2 px-2 py-1 rounded-lg border border-[#FF7F7F] bg-[#FEF2F2] text-[#FF0000] text-sm mb-6">
          Command Line Interface
        </div>
        <h1 className="text-[40px] md:text-[64px] font-[900] text-[#0A2540] leading-[1.2] md:leading-[78px] tracking-normal text-center mb-10">
          Run <span className="text-[#ff0000]">scrapers</span> from<br />your terminal
        </h1>
        <p className="text-[18px] font-normal text-[#111827]/70 max-w-2xl mx-auto leading-[1.78] tracking-normal text-center">
          Install the lobstr.io CLI, browse 50+ crawlers, and start scraping Google Maps, LinkedIn, or any platform — without ever touching the UI
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <HeroButton label="Quick start" href="#quickstart" />
          <a href="https://pypi.org/project/lobstrio/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 h-[50px] px-[26px] rounded-lg font-semibold text-lg text-[#FF0000] border border-[#FF0000] hover:bg-[#FF0000] hover:text-white transition whitespace-nowrap">View on PyPI <ExternalLink className="w-4 h-4" /></a>
        </div>
      </div>
    </section>
  );
}
