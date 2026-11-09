import { Gift, Trophy } from 'lucide-react';
import type { BoardCell, GameMode, GridSize, PartyStyle } from '@/types';
import { FREE_SPACE_TEXT } from '@/types';
import { MODE_OPTIONS, getHeaderLetters } from '@/utils/gameRules';
import { getTheme, themeCssVars } from '@/data/themes';
import ThemeStars from '@/components/ThemeStars';

interface BingoCardProps {
  title: string;
  name: string;
  cells: BoardCell[];
  size: GridSize;
  mode: GameMode;
  headerWord: string;
  partyStyle: PartyStyle;
}

const GRID_COLS: Record<GridSize, string> = {
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
};

const CELL_TEXT: Record<GridSize, string> = {
  3: 'text-xs sm:text-base',
  4: 'text-[10px] sm:text-sm',
  5: 'text-[8px] sm:text-[10px]',
};

const LETTER_TEXT: Record<GridSize, string> = {
  3: 'text-3xl sm:text-4xl',
  4: 'text-2xl sm:text-3xl',
  5: 'text-2xl sm:text-3xl',
};

export default function BingoCard({ title, name, cells, size, mode, headerWord, partyStyle }: BingoCardProps) {
  const { letters } = getHeaderLetters(size, headerWord);
  const palette = getTheme(partyStyle.theme);
  const photo = partyStyle.photoDataUrl;

  return (
    <div className="animate-fade-in" style={themeCssVars(palette)}>
      <div className="relative rounded-3xl bg-[var(--theme-paper)] overflow-hidden" style={{ boxShadow: 'var(--theme-shadow)' }}>
        <div className="relative px-6 py-6 bg-gradient-to-br from-[var(--theme-header-from)] to-[var(--theme-header-to)] text-[var(--theme-header-text)] overflow-hidden">
          {palette.stars && <ThemeStars />}
          <div className="relative">
            <div className="flex items-center gap-2 text-[var(--theme-header-muted)] text-xs font-700 mb-1">
              <Gift className="w-3.5 h-3.5" /> בינגו ליום הולדת
            </div>
            <h2 className="font-display font-800 text-2xl sm:text-3xl leading-tight text-balance">
              {title || 'הכרטיס שלכם'}
            </h2>
            {name && (
              <p className="text-[var(--theme-header-muted)] font-500 mt-1 text-sm sm:text-base">
                חוגגים את <span className="font-700 text-[var(--theme-header-text)]">{name}</span>
              </p>
            )}
          </div>
        </div>

        <div className="px-4 pt-5 pb-2">
          <div className={`grid gap-1.5 sm:gap-2 ${GRID_COLS[size]}`}>
            {letters.map((letter, i) => (
              <div
                key={i}
                className={`flex items-center justify-center aspect-[5/2] rounded-xl bg-[var(--theme-cell)] border border-[var(--theme-border)] font-display font-900 text-[var(--theme-accent)] shadow-sm ${LETTER_TEXT[size]}`}
              >
                {letter}
              </div>
            ))}
          </div>
        </div>

        <div className="px-4 pb-6">
          <div className={`grid gap-1.5 sm:gap-2 ${GRID_COLS[size]}`}>
            {cells.map((cell, i) =>
              cell === null ? (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-[var(--theme-free)] flex items-center justify-center p-1 shadow-md animate-pop-in"
                  style={{ animationDelay: `${i * 12}ms` }}
                >
                  {photo ? (
                    <img
                      src={photo}
                      alt=""
                      className="w-[82%] h-[82%] rounded-full object-cover ring-2 ring-[var(--theme-free-text)]"
                    />
                  ) : (
                    <span className={`font-display font-800 text-center text-[var(--theme-free-text)] ${CELL_TEXT[size]}`}>
                      {FREE_SPACE_TEXT}
                    </span>
                  )}
                </div>
              ) : (
                <div
                  key={i}
                  className="aspect-square rounded-xl bg-[var(--theme-cell)] border border-[var(--theme-border)] flex items-center justify-center p-1 sm:p-1.5 hover:border-[var(--theme-accent)] transition-colors animate-pop-in"
                  style={{ animationDelay: `${i * 12}ms` }}
                >
                  <span
                    className={`text-[var(--theme-cell-text)] font-500 text-center leading-tight line-clamp-4 ${CELL_TEXT[size]}`}
                  >
                    {cell}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="px-6 py-3.5 bg-[var(--theme-cell)] border-t border-[var(--theme-border)] text-center">
          <p className="flex items-center justify-center gap-1.5 text-sm font-700 text-[var(--theme-ink)]">
            <Trophy className="w-4 h-4 text-[var(--theme-accent)]" /> {MODE_OPTIONS[mode].winText}
          </p>
          <p className="mt-1 text-xs text-[var(--theme-muted)] font-500">סמנו משבצת כשהיא מתרחשת במסיבה.</p>
        </div>
      </div>
    </div>
  );
}
