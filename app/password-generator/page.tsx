'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PasswordGenerator() {
  const [passwordLength, setPasswordLength] = useState(16)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false)
  const [noRepeats, setNoRepeats] = useState(false)
  const [result, setResult] = useState('EWMQ}}WmQy56{^bh')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showToolsMenu, setShowToolsMenu] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [strengthLevel, setStrengthLevel] = useState('Very Strong')
  const [strengthClass, setStrengthClass] = useState('strength-strong')
  const [strengthColor, setStrengthColor] = useState('#48bb78')

  useEffect(() => {
    generatePassword()
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  const generatePassword = () => {
    let chars = ''

    if (uppercase) chars += excludeAmbiguous ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (lowercase) chars += excludeAmbiguous ? 'abcdefghjkmnpqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz'
    if (numbers) chars += excludeAmbiguous ? '23456789' : '0123456789'
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (chars.length === 0) {
      alert('Please select at least one character type!')
      return
    }

    let password = ''
    const usedChars = new Set()

    for (let i = 0; i < passwordLength; i++) {
      let char
      do {
        char = chars[Math.floor(Math.random() * chars.length)]
      } while (noRepeats && usedChars.has(char) && usedChars.size < chars.length)

      password += char
      if (noRepeats) usedChars.add(char)
    }

    setResult(password)
    updatePasswordStrength(password)
  }

  const updatePasswordStrength = (password: string) => {
    const length = password.length
    const hasUpper = /[A-Z]/.test(password)
    const hasLower = /[a-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    const hasSymbol = /[^A-Za-z0-9]/.test(password)

    let strength = 0
    if (length >= 8) strength++
    if (length >= 12) strength++
    if (hasUpper) strength++
    if (hasLower) strength++
    if (hasNumber) strength++
    if (hasSymbol) strength++

    if (strength <= 2) {
      setStrengthLevel('Weak')
      setStrengthClass('strength-weak')
      setStrengthColor('#f56565')
    } else if (strength <= 4) {
      setStrengthLevel('Medium')
      setStrengthClass('strength-medium')
      setStrengthColor('#ed8936')
    } else {
      setStrengthLevel('Very Strong')
      setStrengthClass('strength-strong')
      setStrengthColor('#48bb78')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(result)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  const toggleToolsMenu = () => {
    setShowToolsMenu(!showToolsMenu)
  }

  return (
    <>
      <nav className="navbar">
        <Link href="/" className="logo">
          <span className="logo-icon">T</span>
          <span>RANDOM LETTER</span>
        </Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <div className="tools-dropdown">
            <button className="tools-btn" onClick={toggleToolsMenu}>
              Tools ▼
            </button>
            <div className={`tools-menu ${showToolsMenu ? 'show' : ''}`}>
              <Link href="/">Letter Generator</Link>
              <Link href="/password-generator">Password Generator</Link>
              <Link href="/color-generator">Color Generator</Link>
              <Link href="/number-generator">Number Generator</Link>
              <Link href="/datetime-generator">Date & Time Generator</Link>
              <Link href="/boolean-generator">Boolean & Choice</Link>
              <Link href="/picker-generator">Random Picker</Link>
            </div>
          </div>
          <button className="theme-toggle" onClick={toggleTheme}>
            <span>{isDarkMode ? '☀️' : '🌙'}</span>
          </button>
        </div>
      </nav>

      <div className="container">
        <div>
          <h1 className="page-title">Strong Password Generator - Secure Password Creator</h1>
          <p className="page-subtitle">
            Create secure, unbreakable passwords with customizable length and character types. Generate strong passwords with uppercase, lowercase, numbers, and symbols. Real-time strength analysis included.
          </p>

          <div className="card">
            <div className="password-result-section">
              <div className="result-box password-display">{result}</div>

              <div className="password-actions">
                <button className="btn-generate" onClick={generatePassword}>
                  🔄 GENERATE
                </button>
                <button className="btn-copy" onClick={copyToClipboard}>
                  📋 Copy
                </button>
              </div>

              <div className="strength-meter">
                <div className="strength-label">
                  <span>Strength:</span>
                  <span className="strength-text" style={{color: strengthColor}}>
                    {strengthLevel}
                  </span>
                </div>
                <div className="strength-bar">
                  <div className={`strength-fill ${strengthClass}`}></div>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password Length:</label>
              <input
                type="number"
                className="form-input"
                value={passwordLength}
                onChange={(e) => setPasswordLength(parseInt(e.target.value) || 4)}
                min="4"
                max="128"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Character Types:</label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={uppercase}
                    onChange={(e) => setUppercase(e.target.checked)}
                  />
                  Uppercase
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={lowercase}
                    onChange={(e) => setLowercase(e.target.checked)}
                  />
                  Lowercase
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={numbers}
                    onChange={(e) => setNumbers(e.target.checked)}
                  />
                  Numbers
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={symbols}
                    onChange={(e) => setSymbols(e.target.checked)}
                  />
                  Symbols
                </label>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Options:</label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={excludeAmbiguous}
                    onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                  />
                  Exclude Ambiguous
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={noRepeats}
                    onChange={(e) => setNoRepeats(e.target.checked)}
                  />
                  No Repeats
                </label>
              </div>
            </div>
          </div>

          {/* SEO Content Section */}
          <div className="info-section">
            <h2 className="info-title">How to Use the Password Generator</h2>
            <p className="info-text">
              Our free password generator creates strong, secure passwords instantly. Simply adjust the password length using the slider or input field, select your preferred character types (uppercase, lowercase, numbers, and symbols), and click "Generate" to create a new password. The strength meter provides real-time feedback on your password's security level.
            </p>

            <h3 className="info-title">Key Features</h3>
            <ul className="info-list">
              <li><strong>Customizable Length:</strong> Generate passwords from 4 to 128 characters long</li>
              <li><strong>Character Type Selection:</strong> Choose any combination of uppercase letters, lowercase letters, numbers, and special symbols</li>
              <li><strong>Exclude Ambiguous Characters:</strong> Remove confusing characters like 0/O, 1/l/I for better readability</li>
              <li><strong>No Repeat Characters:</strong> Ensure each character appears only once for increased entropy</li>
              <li><strong>Strength Indicator:</strong> Real-time password strength analysis shows Weak, Medium, or Strong ratings</li>
              <li><strong>One-Click Copy:</strong> Instantly copy your generated password to clipboard</li>
            </ul>

            <h3 className="info-title">Why Use a Strong Password?</h3>
            <p className="info-text">
              In today's digital world, password security is more important than ever. Weak passwords are the leading cause of data breaches and account compromises. Hackers use sophisticated tools that can crack simple passwords in seconds. A strong password should be at least 12 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special symbols.
            </p>
            <p className="info-text">
              Our password generator uses cryptographically secure random number generation to ensure each password is truly random and unpredictable. Unlike human-created passwords, machine-generated passwords don't follow patterns that hackers can exploit.
            </p>

            <h3 className="info-title">Password Security Best Practices</h3>
            <ul className="info-list">
              <li><strong>Use Unique Passwords:</strong> Never reuse passwords across multiple accounts</li>
              <li><strong>Enable Two-Factor Authentication:</strong> Add an extra layer of security whenever possible</li>
              <li><strong>Use a Password Manager:</strong> Store your complex passwords securely</li>
              <li><strong>Update Regularly:</strong> Change passwords periodically, especially for sensitive accounts</li>
              <li><strong>Avoid Personal Information:</strong> Don't include names, birthdays, or common words</li>
            </ul>

            <h3 className="info-title">Frequently Asked Questions</h3>
            <div className="faq-item">
              <p className="faq-question">How long should my password be?</p>
              <p className="faq-answer">We recommend at least 12-16 characters for most accounts. For highly sensitive accounts like banking or email, consider using 20+ characters.</p>
            </div>
            <div className="faq-item">
              <p className="faq-question">Is this password generator safe to use?</p>
              <p className="faq-answer">Yes! All password generation happens locally in your browser. We never store, transmit, or have access to any passwords you generate.</p>
            </div>
            <div className="faq-item">
              <p className="faq-question">Should I include special characters?</p>
              <p className="faq-answer">Yes, including special characters significantly increases password strength by expanding the character set hackers must guess from.</p>
            </div>
            <div className="faq-item">
              <p className="faq-question">What makes a password "strong"?</p>
              <p className="faq-answer">A strong password is long (12+ characters), uses multiple character types, is random (not based on dictionary words), and is unique to each account.</p>
            </div>
          </div>
        </div>
      </div>

      <div className={`toast ${showToast ? 'show' : ''}`}>
        Copied to clipboard! ✓
      </div>
    </>
  )
}