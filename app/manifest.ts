import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Random Generator Tools - Free Online Generators',
    short_name: 'Random Tools',
    description: 'Free online random generator tools for letters, passwords, colors, numbers and more',
    start_url: '/',
    display: 'standalone',
    background_color: '#f5f7fa',
    theme_color: '#4169E1',
    orientation: 'portrait',
    scope: '/',
    lang: 'en',
    categories: ['utilities', 'productivity', 'developer'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}