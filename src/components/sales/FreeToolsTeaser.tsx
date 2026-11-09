import { Calculator, CalendarClock, Mail, ArrowLeft } from 'lucide-react';

interface FreeToolsTeaserProps {
  onOpenHelpers: () => void;
}

const TOOLS = [
  {
    icon: Calculator,
    title: 'מחשבון כיבוד ושתייה',
    description: 'כמה אוכל ושתייה צריך לכמות האורחים שלכם, עם רשימת קניות מודפסת.',
  },
  {
    icon: CalendarClock,
    title: "לוח זמנים וצ'ק-ליסט",
    description: 'סדר האירוע משעה לשעה, ורשימת ציוד שלא תשכחו בבית.',
  },
  {
    icon: Mail,
    title: 'הזמנה ל-WhatsApp',
    description: 'יוצרים הזמנה מעוצבת עם טקסט מוכן להעתקה ולשליחה לקבוצה.',
  },
];

export default function FreeToolsTeaser({ onOpenHelpers }: FreeToolsTeaserProps) {
  return (
    <section id="free-tools" className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div className="max-w-2xl">
          <p className="text-xs font-800 text-party-600 mb-2">חינם לכל מארגן</p>
          <h2 className="font-display font-900 text-3xl sm:text-4xl text-ink text-balance">כלים חינמיים לתכנון המסיבה</h2>
          <p className="mt-3 text-ink/55 font-500">שלושה כלים שמקלים על ההכנות, בלי הרשמה ובלי תשלום.</p>
        </div>
        <button
          type="button"
          onClick={onOpenHelpers}
          className="flex items-center gap-2 self-start md:self-auto px-5 py-3 rounded-2xl font-700 bg-white text-ink border border-cream-300 hover:border-party-300 transition shadow-sm"
        >
          לכל הכלים <ArrowLeft className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
        {TOOLS.map((tool) => (
          <button
            key={tool.title}
            type="button"
            onClick={onOpenHelpers}
            className="group text-start rounded-3xl bg-white border border-cream-200 shadow-card p-6 sm:p-7 transition duration-300 hover:-translate-y-1 hover:border-party-200"
          >
            <div className="w-12 h-12 rounded-2xl bg-ocean-50 text-ocean-600 flex items-center justify-center mb-5 transition group-hover:bg-ocean-100">
              <tool.icon className="w-6 h-6" />
            </div>
            <h3 className="font-display font-800 text-xl text-ink mb-2">{tool.title}</h3>
            <p className="text-sm text-ink/60 font-500 leading-relaxed">{tool.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
