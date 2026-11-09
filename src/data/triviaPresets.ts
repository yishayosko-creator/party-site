import type { TriviaQuestion } from '@/types';

let idCounter = 0;
function qid(): string {
  idCounter += 1;
  return `preset-trivia-${idCounter}`;
}

export const TRIVIA_PRESETS: TriviaQuestion[] = [
  { id: qid(), question: 'מה המאכל האהוב עליו/ה?', answer: '', distractors: [] },
  { id: qid(), question: 'מה החלום הכי מוזר שלו/ה?', answer: '', distractors: [] },
  { id: qid(), question: 'מה הסרט האהוב עליו/ה?', answer: '', distractors: [] },
  { id: qid(), question: 'מה הצבע האהוב עליו/ה?', answer: '', distractors: [] },
  { id: qid(), question: 'מה התחביב הסודי שלו/ה?', answer: '', distractors: [] },
  { id: qid(), question: 'מה היה הכלב/חתול הראשון שלו/ה?', answer: '', distractors: [] },
  { id: qid(), question: 'מה המקום שבו הכי אהב/ה לטייל?', answer: '', distractors: [] },
  { id: qid(), question: 'מה השיר שמעורר אצלו/ה נוסטלגיה?', answer: '', distractors: [] },
  { id: qid(), question: 'מה הפחד הכי גדול שלו/ה?', answer: '', distractors: [] },
  { id: qid(), question: 'מה הילדות הכי מצחיקה שלו/ה?', answer: '', distractors: [] },
];

export function createEmptyTriviaQuestion(): TriviaQuestion {
  idCounter += 1;
  return { id: qid(), question: '', answer: '', distractors: [] };
}

export const MAX_TRIVIA_QUESTIONS = 15;
