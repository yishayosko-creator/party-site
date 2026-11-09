import type { InviteDetails } from '@/types';

export const DEFAULT_HONOREE = 'החוגג/ת';

export function formatHebrewDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  if (!year || !month || !day) return '';
  return `${day}/${month}/${year}`;
}

export function buildWhatsAppInvite(details: InviteDetails): string {
  const honoree = details.honoree.trim() || DEFAULT_HONOREE;
  const age = details.age.trim();
  const date = formatHebrewDate(details.date);
  const lines: (string | null)[] = [
    '🎉 *הזמנה ליום הולדת!* 🎉',
    '',
    `🎂 מגיעים לחגוג ל*${honoree}*${age ? ` בגיל ${age}` : ''}!`,
    date ? `📅 תאריך: ${date}` : null,
    details.time.trim() ? `⏰ שעה: ${details.time.trim()}` : null,
    details.location.trim() ? `📍 מיקום: ${details.location.trim()}` : null,
    '',
    '🎈 נשמח לראות אתכם!',
    details.rsvpPhone.trim() ? `📞 לאישור הגעה: ${details.rsvpPhone.trim()}` : null,
  ];
  return lines.filter((line): line is string => line !== null).join('\n');
}
