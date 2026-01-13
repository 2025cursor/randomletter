import { Metadata } from 'next'
import { BASE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'About Us - Random Generator Tools',
  description: 'Learn about Random Generator Tools - free online utilities for generating random letters, passwords, colors, numbers and more. Built for developers, designers, and everyday users.',
  alternates: {
    canonical: `${BASE_URL}/about`,
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
