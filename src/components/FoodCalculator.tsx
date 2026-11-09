import { useMemo, useState } from 'react';
import { Download, Utensils, Users } from 'lucide-react';
import type { SnackMode } from '@/types';
import { calculateFoodEstimates, clampGuestCount } from '@/utils/foodCalculator';

const SNACK_OPTIONS: { id: SnackMode; label: string; detail: string }[] = [
  { id: 'central', label: 'חטיפים מרכזיים', detail: 'שקית גדולה לכל 3 ילדים, לקערות במרכז השולחן' },
  { id: 'personal', label: 'שקית הפתעה אישית', detail: 'שקית אחת לכל ילד' },
];
import { generateShoppingListPdf } from '@/utils/shoppingListPdf';

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-2xl border border-cream-300 bg-cream-50 focus:border-ocean-400 focus:ring-4 focus:ring-ocean-100 outline-none transition text-ink font-600 text-lg text-center';

export default function FoodCalculator() {
  const [kids, setKids] = useState(20);
  const [adults, setAdults] = useState(5);
  const [snackMode, setSnackMode] = useState<SnackMode>('central');
  const estimates = useMemo(
    () => calculateFoodEstimates(kids, adults, snackMode),
    [kids, adults, snackMode],
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
      <div className="lg:col-span-2 rounded-3xl bg-white shadow-card overflow-hidden">
        <div className="px-6 py-5 bg-gradient-to-br from-ocean-500 to-ocean-700 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-700 text-xl">מחשבון כיבוד ושתייה</h2>
              <p className="text-ocean-100 text-sm font-500">כמה להביא לכל האורחים</p>
            </div>
          </div>
        </div>

        <div className="p-6 grid grid-cols-2 gap-4">
          <label className="block">
            <span className="flex items-center gap-1.5 text-sm font-700 text-ink/80 mb-1.5">
              <Users className="w-3.5 h-3.5" /> ילדים
            </span>
            <input
              type="number"
              min={0}
              max={300}
              value={kids}
              onChange={(e) => setKids(clampGuestCount(Number(e.target.value)))}
              className={INPUT_CLASS}
            />
          </label>
          <label className="block">
            <span className="flex items-center gap-1.5 text-sm font-700 text-ink/80 mb-1.5">
              <Users className="w-3.5 h-3.5" /> מבוגרים
            </span>
            <input
              type="number"
              min={0}
              max={300}
              value={adults}
              onChange={(e) => setAdults(clampGuestCount(Number(e.target.value)))}
              className={INPUT_CLASS}
            />
          </label>
          <div className="col-span-2 grid grid-cols-1 gap-3">
            {SNACK_OPTIONS.map((option) => {
              const isActive = snackMode === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSnackMode(option.id)}
                  className={`text-start p-4 rounded-2xl border-2 transition ${
                    isActive ? 'border-ocean-500 bg-ocean-50' : 'border-cream-200 bg-cream-50 hover:border-ocean-200'
                  }`}
                >
                  <p className="font-700 text-ink text-sm">{option.label}</p>
                  <p className="text-xs text-ink/50 font-500 mt-1">{option.detail}</p>
                </button>
              );
            })}
          </div>
          <p className="col-span-2 text-xs text-ink/50 font-500">
            סה"כ {kids + adults} משתתפים. המגשים מחושבים לפי מספר הילדים, והשתייה לפי ילדים ומבוגרים.
          </p>
        </div>
      </div>

      <div className="lg:col-span-3 space-y-4">
        <div className="rounded-3xl bg-white shadow-card p-6">
          <h3 className="font-display font-700 text-lg text-ink mb-4">הערכת כמויות</h3>
          <ul className="divide-y divide-cream-200/80">
            {estimates.map((item) => (
              <li key={item.id} className="py-3.5 flex items-center justify-between gap-4">
                <div>
                  <p className="font-700 text-ink">{item.label}</p>
                  <p className="text-xs text-ink/50 font-500 mt-0.5">{item.detail}</p>
                </div>
                <div className="text-start shrink-0">
                  <span className="font-display font-900 text-2xl text-ocean-600">{item.quantity}</span>
                  <span className="text-sm font-600 text-ink/60 ms-1.5">{item.unit}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => generateShoppingListPdf(estimates, { kids, adults }, '')}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl font-700 transition shadow-md w-full sm:w-auto justify-center bg-ocean-600 hover:bg-ocean-700 text-white"
        >
          <Download className="w-5 h-5" /> הורד רשימת קניות מודפסת
        </button>
      </div>
    </div>
  );
}
