import { Grid3x3, HelpCircle, Users } from 'lucide-react';
import type { GameModuleId } from '@/types';

interface TabNavProps {
  active: GameModuleId;
  onChange: (id: GameModuleId) => void;
}

const TABS: { id: GameModuleId; label: string; icon: typeof Grid3x3 }[] = [
  { id: 'bingo', label: 'לוחות בינגו', icon: Grid3x3 },
  { id: 'trivia', label: 'חידון טריוויה אישי', icon: HelpCircle },
  { id: 'mostlikely', label: 'מי הכי סביר ש...', icon: Users },
];

export default function TabNav({ active, onChange }: TabNavProps) {
  return (
    <div className="flex justify-center mb-8 animate-fade-in">
      <div className="inline-flex flex-wrap gap-1 p-1.5 rounded-2xl bg-white/70 backdrop-blur-sm border border-cream-200 shadow-card">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => onChange(tab.id)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-sm font-700 transition ${
                isActive
                  ? 'bg-gradient-to-br from-party-500 to-party-700 text-white shadow-md'
                  : 'text-ink/60 hover:text-ink/90 hover:bg-cream-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
