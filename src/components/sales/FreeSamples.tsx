import { useState } from 'react';
import { Download, Loader2, AlertCircle } from 'lucide-react';
import { TRIVIA_PRESETS } from '@/data/triviaPresets';
import { generateTriviaPdf } from '@/utils/triviaPdf';
import { generateMostLikelyPdf } from '@/utils/mostLikelyPdf';
import { MOST_LIKELY_PRESETS } from '@/data/mostLikelyPresets';
import type { PartyStyle } from '@/types';

const SAMPLE_STYLE: PartyStyle = { theme: 'colorful', photoDataUrl: null };
const SAMPLE_TRIVIA_COUNT = 10;
const SAMPLE_STATEMENT_COUNT = 10;

type SampleKind = 'trivia' | 'mostlikely';
type Status = { kind: SampleKind | null; state: 'idle' | 'busy' | 'error' };

const SAMPLES: { kind: SampleKind; title: string; description: string; button: string }[] = [
  {
    kind: 'trivia',
    title: 'דוגמה: חידון טריוויה',
    description: 'טופס תשובות לאורחים ומפתח תשובות למנחה, עם 10 שאלות לדוגמה.',
    button: 'הורדת דוגמה לחידון',
  },
  {
    kind: 'mostlikely',
    title: 'דוגמה: מי הכי סביר ש...',
    description: 'כרטיסי הצבעה מוכנים להדפסה עם 10 הצהרות מצחיקות לדוגמה.',
    button: 'הורדת דוגמה למי הכי סביר',
  },
];

export default function FreeSamples() {
  const [status, setStatus] = useState<Status>({ kind: null, state: 'idle' });

  const downloadSample = async (kind: SampleKind) => {
    setStatus({ kind, state: 'busy' });
    try {
      if (kind === 'trivia') {
        await generateTriviaPdf(
          { title: 'חידון יום הולדת לדוגמה', name: '', questions: TRIVIA_PRESETS.slice(0, SAMPLE_TRIVIA_COUNT) },
          SAMPLE_STYLE,
        );
      } else {
        await generateMostLikelyPdf(
          {
            title: 'מי הכי סביר ש... לדוגמה',
            name: '',
            statements: MOST_LIKELY_PRESETS.slice(0, SAMPLE_STATEMENT_COUNT),
          },
          SAMPLE_STYLE,
        );
      }
      setStatus({ kind: null, state: 'idle' });
    } catch {
      setStatus({ kind, state: 'error' });
    }
  };

  return (
    <section id="samples" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20">
      <div className="rounded-3xl bg-gradient-to-br from-party-600 to-party-800 text-white p-6 sm:p-10 shadow-float overflow-hidden">
        <div className="max-w-2xl mb-8">
          <p className="text-xs font-800 text-party-200 mb-2">בחינם</p>
          <h2 className="font-display font-900 text-3xl sm:text-4xl text-balance">נסו לפני שקונים</h2>
          <p className="mt-3 text-party-50/90 font-500 leading-relaxed">
            הורידו דוגמה מלאה בחינם כדי לראות איך נראה קובץ ה-PDF מודפס.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {SAMPLES.map((sample) => {
            const busy = status.kind === sample.kind && status.state === 'busy';
            const failed = status.kind === sample.kind && status.state === 'error';
            return (
              <div key={sample.kind} className="rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm p-5 sm:p-6 flex flex-col">
                <h3 className="font-display font-800 text-lg">{sample.title}</h3>
                <p className="mt-2 text-sm text-party-50/85 font-500 leading-relaxed flex-1">{sample.description}</p>
                <button
                  type="button"
                  onClick={() => downloadSample(sample.kind)}
                  disabled={busy}
                  className="mt-5 flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-700 bg-white text-party-700 hover:bg-party-50 transition disabled:opacity-70 disabled:cursor-wait"
                >
                  {busy ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
                  {busy ? 'מכין את הקובץ...' : sample.button}
                </button>
                {failed && (
                  <p role="alert" className="mt-3 flex items-center gap-1.5 text-sm font-600 text-white">
                    <AlertCircle className="w-4 h-4" /> ההורדה נכשלה. נסו שוב.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
