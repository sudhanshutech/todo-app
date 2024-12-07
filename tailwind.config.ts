import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // Custom scrollbars for better UX
      scrollbarHide: {
        '::-webkit-scrollbar': { display: 'none' },
        '-ms-overflow-style': 'none', // For IE and Edge
        'scrollbar-width': 'none',   // For Firefox
      },
    },
  },
  plugins: [],
} satisfies Config;
