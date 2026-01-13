import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className="legal-page">
      <h1>Terms of Service</h1>
      <p className="last-updated">Last updated: January 2025</p>

      <h2>1. Acceptance of Terms</h2>
      <p>
        By accessing or using Random Generator Tools at randletter.com ("the Service"),
        you agree to be bound by these Terms of Service. If you do not agree to these terms,
        please do not use our Service.
      </p>

      <h2>2. Description of Service</h2>
      <p>
        Random Generator Tools provides free online utilities for generating random data including
        letters, passwords, colors, numbers, dates, and other content. The Service is provided
        "as is" and "as available" without warranties of any kind.
      </p>

      <h2>3. Use of Service</h2>
      <p>You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:</p>
      <ul>
        <li>Use the Service in any way that violates applicable laws or regulations</li>
        <li>Attempt to interfere with or disrupt the Service or servers</li>
        <li>Use automated systems or software to access the Service without permission</li>
        <li>Use the Service to generate content for illegal activities</li>
      </ul>

      <h2>4. Intellectual Property</h2>
      <p>
        The Service and its original content, features, and functionality are owned by Random Generator Tools
        and are protected by copyright, trademark, and other intellectual property laws.
        You may use the generated content freely for personal or commercial purposes.
      </p>

      <h2>5. User-Generated Content</h2>
      <p>
        Any content you input into our tools (such as lists for the random picker) is processed
        entirely in your browser. We do not store, collect, or have access to your input data.
        You are solely responsible for any content you generate using our tools.
      </p>

      <h2>6. Disclaimer of Warranties</h2>
      <p>
        THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED,
        INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
        PURPOSE, AND NON-INFRINGEMENT. We do not warrant that:
      </p>
      <ul>
        <li>The Service will be uninterrupted or error-free</li>
        <li>Defects will be corrected</li>
        <li>The Service is free of viruses or other harmful components</li>
        <li>The results generated will meet your specific requirements</li>
      </ul>

      <h2>7. Limitation of Liability</h2>
      <p>
        IN NO EVENT SHALL RANDOM GENERATOR TOOLS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
        CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF THE SERVICE,
        WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY.
      </p>

      <h2>8. Password Generator Disclaimer</h2>
      <p>
        While our password generator creates strong passwords using secure methods, we make no
        guarantees about the security of any generated password. You are responsible for:
      </p>
      <ul>
        <li>Storing your passwords securely</li>
        <li>Not sharing your passwords with others</li>
        <li>Using unique passwords for different accounts</li>
        <li>Evaluating the security requirements for your specific use case</li>
      </ul>

      <h2>9. Third-Party Links</h2>
      <p>
        The Service may contain links to third-party websites or services. We are not responsible
        for the content, privacy policies, or practices of any third-party sites or services.
      </p>

      <h2>10. Changes to Terms</h2>
      <p>
        We reserve the right to modify these Terms at any time. We will notify users of any changes
        by updating the "Last updated" date. Your continued use of the Service after any changes
        constitutes acceptance of the new Terms.
      </p>

      <h2>11. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with applicable laws,
        without regard to conflict of law principles.
      </p>

      <h2>12. Contact Information</h2>
      <p>
        If you have questions about these Terms, please contact us at:
        <strong> support@randletter.com</strong>
      </p>
      <p>
        You can also visit our <Link href="/contact">Contact page</Link> for more ways to reach us.
      </p>
    </div>
  )
}
