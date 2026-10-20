import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0a1b3d",
          2: "#0e2a5c",
          3: "#071428",
        },
        "blue-brand": {
          DEFAULT: "#1457d9",
          bright: "#2f6bff",
          mid: "#5588ff",
          soft: "#e6eefc",
          glow: "rgba(47,107,255,0.18)",
        },
        surface: {
          DEFAULT: "#ffffff",
          2: "#f8fafd",
        },
        "bg-dash": "#f0f5fb",
        border: "#dbe3ef",
        "border-2": "#c4d2e8",
        text: "#0f1b2d",
        muted: "#5b6b82",
        green: {
          DEFAULT: "#16a34a",
          soft: "#dcfce7",
        },
        red: {
          DEFAULT: "#c62828",
          soft: "#fef2f2",
        },
        amber: {
          DEFAULT: "#d97706",
          soft: "#fef3c7",
        },
        cyan: {
          DEFAULT: "#0891b2",
          soft: "#e0f7fa",
        },
        violet: {
          DEFAULT: "#7c3aed",
          soft: "#f5f3ff",
        },
      },
      borderRadius: {
        DEFAULT: "10px",
        lg: "16px",
        xl: "24px",
        full: "9999px",
      },
      boxShadow: {
        xs: "0 1px 3px rgba(10,27,61,0.06)",
        sm: "0 2px 10px rgba(10,27,61,0.09), 0 1px 3px rgba(10,27,61,0.04)",
        md: "0 6px 24px rgba(10,27,61,0.11), 0 2px 8px rgba(10,27,61,0.06)",
        lg: "0 12px 44px rgba(10,27,61,0.14), 0 4px 14px rgba(10,27,61,0.08)",
        xl: "0 28px 72px rgba(10,27,61,0.18), 0 8px 24px rgba(10,27,61,0.10)",
        blue: "0 4px 20px rgba(20,87,217,0.32), 0 2px 8px rgba(20,87,217,0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
