import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="legal-page">
      <h1>About Random Generator Tools</h1>
      <p className="last-updated">Your trusted source for free online random generators</p>

      <h2>Our Mission</h2>
      <p>
        Random Generator Tools was created with a simple mission: to provide free, reliable, and easy-to-use
        random generation tools for everyone. Whether you're a software developer needing test data,
        a designer looking for color inspiration, or just someone making everyday decisions,
        our tools are designed to help you get the job done quickly and efficiently.
      </p>

      <h2>What We Offer</h2>
      <p>
        Our suite of random generator tools includes:
      </p>
      <ul>
        <li><strong>Random Letter Generator</strong> - Generate random letters for testing, games, or creative projects</li>
        <li><strong>Password Generator</strong> - Create strong, secure passwords with customizable options</li>
        <li><strong>Color Generator</strong> - Generate beautiful color palettes with various color schemes</li>
        <li><strong>Number Generator</strong> - Create random numbers within any range for statistics or gaming</li>
        <li><strong>Date & Time Generator</strong> - Generate random dates and times for testing or planning</li>
        <li><strong>Random Picker</strong> - Pick random items from your custom list</li>
        <li><strong>Boolean Generator</strong> - Quick true/false decisions with fair 50/50 probability</li>
      </ul>

      <h2>Why Choose Us?</h2>
      <ul>
        <li><strong>100% Free</strong> - All our tools are completely free to use, no registration required</li>
        <li><strong>Privacy Focused</strong> - We don't store any data you generate on our servers</li>
        <li><strong>No Downloads</strong> - Everything works directly in your browser</li>
        <li><strong>Mobile Friendly</strong> - Use our tools on any device, anywhere</li>
        <li><strong>Fast & Reliable</strong> - Instant generation with no delays</li>
      </ul>

      <h2>Our Commitment</h2>
      <p>
        We are committed to maintaining and improving our tools based on user feedback.
        Our goal is to make random generation as simple and accessible as possible.
        All our generators use cryptographically secure random number generation where applicable,
        ensuring truly random and unbiased results.
      </p>

      <h2>Contact Us</h2>
      <p>
        Have questions, suggestions, or feedback? We'd love to hear from you!
        Visit our <Link href="/contact">Contact page</Link> to get in touch.
      </p>

      <h2>Legal</h2>
      <p>
        Please review our <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Service</Link> for
        information about how we handle your data and the terms of using our services.
      </p>
    </div>
  )
}
