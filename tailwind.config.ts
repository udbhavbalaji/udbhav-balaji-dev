import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        portfolioFont: ["Geist Mono", "monospace"],
        trackRevTitleFont: ["Formula1", "Display-Bold"],
        trackRevWideFont: ["Formula1", "Display-Wide"],
        trackRevRegularFont: ["Formula1", "Display-Regular"],
      },
    },
  },
  plugins: [],
} satisfies Config;
