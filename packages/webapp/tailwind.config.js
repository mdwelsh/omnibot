const {nextui} = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'src/**/*.{ts,tsx}',
    'node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  darkMode: ["class"],
  plugins: [nextui(
    {
      themes: {
        dark: {
          colors: {
            primary: {
              DEFAULT: "#f59e0b",
            }
          }
        }
      }
    }
  )]
}
