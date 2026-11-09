import { useEffect, useState } from 'react';

function readStored<T extends object>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed: unknown = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return fallback;
    return { ...fallback, ...parsed };
  } catch {
    return fallback;
  }
}

export function usePersistentState<T extends object>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => readStored(key, fallback));
  const [saveFailed, setSaveFailed] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      setSaveFailed(false);
    } catch {
      setSaveFailed(true);
    }
  }, [key, value]);

  return [value, setValue, saveFailed] as const;
}
