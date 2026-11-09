import { useState } from 'react';
import { X, Lock, ExternalLink, Check, Loader2, Download, Ticket, Package } from 'lucide-react';
import type { PurchaseOption } from '@/types';
import { formatShekel, isFamilyPromo, BUNDLE_PRICE_AGOROT, PREMIUM_PRICE_AGOROT, type PriceBreakdown } from '@/utils/pricing';

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  payhipUrl: string;
  onConfirmed: () => void;
  price: PriceBreakdown;
  promoCode: string;
  onPromoCodeChange: (code: string) => void;
  purchaseOption: PurchaseOption;
  onPurchaseOptionChange: (option: PurchaseOption) => void;
  canGenerate: boolean;
}

type Step = 'pay' | 'verifying' | 'ready';

const PROMO_INPUT_CLASS =
  'w-full px-4 py-2.5 rounded-xl border border-cream-300 bg-cream-50 focus:border-party-400 focus:ring-4 focus:ring-party-100 outline-none transition text-ink placeholder:text-ink/30 font-500 text-sm';

export default function PaymentModal({
  open,
  onClose,
  payhipUrl,
  onConfirmed,
  price,
  promoCode,
  onPromoCodeChange,
  purchaseOption,
  onPurchaseOptionChange,
  canGenerate,
}: PaymentModalProps) {
  const [step, setStep] = useState<Step>('pay');

  if (!open) return null;

  const reset = () => {
    setStep('pay');
    onClose();
  };

  const handleConfirmPaid = () => {
    setStep('verifying');
    setTimeout(() => setStep('ready'), 1800);
  };

  const handleDownload = () => {
    onConfirmed();
    setStep('pay');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={reset} />

      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-float animate-slide-up">
        <button
          type="button"
          onClick={reset}
          className="absolute top-4 end-4 z-10 w-9 h-9 rounded-full bg-ink/5 hover:bg-ink/10 flex items-center justify-center transition"
          aria-label="סגירה"
        >
          <X className="w-4 h-4 text-ink/60" />
        </button>

        {step === 'pay' && (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-party-500 to-party-700 mx-auto flex items-center justify-center mb-5">
              <Lock className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-display font-800 text-2xl text-ink mb-2">פתחו את הקובץ להדפסה</h3>
            <p className="text-ink/50 font-500 text-sm leading-relaxed mb-6">
              בצעו תשלום מהיר כדי להוריד את המשחק באיכות גבוהה, מוכן להדפסה כקובץ PDF.
            </p>

            {canGenerate && (
              <div className="text-start mb-5">
                <div className="grid grid-cols-1 gap-2">
                  <button
                    type="button"
                    aria-pressed={purchaseOption === 'single'}
                    onClick={() => onPurchaseOptionChange('single')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition text-start ${
                      purchaseOption === 'single'
                        ? 'border-party-400 bg-party-50'
                        : 'border-cream-200 bg-cream-50/50 hover:border-party-200'
                    }`}
                  >
                    <div>
                      <span className={`block text-sm font-700 ${purchaseOption === 'single' ? 'text-party-700' : 'text-ink/80'}`}>
                        משחק יחיד
                      </span>
                      <span className="block text-xs text-ink/50 font-500">המחיר הדינמי לפי בחירתכם</span>
                    </div>
                    <span className="text-sm font-800 text-ink">{formatShekel(price.isBundle ? price.basePriceAgorot : price.totalAgorot)}</span>
                  </button>

                  <button
                    type="button"
                    aria-pressed={purchaseOption === 'bundle'}
                    onClick={() => onPurchaseOptionChange('bundle')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition text-start ${
                      purchaseOption === 'bundle'
                        ? 'border-party-400 bg-party-50'
                        : 'border-cream-200 bg-cream-50/50 hover:border-party-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-party-500" />
                      <div>
                        <span className={`block text-sm font-700 ${purchaseOption === 'bundle' ? 'text-party-700' : 'text-ink/80'}`}>
                          חבילת המסיבה המלאה
                        </span>
                        <span className="block text-xs text-ink/50 font-500">בינגו + חידון + מי הכי סביר ש...</span>
                      </div>
                    </div>
                    <span className="text-sm font-800 text-party-600">{formatShekel(BUNDLE_PRICE_AGOROT)}</span>
                  </button>

                  <button
                    type="button"
                    aria-pressed={purchaseOption === 'premium'}
                    onClick={() => onPurchaseOptionChange('premium')}
                    className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition text-start ${
                      purchaseOption === 'premium'
                        ? 'border-party-400 bg-party-50'
                        : 'border-cream-200 bg-cream-50/50 hover:border-party-200'
                    }`}
                  >
                    <div>
                      <span className={`block text-sm font-700 ${purchaseOption === 'premium' ? 'text-party-700' : 'text-ink/80'}`}>
                        חבילת Premium VIP
                      </span>
                      <span className="block text-xs text-ink/50 font-500">כל חבילת המסיבה + הזמנה לוואטסאפ ותבניות פרופס</span>
                    </div>
                    <span className="text-sm font-800 text-party-600">{formatShekel(PREMIUM_PRICE_AGOROT)}</span>
                  </button>
                </div>
              </div>
            )}

            <div className="text-start rounded-2xl bg-cream-100 border border-cream-200 p-4 mb-5 space-y-2 text-sm font-500 text-ink/70">
              {price.isBundle ? (
                <div className="flex justify-between items-center pt-2 mt-1 border-t border-cream-200 text-base font-800 text-ink">
                  <span>סה״כ חבילה</span>
                  <span className={price.isFree ? 'text-emerald-600' : ''}>{formatShekel(price.totalAgorot)}</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span>מחיר בסיס</span>
                    <span>{formatShekel(price.basePriceAgorot)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>עותקים נוספים ({price.extraCards})</span>
                    <span>{formatShekel(price.extraAgorot)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 mt-1 border-t border-cream-200 text-base font-800 text-ink">
                    <span>סה״כ</span>
                    <span className={price.isFree ? 'text-emerald-600' : ''}>{formatShekel(price.totalAgorot)}</span>
                  </div>
                </>
              )}
            </div>

            <div className="text-start mb-5">
              <label htmlFor="promo-code" className="flex items-center gap-1.5 text-xs font-700 text-ink/70 mb-1.5">
                <Ticket className="w-3.5 h-3.5 text-party-500" /> קוד קופון / מנוי
              </label>
              <input
                id="promo-code"
                type="text"
                value={promoCode}
                onChange={(e) => onPromoCodeChange(e.target.value)}
                placeholder="הזינו קוד"
                autoComplete="off"
                className={PROMO_INPUT_CLASS}
              />
              {isFamilyPromo(promoCode) && (
                <p className="mt-1.5 text-xs font-600 text-emerald-600">הקוד הופעל בהצלחה.</p>
              )}
            </div>

            {price.isFree ? (
              <button
                type="button"
                onClick={handleDownload}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-700 transition shadow-md"
              >
                <Download className="w-5 h-5" /> הורד קובץ PDF בחינם (הטבת מנוי)
              </button>
            ) : (
              <>
                <a
                  href={payhipUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-party-600 hover:bg-party-700 text-white font-700 transition shadow-md mb-3"
                >
                  לתשלום דרך Payhip <ExternalLink className="w-4 h-4" />
                </a>

                <div className="relative my-5">
                  <div className="border-t border-cream-200" />
                  <span className="absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-xs font-600 text-ink/40">
                    אחרי שסיימתם לשלם
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleConfirmPaid}
                  className="w-full py-3 rounded-2xl border-2 border-party-300 text-party-600 hover:bg-party-50 font-700 transition"
                >
                  שילמתי – פתחו את ה-PDF
                </button>
              </>
            )}
          </div>
        )}

        {step === 'verifying' && (
          <div className="p-12 text-center">
            <Loader2 className="w-12 h-12 text-party-500 mx-auto animate-spin mb-5" />
            <h3 className="font-display font-700 text-xl text-ink mb-1">מאמתים את הרכישה…</h3>
            <p className="text-ink/40 text-sm font-500">מכינים את ההורדה</p>
          </div>
        )}

        {step === 'ready' && (
          <div className="p-8 text-center animate-pop-in">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 mx-auto flex items-center justify-center mb-5">
              <Check className="w-8 h-8 text-white" strokeWidth={3} />
            </div>
            <h3 className="font-display font-800 text-2xl text-ink mb-2">הכול מוכן!</h3>
            <p className="text-ink/50 font-500 text-sm leading-relaxed mb-6">
              קובץ ה-PDF באיכות גבוהה מוכן להורדה. נהנים מהמסיבה!
            </p>
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-party-600 hover:bg-party-700 text-white font-700 transition shadow-md"
            >
              <Download className="w-5 h-5" /> הורדת ה-PDF
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
