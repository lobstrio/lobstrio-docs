import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CtaSection from '@/components/_home/CtaSection';
import HowItWorks from '@/components/_home/HowItWorks';
import FeaturesBar from '@/components/_home/FeaturesBar';
import HeroSection from '@/components/_home/HeroSection';
import ApiReference from '@/components/_home/ApiReference';
import { PYTHON_EXAMPLE } from '@/lib/home/code-example';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <Header />
      <HeroSection />
      <FeaturesBar />
      <HowItWorks rawCode={PYTHON_EXAMPLE} />
      <ApiReference />
      <CtaSection />
      <Footer />
    </div>
  );
}
