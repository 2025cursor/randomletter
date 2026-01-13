import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Random Generator Tools - Free Online Generators'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif',
          padding: '40px',
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              background: 'linear-gradient(135deg, #4169E1 0%, #7B68EE 100%)',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '48px',
              fontWeight: 'bold',
              color: 'white',
              marginRight: '20px',
            }}
          >
            R
          </div>
          <div
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '-0.02em',
            }}
          >
            Random Generator Tools
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            color: '#a0aec0',
            marginBottom: '50px',
            textAlign: 'center',
          }}
        >
          Free Online Random Generators for Developers & Designers
        </div>

        {/* Tool Icons */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {[
            { icon: 'Aa', label: 'Letters' },
            { icon: '🔐', label: 'Passwords' },
            { icon: '🎨', label: 'Colors' },
            { icon: '123', label: 'Numbers' },
            { icon: '📅', label: 'Dates' },
            { icon: '🎯', label: 'Picker' },
          ].map((tool) => (
            <div
              key={tool.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '20px 30px',
                minWidth: '120px',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{tool.icon}</div>
              <div style={{ fontSize: '16px', color: '#e2e8f0' }}>{tool.label}</div>
            </div>
          ))}
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '30px',
            fontSize: '20px',
            color: '#718096',
          }}
        >
          randletter.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
