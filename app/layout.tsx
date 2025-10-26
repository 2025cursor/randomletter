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
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://randomletter.vercel.app/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Random Generator Tools",
              "description": "Free online random generator tools for letters, passwords, colors, numbers and more",
              "url": "https://randomletter.vercel.app",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "provider": {
                "@type": "Organization",
                "name": "Random Generator Tools"
              }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}