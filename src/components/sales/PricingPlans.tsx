import { Check, Crown, Package, Gamepad2 } from 'lucide-react';
import type { PurchaseOption } from '@/types';
import { SALES_PLANS, type SalesPlan } from '@/data/salesContent';
import { formatShekel } from '@/utils/pricing';

interface PricingPlansProps {
  onSelectPlan: (option: PurchaseOption) => void;
}

const PLAN_ICONS: Record<PurchaseOption, typeof Gamepad2> = {
  single: Gamepad2,
  bundle: Package,
  premium: Crown,
};

function PlanCard({ plan, onSelect }: { plan: SalesPlan; onSelect: () => void }) {
  const Icon = PLAN_ICONS[plan.id];
  const featured = plan.featured;

  return (
    <article
      className={`relative flex flex-col rounded-3xl p-6 sm:p-7 border transition duration-300 hover:-translate-y-1 ${
        featured
          ? 'bg-ink text-cream-50 border-2 border-[#d4af37] shadow-[0_0_0_1px_rgba(212,175,55,0.45),0_24px_50px_-20px_rgba(212,175,55,0.55)] md:scale-[1.04] z-10'
          : 'bg-white text-ink border-cream-200 shadow-card'
      }`}
    >
      {featured && (
        <span className="absolute -top-3 start-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#d4af37] text-ink text-xs font-800 shadow-md whitespace-nowrap">
          הבחירה המומלצת
        </span>
      )}

      <div className="flex items-center gap-2.5">
        <div
          className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
            featured ? 'bg-party-500 text-white' : 'bg-party-50 text-party-600'
          }`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="font-display font-800 text-xl">{plan.name}</h3>
      </div>

      <div className="mt-5 flex items-baseline gap-1">
        <span className="font-display font-900 text-5xl">{formatShekel(plan.priceAgorot)}</span>
      </div>
      <p className={`mt-1 text-xs font-600 ${featured ? 'text-cream-200/70' : 'text-ink/45'}`}>
        קובץ דיגיטלי להורדה ולמימוש/הדפסה עצמית
      </p>
      <p className={`mt-2 text-sm font-500 leading-relaxed ${featured ? 'text-cream-200/80' : 'text-ink/60'}`}>
        {plan.audience}
      </p>

      <ul className="mt-6 space-y-3 flex-1">
        {plan.includes.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm font-500">
            <Check className={`w-4 h-4 mt-0.5 shrink-0 ${featured ? 'text-party-300' : 'text-party-500'}`} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onSelect}
        className={`mt-7 w-full py-3.5 rounded-2xl font-700 transition shadow-md ${
          featured ? 'bg-party-500 hover:bg-party-400 text-white' : 'bg-ink hover:bg-ink/85 text-cream-50'
        }`}
      >
        {plan.cta}
      </button>
    </article>
  );
}

export default function PricingPlans({ onSelectPlan }: PricingPlansProps) {
  return (
    <section id="pricing" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-xs font-800 text-party-600 mb-2">מחירים</p>
        <h2 className="font-display font-900 text-3xl sm:text-4xl text-ink text-balance">בחרו את החבילה למסיבה שלכם</h2>
        <p className="mt-3 text-ink/55 font-500">תשלום חד-פעמי, בלי מנוי. הקובץ נשאר אצלכם להדפסה.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5 lg:gap-7 items-stretch pt-3">
        {SALES_PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} onSelect={() => onSelectPlan(plan.id)} />
        ))}
      </div>
    </section>
  );
}
