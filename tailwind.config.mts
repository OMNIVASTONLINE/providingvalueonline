import type { Config } from "tailwindcss";

// Modern, corporate "career trust" palette:
// - navy (primary): authority, trust, professionalism
// - emerald (accent): growth, opportunity, money
// - slate (neutral): clean, readable, mobile-first typography
const config: Config = {
  content: [
    "./src/**/*.{ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#f0f5fb",
          100: "#dbe7f5",
          200: "#b9d2ea",
          300: "#8bb4da",
          400: "#5790c5",
          500: "#3572ab",
          600: "#265a8c",
          700: "#204a72",
          800: "#1d3f60",
          900: "#122641",
          950: "#0b1729",
        },
        royal: {
          50: "#eff5ff",
          100: "#dce8fe",
          200: "#bdd4fe",
          300: "#8eb6fd",
          400: "#5890fb",
          500: "#3366f5",
          600: "#1d46eb",
          700: "#1635d8",
          800: "#182caf",
          900: "#192b8a",
        },
        emerald: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
          950: "#022c22",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: "none",
          },
        },
      }),
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)",
        cardHover: "0 4px 10px rgba(15, 23, 42, 0.06), 0 16px 36px rgba(15, 23, 42, 0.1)",
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
