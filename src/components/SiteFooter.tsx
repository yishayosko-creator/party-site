import { Heart } from 'lucide-react';
import SiteLink from '@/components/SiteLink';

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-cream-200/60 bg-cream-50/70 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-ink/50 text-sm font-500">
          <Heart className="w-4 h-4 text-party-400" />
          נוצר עבור ימי הולדת בלתי נשכחים
        </div>
        <div className="flex items-center gap-4 text-xs font-600 text-ink/50">
          <SiteLink to="/#faq" className="hover:text-ink transition">שאלות נפוצות</SiteLink>
          <SiteLink to="/studio" className="hover:text-ink transition">סטודיו המשחקים</SiteLink>
          <span className="text-ink/35 font-500">הורדות ה-PDF מעובדות בבטחה דרך Payhip.</span>
        </div>
      </div>
    </footer>
  );
}
