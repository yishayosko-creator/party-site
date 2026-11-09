import type { LucideIcon } from 'lucide-react';
import ThemeStars from '@/components/ThemeStars';

interface GamePreviewHeaderProps {
  icon: LucideIcon;
  label: string;
  title: string;
  name: string;
  photo: string | null;
  stars: boolean;
}

export default function GamePreviewHeader({ icon: Icon, label, title, name, photo, stars }: GamePreviewHeaderProps) {
  return (
    <div className="relative px-6 py-6 bg-gradient-to-br from-[var(--theme-header-from)] to-[var(--theme-header-to)] text-[var(--theme-header-text)] overflow-hidden">
      {stars && <ThemeStars />}
      <div className="relative text-center">
        {photo && (
          <img
            src={photo}
            alt=""
            className="mx-auto mb-4 w-[72px] h-[72px] rounded-full object-cover ring-2 ring-[var(--theme-accent)] shadow-md animate-pop-in"
          />
        )}
        <div className="flex items-center justify-center gap-2 text-[var(--theme-header-muted)] text-xs font-700 mb-1">
          <Icon className="w-3.5 h-3.5" /> {label}
        </div>
        <h2 className="font-display font-800 text-2xl sm:text-3xl leading-tight text-balance">{title}</h2>
        {name && (
          <p className="text-[var(--theme-header-muted)] font-500 mt-1 text-sm sm:text-base">
            חוגגים את <span className="font-700 text-[var(--theme-header-text)]">{name}</span>
          </p>
        )}
      </div>
    </div>
  );
}
