/** @type {import('tailwindcss').Config} */
export default {
   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
   theme: {
      extend: {
         animation: {
            'draw-o': 'svgdrawO 0.3s linear forwards',
            'draw-x': 'svgdrawX 0.15s linear forwards',
         },
         keyframes: {
            svgdrawO: {
               '0%': { strokeDashoffset: '301.635' },
               '100%': { strokeDashoffset: '0' },
            },
            svgdrawX: {
               '0%': { strokeDashoffset: '135.764' },
               '100%': { strokeDashoffset: '0' },
            },
         },
      },
   },
   plugins: [],
};
