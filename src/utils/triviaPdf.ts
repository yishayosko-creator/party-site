import type { jsPDF } from 'jspdf';
import type { PartyStyle, TriviaConfig, TriviaQuestion } from '@/types';
import { TRIVIA_PRESETS } from '@/data/triviaPresets';
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

function titleFor(config: TriviaConfig): string {
  return config.title.trim() || 'חידון טריוויה אישי';
}

function withFallbacks(config: TriviaConfig): TriviaQuestion[] {
  const userQuestions = config.questions.filter((q) => q.question.trim());
  if (userQuestions.length >= 5) return userQuestions;
  const used = new Set(userQuestions.map((q) => q.question.trim()));
  const fillers = TRIVIA_PRESETS.filter((p) => !used.has(p.question.trim())).slice(
    0,
    TRIVIA_PRESETS.length - userQuestions.length,
  );
  return [...userQuestions, ...fillers].slice(0, 15);
}

function drawHeader(doc: jsPDF, config: TriviaConfig, look: PdfLook, subtitle: string): Promise<number> {
  return drawGameHeader(doc, { look, title: titleFor(config), name: config.name, subtitle });
}

async function drawAnswerForm(doc: jsPDF, config: TriviaConfig, questions: TriviaQuestion[], look: PdfLook) {
  const { colors } = look;
  const cw = contentWidth(doc);
  const pageHeight = doc.internal.pageSize.getHeight();
  paintLookPage(doc, look);
  let y = await drawHeader(doc, config, look, 'טופס תשובות לאורחים');

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    if (y > pageHeight - 100) {
      doc.addPage();
      paintLookPage(doc, look);
      y = MARGIN + 10;
    }
    await placeText(doc, `${i + 1}. ${q.question}`, textStyle(12, 700, colors.ink, 'right', 16), {
      x: MARGIN,
      y,
      w: cw - 20,
    });
    y += 22;

    paint(doc, 'draw', colors.border);
    doc.setLineWidth(1);
    doc.roundedRect(MARGIN, y, cw, 28, 6, 6);
    y += 36;
  }
}

async function drawAnswerKey(doc: jsPDF, config: TriviaConfig, questions: TriviaQuestion[], look: PdfLook) {
  const { colors } = look;
  const cw = contentWidth(doc);
  const pageHeight = doc.internal.pageSize.getHeight();
  doc.addPage();
  paintLookPage(doc, look);
  let y = await drawHeader(doc, config, look, 'מפתח תשובות למנחה');

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    if (y > pageHeight - 80) {
      doc.addPage();
      paintLookPage(doc, look);
      y = MARGIN + 10;
    }

    paint(doc, 'fill', colors.cell);
    paint(doc, 'draw', colors.border);
    doc.setLineWidth(0.5);
    doc.roundedRect(MARGIN, y, cw, 44, 8, 8, 'FD');

    await placeText(doc, `${i + 1}. ${q.question}`, textStyle(11, 700, colors.ink, 'right', 14), {
      x: MARGIN + 8,
      y: y + 4,
      w: cw - 16,
    });
    const answerText = q.answer.trim() || '(לא הוזן תשובה)';
    await placeText(doc, `תשובה: ${answerText}`, textStyle(10, 700, colors.accent, 'right', 14), {
      x: MARGIN + 8,
      y: y + 22,
      w: cw - 16,
    });
    y += 50;
  }
}

export async function drawTriviaSheets(doc: jsPDF, config: TriviaConfig, style: PartyStyle): Promise<void> {
  const look = lookFor(style);
  const questions = withFallbacks(config);
  await drawAnswerForm(doc, config, questions, look);
  await drawAnswerKey(doc, config, questions, look);
}

export async function generateTriviaPdf(config: TriviaConfig, style: PartyStyle): Promise<void> {
  const doc = newDoc();
  await drawTriviaSheets(doc, config, style);
  const fileName = sanitizeFileName(config.title, 'חידון טריוויה');
  doc.save(`${fileName} - חידון טריוויה.pdf`);
}
