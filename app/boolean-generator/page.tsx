'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function BooleanGenerator() {
  const [result, setResult] = useState('true')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showToolsMenu, setShowToolsMenu] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    generateBoolean()
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  const generateBoolean = () => {
    const randomValue = Math.random() < 0.5
    setResult(randomValue.toString())
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
          <h1 className="page-title">Boolean & Choice Generator</h1>
          <p className="page-subtitle">
            Generate random boolean values (true/false) for quick decisions and choices.
          </p>

          <div className="boolean-layout">
            <div className="boolean-result-section">
              <div className="result-box boolean-display">
                {result}
              </div>

              <div className="boolean-actions">
                <button className="btn-generate" onClick={generateBoolean}>
                  🎲 GENERATE
                </button>
                <button className="btn-copy" onClick={copyToClipboard}>
                  📋 Copy
                </button>
              </div>
            </div>
          </div>

          {/* Tool Introduction */}
          <div className="info-section">
            <h2 className="info-title">Tool Introduction</h2>
            <p className="info-text">
              The Boolean & Choice Generator provides instant random true/false values for quick decision making.
              Perfect when you need a simple yes/no answer or want to make a binary choice without bias.
              Each generation has exactly 50% probability for true or false.
            </p>
          </div>

          {/* Use Cases */}
          <div className="info-section">
            <h2 className="info-title">Use Cases</h2>
            <ul className="info-list">
              <li>Quick decision making (should I do this?)</li>
              <li>Coin flip alternative</li>
              <li>Boolean values for programming and testing</li>
              <li>Breaking ties in simple choices</li>
              <li>Random yes/no responses</li>
              <li>Game mechanics and random events</li>
              <li>A/B testing decisions</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="info-section">
            <h2 className="info-title">Frequently Asked Questions</h2>

            <div className="faq-item">
              <h3 className="faq-question">Is this truly 50/50?</h3>
              <p className="faq-answer">
                Yes! Each generation uses JavaScript's Math.random() with a 0.5 threshold, ensuring
                exactly equal probability for true and false results.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Can I use this instead of flipping a coin?</h3>
              <p className="faq-answer">
                Absolutely! This generator provides the same fairness as a coin flip but is more
                convenient and always available when you need a quick binary decision.
              </p>
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