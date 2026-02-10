import Link from 'next/link';
import CodePreview from './CodePreview';
import { ArrowRight } from 'lucide-react';
import { HOW_IT_WORKS } from './Home.dto';

export default function HowItWorks({ code }: { code: string }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">How it works</h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Start collecting data in minutes. No infrastructure to manage, no proxies to configure.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          {HOW_IT_WORKS.map((item) => (
            <Link
              key={item.step}
              href={item.link}
              className="flex gap-4 p-4 rounded-lg border border-transparent hover:border-border hover:bg-surface/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-accent-red text-white font-bold flex items-center justify-center flex-shrink-0">
                {item.step}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold group-hover:text-accent-red transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-text-muted mt-1">
                  {item.desc}
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-text-muted group-hover:text-accent-red transition-colors flex-shrink-0 mt-2" />
            </Link>
          ))}
        </div>
        <CodePreview html={code} />
      </div>
    </div>
  );
}
