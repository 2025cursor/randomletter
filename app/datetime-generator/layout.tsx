import { Metadata } from 'next'
import { BASE_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Random Date & Time Generator - Free DateTime Creator Tool',
  description: 'Generate random dates and times within custom ranges for testing, planning, and more. Support multiple date formats, time formats, and custom date ranges.',
  keywords: 'date generator, time generator, random date, datetime generator, date picker, time picker',
  alternates: {
    canonical: `${BASE_URL}/datetime-generator`,
  },
  openGraph: {
    title: 'Random Date & Time Generator - Free DateTime Creator Tool',
    description: 'Generate random dates and times within custom ranges for testing, planning, and more.',
    url: `${BASE_URL}/datetime-generator`,
  },
}

export default function DateTimeGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}