/** @type {import('tailwindcss').Config} */
module.exports = {
 
  important: true,
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "background-logo" : "url('/public/ChangePassword.jpg')"
      },
      colors : {
        primaryColor  : "#fb9400"
      }
    },
    screens: {
      'phone' :'360px',
      // => @media (min-width: 360px) { ... }
      'tablet': '600px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
     
    },
  },
  plugins: [],
};
