import { useState } from 'react'
import './Header.css'

function Header({ onReset, onCopy, onDownload, syncScroll, onToggleSyncScroll, isDarkMode, onToggleDarkMode }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const success = await onCopy()
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1000)
    }
  }

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Eazy Markdown</h1>
      </div>
      <div className="header-right">
        <button onClick={onReset} className="header-button">
          Reset
        </button>
        <button onClick={handleCopy} className="header-button">
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button onClick={onDownload} className="header-button">
          Download
        </button>
        <label className="header-checkbox">
          <input
            type="checkbox"
            checked={syncScroll}
            onChange={onToggleSyncScroll}
          />
          <span>Sync scroll</span>
        </label>
        <button onClick={onToggleDarkMode} className="header-button dark-mode-toggle">
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  )
}

export default Header
