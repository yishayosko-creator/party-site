import type { FoodEstimate, SnackMode } from '@/types';

export const MAX_GUESTS = 300;
const KID_LITERS = 0.5;
const ADULT_LITERS = 0.75;
const WATER_SHARE = 0.6;

export function clampGuestCount(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.min(MAX_GUESTS, Math.max(0, Math.floor(value)));
}

function snackEstimate(kids: number, snackMode: SnackMode): FoodEstimate {
  if (snackMode === 'personal') {
    return { id: 'goody', label: 'שקיות הפתעה אישיות', quantity: kids, unit: 'שקיות', detail: 'שקית אחת לכל ילד' };
  }
  return {
    id: 'snacks',
    label: 'חטיפים מרכזיים לקערות',
    quantity: Math.ceil(kids / 3),
    unit: 'שקיות גדולות',
    detail: 'שקית גדולה אחת לכל 3 ילדים',
  };
}

export function calculateFoodEstimates(kids: number, adults: number, snackMode: SnackMode): FoodEstimate[] {
  const totalLiters = kids * KID_LITERS + adults * ADULT_LITERS;
  const waterLiters = Math.ceil(totalLiters * WATER_SHARE);
  const sweetLiters = Math.ceil(totalLiters * (1 - WATER_SHARE));
  const trays = Math.ceil((kids / 10) * 2.5);
  const tableware = Math.ceil((kids + adults) * 1.5);

  return [
    { id: 'trays', label: 'פיצות / מנות עיקריות', quantity: trays, unit: 'מגשים', detail: '2.5 מגשים לכל 10 ילדים' },
    snackEstimate(kids, snackMode),
    {
      id: 'water',
      label: 'מים ומשקאות מוגזים',
      quantity: waterLiters,
      unit: 'ליטר',
      detail: '60% מכלל השתייה',
    },
    {
      id: 'sweet',
      label: 'משקאות מתוקים ומיצים',
      quantity: sweetLiters,
      unit: 'ליטר',
      detail: '40% מכלל השתייה',
    },
    {
      id: 'tableware',
      label: 'צלחות, כוסות וסכו"ם',
      quantity: tableware,
      unit: 'יחידות לכל סוג',
      detail: 'כמות משתתפים כפול 1.5',
    },
  ];
}
