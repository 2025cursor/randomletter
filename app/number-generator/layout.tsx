import { Metadata } from 'next'
import { BASE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Random Number Generator - Free Integer & Decimal Generator',
  description: 'Generate random numbers with customizable range, quantity and formatting options. Create unique integers or decimals within any specified range. Perfect for statistics, gaming, and research.',
  keywords: 'number generator, random number, integer generator, decimal generator, statistics, random data',
  alternates: {
    canonical: `${BASE_URL}/number-generator`,
  },
  openGraph: {
    title: 'Random Number Generator - Free Integer & Decimal Generator',
    description: 'Generate random numbers with customizable range, quantity and formatting options.',
    url: `${BASE_URL}/number-generator`,
  },
}

export default function NumberGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}