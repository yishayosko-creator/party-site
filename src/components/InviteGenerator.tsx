import { useMemo, useState } from 'react';
import { Check, Copy, Download, MessageCircle } from 'lucide-react';
import type { InviteDetails } from '@/types';
import InviteCard from '@/components/InviteCard';
import { buildWhatsAppInvite } from '@/utils/inviteText';
import { generateInvitePdf } from '@/utils/invitePdf';

const INPUT_CLASS =
  'w-full px-4 py-3 rounded-2xl border border-cream-300 bg-cream-50 focus:border-party-400 focus:ring-4 focus:ring-party-100 outline-none transition text-ink placeholder:text-ink/30 font-500';

const EMPTY_DETAILS: InviteDetails = {
  honoree: '',
  age: '',
  date: '',
  time: '',
  location: '',
  rsvpPhone: '',
};

type CopyState = 'idle' | 'copied' | 'failed';

export default function InviteGenerator() {
  const [details, setDetails] = useState<InviteDetails>(EMPTY_DETAILS);
  const [copyState, setCopyState] = useState<CopyState>('idle');
  const message = useMemo(() => buildWhatsAppInvite(details), [details]);

  const update = (field: keyof InviteDetails, value: string) => {
    setDetails((current) => ({ ...current, [field]: value }));
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopyState('copied');
    } catch {
      setCopyState('failed');
    }
    window.setTimeout(() => setCopyState('idle'), 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
      <div className="lg:col-span-2 rounded-3xl bg-white shadow-card overflow-hidden">
        <div className="px-6 py-5 bg-gradient-to-br from-party-500 to-party-700 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-700 text-xl">מחולל הזמנות</h2>
              <p className="text-party-100 text-sm font-500">הזמנה מוכנה לוואטסאפ ולהדפסה</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-700 text-ink/80 mb-1.5">שם חוגג/ת היום</label>
            <input
              type="text"
              value={details.honoree}
              onChange={(e) => update('honoree', e.target.value)}
              placeholder="למשל: שירה"
              className={INPUT_CLASS}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-700 text-ink/80 mb-1.5">גיל</label>
              <input
                type="text"
                value={details.age}
                onChange={(e) => update('age', e.target.value)}
                placeholder="למשל: 7"
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-sm font-700 text-ink/80 mb-1.5">טלפון לאישור הגעה</label>
              <input
                type="tel"
                value={details.rsvpPhone}
                onChange={(e) => update('rsvpPhone', e.target.value)}
                placeholder="050-0000000"
                className={INPUT_CLASS}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-700 text-ink/80 mb-1.5">תאריך</label>
              <input
                type="date"
                value={details.date}
                onChange={(e) => update('date', e.target.value)}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className="block text-sm font-700 text-ink/80 mb-1.5">שעה</label>
              <input
                type="time"
                value={details.time}
                onChange={(e) => update('time', e.target.value)}
                className={INPUT_CLASS}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-700 text-ink/80 mb-1.5">מיקום / כתובת</label>
            <input
              type="text"
              value={details.location}
              onChange={(e) => update('location', e.target.value)}
              placeholder="למשל: רחוב הרצל 10, תל אביב"
              className={INPUT_CLASS}
            />
          </div>
        </div>
      </div>

      <div className="lg:col-span-3 space-y-6">
        <InviteCard details={details} />

        <div className="rounded-3xl bg-white shadow-card p-6 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-display font-700 text-lg text-ink">טקסט מוכן לוואטסאפ</h3>
            <button
              type="button"
              onClick={copyMessage}
              className="flex items-center gap-1.5 text-sm font-700 text-party-700 bg-party-50 hover:bg-party-100 transition px-4 py-2 rounded-full"
            >
              {copyState === 'copied' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copyState === 'copied' ? 'הועתק!' : 'העתק טקסט להודעה'}
            </button>
          </div>
          <textarea
            readOnly
            value={message}
            rows={9}
            onFocus={(e) => e.currentTarget.select()}
            className="w-full px-4 py-3 rounded-2xl border border-cream-300 bg-cream-50 text-ink font-500 text-sm leading-relaxed resize-none"
          />
          {copyState === 'failed' && (
            <p className="text-sm font-600 text-party-700">
              לא הצלחנו להעתיק אוטומטית. אפשר ללחוץ על הטקסט ולהעתיק ידנית.
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => generateInvitePdf(details)}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl font-700 transition shadow-md w-full sm:w-auto justify-center bg-party-600 hover:bg-party-700 text-white"
        >
          <Download className="w-5 h-5" /> הורד הזמנה מעוצבת
        </button>
      </div>
    </div>
  );
}
