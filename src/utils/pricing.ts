import type { PurchaseOption } from '@/types';

export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 100;
export const DEFAULT_QUANTITY = 30;
export const INCLUDED_CARDS = 50;
export const FAMILY_PROMO_CODE = 'FAMILY';

export const BUNDLE_PRICE_AGOROT = 3900;
export const PREMIUM_PRICE_AGOROT = 5900;
export const BUNDLE_LABEL = 'חבילת המסיבה המלאה (בינגו + חידון + מי הכי סביר ש...)';

const EXTRA_CARD_AGOROT = 5;

export const SINGLE_PRICE_AGOROT = 1900;

const FIXED_PRICE_AGOROT: Partial<Record<PurchaseOption, number>> = {
  bundle: BUNDLE_PRICE_AGOROT,
  premium: PREMIUM_PRICE_AGOROT,
};

export interface PriceBreakdown {
  basePriceAgorot: number;
  extraCards: number;
  extraAgorot: number;
  totalAgorot: number;
  isFree: boolean;
  isBundle: boolean;
}

export function normalizeQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return MIN_QUANTITY;
  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, Math.floor(quantity)));
}

export function isFamilyPromo(code: string): boolean {
  return code.trim().toUpperCase() === FAMILY_PROMO_CODE;
}

export function calculatePrice(
  quantity: number,
  promoCode: string,
  purchaseOption: PurchaseOption = 'single',
): PriceBreakdown {
  const isFree = isFamilyPromo(promoCode);
  const fixedPrice = FIXED_PRICE_AGOROT[purchaseOption];
  const isBundle = fixedPrice !== undefined;

  if (fixedPrice !== undefined) {
    return {
      basePriceAgorot: fixedPrice,
      extraCards: 0,
      extraAgorot: 0,
      totalAgorot: isFree ? 0 : fixedPrice,
      isFree,
      isBundle,
    };
  }

  const basePriceAgorot = SINGLE_PRICE_AGOROT;
  const extraCards = Math.max(0, normalizeQuantity(quantity) - INCLUDED_CARDS);
  const extraAgorot = extraCards * EXTRA_CARD_AGOROT;
  return {
    basePriceAgorot,
    extraCards,
    extraAgorot,
    totalAgorot: isFree ? 0 : basePriceAgorot + extraAgorot,
    isFree,
    isBundle,
  };
}

export function formatShekel(agorot: number): string {
  const shekels = agorot / 100;
  return `${Number.isInteger(shekels) ? shekels : shekels.toFixed(2)} ₪`;
}
