import { useState, useEffect, useRef } from 'react'
import Header from './components/Header'
import Editor from './components/Editor'
import Preview from './components/Preview'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import './App.css'

const defaultMarkdown = `# Welcome to Eazy Markdown

## Headers

# This is a Heading h1
## This is a Heading h2
###### This is a Heading h6

## Emphasis

*This text will be italic*
_This will also be italic_

**This text will be bold**
__This will also be bold__

_You **can** combine them_

## Lists

### Unordered

* Item 1
* Item 2
* Item 2a
* Item 2b
    * Item 3a
    * Item 3b

### Ordered

1. Item 1
2. Item 2
3. Item 3
    1. Item 3a
    2. Item 3b

## Links

You are using [Eazy Markdown](https://github.com) - the easiest way to preview Markdown!

## Blockquotes

> Markdown is a lightweight markup language with plain-text-formatting syntax, created in 2004 by John Gruber with Aaron Swartz.
>
>> Markdown is often used to format readme files, for writing messages in online discussion forums, and to create rich text using a plain text editor.

## Tables

| Left columns  | Right columns |
| ------------- |:-------------:|
| left foo      | right foo     |
| left bar      | right bar     |
| left baz      | right baz     |

## Blocks of code

\`\`\`
let message = 'Hello world';
alert(message);
\`\`\`

## Inline code

This web site is using \`markedjs/marked\`.
`

function App() {
  const [markdown, setMarkdown] = useState('')
  const [html, setHtml] = useState('')
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [syncScroll, setSyncScroll] = useState(false)
  const editorRef = useRef(null)
  const previewRef = useRef(null)

  // Load saved state from localStorage
  useEffect(() => {
    const savedMarkdown = localStorage.getItem('markdown-content')
    const savedDarkMode = localStorage.getItem('dark-mode') === 'true'
    const savedSyncScroll = localStorage.getItem('sync-scroll') === 'true'

    setMarkdown(savedMarkdown || defaultMarkdown)
    setIsDarkMode(savedDarkMode)
    setSyncScroll(savedSyncScroll)

    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  // Convert markdown to HTML
  useEffect(() => {
    const options = {
      headerIds: false,
      mangle: false,
    }
    const rawHtml = marked.parse(markdown, options)
    const sanitized = DOMPurify.sanitize(rawHtml)
    setHtml(sanitized)

    // Save to localStorage
    localStorage.setItem('markdown-content', markdown)
  }, [markdown])

  const handleReset = () => {
    if (markdown !== '') {
      if (window.confirm('Are you sure you want to reset? Your content will be cleared.')) {
        setMarkdown('')
      }
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown)
      return true
    } catch (err) {
      console.error('Failed to copy:', err)
      return false
    }
  }

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'document.md'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleImport = (file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target.result
      setMarkdown(content)
    }
    reader.onerror = () => {
      console.error('Failed to read file')
    }
    reader.readAsText(file)
  }

  const toggleDarkMode = () => {
    const newMode = !isDarkMode
    setIsDarkMode(newMode)
    localStorage.setItem('dark-mode', newMode)

    if (newMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleSyncScroll = () => {
    const newSync = !syncScroll
    setSyncScroll(newSync)
    localStorage.setItem('sync-scroll', newSync)
  }

  return (
    <div className="app">
      <Header
        onReset={handleReset}
        onCopy={handleCopy}
        onDownload={handleDownload}
        onImport={handleImport}
        syncScroll={syncScroll}
        onToggleSyncScroll={toggleSyncScroll}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
      />
      <div className="main-container">
        <Editor
          value={markdown}
          onChange={setMarkdown}
          isDarkMode={isDarkMode}
          editorRef={editorRef}
          previewRef={previewRef}
          syncScroll={syncScroll}
        />
        <Preview
          html={html}
          isDarkMode={isDarkMode}
          previewRef={previewRef}
        />
      </div>
    </div>
  )
}

export default App
