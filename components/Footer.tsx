'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Random Generator Tools</h3>
          <p>Free online tools for generating random letters, passwords, colors, numbers, and more. Perfect for developers, designers, and everyday decision making.</p>
        </div>

        <div className="footer-section">
          <h4>Tools</h4>
          <ul>
            <li><Link href="/">Letter Generator</Link></li>
            <li><Link href="/password-generator">Password Generator</Link></li>
            <li><Link href="/color-generator">Color Generator</Link></li>
            <li><Link href="/number-generator">Number Generator</Link></li>
            <li><Link href="/datetime-generator">Date & Time Generator</Link></li>
            <li><Link href="/picker-generator">Random Picker</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Random Generator Tools. All rights reserved.</p>
      </div>
    </footer>
  )
}
