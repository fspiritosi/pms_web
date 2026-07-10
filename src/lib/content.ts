import { getCollection, type CollectionEntry } from 'astro:content';
import type { Locale } from '@/lib/site';

/** El idioma de una entrada se deriva de su carpeta ("es/..." o "en/..."). */
function langOf(id: string): Locale {
  return id.startsWith('en/') ? 'en' : 'es';
}

/** Quita el prefijo de idioma del id ("es/mi-post" -> "mi-post"). */
export function stripLangPrefix(id: string): string {
  return id.replace(/^(es|en)\//, '');
}

/** Noticias publicadas de un idioma, ordenadas de más nueva a más vieja. */
export async function getBlogPosts(locale: Locale) {
  const posts = await getCollection(
    'blog',
    (e: CollectionEntry<'blog'>) => langOf(e.id) === locale && !e.data.draft
  );
  return posts
    .map((entry) => ({ entry, slug: stripLangPrefix(entry.id) }))
    .sort((a, b) => b.entry.data.pubDate.getTime() - a.entry.data.pubDate.getTime());
}

/** Soluciones de un idioma, ordenadas por `order`. */
export async function getSolutions(locale: Locale) {
  const items = await getCollection(
    'soluciones',
    (e: CollectionEntry<'soluciones'>) => langOf(e.id) === locale
  );
  return items
    .map((entry) => ({ entry, slug: stripLangPrefix(entry.id) }))
    .sort((a, b) => a.entry.data.order - b.entry.data.order);
}
