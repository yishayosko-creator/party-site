import { useState } from 'react';
import { HelpCircle, Wand2, Plus, Trash2, ChevronDown, Lightbulb } from 'lucide-react';
import type { TriviaConfig, TriviaQuestion } from '@/types';
import { TRIVIA_PRESETS, createEmptyTriviaQuestion, MAX_TRIVIA_QUESTIONS } from '@/data/triviaPresets';

interface TriviaFormProps {
  config: TriviaConfig;
  onChange: (config: TriviaConfig) => void;
}

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-2xl border border-cream-300 bg-cream-50 focus:border-party-400 focus:ring-4 focus:ring-party-100 outline-none transition text-ink placeholder:text-ink/30 font-500';
const FIELD_CLASS =
  'w-full px-3 py-2 rounded-xl border border-cream-200 bg-white focus:border-party-400 focus:ring-2 focus:ring-party-100 outline-none transition text-ink placeholder:text-ink/30 font-500 text-sm';

function updateQuestion(
  config: TriviaConfig,
  id: string,
  patch: Partial<TriviaQuestion>,
): TriviaConfig {
  return {
    ...config,
    questions: config.questions.map((q) => (q.id === id ? { ...q, ...patch } : q)),
  };
}

export default function TriviaForm({ config, onChange }: TriviaFormProps) {
  const [collapsed, setCollapsed] = useState(false);
  const validCount = config.questions.filter((q) => q.question.trim()).length;

  const addQuestion = () => {
    if (config.questions.length >= MAX_TRIVIA_QUESTIONS) return;
    onChange({ ...config, questions: [...config.questions, createEmptyTriviaQuestion()] });
  };

  const removeQuestion = (id: string) => {
    onChange({ ...config, questions: config.questions.filter((q) => q.id !== id) });
  };

  const fillPresets = () => {
    onChange({ ...config, questions: TRIVIA_PRESETS.map((q) => ({ ...q })) });
  };

  return (
    <div className="rounded-3xl bg-white shadow-card overflow-hidden">
      <div className="px-6 py-5 bg-gradient-to-br from-ocean-500 to-ocean-700 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Wand2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-700 text-xl">חידון טריוויה אישי</h2>
              <p className="text-ocean-100 text-sm font-500">שאלות על חוגג/ת היום</p>
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
            <span>{validCount} מתוך {MAX_TRIVIA_QUESTIONS} שאלות</span>
          </div>
          <div className="h-2 rounded-full bg-white/20 overflow-hidden">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: `${(validCount / MAX_TRIVIA_QUESTIONS) * 100}%` }}
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
              placeholder="למשל: יום הולדת ה-30 של רותי"
              className={INPUT_CLASS}
            />
          </div>
          <div>
            <label className="block text-sm font-700 text-ink/80 mb-1.5">שם חוגג/ת היום</label>
            <input
              type="text"
              value={config.name}
              onChange={(e) => onChange({ ...config, name: e.target.value })}
              placeholder="למשל: רותי"
              className={INPUT_CLASS}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-ocean-500" />
              <span className="font-700 text-ink/80 text-sm">השאלות</span>
            </div>
            <button
              type="button"
              onClick={fillPresets}
              className="flex items-center gap-1.5 text-xs font-700 text-ocean-600 bg-ocean-50 hover:bg-ocean-100 transition px-3 py-1.5 rounded-full"
            >
              <Lightbulb className="w-3.5 h-3.5" /> הצע לי רעיונות לחידון
            </button>
          </div>

          <div className="space-y-3">
            {config.questions.map((q, i) => (
              <div key={q.id} className="rounded-2xl border border-cream-200 bg-cream-50/50 p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-xs font-700 text-ocean-600 bg-ocean-50 rounded-full px-2.5 py-1">
                    שאלה {i + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeQuestion(q.id)}
                    className="text-ink/30 hover:text-party-500 transition p-1"
                    aria-label="מחיקת שאלה"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="text"
                  value={q.question}
                  onChange={(e) => onChange(updateQuestion(config, q.id, { question: e.target.value }))}
                  placeholder="מה השאלה?"
                  className={`${FIELD_CLASS} mb-2`}
                />
                <input
                  type="text"
                  value={q.answer}
                  onChange={(e) => onChange(updateQuestion(config, q.id, { answer: e.target.value }))}
                  placeholder="התשובה הנכונה"
                  className={`${FIELD_CLASS} mb-2`}
                />
                <input
                  type="text"
                  value={q.distractors.join(', ')}
                  onChange={(e) =>
                    onChange(
                      updateQuestion(config, q.id, {
                        distractors: e.target.value.split(',').map((d) => d.trim()).filter(Boolean),
                      }),
                    )
                  }
                  placeholder="תשובות שגויות (מופרדות בפסיק, אופציונלי)"
                  className={FIELD_CLASS}
                />
              </div>
            ))}
          </div>

          {config.questions.length < MAX_TRIVIA_QUESTIONS && (
            <button
              type="button"
              onClick={addQuestion}
              className="mt-4 flex items-center gap-2 w-full justify-center py-3 rounded-2xl border-2 border-dashed border-cream-300 text-ink/50 hover:text-ocean-600 hover:border-ocean-300 transition font-700 text-sm"
            >
              <Plus className="w-4 h-4" /> הוספת שאלה
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
