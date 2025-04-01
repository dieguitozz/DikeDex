import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'flash': 'flash 0.5s ease-in-out',
        'sparkle': 'sparkle 0.8s ease-in-out infinite',
        'sparkle-delayed-1': 'sparkle 0.8s ease-in-out infinite 0.2s',
        'sparkle-delayed-2': 'sparkle 0.8s ease-in-out infinite 0.4s',
        'sparkle-delayed-3': 'sparkle 0.8s ease-in-out infinite 0.6s',
        'sparkle-delayed-4': 'sparkle 0.8s ease-in-out infinite 0.8s',
      },
      keyframes: {
        flash: {
          '0%': { opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        sparkle: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '50%': { transform: 'scale(1.2) rotate(180deg)', opacity: '1' },
          '100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config; 