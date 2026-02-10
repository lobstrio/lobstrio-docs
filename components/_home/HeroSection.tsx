import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-red/5 via-transparent to-accent-green/5" />
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Get the data you need
          </h1>
          <p className="text-xl text-text-secondary mb-8 leading-relaxed">
            The most powerful and easy-to-use data collection API.
            50+ ready-made crawlers, simple REST endpoints, structured JSON output.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/docs/authentication"
              className="inline-flex items-center gap-2 bg-accent-red hover:bg-red-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/docs/list-crawlers"
              className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary px-6 py-3 rounded-lg font-medium transition-colors border border-border hover:border-text-muted"
            >
              Explore Crawlers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
