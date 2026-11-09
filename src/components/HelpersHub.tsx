import { useState } from 'react';
import { CalendarClock, MessageCircle, Sparkles, Utensils } from 'lucide-react';
import type { HelperToolId } from '@/types';
import FoodCalculator from '@/components/FoodCalculator';
import PartyTimeline from '@/components/PartyTimeline';
import InviteGenerator from '@/components/InviteGenerator';

const TOOLS: { id: HelperToolId; label: string; icon: typeof Utensils }[] = [
  { id: 'food', label: 'מחשבון כיבוד ושתייה', icon: Utensils },
  { id: 'timeline', label: 'לוח זמנים וצ\'ק-ליסט', icon: CalendarClock },
  { id: 'invite', label: 'מחולל הזמנות ל-WhatsApp', icon: MessageCircle },
];

export default function HelpersHub() {
  const [tool, setTool] = useState<HelperToolId>('food');

  return (
    <>
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-2 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-cream-200 text-xs font-700 text-ocean-700 mb-5 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" /> ללא עלות, מוכן להדפסה
        </div>
        <h2 className="font-display font-900 text-4xl sm:text-5xl text-ink leading-[1.15] text-balance animate-slide-up">
          תכננו את המסיבה
          <span className="bg-gradient-to-l from-ocean-500 to-ocean-700 bg-clip-text text-transparent">בקלות</span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-ink/50 font-500 text-base sm:text-lg leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
          מחשבון כמויות, לוח זמנים עם צ'ק-ליסט ציוד והזמנה מעוצבת לאורחים. הכול חינמי.
        </p>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <div className="flex justify-center mb-8 animate-fade-in">
          <div className="inline-flex flex-wrap gap-1 p-1.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-cream-200 shadow-card">
            {TOOLS.map((item) => {
              const Icon = item.icon;
              const isActive = tool === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setTool(item.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-sm font-700 transition ${
                    isActive
                      ? 'bg-gradient-to-br from-ocean-500 to-ocean-700 text-white shadow-md'
                      : 'text-ink/60 hover:text-ink/90 hover:bg-cream-100'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <div className={tool === 'food' ? 'animate-slide-up' : 'hidden'}>
          <FoodCalculator />
        </div>
        <div className={tool === 'timeline' ? 'animate-slide-up' : 'hidden'}>
          <PartyTimeline />
        </div>
        <div className={tool === 'invite' ? 'animate-slide-up' : 'hidden'}>
          <InviteGenerator />
        </div>
      </main>
    </>
  );
}
