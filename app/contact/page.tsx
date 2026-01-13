import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="legal-page">
      <h1>Contact Us</h1>
      <p className="last-updated">We'd love to hear from you</p>

      <h2>Get in Touch</h2>
      <p>
        Have questions about our random generator tools? Want to suggest a new feature?
        Found a bug that needs fixing? We welcome all feedback and inquiries.
      </p>

      <h2>Email</h2>
      <p>
        The best way to reach us is via email. Please send your message to:
      </p>
      <p>
        <strong>support@randletter.com</strong>
      </p>

      <h2>What to Include</h2>
      <p>
        To help us respond to your inquiry as quickly as possible, please include:
      </p>
      <ul>
        <li>Which tool you were using (if applicable)</li>
        <li>A clear description of your question, suggestion, or issue</li>
        <li>Your browser and device type (if reporting a bug)</li>
        <li>Screenshots (if helpful)</li>
      </ul>

      <h2>Response Time</h2>
      <p>
        We aim to respond to all inquiries within 24-48 hours during business days.
        Thank you for your patience!
      </p>

      <h2>Feature Requests</h2>
      <p>
        We're always looking to improve our tools. If you have an idea for a new
        generator or feature, please let us know! We prioritize features based on
        user demand and feasibility.
      </p>

      <h2>Bug Reports</h2>
      <p>
        If you've encountered a bug, please provide as much detail as possible including:
      </p>
      <ul>
        <li>Steps to reproduce the issue</li>
        <li>Expected behavior vs actual behavior</li>
        <li>Browser name and version</li>
        <li>Device type (desktop/mobile)</li>
      </ul>

      <p>
        Thank you for using <Link href="/">Random Generator Tools</Link>!
      </p>
    </div>
  )
}
