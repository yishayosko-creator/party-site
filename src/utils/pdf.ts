import type { jsPDF } from 'jspdf';
import type { BingoConfig, BoardCell, PartyStyle } from '@/types';
import { FREE_SPACE_TEXT } from '@/types';
import { generateCardPack } from '@/utils/bingo';
import { MODE_OPTIONS, getGridRule, getHeaderLetters, type GridRule } from '@/utils/gameRules';
import { normalizeQuantity } from '@/utils/pricing';
import { renderText } from '@/utils/textImage';
import {
  MARGIN,
  FOOTER_RESERVE,
  SECTION_GAP,
  paint,
  paintLookPage,
  textStyle,
  placeText,
  newDoc,
  contentWidth,
  sanitizeFileName,
  drawAvatar,
  lookFor,
  type Box,
  type PdfLook,
} from '@/utils/pdfHelpers';

function fontScaleFor(size: number): number {
  if (size === 3) return 1.45;
  if (size === 4) return 1.2;
  return 1;
}

async function drawCardPage(
  doc: jsPDF,
  config: BingoConfig,
  cells: BoardCell[],
  rule: GridRule,
  cardNumber: number,
  totalCards: number,
  look: PdfLook,
) {
  const { colors } = look;
  const pageHeight = doc.internal.pageSize.getHeight();
  const cw = contentWidth(doc);
  const scale = fontScaleFor(rule.size);
  paintLookPage(doc, look);

  await placeText(doc, `כרטיס ${cardNumber} מתוך ${totalCards}`, textStyle(9, 700, colors.muted, 'right'), {
    x: MARGIN,
    y: 22,
    w: cw,
  });

  let cursorY = await placeText(
    doc,
    config.title.trim() || 'יום הולדת שמח',
    textStyle(30, 900, colors.ink, 'center', 36),
    { x: MARGIN, y: MARGIN + 10, w: cw },
  );
  if (config.name.trim()) {
    cursorY = await placeText(
      doc,
      `חוגגים את ${config.name.trim()}`,
      textStyle(13, 500, colors.muted, 'center', 18),
      { x: MARGIN, y: cursorY + 6, w: cw },
    );
  }
  cursorY += SECTION_GAP;

  const colWidth = cw / rule.size;
  const columnX = (col: number) => MARGIN + cw - colWidth * (col + 1);
  const letters = getHeaderLetters(rule.size, config.headerWord).letters;
  for (let col = 0; col < letters.length; col++) {
    await placeText(doc, letters[col], textStyle(22, 900, colors.accent), {
      x: columnX(col),
      y: cursorY,
      w: colWidth,
    });
  }
  cursorY += 30;

  const gridTop = cursorY;
  const rowHeight = (pageHeight - gridTop - FOOTER_RESERVE) / rule.size;

  for (let index = 0; index < cells.length; index++) {
    const cell = cells[index];
    const row = Math.floor(index / rule.size);
    const col = index % rule.size;
    const x = columnX(col);
    const y = gridTop + rowHeight * row;

    paint(doc, 'fill', cell === null ? colors.free : colors.cell);
    paint(doc, 'draw', colors.border);
    doc.setLineWidth(1);
    doc.roundedRect(x + 4, y, colWidth - 8, rowHeight - 4, 12, 12, 'FD');

    if (cell === null) {
      if (look.photo) {
        const diameter = Math.min(colWidth - 8, rowHeight - 4) * 0.8;
        drawAvatar(doc, look.photo, x + colWidth / 2, y + (rowHeight - 4) / 2, diameter, colors.freeText);
      } else {
        const box: Box = { x: x + 12, y, w: colWidth - 24, h: rowHeight - 4 };
        await placeText(doc, FREE_SPACE_TEXT, textStyle(18 * scale, 900, colors.freeText), box);
      }
    } else {
      const box: Box = { x: x + 12, y, w: colWidth - 24, h: rowHeight - 4 };
      const baseSize = cell.length > 60 ? 9 : cell.length > 30 ? 10 : 11;
      const fontSize = baseSize * scale;
      await placeText(doc, cell, textStyle(fontSize, 500, colors.cellText, 'center', fontSize + 3), box);
    }
  }

  await placeText(doc, MODE_OPTIONS[config.mode].winText, textStyle(11, 900, colors.ink), {
    x: MARGIN,
    y: pageHeight - 66,
    w: cw,
  });
  await placeText(doc, 'סמנו משבצת כשהיא מתרחשת במסיבה.', textStyle(9, 400, colors.muted), {
    x: MARGIN,
    y: pageHeight - 46,
    w: cw,
  });
}

