import type { jsPDF } from 'jspdf';
import type { MostLikelyConfig, PartyStyle } from '@/types';
import { MOST_LIKELY_PRESETS, MIN_MOST_LIKELY } from '@/data/mostLikelyPresets';
import {
  MARGIN,
  paint,
  paintLookPage,
  textStyle,
  placeText,
  newDoc,
  contentWidth,
  sanitizeFileName,
  drawGameHeader,
  lookFor,
  type PdfLook,
} from '@/utils/pdfHelpers';

function titleFor(config: MostLikelyConfig): string {
  return config.title.trim() || 'מי הכי סביר ש...';
}

function statementsWithFallbacks(config: MostLikelyConfig): string[] {
  const userStatements = config.statements.filter((s) => s.trim());
  if (userStatements.length >= MIN_MOST_LIKELY) return userStatements;
  const used = new Set(userStatements.map((s) => s.trim()));
  const fillers = MOST_LIKELY_PRESETS.filter((s) => !used.has(s.trim())).slice(
    0,
    MIN_MOST_LIKELY - userStatements.length,
  );
  return [...userStatements, ...fillers];
}

const BOX_HEIGHT = 56;
const CIRCLE_RADIUS = 6;
const CIRCLE_INSET = 14;
const CIRCLE_TEXT_GAP = 12;

export async function drawMostLikelySheet(doc: jsPDF, config: MostLikelyConfig, style: PartyStyle): Promise<void> {
  const look: PdfLook = lookFor(style);
  const { colors } = look;
  const cw = contentWidth(doc);
  const pageHeight = doc.internal.pageSize.getHeight();
  const statements = statementsWithFallbacks(config);

  paintLookPage(doc, look);
  let y = await drawGameHeader(doc, {
    look,
    title: titleFor(config),
    name: config.name,
    subtitle: 'סמנו/הקיפו את האדם שהכי סביר ש...',
  });

  const colGap = 28;
  const colWidth = (cw - colGap) / 2;
  const bottom = pageHeight - MARGIN;
  const columnX = (column: number) => (column === 0 ? MARGIN + cw - colWidth : MARGIN);
  const textWidth = colWidth - CIRCLE_INSET - CIRCLE_RADIUS * 2 - CIRCLE_TEXT_GAP - 8;
  let column = 0;

  for (let i = 0; i < statements.length; i++) {
    if (y + BOX_HEIGHT > bottom) {
      if (column === 0) {
        column = 1;
      } else {
        doc.addPage();
        paintLookPage(doc, look);
        column = 0;
      }
      y = MARGIN + 10;
    }

    const x = columnX(column);
    paint(doc, 'fill', colors.cell);
    paint(doc, 'draw', colors.border);
    doc.setLineWidth(0.5);
    doc.roundedRect(x, y, colWidth, BOX_HEIGHT, 8, 8, 'FD');

    paint(doc, 'draw', colors.ink);
    doc.setLineWidth(1);
    doc.circle(x + colWidth - CIRCLE_INSET - CIRCLE_RADIUS, y + BOX_HEIGHT / 2, CIRCLE_RADIUS);

    await placeText(doc, `${i + 1}. ${statements[i]}`, textStyle(10, 600, colors.ink, 'right', 14), {
      x: x + 8,
      y: y + 6,
      w: textWidth,
      h: BOX_HEIGHT - 12,
    });
    y += BOX_HEIGHT + 8;
  }
}

export async function generateMostLikelyPdf(config: MostLikelyConfig, style: PartyStyle): Promise<void> {
  const doc = newDoc();
  await drawMostLikelySheet(doc, config, style);
  const fileName = sanitizeFileName(config.title, 'מי הכי סביר');
  doc.save(`${fileName} - מי הכי סביר.pdf`);
}
