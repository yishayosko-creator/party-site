import { useState } from 'react';
import { ListChecks, Trash2, Wand2, ChevronDown, Sparkles } from 'lucide-react';
import type { BingoConfig } from '@/types';
import { DEFAULT_PHRASES } from '@/data/defaultPhrases';
import { parsePhrases } from '@/utils/bingo';
import { MODE_OPTIONS, DEFAULT_HEADER_WORDS, getHeaderLetters } from '@/utils/gameRules';
import BoardSettings from '@/components/BoardSettings';
import { INCLUDED_CARDS, MAX_QUANTITY } from '@/utils/pricing';

interface BingoFormProps {
  config: BingoConfig;
  onChange: (config: BingoConfig) => void;
}

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-2xl border border-cream-300 bg-cream-50 focus:border-party-400 focus:ring-4 focus:ring-party-100 outline-none transition text-ink placeholder:text-ink/30 font-500';

function describeCount(count: number, poolSize: number): string {
  if (count === 0) {
    return `הזינו ${poolSize} ביטויים, כל אחד בשורה נפרדת. מקומות חסרים ימולאו בביטויי יום הולדת קלאסיים.`;
  }
  if (count < poolSize) {
    return `עוד ${poolSize - count} להגעה ל-${poolSize}. השאר ימולא בביטויי יום הולדת קלאסיים.`;
  }
  if (count > poolSize) {
    return `הזנתם ${count}. רק ${poolSize} הראשונים ייכנסו לשימוש.`;
  }
  return `מאגר הביטויים מוכן. כל כרטיס שואב מתוך ${poolSize} אלה.`;
}

export default function BingoForm({ config, onChange }: BingoFormProps) {
  const [collapsed, setCollapsed] = useState(false);

  const poolSize = MODE_OPTIONS[config.mode].poolSize;
  const enteredCount = parsePhrases(config.phrasesText).length;
  const progress = Math.min(100, Math.round((enteredCount / poolSize) * 100));
  const { lengthMismatch } = getHeaderLetters(config.gridSize, config.headerWord);

  return (
    <div className="rounded-3xl bg-white shadow-card overflow-hidden">
      <div className="px-6 py-5 bg-gradient-to-br from-party-500 to-party-700 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-700 text-xl">עיצוב הכרטיסים</h2>
              <p className="text-party-100 text-sm font-500">פרטי האירוע, הלוח והביטויים</p>
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
            <span>
              {enteredCount} מתוך {poolSize} ביטויים
            </span>
            <span>{MODE_OPTIONS[config.mode].label}</span>
          </div>
          <div className="h-2 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: `${progress}%` }}
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
              placeholder="למשל: יום ההולדת ה-13 של דני"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label className="block text-sm font-700 text-ink/80 mb-1.5">שם חוגג/ת היום</label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => onChange({ ...config, name: e.target.value })}
              placeholder="למשל: דני"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label className="block text-sm font-700 text-ink/80 mb-1.5">מילת כותרת לעמודות (אופציונלי)</label>
            <input
              type="text"
              value={config.headerWord}
              onChange={(e) => onChange({ ...config, headerWord: e.target.value })}
              placeholder={DEFAULT_HEADER_WORDS[config.gridSize]}
              className={INPUT_CLASS}
            />
            <p className="mt-1.5 text-xs text-ink/50 font-500 leading-relaxed">
              הזינו מילה באורך מספר העמודות (למשל: 'יוסף' ללוח 4x4). אם יושאר ריק, תופיע מילת ברירת המחדל.
            </p>
            {lengthMismatch && (
              <p className="mt-1.5 text-xs font-600 text-party-600">
                המילה צריכה להכיל {config.gridSize} אותיות. כרגע מוצגת מילת ברירת המחדל.
              </p>
            )}
          </div>
          <BoardSettings config={config} onChange={onChange} />
          <div>
            <label htmlFor="quantity" className="block text-sm font-700 text-ink/80 mb-1.5">
              מספר עותקים ייחודיים להדפסה (1-100)
            </label>
            <input
              id="quantity"
              type="number"
              inputMode="numeric"
              min={1}
              max={MAX_QUANTITY}
              value={config.quantity || ''}
              onChange={(e) =>
                onChange({
                  ...config,
                  quantity: Math.min(MAX_QUANTITY, Math.max(0, parseInt(e.target.value, 10) || 0)),
                })
              }
              className={INPUT_CLASS}
            />
            <p className="mt-1.5 text-xs text-ink/50 font-500 leading-relaxed">
              עד {INCLUDED_CARDS} עותקים כלולים במחיר הבסיס. כל עותק נוסף עולה 0.05 ₪.
            </p>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <ListChecks className="w-4 h-4 text-party-500" />
              <span className="font-700 text-ink/80 text-sm">מאגר הביטויים</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() =>
                  onChange({ ...config, phrasesText: DEFAULT_PHRASES.join('\n') })
                }
                className="flex items-center gap-1.5 text-xs font-700 text-party-600 bg-party-50 hover:bg-party-100 transition px-3 py-1.5 rounded-full"
              >
                <Sparkles className="w-3.5 h-3.5" /> מלאו דוגמאות
              </button>
              <button
                type="button"
                onClick={() => onChange({ ...config, phrasesText: '' })}
                className="flex items-center gap-1.5 text-xs font-700 text-ink/50 hover:text-ink/80 hover:bg-ink/5 transition px-3 py-1.5 rounded-full"
              >
                <Trash2 className="w-3.5 h-3.5" /> נקו
              </button>
            </div>
          </div>

          <textarea
            value={config.phrasesText}
            onChange={(e) => onChange({ ...config, phrasesText: e.target.value })}
            placeholder={'ביטוי אחד בכל שורה, למשל:\nהצבע האהוב על [שם]\nמקום ש[שם] טייל/ה בו\nהמאכל ש[שם] הכי שונא/ת\nהתחביב הסודי של [שם]'}
            rows={10}
            className={`${INPUT_CLASS} resize-y leading-relaxed text-sm`}
          />

          <p className="mt-3 text-xs text-ink/50 font-500 leading-relaxed">
            {describeCount(enteredCount, poolSize)}
          </p>
        </div>
      </div>
    </div>
  );
}
