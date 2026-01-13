'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface ColorData {
  hex: string
  rgb: string
  hsl: string
  background: string
}

export default function ColorGenerator() {
  const [colorCount, setColorCount] = useState(3)
  const [colorFormat, setColorFormat] = useState('hex')
  const [colorScheme, setColorScheme] = useState('analogous')
  const [colors, setColors] = useState<ColorData[]>([])
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showToolsMenu, setShowToolsMenu] = useState(false)
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    generateColors()
  }, [])

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [isDarkMode])

  const hslToRgb = (h: number, s: number, l: number) => {
    const c = (1 - Math.abs(2 * l - 1)) * s
    const x = c * (1 - Math.abs((h / 60) % 2 - 1))
    const m = l - c / 2
    let r = 0, g = 0, b = 0

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x
    }

    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return { r, g, b }
  }

  const generateHarmoniousColors = () => {
    const baseHue = Math.random() * 360
    const baseSaturation = 0.6 + Math.random() * 0.3 // 60-90%
    const baseLightness = 0.4 + Math.random() * 0.3   // 40-70%

    const hues: number[] = []

    switch (colorScheme) {
      case 'analogous':
        // 相邻色：基色±30度范围内
        for (let i = 0; i < colorCount; i++) {
          const variation = (i - Math.floor(colorCount / 2)) * (60 / Math.max(colorCount - 1, 1))
          hues.push((baseHue + variation + 360) % 360)
        }
        break

      case 'complementary':
        // 互补色：基色和对面色
        hues.push(baseHue)
        if (colorCount > 1) {
          hues.push((baseHue + 180) % 360)
        }
        // 如果需要更多颜色，添加分离互补色
        for (let i = 2; i < colorCount; i++) {
          const offset = i % 2 === 0 ? 150 : 210
          hues.push((baseHue + offset) % 360)
        }
        break

      case 'triadic':
        // 三角色：120度间隔
        for (let i = 0; i < colorCount; i++) {
          hues.push((baseHue + i * 120) % 360)
        }
        break

      case 'tetradic':
        // 四方色：90度间隔
        for (let i = 0; i < colorCount; i++) {
          hues.push((baseHue + i * 90) % 360)
        }
        break

      case 'monochromatic':
        // 单色：同一色相，不同饱和度和亮度
        for (let i = 0; i < colorCount; i++) {
          hues.push(baseHue)
        }
        break

      default: // 'random'
        for (let i = 0; i < colorCount; i++) {
          hues.push(Math.random() * 360)
        }
    }

    return hues.map((hue, index) => {
      let saturation = baseSaturation
      let lightness = baseLightness

      if (colorScheme === 'monochromatic') {
        // 单色方案中变化饱和度和亮度
        saturation = 0.4 + (index / Math.max(colorCount - 1, 1)) * 0.5
        lightness = 0.3 + (index / Math.max(colorCount - 1, 1)) * 0.4
      } else {
        // 其他方案中轻微调整饱和度和亮度
        saturation += (Math.random() - 0.5) * 0.2
        lightness += (Math.random() - 0.5) * 0.2
      }

      // 确保值在有效范围内
      saturation = Math.max(0.2, Math.min(0.9, saturation))
      lightness = Math.max(0.2, Math.min(0.8, lightness))

      return { h: hue, s: saturation, l: lightness }
    })
  }

  const generateColors = () => {
    const newColors: ColorData[] = []
    const harmoniousHSL = generateHarmoniousColors()

    harmoniousHSL.forEach(({ h, s, l }) => {
      const { r, g, b } = hslToRgb(h, s, l)

      const hex = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
      const rgb = `rgb(${r}, ${g}, ${b})`
      const hsl = `hsl(${Math.round(h)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`

      newColors.push({
        hex,
        rgb,
        hsl,
        background: hex
      })
    })

    setColors(newColors)
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  const getDisplayColor = (color: ColorData) => {
    switch (colorFormat) {
      case 'rgb': return color.rgb
      case 'hsl': return color.hsl
      default: return color.hex
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
          <h1 className="page-title">Random Color Generator - Free Color Palette Creator</h1>
          <p className="page-subtitle">
            Generate random colors and harmonious color palettes instantly. Create analogous, complementary, triadic, and monochromatic color schemes in HEX, RGB, and HSL formats. Perfect for designers and developers.
          </p>

          <div className="color-generator-layout">
            <div className="color-controls">
              <div className="form-group">
                <label className="form-label">Color Scheme:</label>
                <select
                  className="form-input"
                  value={colorScheme}
                  onChange={(e) => setColorScheme(e.target.value)}
                >
                  <option value="analogous">Analogous (相邻色)</option>
                  <option value="complementary">Complementary (互补色)</option>
                  <option value="triadic">Triadic (三角色)</option>
                  <option value="tetradic">Tetradic (四方色)</option>
                  <option value="monochromatic">Monochromatic (单色)</option>
                  <option value="random">Random (随机)</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <label className="form-label">Number of Colors:</label>
                  <input
                    type="number"
                    className="form-input"
                    value={colorCount}
                    onChange={(e) => setColorCount(Math.max(1, Math.min(10, parseInt(e.target.value) || 1)))}
                    min="1"
                    max="10"
                  />
                </div>

                <div className="form-col">
                  <label className="form-label">Color Format:</label>
                  <select
                    className="form-input"
                    value={colorFormat}
                    onChange={(e) => setColorFormat(e.target.value)}
                  >
                    <option value="hex">HEX</option>
                    <option value="rgb">RGB</option>
                    <option value="hsl">HSL</option>
                  </select>
                </div>
              </div>

              <button className="btn-primary" onClick={generateColors}>
                Generate Colors
              </button>
            </div>

            <div className="color-preview-grid">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="color-block"
                  style={{ backgroundColor: color.background }}
                  onClick={() => copyToClipboard(getDisplayColor(color))}
                >
                  <div className="color-code">
                    <span>{getDisplayColor(color)}</span>
                    <span className="copy-icon">📋</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Content Section */}
          <div className="info-section">
            <h2 className="info-title">How to Use the Color Generator</h2>
            <p className="info-text">
              Our free color palette generator creates beautiful, harmonious color combinations instantly. Select a color scheme type (analogous, complementary, triadic, tetradic, monochromatic, or random), choose how many colors you need (1-10), pick your preferred format (HEX, RGB, or HSL), and click "Generate Colors" to create your palette. Click any color to copy its code to your clipboard.
            </p>

            <h3 className="info-title">Understanding Color Schemes</h3>
            <ul className="info-list">
              <li><strong>Analogous Colors:</strong> Colors adjacent to each other on the color wheel (within 30 degrees). Creates a harmonious, cohesive look perfect for nature themes and calming designs.</li>
              <li><strong>Complementary Colors:</strong> Colors opposite each other on the color wheel (180 degrees apart). Creates high contrast and vibrant energy, ideal for call-to-action elements.</li>
              <li><strong>Triadic Colors:</strong> Three colors equally spaced on the color wheel (120 degrees apart). Offers balanced contrast while maintaining visual harmony.</li>
              <li><strong>Tetradic Colors:</strong> Four colors forming a rectangle on the color wheel (90 degrees apart). Provides rich variety for complex designs.</li>
              <li><strong>Monochromatic Colors:</strong> Variations of a single hue with different saturation and lightness values. Perfect for clean, professional designs.</li>
              <li><strong>Random Colors:</strong> Completely random color selection for unexpected inspiration and creative exploration.</li>
            </ul>

            <h3 className="info-title">Color Format Explained</h3>
            <p className="info-text">
              <strong>HEX (Hexadecimal):</strong> The most common format for web colors, using a # followed by six characters (e.g., #FF5733). Easy to copy and paste into CSS.
            </p>
            <p className="info-text">
              <strong>RGB (Red, Green, Blue):</strong> Represents colors using three values from 0-255 for red, green, and blue channels. Useful for CSS and programming.
            </p>
            <p className="info-text">
              <strong>HSL (Hue, Saturation, Lightness):</strong> A more intuitive format where Hue is the color angle (0-360), Saturation is color intensity (0-100%), and Lightness is brightness (0-100%).
            </p>

            <h3 className="info-title">Uses for Color Palettes</h3>
            <ul className="info-list">
              <li><strong>Web Design:</strong> Create consistent color schemes for websites and applications</li>
              <li><strong>Graphic Design:</strong> Generate palettes for logos, posters, and marketing materials</li>
              <li><strong>UI/UX Design:</strong> Develop accessible and visually appealing interfaces</li>
              <li><strong>Interior Design:</strong> Plan color schemes for rooms and spaces</li>
              <li><strong>Art Projects:</strong> Find inspiration for paintings and digital art</li>
              <li><strong>Brand Identity:</strong> Establish cohesive brand colors</li>
            </ul>

            <h3 className="info-title">Frequently Asked Questions</h3>
            <div className="faq-item">
              <p className="faq-question">How do I create a color palette that works well together?</p>
              <p className="faq-answer">Start with analogous or monochromatic schemes for safe, harmonious results. Use complementary colors sparingly for accent elements. The triadic scheme offers a good balance of variety and harmony.</p>
            </div>
            <div className="faq-item">
              <p className="faq-question">Which color format should I use?</p>
              <p className="faq-answer">Use HEX for web development and design tools. RGB is better for programming and calculations. HSL is most intuitive for manual color adjustments.</p>
            </div>
            <div className="faq-item">
              <p className="faq-question">How many colors should be in a palette?</p>
              <p className="faq-answer">Most designs work best with 3-5 colors: a primary color, secondary color, accent color, and neutral tones. Too many colors can make designs feel chaotic.</p>
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