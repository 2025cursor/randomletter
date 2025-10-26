'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {
  const [letterCount, setLetterCount] = useState(1)
  const [separator, setSeparator] = useState('')
  const [language, setLanguage] = useState('en')
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [symbols, setSymbols] = useState(false)
  const [result, setResult] = useState('A')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showToolsMenu, setShowToolsMenu] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    generateLetters()
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  const generateLetters = () => {
    let chars = ''

    // Different alphabets based on language
    if (language === 'en') {
      if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
    } else if (language === 'es') {
      if (uppercase) chars += 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'
      if (lowercase) chars += 'abcdefghijklmnñopqrstuvwxyz'
    } else if (language === 'fr') {
      if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZÀÂÄÉÈÊËÏÎÔÖÙÛÜŸÇ'
      if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyzàâäéèêëïîôöùûüÿç'
    }

    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'

    if (chars.length === 0) {
      alert('Please select at least one letter type!')
      return
    }

    const letters = []
    for (let i = 0; i < letterCount; i++) {
      letters.push(chars[Math.floor(Math.random() * chars.length)])
    }

    setResult(letters.join(separator))
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

  const clearResult = () => {
    setResult('')
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
          <h1 className="page-title">Random Letter Generator - Free Online Tool</h1>
          <p className="page-subtitle">
            Generate random letter sequences instantly with customizable length, case options, and multiple language support. Perfect for developers, testers, gamers, and creative projects.
          </p>

          <div className="card">
            <div className="form-row">
              <div className="form-col">
                <label className="form-label">Number of Letters:</label>
                <input
                  type="number"
                  className="form-input"
                  value={letterCount}
                  onChange={(e) => setLetterCount(parseInt(e.target.value) || 1)}
                  min="1"
                  max="100"
                />
              </div>

              <div className="form-col">
                <label className="form-label">Separator:</label>
                <select
                  className="form-input"
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                >
                  <option value="">None</option>
                  <option value=", ">Comma</option>
                  <option value=" - ">Dash</option>
                  <option value=" ">Space</option>
                </select>
              </div>

              <div className="form-col">
                <label className="form-label">Language:</label>
                <select
                  className="form-input"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Letter Type:</label>
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
                    checked={symbols}
                    onChange={(e) => setSymbols(e.target.checked)}
                  />
                  Symbols
                </label>
              </div>
            </div>

            <button className="btn-primary" onClick={generateLetters}>
              Generate Letters
            </button>
          </div>

          <div className="result-box">{result}</div>

          <div className="button-group">
            <button className="btn-secondary" onClick={copyToClipboard}>
              Copy
            </button>
            <button className="btn-secondary" onClick={clearResult}>
              Clear
            </button>
          </div>

          {/* SEO Content Section */}
          <div className="info-section">
            <h2 className="info-title">How to Use the Random Letter Generator</h2>
            <p className="info-text">
              Our free random letter generator is a powerful online tool that creates random letter sequences with complete customization.
              Simply choose your preferred number of letters (1-100), select your separator style, pick from multiple languages including
              English, Spanish, and French, and choose between uppercase, lowercase, or symbol characters. The tool instantly generates
              random letter combinations perfect for testing applications, creating passwords, gaming elements, educational activities,
              and creative projects. Each generation is completely random and unbiased, ensuring fair results every time.
            </p>

            <h3 className="faq-question">Key Features of Our Letter Generator</h3>
            <ul className="info-list">
              <li><strong>Multiple Languages:</strong> Support for English, Spanish, and French alphabets with special characters</li>
              <li><strong>Customizable Length:</strong> Generate anywhere from 1 to 100 random letters in a single operation</li>
              <li><strong>Flexible Formatting:</strong> Choose from multiple separator options including commas, dashes, spaces, or no separation</li>
              <li><strong>Character Types:</strong> Mix uppercase letters, lowercase letters, and symbols as needed</li>
              <li><strong>Instant Results:</strong> Generate random letter sequences immediately with a single click</li>
              <li><strong>Copy & Share:</strong> Easy one-click copying to clipboard for immediate use in your projects</li>
            </ul>

            <h3 className="faq-question">Why Use a Random Letter Generator?</h3>
            <p className="info-text">
              Random letter generators are essential tools for developers, testers, educators, and creative professionals.
              Use our generator for creating test data, generating random usernames, creating educational exercises,
              developing games with random elements, testing string handling functions, creating placeholder text,
              or generating unique identifiers. The random nature ensures unbiased results perfect for statistical
              sampling, A/B testing, and fair selection processes.
            </p>

            <h3 className="faq-question">Professional Applications</h3>
            <p className="info-text">
              Software developers use random letter generators for unit testing, database seeding, and API testing.
              Quality assurance teams rely on random letter sequences to test input validation and edge cases.
              Game developers incorporate random elements to create engaging gameplay mechanics. Teachers and
              trainers use random letters for spelling exercises, alphabet games, and educational activities.
              The versatility of random letter generation makes it valuable across numerous industries and applications.
            </p>
          </div>
        </div>
      </div>

      <div className={`toast ${showToast ? 'show' : ''}`}>
        Copied to clipboard! ✓
      </div>
    </>
  )
}