// Configuración central del sitio. Datos que probablemente cambien juntos
// y que el cliente/dev ajusta en un solo lugar.

export const site = {
  name: 'Perez Marzo Systems Development',
  shortName: 'PMS',
  domain: 'pms.net.ar',
  url: 'https://pms.net.ar',
  // Link externo al login del sistema (placeholder — reemplazar por la URL real).
  loginUrl: 'https://app.pms.net.ar/login',
  email: {
    comercial: 'comercial@pms.net.ar',
    soporte: 'soporte@pms.net.ar',
  },
  phone: '+54 9 11 0000-0000',
  social: {
    linkedin: '',
    youtube: '',
  },
} as const;

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';
