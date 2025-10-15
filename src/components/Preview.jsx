import './Preview.css'

function Preview({ html, isDarkMode, previewRef }) {
  return (
    <div className="preview-container" ref={previewRef}>
      <div
        className={`preview-content ${isDarkMode ? 'dark' : ''}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}

export default Preview
