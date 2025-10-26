import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Random Color Generator - Free Color Palette Creator',
  description: 'Generate random colors and harmonious color palettes instantly. Create analogous, complementary, triadic, and monochromatic color schemes in HEX, RGB, and HSL formats. Perfect for designers.',
  keywords: 'color generator, random color, color palette, color scheme, hex color, rgb color, design colors',
  alternates: {
    canonical: 'https://randomletter.vercel.app/color-generator',
  },
}

export default function ColorGeneratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}