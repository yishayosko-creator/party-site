import { useEffect } from 'react';
import AmbientBackdrop from '@/components/AmbientBackdrop';
import MobileCtaBar from '@/components/MobileCtaBar';
import SalesHero from '@/components/sales/SalesHero';
import PricingPlans from '@/components/sales/PricingPlans';
import HowItWorks from '@/components/sales/HowItWorks';
import FreeSamples from '@/components/sales/FreeSamples';
import FreeToolsTeaser from '@/components/sales/FreeToolsTeaser';
import FaqSection from '@/components/sales/FaqSection';
import { navigateTo } from '@/utils/router';

interface LandingPageProps {
  hash: string;
}

export default function LandingPage({ hash }: LandingPageProps) {
  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [hash]);

  return (
    <div dir="rtl" className="min-h-screen bg-cream-100 text-ink relative overflow-x-hidden pb-24 md:pb-0">
      <AmbientBackdrop />
      <SalesHero />
      <PricingPlans onSelectPlan={(option) => navigateTo(`/studio?plan=${option}`)} />
      <HowItWorks />
      <FreeToolsTeaser onOpenHelpers={() => navigateTo('/studio?section=helpers')} />
      <FreeSamples />
      <FaqSection />
      <MobileCtaBar />
    </div>
  );
}
