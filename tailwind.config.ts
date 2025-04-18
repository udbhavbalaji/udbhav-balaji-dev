import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        spotifyGreen: "#1DB954",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        portfolioFont: ["Geist Mono", "monospace"],
        // trackRevTitleFont: ["Formula1", "Display-Bold"],
        // trackRevWideFont: ["Formula1", "Display-Wide"],
        // trackRevRegularFont: ["Formula1", "Display-Regular"],
        trackRevTitleFont: ["var(--font-f1-bold)", "sans-serif"],
        trackRevWideFont: ["var(--font-f1-wide)", "sans-serif"],
        trackRevRegularFont: ["var(--font-f1-regular)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
