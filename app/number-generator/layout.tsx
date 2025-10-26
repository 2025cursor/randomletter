import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Random Number Generator - Free Integer & Decimal Generator',
  description: 'Generate random numbers with customizable range, quantity and formatting options. Create unique integers or decimals within any specified range. Perfect for statistics, gaming, and research.',
  keywords: 'number generator, random number, integer generator, decimal generator, statistics, random data',
  alternates: {
    canonical: 'https://randomletter.vercel.app/number-generator',
  },
}

export default function NumberGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}