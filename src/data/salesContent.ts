import type { PurchaseOption } from '@/types';
import { BUNDLE_PRICE_AGOROT, PREMIUM_PRICE_AGOROT, SINGLE_PRICE_AGOROT } from '@/utils/pricing';

export interface SalesPlan {
  id: PurchaseOption;
  name: string;
  priceAgorot: number;
  audience: string;
  includes: string[];
  cta: string;
  featured: boolean;
}

export const SALES_PLANS: SalesPlan[] = [
  {
    id: 'single',
    name: 'משחק בודד',
    priceAgorot: SINGLE_PRICE_AGOROT,
    audience: 'למסיבה קטנה, או למי שרוצה משחק אחד מוכן להדפסה.',
    includes: ['משחק אחד לבחירה: בינגו, חידון או מי הכי סביר ש...', 'טקסט אישי עם שם חוגג/ת היום', 'קובץ PDF אחד להדפסה'],
    cta: 'לרכישת משחק בודד',
    featured: false,
  },
  {
    id: 'bundle',
    name: 'חבילת המסיבה',
    priceAgorot: BUNDLE_PRICE_AGOROT,
    audience: 'לרוב ההורים שרוצים מסיבה מלאה, בלי להתעסק בתכנון.',
    includes: [
      'מחולל בינגו מותאם אישית',
      'חידון טריוויה אישי לחוגג/ת היום',
      'מי הכי סביר ש... עם כרטיסי הצבעה',
      'העלאת תמונה אישית לעיצוב',
      'בונוס: תעודות ושלטי דלת להדפסה',
      'רישיון הדפסה ללא הגבלה',
    ],
    cta: 'לרכישת חבילת המסיבה',
    featured: true,
  },
  {
    id: 'premium',
    name: 'חבילת Premium VIP',
    priceAgorot: PREMIUM_PRICE_AGOROT,
    audience: 'למי שרוצה הכול: הזמנה דיגיטלית, כל העיצובים ותבניות לפינת צילום.',
    includes: [
      'כל מה שבחבילת המסיבה',
      'מחולל הזמנה דיגיטלית לוואטסאפ',
      'כל ערכות העיצוב',
      'תבניות פרופס לפינת צילום',
    ],
    cta: 'לרכישת Premium VIP',
    featured: false,
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    title: 'בחירת משחק',
    description: 'בוחרים משחק בודד או את חבילת המסיבה המלאה, לפי מה שהמסיבה צריכה.',
  },
  {
    title: 'התאמה אישית',
    description: 'מזינים את שם חוגג/ת היום, מוסיפים תמונה ובוחרים ערכת עיצוב. התצוגה המקדימה מתעדכנת מיד.',
  },
  {
    title: 'הורדת PDF',
    description: 'מורידים את הקובץ ומדפיסים ב-A4 בבית או בחנות צילום. מוכנים למשחק.',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'צריך להתקין תוכנה כדי להשתמש באתר?',
    answer: 'לא. הכול עובד מהדפדפן, במחשב או בטלפון, וההורדה נעשית ישירות לקובץ PDF.',
  },
  {
    question: 'איך מדפיסים את המשחקים?',
    answer: 'הקבצים מעוצבים לגודל A4. אפשר להדפיס בבית במדפסת רגילה, או בכל חנות צילום.',
  },
  {
    question: 'מה קורה אם לא מילאתי את כל השדות?',
    answer: 'השדות החסרים מתמלאים אוטומטית ברעיונות מוכנים, כך שהקובץ תמיד נראה מלא ומסודר.',
  },
  {
    question: 'אפשר לראות את המשחק לפני התשלום?',
    answer: 'כן. התצוגה המקדימה חיה, ומה שאתם רואים בה הוא מה שיופיע בקובץ.',
  },
  {
    question: 'איך מתבצע התשלום?',
    answer: 'התשלום מתבצע דרך Payhip. אחרי התשלום פותחים את הקובץ להורדה מיד.',
  },
  {
    question: 'אפשר להשתמש בקופון?',
    answer: 'כן. בחלון התשלום יש שדה לקוד קופון או מנוי.',
  },
];
