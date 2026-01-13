import { Metadata } from 'next'
import { BASE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Contact Us - Random Generator Tools',
  description: 'Get in touch with Random Generator Tools. We welcome your questions, suggestions, and feedback about our free online random generator tools.',
  alternates: {
    canonical: `${BASE_URL}/contact`,
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
