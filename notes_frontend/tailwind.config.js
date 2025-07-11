/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#6B7280",
        accent: "#F59E42"
      },
      fontFamily: {
        sans: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
        mono: "var(--font-geist-mono), ui-monospace, SFMono-Regular, Monaco, monospace"
      }
    }
  },
  plugins: []
};
