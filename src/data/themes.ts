import type { CSSProperties } from 'react';
import type { ThemeId } from '@/types';
import type { RGB } from '@/utils/pdfHelpers';

export interface ThemeColors {
  paper: string;
  bar: string;
  headerFrom: string;
  headerTo: string;
  headerText: string;
  headerMuted: string;
  accent: string;
  ink: string;
  muted: string;
  cell: string;
  cellText: string;
  free: string;
  freeText: string;
  border: string;
  star: string;
}

export type PdfColors = Record<keyof ThemeColors, RGB>;

export interface ThemePalette {
  id: ThemeId;
  label: string;
  description: string;
  colors: ThemeColors;
  shadow: string;
  stars: boolean;
}

const PALETTES: Record<ThemeId, ThemePalette> = {
  colorful: {
    id: 'colorful',
    label: 'ילדים צבעוני',
    description: 'צבעים עזים ופסים של קונפטי',
    shadow: '0 20px 45px -15px rgba(217, 32, 95, 0.35)',
    stars: false,
    colors: {
      paper: '#FFFDF8',
      bar: '#FFC93C',
      headerFrom: '#D9205F',
      headerTo: '#C2410C',
      headerText: '#FFFFFF',
      headerMuted: '#FFE8F0',
      accent: '#D9205F',
      ink: '#1F1B16',
      muted: '#6B6259',
      cell: '#FDF6E9',
      cellText: '#1F1B16',
      free: '#D9205F',
      freeText: '#FFFFFF',
      border: '#E0D2B4',
      star: '#FFC93C',
    },
  },
  neon: {
    id: 'neon',
    label: 'ניאון & גיימינג',
    description: 'רקע כהה עם זוהר כחול, סגול וירוק',
    shadow: '0 0 0 1px rgba(0, 229, 255, 0.5), 0 0 28px rgba(0, 229, 255, 0.35)',
    stars: false,
    colors: {
      paper: '#0A0E1A',
      bar: '#A855F7',
      headerFrom: '#12163A',
      headerTo: '#2E1065',
      headerText: '#E6FBFF',
      headerMuted: '#7DF9FF',
      accent: '#00E5FF',
      ink: '#E6FBFF',
      muted: '#8CA3C7',
      cell: '#121A2E',
      cellText: '#E6FBFF',
      free: '#2E1065',
      freeText: '#39FF14',
      border: '#00E5FF',
      star: '#A855F7',
    },
  },
  princess: {
    id: 'princess',
    label: 'נסיכות & קסם',
    description: 'פסטלים ורוד ולבנדר עם כוכבים עדינים',
    shadow: '0 20px 45px -15px rgba(168, 85, 247, 0.25)',
    stars: true,
    colors: {
      paper: '#FFF8FC',
      bar: '#F9A8D4',
      headerFrom: '#F9C6E4',
      headerTo: '#D8C4F5',
      headerText: '#3B2A4D',
      headerMuted: '#5B4775',
      accent: '#7E4FB8',
      ink: '#3B2A4D',
      muted: '#7A6A8F',
      cell: '#FFFFFF',
      cellText: '#3B2A4D',
      free: '#F9A8D4',
      freeText: '#3B2A4D',
      border: '#E9D5F5',
      star: '#D8C4F5',
    },
  },
  gold: {
    id: 'gold',
    label: 'זהב יוקרתי',
    description: 'שחור ומוזהב בסגנון יוקרתי',
    shadow: '0 0 0 1px rgba(212, 175, 55, 0.45), 0 24px 50px -20px rgba(212, 175, 55, 0.35)',
    stars: false,
    colors: {
      paper: '#0D0D0D',
      bar: '#D4AF37',
      headerFrom: '#1C1C1C',
      headerTo: '#3A2F12',
      headerText: '#F5E6B3',
      headerMuted: '#D4AF37',
      accent: '#D4AF37',
      ink: '#F5E6B3',
      muted: '#B9A36A',
      cell: '#161616',
      cellText: '#F5E6B3',
      free: '#D4AF37',
      freeText: '#0D0D0D',
      border: '#8A6E1F',
      star: '#D4AF37',
    },
  },
};

export const THEME_OPTIONS: ThemePalette[] = [PALETTES.colorful, PALETTES.neon, PALETTES.princess, PALETTES.gold];

export function getTheme(id: ThemeId): ThemePalette {
  return PALETTES[id];
}

function toKebab(key: string): string {
  return key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

export function themeCssVars(palette: ThemePalette): CSSProperties {
  const vars: Record<string, string> = { '--theme-shadow': palette.shadow };
  for (const key of Object.keys(palette.colors) as (keyof ThemeColors)[]) {
    vars[`--theme-${toKebab(key)}`] = palette.colors[key];
  }
  return vars as CSSProperties;
}

function hexToRgb(hex: string): RGB {
  const value = parseInt(hex.slice(1), 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
}

export function toPdfColors(colors: ThemeColors): PdfColors {
  const result = {} as PdfColors;
  for (const key of Object.keys(colors) as (keyof ThemeColors)[]) {
    result[key] = hexToRgb(colors[key]);
  }
  return result;
}
