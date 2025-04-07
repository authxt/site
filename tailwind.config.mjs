/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    darkMode: "class",
    extend: {
      colors: {
        light: {
          background: "#fafafa",
          primary: "#ffffff",
          secondary: "#fafafa",
          accent: "#181818",
          textPrimary: "#000000",
          textSecondary: "#6b7280",
          textMuted: "#9ea9cc",
        },
        dark: {
          background: "#0a0a0a",
          primary: "#0f0f0f",
          secondary: "#171717",
          accent: "#fafafa",
          textPrimary: "#ffffff",
          textSecondary: "#9ca3af",
          textMuted: "#667178",
        },
      },
      fontFamily: {
        sans: ["Geist"],
        mono: ["GeistMono"],
        serif: [""],
      },
      typography: {
        dark: {
          css: {
            color: "#E5E7EB", // Example text color for dark mode
            a: {
              color: "#60A5FA", // Link color for dark mode
              "&:hover": {
                color: "#3B82F6",
              },
            },
            h1: { color: "#E5E7EB" },
            h2: { color: "#E5E7EB" },
            h3: { color: "#E5E7EB" },
            blockquote: {
              color: "#D1D5DB",
              borderLeftColor: "#374151",
            },
            strong: { color: "#F9FAFB" },
            code: { color: "#F472B6" },
            // Add more styles for dark mode as needed
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
