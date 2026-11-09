import type { TimelineRow } from '@/types';
import {
  ACCENT,
  INK,
  BORDER,
  MARGIN,
  paint,
  paintPage,
  textStyle,
  placeText,
  newDoc,
  contentWidth,
  drawSheetTitle,
  sanitizeFileName,
} from '@/utils/pdfHelpers';

const TIME_ROW_HEIGHT = 34;
const TIME_COLUMN_WIDTH = 80;
const CHECK_ROW_HEIGHT = 28;
const CHECKBOX_SIZE = 16;

interface ChecklistEntry {
  label: string;
  checked: boolean;
}

export async function generateTimelinePdf(
  eventTitle: string,
  rows: TimelineRow[],
  checklist: ChecklistEntry[],
): Promise<void> {
  const doc = newDoc();
  const cw = contentWidth(doc);
  const bottom = doc.internal.pageSize.getHeight() - MARGIN;
  const name = eventTitle.trim() || "יום הולדת שמח";

  const startPage = (): number => {
    paintPage(doc);
    return MARGIN + 10;
  };
  const ensureSpace = (y: number, needed: number): number => {
    if (y + needed <= bottom) return y;
    doc.addPage();
    return startPage();
  };
  const heading = async (text: string, y: number): Promise<number> => {
    const bottomY = await placeText(doc, text, textStyle(16, 900, INK, 'right', 22), {
      x: MARGIN,
      y,
      w: cw,
    });
    return bottomY + 10;
  };

  let y = startPage();
  y = await drawSheetTitle(doc, "לוח זמנים וצ'ק-ליסט", name);
  y = await heading('לוח זמנים', y);

  for (const row of rows) {
    y = ensureSpace(y, TIME_ROW_HEIGHT);
    await placeText(doc, row.time || '--:--', textStyle(13, 900, ACCENT, 'left', 16), {
      x: MARGIN,
      y,
      w: TIME_COLUMN_WIDTH,
      h: TIME_ROW_HEIGHT,
    });
    await placeText(doc, row.activity || 'פעילות', textStyle(13, 600, INK, 'right', 16), {
      x: MARGIN + TIME_COLUMN_WIDTH + 12,
      y,
      w: cw - TIME_COLUMN_WIDTH - 12,
      h: TIME_ROW_HEIGHT,
    });
    paint(doc, 'draw', BORDER);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, y + TIME_ROW_HEIGHT, MARGIN + cw, y + TIME_ROW_HEIGHT);
    y += TIME_ROW_HEIGHT;
  }

  y += 28;
  y = ensureSpace(y, 40);
  y = await heading("צ'ק-ליסט ציוד", y);

  for (const item of checklist) {
    y = ensureSpace(y, CHECK_ROW_HEIGHT + 16);
    const labelBottom = await placeText(doc, item.label, textStyle(12, 600, INK, 'right', 16), {
      x: MARGIN,
      y: y + (CHECK_ROW_HEIGHT - 16) / 2,
      w: cw - CHECKBOX_SIZE - 12,
    });
    const boxY = y + (CHECK_ROW_HEIGHT - 16) / 2;
    const boxX = MARGIN + cw - CHECKBOX_SIZE;
    paint(doc, 'draw', INK);
    doc.setLineWidth(1);
    if (item.checked) {
      paint(doc, 'fill', ACCENT);
      doc.rect(boxX, boxY, CHECKBOX_SIZE, CHECKBOX_SIZE, 'FD');
    } else {
      doc.rect(boxX, boxY, CHECKBOX_SIZE, CHECKBOX_SIZE);
    }
    y += Math.max(CHECK_ROW_HEIGHT, labelBottom - y + 8);
  }

  doc.save(`${sanitizeFileName(eventTitle, "יום הולדת")} - לוח זמנים וצ'ק-ליסט.pdf`);
}
