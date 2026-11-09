import type { InviteDetails } from '@/types';
import {
  ACCENT,
  INK,
  MUTED,
  SOFT,
  BORDER,
  MARGIN,
  WHITE,
  paint,
  paintPage,
  textStyle,
  placeText,
  newDoc,
  contentWidth,
  sanitizeFileName,
} from '@/utils/pdfHelpers';
import { DEFAULT_HONOREE, formatHebrewDate } from '@/utils/inviteText';

const BANNER_HEIGHT = 170;
const DETAIL_ROW_HEIGHT = 56;

export async function generateInvitePdf(details: InviteDetails): Promise<void> {
  const doc = newDoc();
  const cw = contentWidth(doc);
  const pageHeight = doc.internal.pageSize.getHeight();
  const honoree = details.honoree.trim() || DEFAULT_HONOREE;

  paintPage(doc);

  paint(doc, 'fill', ACCENT);
  doc.roundedRect(MARGIN, MARGIN, cw, BANNER_HEIGHT, 18, 18, 'F');
  await placeText(doc, 'הזמנה ליום הולדת', textStyle(36, 900, WHITE, 'center', 44), {
    x: MARGIN,
    y: MARGIN,
    w: cw,
    h: BANNER_HEIGHT,
  });

  let y = MARGIN + BANNER_HEIGHT + 36;
  y = await placeText(doc, honoree, textStyle(40, 900, INK, 'center', 48), { x: MARGIN, y, w: cw });
  const age = details.age.trim();
  if (age) {
    y = await placeText(doc, `בגיל ${age}`, textStyle(20, 700, ACCENT, 'center', 26), {
      x: MARGIN,
      y: y + 6,
      w: cw,
    });
  }

  const detailRows: { label: string; value: string }[] = [
    { label: 'תאריך', value: formatHebrewDate(details.date) },
    { label: 'שעה', value: details.time.trim() },
    { label: 'מיקום', value: details.location.trim() },
  ].filter((row) => row.value !== '');

  const cardTop = y + 36;
  const cardHeight = detailRows.length * DETAIL_ROW_HEIGHT + 24;
  paint(doc, 'fill', SOFT);
  paint(doc, 'draw', BORDER);
  doc.setLineWidth(1);
  doc.roundedRect(MARGIN, cardTop, cw, cardHeight, 16, 16, 'FD');

  for (let i = 0; i < detailRows.length; i++) {
    const row = detailRows[i];
    await placeText(doc, row.label, textStyle(11, 700, MUTED, 'center', 14), {
      x: MARGIN,
      y: cardTop + 12 + i * DETAIL_ROW_HEIGHT,
      w: cw,
    });
    await placeText(doc, row.value, textStyle(18, 800, INK, 'center', 24), {
      x: MARGIN,
      y: cardTop + 28 + i * DETAIL_ROW_HEIGHT,
      w: cw,
    });
  }

  const rsvp = details.rsvpPhone.trim();
  await placeText(
    doc,
    rsvp ? `נשמח לאישור הגעה בטלפון ${rsvp}` : 'נשמח לראותכם!',
    textStyle(16, 800, ACCENT, 'center', 22),
    { x: MARGIN, y: pageHeight - 160, w: cw },
  );

  doc.save(`${sanitizeFileName(honoree, 'הזמנה')} - הזמנה ליום הולדת.pdf`);
}
