import type { Config } from "tailwindcss";
import daisyui from "daisyui";

import { addDynamicIconSelectors } from "@iconify/tailwind";

export default {
  darkMode: ["selector"],
  content: ["./src/js/**/*.{html,js,ts,vue,css}", "!./node_modules/**/*"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "0rem",
        xxs: "0.1rem",
        xs: "0.25rem",
        sm: "0.5rem",
        md: "1rem",
        lg: "1.5rem",
        xl: "2rem",
      },
    },
    screens: {
      xxs: "100px",
      xs: "180px",
      sm: "320px",
      md: "480px",
      lg: "768px",
      xl: "1024px",
    },
    extend: {
      gridTemplateColumns: {
        one: " minmax(250px, 50%)",
        card: "repeat(auto-fill, minmax(275px, 1fr))",
      },
    },
  },
  plugins: [daisyui, addDynamicIconSelectors()],
  safelist: ["hover:text-primary", "hover:text-secondary", "hover:text-accent"],

  daisyui: {
    themes: [
      {
        light: {
          primary: "#444dc8",
          "primary-content": "#d5dcf7",
          secondary: "#bc2f5b",
          "secondary-content": "#f7d7dc",
          accent: "#38d05c",
          "accent-content": "#011003",
          neutral: "#262931",
          "neutral-content": "#cfd0d2",
          "base-100": "#ffffff",
          "base-200": "#f6f9fb",
          "base-300": "#f3f3f4",
          "base-content": "#121414",
          info: "#2563EB",
          "info-content": "#d2e2ff",
          success: "#16A34A",
          "success-content": "#f6f9fb",
          warning: "#f3a034",
          "warning-content": "#110500",
          error: "#DC2626",
          "error-content": "#ffd9d4",
        },
      },
      {
        dark: {
          primary: "#444dc8",
          "primary-content": "#d5dcf7",
          secondary: "#bc2f5b",
          "secondary-content": "#f7d7dc",
          accent: "#58c27c",
          "accent-content": "#030e05",
          neutral: "#3d4451",
          "neutral-content": "#d5d6da",
          "base-100": "#1f2937",
          "base-200": "#19222e",
          "base-300": "#141c26",
          "base-content": "#cdd0d3",
          info: "#2563EB",
          "info-content": "#d2e2ff",
          success: "#16A34A",
          "success-content": "#000a02",
          warning: "#D97706",
          "warning-content": "#110500",
          error: "#DC2626",
          "error-content": "#ffd9d4",
        },
      },
    ],
  },
} satisfies Config;
