import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CtaSection() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-text-secondary mb-8 max-w-xl mx-auto">
            Get your API key and start collecting data in minutes.
          </p>
          <Link
            href="/docs/authentication"
            className="inline-flex items-center gap-2 bg-accent-red hover:bg-red-600 text-white px-8 py-4 rounded-lg font-medium text-lg transition-colors"
          >
            Start Building
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
    </div>
  );
}
