/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2C3E50',
        secondary: '#E67E22',
        accent: '#3498DB',
        surface: '#FFFFFF',
        background: '#F8F9FA',
        success: '#27AE60',
        warning: '#F39C12',
        error: '#E74C3C',
        info: '#3498DB',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.15)',
        'premium': '0 10px 40px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        'card': '8px',
        'button': '6px',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #E67E22 0%, #F39C12 100%)',
        'gradient-accent': 'linear-gradient(135deg, #3498DB 0%, #5DADE2 100%)',
        'gradient-overlay': 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)',
      },
    },
  },
  plugins: [],
}