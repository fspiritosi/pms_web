import { config, collection, fields } from '@keystatic/core';

// ⚠️ COMPLETAR: usuario/organización y nombre del repositorio en GitHub donde
// vive este proyecto. El cliente edita, y Keystatic guarda los cambios ahí.
const GITHUB_REPO = {
  owner: 'TU-USUARIO-O-ORG',
  name: 'pms-web',
} as const;

// Campos comunes de una noticia (se reutilizan en ES e IN).
const blogSchema = {
  title: fields.slug({
    name: { label: 'Título', validation: { isRequired: true } },
    slug: {
      label: 'Identificador en la URL',
      description: 'Se genera a partir del título. Usá minúsculas y guiones.',
    },
  }),
  pubDate: fields.date({
    label: 'Fecha de publicación',
    validation: { isRequired: true },
  }),
  description: fields.text({
    label: 'Resumen',
    description: 'Una o dos líneas. Aparece en la tarjeta y en buscadores.',
    multiline: true,
    validation: { isRequired: true },
  }),
  tags: fields.array(fields.text({ label: 'Etiqueta' }), {
    label: 'Etiquetas',
    itemLabel: (props) => props.value,
  }),
  draft: fields.checkbox({
    label: 'Borrador (no se publica)',
    defaultValue: false,
  }),
  content: fields.markdoc({ label: 'Contenido' }),
};

function blogCollection(lang: 'es' | 'en', label: string) {
  return collection({
    label,
    path: `src/content/blog/${lang}/*`,
    slugField: 'title',
    format: { contentField: 'content' },
    entryLayout: 'content',
    schema: blogSchema,
  });
}

// Campos de una solución/sistema.
const solucionSchema = {
  title: fields.slug({
    name: { label: 'Nombre', validation: { isRequired: true } },
    slug: {
      label: 'Identificador en la URL',
      description: 'Se genera a partir del nombre. Usá minúsculas y guiones.',
    },
  }),
  order: fields.integer({ label: 'Orden', defaultValue: 0 }),
  tagline: fields.text({ label: 'Bajada corta', validation: { isRequired: true } }),
  summary: fields.text({
    label: 'Resumen',
    multiline: true,
    validation: { isRequired: true },
  }),
  available: fields.checkbox({ label: 'Disponible', defaultValue: true }),
  features: fields.array(
    fields.object({
      title: fields.text({ label: 'Título' }),
      description: fields.text({ label: 'Descripción', multiline: true }),
    }),
    { label: 'Características', itemLabel: (props) => props.fields.title.value }
  ),
  content: fields.markdoc({ label: 'Contenido' }),
};

function solucionCollection(lang: 'es' | 'en', label: string) {
  return collection({
    label,
    path: `src/content/soluciones/${lang}/*`,
    slugField: 'title',
    format: { contentField: 'content' },
    entryLayout: 'content',
    schema: solucionSchema,
  });
}

export default config({
  storage: {
    kind: 'github',
    repo: GITHUB_REPO,
  },
  ui: {
    brand: { name: 'PMS · Contenido' },
    navigation: {
      Noticias: ['blogEs', 'blogEn'],
      Soluciones: ['solucionesEs', 'solucionesEn'],
    },
  },
  collections: {
    blogEs: blogCollection('es', 'Noticias (Español)'),
    blogEn: blogCollection('en', 'Noticias (Inglés)'),
    solucionesEs: solucionCollection('es', 'Soluciones (Español)'),
    solucionesEn: solucionCollection('en', 'Soluciones (Inglés)'),
  },
});
