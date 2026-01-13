// Site configuration - IMPORTANT: Use production domain, not Vercel preview URL
export const SITE_CONFIG = {
  name: 'Random Generator Tools',
  url: 'https://randletter.com',
  description: 'Free online random generator tools for letters, passwords, colors, numbers and more.',
} as const

export const BASE_URL = SITE_CONFIG.url
