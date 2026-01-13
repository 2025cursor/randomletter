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

          {/* Content Section */}
          <div className="info-section">
            <h2 className="info-title">When You Just Need a Yes or No</h2>
            <p className="info-text">
              Some decisions don't need lengthy pros and cons lists. Should you take the umbrella? Go to the gym today? Reply to that email now or later? These tiny choices eat up mental energy, and honestly, the outcome usually doesn't matter that much either way.
            </p>
            <p className="info-text">
              That's where this comes in. True means yes, do it, go ahead. False means no, skip it, wait. It's basically a coin flip without needing to find a coin - or worry about it rolling under the couch.
            </p>
          </div>

          <div className="info-section">
            <h2 className="info-title">The Math Behind It</h2>
            <p className="info-text">
              Every click gives you exactly 50/50 odds. We generate a random decimal between 0 and 1, then check if it's above or below 0.5. That's it. No algorithms trying to "balance" results over time, no memory of previous outcomes. Each generation is completely independent.
            </p>
            <p className="info-text">
              This is the same logic programmers use in code when they need random boolean values. If you're a developer, you've probably written something like <code>Math.random() {"<"} 0.5</code> a hundred times. This tool just puts a button on it.
            </p>
          </div>

          <div className="info-section">
            <h2 className="info-title">When This Actually Helps</h2>
            <ul className="info-list">
              <li><strong>Decision fatigue:</strong> After a long day of making choices, let the generator handle the trivial ones</li>
              <li><strong>Settling arguments:</strong> Two people want different things? Let true/false be the tiebreaker everyone agreed to in advance</li>
              <li><strong>Breaking habits:</strong> Trying to be more spontaneous? Use random results to shake up your routine</li>
              <li><strong>Testing software:</strong> Developers use boolean generators to simulate random conditions in their code</li>
              <li><strong>Game night:</strong> Decide who goes first, which team gets the ball, or any other binary choice</li>
              <li><strong>Creative writing:</strong> Let randomness decide a character's fate or plot direction when you're stuck</li>
            </ul>
          </div>

          <div className="info-section">
            <h2 className="info-title">The Psychology of Letting Go</h2>
            <p className="info-text">
              There's something freeing about outsourcing a decision to pure chance. Research on decision-making shows that people often feel relief after a choice is made - even if they didn't make it themselves. The stress isn't usually about picking the "wrong" option; it's about the act of deciding.
            </p>
            <p className="info-text">
              Of course, don't use this for anything serious. Career moves, relationship decisions, financial choices - those deserve actual thought. But for "should I have pizza or tacos?" level decisions, randomness works fine.
            </p>
          </div>

          <div className="info-section">
            <h2 className="info-title">Common Questions</h2>

            <div className="faq-item">
              <p className="faq-question">I got "true" five times in a row. Is it broken?</p>
              <p className="faq-answer">Nope, that's just how randomness works. With 50/50 odds, getting five of the same result has about a 3% chance of happening. Unlikely, but not rare. Keep clicking and you'll see it balance out over many tries - that's the law of large numbers in action.</p>
            </div>

            <div className="faq-item">
              <p className="faq-question">Why "true" and "false" instead of "yes" and "no"?</p>
              <p className="faq-answer">Boolean is the programming term for true/false values. We kept the technical naming because developers often need these values for testing. But mentally, you can absolutely read true as "yes" and false as "no."</p>
            </div>

            <div className="faq-item">
              <p className="faq-question">Can I change the probability?</p>
              <p className="faq-answer">Not in this tool - it's intentionally simple. If you need weighted randomness (like 70/30 odds), check out our Random Number Generator and set your own thresholds.</p>
            </div>

            <div className="faq-item">
              <p className="faq-question">Is there any way to predict the next result?</p>
              <p className="faq-answer">No. Each result is generated fresh using your browser's random number generator. There's no pattern, no sequence, and no way to game it. That's the whole point.</p>
            </div>

            <div className="faq-item">
              <p className="faq-question">Why would I use this over just flipping a coin?</p>
              <p className="faq-answer">Convenience, mostly. Your phone is probably already in your hand. Plus, coins can be biased (worn edges, flipping technique), while this is mathematically fair every time. Also, coins roll away. This doesn't.</p>
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