import { jsPDF } from 'jspdf';
import { renderText, type TextStyle } from '@/utils/textImage';
import { getTheme, toPdfColors, type PdfColors } from '@/data/themes';
import type { PartyStyle } from '@/types';

export type RGB = { r: number; g: number; b: number };
export type ColorTarget = 'fill' | 'text' | 'draw';

export const ACCENT: RGB = { r: 236, g: 58, b: 126 };
export const INK: RGB = { r: 31, g: 27, b: 22 };
export const MUTED: RGB = { r: 130, g: 120, b: 110 };
export const PAPER: RGB = { r: 255, g: 253, b: 248 };
export const SOFT: RGB = { r: 253, g: 246, b: 233 };
export const BORDER: RGB = { r: 224, g: 210, b: 180 };
export const WHITE: RGB = { r: 255, g: 255, b: 255 };
export const EMERALD: RGB = { r: 16, g: 122, b: 87 };

export const MARGIN = 54;
export const FOOTER_RESERVE = 96;
export const SECTION_GAP = 30;

export interface Box {
  x: number;
  y: number;
  w: number;
  h?: number;
}

export interface PdfLook {
  colors: PdfColors;
  stars: boolean;
  photo: string | null;
}

export function lookFor(style: PartyStyle): PdfLook {
  const palette = getTheme(style.theme);
  return { colors: toPdfColors(palette.colors), stars: palette.stars, photo: style.photoDataUrl };
}

export function paint(doc: jsPDF, target: ColorTarget, c: RGB) {
  if (target === 'fill') doc.setFillColor(c.r, c.g, c.b);
  else if (target === 'text') doc.setTextColor(c.r, c.g, c.b);
  else doc.setDrawColor(c.r, c.g, c.b);
}

function drawSparkle(doc: jsPDF, cx: number, cy: number, r: number, color: RGB) {
  const k = r * 0.28;
  const points: [number, number][] = [
    [0, -r],
    [k, -k],
    [r, 0],
    [k, k],
    [0, r],
    [-k, k],
    [-r, 0],
    [-k, -k],
  ];
  const deltas = points.slice(1).map((p, i) => [p[0] - points[i][0], p[1] - points[i][1]]);
  paint(doc, 'fill', color);
  doc.lines(deltas, cx + points[0][0], cy + points[0][1], [1, 1], 'F', true);
}

function drawStars(doc: jsPDF, color: RGB) {
  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();
  const spots: [number, number, number][] = [
    [0.1, 0.09, 9],
    [0.9, 0.16, 7],
    [0.07, 0.55, 6],
    [0.93, 0.62, 8],
    [0.12, 0.93, 7],
    [0.88, 0.9, 10],
  ];
  for (const [fx, fy, r] of spots) {
    drawSparkle(doc, fx * width, fy * height, r, color);
  }
}

export function paintPage(doc: jsPDF, paper: RGB = PAPER, bar: RGB = ACCENT, star?: RGB) {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  paint(doc, 'fill', paper);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');
  paint(doc, 'fill', bar);
  doc.rect(0, 0, pageWidth, 10, 'F');
  if (star) drawStars(doc, star);
}

export function paintLookPage(doc: jsPDF, look: PdfLook) {
  paintPage(doc, look.colors.paper, look.colors.bar, look.stars ? look.colors.star : undefined);
}

export function drawAvatar(doc: jsPDF, dataUrl: string, cx: number, cy: number, diameter: number, ring: RGB) {
  doc.addImage(dataUrl, 'PNG', cx - diameter / 2, cy - diameter / 2, diameter, diameter);
  paint(doc, 'draw', ring);
  doc.setLineWidth(2);
  doc.circle(cx, cy, diameter / 2, 'S');
}

export function textStyle(
  fontSize: number,
  weight: number,
  color: RGB,
  align: TextStyle['align'] = 'center',
  lineHeight = Math.round(fontSize * 1.3),
): TextStyle {
  return {
    fontSize,
    weight,
    color: `rgb(${color.r}, ${color.g}, ${color.b})`,
    align,
    dir: 'rtl',
    lineHeight,
  };
}

export async function placeText(doc: jsPDF, text: string, style: TextStyle, box: Box): Promise<number> {
  const img = await renderText(text, box.w, style);
  const y = box.h === undefined ? box.y : box.y + (box.h - img.height) / 2;
  doc.addImage(img.dataUrl, 'PNG', box.x, y, img.width, img.height);
  return y + img.height;
}

export function newDoc(): jsPDF {
  return new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'a4' });
}

export function contentWidth(doc: jsPDF): number {
  return doc.internal.pageSize.getWidth() - MARGIN * 2;
}

export function sanitizeFileName(name: string, fallback: string): string {
  return name.trim().replace(/[\\/:*?"<>|]+/g, ' ') || fallback;
}

export async function drawSheetTitle(doc: jsPDF, title: string, subtitle: string): Promise<number> {
  const cw = contentWidth(doc);
  const y = await placeText(doc, title, textStyle(28, 900, INK, 'center', 36), {
    x: MARGIN,
    y: MARGIN + 10,
    w: cw,
  });
  const subtitleBottom = await placeText(doc, subtitle, textStyle(12, 700, ACCENT, 'center', 16), {
    x: MARGIN,
    y: y + 8,
    w: cw,
  });
  return subtitleBottom + SECTION_GAP;
}

const AVATAR_SIZE_HEADER = 72;

export async function drawGameHeader(
  doc: jsPDF,
  options: { look: PdfLook; title: string; name: string; subtitle: string },
): Promise<number> {
  const { look, title, name, subtitle } = options;
  const { colors } = look;
  const cw = contentWidth(doc);
  let top = MARGIN + 10;

  if (look.photo) {
    const cx = doc.internal.pageSize.getWidth() / 2;
    drawAvatar(doc, look.photo, cx, top + AVATAR_SIZE_HEADER / 2, AVATAR_SIZE_HEADER, colors.accent);
    top += AVATAR_SIZE_HEADER + 14;
  }

  let y = await placeText(doc, title, textStyle(30, 900, colors.ink, 'center', 36), {
    x: MARGIN,
    y: top,
    w: cw,
  });
  if (name.trim()) {
    y = await placeText(doc, `חוגגים את ${name.trim()}`, textStyle(13, 500, colors.muted, 'center', 18), {
      x: MARGIN,
      y: y + 6,
      w: cw,
    });
  }
  y = await placeText(doc, subtitle, textStyle(12, 700, colors.accent, 'center', 16), {
    x: MARGIN,
    y: y + 8,
    w: cw,
  });
  return y + SECTION_GAP;
}
