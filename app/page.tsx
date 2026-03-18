import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CtaSection from '@/components/_home/CtaSection';
import HowItWorks from '@/components/_home/HowItWorks';
import FeaturesBar from '@/components/_home/FeaturesBar';
import HeroSection from '@/components/_home/HeroSection';
import ApiReference from '@/components/_home/ApiReference';
import { PYTHON_EXAMPLE } from '@/lib/home/code-example';
import { codeToHtml } from 'shiki';

export default async function HomePage() { 
  const highlightedCode = await codeToHtml(PYTHON_EXAMPLE, {
    lang: 'python',
    theme: 'github-dark',
  });

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <Header />
      <HeroSection />
      <FeaturesBar />
      <HowItWorks code={highlightedCode} rawCode={PYTHON_EXAMPLE} />      <ApiReference />
      <CtaSection />
      <Footer />
    </div>
  );
}
