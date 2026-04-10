import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github, Linkedin, Twitter } from 'lucide-react';

const LOGO_STYLE = { fontFamily: "'Source Sans 3', 'Source Sans 3 Fallback', sans-serif" };

export default function Footer() {
  return (
    <footer className="border-t border-[#dde1ee]" style={{ backgroundImage: 'linear-gradient(to bottom, #f1f4ff, #f9fafd)' }}>
      <div className="max-w-[1600px] mx-auto px-8 py-10">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex flex-col gap-10 md:flex-row md:gap-24">
            {/* Logo + tagline + socials */}
            <div>
              <Link href="/" className="flex items-center gap-2">
                <Image src="/icon.svg" alt="lobstr.io" width={28} height={28} />
                <span className="text-[26px] text-[#ff0000] font-bold leading-[1.08]" style={LOGO_STYLE}>lobstr.io</span>
                <span className="text-[22px] leading-[1.36]">docs</span>
              </Link>
              <p className="text-[13px] text-[#0A2540]/40 mt-3 max-w-[180px] leading-relaxed">Scraping API documentation, SDKs, and developer tools.</p>
              <div className="flex items-center gap-3 mt-4">
                <a href="https://github.com/lobstrio" target="_blank" rel="noopener noreferrer" className="text-[#0A2540]/30 hover:text-[#0A2540]/70 transition"><Github className="w-[17px] h-[17px]" /></a>
                <a href="https://twitter.com/lobstrio" target="_blank" rel="noopener noreferrer" className="text-[#0A2540]/30 hover:text-[#0A2540]/70 transition"><Twitter className="w-[17px] h-[17px]" /></a>
                <a href="https://linkedin.com/company/lobstr" target="_blank" rel="noopener noreferrer" className="text-[#0A2540]/30 hover:text-[#0A2540]/70 transition"><Linkedin className="w-[17px] h-[17px]" /></a>
              </div>
            </div>
            {/* Link columns */}
            <div className="flex flex-wrap gap-16">
              <div>
                <p className="font-bold text-sm opacity-90 mb-3">API</p>
                <ul className="space-y-2 text-sm text-[#0A2540]/60">
                  <li><Link href="/docs/authentication" className="hover:text-[#ff0000]">Authentication</Link></li>
                  <li><Link href="/docs/list-crawlers" className="hover:text-[#ff0000]">Crawlers</Link></li>
                  <li><Link href="/docs/create-squid" className="hover:text-[#ff0000]">Squids</Link></li>
                  <li><Link href="/docs/get-results" className="hover:text-[#ff0000]">Results</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-sm opacity-90 mb-3">Tools</p>
                <ul className="space-y-2 text-sm text-[#0A2540]/60">
                  <li><Link href="/docs/sdk" className="hover:text-[#ff0000]">Python SDK</Link></li>
                  <li><Link href="/docs/cli" className="hover:text-[#ff0000]">CLI</Link></li>
                  <li><Link href="/docs/mcp" className="hover:text-[#ff0000]">MCP Server</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-sm opacity-90 mb-3">Resources</p>
                <ul className="space-y-2 text-sm text-[#0A2540]/60">
                  <li><a href="https://lobstr.io/blog" target="_blank" className="hover:text-[#ff0000] flex items-center gap-1">Blog <ExternalLink className="w-3 h-3" /></a></li>
                  <li><a href="https://github.com/lobstrio/lobstrio-docs" target="_blank" className="hover:text-[#ff0000] flex items-center gap-1">GitHub <ExternalLink className="w-3 h-3" /></a></li>
                  <li><a href="https://lobstr.crisp.help/en/" target="_blank" className="hover:text-[#ff0000] flex items-center gap-1">Help Center <ExternalLink className="w-3 h-3" /></a></li>
                  <li><a href="https://lobstr.io" target="_blank" className="hover:text-[#ff0000] flex items-center gap-1">lobstr.io <ExternalLink className="w-3 h-3" /></a></li>
                </ul>
              </div>
            </div>
          </div>
          {/* Right actions */}
          <div className="flex flex-col items-center gap-4 md:items-end shrink-0">
            <a
              href="https://app.lobstr.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center leading-[1.31] gap-2 text-[#ff0000] hover:text-white px-5 py-3 rounded-lg font-semibold border border-[#FF0000] hover:bg-[#ff0000] w-fit"
            >
              Dashboard
            </a>
          </div>
        </div>
        <div className="border-t border-[#dde1ee] mt-8 pt-5 text-[13px] text-[#0A2540]/35">
          &copy; lobstr.io
        </div>
      </div>
    </footer>
  );
}
