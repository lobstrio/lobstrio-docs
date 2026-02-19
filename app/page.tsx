// import Header from '@/components/layout/Header';
// import CtaSection from '@/components/_home/CtaSection';
// import HowItWorks from '@/components/_home/HowItWorks';
// import FeaturesBar from '@/components/_home/FeaturesBar';
// import HeroSection from '@/components/_home/HeroSection';
// import ApiReference from '@/components/_home/ApiReference';
// import { codeToHtml } from 'shiki';
// import { PYTHON_EXAMPLE } from '@/lib/home/code-example';

// export default async function HomePage() {
//   const highlightedCode = await codeToHtml(PYTHON_EXAMPLE, {
//     lang: 'python',
//     theme: 'github-dark',
//   });

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />
//       <HeroSection />
//       <FeaturesBar />
//       <HowItWorks code={highlightedCode} />
//       <ApiReference />
//       <CtaSection />
//     </div>
//   );
// }
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/docs/authentication");
}
