import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9eafe",
          200: "#b3d4fd",
          300: "#8dbefa",
          400: "#4f9af6",
          500: "#1e7af0",
          600: "#1662cc",
          700: "#114ba3",
          800: "#0c347a",
          900: "#071f51",
        },
      },
      boxShadow: {
        card: "0 10px 30px rgba(17, 75, 163, 0.15)",
      },
    },
  },
  plugins: [],
} satisfies Config;
