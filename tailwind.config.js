/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        textPrimary: "#101828",
        textSecondary: "#344054",
        textTertiary: "#475467",
        buttonPrimaryBg: "#7F56D9",
        buttonSecondaryBorder: "#D0D5DD",
        buttonSecondaryColorBorder: "#D6BBFB",
        borderPrimary: "#D0D5DD",
        buttonSecondaryColorText: "#6941C6",
        bgSecondary: "#F9FAFB",
        bgPrimary: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
