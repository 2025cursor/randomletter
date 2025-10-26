'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PickerGenerator() {
  const [listItems, setListItems] = useState('Pizza\nBurger\nSushi\nPasta\nSalad\nTacos\nRamen\nSteak')
  const [selectedResult, setSelectedResult] = useState('Pasta')
  const [pickCount, setPickCount] = useState(1)
  const [allowDuplicates, setAllowDuplicates] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showToolsMenu, setShowToolsMenu] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  const pickRandomItems = () => {
    const items = listItems.split('\n').filter(item => item.trim() !== '')
    if (items.length === 0) {
      alert('Please enter at least one item in your list!')
      return
    }

    const results = []
    const usedItems = new Set()

    for (let i = 0; i < pickCount; i++) {
      let availableItems = items

      if (!allowDuplicates) {
        availableItems = items.filter(item => !usedItems.has(item.trim()))
        if (availableItems.length === 0) {
          break // No more unique items available
        }
      }

      const randomIndex = Math.floor(Math.random() * availableItems.length)
      const selectedItem = availableItems[randomIndex].trim()

      results.push(selectedItem)
      if (!allowDuplicates) {
        usedItems.add(selectedItem)
      }
    }

    setSelectedResult(results.join('\n'))
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(selectedResult)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const pasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setListItems(text)
    } catch (err) {
      console.error('Failed to paste text: ', err)
    }
  }

  const useTemplate = (template: string) => {
    switch (template) {
      case 'food':
        setListItems('Pizza\nBurger\nSushi\nPasta\nSalad\nTacos\nRamen\nSteak\nSandwich\nSoup')
        break
      case 'colors':
        setListItems('Red\nBlue\nGreen\nYellow\nPurple\nOrange\nPink\nBlack\nWhite\nGray')
        break
      case 'numbers':
        setListItems('1\n2\n3\n4\n5\n6\n7\n8\n9\n10')
        break
      case 'yesno':
        setListItems('Yes\nNo\nMaybe\nDefinitely\nAbsolutely Not\nProbably\nNot Sure')
        break
      default:
        setListItems('')
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
          <h1 className="page-title">Random List Picker</h1>
          <p className="page-subtitle">
            Enter your list and randomly pick one or more items - perfect for decisions and raffles.
          </p>

          <div className="picker-layout">
            <div className="picker-result-section">
              <div className="selected-label">🎯 Selected Result:</div>
              <div className="result-box picker-display">
                {selectedResult}
              </div>

              <div className="picker-actions">
                <button className="btn-generate" onClick={pickRandomItems}>
                  ✨ PICK
                </button>
                <button className="btn-copy" onClick={copyToClipboard}>
                  📋 Copy
                </button>
              </div>
            </div>

            <div className="picker-controls">
              <div className="form-row">
                <div className="form-col">
                  <label className="form-label">Number of Picks:</label>
                  <input
                    type="number"
                    className="form-input"
                    value={pickCount}
                    onChange={(e) => setPickCount(Math.max(1, Math.min(20, parseInt(e.target.value) || 1)))}
                    min="1"
                    max="20"
                  />
                </div>

                <div className="form-col">
                  <label className="form-label">Options:</label>
                  <div className="checkbox-group" style={{marginTop: '0.5rem'}}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={allowDuplicates}
                        onChange={(e) => setAllowDuplicates(e.target.checked)}
                      />
                      Allow Duplicates
                    </label>
                  </div>
                </div>
              </div>

              <div className="list-header">
                <label className="form-label">Your List (one item per line):</label>
                <div className="list-actions">
                  <button className="btn-action" onClick={pasteFromClipboard}>
                    📋 Paste
                  </button>
                  <div className="templates-dropdown">
                    <button className="btn-action">
                      📋 Templates
                    </button>
                    <div className="templates-menu">
                      <button onClick={() => useTemplate('food')}>Food Items</button>
                      <button onClick={() => useTemplate('colors')}>Colors</button>
                      <button onClick={() => useTemplate('numbers')}>Numbers 1-10</button>
                      <button onClick={() => useTemplate('yesno')}>Yes/No/Maybe</button>
                    </div>
                  </div>
                </div>
              </div>

              <textarea
                className="list-textarea"
                value={listItems}
                onChange={(e) => setListItems(e.target.value)}
                placeholder="Enter your items here, one per line..."
                rows={8}
              />
            </div>
          </div>

          {/* Tool Introduction */}
          <div className="info-section">
            <h2 className="info-title">Tool Introduction</h2>
            <p className="info-text">
              The Random List Picker is perfect for making decisions when you can't choose between multiple options.
              Simply enter your list of items (one per line), and let the tool randomly select one for you.
              Great for choosing restaurants, picking winners, making decisions, or any situation where you need
              an unbiased random selection.
            </p>
          </div>

          {/* Use Cases */}
          <div className="info-section">
            <h2 className="info-title">Use Cases</h2>
            <ul className="info-list">
              <li>Choosing what to eat for dinner</li>
              <li>Selecting winners for contests and giveaways</li>
              <li>Making difficult decisions between options</li>
              <li>Random name picking for presentations</li>
              <li>Team selection and group assignments</li>
              <li>Game elements and random events</li>
              <li>Breaking ties in voting situations</li>
              <li>Classroom activities and ice breakers</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="info-section">
            <h2 className="info-title">Frequently Asked Questions</h2>

            <div className="faq-item">
              <h3 className="faq-question">How do I add items to my list?</h3>
              <p className="faq-answer">
                Simply type each item on a separate line in the text area. You can also paste a list from elsewhere
                using the "Paste" button, or use one of our pre-made templates to get started quickly.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Is the selection truly random?</h3>
              <p className="faq-answer">
                Yes! Our picker uses JavaScript's built-in random number generator to ensure each item has an
                equal chance of being selected. Every pick is independent and unbiased.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">Can I pick multiple items at once?</h3>
              <p className="faq-answer">
                Yes! You can set the "Number of Picks" to select multiple items at once. Use the "Allow Duplicates"
                option to control whether the same item can be picked multiple times.
              </p>
            </div>

            <div className="faq-item">
              <h3 className="faq-question">What if I have duplicate items in my list?</h3>
              <p className="faq-answer">
                If your list contains duplicate items, each instance is treated as a separate entry, giving
                duplicates a higher chance of being selected. Remove duplicates if you want equal probability
                for all unique items.
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