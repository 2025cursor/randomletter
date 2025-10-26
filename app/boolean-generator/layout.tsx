import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Boolean & Choice Generator - Free True/False Generator',
  description: 'Generate random boolean values (true/false) for quick decisions and choices. Perfect coin flip alternative with 50/50 probability.',
  keywords: 'boolean generator, true false generator, coin flip, random choice, decision maker, yes no generator',
  alternates: {
    canonical: 'https://randomletter.vercel.app/boolean-generator',
  },
}

export default function BooleanGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}