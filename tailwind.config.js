import tailwindForms from '@tailwindcss/forms';
import tailwindTypography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0a0e27',
        'dark-surface': '#1a1f3a',
        'accent-primary': '#e50914',    // Netflix Red
        'accent-secondary': '#ffd700',  // Gold (별점)
        'text-primary': '#ffffff',
        'text-secondary': '#b3b3b3',
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [
    tailwindForms,
    tailwindTypography,
  ],
}
