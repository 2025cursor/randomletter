import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Strong Password Generator - Free Secure Password Creator Tool',
  description: 'Generate strong, secure passwords with customizable length and character types. Include uppercase, lowercase, numbers, and symbols. Free online password generator with strength meter.',
  keywords: 'password generator, strong password, secure password, password creator, random password, password tool',
  alternates: {
    canonical: 'https://randomletter.vercel.app/password-generator',
  },
}

export default function PasswordGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}