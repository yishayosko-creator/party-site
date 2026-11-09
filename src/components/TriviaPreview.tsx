import { HelpCircle, Gift, BookOpen } from 'lucide-react';
import type { PartyStyle, TriviaConfig } from '@/types';
import GamePreviewHeader from '@/components/GamePreviewHeader';
import { getTheme, themeCssVars } from '@/data/themes';

interface TriviaPreviewProps {
  config: TriviaConfig;
  partyStyle: PartyStyle;
}

export default function TriviaPreview({ config, partyStyle }: TriviaPreviewProps) {
  const palette = getTheme(partyStyle.theme);
  const questions = config.questions.filter((q) => q.question.trim());

  return (
    <div className="animate-fade-in space-y-4" style={themeCssVars(palette)}>
      <div className="rounded-3xl bg-[var(--theme-paper)] overflow-hidden" style={{ boxShadow: 'var(--theme-shadow)' }}>
        <GamePreviewHeader
          icon={HelpCircle}
          label="חידון טריוויה"
          title={config.title || 'חידון טריוויה אישי'}
          name={config.name}
          photo={partyStyle.photoDataUrl}
          stars={palette.stars}
        />

        <div className="px-6 py-4 bg-[var(--theme-cell)] border-b border-[var(--theme-border)]">
          <p className="flex items-center gap-1.5 text-sm font-700 text-[var(--theme-accent)]">
            <BookOpen className="w-4 h-4" /> עמוד 1: טופס תשובות לאורחים
          </p>
        </div>

        <div className="p-6 space-y-4">
          {questions.length === 0 ? (
            <p className="text-[var(--theme-muted)] text-sm font-500 text-center py-8">
              הוסיפו שאלות כדי לראות תצוגה מקדימה
            </p>
          ) : (
            questions.map((q, i) => (
              <div key={q.id} className="animate-pop-in" style={{ animationDelay: `${i * 40}ms` }}>
                <p className="text-sm font-700 text-[var(--theme-ink)] mb-1.5">
                  {i + 1}. {q.question}
                </p>
                <div className="h-8 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-cell)]" />
              </div>
            ))
          )}
        </div>

        <div className="px-6 py-4 bg-[var(--theme-cell)] border-t border-[var(--theme-border)]">
          <p className="flex items-center gap-1.5 text-sm font-700 text-[var(--theme-ink)]">
            <Gift className="w-4 h-4 text-[var(--theme-accent)]" /> עמוד 2: מפתח תשובות למנחה
          </p>
        </div>
        <div className="p-6 space-y-2">
          {questions.map((q, i) => (
            <div key={q.id} className="rounded-xl bg-[var(--theme-cell)] border border-[var(--theme-border)] px-4 py-2.5">
              <span className="text-xs font-700 text-[var(--theme-accent)]">{i + 1}.</span>{' '}
              <span className="text-sm font-600 text-[var(--theme-ink)]">{q.question}</span>
              <span className="block text-sm font-700 text-[var(--theme-accent)] mt-0.5">
                תשובה: {q.answer || '(לא הוזן)'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
