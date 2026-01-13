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

          {/* Content Section */}
          <div className="info-section">
            <h2 className="info-title">The Hardest Part of Any Decision</h2>
            <p className="info-text">
              We've all been there. You're standing in front of the fridge at 7 PM, everyone's hungry, and nobody can agree on what to order. Or maybe you're a teacher trying to pick a student for the next presentation without anyone accusing you of playing favorites. Sometimes the fairest thing you can do is let randomness decide.
            </p>
            <p className="info-text">
              This tool takes the pressure off. Type in your options, hit the button, and accept whatever comes up. No second-guessing, no endless debates. The random picker has spoken.
            </p>
          </div>

          <div className="info-section">
            <h2 className="info-title">Real Ways People Use This</h2>
            <ul className="info-list">
              <li><strong>Dinner Decisions:</strong> Paste in your list of nearby restaurants and let fate choose tonight's meal</li>
              <li><strong>Giveaways and Contests:</strong> Drop in participant names for a fair, transparent winner selection</li>
              <li><strong>Classroom Management:</strong> Pick students for reading, answering questions, or group assignments without bias</li>
              <li><strong>Team Building:</strong> Randomly assign people to teams for office games or project groups</li>
              <li><strong>Chore Assignment:</strong> Finally settle who does the dishes this week with zero arguments</li>
              <li><strong>Gift Exchange:</strong> Run a Secret Santa draw without anyone peeking at the results</li>
              <li><strong>Brainstorming:</strong> When you have too many ideas, let the picker narrow things down</li>
              <li><strong>Travel Planning:</strong> Can't decide between destinations? Let randomness be your travel agent</li>
            </ul>
          </div>

          <div className="info-section">
            <h2 className="info-title">Pro Tips</h2>
            <p className="info-text">
              <strong>Weighting your options:</strong> Want pizza to have a better chance than salad? Just add "Pizza" to your list multiple times. Each entry counts as one ticket in the draw.
            </p>
            <p className="info-text">
              <strong>Running a raffle:</strong> For giveaways, turn off "Allow Duplicates" to ensure each person can only win once when picking multiple winners.
            </p>
            <p className="info-text">
              <strong>Quick templates:</strong> Don't feel like typing? Use our built-in templates to get started, then edit the list to match your needs.
            </p>
          </div>

          <div className="info-section">
            <h2 className="info-title">Questions People Ask</h2>

            <div className="faq-item">
              <p className="faq-question">Is this actually random or does it favor certain items?</p>
              <p className="faq-answer">Every item has exactly the same probability of being picked. We use JavaScript's Math.random() which gives each option equal odds. Run it a hundred times if you want - you'll see everything gets selected eventually.</p>
            </div>

            <div className="faq-item">
              <p className="faq-question">Can people see my list?</p>
              <p className="faq-answer">No. Everything happens in your browser. Your list never leaves your device - we don't have servers storing what you type. Close the tab and it's gone.</p>
            </div>

            <div className="faq-item">
              <p className="faq-question">What's the difference between "Allow Duplicates" on and off?</p>
              <p className="faq-answer">With duplicates off, once an item is picked, it's removed from future picks in that round. So if you're picking 3 winners from 10 people, you'll get 3 different names. With duplicates on, the same item could theoretically be picked every time.</p>
            </div>

            <div className="faq-item">
              <p className="faq-question">Is there a limit to how many items I can add?</p>
              <p className="faq-answer">No hard limit. We've tested it with thousands of items and it still works fine. Your browser might slow down with extremely large lists, but for normal use (even hundreds of items), you won't notice any issues.</p>
            </div>

            <div className="faq-item">
              <p className="faq-question">Can I save my list for later?</p>
              <p className="faq-answer">Not directly in the tool, but here's a workaround: select all your items, copy them, and paste into a note or document. Next time, just paste them back in.</p>
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