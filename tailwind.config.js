/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': '450px',
      'md': '576px',
      'lg': '768px',
      'xl': '1024px',
      '2xl': '1680px'
    },
    extend: {
      colors: {
        primary: "#222e35",
        darkSpecial: "#111b21",
        iconsColor: "#7f8e98",
        mainTextColor: "#c6edef",
        mainInput: "#2a3942",
        myMessage: "#005c4b",
        greenSpecial: '#16a34a',
        specialBlue: '#0f2539',
        currentChat: '#1c262c',
        specialPurple: '#301d2b'
      },
      backgroundImage: {
        'wallpaper': "url(./images/wallpaper.jpg)"
      }
    },
  },
  plugins: [],
}
