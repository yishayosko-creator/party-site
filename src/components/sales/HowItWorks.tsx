import { Gamepad2, Printer, Sparkles, Wand2 } from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '@/data/salesContent';

const STEP_ICONS = [Gamepad2, Wand2, Printer];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-xs font-800 text-party-600 mb-2">איך זה עובד?</p>
        <h2 className="font-display font-900 text-3xl sm:text-4xl text-ink text-balance">שלושה צעדים ויוצאים לדרך</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {HOW_IT_WORKS_STEPS.map((step, index) => {
          const Icon = STEP_ICONS[index] ?? Sparkles;
          return (
            <div
              key={step.title}
              className="relative rounded-3xl bg-white border border-cream-200 shadow-card p-6 sm:p-7 transition duration-300 hover:-translate-y-1"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-2xl bg-party-50 text-party-600 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-display font-900 text-4xl text-cream-300">{index + 1}</span>
              </div>
              <h3 className="font-display font-800 text-xl text-ink mb-2">{step.title}</h3>
              <p className="text-sm text-ink/60 font-500 leading-relaxed">{step.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
