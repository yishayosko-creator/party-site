import { PartyPopper, Wrench } from 'lucide-react';
import type { SectionId } from '@/types';

interface SectionToggleProps {
  active: SectionId;
  onChange: (section: SectionId) => void;
}

const SECTIONS: { id: SectionId; label: string; icon: typeof PartyPopper }[] = [
  { id: 'games', label: 'משחקי מסיבה', icon: PartyPopper },
  { id: 'helpers', label: 'כלים חינמיים לתכנון המסיבה', icon: Wrench },
];

export default function SectionToggle({ active, onChange }: SectionToggleProps) {
  return (
    <div className="relative z-10 flex justify-center px-4 pt-8 animate-fade-in">
      <div className="inline-flex flex-wrap justify-center gap-1 p-1 rounded-full bg-white/80 backdrop-blur-sm border border-cream-200 shadow-card">
        {SECTIONS.map((section) => {
          const Icon = section.icon;
          const isActive = active === section.id;
          return (
            <button
              key={section.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(section.id)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-700 transition ${
                isActive ? 'bg-ink text-cream-50 shadow-md' : 'text-ink/60 hover:text-ink/90 hover:bg-cream-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              {section.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
