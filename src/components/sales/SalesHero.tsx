import { ArrowDown, Printer, Sparkles, Star } from 'lucide-react';
import SiteLink from '@/components/SiteLink';
import { BalloonsIllustration, CakeIllustration } from '@/components/sales/HeroIllustrations';

const PREVIEW_WORDS = [
  'מסיבה', 'בלונים', 'עוגה', 'כובע', 'ריקודים',
  'מתנה', 'קונפטי', 'ממתקים', 'שיר', 'צחוק',
  'גלידה', 'מוזיקה', 'פיניאטה', 'נר', 'כיף',
  'צבעים', 'זיקוקין', 'ילדים', 'שמח', 'חברים',
  'קופסה', 'לחיצת יד', 'שולחן', 'גביע', 'כוכב',
];

const CELL_TONES = [
  'bg-party-50 text-party-700',
  'bg-ocean-50 text-ocean-700',
  'bg-cream-100 text-ink/80',
];

function PreviewCell({ label, tone }: { label: string; tone: number }) {
  return (
    <div
      className={`rounded-md sm:rounded-lg flex items-center justify-center text-center text-[8px] sm:text-[10px] font-700 leading-tight p-0.5 ${CELL_TONES[tone]}`}
    >
      {label}
    </div>
  );
}

function PrintableCardPreview() {
  return (
    <div className="aspect-square rounded-3xl overflow-hidden shadow-float bg-white border border-cream-200 p-3 sm:p-4 flex flex-col">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="font-display font-800 text-xs sm:text-sm text-ink">בינגו ליום הולדת</span>
        <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-700 text-party-600">
          <Printer className="w-3 h-3" /> להדפסה
        </span>
      </div>
      <div className="grid grid-cols-5 gap-1 sm:gap-1.5 flex-1">
        {PREVIEW_WORDS.slice(0, 12).map((word, index) => (
          <PreviewCell key={word} label={word} tone={index % 3} />
        ))}
        <div className="rounded-md sm:rounded-lg flex items-center justify-center bg-confetti-orange-500 text-white">
          <Star className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" />
        </div>
        {PREVIEW_WORDS.slice(12, 24).map((word, index) => (
          <PreviewCell key={word} label={word} tone={(index + 1) % 3} />
        ))}
      </div>
    </div>
  );
}

export default function SalesHero() {
  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-12 sm:pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
        <div className="text-center lg:text-start animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-cream-200 text-xs font-700 text-party-600 mb-5">
            <Printer className="w-3.5 h-3.5" /> משחקים להדפסה, מוכנים תוך דקות
          </div>
          <h1 className="font-display font-900 text-4xl sm:text-5xl lg:text-6xl text-ink leading-[1.15] text-balance">
            יום הולדת בלתי נשכח{' '}
            <span className="bg-gradient-to-l from-party-500 via-party-600 to-party-700 bg-clip-text text-transparent">
              מתחיל כאן!
            </span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto lg:mx-0 text-ink/60 font-500 text-base sm:text-lg leading-relaxed">
            משחקים אישיים, חידונים והזמנות מעוצבות – כל מה שצריך למסיבה מושלמת.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
            <SiteLink
              to="/studio"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-700 text-white bg-party-600 hover:bg-party-700 shadow-md transition w-full sm:w-auto justify-center"
            >
              <Sparkles className="w-5 h-5" /> התחילו ליצור משחק
            </SiteLink>
            <SiteLink
              to="/#samples"
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl font-700 text-ink bg-white border border-cream-300 hover:border-party-300 transition w-full sm:w-auto justify-center"
            >
              <ArrowDown className="w-5 h-5" /> הורידו דוגמה בחינם
            </SiteLink>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="col-span-2 aspect-[16/10] rounded-3xl overflow-hidden shadow-float">
            <CakeIllustration className="w-full h-full block" />
          </div>
          <PrintableCardPreview />
          <div className="aspect-square rounded-3xl overflow-hidden shadow-float">
            <BalloonsIllustration className="w-full h-full block" />
          </div>
        </div>
      </div>
    </section>
  );
}
