import { useEffect, useState, useCallback } from 'react';

export interface Route {
  path: string;
  segments: string[];
  query: URLSearchParams;
}

function parseHash(): Route {
  const raw = window.location.hash.replace(/^#/, '') || '/';
  const [path, queryString] = raw.split('?');
  return {
    path: path || '/',
    segments: path.split('/').filter(Boolean),
    query: new URLSearchParams(queryString || ''),
  };
}

export function useRouter() {
  const [route, setRoute] = useState<Route>(parseHash);

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash());
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const navigate = useCallback((to: string) => {
    if (to.startsWith('#')) to = to.slice(1);
    if (to === window.location.hash.replace(/^#/, '')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.location.hash = to;
  }, []);

  return { route, navigate };
}

export function buildPath(...segments: (string | number)[]): string {
  return '/' + segments.map((s) => String(s)).join('/');
}
