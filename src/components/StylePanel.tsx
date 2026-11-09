import { useState, type ChangeEvent } from 'react';
import { Check, ImagePlus, Palette, Trash2 } from 'lucide-react';
import type { PartyStyle, ThemeId } from '@/types';
import { THEME_OPTIONS } from '@/data/themes';
import { createCircularAvatar } from '@/utils/photo';

interface StylePanelProps {
  partyStyle: PartyStyle;
  onThemeChange: (theme: ThemeId) => void;
  onPhotoChange: (photoDataUrl: string | null) => void;
}

export default function StylePanel({ partyStyle, onThemeChange, onPhotoChange }: StylePanelProps) {
  const [loading, setLoading] = useState(false);
  const [photoError, setPhotoError] = useState<string | null>(null);

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setLoading(true);
    setPhotoError(null);
    try {
      onPhotoChange(await createCircularAvatar(file));
    } catch (error) {
      setPhotoError(error instanceof Error ? error.message : 'לא ניתן לטעון את התמונה');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-8 rounded-3xl bg-white/80 border border-cream-200 shadow-sm p-5 sm:p-6 space-y-6 animate-slide-up">
      <div>
        <h3 className="flex items-center gap-2 font-display font-800 text-base text-ink mb-3">
          <Palette className="w-4 h-4 text-party-500" /> ערכות עיצוב
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {THEME_OPTIONS.map((palette) => {
            const active = partyStyle.theme === palette.id;
            return (
              <button
                key={palette.id}
                type="button"
                aria-pressed={active}
                onClick={() => onThemeChange(palette.id)}
                className={`relative text-start rounded-2xl border-2 p-3 transition-all duration-200 hover:-translate-y-0.5 ${
                  active ? 'border-party-500 shadow-md' : 'border-cream-200 hover:border-cream-300'
                }`}
              >
                <div
                  className="relative h-14 rounded-xl mb-3 overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${palette.colors.headerFrom}, ${palette.colors.headerTo})`,
                  }}
                >
                  <span
                    className="absolute bottom-2 end-2 w-4 h-4 rounded-full ring-2 ring-white/70"
                    style={{ background: palette.colors.accent }}
                  />
                </div>
                <p className="font-700 text-sm text-ink">{palette.label}</p>
                <p className="text-xs text-ink/50 font-500 mt-0.5">{palette.description}</p>
                {active && (
                  <span className="absolute top-3 end-3 w-5 h-5 rounded-full bg-party-500 text-white flex items-center justify-center">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {partyStyle.photoDataUrl ? (
          <img
            src={partyStyle.photoDataUrl}
            alt="תמונה של חוגג/ת היום"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-party-300 shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-cream-100 border-2 border-dashed border-cream-300 flex items-center justify-center shrink-0">
            <ImagePlus className="w-5 h-5 text-ink/30" />
          </div>
        )}

        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <label
              htmlFor="host-photo"
              className="inline-flex items-center gap-2 cursor-pointer px-4 py-2 rounded-full bg-party-600 hover:bg-party-700 text-white text-sm font-700 transition shadow-sm"
            >
              <ImagePlus className="w-4 h-4" />
              העלאת תמונה של חתן/כלת השמחה (אופציונלי)
            </label>
            <input id="host-photo" type="file" accept="image/*" className="sr-only" onChange={handleFile} />
            {partyStyle.photoDataUrl && (
              <button
                type="button"
                onClick={() => onPhotoChange(null)}
                className="inline-flex items-center gap-1.5 text-xs font-700 text-ink/50 hover:text-party-600 transition px-3 py-2"
              >
                <Trash2 className="w-3.5 h-3.5" /> הסרת התמונה
              </button>
            )}
          </div>
          {loading && <p className="text-xs text-ink/50 font-500">טוענים תמונה...</p>}
          {photoError && <p className="text-xs text-party-600 font-600">{photoError}</p>}
          {!loading && !photoError && (
            <p className="text-xs text-ink/40 font-500">התמונה תופיע במרכז כרטיסי הבינגו ובכותרת החידון והמשחק.</p>
          )}
        </div>
      </div>
    </section>
  );
}