async function drawCallSheetHeader(doc: jsPDF, config: BingoConfig, phraseCount: number, look: PdfLook): Promise<number> {
  const { colors } = look;
  const cw = contentWidth(doc);
  let y = await placeText(doc, 'דף קריאה למנחה', textStyle(28, 900, colors.ink, 'center', 36), {
    x: MARGIN,
    y: MARGIN + 10,
    w: cw,
  });
  y = await placeText(
    doc,
    `${config.title.trim() || 'בינגו ליום הולדת'} | ${phraseCount} ביטויים | ${MODE_OPTIONS[config.mode].label}`,
    textStyle(12, 500, colors.muted, 'center', 18),
    { x: MARGIN, y: y + 4, w: cw },
  );
  y = await placeText(
    doc,
    'שלפו ביטוי באקראי, קראו אותו בקול וסמנו את התיבה כשהוא מתרחש.',
    textStyle(10, 400, colors.muted, 'center', 14),
    { x: MARGIN, y: y + 4, w: cw },
  );
  return y + 22;
}

async function drawCallSheet(doc: jsPDF, config: BingoConfig, pool: string[], look: PdfLook) {
  const { colors } = look;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const cw = contentWidth(doc);
  const colGap = 28;
  const colWidth = (cw - colGap) / 2;
  const boxSize = 10;
  const textIndent = boxSize + 12;
  const itemPad = 8;
  const bottom = pageHeight - MARGIN;
  const columnX = (column: number) => (column === 0 ? pageWidth - MARGIN - colWidth : MARGIN);
  const itemStyle = textStyle(11, 500, colors.ink, 'right', 14);

  paintLookPage(doc, look);
  let top = await drawCallSheetHeader(doc, config, pool.length, look);
  let column = 0;
  let y = top;

  for (let i = 0; i < pool.length; i++) {
    const img = await renderText(`${i + 1}. ${pool[i]}`, colWidth - textIndent, itemStyle);
    const height = img.height + itemPad;

    if (y + height > bottom) {
      if (column === 0) {
        column = 1;
      } else {
        doc.addPage();
        paintLookPage(doc, look);
        column = 0;
        top = MARGIN;
      }
      y = top;
    }

    const x = columnX(column);
    paint(doc, 'draw', colors.ink);
    doc.setLineWidth(1);
    doc.rect(x + colWidth - boxSize, y + 2, boxSize, boxSize);
    doc.addImage(img.dataUrl, 'PNG', x, y, img.width, img.height);
    y += height;
  }
}

export async function drawBingoSheets(doc: jsPDF, config: BingoConfig, pool: string[], style: PartyStyle): Promise<void> {
  const rule = getGridRule(config.gridSize);
  const cards = generateCardPack(pool, rule, normalizeQuantity(config.quantity));
  const look = lookFor(style);

  for (let i = 0; i < cards.length; i++) {
    if (i > 0) doc.addPage();
    await drawCardPage(doc, config, cards[i], rule, i + 1, cards.length, look);
  }

  doc.addPage();
  await drawCallSheet(doc, config, pool, look);
}

export async function generateBingoPdf(config: BingoConfig, pool: string[], style: PartyStyle): Promise<void> {
  const doc = newDoc();
  await drawBingoSheets(doc, config, pool, style);
  const fileName = sanitizeFileName(config.title, 'בינגו ליום הולדת');
  doc.save(`${fileName} - כרטיסי בינגו.pdf`);
}
