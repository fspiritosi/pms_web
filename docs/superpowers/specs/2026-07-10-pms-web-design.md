# Spec — Sitio web PMS (Perez Marzo Systems Development)

**Fecha:** 2026-07-10
**Dominio final:** pms.net.ar
**Cliente:** Perez Marzo Systems Development — empresa de licenciamiento de software (desarrollan soluciones informáticas y las licencian a sus clientes).

## Objetivo

Sitio web institucional bilingüe (ES/EN) que presente la empresa y sus soluciones de software, con un blog de noticias, formulario de contacto y fuerte optimización para buscadores e IA. Web informativa con link a login del sistema (sin pasarela de pagos).

## Decisiones tomadas (brainstorming)

| Tema | Decisión |
|------|----------|
| Gestión del blog | **Content Collections (Markdown)** en el repo. Extensible a editor visual (Keystatic) más adelante. |
| Formulario de contacto | Maquetado y funcional en UI; **backend de envío/confirmación se define después**. |
| Bot/asistente | **Sección FAQ (acordeón), sin bot** en esta versión. |
| Estética | **Claro corporativo limpio**: fondo blanco, azul de marca como acento. |
| Hosting | **Se define después** → salida estática, adapter-agnóstico. |

## Stack técnico

- **Astro** (última) + **TypeScript**, salida **estática** (`output: 'static'`).
- **Tailwind CSS v4** (`@tailwindcss/vite`).
- **Content Collections** con Content Layer API (`glob()` loader) para `blog` y `soluciones`.
- **i18n nativo** de Astro (`defaultLocale: 'es'`, `locales: ['es','en']`, `prefixDefaultLocale: false`).
- Diccionarios de UI: `src/i18n/es.json`, `src/i18n/en.json` + helper `useTranslations`.
- `@astrojs/sitemap`. JavaScript mínimo (islas: menú mobile, selector de idioma, acordeón FAQ).
- Tipografías **self-hosted** (sin CDN).

## Identidad visual

- **Azul de marca:** `#0000FF` (acento: CTAs, links, detalles).
- **Tinta/negro:** `#0A0A0A` para texto. Blanco y escala de grises para superficies.
- **Tipografía:** geométrica/tech para títulos (evoca el logo), sans legible para cuerpo.
- **Logos:** disponibles en `assets/` (versiones PNG sin fondo, letras negras/blancas + azul).

## Estructura de rutas (i18n)

Español en la raíz, inglés bajo `/en/`.

```
/                    Inicio            /en/
/soluciones          Soluciones        /en/solutions
/soluciones/pms      Detalle PMS       /en/solutions/pms
/empresa             Nosotros          /en/company
/blog                Noticias          /en/blog
/blog/[slug]         Nota              /en/blog/[slug]
/contacto            Contacto + FAQ    /en/contact
```

- Nav agrupa **Empresa → Nosotros + Blog** (dropdown).
- Botón **"Ingresar"** → link externo al login del sistema (placeholder configurable).
- Selector de idioma **ES/EN** con `hreflang` correcto.

## Arquitectura de contenido

- `src/content/soluciones/*.md` → cada producto es un archivo (PMS hoy). Sumar un sistema nuevo = un archivo nuevo.
  - Frontmatter: `title`, `lang`, `order`, `summary`, `icon/image`, `features[]`, `cta`.
- `src/content/blog/*.md` → noticias.
  - Frontmatter: `title`, `lang`, `pubDate`, `description`, `image`, `tags[]`, `draft`.
- `src/i18n/{es,en}.json` → textos de UI (menús, botones, hero, labels del form, FAQ).
- Imágenes/textos los provee el cliente → placeholders claros usando los logos existentes.

## Componentes

- `Header` (logo, nav con dropdown Empresa, selector idioma, CTA Ingresar, menú mobile).
- `Footer` (logo, links, contacto, redes, aviso legal).
- `Hero` (título, subtítulo, CTAs).
- `SolutionCard` / grilla de soluciones.
- `FeatureSection` (bloques de características).
- `BlogCard` / grilla de noticias + paginación simple.
- `ContactForm` (maquetado, sin backend aún; validación básica cliente).
- `FaqAccordion`.
- `LanguagePicker`, `SEO` (head con meta/OG/JSON-LD/hreflang).

## SEO + AI

- Meta por página, `canonical`, `hreflang` ES/EN, Open Graph / Twitter cards.
- **JSON-LD:** Organization, WebSite, BlogPosting, FAQPage, BreadcrumbList.
- `sitemap.xml` (via integración), `robots.txt`, **`llms.txt`** para asistentes IA.
- HTML semántico, `alt` en imágenes, headings jerárquicos.

## Fuera de alcance (esta versión)

- Backend real del formulario (envío + mail de confirmación) → etapa posterior.
- Bot/chat en vivo y conexión a WhatsApp por API → etapa posterior.
- CMS visual (Keystatic) → opcional, sobre las mismas Content Collections.
- Pasarela de pagos (nunca; va por el sistema contable).
- Videos.

## Criterios de éxito

1. `npm run build` genera el sitio estático sin errores.
2. Navegación completa en ES y EN con `hreflang` correcto.
3. Blog y Soluciones renderizan desde Markdown; agregar un `.md` publica contenido.
4. Formulario validado en cliente (envío placeholder documentado).
5. Lighthouse SEO alto; sitemap, robots y llms.txt presentes; JSON-LD válido.
6. Responsive y accesible (contraste, foco, semántica).
