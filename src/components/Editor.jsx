import { useEffect } from 'react'
import MonacoEditor from '@monaco-editor/react'
import './Editor.css'

function Editor({ value, onChange, isDarkMode, editorRef, previewRef, syncScroll }) {
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor
  }

  useEffect(() => {
    if (!editorRef.current || !previewRef.current || !syncScroll) return

    const editor = editorRef.current
    const preview = previewRef.current

    const scrollListener = editor.onDidScrollChange((e) => {
      if (!syncScroll) return

      const scrollTop = e.scrollTop
      const scrollHeight = e.scrollHeight
      const editorHeight = editor.getLayoutInfo().height

      const maxScrollTop = scrollHeight - editorHeight
      if (maxScrollTop <= 0) return

      const scrollRatio = scrollTop / maxScrollTop

      const previewMaxScroll = preview.scrollHeight - preview.clientHeight
      const targetY = previewMaxScroll * scrollRatio

      preview.scrollTo({ top: targetY, behavior: 'auto' })
    })

    return () => {
      scrollListener.dispose()
    }
  }, [syncScroll, editorRef, previewRef])

  return (
    <div className="editor-container">
      <MonacoEditor
        height="100%"
        language="markdown"
        theme={isDarkMode ? 'vs-dark' : 'vs'}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          automaticLayout: true,
          wordWrap: 'on',
          hover: { enabled: false },
          quickSuggestions: false,
          suggestOnTriggerCharacters: false,
          folding: false,
          lineNumbers: 'on',
          renderLineHighlight: 'none',
        }}
      />
    </div>
  )
}

export default Editor
