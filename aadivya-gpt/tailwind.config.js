/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'y2k-bg': '#008080',
        'y2k-surface': 'rgba(192, 192, 192, 0.9)',
        'y2k-elevated': 'rgba(255, 255, 255, 0.85)',
        'y2k-border': '#c0c0c0',
        'y2k-primary': '#0000ff',
        'y2k-secondary': '#800080',
        'y2k-accent': '#ff00ff',
        'y2k-text': '#000000',
        'y2k-text-light': '#ffffff',
        'y2k-text-dim': '#666666',
        'y2k-blue': '#0000ff',
        'y2k-green': '#008000',
        'y2k-red': '#ff0000',
        'y2k-yellow': '#ffff00',
        'y2k-cyan': '#00ffff',
        'y2k-silver': '#c0c0c0',
        'y2k-darkgray': '#808080',
      },
      fontFamily: {
        'pixel': ['monospace'],
        'y2k': ['MS Sans Serif', 'Tahoma', 'sans-serif'],
        'y2k-title': ['MS Sans Serif', 'Arial', 'sans-serif'],
      },
      backgroundImage: {
        'y2k-gradient': 'linear-gradient(135deg, #008080 0%, #004040 100%)',
        'y2k-glass': 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(192,192,192,0.6) 100%)',
        'y2k-button': 'linear-gradient(135deg, #f0f0f0 0%, #d4d4d4 45%, #b8b8b8 55%, #c0c0c0 100%)',
        'y2k-button-pressed': 'linear-gradient(135deg, #b8b8b8 0%, #d4d4d4 55%, #f0f0f0 100%)',
      },
      boxShadow: {
        'y2k-window': '2px 2px 8px rgba(0, 0, 0, 0.5), inset 1px 1px 0 rgba(255, 255, 255, 0.5)',
        'y2k-inset': 'inset 1px 1px 2px rgba(0, 0, 0, 0.3), inset -1px -1px 2px rgba(255, 255, 255, 0.3)',
        'y2k-raised': '1px 1px 2px rgba(0, 0, 0, 0.3), -1px -1px 2px rgba(255, 255, 255, 0.3)',
        'y2k-button': '1px 1px 0 #ffffff, 2px 2px 2px rgba(0, 0, 0, 0.3)',
        'y2k-pressed': 'inset 1px 1px 2px rgba(0, 0, 0, 0.5)',
      },
      backdropBlur: {
        'y2k': '8px',
      },
    },
  },
  plugins: [],
}