import { LayoutGrid, Trophy } from 'lucide-react';
import type { BingoConfig, GameMode } from '@/types';
import { GRID_OPTIONS, MODE_OPTIONS, getGridRule } from '@/utils/gameRules';

interface BoardSettingsProps {
  config: BingoConfig;
  onChange: (config: BingoConfig) => void;
}

const MODE_KEYS = Object.keys(MODE_OPTIONS) as GameMode[];

export default function BoardSettings({ config, onChange }: BoardSettingsProps) {
  const rule = getGridRule(config.gridSize);
  const freeNote = rule.freeIndex === null ? '' : ' ומשבצת חופשית במרכז';

  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <LayoutGrid className="w-4 h-4 text-party-500" />
          <span className="text-sm font-700 text-ink/80">גודל הלוח</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-cream-100 border border-cream-200">
          {GRID_OPTIONS.map((option) => {
            const active = config.gridSize === option.value;
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ ...config, gridSize: option.value })}
                className={`py-2.5 rounded-xl text-sm font-700 transition ${
                  active ? 'bg-white text-party-600 shadow-sm' : 'text-ink/50 hover:text-ink/80'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-ink/50 font-500">
          כל כרטיס משתמש ב-{rule.phraseCount} ביטויים{freeNote}.
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-4 h-4 text-party-500" />
          <span className="text-sm font-700 text-ink/80">מצב משחק</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {MODE_KEYS.map((mode) => {
            const option = MODE_OPTIONS[mode];
            const active = config.mode === mode;
            return (
              <button
                key={mode}
                type="button"
                aria-pressed={active}
                onClick={() => onChange({ ...config, mode })}
                className={`text-start p-3.5 rounded-2xl border-2 transition ${
                  active
                    ? 'border-party-400 bg-party-50'
                    : 'border-cream-200 bg-cream-50/50 hover:border-party-200'
                }`}
              >
                <span className={`block text-sm font-700 ${active ? 'text-party-700' : 'text-ink/80'}`}>
                  {option.label}
                </span>
                <span className="block mt-0.5 text-xs text-ink/50 font-500 leading-relaxed">
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
