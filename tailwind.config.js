/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#001a4d',
        secondary: '#0033a0',
        accent: '#4f46e5',
        dark: '#0f172a',
        light: '#f8fafc',
        muted: '#64748b',
      },
      backgroundColor: {
        'glass': 'rgba(255, 255, 255, 0.07)',
        'glass-dark': 'rgba(0, 26, 77, 0.5)',
      },
      backdropBlur: {
        'sm': '4px',
        'md': '12px',
        'lg': '20px',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
        'card': '0 4px 16px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};