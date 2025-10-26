'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function NumberGenerator() {
  const [minValue, setMinValue] = useState(1)
  const [maxValue, setMaxValue] = useState(100)
  const [quantity, setQuantity] = useState(1)
  const [separator, setSeparator] = useState('none')
  const [uniqueNumbers, setUniqueNumbers] = useState(true)
  const [includeDecimals, setIncludeDecimals] = useState(false)
  const [sortResults, setSortResults] = useState(false)
  const [results, setResults] = useState(['1'])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showToolsMenu, setShowToolsMenu] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    generateNumbers()
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  const generateNumbers = () => {
    const newResults: string[] = []
    const usedNumbers = new Set<number>()

    for (let i = 0; i < quantity; i++) {
      let number: number

      if (includeDecimals) {
        // Generate decimal number
        do {
          number = Math.random() * (maxValue - minValue) + minValue
        } while (uniqueNumbers && usedNumbers.has(Math.round(number * 100) / 100) && usedNumbers.size < (maxValue - minValue) * 100)

        number = Math.round(number * 100) / 100 // Round to 2 decimal places
      } else {
        // Generate integer
        do {
          number = Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
        } while (uniqueNumbers && usedNumbers.has(number) && usedNumbers.size < (maxValue - minValue + 1))
      }

      if (uniqueNumbers) {
        usedNumbers.add(includeDecimals ? Math.round(number * 100) / 100 : number)
      }

      newResults.push(includeDecimals ? number.toFixed(2) : number.toString())
    }

    if (sortResults) {
      newResults.sort((a, b) => parseFloat(a) - parseFloat(b))
    }

    setResults(newResults)
  }

  const getDisplayResult = () => {
    switch (separator) {
      case 'comma': return results.join(', ')
      case 'space': return results.join(' ')
      case 'newline': return results.join('\n')
      case 'semicolon': return results.join('; ')
      default: return results.join('')
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getDisplayResult())
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
          <h1 className="page-title">Random Number Generator - Free Integer & Decimal Generator</h1>
          <p className="page-subtitle">
            Generate random numbers with customizable range, quantity and formatting options. Create unique integers or decimals within any specified range. Perfect for statistics, gaming, testing, and research projects.
          </p>

          <div className="number-layout">
            <div className="number-result-section">
              <div className="result-box number-display">
                {getDisplayResult()}
              </div>

              <div className="number-actions">
                <button className="btn-generate" onClick={generateNumbers}>
                  🔄 GENERATE
                </button>
                <button className="btn-copy" onClick={copyToClipboard}>
                  📋 Copy
                </button>
              </div>
            </div>

            <div className="number-controls">
              <div className="form-row">
                <div className="form-col">
                  <label className="form-label">Minimum Value:</label>
                  <input
                    type="number"
                    className="form-input"
                    value={minValue}
                    onChange={(e) => setMinValue(parseInt(e.target.value) || 0)}
                  />
                </div>

                <div className="form-col">
                  <label className="form-label">Maximum Value:</label>
                  <input
                    type="number"
                    className="form-input"
                    value={maxValue}
                    onChange={(e) => setMaxValue(parseInt(e.target.value) || 100)}
                  />
                </div>

                <div className="form-col">
                  <label className="form-label">Quantity:</label>
                  <input
                    type="number"
                    className="form-input"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Math.min(1000, parseInt(e.target.value) || 1)))}
                    min="1"
                    max="1000"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Separator:</label>
                <select
                  className="form-input"
                  value={separator}
                  onChange={(e) => setSeparator(e.target.value)}
                >
                  <option value="none">None</option>
                  <option value="comma">Comma</option>
                  <option value="space">Space</option>
                  <option value="newline">New Line</option>
                  <option value="semicolon">Semicolon</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Number Options:</label>
                <div className="checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={uniqueNumbers}
                      onChange={(e) => setUniqueNumbers(e.target.checked)}
                    />
                    Unique Numbers
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={includeDecimals}
                      onChange={(e) => setIncludeDecimals(e.target.checked)}
                    />
                    Include Decimals
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={sortResults}
                      onChange={(e) => setSortResults(e.target.checked)}
                    />
                    Sort Results
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Tool Introduction */}
          <div className="info-section">
            <h2 className="info-title">Tool Introduction</h2>
            <p className="info-text">
              Our Random Number Generator is a versatile tool that creates random numbers within your specified range.
              Whether you need integers or decimals, single numbers or large datasets, this tool provides complete
              control over the generation process with options for uniqueness, sorting, and custom formatting.
            </p>
          </div>

          {/* Use Cases */}
          <div className="info-section">
            <h2 className="info-title">Use Cases</h2>
            <ul className="info-list">
              <li>Statistical sampling and data analysis</li>
              <li>Game development and random events</li>
              <li>Testing applications with random data</li>
              <li>Lottery and raffle number generation</li>
              <li>Research and experimental design</li>
              <li>Password and ID generation</li>
              <li>Random selection processes</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="info-section">
            <h2 className="info-title">Frequently Asked Questions</h2>

            <div className="faq-item">
              <h3 className="faq-question">What's the difference between unique and non-unique numbers?</h3>
              <p className="faq-answer">
                When "Unique Numbers" is enabled, each generated number will be different from all others in the set.
                When disabled, the same number can appear multiple times in your results.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">How do decimal numbers work?</h3>
              <p className="faq-answer">
                When "Include Decimals" is enabled, the generator produces numbers with up to 2 decimal places
                within your specified range. For example, between 1-10, you might get 3.47, 8.92, etc.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">What's the maximum quantity I can generate?</h3>
              <p className="faq-answer">
                You can generate up to 1,000 numbers at once. For unique numbers, the maximum is limited by
                your range (e.g., range 1-100 can only produce 100 unique integers).
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