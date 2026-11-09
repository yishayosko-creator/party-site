import type { BoardCell } from '@/types';
import { DEFAULT_PHRASES } from '@/data/defaultPhrases';
import type { GridRule } from '@/utils/gameRules';

const NAME_PLACEHOLDER = '[שם]';

export function personalizePhrases(pool: string[], name: string): string[] {
  const trimmed = name.trim();
  if (!trimmed) return pool;
  return pool.map((phrase) => phrase.split(NAME_PLACEHOLDER).join(trimmed));
}

export function parsePhrases(text: string): string[] {
  const seen = new Set<string>();
  const phrases: string[] = [];
  for (const line of text.split('\n')) {
    const phrase = line.trim();
    const key = phrase.toLowerCase();
    if (!phrase || seen.has(key)) continue;
    seen.add(key);
    phrases.push(phrase);
  }
  return phrases;
}

export function buildPhrasePool(text: string, poolSize: number): string[] {
  const entered = parsePhrases(text).slice(0, poolSize);
  if (entered.length >= poolSize) return entered;

  const taken = new Set(entered.map((p) => p.toLowerCase()));
  const fillers = DEFAULT_PHRASES.filter((p) => !taken.has(p.toLowerCase()));
  return [...entered, ...fillers.slice(0, poolSize - entered.length)];
}

export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function buildCard(pool: string[], rule: GridRule, random: () => number): BoardCell[] {
  const items = [...pool];
  for (let i = 0; i < rule.phraseCount; i++) {
    const j = i + Math.floor(random() * (items.length - i));
    [items[i], items[j]] = [items[j], items[i]];
  }
  const phrases = items.slice(0, rule.phraseCount);

  const cells: BoardCell[] = [];
  let next = 0;
  for (let i = 0; i < rule.cellCount; i++) {
    cells.push(i === rule.freeIndex ? null : phrases[next++]);
  }
  return cells;
}

export function generateCardPack(
  pool: string[],
  rule: GridRule,
  count: number,
  random: () => number = Math.random,
): BoardCell[][] {
  const cards: BoardCell[][] = [];
  const seen = new Set<string>();
  while (cards.length < count) {
    const card = buildCard(pool, rule, random);
    const key = card.map((cell) => cell ?? '').join('\u0000');
    if (seen.has(key)) continue;
    seen.add(key);
    cards.push(card);
  }
  return cards;
}
