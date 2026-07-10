import es from './es.json';
import en from './en.json';
import { defaultLocale, type Locale } from '@/lib/site';

const dictionaries = { es, en } as const;
export type Dictionary = typeof es;

/** Devuelve el diccionario de textos de UI para un idioma. */
export function useTranslations(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/**
 * Rutas localizadas por clave. El español va en la raíz; el inglés bajo /en/
 * y con slugs traducidos. Es la única fuente de verdad para los links de nav.
 */
const routes = {
  home: { es: '/', en: '/en/' },
  solutions: { es: '/soluciones/', en: '/en/solutions/' },
  about: { es: '/empresa/', en: '/en/company/' },
  blog: { es: '/blog/', en: '/en/blog/' },
  contact: { es: '/contacto/', en: '/en/contact/' },
} as const;

export type RouteKey = keyof typeof routes;

/** Path absoluto (con base /) de una ruta conocida para un idioma. */
export function path(key: RouteKey, locale: Locale): string {
  return routes[key][locale];
}

/** Prefijo de idioma: '' para es, '/en' para en. */
export function localePrefix(locale: Locale): string {
  return locale === defaultLocale ? '' : `/${locale}`;
}

/** Detecta el idioma a partir del pathname (para el selector de idioma). */
export function getLocaleFromPath(pathname: string): Locale {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'es';
}

/** El "otro" idioma, para el toggle. */
export function otherLocale(locale: Locale): Locale {
  return locale === 'es' ? 'en' : 'es';
}
