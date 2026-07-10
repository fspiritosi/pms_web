# Keystatic — Editor de contenido (configuración)

El sitio incluye **Keystatic**, un panel visual para que el cliente edite las
noticias y soluciones **sin tocar código**, directamente desde el navegador.
Los cambios se guardan en el repositorio de GitHub y el sitio se actualiza solo.

- Panel de edición: **`https://pms.net.ar/keystatic`**
- El contenido sigue viviendo en `src/content/` como archivos `.mdoc`. Keystatic
  simplemente los edita por vos.

> Esta guía es para la **puesta en marcha** (una sola vez, técnica). El uso diario
> del cliente está en `docs/como-crear-noticias-blog.md`.

---

## Requisitos

1. El proyecto tiene que estar en un **repositorio de GitHub**.
2. El sitio se despliega con **renderizado de servidor (SSR)**: hoy está
   configurado con el adapter **Node** (`@astrojs/node`). El panel `/keystatic`
   y su API necesitan un servidor; el resto del sitio sigue siendo estático.
   - Si desplegás en **Vercel** o **Netlify**, se puede cambiar el adapter por
     `@astrojs/vercel` o `@astrojs/netlify` (una línea en `astro.config.mjs`).

---

## Paso 1 — Indicar el repositorio

En `keystatic.config.ts`, completá el usuario/organización y el nombre del repo:

```ts
const GITHUB_REPO = {
  owner: 'TU-USUARIO-O-ORG', // ej: 'perezmarzo'
  name: 'pms-web',           // nombre del repositorio
};
```

---

## Paso 2 — Crear la GitHub App

Keystatic usa una **GitHub App** para autenticar al cliente y guardar cambios.

1. Entrá a **GitHub → Settings → Developer settings → GitHub Apps → New GitHub App**
   (o directamente `https://github.com/settings/apps/new`).
2. Completá:
   - **GitHub App name**: por ejemplo `PMS Contenido`.
   - **Homepage URL**: `https://pms.net.ar`
   - **Callback URL**: `https://pms.net.ar/api/keystatic/github/oauth/callback`
     - Agregá también, para probar localmente:
       `http://127.0.0.1:4321/api/keystatic/github/oauth/callback`
   - **Request user authorization (OAuth) during installation**: activado.
   - **Webhook**: desactivá "Active" (no hace falta).
3. **Permisos** (Repository permissions):
   - **Contents**: `Read and write`.
   - **Metadata**: `Read-only` (se activa solo).
   - **Pull requests**: `Read and write` (opcional, si querés flujo por PRs).
4. **Where can this GitHub App be installed?**: "Only on this account".
5. Creá la App. Luego, en su página:
   - Anotá el **Client ID**.
   - Generá un **Client secret** y copialo (se ve una sola vez).
   - Anotá el **slug** de la App (aparece en su URL: `.../apps/<slug>`).
6. **Instalá** la App en el repositorio del proyecto
   (botón *Install App* → elegí el repo `pms-web`).

---

## Paso 3 — Variables de entorno

Copiá `.env.example` a `.env` y completá:

```bash
KEYSTATIC_GITHUB_CLIENT_ID=<Client ID de la App>
KEYSTATIC_GITHUB_CLIENT_SECRET=<Client secret de la App>
KEYSTATIC_SECRET=<cadena aleatoria larga>   # generá con: openssl rand -hex 32
PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=<slug de la App>
```

- **En local**: quedan en el archivo `.env` (que NO se sube al repo).
- **En producción**: cargá estas mismas variables en el panel de tu hosting
  (Vercel/Netlify/servidor). Sin ellas, `/keystatic` no puede autenticar.

---

## Paso 4 — Probar

- **En producción**: entrá a `https://pms.net.ar/keystatic`, iniciá sesión con
  GitHub y autorizá la App. Ya podés crear/editar noticias y soluciones. Al
  guardar, Keystatic hace un commit y el sitio se redespliega.

- **Prueba local rápida (sin GitHub App):** podés editar contra los archivos de
  tu disco cambiando temporalmente el `storage` en `keystatic.config.ts`:

  ```ts
  storage: { kind: 'local' }
  ```

  Corré `npm run dev` y entrá a `http://localhost:4321/keystatic`. Recordá volver
  a `kind: 'github'` antes de desplegar.

---

## Cómo se relaciona con el contenido

| Colección en Keystatic | Carpeta en el repo |
|---|---|
| Noticias (Español) | `src/content/blog/es/` |
| Noticias (Inglés) | `src/content/blog/en/` |
| Soluciones (Español) | `src/content/soluciones/es/` |
| Soluciones (Inglés) | `src/content/soluciones/en/` |

- El **idioma** lo determina la carpeta (`es/` o `en/`); no es un campo editable.
- El **nombre del archivo** (identificador de URL) se genera desde el título.
- El cuerpo se escribe con un editor de texto enriquecido y se guarda como
  Markdoc (`.mdoc`), compatible con el render del sitio.

---

## Notas de despliegue

- El sitio de marketing se genera **estático**; solo `/keystatic` y
  `/api/keystatic/*` corren en el servidor. Por eso hace falta un hosting que
  ejecute Node (o Vercel/Netlify con su adapter), no un hosting de solo-archivos.
- El bundle del panel `/keystatic` es grande (es una app de edición completa),
  pero **no afecta** el peso de las páginas públicas.
