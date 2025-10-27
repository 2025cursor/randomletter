import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Random Generator Tools',
    default: 'Random Generator Tools - Free Online Random Letter, Password, Color & Number Generators',
  },
  description: 'Free online random generator tools including letter generator, password generator, color palette generator, number generator, date generator and list picker. Perfect for developers, designers and decision making.',
  keywords: 'random generator, letter generator, password generator, color generator, number generator, random tools, online generator, free tools',
  authors: [{ name: 'Random Generator Tools' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Random Generator Tools - Free Online Random Generators',
    description: 'Free online random generator tools for letters, passwords, colors, numbers and more. Professional tools for developers and designers.',
    siteName: 'Random Generator Tools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Random Generator Tools - Free Online Random Generators',
    description: 'Free online random generator tools for letters, passwords, colors, numbers and more.',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${baseUrl}/`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Random Generator Tools",
              "description": "Free online random generator tools for letters, passwords, colors, numbers and more",
              "url": baseUrl,
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Any",
              "browserRequirements": "Requires JavaScript",
              "permissions": "none",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD",
                "availability": "https://schema.org/InStock"
              },
              "provider": {
                "@type": "Organization",
                "name": "Random Generator Tools",
                "url": baseUrl
              },
              "featureList": [
                "Random Letter Generator",
                "Password Generator",
                "Color Palette Generator",
                "Random Number Generator",
                "Date & Time Generator",
                "Random List Picker",
                "Boolean Generator"
              ],
              "keywords": "random generator, utilities, tools, developers, designers",
              "mainEntityOfPage": baseUrl,
              "dateModified": "2025-01-01",
              "inLanguage": "en-US"
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}