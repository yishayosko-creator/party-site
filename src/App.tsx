import type { PurchaseOption, SectionId } from '@/types';
import { useAppLocation } from '@/utils/router';
import SiteNavbar from '@/components/SiteNavbar';
import SiteFooter from '@/components/SiteFooter';
import LandingPage from '@/pages/LandingPage';
import StudioPage from '@/pages/StudioPage';

const PURCHASE_OPTIONS: PurchaseOption[] = ['single', 'bundle', 'premium'];

export default function App() {
  const { pathname, search, hash } = useAppLocation();
  const params = new URLSearchParams(search);
  const initialPurchaseOption = PURCHASE_OPTIONS.find((option) => option === params.get('plan')) ?? 'single';
  const initialSection: SectionId = params.get('section') === 'helpers' ? 'helpers' : 'games';

  return (
    <>
      <SiteNavbar pathname={pathname} hash={hash} />
      {pathname === '/studio' ? (
        <StudioPage initialSection={initialSection} initialPurchaseOption={initialPurchaseOption} />
      ) : (
        <LandingPage hash={hash} />
      )}
      <SiteFooter />
    </>
  );
}
