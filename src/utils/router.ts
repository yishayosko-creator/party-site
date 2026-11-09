import { useEffect, useState } from 'react';

export interface AppLocation {
  pathname: string;
  search: string;
  hash: string;
}

function readLocation(): AppLocation {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash,
  };
}

export function useAppLocation(): AppLocation {
  const [location, setLocation] = useState<AppLocation>(readLocation);

  useEffect(() => {
    const sync = () => setLocation(readLocation());
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);

  return location;
}

export function navigateTo(to: string) {
  const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
  if (to !== current) {
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
  }
  if (!new URL(to, window.location.origin).hash) {
    window.scrollTo({ top: 0 });
  }
}
