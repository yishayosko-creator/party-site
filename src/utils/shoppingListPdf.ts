import type { FoodEstimate } from '@/types';
import {
  ACCENT,
  INK,
  MUTED,
  SOFT,
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

const ROW_HEIGHT = 48;
const ROW_GAP = 8;
const CHECKBOX_SIZE = 16;
const QUANTITY_WIDTH = 170;
const LABEL_OFFSET = 190;

interface GuestCounts {
  kids: number;
  adults: number;
}

export async function generateShoppingListPdf(
  estimates: FoodEstimate[],
  guests: GuestCounts,
  eventTitle: string,
): Promise<void> {
  const doc = newDoc();
  const cw = contentWidth(doc);
  const pageHeight = doc.internal.pageSize.getHeight();
  const name = eventTitle.trim() || 'יום הולדת שמח';

  paintPage(doc);
  let y = await drawSheetTitle(
    doc,
    'רשימת קניות למסיבה',
    `${name} | ${guests.kids} ילדים · ${guests.adults} מבוגרים`,
  );

  const labelWidth = cw - LABEL_OFFSET - CHECKBOX_SIZE - 28;
  for (const item of estimates) {
    paint(doc, 'fill', SOFT);
    paint(doc, 'draw', BORDER);
    doc.setLineWidth(0.5);
    doc.roundedRect(MARGIN, y, cw, ROW_HEIGHT, 8, 8, 'FD');

    paint(doc, 'draw', INK);
    doc.setLineWidth(1);
    doc.rect(MARGIN + cw - CHECKBOX_SIZE - 14, y + (ROW_HEIGHT - CHECKBOX_SIZE) / 2, CHECKBOX_SIZE, CHECKBOX_SIZE);

    await placeText(doc, item.label, textStyle(12, 900, INK, 'right', 16), {
      x: MARGIN + LABEL_OFFSET,
      y: y + 8,
      w: labelWidth,
    });
    await placeText(doc, item.detail, textStyle(9, 500, MUTED, 'right', 12), {
      x: MARGIN + LABEL_OFFSET,
      y: y + 27,
      w: labelWidth,
    });
    await placeText(doc, `${item.quantity} ${item.unit}`, textStyle(13, 900, ACCENT, 'left', 16), {
      x: MARGIN + 12,
      y,
      w: QUANTITY_WIDTH,
      h: ROW_HEIGHT,
    });

    y += ROW_HEIGHT + ROW_GAP;
  }

  await placeText(doc, 'הכמויות הן הערכה בלבד. מומלץ להתאים לפי הצרכים בפועל.', textStyle(9, 400, MUTED), {
    x: MARGIN,
    y: pageHeight - 60,
    w: cw,
  });

  const fileName = sanitizeFileName(eventTitle, 'יום הולדת');
  doc.save(`${fileName} - רשימת קניות.pdf`);
}
