import { Metadata } from 'next'
import { BASE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Privacy Policy - Random Generator Tools',
  description: 'Privacy Policy for Random Generator Tools. Learn how we collect, use, and protect your information when using our free online random generator tools.',
  alternates: {
    canonical: `${BASE_URL}/privacy`,
  },
}

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
