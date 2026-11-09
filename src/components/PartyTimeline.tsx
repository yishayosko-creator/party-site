import { useState } from 'react';
import { CalendarClock, Download, Plus, Trash2, ListChecks } from 'lucide-react';
import type { TimelineRow } from '@/types';
import { DEFAULT_TIMELINE, EQUIPMENT_ITEMS, MAX_TIMELINE_ROWS } from '@/data/partyTimeline';
import { generateTimelinePdf } from '@/utils/timelinePdf';

const INPUT_CLASS =
  'px-3 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:border-ocean-400 focus:ring-4 focus:ring-ocean-100 outline-none transition text-ink font-500 text-sm';

export default function PartyTimeline() {
  const [eventTitle, setEventTitle] = useState('');
  const [rows, setRows] = useState<TimelineRow[]>(DEFAULT_TIMELINE);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [nextId, setNextId] = useState(DEFAULT_TIMELINE.length + 1);

  const updateRow = (id: string, patch: Partial<TimelineRow>) => {
    setRows((current) => current.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  };

  const addRow = () => {
    if (rows.length >= MAX_TIMELINE_ROWS) return;
    setRows((current) => [...current, { id: `tl-${nextId}`, time: '', activity: '' }]);
    setNextId((n) => n + 1);
  };

  const removeRow = (id: string) => {
    setRows((current) => current.filter((row) => row.id !== id));
  };

  const checklist = EQUIPMENT_ITEMS.map((item) => ({
    label: item.label,
    checked: Boolean(checked[item.id]),
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
      <div className="lg:col-span-3 rounded-3xl bg-white shadow-card overflow-hidden">
        <div className="px-6 py-5 bg-gradient-to-br from-ocean-500 to-ocean-700 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <CalendarClock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-700 text-xl">לוח זמנים לאירוע</h2>
              <p className="text-ocean-100 text-sm font-500">ערכו את השעות והפעילויות לפי הצורך</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-700 text-ink/80 mb-1.5">שם האירוע (אופציונלי)</label>
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="למשל: יום הולדת של שירה"
              className="w-full px-4 py-3 rounded-2xl border border-cream-300 bg-cream-50 focus:border-ocean-400 focus:ring-4 focus:ring-ocean-100 outline-none transition text-ink placeholder:text-ink/30 font-500"
            />
          </div>

          <div className="space-y-2.5">
            {rows.map((row) => (
              <div key={row.id} className="flex items-center gap-2">
                <input
                  type="time"
                  value={row.time}
                  onChange={(e) => updateRow(row.id, { time: e.target.value })}
                  aria-label="שעה"
                  className={`${INPUT_CLASS} w-28 shrink-0`}
                />
                <input
                  type="text"
                  value={row.activity}
                  onChange={(e) => updateRow(row.id, { activity: e.target.value })}
                  placeholder="מה קורה בשעה הזו?"
                  aria-label="פעילות"
                  className={`${INPUT_CLASS} flex-1 min-w-0`}
                />
                <button
                  type="button"
                  onClick={() => removeRow(row.id)}
                  className="text-ink/30 hover:text-party-500 transition p-1.5 shrink-0"
                  aria-label="מחיקת שורה"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {rows.length < MAX_TIMELINE_ROWS && (
            <button
              type="button"
              onClick={addRow}
              className="flex items-center gap-2 w-full justify-center py-3 rounded-2xl border-2 border-dashed border-cream-300 text-ink/50 hover:text-ocean-600 hover:border-ocean-300 transition font-700 text-sm"
            >
              <Plus className="w-4 h-4" /> הוספת שורה
            </button>
          )}
        </div>
      </div>

      <div className="lg:col-span-2 space-y-4">
        <div className="rounded-3xl bg-white shadow-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <ListChecks className="w-4 h-4 text-ocean-600" />
            <h3 className="font-display font-700 text-lg text-ink">צ'ק-ליסט ציוד</h3>
          </div>
          <ul className="space-y-2.5">
            {EQUIPMENT_ITEMS.map((item) => (
              <li key={item.id}>
                <label className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-cream-50 border border-cream-200 cursor-pointer hover:border-ocean-300 transition">
                  <input
                    type="checkbox"
                    checked={Boolean(checked[item.id])}
                    onChange={(e) => setChecked((c) => ({ ...c, [item.id]: e.target.checked }))}
                    className="w-5 h-5 rounded accent-ocean-600"
                  />
                  <span className="font-600 text-ink/80">{item.label}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => generateTimelinePdf(eventTitle, rows, checklist)}
          className="flex items-center gap-2 px-6 py-3 rounded-2xl font-700 transition shadow-md w-full justify-center bg-ocean-600 hover:bg-ocean-700 text-white"
        >
          <Download className="w-5 h-5" /> הורד לו"ז וצ'ק-ליסט ל-PDF
        </button>
      </div>
    </div>
  );
}
