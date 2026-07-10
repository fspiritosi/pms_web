# Cómo cargar noticias en el blog de PMS

Hay **dos formas** de cargar una noticia. Elegí la que te resulte más cómoda:

- ✅ **Recomendada — Editor visual (Keystatic):** desde el navegador, sin tocar
  archivos. Ideal para el día a día. Ver la sección 1.
- 🛠️ **Manual (avanzada):** creando el archivo a mano. Sirve como referencia o
  respaldo. Ver a partir de la sección 2.

> El editor visual y la carga manual escriben **el mismo contenido**: podés
> combinar ambas sin problema.

---

## 1. Forma recomendada: el editor visual

1. Entrá a **`https://pms.net.ar/keystatic`**.
2. Iniciá sesión con GitHub (la primera vez autorizás el acceso).
3. En el menú vas a ver **Noticias (Español)** y **Noticias (Inglés)**.
4. Tocá **"+ Create"**, completá los campos (Título, Fecha, Resumen, Etiquetas)
   y escribí el contenido en el editor de texto.
5. Cuando termines, tocá **guardar/publicar**. El sitio se actualiza solo.

Para una noticia bilingüe, cargala una vez en **Noticias (Español)** y otra en
**Noticias (Inglés)**.

> ¿Todavía no está habilitado el editor? La puesta en marcha (una sola vez) está
> en `docs/keystatic-configuracion.md`.

El resto de esta guía explica la estructura por si preferís la carga manual o
querés entender cómo se guarda el contenido.

---

## 2. Forma manual: idea general

- Cada noticia es **un archivo** con extensión `.mdoc` (texto con formato).
- El sitio es **bilingüe**. Para que aparezca en los dos idiomas, se crean **dos
  archivos**: uno en la carpeta de español y otro en la de inglés.
- Los archivos viven en estas carpetas:

```
src/content/blog/es/     ← noticias en ESPAÑOL
src/content/blog/en/     ← noticias en INGLÉS
```

**El idioma lo determina la carpeta.** No hay que indicarlo dentro del archivo.

---

## 3. El nombre del archivo = la dirección web

El nombre del archivo se convierte en la dirección (URL) de la noticia.

| Archivo | Dirección en el sitio |
|---|---|
| `src/content/blog/es/lanzamiento-pms.mdoc` | `pms.net.ar/blog/lanzamiento-pms/` |
| `src/content/blog/en/lanzamiento-pms.mdoc` | `pms.net.ar/en/blog/lanzamiento-pms/` |

**Reglas para el nombre del archivo:**

- Usá **solo minúsculas**, sin espacios ni acentos ni "ñ".
- Separá las palabras con **guiones** (`-`).
- ✅ Bien: `nueva-version-pms.mdoc`, `caso-de-exito-cliente.mdoc`
- ❌ Mal: `Nueva Versión.mdoc`, `caso_de_éxito.mdoc`

> Para enlazar la versión en español con la de inglés, usá **el mismo nombre de
> archivo** en ambas carpetas.

---

## 4. Estructura de una noticia

Cada archivo tiene **dos partes**:

1. **La ficha** (arriba, entre las líneas `---`): los datos de la noticia.
2. **El contenido** (debajo): el texto.

Ejemplo completo:

```markdown
---
title: Presentamos la nueva versión de PMS
pubDate: 2026-08-15
description: Contamos las novedades y mejoras de la última versión de PMS.
tags:
  - producto
  - novedades
draft: false
---

Hoy lanzamos una **nueva versión de PMS** con varias mejoras que nos pidieron
nuestros clientes.

## Qué hay de nuevo

- Mejoras de rendimiento.
- Nuevas pantallas de reportes.

Si querés conocer los detalles, [escribinos](/contacto/).
```

---

## 5. Los datos de la ficha

Todo lo que va entre las dos líneas `---` del principio. Respetá los nombres tal
cual (en inglés) y el formato.

| Campo | ¿Obligatorio? | Qué es | Ejemplo |
|---|---|---|---|
| `title` | **Sí** | El título de la noticia. | `title: Presentamos PMS` |
| `pubDate` | **Sí** | Fecha en formato **AÑO-MES-DÍA**. | `pubDate: 2026-08-15` |
| `description` | **Sí** | Resumen de 1 o 2 líneas (tarjeta y buscadores). | `description: Novedades de la versión.` |
| `tags` | No | Etiquetas del tema (una por línea con `-`). | ver ejemplo de arriba |
| `draft` | No | `true` = borrador (no se publica). `false` = se publica. | `draft: false` |

> El idioma **no** se pone en la ficha: lo define la carpeta (`es/` o `en/`).

**Consejos:**

- El `title` y la `description` en español van con acentos y "ñ" normalmente. La
  restricción de "sin acentos" es **solo para el nombre del archivo**.
- Si un texto tiene `:` (dos puntos), ponelo entre comillas.
  Ejemplo: `title: "PMS 2.0: más rápido y más simple"`

---

## 6. Cómo escribir el contenido (formato Markdown/Markdoc)

Debajo de la ficha escribís la noticia con formato simple:

```markdown
## Título de sección
### Subtítulo

Un párrafo común. Para **negrita** usá dos asteriscos, para *cursiva* uno.

- Elemento de lista
- Otro elemento

1. Lista numerada
2. Segundo punto

> Esto es una cita destacada.

Un enlace: [texto del enlace](/contacto/)
```

- `## ` y `### ` → títulos de sección.
- `**palabra**` → **negrita**. `*palabra*` → *cursiva*.
- `- ` → viñetas. `> ` → cita destacada.
- `[texto](dirección)` → enlace.

> Dejá una **línea en blanco** entre párrafos para que se separen.

---

## 7. Guardar como borrador

Si todavía no querés publicar, poné en la ficha:

```markdown
draft: true
```

Mientras esté en `true`, **no aparece** en el sitio. Cuando esté lista, cambialo
a `false` (o borrá esa línea). En el editor visual es la casilla
**"Borrador (no se publica)"**.

---

## 8. Publicar

- **Editor visual:** al guardar, se publica solo.
- **Manual:** la noticia se publica cuando el sitio se vuelve a generar y subir
  (al guardar el archivo en el repositorio de GitHub).

---

## 9. Checklist rápido (carga manual)

- [ ] El archivo está en la carpeta correcta (`es/` o `en/`).
- [ ] El nombre está en minúsculas, con guiones y sin acentos, y termina en `.mdoc`.
- [ ] La ficha tiene `title`, `pubDate` y `description`.
- [ ] La fecha está en formato `AÑO-MES-DÍA` (ej: `2026-08-15`).
- [ ] `draft` está en `false` (o no está puesto) para que se publique.
- [ ] Si es bilingüe, existe el mismo archivo en `es/` y en `en/`.

---

## 10. Modelo para copiar y pegar

**Español** — `src/content/blog/es/mi-noticia.mdoc`:

```markdown
---
title: Título de la noticia
pubDate: 2026-08-15
description: Resumen breve de la noticia.
tags:
  - novedades
draft: false
---

Escribí acá el contenido de la noticia.

## Una sección

Más texto...
```

**Inglés** — `src/content/blog/en/mi-noticia.mdoc`:

```markdown
---
title: News title
pubDate: 2026-08-15
description: Short summary of the news.
tags:
  - news
draft: false
---

Write the news content here.

## A section

More text...
```
