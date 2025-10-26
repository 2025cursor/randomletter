import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Random List Picker - Free Random Selection Tool',
  description: 'Enter your list and randomly pick one or more items. Perfect for decisions, raffles, and random selections. Support multiple picks and duplicate control.',
  keywords: 'random picker, list picker, random selection, decision maker, raffle picker, choice picker',
  alternates: {
    canonical: 'https://randomletter.vercel.app/picker-generator',
  },
}

export default function PickerGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}