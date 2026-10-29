/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#080B10',
          secondary: '#10151D',
          card: '#151C26',
          cardHover: '#1B2432',
          elevated: '#1F2937',
        },
        gold: {
          DEFAULT: '#D6B56D',
          light: '#EED9A1',
          dark: '#B39247',
          glow: 'rgba(214, 181, 109, 0.25)',
        },
        profit: {
          DEFAULT: '#20C997',
          light: '#42D9AC',
          bg: 'rgba(32, 201, 151, 0.12)',
        },
        loss: {
          DEFAULT: '#F06565',
          light: '#F58383',
          bg: 'rgba(240, 101, 101, 0.12)',
        },
        text: {
          main: '#F5F7FA',
          muted: '#9BA7B5',
          dim: '#637083',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          gold: 'rgba(214, 181, 109, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'sans-serif'],
      },
      boxShadow: {
        'gold-glow': '0 0 25px rgba(214, 181, 109, 0.18)',
        'gold-glow-lg': '0 0 40px rgba(214, 181, 109, 0.28)',
        'profit-glow': '0 0 20px rgba(32, 201, 151, 0.2)',
        'card-dark': '0 10px 30px -5px rgba(0, 0, 0, 0.6)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #D6B56D 0%, #F5D77F 50%, #B39247 100%)',
        'dark-gradient': 'linear-gradient(180deg, #10151D 0%, #080B10 100%)',
      }
    },
  },
  plugins: [],
}
