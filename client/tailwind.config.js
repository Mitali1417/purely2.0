/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  variants: {
    extend: {
      fontWeight: ['active'],
    },
  },
  theme: {
    extend: {
      colors: {
        primary: "#a97bc5",
        secondary: "#73414f",
        cream: "#FF4349",
        yellow: "#FFB555",
        warmPink: "#F92057",
        coolPink: "#DD2D7E",
        coolPurple: "#AA248E",
        blue: "#421FB4",
      },
    },
    screens: {
      xs: "240px",
      ss: "325px",
      sm: "600px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      xxl: "1440px",
    },
    fontFamily: {
      Mons: "Montserrat Alternates, sans-serif",
      Kalnia: "Kalnia, serif",
      DM: "DM Serif Display, serif",
      DS: "Dancing Script, cursive",
      Quicks: "Quicksand, sans-serif",
      DMs: "DM Sans, sans-serif",
      Inter: "Inter, sans-serif",
    },
  },
  plugins: [],
};
