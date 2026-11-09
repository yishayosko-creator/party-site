import type { GameMode, GridSize } from '@/types';

export const GRID_OPTIONS: { value: GridSize; label: string }[] = [
  { value: 3, label: '3 על 3' },
  { value: 4, label: '4 על 4' },
  { value: 5, label: '5 על 5' },
];

export const MODE_OPTIONS: Record<
  GameMode,
  { label: string; description: string; poolSize: number; winText: string }
> = {
  classic: {
    label: 'שורה קלאסית',
    description: 'הזינו 24 ביטויים. מנצח/ת מי שמשלים שורה, עמודה או אלכסון.',
    poolSize: 24,
    winText: 'ראשון להשלים שורה, עמודה או אלכסון – מנצח!',
  },
  blackout: {
    label: 'כיסוי מלא',
    description: 'הזינו 40 ביטויים. מנצח/ת מי שממלא/ת את כל המשבצות.',
    poolSize: 40,
    winText: 'ראשון למלא את כל המשבצות בכרטיס – מנצח!',
  },
};

export const DEFAULT_HEADER_WORDS: Record<GridSize, string> = {
  3: 'כיף',
  4: 'שמחה',
  5: 'בינגו',
};

export interface HeaderLetters {
  letters: string[];
  lengthMismatch: boolean;
}

export function getHeaderLetters(size: GridSize, customWord: string): HeaderLetters {
  const custom = Array.from(customWord.replace(/\s/g, ''));
  if (custom.length === 0) {
    return { letters: Array.from(DEFAULT_HEADER_WORDS[size]), lengthMismatch: false };
  }
  if (custom.length !== size) {
    return { letters: Array.from(DEFAULT_HEADER_WORDS[size]), lengthMismatch: true };
  }
  return { letters: custom, lengthMismatch: false };
}

export interface GridRule {
  size: GridSize;
  cellCount: number;
  freeIndex: number | null;
  phraseCount: number;
}

export function getGridRule(size: GridSize): GridRule {
  const cellCount = size * size;
  const freeIndex = size % 2 === 1 ? (cellCount - 1) / 2 : null;
  return {
    size,
    cellCount,
    freeIndex,
    phraseCount: freeIndex === null ? cellCount : cellCount - 1,
  };
}
