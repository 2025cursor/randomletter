import { Metadata } from 'next'
import { BASE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Terms of Service - Random Generator Tools',
  description: 'Terms of Service for Random Generator Tools. Read our terms and conditions for using our free online random generator tools.',
  alternates: {
    canonical: `${BASE_URL}/terms`,
  },
}

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
