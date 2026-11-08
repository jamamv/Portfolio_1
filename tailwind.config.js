/** @type {import('tailwindcss').Config} */
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Theme colors are CSS variables in src/index.css, so the palette changes in one place.
      colors: {
        ink: token('ink'),
        surface: token('surface'),
        raised: token('raised'),
        line: token('line'),
        fg: token('fg'),
        muted: token('muted'),
        accent: token('accent'),
        'accent-strong': token('accent-strong'),
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
