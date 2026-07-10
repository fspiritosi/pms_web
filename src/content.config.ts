import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// El idioma se deriva de la carpeta (es/ o en/), no de un campo editable.
// Así Keystatic solo gestiona el contenido y no puede romper el idioma.

// Blog de noticias. Cada nota es un .mdoc en src/content/blog/{es,en}/...
const blog = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    description: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

// Soluciones (sistemas). Cada producto es un .mdoc — sumar uno nuevo lo publica.
const soluciones = defineCollection({
  loader: glob({ pattern: '**/*.mdoc', base: './src/content/soluciones' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
    tagline: z.string(),
    summary: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    features: z
      .array(
        z.object({
          title: z.string(),
          description: z.string(),
        })
      )
      .default([]),
    ctaLabel: z.string().optional(),
    ctaHref: z.string().optional(),
    available: z.boolean().default(true),
  }),
});

export const collections = { blog, soluciones };
