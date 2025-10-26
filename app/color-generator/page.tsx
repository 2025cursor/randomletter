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
        </div>
      </div>

      <div className={`toast ${showToast ? 'show' : ''}`}>
        Copied to clipboard! ✓
      </div>
    </>
  )
}