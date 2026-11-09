import { Sparkles } from 'lucide-react';
import SiteLink from '@/components/SiteLink';

export default function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden px-4 pt-3 pb-4 bg-cream-50/95 backdrop-blur-md border-t border-cream-200 shadow-[0_-8px_24px_rgba(28,31,38,0.08)]">
      <SiteLink
        to="/studio"
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-700 text-white bg-party-600 hover:bg-party-700 shadow-md transition"
      >
        <Sparkles className="w-5 h-5" /> התחילו ליצור משחק
      </SiteLink>
    </div>
  );
}
