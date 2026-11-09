import type { InviteDetails } from '@/types';
import { DEFAULT_HONOREE, formatHebrewDate } from '@/utils/inviteText';

interface InviteCardProps {
  details: InviteDetails;
}

export default function InviteCard({ details }: InviteCardProps) {
  const honoree = details.honoree.trim() || DEFAULT_HONOREE;
  const age = details.age.trim();
  const rows = [
    { label: 'תאריך', value: formatHebrewDate(details.date) },
    { label: 'שעה', value: details.time.trim() },
    { label: 'מיקום', value: details.location.trim() },
  ].filter((row) => row.value !== '');

  return (
    <div className="rounded-3xl bg-cream-50 shadow-card border border-cream-200 overflow-hidden">
      <div className="px-6 py-10 text-center text-white bg-gradient-to-br from-party-600 to-party-800">
        <p className="text-xs font-700 tracking-wide">הזמנה ליום הולדת</p>
        <h3 className="font-display font-900 text-3xl mt-2 break-words">{honoree}</h3>
        {age && (
          <span className="inline-block mt-4 px-4 py-1 rounded-full bg-white/20 text-sm font-700">בגיל {age}</span>
        )}
      </div>
      <div className="px-6 py-6 space-y-4 text-center">
        {rows.map((row) => (
          <div key={row.label}>
            <p className="text-xs font-700 text-ink/50">{row.label}</p>
            <p className="font-700 text-ink break-words">{row.value}</p>
          </div>
        ))}
        <p className="pt-2 font-600 text-party-700">
          {details.rsvpPhone.trim() ? `לאישור הגעה: ${details.rsvpPhone.trim()}` : 'נשמח לראותכם!'}
        </p>
      </div>
    </div>
  );
}
