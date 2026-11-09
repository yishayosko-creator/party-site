import { useState } from 'react';
import { Users, Wand2, Plus, Trash2, ChevronDown, Sparkles } from 'lucide-react';
import type { MostLikelyConfig } from '@/types';
import { MOST_LIKELY_PRESETS, MIN_MOST_LIKELY, MAX_MOST_LIKELY } from '@/data/mostLikelyPresets';

interface MostLikelyFormProps {
  config: MostLikelyConfig;
  onChange: (config: MostLikelyConfig) => void;
}

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-2xl border border-cream-300 bg-cream-50 focus:border-party-400 focus:ring-4 focus:ring-party-100 outline-none transition text-ink placeholder:text-ink/30 font-500';
const FIELD_CLASS =
  'w-full px-4 py-3 rounded-2xl border border-cream-300 bg-cream-50 focus:border-party-400 focus:ring-4 focus:ring-party-100 outline-none transition text-ink placeholder:text-ink/30 font-500 text-sm';

export default function MostLikelyForm({ config, onChange }: MostLikelyFormProps) {
  const [collapsed, setCollapsed] = useState(false);

  const statements = config.statements;
  const validCount = statements.filter((s) => s.trim()).length;

  const addStatement = () => {
    if (statements.length >= MAX_MOST_LIKELY) return;
    onChange({ ...config, statements: [...statements, ''] });
  };

  const removeStatement = (index: number) => {
    onChange({ ...config, statements: statements.filter((_, i) => i !== index) });
  };

  const updateStatement = (index: number, value: string) => {
    onChange({ ...config, statements: statements.map((s, i) => (i === index ? value : s)) });
  };

  const fillPresets = () => {
    onChange({ ...config, statements: [...MOST_LIKELY_PRESETS] });
  };

  const clearAll = () => {
    onChange({ ...config, statements: [] });
  };

  return (
    <div className="rounded-3xl bg-white shadow-card overflow-hidden">
      <div className="px-6 py-5 bg-gradient-to-br from-confetti-orange-500 to-confetti-orange-700 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-700 text-xl">מי הכי סביר ש...</h2>
              <p className="text-orange-100 text-sm font-500">משחק הצבעה כיפי לאורחים</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="lg:hidden flex items-center gap-1 text-sm font-600 bg-white/15 hover:bg-white/25 transition px-3 py-1.5 rounded-full"
            aria-expanded={!collapsed}
          >
            {collapsed ? 'הצג' : 'הסתר'}
            <ChevronDown className={`w-4 h-4 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
          </button>
        </div>
        <div className="mt-4">
          <div className="flex justify-between text-xs font-600 mb-1.5">
            <span>{validCount} מתוך {MIN_MOST_LIKELY}-{MAX_MOST_LIKELY} הצהרות</span>
          </div>
          <div className="h-2 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: `${Math.min(100, (validCount / MIN_MOST_LIKELY) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      <div className={collapsed ? 'hidden lg:block' : 'block'}>
        <div className="p-6 space-y-5 border-b border-cream-200/60">
          <div>
            <label className="block text-sm font-700 text-ink/80 mb-1.5">שם האירוע</label>
            <input
              type="text"
              value={config.title}
              onChange={(e) => onChange({ ...config, title: e.target.value })}
              placeholder="למשל: יום הולדת של שירה"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label className="block text-sm font-700 text-ink/80 mb-1.5">שם חוגג/ת היום</label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => onChange({ ...config, name: e.target.value })}
              placeholder="למשל: שירה"
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-confetti-orange-500" />
              <span className="font-700 text-ink/80 text-sm">הצהרות למשחק</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={fillPresets}
                className="flex items-center gap-1.5 text-xs font-700 text-confetti-orange-600 bg-confetti-orange-50 hover:bg-confetti-orange-100 transition px-3 py-1.5 rounded-full"
              >
                <Sparkles className="w-3.5 h-3.5" /> מלא רעיונות מצחיקים
              </button>
              <button
                type="button"
                onClick={clearAll}
                className="flex items-center gap-1.5 text-xs font-700 text-ink/50 hover:text-ink/80 hover:bg-ink/5 transition px-3 py-1.5 rounded-full"
              >
                <Trash2 className="w-3.5 h-3.5" /> נקו
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {statements.map((stmt, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-xs font-700 text-confetti-orange-600 bg-confetti-orange-50 rounded-full px-2.5 py-1 shrink-0">
                  {i + 1}
                </span>
                <input
                  type="text"
                  value={stmt}
                  onChange={(e) => updateStatement(i, e.target.value)}
                  placeholder="מי הכי סביר ש..."
                  className={FIELD_CLASS}
                />
                <button
                  type="button"
                  onClick={() => removeStatement(i)}
                  className="text-ink/30 hover:text-party-500 transition p-1.5 shrink-0"
                  aria-label="מחיקת הצהרה"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {statements.length < MAX_MOST_LIKELY && (
            <button
              type="button"
              onClick={addStatement}
              className="mt-4 flex items-center gap-2 w-full justify-center py-3 rounded-2xl border-2 border-dashed border-cream-300 text-ink/50 hover:text-confetti-orange-600 hover:border-confetti-orange-300 transition font-700 text-sm"
            >
              <Plus className="w-4 h-4" /> הוספת הצהרה
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
