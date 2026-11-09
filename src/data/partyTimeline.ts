import type { EquipmentItem, TimelineRow } from '@/types';

export const MAX_TIMELINE_ROWS = 12;

export const DEFAULT_TIMELINE: TimelineRow[] = [
  { id: 'tl-1', time: '16:00', activity: 'התכנסות ומוזיקה' },
  { id: 'tl-2', time: '16:15', activity: 'משחק בינגו' },
  { id: 'tl-3', time: '16:45', activity: 'הפסקת אוכל' },
  { id: 'tl-4', time: '17:05', activity: 'חידון טריוויה וכלת השמחה' },
  { id: 'tl-5', time: '17:30', activity: 'עוגה ושירי יום הולדת' },
];

export const EQUIPMENT_ITEMS: EquipmentItem[] = [
  { id: 'eq-prizes', label: 'פרסים לבינגו' },
  { id: 'eq-sheets', label: 'דפי משחק מודפסים' },
  { id: 'eq-speaker', label: 'רמקול נייד / מערכת הגברה + כבל טעינה' },
  { id: 'eq-candles', label: 'נרות יום הולדת, מצית / גפרורים, וסכין גדולה לחיתוך עוגה' },
  { id: 'eq-napkins', label: 'מפיות, מגבונים לחים ושקיות אשפה גדולות' },
  { id: 'eq-decor', label: 'שילוט כניסה, בלונים וקישוטים אופציונליים' },
  { id: 'eq-serving', label: 'קערות הגשה מרכזיות + סכו"ם וצלחות חד-פעמיות' },
  { id: 'eq-firstaid', label: 'ערכת עזרה ראשונה קטנה (פלסטרים, חיטוי)' },
  { id: 'eq-party', label: 'אביזרי מסיבה אופציונליים (זוהרים, כובעים, משקפיים מצחיקים)' },
];
