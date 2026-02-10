import Link from 'next/link';
import { API_REFERENCE } from './Home.dto';

export default function ApiReference() {
  return (
    <div className="bg-surface/50 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">API Reference</h2>
          <p className="text-text-secondary">
            Everything you need to integrate Lobstr.io into your workflow
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {API_REFERENCE.map((item) => (
            <Link
              key={item.slug}
              href={`/docs/${item.slug}`}
              className="block p-5 bg-background border border-border rounded-xl hover:border-accent-red hover:shadow-lg transition-all group"
            >
              <h3 className="font-semibold group-hover:text-accent-red transition-colors mb-2">
                {item.title}
              </h3>
              <span className="text-sm text-text-muted">{item.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
