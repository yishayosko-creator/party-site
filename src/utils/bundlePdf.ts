import type { BingoConfig, MostLikelyConfig, PartyStyle, TriviaConfig } from '@/types';
import { drawBingoSheets } from '@/utils/pdf';
import { drawTriviaSheets } from '@/utils/triviaPdf';
import { drawMostLikelySheet } from '@/utils/mostLikelyPdf';
import { newDoc, sanitizeFileName } from '@/utils/pdfHelpers';

export async function generateBundlePdf(
  bingo: BingoConfig,
  pool: string[],
  trivia: TriviaConfig,
  mostLikely: MostLikelyConfig,
  style: PartyStyle,
): Promise<void> {
  const doc = newDoc();
  await drawBingoSheets(doc, bingo, pool, style);
  doc.addPage();
  await drawTriviaSheets(doc, trivia, style);
  doc.addPage();
  await drawMostLikelySheet(doc, mostLikely, style);
  const fileName = sanitizeFileName(bingo.title, 'חבילת המסיבה');
  doc.save(`${fileName} - חבילת המסיבה המלאה.pdf`);
}
