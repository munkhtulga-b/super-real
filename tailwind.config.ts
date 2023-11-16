import type { Config } from 'tailwindcss'

const config: Config = {
  prefix: "tw-",
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
      // For mobile size (default)
      'md': '768px', // For tablet size
      'lg': '1024px', // For desktop size
    },
      colors: {
        "primary": "#2B5BD3",
        "secondary": "#98B5FF",
        "blueMedium": "#C7D7FF",
        "blueLight": "#D3E7FF",
        "blueSoft": "#B4D6FF",
        "grayDark": "#646464",
        "grayMedium": "#E5E5E5",
        "grayLight": "#F0F0F0",
        "grayShadow": "rgba(197, 192, 192, 0.25)"
      }
    },
    fontSize: {
      sm: ['16px', '23.17px'],
      base: ['18px', '26.06px'],
      lg: ['20px', '28.96px'],
    }
  },
  plugins: [],
}
export default config
