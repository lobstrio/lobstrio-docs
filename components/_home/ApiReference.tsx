import Link from 'next/link';
import { API_REFERENCE } from './Home.dto';

export default function ApiReference() {
  return (
    <div className=" border-y border-[#dde1ee]">
      <div className="max-w-7xl mx-auto px-6 md:px-0 py-[70px]">
        <div className="text-center mb-[60px]">
          <h2 className="text-[40px] font-bold leading-[1.58] mb-4">API Reference</h2>
          <span className='text-[18px] opacity-90 leading-[1.28]'>
            Everything you need to integrate Lobstr.io into your workflow
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {API_REFERENCE.map((item) => (
            <Link
              key={item.slug}
              href={`/docs/${item.slug}`}
              className="block p-[24px] bg-[#fff] border border-[#dde1ee] hover:bg-[#f2f5f9] rounded-lg group"
            >
              <h3 className="text-[18px] font-bold leading-[1.83] group-hover:text-[#ff0000] mb-2">
                {item.title}
              </h3>
              <span className="leading-[1.88] opacity-70">{item.desc}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
