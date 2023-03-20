/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      backgroundColor: {
        main: '#0E1218',
      },
      minWidth: {
        buttonLading: '220px',
      },
      maxWidth: {
        landingImage: '620px',
      },
      width: {
        116: '464px',
      },
      keyframes: {
        animeLeft: {
          from: { transform: 'translate3d(-40px, 0, 0)' },
          to: { transform: 'translate3d(0, 0, 0)' },
        },
        animeTop: {
          from: { transform: 'translate3d(0, -40px, 0)' },
          to: { transform: 'translate3d(0, 0, 0)' },
        },
      },
      animation: {
        animeLeft: 'animeLeft 0.5s forwards',
        animeTop: 'animeTop 0.5s forwards',
      },
    },
  },
  plugins: [],
};
