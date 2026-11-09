import { Users, Circle } from 'lucide-react';
import type { MostLikelyConfig, PartyStyle } from '@/types';
import GamePreviewHeader from '@/components/GamePreviewHeader';
import { getTheme, themeCssVars } from '@/data/themes';

interface MostLikelyPreviewProps {
  config: MostLikelyConfig;
  partyStyle: PartyStyle;
}

export default function MostLikelyPreview({ config, partyStyle }: MostLikelyPreviewProps) {
  const palette = getTheme(partyStyle.theme);
  const statements = config.statements.filter((s) => s.trim());

  return (
    <div className="animate-fade-in" style={themeCssVars(palette)}>
      <div className="rounded-3xl bg-[var(--theme-paper)] overflow-hidden" style={{ boxShadow: 'var(--theme-shadow)' }}>
        <GamePreviewHeader
          icon={Users}
          label="מי הכי סביר ש..."
          title={config.title || 'מי הכי סביר ש...'}
          name={config.name}
          photo={partyStyle.photoDataUrl}
          stars={palette.stars}
        />

        <div className="px-6 py-4 bg-[var(--theme-cell)] border-b border-[var(--theme-border)]">
          <p className="text-sm font-700 text-[var(--theme-accent)]">סמנו/הקיפו את האדם שהכי סביר ש...</p>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {statements.length === 0 ? (
            <p className="col-span-full text-[var(--theme-muted)] text-sm font-500 text-center py-8">
              הוסיפו הצהרות כדי לראות תצוגה מקדימה
            </p>
          ) : (
            statements.map((stmt, i) => (
              <div
                key={i}
                className="rounded-2xl bg-[var(--theme-cell)] border border-[var(--theme-border)] px-4 py-3 flex items-center gap-3 animate-pop-in"
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <Circle className="w-5 h-5 text-[var(--theme-ink)] shrink-0" />
                <span className="text-xs font-700 text-[var(--theme-accent)] shrink-0">{i + 1}.</span>
                <span className="text-sm font-500 text-[var(--theme-ink)] leading-tight">{stmt}</span>
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-3.5 bg-[var(--theme-cell)] border-t border-[var(--theme-border)] text-center">
          <p className="text-xs text-[var(--theme-muted)] font-500">הקיפו את השם או הרימו יד כשקוראים את ההצהרה.</p>
        </div>
      </div>
    </div>
  );
}
