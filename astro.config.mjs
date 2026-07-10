// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import node from '@astrojs/node';
import keystatic from '@keystatic/astro';
import tailwindcss from '@tailwindcss/vite';

// URL final del sitio (para SEO, sitemap, canonical y hreflang).
const SITE = 'https://pms.net.ar';

export default defineConfig({
  site: SITE,
  // El sitio de marketing es estático; el adapter permite que SOLO las rutas
  // de Keystatic (/keystatic y /api/keystatic) se rendericen bajo demanda.
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  integrations: [
    react(),
    markdoc(),
    keystatic(),
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es-AR',
          en: 'en-US',
        },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
