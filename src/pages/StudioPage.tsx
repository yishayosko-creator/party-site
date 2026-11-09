import { useCallback, useMemo, useState } from 'react';
import { AlertTriangle, Check, Download, RefreshCw, RotateCcw, Sparkles } from 'lucide-react';
import type { BingoConfig, GameModuleId, TriviaConfig, MostLikelyConfig, PartyStyle, PurchaseOption, SectionId } from '@/types';
import TabNav from '@/components/TabNav';
import StylePanel from '@/components/StylePanel';
import BingoForm from '@/components/BingoForm';
import BingoCard from '@/components/BingoCard';
import TriviaForm from '@/components/TriviaForm';
import TriviaPreview from '@/components/TriviaPreview';
import MostLikelyForm from '@/components/MostLikelyForm';
import MostLikelyPreview from '@/components/MostLikelyPreview';
import PaymentModal from '@/components/PaymentModal';
import SectionToggle from '@/components/SectionToggle';
import HelpersHub from '@/components/HelpersHub';
import AmbientBackdrop from '@/components/AmbientBackdrop';
import ConfirmDialog from '@/components/ConfirmDialog';
import { usePersistentState } from '@/utils/persistentState';
import { generateBingoPdf } from '@/utils/pdf';
import { generateTriviaPdf } from '@/utils/triviaPdf';
import { generateMostLikelyPdf } from '@/utils/mostLikelyPdf';
import { generateBundlePdf } from '@/utils/bundlePdf';
import { buildCard, buildPhrasePool, personalizePhrases, seededRandom } from '@/utils/bingo';
import { MODE_OPTIONS, getGridRule } from '@/utils/gameRules';
import { DEFAULT_QUANTITY, calculatePrice } from '@/utils/pricing';

const PAYHIP_URL = 'https://payhip.com/b/your-product-link';

const DEFAULT_BINGO: BingoConfig = {
  title: '',
  name: '',
  phrasesText: '',
  gridSize: 5,
  mode: 'classic',
  headerWord: '',
  quantity: DEFAULT_QUANTITY,
};

const DEFAULT_TRIVIA: TriviaConfig = {
  title: '',
  name: '',
  questions: [],
};

const DEFAULT_MOST_LIKELY: MostLikelyConfig = {
  title: '',
  name: '',
  statements: [],
};

const DEFAULT_STYLE: PartyStyle = { theme: 'colorful', photoDataUrl: null };

const MODULE_HEADINGS: Record<GameModuleId, { badge: string; title: string; subtitle: string }> = {
  bingo: {
    badge: 'התאמה אישית והדפסה תוך דקות',
    title: 'הפכו את יום ההולדת ל',
    subtitle: 'הזינו פרטי אירוע ומאגר ביטויים. הורידו חבילה להדפסה של כרטיסי בינגו ייחודיים, ודף קריאה למנחה.',
  },
  trivia: {
    badge: 'חידון אישי על חוגג/ת היום',
    title: 'בחנו את האורחים – כמה הם',
    subtitle: 'הזינו שאלות טריוויה אישיות והורידו טופס תשובות לאורחים ומפתח תשובות למנחה.',
  },
  mostlikely: {
    badge: 'משחק הצבעה כיפי לכל האורחים',
    title: 'מי מהאורחים הכי סביר ש',
    subtitle: 'הזינו הצהרות מצחיקות והורידו כרטיסי הצבעה מוכנים להדפסה לאורחים.',
  },
};

function parsePhraseCount(text: string): number {
  return text.split('\n').filter((l) => l.trim()).length;
}

function bingoNeedsFallback(config: BingoConfig): boolean {
  return parsePhraseCount(config.phrasesText) < MODE_OPTIONS[config.mode].poolSize;
}

function triviaNeedsFallback(config: TriviaConfig): boolean {
  const valid = config.questions.filter((q) => q.question.trim()).length;
  return valid < 5;
}

function mostLikelyNeedsFallback(config: MostLikelyConfig): boolean {
  const valid = config.statements.filter((s) => s.trim()).length;
  return valid < 10;
}

function anyNeedsFallback(
  bingo: BingoConfig,
  trivia: TriviaConfig,
  mostLikely: MostLikelyConfig,
  tab: GameModuleId,
  option: PurchaseOption,
): boolean {
  if (option !== 'single') {
    return bingoNeedsFallback(bingo) || triviaNeedsFallback(trivia) || mostLikelyNeedsFallback(mostLikely);
  }
  if (tab === 'bingo') return bingoNeedsFallback(bingo);
  if (tab === 'trivia') return triviaNeedsFallback(trivia);
  return mostLikelyNeedsFallback(mostLikely);
}

