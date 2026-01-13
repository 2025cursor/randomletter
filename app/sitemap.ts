import { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BASE_URL

  return [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: '2026-01-13',
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Core generator tools - high priority
    {
      url: `${baseUrl}/password-generator`,
      lastModified: '2026-01-13',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/color-generator`,
      lastModified: '2026-01-13',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/number-generator`,
      lastModified: '2026-01-13',
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Secondary tools - medium priority
    {
      url: `${baseUrl}/datetime-generator`,
      lastModified: '2026-01-13',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/picker-generator`,
      lastModified: '2026-01-13',
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Additional tools - lower priority
    {
      url: `${baseUrl}/boolean-generator`,
      lastModified: '2026-01-13',
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Legal and info pages
    {
      url: `${baseUrl}/about`,
      lastModified: '2026-01-13',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: '2026-01-13',
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: '2026-01-13',
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: '2026-01-13',
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ]
}