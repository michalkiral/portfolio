/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // --- Obsidian Gallery color palette ---
      colors: {
        // Surface hierarchy — depth through tonal layering, not shadows
        surface: {
          DEFAULT: "#0b1326", // base layer — the infinite floor
          "container-lowest": "#0d1628", // recessed elements, input fills
          "container-low": "#131b2e", // large structural blocks
          container: "#1a2235", // glassmorphism base (use at 60% opacity)
          "container-high": "#222a3d", // active cards, modals — "closer" layer
          "container-highest": "#2b3450", // hover state for list items
        },
        // Primary — electric indigo, the "source of light"
        primary: {
          DEFAULT: "#c0c1ff",
          container: "#4b4dab", // gradient endpoint for CTAs
        },
        // Text
        "on-surface": "#e2e0f0", // primary text — never pure white (#fff)
        "on-surface-variant": "#c7c4d7", // secondary / body text
        // Structural
        "outline-variant": "#44475a", // ghost borders — apply at 15% opacity
        // Accent
        tertiary: "#ffb783", // warm amber — for human/success elements
      },

      // --- Typography scale ---
      fontSize: {
        "display-lg": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "headline-lg": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.02em" }],
        "headline-sm": ["1.5rem", { lineHeight: "1.3", letterSpacing: "-0.01em" }],
        "body-md": ["0.9375rem", { lineHeight: "1.6" }],
        "label-md": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.05em" }],
        "label-sm": ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.05em" }],
      },

      // --- Font families ---
      fontFamily: {
        sans: ["Inter var", "Inter", "system-ui", "sans-serif"],
        western: ["Western", "system-ui", "Avenir", "Helvetica", "Arial", "sans-serif"],
      },

      // --- Shadows — diffused ambient only, no hard drop shadows ---
      boxShadow: {
        // For floating elements (dropdowns, modals)
        ambient: "0 8px 32px -4px rgba(11, 19, 38, 0.08)",
        // Input focus glow — 4px primary blur
        "glow-primary": "0 0 0 4px rgba(192, 193, 255, 0.15)",
      },

      // --- Border radius aliases ---
      borderRadius: {
        xl: "0.75rem", // standard card radius
      },
    },
  },
  plugins: [],
};
