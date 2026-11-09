import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_ITEMS } from '@/data/salesContent';

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20">
      <div className="text-center mb-10">
        <p className="text-xs font-800 text-party-600 mb-2">שאלות נפוצות</p>
        <h2 className="font-display font-900 text-3xl sm:text-4xl text-ink text-balance">יש שאלה?</h2>
      </div>

      <div className="space-y-3">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.question}
              className={`rounded-2xl bg-white border transition ${isOpen ? 'border-party-200 shadow-card' : 'border-cream-200'}`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 sm:py-5 text-start"
              >
                <span className="font-700 text-ink">{item.question}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 text-party-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <p className="px-5 sm:px-6 pb-5 text-sm sm:text-base text-ink/60 font-500 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
