// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        banner: {
          '0%': { backgroundImage: "url('/src/pictures/banner1.jpg')" },
          '10%': { backgroundImage: "url('/src/pictures/banner2.jpg')" },
          '20%': { backgroundImage: "url('/src/pictures/banner3.jpg')" },
          '30%': { backgroundImage: "url('/src/pictures/banner4.jpg')" },
          '40%': { backgroundImage: "url('/src/pictures/banner5.jpg')" },
          '50%': { backgroundImage: "url('/src/pictures/banner6.jpg')" },
          '60%': { backgroundImage: "url('/src/pictures/banner7.jpg')" },
          '70%': { backgroundImage: "url('/src/pictures/banner8.jpg')" },
          '80%': { backgroundImage: "url('/src/pictures/banner9.jpg')" },
          '90%': { backgroundImage: "url('/src/pictures/banner10.jpg')" },
          '100%': { backgroundImage: "url('/src/pictures/banner11.jpg')" },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        banner: 'banner 40s ease-in infinite alternate-reverse',
        'gradient-x': 'gradient-x 3s ease infinite',
      },
    },
  },
  plugins: [],
};