interface StudioPageProps {
  initialSection: SectionId;
  initialPurchaseOption: PurchaseOption;
}

export default function StudioPage({ initialSection, initialPurchaseOption }: StudioPageProps) {
  const [activeTab, setActiveTab] = useState<GameModuleId>('bingo');
  const [bingoConfig, setBingoConfig, bingoSaveFailed] = usePersistentState('studio.bingo', DEFAULT_BINGO);
  const [triviaConfig, setTriviaConfig, triviaSaveFailed] = usePersistentState('studio.trivia', DEFAULT_TRIVIA);
  const [mostLikelyConfig, setMostLikelyConfig, mostLikelySaveFailed] = usePersistentState(
    'studio.mostlikely',
    DEFAULT_MOST_LIKELY,
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [previewSeed, setPreviewSeed] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [purchaseOption, setPurchaseOption] = useState<PurchaseOption>(initialPurchaseOption);
  const [section, setSection] = useState<SectionId>(initialSection);
  const [partyStyle, setPartyStyle, styleSaveFailed] = usePersistentState<PartyStyle>('studio.style', DEFAULT_STYLE);
  const saveFailed = bingoSaveFailed || triviaSaveFailed || mostLikelySaveFailed || styleSaveFailed;

  const poolSize = MODE_OPTIONS[bingoConfig.mode].poolSize;
  const pool = useMemo(
    () => personalizePhrases(buildPhrasePool(bingoConfig.phrasesText, poolSize), bingoConfig.name),
    [bingoConfig.phrasesText, bingoConfig.name, poolSize],
  );
  const previewCells = useMemo(
    () => buildCard(pool, getGridRule(bingoConfig.gridSize), seededRandom(previewSeed)),
    [pool, bingoConfig.gridSize, previewSeed],
  );

  const showAutoFillNote = anyNeedsFallback(
    bingoConfig, triviaConfig, mostLikelyConfig, activeTab, purchaseOption,
  );

  const price = calculatePrice(bingoConfig.quantity, promoCode, purchaseOption);

  const handleConfirmed = async () => {
    setModalOpen(false);
    if (purchaseOption !== 'single') {
      await generateBundlePdf(bingoConfig, pool, triviaConfig, mostLikelyConfig, partyStyle);
      return;
    }
    if (activeTab === 'bingo') {
      await generateBingoPdf(bingoConfig, pool, partyStyle);
    } else if (activeTab === 'trivia') {
      await generateTriviaPdf(triviaConfig, partyStyle);
    } else {
      await generateMostLikelyPdf(mostLikelyConfig, partyStyle);
    }
  };

  const heading = MODULE_HEADINGS[activeTab];

  const resetForm = () => {
    setBingoConfig(DEFAULT_BINGO);
    setTriviaConfig(DEFAULT_TRIVIA);
    setMostLikelyConfig(DEFAULT_MOST_LIKELY);
    setPartyStyle(DEFAULT_STYLE);
    setResetOpen(false);
  };
  const closeReset = useCallback(() => setResetOpen(false), []);

  return (
    <div dir="rtl" className="min-h-screen bg-cream-100 text-ink relative overflow-x-hidden">
      <AmbientBackdrop />

      <SectionToggle active={section} onChange={setSection} />

      {section === 'games' ? (
      <>
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-2 text-center scroll-mt-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/70 border border-cream-200 text-xs font-700 text-party-600 mb-5 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" /> {heading.badge}
        </div>
        <h2 className="font-display font-900 text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.15] text-balance animate-slide-up">
          {heading.title}
          <span className="bg-gradient-to-l from-party-500 via-party-600 to-party-700 bg-clip-text text-transparent">
            משחק מסיבה
          </span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-ink/50 font-500 text-base sm:text-lg leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {heading.subtitle}
        </p>
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        <TabNav active={activeTab} onChange={setActiveTab} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-4 flex flex-wrap items-center justify-between gap-3">
        <p
          role="status"
          className={`inline-flex items-center gap-1.5 text-xs font-600 ${saveFailed ? 'text-amber-700' : 'text-emerald-700'}`}
        >
          {saveFailed ? <AlertTriangle className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
          {saveFailed ? 'לא ניתן לשמור בדפדפן. ייתכן שהתמונה גדולה מדי.' : 'השינויים נשמרים אוטומטית'}
        </p>
        <button
          type="button"
          onClick={() => setResetOpen(true)}
          className="flex items-center gap-1.5 text-xs font-700 text-ink/70 bg-white hover:bg-cream-50 border border-cream-200 transition px-3.5 py-2 rounded-full"
        >
          <RotateCcw className="w-3.5 h-3.5" /> איפוס טופס
        </button>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-16">
        <StylePanel
          partyStyle={partyStyle}
          onThemeChange={(theme) => setPartyStyle((s) => ({ ...s, theme }))}
          onPhotoChange={(photoDataUrl) => setPartyStyle((s) => ({ ...s, photoDataUrl }))}
        />
        {activeTab === 'bingo' && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-2 lg:sticky lg:top-20 animate-slide-up">
              <BingoForm config={bingoConfig} onChange={setBingoConfig} />
            </div>
            <div className="lg:col-span-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-ink/50 font-600 text-sm">
                  <span className="w-2 h-2 rounded-full bg-party-500 animate-pulse" />
                  תצוגה מקדימה חיה
                </div>
                <button
                  type="button"
                  onClick={() => setPreviewSeed((s) => s + 1)}
                  className="flex items-center gap-1.5 text-xs font-700 text-party-600 bg-white hover:bg-party-50 border border-cream-200 transition px-3 py-1.5 rounded-full"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> ערבוב התצוגה
                </button>
              </div>
              <BingoCard
                title={bingoConfig.title}
                name={bingoConfig.name}
                cells={previewCells}
                size={bingoConfig.gridSize}
                mode={bingoConfig.mode}
                headerWord={bingoConfig.headerWord}
                partyStyle={partyStyle}
              />
            </div>
          </div>
        )}

        {activeTab === 'trivia' && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-2 lg:sticky lg:top-20 animate-slide-up">
              <TriviaForm config={triviaConfig} onChange={setTriviaConfig} />
            </div>
            <div className="lg:col-span-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-2 text-ink/50 font-600 text-sm mb-3">
                <span className="w-2 h-2 rounded-full bg-ocean-500 animate-pulse" />
                תצוגה מקדימה חיה
              </div>
              <TriviaPreview config={triviaConfig} partyStyle={partyStyle} />
            </div>
          </div>
        )}

        {activeTab === 'mostlikely' && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            <div className="lg:col-span-2 lg:sticky lg:top-20 animate-slide-up">
              <MostLikelyForm config={mostLikelyConfig} onChange={setMostLikelyConfig} />
            </div>
            <div className="lg:col-span-3 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-2 text-ink/50 font-600 text-sm mb-3">
                <span className="w-2 h-2 rounded-full bg-confetti-orange-500 animate-pulse" />
                תצוגה מקדימה חיה
              </div>
              <MostLikelyPreview config={mostLikelyConfig} partyStyle={partyStyle} />
            </div>
          </div>
        )}

        <div className="mt-6 rounded-2xl bg-gradient-to-br from-ink/5 to-cream-200/60 p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-start">
            <h3 className="font-display font-700 text-lg text-ink">מוכנים למסיבה?</h3>
            <p className="text-sm text-ink/50 font-500">
              בחרו משחק יחיד או את חבילת המסיבה המלאה – והורידו הכל בקובץ PDF מוכן להדפסה.
            </p>
          </div>
          {showAutoFillNote && (
            <p className="text-xs text-party-600 font-600 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              חלק מהשדות הריקים הושלמו אוטומטית ברעיונות מוכנים
            </p>
          )}
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-700 transition shadow-md w-full sm:w-auto justify-center bg-party-600 hover:bg-party-700 text-white"
          >
            <Download className="w-5 h-5" /> הורדת PDF להדפסה
          </button>
        </div>
      </main>
      </>
      ) : (
        <HelpersHub />
      )}

      <ConfirmDialog
        open={resetOpen}
        title="איפוס טופס"
        message="האם לאפס את כל השדות ולהתחיל מחדש?"
        confirmLabel="כן, לאפס"
        cancelLabel="ביטול"
        onConfirm={resetForm}
        onCancel={closeReset}
      />

      <PaymentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        payhipUrl={PAYHIP_URL}
        onConfirmed={handleConfirmed}
        price={price}
        promoCode={promoCode}
        onPromoCodeChange={setPromoCode}
        purchaseOption={purchaseOption}
        onPurchaseOptionChange={setPurchaseOption}
        canGenerate={true}
      />
    </div>
  );
}
