/** @type {import('tailwindcss').Config} */
module.exports = {
  content:  ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        outfit:["Outfit","sans-serif"],
        playwrite :["Playwrite NO","cursive"],
        neonderthaw:["Neonderthaw", "cursive"],
        monsieur:["Monsieur La Doulaise","cursive"],
        luxurious:["Luxurious Roman", "serif"],
        berkshire:["Berkshire Swash","serif"],
        kumar:["Kumar One Outline","system-ui"]
      }
    },
  },
  plugins: [],
}

