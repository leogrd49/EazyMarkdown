# Eazy Markdown

A modern, clean React application for previewing Markdown in real-time with dark mode support.

![Eazy Markdown](https://img.shields.io/badge/React-18.3-blue)
![Vite](https://img.shields.io/badge/Vite-6.3-purple)
![License](https://img.shields.io/badge/license-ISC-green)

## Features

- **Real-time Preview**: See your Markdown rendered as you type
- **Dark Mode**: Toggle between light and dark themes
- **Monaco Editor**: Powerful code editor with syntax highlighting
- **Sync Scroll**: Optional synchronized scrolling between editor and preview
- **Auto-save**: Your content is automatically saved to localStorage
- **Copy to Clipboard**: Quickly copy your Markdown content
- **Responsive Design**: Clean and modern UI that works on all screen sizes

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/eazy-markdown.git

# Navigate to the project directory
cd eazy-markdown

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

1. **Start writing**: Type your Markdown in the left editor panel
2. **See results**: The preview appears in real-time on the right panel
3. **Toggle dark mode**: Click the moon/sun icon in the header
4. **Sync scroll**: Enable synchronized scrolling with the checkbox
5. **Copy**: Click the "Copy" button to copy your Markdown to clipboard
6. **Reset**: Click "Reset" to restore the default template

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Technologies

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Monaco Editor** - Code editor
- **Marked** - Markdown parser
- **DOMPurify** - HTML sanitization

## Project Structure

```
eazy-markdown/
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Editor.jsx
│   │   ├── Editor.css
│   │   ├── Preview.jsx
│   │   └── Preview.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

See the [LICENSE](https://github.com/tanabe/markdown-live-preview/blob/master/LICENSE) file in this repo.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
