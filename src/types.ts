export type GridSize = 3 | 4 | 5;
export type GameMode = 'classic' | 'blackout';

export interface BingoConfig {
  title: string;
  name: string;
  phrasesText: string;
  gridSize: GridSize;
  mode: GameMode;
  headerWord: string;
  quantity: number;
}

export type BoardCell = string | null;

export const FREE_SPACE_TEXT = 'חופשי';

export type GameModuleId = 'bingo' | 'trivia' | 'mostlikely';

export interface TriviaQuestion {
  id: string;
  question: string;
  answer: string;
  distractors: string[];
}

export interface TriviaConfig {
  title: string;
  name: string;
  questions: TriviaQuestion[];
}

export interface MostLikelyConfig {
  title: string;
  name: string;
  statements: string[];
}

export type SnackMode = 'central' | 'personal';

export type PurchaseOption = 'single' | 'bundle' | 'premium';

export type ThemeId = 'colorful' | 'neon' | 'princess' | 'gold';

export interface PartyStyle {
  theme: ThemeId;
  photoDataUrl: string | null;
}

export type SectionId = 'games' | 'helpers';

export type HelperToolId = 'food' | 'timeline' | 'invite';

export interface FoodEstimate {
  id: string;
  label: string;
  quantity: number;
  unit: string;
  detail: string;
}

export interface TimelineRow {
  id: string;
  time: string;
  activity: string;
}

export interface EquipmentItem {
  id: string;
  label: string;
}

export interface InviteDetails {
  honoree: string;
  age: string;
  date: string;
  time: string;
  location: string;
  rsvpPhone: string;
}
