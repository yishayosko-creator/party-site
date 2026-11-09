export interface TextStyle {
  fontSize: number;
  weight: number;
  color: string;
  align: 'left' | 'center' | 'right';
  dir: 'rtl' | 'ltr';
  lineHeight: number;
}

export interface RenderedText {
  dataUrl: string;
  width: number;
  height: number;
}

const RENDER_SCALE = 3;
const FONT_FAMILY = 'Heebo, Arial, sans-serif';

function wrapLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const lines: string[] = [];
  for (const paragraph of text.split('\n')) {
    let line = '';
    for (const word of paragraph.split(' ')) {
      const candidate = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(candidate).width > maxWidth) {
        lines.push(line);
        line = word;
      } else {
        line = candidate;
      }
    }
    lines.push(line);
  }
  return lines;
}

// Text is drawn by the browser (with proper Hebrew shaping and bidi ordering) and embedded as an image,
// because the PDF library's built-in fonts cannot display Hebrew.
export async function renderText(text: string, maxWidth: number, style: TextStyle): Promise<RenderedText> {
  const font = `${style.weight} ${style.fontSize * RENDER_SCALE}px ${FONT_FAMILY}`;
  await document.fonts.load(font, text);

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not available');

  ctx.font = font;
  const maxPx = maxWidth * RENDER_SCALE;
  const lines = wrapLines(ctx, text, maxPx);
  const linePx = style.lineHeight * RENDER_SCALE;

  canvas.width = Math.ceil(maxPx);
  canvas.height = Math.ceil(lines.length * linePx);

  ctx.font = font;
  ctx.direction = style.dir;
  ctx.textAlign = style.align;
  ctx.textBaseline = 'middle';
  ctx.fillStyle = style.color;
  const x = style.align === 'left' ? 0 : style.align === 'right' ? canvas.width : canvas.width / 2;
  lines.forEach((line, i) => ctx.fillText(line, x, i * linePx + linePx / 2));

  return {
    dataUrl: canvas.toDataURL('image/png'),
    width: maxWidth,
    height: lines.length * style.lineHeight,
  };
}
