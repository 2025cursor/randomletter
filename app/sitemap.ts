import { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = BASE_URL
  const lastModified = new Date()

  return [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Core generator tools - high priority
    {
      url: `${baseUrl}/password-generator`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/color-generator`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/number-generator`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Secondary tools - medium priority
    {
      url: `${baseUrl}/datetime-generator`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/picker-generator`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // Additional tools - lower priority
    {
      url: `${baseUrl}/boolean-generator`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    // Legal and info pages
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
  ]
}