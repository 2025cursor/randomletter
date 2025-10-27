import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
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
  ]
}