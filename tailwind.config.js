/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0b1326",
          "container-lowest": "#0d1628",
          "container-low": "#131b2e",
          container: "#1a2235",
          "container-high": "#222a3d",
          "container-highest": "#2b3450",
        },
        primary: {
          DEFAULT: "#c0c1ff",
          container: "#4b4dab",
        },
        "on-surface": "#e2e0f0",
        "on-surface-variant": "#c7c4d7",
        "outline-variant": "#44475a",
        tertiary: "#ffb783",
      },

      fontSize: {
        "display-lg": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "headline-lg": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "headline-sm": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "body-md": ["0.9375rem", { lineHeight: "1.6" }],
        "label-md": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.05em" }],
        "label-sm": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.05em" }],
      },

      fontFamily: {
        sans: ["Inter Variable", "Inter", "system-ui", "sans-serif"],
        western: ["Western", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },

      boxShadow: {
        ambient: "0 8px 32px -4px rgba(11, 19, 38, 0.08)",
        "glow-primary": "0 0 0 4px rgba(192, 193, 255, 0.15)",
      },

      borderRadius: {
        xl: "0.75rem",
      },
    },
  },
  plugins: [],
};
