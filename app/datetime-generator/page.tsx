'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DateTimeGenerator() {
  const [numberOfResults, setNumberOfResults] = useState(1)
  const [dateFormat, setDateFormat] = useState('YYYY-MM-DD')
  const [timeFormat, setTimeFormat] = useState('24-Hour (HH:mm:ss)')
  const [generateMode, setGenerateMode] = useState('dateOnly')
  const [startDate, setStartDate] = useState('2025-01-01')
  const [endDate, setEndDate] = useState('2025-12-31')
  const [separator, setSeparator] = useState('newline')
  const [results, setResults] = useState(['2025-06-17'])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showToolsMenu, setShowToolsMenu] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    generateDateTimes()
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  const formatDate = (date: Date, format: string) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    switch (format) {
      case 'YYYY-MM-DD': return `${year}-${month}-${day}`
      case 'MM/DD/YYYY': return `${month}/${day}/${year}`
      case 'DD/MM/YYYY': return `${day}/${month}/${year}`
      case 'YYYY/MM/DD': return `${year}/${month}/${day}`
      case 'Month DD, YYYY':
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                           'July', 'August', 'September', 'October', 'November', 'December']
        return `${monthNames[date.getMonth()]} ${day}, ${year}`
      case 'DD Month YYYY':
        const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        return `${day} ${monthNamesShort[date.getMonth()]} ${year}`
      default: return `${year}-${month}-${day}`
    }
  }

  const formatTime = (date: Date, format: string) => {
    const hours24 = date.getHours()
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    switch (format) {
      case '24-Hour (HH:mm:ss)':
        return `${String(hours24).padStart(2, '0')}:${minutes}:${seconds}`
      case '24-Hour (HH:mm)':
        return `${String(hours24).padStart(2, '0')}:${minutes}`
      case '12-Hour (hh:mm:ss AM/PM)':
        const hours12 = hours24 % 12 || 12
        const ampm = hours24 >= 12 ? 'PM' : 'AM'
        return `${String(hours12).padStart(2, '0')}:${minutes}:${seconds} ${ampm}`
      case '12-Hour (hh:mm AM/PM)':
        const hours12Short = hours24 % 12 || 12
        const ampmShort = hours24 >= 12 ? 'PM' : 'AM'
        return `${String(hours12Short).padStart(2, '0')}:${minutes} ${ampmShort}`
      default:
        return `${String(hours24).padStart(2, '0')}:${minutes}:${seconds}`
    }
  }

  const generateRandomDate = (start: Date, end: Date) => {
    const startTime = start.getTime()
    const endTime = end.getTime()
    const randomTime = startTime + Math.random() * (endTime - startTime)
    return new Date(randomTime)
  }

  const generateDateTimes = () => {
    const newResults: string[] = []
    const start = new Date(startDate)
    const end = new Date(endDate)

    for (let i = 0; i < numberOfResults; i++) {
      const randomDate = generateRandomDate(start, end)
      let result = ''

      switch (generateMode) {
        case 'dateOnly':
          result = formatDate(randomDate, dateFormat)
          break
        case 'timeOnly':
          result = formatTime(randomDate, timeFormat)
          break
        case 'dateTime':
          result = `${formatDate(randomDate, dateFormat)} ${formatTime(randomDate, timeFormat)}`
          break
      }

      newResults.push(result)
    }

    setResults(newResults)
  }

  const getDisplayResult = () => {
    switch (separator) {
      case 'newline': return results.join('\n')
      case 'comma': return results.join(', ')
      case 'space': return results.join(' ')
      case 'semicolon': return results.join('; ')
      default: return results.join('\n')
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
          <h1 className="page-title">Random Date & Time Generator</h1>
          <p className="page-subtitle">
            Generate random dates and times within custom ranges for testing, planning, and more.
          </p>

          <div className="datetime-layout">
            <div className="datetime-result-section">
              <div className="result-box datetime-display">
                {getDisplayResult()}
              </div>

              <div className="datetime-actions">
                <button className="btn-generate" onClick={generateDateTimes}>
                  📅 GENERATE DATES
                </button>
                <button className="btn-copy" onClick={copyToClipboard}>
                  📋 Copy
                </button>
              </div>
            </div>

            <div className="datetime-controls">
              <div className="form-row">
                <div className="form-col">
                  <label className="form-label">Number of Results:</label>
                  <input
                    type="number"
                    className="form-input"
                    value={numberOfResults}
                    onChange={(e) => setNumberOfResults(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                    min="1"
                    max="50"
                  />
                </div>

                <div className="form-col">
                  <label className="form-label">Date Format:</label>
                  <select
                    className="form-input"
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                  >
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY/MM/DD">YYYY/MM/DD</option>
                    <option value="Month DD, YYYY">Month DD, YYYY</option>
                    <option value="DD Month YYYY">DD Month YYYY</option>
                  </select>
                </div>

                <div className="form-col">
                  <label className="form-label">Time Format:</label>
                  <select
                    className="form-input"
                    value={timeFormat}
                    onChange={(e) => setTimeFormat(e.target.value)}
                  >
                    <option value="24-Hour (HH:mm:ss)">24-Hour (HH:mm:ss)</option>
                    <option value="24-Hour (HH:mm)">24-Hour (HH:mm)</option>
                    <option value="12-Hour (hh:mm:ss AM/PM)">12-Hour (hh:mm:ss AM/PM)</option>
                    <option value="12-Hour (hh:mm AM/PM)">12-Hour (hh:mm AM/PM)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Generate Mode:</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="generateMode"
                      value="dateOnly"
                      checked={generateMode === 'dateOnly'}
                      onChange={(e) => setGenerateMode(e.target.value)}
                    />
                    Date Only
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="generateMode"
                      value="timeOnly"
                      checked={generateMode === 'timeOnly'}
                      onChange={(e) => setGenerateMode(e.target.value)}
                    />
                    Time Only
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="generateMode"
                      value="dateTime"
                      checked={generateMode === 'dateTime'}
                      onChange={(e) => setGenerateMode(e.target.value)}
                    />
                    Date & Time
                  </label>
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <label className="form-label">Start Date:</label>
                  <input
                    type="date"
                    className="form-input"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div className="form-col">
                  <label className="form-label">End Date:</label>
                  <input
                    type="date"
                    className="form-input"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <div className="form-col">
                  <label className="form-label">Separator:</label>
                  <select
                    className="form-input"
                    value={separator}
                    onChange={(e) => setSeparator(e.target.value)}
                  >
                    <option value="newline">New Line</option>
                    <option value="comma">Comma</option>
                    <option value="space">Space</option>
                    <option value="semicolon">Semicolon</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="info-section">
            <h2 className="info-title">Why You Might Need Random Dates</h2>
            <p className="info-text">
              If you've ever had to populate a database with test data or create sample records for a demo, you know the pain of manually typing dates. This tool saves hours of tedious work. Just set your date range, pick how many you need, and you're done.
            </p>
            <p className="info-text">
              Developers love this for seeding databases before presentations. QA teams use it to stress-test date pickers and calendar components. Even project managers find it handy when they need placeholder dates for mockups and wireframes.
            </p>
          </div>

          <div className="info-section">
            <h2 className="info-title">Common Use Cases</h2>
            <ul className="info-list">
              <li><strong>Database Testing:</strong> Fill your staging database with realistic date entries without spending hours on data entry</li>
              <li><strong>App Development:</strong> Test how your app handles various date formats and edge cases like leap years or month boundaries</li>
              <li><strong>Spreadsheet Work:</strong> Generate date columns for Excel or Google Sheets when building financial models or project timelines</li>
              <li><strong>Academic Research:</strong> Create randomized date sets for statistical analysis or survey simulations</li>
              <li><strong>Event Planning:</strong> When you need to suggest multiple possible dates for meetings or events</li>
              <li><strong>Game Development:</strong> Generate in-game timestamps, historical dates for RPGs, or random event triggers</li>
            </ul>
          </div>

          <div className="info-section">
            <h2 className="info-title">Understanding Date Formats</h2>
            <p className="info-text">
              Different regions use different date conventions, which can cause real headaches when working internationally. Americans typically write month first (MM/DD/YYYY), while most of Europe and Asia prefer day first (DD/MM/YYYY). The ISO 8601 standard (YYYY-MM-DD) is what programmers generally prefer because it sorts correctly and avoids ambiguity.
            </p>
            <p className="info-text">
              We support six formats to cover most needs. If you're building software, stick with YYYY-MM-DD for backend storage. For user-facing displays, pick whatever matches your audience's expectations.
            </p>
          </div>

          <div className="info-section">
            <h2 className="info-title">Tips for Better Results</h2>
            <ul className="info-list">
              <li>Keep your date range reasonable - a 10-year span gives more variety than a single month</li>
              <li>Use "Date & Time" mode when testing timestamp fields in your database</li>
              <li>The newline separator works best when pasting into spreadsheets (each date goes to its own row)</li>
              <li>Need dates for different time zones? Generate in UTC, then convert in your application</li>
            </ul>
          </div>

          <div className="info-section">
            <h2 className="info-title">Frequently Asked Questions</h2>

            <div className="faq-item">
              <p className="faq-question">Are these dates truly random?</p>
              <p className="faq-answer">Yes. Each date is generated using JavaScript's random number generator within your specified range. Every moment between your start and end date has an equal chance of being selected.</p>
            </div>

            <div className="faq-item">
              <p className="faq-question">Can I generate dates in the past?</p>
              <p className="faq-answer">Absolutely. Set any start and end date you want - historical dates, future dates, or any range in between. The tool works with any valid date your browser can handle.</p>
            </div>

            <div className="faq-item">
              <p className="faq-question">Why do I get the same date multiple times?</p>
              <p className="faq-answer">If your date range is narrow (say, just a week) and you're generating many dates, duplicates become more likely. Try widening your range or reducing the number of results.</p>
            </div>

            <div className="faq-item">
              <p className="faq-question">How do I get dates without times?</p>
              <p className="faq-answer">Select "Date Only" mode. This gives you clean dates without any time component attached.</p>
            </div>

            <div className="faq-item">
              <p className="faq-question">What's the maximum number of dates I can generate?</p>
              <p className="faq-answer">You can generate up to 50 dates at once. For larger datasets, just run the generator multiple times and combine the results.</p>
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